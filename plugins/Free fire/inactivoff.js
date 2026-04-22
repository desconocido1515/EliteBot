import * as fs from 'fs';
import { readFile } from 'fs/promises';
import fetch from 'node-fetch';

let handler = async (m, { conn, participants }) => {
    
    // Seleccionar víctima (excluyendo al bot)
    let targets = participants.filter(u => !u.id.startsWith(conn.user.jid.split(':')[0])).map(u => u.id);
    if (!targets.length) {
        return conn.reply(m.chat, `☑️ 𝙽𝙾 𝙷𝙰𝚈 𝙽𝙾𝙾𝙱𝚂 𝙿𝙰𝚁𝙰 𝙱𝙰𝙽𝙴𝙰𝚁 😔`, m, rcanal)
    }
    
    let victim = targets[Math.floor(Math.random() * targets.length)];
    let nombreVictima = await conn.getName(victim)
    
    // Ruta de imagen
    let imagePath = './src/inactivo.jpg'
    
    // Mensajes aleatorios de inactividad
    const mensajes = [
        `👻 *${nombreVictima}* es un *FANTASMA* 👻\n\nNo se conecta hace siglos... parece que vive en el más allá.`,
        
        `💀 *${nombreVictima}* está más *MUERTO* que vivo 💀\n\nSu última conexión fue en la era de hielo.`,
        
        `🦗 *${nombreVictima}* es un *INEXISTENTE* 🦗\n\nSu última mensaje fue cuando todavía existía MySpace.`,
        
        `📦 *${nombreVictima}* es una *CAJA VACÍA* 📦\n\n0 mensajes, 0 reacciones, 0 vida social.`,
        
        `🎭 *${nombreVictima}* es un *MUDO DIGITAL* 🎭\n\nEntra, mira y no habla... como espectador fantasma.`,
        
        `🏚️ *${nombreVictima}* es *CASA ABANDONADA* 🏚️\n\nSu chat está más vacío que sus ganas de vivir.`,
        
        `🪦 *${nombreVictima}* está en el *CEMENTERIO* 🪦\n\nRIP a su cuenta. Falleció de inactividad.`
    ]
    
    const textoAleatorio = mensajes[Math.floor(Math.random() * mensajes.length)]
    
    await conn.sendMessage(m.chat, {
        react: { text: '👻', key: m.key }
    })
    
    // Mensaje de advertencia con imagen
    await conn.sendMessage(m.chat, {
        image: { url: imagePath },
        caption: `🔥 *¡ATENCIÓN! SE VA UN NOOB* 🔥\n\n${textoAleatorio}\n\n________________________\n\nTIENES *30 SEGUNDOS* PARA:\n☑️ CONFESAR TUS HACKS\n☑️ PEDIR PERDÓN EN VOZ\n☑️ ACEPTAR QUE ERES NOOB\n________________________\n\n*O SERÁS BANEADO COMO:*\n🚮 Jugador fantasma\n💣 Team killer\n🤖 Bot de farmeo\n________________________`,
        mentions: [victim]
    })
    
    // Ban después de 30 segundos (solo si el bot es admin)
    setTimeout(async () => {
        try {
            await conn.groupParticipantsUpdate(m.chat, [victim], 'remove');
            await conn.reply(m.chat, `________________________\n\n*@${victim.split('@')[0]}* ELIMINADO! 🚫\n\nRAZÓN: *${textoAleatorio.split('\n')[0]}*\nLOBBY: *Limpiado de noobs* 🧹\n\n________________________`, m, rcanal)
        } catch {
            await conn.reply(m.chat, `☑️ 𝙴𝚁𝚁𝙾𝚁: 𝙽𝙾 𝙿𝚄𝙳𝙴 𝙴𝙻𝙸𝙼𝙸𝙽𝙰𝚁 𝙰 ${nombreVictima}\n\n💡 𝙴𝙻 𝙱𝙾𝚃 𝙽𝙴𝙲𝙴𝚂𝙸𝚃𝙰 𝚂𝙴𝚁 𝙰𝙳𝙼𝙸𝙽 𝙿𝙰𝚁𝙰 𝙴𝚇𝙿𝚄𝙻𝚂𝙰𝚁`, m, rcanal)
        }
    }, 30000);
}

handler.help = ['ffban', 'inactivoff', 'freefiretoxic']
handler.tags = ['games']
handler.command = /^(ffban|inactivoff|freefiretoxic)$/i
handler.group = true

export default handler
