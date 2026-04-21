let handler = async (m, { conn }) => {

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

handler.command = /^bot$/i
handler.help = ['bot']
handler.tags = ['main']

export default handler
