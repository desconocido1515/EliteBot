import { unlinkSync, writeFileSync, readFileSync } from 'fs'
import { join } from 'path'
import { exec } from 'child_process'
import { tmpdir } from 'os'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = q.msg?.mimetype || q.mimetype || ''

    // 🎧 EFECTOS
    const effects = {
      bass: '-af equalizer=f=94:width_type=o:width=2:g=30',
      blown: '-af acrusher=.1:1:64:0:log',
      deep: '-af atempo=4/4,asetrate=44500*2/3',
      earrape: '-af volume=12',
      fast: '-filter:a "atempo=1.63,asetrate=44100"',
      fat: '-filter:a "atempo=1.6,asetrate=22100"',
      nightcore: '-filter:a atempo=1.06,asetrate=44100*1.25',
      reverse: '-filter_complex "areverse"',
      robot: '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\'"',
      slow: '-filter:a "atempo=0.7,asetrate=44100"',
      smooth: '-filter:v "minterpolate=fps=60"',
      tupai: '-filter:a "atempo=0.5,asetrate=65100"',
      squirrel: '-filter:a "atempo=0.5,asetrate=65100"',
      chipmunk: '-filter:a "atempo=0.5,asetrate=65100"'
    }

    let set = effects[command]
    if (!set) throw `Efecto "${command}" no soportado.`

    // ✅ DETECCIÓN REAL DE AUDIO
    if (/audio/.test(mime)) {

      await m.react('🕓')

      let buffer = await q.download()

      if (!buffer) throw 'No se pudo descargar el audio'

      // 📁 CREAR ARCHIVOS REALES
      let input = join(tmpdir(), `${Date.now()}.opus`)
      let output = join(tmpdir(), `${Date.now()}.mp3`)

      writeFileSync(input, buffer)

      exec(`ffmpeg -i "${input}" ${set} "${output}"`, async (err) => {

        // limpiar input
        try { unlinkSync(input) } catch {}

        if (err) {
          console.error(err)
          return conn.reply(m.chat, '❌ Error al procesar el audio', m)
        }

        let buff = readFileSync(output)

        await conn.sendFile(
          m.chat,
          buff,
          'audio.mp3',
          null,
          m,
          true,
          {
            type: 'audioMessage',
            ptt: true
          }
        )

        await m.react('✅')

        // limpiar output
        try { unlinkSync(output) } catch {}
      })

    } else {
      return conn.reply(
        m.chat,
        `⚠️ Responde a un audio o nota de voz.\nEjemplo: *${usedPrefix + command}*`,
        m
      )
    }

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❌ Error: ' + e, m)
  }
}

handler.help = ['bass', 'blown', 'deep', 'earrape', 'fast', 'fat', 'nightcore', 'reverse', 'robot', 'slow', 'smooth', 'tupai', 'squirrel', 'chipmunk']
handler.tags = ['audio']
handler.command = /^(bass|blown|deep|earrape|fast|fat|nightcore|reverse|robot|slow|smooth|tupai|squirrel|chipmunk)$/i

export default handler
