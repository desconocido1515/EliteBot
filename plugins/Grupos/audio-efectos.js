import { unlinkSync, readFileSync } from 'fs'
import { join } from 'path'
import { exec } from 'child_process'
import { tmpdir } from 'os'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''

    let set
    if (/bass/.test(command)) set = '-af equalizer=f=94:width_type=o:width=2:g=30'
    if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
    if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
    if (/earrape/.test(command)) set = '-af volume=12'
    if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
    if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
    if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
    if (/reverse/.test(command)) set = '-filter_complex "areverse"'
    if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\'"'
    if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
    if (/smooth/.test(command)) set = '-filter:v "minterpolate=fps=60"'
    if (/tupai|squirrel|chipmunk/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'

    if (!/audio/.test(mime)) {
      throw `⚠️ Responde a un audio\nEjemplo: ${usedPrefix + command}`
    }

    let media = await q.download(true)

    // 🔥 CLAVE: usar opus
    let out = join(tmpdir(), `${Date.now()}.opus`)

    exec(`ffmpeg -i "${media}" ${set} -vn -c:a libopus -b:a 128k "${out}"`, async (err) => {
      try { unlinkSync(media) } catch {}

      if (err) {
        console.error(err)
        return m.reply('❌ Error al procesar el audio')
      }

      let buff = readFileSync(out)

      await conn.sendMessage(m.chat, {
        audio: buff,
        mimetype: 'audio/ogg; codecs=opus',
        ptt: true
      }, { quoted: m })

      try { unlinkSync(out) } catch {}
    })

  } catch (e) {
    console.error(e)
    m.reply(String(e))
  }
}

handler.help = ['bass','blown','deep','earrape','fast','fat','nightcore','reverse','robot','slow','smooth','tupai']
handler.tags = ['audio']
handler.command = /^(bass|blown|deep|earrape|fas?t|nightcore|reverse|robot|slow|smooth|tupai|squirrel|chipmunk)$/i

export default handler
