import { unlinkSync, writeFileSync, readFileSync } from 'fs'
import { join } from 'path'
import { exec } from 'child_process'
import { tmpdir } from 'os'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.mimetype || q.mediaType || '')

    const effects = {
      bass: '-af equalizer=f=94:width_type=o:width=2:g=30',
      blown: '-af acrusher=.1:1:64:0:log',
      deep: '-af atempo=0.8,asetrate=44500*0.8',
      earrape: '-af volume=12',
      fast: '-filter:a "atempo=1.6"',
      fat: '-filter:a "atempo=1.3,asetrate=22050"',
      nightcore: '-filter:a "atempo=1.06,asetrate=44100*1.25"',
      reverse: '-filter_complex "areverse"',
      robot: '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\'"',
      slow: '-filter:a "atempo=0.7"',
      smooth: '-filter:a "aresample=48000"',
      tupai: '-filter:a "atempo=0.5,asetrate=65100"',
      squirrel: '-filter:a "atempo=0.5,asetrate=65100"',
      chipmunk: '-filter:a "atempo=0.5,asetrate=65100"'
    }

    let set = effects[command]
    if (!set) {
      return conn.reply(m.chat, `❌ Efecto no soportado`, m)
    }

    if (!/audio/.test(mime)) {
      return conn.reply(
        m.chat,
        `⚠️ Responde a un audio o nota de voz.\nEjemplo: *${usedPrefix + command}*`,
        m
      )
    }

    await m.react('🕓')

    // 📁 Rutas seguras
    let input = join(tmpdir(), getRandom('.input'))
    let output = join(tmpdir(), getRandom('.mp3'))

    // 📥 Descargar audio
    let buffer = await q.download()
    writeFileSync(input, buffer)

    // ⚙️ Ejecutar ffmpeg (PRO)
    exec(`ffmpeg -y -i "${input}" ${set} "${output}"`, async (err) => {

      // borrar input
      try { unlinkSync(input) } catch {}

      if (err) {
        console.error(err)
        return conn.reply(m.chat, '❌ Error al procesar el audio.', m)
      }

      let buff = readFileSync(output)

      await conn.sendFile(
        m.chat,
        buff,
        'audio.mp3',
        '',
        m,
        true,
        {
          type: 'audioMessage',
          ptt: true
        }
      )

      await m.react('✅')

      // borrar output
      try { unlinkSync(output) } catch {}
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

const getRandom = (ext) => {
  return `${Date.now()}_${Math.floor(Math.random() * 10000)}${ext}`
}
