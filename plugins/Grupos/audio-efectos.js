import { unlinkSync, existsSync, statSync, writeFileSync } from 'fs'
import { join } from 'path'
import { exec } from 'child_process'
import { tmpdir } from 'os'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''

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
      smooth: '-filter:v "minterpolate=fps=120"',
      tupai: '-filter:a "atempo=0.5,asetrate=65100"',
      squirrel: '-filter:a "atempo=0.5,asetrate=65100"',
      chipmunk: '-filter:a "atempo=0.5,asetrate=65100"'
    }

    let set = effects[command]
    if (!set) return

    // ⚠️ Validar audio
    if (!/audio/.test(mime)) {
      return conn.reply(
        m.chat,
        `⚠️ Responde a un audio o nota de voz.\nEjemplo: *${usedPrefix + command}*`,
        m
      )
    }

    await m.react('🕓')

    let media = await q.download()
    let input = join(tmpdir(), `${Date.now()}.mp3`)
    let output = join(tmpdir(), `${Date.now()}_out.mp3`)

    writeFileSync(input, media)

    exec(`ffmpeg -y -i "${input}" ${set} "${output}"`, async (err) => {
      try { unlinkSync(input) } catch {}

      if (err) {
        console.error(err)
        return conn.reply(m.chat, '❌ Error al procesar el audio', m)
      }

      // ✅ Verificar archivo generado
      if (!existsSync(output) || statSync(output).size < 1000) {
        return conn.reply(m.chat, '❌ El audio no se generó correctamente', m)
      }

      // 🚀 Envío PRO (como GataBot)
      await conn.sendMessage(m.chat, {
        audio: { url: output },
        mimetype: 'audio/mpeg',
        ptt: true
      }, { quoted: m })

      try { unlinkSync(output) } catch {}

      await m.react('✅')
    })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❌ Error: ' + e, m)
  }
}

handler.help = [
  'bass','blown','deep','earrape','fast','fat',
  'nightcore','reverse','robot','slow','smooth',
  'tupai','squirrel','chipmunk'
]

handler.tags = ['audio']

handler.command = /^(bass|blown|deep|earrape|fast|fat|nightcore|reverse|robot|slow|smooth|tupai|squirrel|chipmunk)$/i

export default handler
