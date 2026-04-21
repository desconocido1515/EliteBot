import { unlinkSync, readFileSync } from 'fs'
import { join } from 'path'
import { exec } from 'child_process'
import { tmpdir } from 'os'

let handler = async (m, { conn, args, __dirname, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = ((m.quoted ? m.quoted : m).mimetype || '')
    
    // Mapa de efectos
    const effects = {
      bass: '-af equalizer=f=94:width_type=o:width=2:g=30',
      blown: '-af acrusher=.1:1:64:0:log',
      deep: '-af atempo=4/4,asetrate=44500*2/3',
      earrape: '-af volume=12',
      fast: '-filter:a "atempo=1.63,asetrate=44100"',
      fat: '-filter:a "atempo=1.6,asetrate=22100"',
      nightcore: '-filter:a atempo=1.06,asetrate=44100*1.25',
      reverse: '-filter_complex "areverse"',
      robot: '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"',
      slow: '-filter:a "atempo=0.7,asetrate=44100"',
      smooth: '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"',
      tupai: '-filter:a "atempo=0.5,asetrate=65100"',
      squirrel: '-filter:a "atempo=0.5,asetrate=65100"',
      chipmunk: '-filter:a "atempo=0.5,asetrate=65100"'
    }
    
    let set = effects[command]
    if (!set) throw `Efecto "${command}" no soportado.`
    
    if (/audio/.test(mime)) {
      let ran = getRandom('.mp3')
      let filename = join(tmpdir(), ran) // Usa tmp del sistema
      let media = await q.download(true)
      
      exec(`ffmpeg -i ${media} ${set} ${filename}`, async (err, stderr, stdout) => {
        // Limpia archivo original
        try { unlinkSync(media) } catch(e) {}
        
        if (err) {
          console.error(err)
          throw `_*Error al procesar el audio!*_`
        }
        
        let buff = await readFileSync(filename)
        await conn.sendFile(m.chat, buff, ran, null, m, true, {
          type: 'audioMessage', 
          ptt: true 
        })
        
        // Limpia archivo de salida
        try { unlinkSync(filename) } catch(e) {}
      })
    } else {
      throw `RESPONDE A UN AUDIO O NOTA DE VOZ. Usa *${usedPrefix + command}*`
    }
  } catch (e) {
    throw e
  }
}

handler.help = ['bass', 'blown', 'deep', 'earrape', 'fast', 'fat', 'nightcore', 'reverse', 'robot', 'slow', 'smooth', 'tupai', 'squirrel', 'chipmunk'].map(v => v + ' [vn]')
handler.tags = ['audio']
handler.command = /^(bass|blown|deep|earrape|fas?t|nightcore|reverse|robot|slow|smooth|tupai|squirrel|chipmunk)$/i

export default handler

const getRandom = (ext) => `${Date.now()}_${Math.floor(Math.random() * 10000)}${ext}`
