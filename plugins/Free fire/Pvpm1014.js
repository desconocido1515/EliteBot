import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix }) => {
    
    // Validar que haya texto o mención
    if (!text) {
        return conn.reply(m.chat, `☑️ ¿A quién quieres desafiar?\n\nEjemplo: .pvpm1014 @usuario`, m, rcanal)
    }
    
    // Obtener la mención (misma lógica que funciona)
    let targetTag = text.toUpperCase()
    let mentions = []
    
    // Si el texto contiene una mención (@algo), extraer el JID
    if (m.mentionedJid && m.mentionedJid.length > 0) {
        mentions = m.mentionedJid
        targetTag = '@' + mentions[0].split('@')[0]
    } else {
        // Si no hay mención, buscar por nombre en el grupo
        const participants = await conn.groupMetadata(m.chat).then(g => g.participants)
        const searchName = text.toLowerCase()
        const found = participants.find(p => {
            const name = conn.getName(p.id)?.toLowerCase() || ''
            return name.includes(searchName)
        })
        if (found) {
            mentions = [found.id]
            targetTag = '@' + found.id.split('@')[0]
        } else {
            return conn.reply(m.chat, `☑️ Usuario no encontrado. Menciona a la persona o escribe su nombre correctamente.`, m, rcanal)
        }
    }
    
    // No permitir desafiarse a sí mismo
    if (mentions[0] === m.sender) {
        return conn.reply(m.chat, `☑️ No puedes desafiarte a ti mismo`, m, rcanal)
    }
    
    const nombreUsuario = m.pushName || m.sender.split('@')[0]
    
    // Reaccionar al mensaje original
    await conn.sendMessage(m.chat, {
        react: { text: '👺', key: m.key }
    })
    
    const buttons = [
        { buttonId: 'acepto_pvp', buttonText: { displayText: "✅ ACEPTO" }, type: 1 },
        { buttonId: 'miedo_pvp', buttonText: { displayText: "🫦 TENGO MIEDO" }, type: 1 }
    ]
    
    const imagePath = './src/1x1.jpg'
    
    const texto = `👺 *${nombreUsuario}* TE ESTÁ DESAFIANDO A PVP 👺
        
🎮 *OPONENTE:* ${targetTag}

¿CREES PODER SACARME +4 RONDAS? 😂

¡NO CREO, ERES MUY BINARIO!

*¿ACEPTAS EL DESAFÍO?*`.trim()
    
    await conn.sendMessage(m.chat, {
        image: { url: imagePath },
        caption: texto,
        buttons: buttons,
        mentions: [m.sender, mentions[0]],
        viewOnce: true
    })
}

// Handler para las respuestas de los botones
handler.before = async function (m, { conn }) {
    if (m.message?.buttonsResponseMessage) {
        const buttonId = m.message.buttonsResponseMessage.selectedButtonId
        const sender = m.sender
        const senderName = m.pushName || sender.split('@')[0]
        
        if (buttonId === 'acepto_pvp') {
            await conn.reply(m.chat, `🔥 *@${senderName} ACEPTÓ EL DESAFÍO!* 🔥\n\nPrepárate para la batalla... 💀`, m, rcanal)
            await conn.sendMessage(m.chat, { react: { text: '🔥', key: m.key } })
            return
        }
        
        if (buttonId === 'miedo_pvp') {
            await conn.reply(m.chat, `😨 *@${senderName} RECHAZÓ EL DESAFÍO!* 🫦\n\nMejor suerte para la próxima.`, m, rcanal)
            await conn.sendMessage(m.chat, { react: { text: '😭', key: m.key } })
            return
        }
    }
}

handler.help = ['pvpm1014']
handler.tags = ['game']
handler.command = /^(pvpm1014)$/i
handler.group = true

export default handler
