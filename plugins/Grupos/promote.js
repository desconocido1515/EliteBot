var handler = async (m, { conn, usedPrefix, command, text, groupMetadata, isAdmin }) => {
    let mentionedJid = await m.mentionedJid
    let user = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null
    
    if (!user) {
        return conn.reply(m.chat, `☑️ *USO CORRECTO*\n\n📌 *Ejemplo:*\n.${command} @usuario\n\nO responde al mensaje del usuario.`, m, rcanal)
    }
    
    try {
        const groupInfo = await conn.groupMetadata(m.chat)
        const ownerGroup = groupInfo.owner || m.chat.split('-')[0] + '@s.whatsapp.net'
        
        // Verificar si es el creador del grupo
        if (user === ownerGroup) {
            return conn.reply(m.chat, `☑️ No puedes modificar los permisos del creador del grupo.`, m, rcanal)
        }
        
        // Verificar si el usuario ya tiene el estado deseado
        if (command === 'promote' || command === 'promover') {
            if (groupInfo.participants.some(p => p.id === user && p.admin)) {
                return conn.reply(m.chat, `☑️ El usuario ya es administrador.`, m, rcanal)
            }
            await conn.groupParticipantsUpdate(m.chat, [user], 'promote')
            await conn.reply(m.chat, `✅ *USUARIO PROMOVIDO*\n\n☑️ @${user.split('@')[0]} ha sido agregado como administrador.`, m, rcanal)
        }
        
        if (command === 'demote' || command === 'quitaradmin') {
            if (!groupInfo.participants.some(p => p.id === user && p.admin)) {
                return conn.reply(m.chat, `☑️ El usuario no es administrador.`, m, rcanal)
            }
            await conn.groupParticipantsUpdate(m.chat, [user], 'demote')
            await conn.reply(m.chat, `✅ *USUARIO REBAJADO*\n\n☑️ @${user.split('@')[0]} ya no es administrador.`, m, rcanal)
        }
        
    } catch (e) {
        console.error(e)
        conn.reply(m.chat, `⚠️ *ERROR*\n\n☑️ Ocurrió un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message}`, m, rcanal)
    }
}

handler.help = ['promote', 'demote']
handler.tags = ['group']
handler.command = ['promote', 'promover', 'demote', 'quitaradmin']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
