

let handler = async (m) => {
global.db.data.chats[m.chat].isBanned = true
  m.reply(`ESTE BOT FUE BANEADO, ESTARÉ DISPONIBLE HASTA QUE RECIBA LA ORDEN DE PAGO`)
}
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^banchat|banchat2$/i
handler.botAdmin = true
handler.rowner = true
export default handler

