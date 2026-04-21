import { unlinkSync, writeFileSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { exec } from 'child_process'
import { tmpdir } from 'os'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = q.msg?.mimetype || q.mimetype || ''

    if (!/audio/.test(mime)) {
      return conn.reply(
        m.chat,
        `⚠️ Responde a un audio o nota de voz.\nEjemplo: *${usedPrefix + command}*`,
        m
      )
    }

    const effects = {
      bass: '-af equalizer=f=94:width_type=o:width=2:g=30',
      fast: '-filter:a "atempo=1.63,asetrate=44100"',
      slow: '-filter:a "atempo=0.7,asetrate=44100"',
      nightcore: '-filter:a atempo=1.06,asetrate=44100*1.25',
      reverse: '-filter_complex "areverse"'
    }

    let set = effects[command]
    if (!set) return

    await m.react('🕓')

    // 🔥 DESCARGA SEGURA
    let buffer = await q.download()
    if (!buffer) throw 'No se pudo descargar el audio'

    let input = join(tmpdir(), `${Date.now()}.opus`)
    let output = join(tmpdir(), `${Date.now()}.mp3`)

    writeFileSync(input, buffer)

    if (!existsSync(input)) throw 'El archivo no se creó'

    exec(`ffmpeg -y -i "${input}" ${set} "${output}"`, async (err) => {

      try { unlinkSync(input) } catch {}

      if (err) {
        console.error(err)
        return conn.reply(m.chat, '❌ Error en ffmpeg', m)
      }

      if (!existsSync(output)) {
        return conn.reply(m.chat, '❌ No se generó el audio', m)
      }

      let buff = readFileSync(output)

      await conn.sendFile(
        m.chat,
        buff,
        'audio.mp3',
        null,
        m,
        true,
        { type: 'audioMessage', ptt: true }
      )

      await m.react('✅')

      try { unlinkSync(output) } catch {}
    })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❌ Error: ' + e, m)
  }
}

handler.command = /^(bass|fast|slow|nightcore|reverse)$/i
export default handler
