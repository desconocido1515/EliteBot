let handler = async (m, { conn }) => {}
export default handler

handler.groupUpdate = async function (update) {
  try {
    const { id, participants, action } = update

    const botJid = this.user.jid || this.decodeJid(this.user.id)

    // Detectar cuando el bot entra
    if (action === 'add' && participants.includes(botJid)) {

      let botNumber = botJid.split('@')[0]
      let botName = this.user.name || 'Bot'

      // 🔥 Consola
      console.log('🤖 BOT AGREGADO')
      console.log('📱 Número:', botNumber)
      console.log('📦 Grupo:', id)

      let texto = `🥇 ¡HOLA GRUPO! 🥇  
Soy ${botName}, estoy activo.

Usa .menu para ver comandos.`

      await this.sendMessage(id, { text: texto })
    }

  } catch (e) {
    console.error('❌ Error en bienvenida del bot:', e)
  }
}
