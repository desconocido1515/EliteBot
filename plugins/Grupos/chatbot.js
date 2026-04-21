export async function before(m, { conn }) {

  if (!m.text) return
  if (m.isBaileys) return

  // Detecta exactamente "bot" sin prefijo
  if (m.text.trim().toLowerCase() === 'bot') {

    let user = '@' + m.sender.split('@')[0]

    await conn.reply(
      m.chat,
      `👋 Hola ${user} ¿en qué te puedo ayudar?`,
      m,
      {
        mentions: [m.sender],
        ...rcanal
      }
    )

  }
}
