let handler = async (m, { conn }) => {
  try {
    // Solo en grupos
    if (!m.isGroup) return

    // Detectar si el mensaje es del bot
    if (!m.fromMe) return

    // Base de datos simple en memoria
    if (!global.db.data.chats[m.chat]) {
      global.db.data.chats[m.chat] = {}
    }

    // Si ya se presentó, no repetir
    if (global.db.data.chats[m.chat].presentado) return

    // Marcar como presentado
    global.db.data.chats[m.chat].presentado = true

    let botNumber = conn.user.jid.split('@')[0]

    let texto = `Hola grupo 👋

Soy el bot activo.

Número: ${botNumber}

Escribe .menu para ver comandos.`

    await conn.sendMessage(m.chat, { text: texto })

  } catch (e) {
    console.error('Error presentación:', e)
  }
}

handler.all = true
export default handler
