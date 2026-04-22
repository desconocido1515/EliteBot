import fetch from 'node-fetch';

let handler = m => m

handler.before = async function (m, { conn }) {
    // DETECTAR RESPUESTA DE BOTONES
    if (m.message?.buttonsResponseMessage) {
        const buttonId = m.message.buttonsResponseMessage.selectedButtonId
        const sender = m.sender
        const senderName = m.pushName || sender.split('@')[0]
        
        console.log('Botón PVP presionado:', buttonId)
        
        if (buttonId === 'acepto_pvp') {
            await conn.sendMessage(m.chat, {
                text: `🔥 @${senderName} *ACEPTÓ EL DESAFÍO!* 🔥\n\nPrepárate para la batalla... 💀`,
                mentions: [sender]
            })
            await conn.sendMessage(m.chat, {
                react: { text: '🔥', key: m.key }
            })
            return
        }
        
        if (buttonId === 'miedo_pvp') {
            await conn.sendMessage(m.chat, {
                text: `😨 @${senderName} *TENÍA MIEDO* y rechazó el desafío... 🫦\n\nMejor suerte para la próxima.`,
                mentions: [sender]
            })
            await conn.sendMessage(m.chat, {
                react: { text: '😭', key: m.key }
            })
            return
        }
        return
    }
    
    // DETECTAR COMANDO .pvpm1014
    const textLimpio = m.text ? m.text.toLowerCase().trim() : ''
    
    if (textLimpio === '.pvpm1014' || textLimpio.startsWith('.pvpm1014 ')) {
        // Obtener usuario mencionado
        let mencionado = m.mentionedJid[0] || (m.quoted?.sender) || null
        
        if (!mencionado) {
            await conn.reply(m.chat, `⚠️ *MENCIONA A QUIEN QUIERES DESAFIAR*\n\nEjemplo: .pvpm1014 @usuario`, m, rcanal)
            return
        }
        
        const nombreUsuario = m.pushName || m.sender.split('@')[0]
        const nombreMencionado = await conn.getName(mencionado)
        
        // Reaccionar al mensaje original
        await conn.sendMessage(m.chat, {
            react: { text: '👺', key: m.key }
        })
        
        const buttons = [
            { buttonId: 'acepto_pvp', buttonText: { displayText: "✅ ACEPTO" }, type: 1 },
            { buttonId: 'miedo_pvp', buttonText: { displayText: "🫦 TENGO MIEDO" }, type: 1 }
        ]
        
        const texto = `👺 *${nombreUsuario}* TE ESTÁ DESAFIANDO A PVP 👺
        
🎮 *OPONENTE:* @${mencionado.split('@')[0]}

¿CREES PODER SACARME +4 RONDAS? 😂

¡NO CREO, ERES MUY BINARIO!

*¿ACEPTAS EL DESAFÍO?*`.trim()
        
        await conn.sendMessage(m.chat, {
            text: texto,
            buttons: buttons,
            mentions: [m.sender, mencionado],
            viewOnce: true
        })
        return
    }
}

export default handler
