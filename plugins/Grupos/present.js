import fs from 'fs'

let handler = async (m, { conn }) => {}
export default handler

handler.groupUpdate = async function (update) {
  try {
    const { id, participants, action } = update
    const botJid = this.user.jid || this.decodeJid(this.user.id)

    // Detecta cuando agregan al bot
    if (action === 'add' && participants.includes(botJid)) {

      let botNumber = botJid.split('@')[0]
      let botName = this.user.name || 'Bot'
      let audioPath = './Audios/presentacion1.mp3'

      // 🔥 MOSTRAR EN CONSOLA
      console.log('🤖 BOT AGREGADO A UN GRUPO')
      console.log('📱 Número del bot:', botNumber)
      console.log('🆔 Grupo ID:', id)

      let welcomeBotText = `🥇 ¡𝗛𝗢𝗟𝗔 𝗚𝗥𝗨𝗣𝗢!🥇  
¡Soy ${botName}, su nuevo asistente digital!  
━━━━━━━━━━━━━━━━━━━  
⚡ *Mis funciones :*  
▸ Descargar música/videos  
▸ Búsquedas en Google  
▸ Juegos y diversión  
▸ Generar imágenes con IA  
▸ Herramientas para Free Fire  
━━━━━━━━━━━━━━━━━━━  
📂 *Mis menús:*  
▸ .menu → Menú general  
▸ .menuimg → Imágenes AI  
▸ .menuhot → Contenido hot  
▸ .menuaudios → Efectos  
▸ .menujuegos → Juegos  
▸ .menufreefire → Free Fire  
━━━━━━━━━━━━━━━━━━━  
©EliteBotGlobal`

      // 📩 Enviar mensaje
      await this.sendMessage(id, { text: welcomeBotText })

      // 🎧 Enviar audio (si existe)
      if (fs.existsSync(audioPath)) {
        await this.sendMessage(id, {
          audio: fs.readFileSync(audioPath),
          mimetype: 'audio/mpeg',
          ptt: true
        })
      } else {
        console.log('⚠️ No se encontró el audio en:', audioPath)
      }
    }

  } catch (err) {
    console.error('❌ Error al detectar ingreso del bot:', err)
  }
}
