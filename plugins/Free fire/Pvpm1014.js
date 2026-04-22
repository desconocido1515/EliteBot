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
            await conn.reply(m.chat, `🔥 *@${senderName} ACEPTÓ EL DESAFÍO!* 🔥\n\nPrepárate para la batalla... 💀`, m, rcanal)
            await conn.sendMessage(m.chat, {
                react: { text: '🔥', key: m.key }
            })
            return
        }
        
        if (buttonId === 'miedo_pvp') {
            await conn.reply(m.chat, `😨 *@${senderName} RECHAZÓ EL DESAFÍO!* 🫦\n\nMejor suerte para la próxima.`, m, rcanal)
            await conn.sendMessage(m.chat, {
                react: { text: '😭', key: m.key }
            })
            return
        }
        return
    }
    
    // DETECTAR COMANDO .pvpm1014
    const textLimpio = m.text ? m.text.toLowerCase().trim() : ''
    
    if (textLimpio === '.pvpm1014' || textLimpio === '. pvpm1014' || textLimpio.startsWith('.pvpm1014 ') || textLimpio.startsWith('. pvpm1014 ')) {
        
        let mencionado = null
        
        // Forma 1: Si hay mención directa
        if (m.mentionedJid && m.mentionedJid.length > 0) {
            mencionado = m.mentionedJid[0]
        }
        
        // Forma 2: Si responde a un mensaje
        if (!mencionado && m.quoted?.sender) {
            mencionado = m.quoted.sender
        }
        
        // Forma 3: Extraer del texto
        if (!mencionado && m.text) {
            const regex = /@(\d+)/g
            const match = regex.exec(m.text)
            if (match) {
                mencionado = match[1] + '@s.whatsapp.net'
            }
        }
        
        if (!mencionado) {
            await conn.reply(m.chat, `☑️ ¿A quién quieres desafiar?\n\nResponde al mensaje de la persona o menciónala con @`, m, rcanal)
            return
        }
        
        if (mencionado === m.sender) {
            await conn.reply(m.chat, `☑️ No puedes desafiarte a ti mismo`, m, rcanal)
            return
        }
        
        const nombreUsuario = m.pushName || m.sender.split('@')[0]
        
        await conn.sendMessage(m.chat, {
            react: { text: '👺', key: m.key }
        })
        
        const buttons = [
            { buttonId: 'acepto_pvp', buttonText: { displayText: "✅ ACEPTO" }, type: 1 },
            { buttonId: 'miedo_pvp', buttonText: { displayText: "🫦 TENGO MIEDO" }, type: 1 }
        ]
        
        const imagePath = './src/1x1.jpg'
        
        const texto = `👺 *${nombreUsuario}* TE ESTÁ DESAFIANDO A PVP 👺
        
🎮 *OPONENTE:* @${mencionado.split('@')[0]}

¿CREES PODER SACARME +4 RONDAS? 😂

¡NO CREO, ERES MUY BINARIO!

*¿ACEPTAS EL DESAFÍO?*`.trim()
        
        await conn.sendMessage(m.chat, {
            image: { url: imagePath },
            caption: texto,
            buttons: buttons,
            mentions: [m.sender, mencionado],
            viewOnce: true
        })
        return
    }
}

export default handler
