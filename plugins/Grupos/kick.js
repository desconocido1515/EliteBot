let handler = async (m, { conn, usedPrefix, command, text, groupMetadata, isAdmin }) => {
    // Usar la misma lógica de mención que promote
    let mentionedJid = await m.mentionedJid
    let user = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null
    
    if (!user) {
        return conn.reply(m.chat, `☑️ *USO CORRECTO*\n\n📌 *Ejemplo:*\n.${command} @usuario\n\nO responde al mensaje del usuario.`, m, rcanal)
    }
    
    // No permitir kickear al creador del grupo
    try {
        const groupInfo = await conn.groupMetadata(m.chat)
        const ownerGroup = groupInfo.owner || m.chat.split('-')[0] + '@s.whatsapp.net'
        
        if (user === ownerGroup) {
            return conn.reply(m.chat, `☑️ No puedes expulsar al creador del grupo.`, m, rcanal)
        }
        
        // No permitir kickear al bot
        if (user === conn.user.jid) {
            return conn.reply(m.chat, `☑️ No puedes expulsarme a mí mismo.`, m, rcanal)
        }
        
        // Verificar si el usuario es admin (no se puede kickear a un admin)
        if (groupInfo.participants.some(p => p.id === user && p.admin)) {
            return conn.reply(m.chat, `☑️ No puedes expulsar a un administrador.`, m, rcanal)
        }
        
    } catch (e) {
        console.error(e)
    }
    
    // Mensaje de advertencia
    await conn.sendMessage(m.chat, { 
        text: `⚠️ *AVISO IMPORTANTE* ⚠️\n\n@${user.split('@')[0]}, *TIENES 15 SEGUNDOS PARA DECIR TUS ÚLTIMAS PALABRAS* ⏳\n\n*¡Adiós, basura!* 🤮`,
        mentions: [user]
    })
    
    // Espera 15 segundos antes de kickear
    setTimeout(async () => {
        try {
            await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
            await conn.sendMessage(m.chat, { 
                text: `🗑️ *USUARIO ELIMINADO* 🗑️\n\n@${user.split('@')[0]} ha sido expulsado del grupo.\n\n*Ojalá no vuelva...* 👋`,
                mentions: [user]
            })
            await conn.sendMessage(m.chat, { react: { text: '🗑️', key: m.key } })
        } catch (error) {
            console.error("Error al kickear:", error)
            await conn.reply(m.chat, `☑️ *ERROR*\n\nNo se pudo expulsar al usuario. Asegúrate de que el bot sea administrador.`, m, rcanal)
        }
    }, 15000)
}

handler.command = /^(kick|echar|hechar|ban|rip|basura|sacar|expulsar)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
handler.register = false

export default handler
