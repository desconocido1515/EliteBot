let handler = async (m) => {}
export default handler

handler.groupUpdate = async function (update) {
  try {
    const { id, participants, action } = update
    const botJid = this.user.jid || this.decodeJid(this.user.id)

    console.log('Evento detectado:', update)

    // Cuando el bot es añadido
    if (action === 'add' && participants.includes(botJid)) {

      let botNumber = botJid.split('@')[0]

      let text = `Hola grupo 👋

Soy el bot activo.

Número: ${botNumber}

Escribe .menu para ver comandos.`

      await this.sendMessage(id, { text })
    }

  } catch (e) {
    console.error('❌ Error en groupUpdate:', e)
  }
}
