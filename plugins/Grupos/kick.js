let handler = async (m, { conn, usedPrefix, command, text, groupMetadata, isAdmin, isOwner }) => {
    
    // VERIFICACIÓN MANUAL DE ADMIN (por si no funciona handler.admin)
    let isUserAdmin = false
    if (m.isGroup) {
        const groupMetadata = await conn.groupMetadata(m.chat)
        const participant = groupMetadata.participants.find(p => p.id === m.sender)
        isUserAdmin = participant?.admin === 'admin' || participant?.admin === 'superadmin'
    }
    
    if (!isUserAdmin && !isOwner) {
        return conn.reply(m.chat, `☑️ *PERMISO DENEGADO*\n\nEste comando solo puede ser usado por administradores del grupo.`, m, rcanal)
    }
    
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
    
    // Textos agresivos aleatorios
    const textosAgresivos = [
        `⚠️ *FUERA DE AQUÍ, BASURA* ⚠️\n\n@${user.split('@')[0]}, *TIENES 15 SEGUNDOS PARA DESAPARECER VOLUNTARIAMENTE* ⏳\n\n*Si no te vas, yo te voy a echar a patadas!* 👢💀`,
        
        `👊 *CHAU CHAU, RATA* 👊\n\n@${user.split('@')[0]}, *TE DAMOS 15 SEGUNDOS PARA QUE HUYAS* 🏃💨\n\n*Porque cuando pase el tiempo, vuelas de aquí!* 🦵💥`,
        
        `🤮 *VETE A LA MIERDA* 🤮\n\n@${user.split('@')[0]}, *15 SEGUNDOS TENÉS PARA DECIR ADIÓS* ⏰\n\n*Después de eso, nunca más vuelvas, parásito!* 🪳❌`,
        
        `💀 *ÚLTIMA OPORTUNIDAD, ESCORIA* 💀\n\n@${user.split('@')[0]}, *15 SEGUNDOS PARA ARREPENTIRTE* ⏳\n\n*¡CORRE, INSERVIBLE, ANTES DE QUE TE SAQUE!* 🦶🔥`,
        
        `🗑️ *BASURA DETECTADA* 🗑️\n\n@${user.split('@')[0]}, *TE QUEDAN 15 SEGUNDOS PARA SALIR POR TU PROPIO PIE* 🚪\n\n*O TE SACO A PATADAS COMO LA RATA QUE SOS!* 🐀💥`,
        
        `😈 *ADVERTENCIA FINAL* 😈\n\n@${user.split('@')[0]}, *15 SEGUNDOS PARA QUE DESAPAREZCAS DE MI VISTA* 👁️\n\n*¡ZÁFATE, MOGÓLICO, QUE YA VAS!* 🦵🚪`,
        
        `🔥 *TE QUEMAMOS, NOCIVO* 🔥\n\n@${user.split('@')[0]}, *TE REGALO 15 SEGUNDOS PARA QUE TE VAYAS* ⏱️\n\n*DESPUÉS, NI LA POLICÍA TE ENCUENTRA!* 👮❌`,
        
        `🪦 *PREPARATE PARA VOLAR* 🪦\n\n@${user.split('@')[0]}, *15 SEGUNDOS TENÉS PARA REZAR* ⛪\n\n*PORQUE VAS A DESAPARECER COMO CACA POR EL INODORO!* 🚽💩`,
        
        `🤜 *NO MEREZCO PERDÓN* 🤛\n\n@${user.split('@')[0]}, *15 SEGUNDOS PARA QUE LLAMES A TU MAMITA* 📞\n\n*¡FUISTE, PAPÁ! A CHUPAR LIMONES A OTRO LADO!* 🍋🦵`,
        
        `⚡ *VAS A SALIR VOLANDO* ⚡\n\n@${user.split('@')[0]}, *15 SEGUNDOS PARA QUE ENTIERRES TUS SENTIMIENTOS* 🪦\n\n*¡CHAUS, PAJERAZO, NO TE VAMOS A EXTRAÑAR!* 🥾💨`
    ]
    
    const textoAleatorio = textosAgresivos[Math.floor(Math.random() * textosAgresivos.length)]
    
    // Mensaje de advertencia con texto aleatorio
    await conn.reply(m.chat, textoAleatorio, m, rcanal)
    
    // Espera 15 segundos antes de kickear
    setTimeout(async () => {
        try {
            await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
            await conn.sendMessage(m.chat, { react: { text: '🗑️', key: m.key } })
        } catch (error) {
            console.error("Error al kickear:", error)
            await conn.reply(m.chat, `☑️ *ERROR*\n\nNo se pudo expulsar al usuario. Asegúrate de que el bot sea administrador.`, m, rcanal)
        }
    }, 15000)
}

handler.command = /^(kick|echar|hechar|ban|rip|basura|sacar|expulsar)$/i
handler.group = true
handler.botAdmin = true

export default handler
