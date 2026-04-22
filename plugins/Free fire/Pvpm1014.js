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
    
    // DETECTAR COMANDO .pvpm1014 (con o sin espacio)
    const textLimpio = m.text ? m.text.toLowerCase().trim() : ''
    
    if (textLimpio === '.pvpm1014' || textLimpio === '. pvpm1014' || textLimpio.startsWith('.pvpm1014 ') || textLimpio.startsWith('. pvpm1014 ')) {
        
        // Obtener usuario mencionado
        let mencionado = null
        
        if (m.mentionedJid && m.mentionedJid.length > 0) {
            mencionado = m.mentionedJid[0]
        }
        
        if (!mencionado && m.quoted?.sender) {
            mencionado = m.quoted.sender
        }
        
        if (!mencionado) {
            await conn.reply(m.chat, `⚠️ *MENCIONA A QUIEN QUIERES DESAFIAR*\n\n📝 *Ejemplos:*\n.pvpm1014 @usuario\n.pvpm1014 (respondiendo al mensaje del usuario)`, m, rcanal)
            return
        }
        
        if (mencionado === m.sender) {
            await conn.reply(m.chat, `⚠️ *NO PUEDES DESAFIARTE A TI MISMO*\n\nMenciona a otro usuario.`, m, rcanal)
            return
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
        
        // Ruta de la imagen
        const imagePath = './src/1x1.jpg'
        
        const texto = `👺 *${nombreUsuario}* TE ESTÁ DESAFIANDO A PVP 👺
        
🎮 *OPONENTE:* @${mencionado.split('@')[0]}

¿CREES PODER SACARME +4 RONDAS? 😂

¡NO CREO, ERES MUY BINARIO!

*¿ACEPTAS EL DESAFÍO?*`.trim()
        
        // Enviar imagen con botones
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
