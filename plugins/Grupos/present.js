let handler = async (m, { conn }) => {
  try {
    // Detectar creación / entrada a grupo
    if (m.messageStubType === 20) {

      let botJid = conn.user.jid
      let botNumber = botJid.split('@')[0]

      let texto = `Hola grupo 👋

Soy el bot activo.

Número: ${botNumber}

Escribe .menu para ver comandos.`

      await conn.sendMessage(m.chat, { text: texto })
    }

  } catch (e) {
    console.error('Error detectando entrada:', e)
  }
}

handler.all = true
export default handler
