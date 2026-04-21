let handler = async (m) => {}
export default handler

handler.participantsUpdate = async function ({ id, participants, action }) {
  try {
    let botJid = this.user.jid

    // Detectar cuando el bot entra
    if (action === 'add' && participants.includes(botJid)) {

      let botNumber = botJid.split('@')[0]

      let texto = `Hola grupo 👋

Soy el bot activo.

Número: ${botNumber}

Escribe .menu para ver comandos.`

      await this.sendMessage(id, { text: texto })
    }

  } catch (e) {
    console.error('Error bienvenida bot:', e)
  }
}
