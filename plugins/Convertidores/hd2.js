import { spawn } from 'child_process'
import fs from 'fs'
import { tmpdir } from 'os'
import path from 'path'

const handler = async (m, { conn, usedPrefix, command }) => {
  const q = m.quoted || m
  const mime = (q.msg || q).mimetype || ''

  if (!/video/.test(mime)) {
    return conn.reply(m.chat, `✧ Responde a un video con el comando *${usedPrefix + command}* para mejorar su calidad.`, m, rcanal)
  }

  try {
    await conn.reply(m.chat, '🎥 Procesando video con mejora de calidad...\n⏳ Puede tomar unos minutos...', m, rcanal)

    const videoBuffer = await q.download()
    const timestamp = Date.now()
    const inputPath = path.join(tmpdir(), `input_${timestamp}.mp4`)
    const outputPath = path.join(tmpdir(), `output_${timestamp}.mp4`)

    fs.writeFileSync(inputPath, videoBuffer)

    const ffmpeg = spawn('ffmpeg', [
      '-i', inputPath,
      '-vf', 'scale=1280:720,unsharp',
      '-c:v', 'libx264',
      '-preset', 'fast',  // Cambiado de 'slow' a 'fast' para más velocidad
      '-crf', '23',       // CRF más alto = menor calidad pero más rápido
      '-b:v', '1500k',    // Bitrate reducido
      '-y',
      outputPath
    ])

    let ffmpegError = ''
    ffmpeg.stderr.on('data', data => {
      const str = data.toString()
      console.log('[FFMPEG]', str)
      if (str.includes('error') || str.includes('Error')) ffmpegError += str
    })

    await new Promise((resolve, reject) => {
      ffmpeg.on('close', code => {
        if (code === 0 && fs.existsSync(outputPath)) {
          resolve()
        } else {
          reject(new Error(ffmpegError || `FFmpeg cerró con código ${code}`))
        }
      })
      ffmpeg.on('error', reject)
    })

    // Verificar que el archivo de salida existe y no está vacío
    if (!fs.existsSync(outputPath)) {
      throw new Error('No se pudo generar el video mejorado')
    }

    const stats = fs.statSync(outputPath)
    if (stats.size === 0) {
      throw new Error('El archivo de salida está vacío')
    }

    // ✅ Usar sendMessage en lugar de sendFile para evitar el error
    const outputBuffer = fs.readFileSync(outputPath)
    
    await conn.sendMessage(m.chat, {
      video: outputBuffer,
      mimetype: 'video/mp4',
      caption: '✨ Video mejorado con éxito.'
    }, { quoted: m })

    // Limpiar archivos temporales
    try {
      fs.unlinkSync(inputPath)
      fs.unlinkSync(outputPath)
    } catch (e) {
      console.log('Error limpiando archivos:', e)
    }

    await conn.reply(m.chat, '✅ Video mejorado y enviado.', m, rcanal)

  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, `⚠️ Error al mejorar el video.\n\n${e.message || 'Intenta con un video más corto o de menor tamaño.'}`, m, rcanal)
  }
}

handler.help = ["hd2"]
handler.tags = ["tools"]
handler.command = ["hdvideo", "hd2", "hdvideos"]
handler.group = true

export default handler
