import fetch from 'node-fetch';
import { sticker } from '../../lib/sticker.js';

const handler = async (m, { conn, text, groupMetadata }) => {
    try {
        let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted?.sender ? m.quoted.sender : m.sender;
        let name = await conn.getName(who);
        
        let userMention = m.mentionedJid[0] || (m.quoted?.sender) || m.sender;
        
        // Reaccionar al mensaje
        await conn.sendMessage(m.chat, {
            react: {
                text: '👺',
                key: m.key
            }
        });
        
        const res = await fetch('https://nekos.life/api/kiss');
        const json = await res.json();
        const { url } = json;
        
        const text2 = `𝒀𝑶 @${m.sender.split("@")[0]} 𝑻𝑬 𝑬𝑺𝑻𝑶𝒀 𝑫𝑬𝑺𝑨𝑭𝑰𝑨𝑵𝑫𝑶 𝑨 𝑷𝑽𝑷
𝑨 𝑴1014 ${text || ''} 👺
¿𝑪𝑹𝑬𝑬𝑺 𝑷𝑶𝑫𝑬𝑹 𝑺𝑨𝑪𝑨𝑹𝑴𝑬 +4 𝑹𝑶𝑵𝑫𝑨𝑺?😂

¡𝑵𝑶 𝑪𝑹𝑬𝑶́, 𝑬𝑹𝑬𝑺 𝑴𝑼𝒀 𝑩𝑰𝑵𝑨𝑹𝑰𝑶!`.trim();
        
        await conn.sendMessage(m.chat, {
            text: text2,
            mentions: [userMention, m.sender]
        }, { quoted: m });
        
        // Crear y enviar sticker
        const stiker = await sticker(url, false, `@${m.sender.split('@')[0]} desafía a @${userMention.split('@')[0]}`, [m.sender, userMention]);
        if (stiker) {
            await conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, true);
        }
        
    } catch (e) {
        console.error('Error en comando pvpm1014:', e);
        await conn.reply(m.chat, '❌ Error al ejecutar el comando', m);
    }
};

handler.command = /^(pvpm1014)$/i;
handler.group = true;

export default handler;
