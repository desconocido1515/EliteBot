let handler = async (m, { conn }) => {

  if (!m.messageStubType) return

  // 🔥 CUANDO AGREGAN AL BOT
  if (m.messageStubType == 27) {

    let botJid = conn.user.jid || conn.user.id

    // Verifica que el agregado sea el bot
    if (m.messageStubParameters.includes(botJid)) {

      let texto = `Hola grupo, estoy activo.`

      console.log('🤖 BOT AGREGADO AL GRUPO')
      console.log('📦 Grupo:', m.chat)

      await conn.sendMessage(m.chat, { text: texto })
    }
  }
}

handler.all = true
export default handler
