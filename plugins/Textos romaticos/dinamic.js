// plugins/test_img.js

import fs from 'fs'
import { promises } from 'fs'

let handler = async (m, { conn }) => {
  try {
    // Ruta de la imagen de prueba
    const imgPath = './src/baile.jpg'
    
    // Mensaje de prueba
    const texto = `☑️ *PRUEBA DE IMAGEN LOCAL*

📁 *Ruta:* ${imgPath}
🖼️ *Formato:* JPG

Si ves esta imagen, significa que la ruta es correcta.
Si no ves la imagen, la ruta está mal o el archivo no existe.

© Elite Bot Global - Since 2023®`

    await m.react('🖼️')

    try {
      // Intentar enviar imagen local (misma lógica que tu plugin de cenar)
      await fs.promises.access(imgPath)
      const imageBuffer = fs.readFileSync(imgPath)
      
      await conn.sendMessage(m.chat, {
        image: imageBuffer,
        caption: texto
      })
      
      await m.react('✅')
      
    } catch (fileError) {
      console.log('Error con imagen local:', fileError)
      await conn.reply(m.chat, `❌ *ERROR AL CARGAR LA IMAGEN*

📁 *Ruta buscada:* ${imgPath}
📝 *Error:* No se encontró el archivo

💡 *Soluciones:*
1. Verifica que la carpeta "src" exista
2. Verifica que el archivo "baile.jpg" esté dentro de "src"
3. Usa la ruta absoluta del panel

© Elite Bot Global - Since 2023®`, m)
    }

  } catch (error) {
    console.error('Error:', error)
    await conn.reply(m.chat, `❌ Error: ${error.message}`, m)
  }
}

handler.command = /^(testimg)$/i

export default handler
