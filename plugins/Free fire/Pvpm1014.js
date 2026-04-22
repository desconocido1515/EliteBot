import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, participants }) => {
    
    if (!text) {
        return conn.reply(m.chat, `☑️ ¿A quién quieres desafiar?\n\nEjemplo: .pvpm1014 @usuario`, m, rcanal)
    }
    
    let usuario = null
    
    // Buscar por mención directa
    if (m.mentionedJid && m.mentionedJid.length > 0) {
        usuario = m.mentionedJid[0]
    }
    
    // Buscar por quoted (responder al mensaje)
    if (!usuario && m.quoted?.sender) {
        usuario = m.quoted.sender
    }
    
    // Buscar por nombre en participantes
    if (!usuario) {
        const nombreBuscar = text.toLowerCase()
        for (let p of participants) {
            const name = await conn.getName(p.id)
            if (name.toLowerCase().includes(nombreBuscar)) {
                usuario = p.id
                break
            }
        }
    }
    
    if (!usuario) {
        return conn.reply(m.chat, `☑️ Usuario no encontrado.\n\n💡 *Consejo:* Responde al mensaje de la persona que quieres desafiar y escribe .pvpm1014`, m, rcanal)
    }
    
    if (usuario === m.sender) {
        return conn.reply(m.chat, `☑️ No puedes desafiarte a ti mismo`, m, rcanal)
    }
    
    const nombreUsuario = m.pushName || m.sender.split('@')[0]
    const nombreOponente = await conn.getName(usuario)
    
    await conn.sendMessage(m.chat, {
        react: { text: '👺', key: m.key }
    })
    
    const buttons = [
        { buttonId: 'acepto_pvp', buttonText: { displayText: "✅ ACEPTO" }, type: 1 },
        { buttonId: 'miedo_pvp', buttonText: { displayText: "🫦 TENGO MIEDO" }, type: 1 }
    ]
    
    const imagePath = './src/1x1.jpg'
    
    const texto = `👺 *${nombreUsuario}* TE ESTÁ DESAFIANDO A PVP 👺
        
🎮 *OPONENTE:* @${usuario.split('@')[0]}

¿CREES PODER SACARME +4 RONDAS? 😂

¡NO CREO, ERES MUY BINARIO!

*¿ACEPTAS EL DESAFÍO?*`.trim()
    
    await conn.sendMessage(m.chat, {
        image: { url: imagePath },
        caption: texto,
        buttons: buttons,
        mentions: [m.sender, usuario],
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
