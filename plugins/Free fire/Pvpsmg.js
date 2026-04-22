import fetch from 'node-fetch';
import { sticker } from '../../lib/sticker.js';

let handler = async (m, { conn, text, usedPrefix }) => {
    
    // Usar la misma lógica que funciona en promote
    let mentionedJid = await m.mentionedJid
    let usuario = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null
    
    if (!usuario) {
        return conn.reply(m.chat, `☑️ ¿A quién quieres desafiar?\n\n💡 *RESPONDE al mensaje de la persona* o *MENCIÓNALA* con @`, m, rcanal)
    }
    
    if (usuario === m.sender) {
        return conn.reply(m.chat, `☑️ No puedes desafiarte a ti mismo`, m, rcanal)
    }
    
    const nombreUsuario = m.pushName || m.sender.split('@')[0]
    
    await conn.sendMessage(m.chat, {
        react: { text: '👺', key: m.key }
    })
    
    const buttons = [
        { buttonId: 'acepto_smg', buttonText: { displayText: "✅ ACEPTO" }, type: 1 },
        { buttonId: 'miedo_smg', buttonText: { displayText: "🫦 TENGO MIEDO" }, type: 1 }
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
        
        if (buttonId === 'acepto_smg') {
            await conn.reply(m.chat, `🔥 *@${senderName} ACEPTÓ EL DESAFÍO!* 🔥\n\nPrepárate para la batalla... 💀`, m, rcanal)
            await conn.sendMessage(m.chat, { react: { text: '🔥', key: m.key } })
            return
        }
        
        if (buttonId === 'miedo_smg') {
            await conn.reply(m.chat, `😨 *@${senderName} RECHAZÓ EL DESAFÍO!* 🫦\n\nMejor suerte para la próxima.`, m, rcanal)
            await conn.sendMessage(m.chat, { react: { text: '😭', key: m.key } })
            return
        }
    }
}

handler.help = ['pvpsmg']
handler.tags = ['game']
handler.command = /^(pvpsmg)$/i
handler.group = true

export default handler
