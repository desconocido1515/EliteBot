var handler = async (m, { conn, args }) => {
    let group = m.chat
    let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
    let message = `☑️ *LINK DEL GRUPO* ☑️\n\n📌 *Enlace:*\n${link}\n\n⚠️ *Comparte este enlace para invitar nuevos miembros.*`
    
    await conn.reply(m.chat, message, m, rcanal)
}

handler.help = ['link']
handler.tags = ['group']
handler.command = ['link', 'enlace', 'invite', 'invitacion']
handler.group = true
handler.botAdmin = true

export default handler
