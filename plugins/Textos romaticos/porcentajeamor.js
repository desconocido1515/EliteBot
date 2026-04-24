import fetch from 'node-fetch';
import { sticker } from '../../lib/sticker.js';

const handler = async (m, { conn, text, command }) => {
  try {
    // ==================== RESTRICCIÓN DE MENCIÓN ====================
    let mentionedJid = await m.mentionedJid;
    let usuario = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null;
    
    if (!usuario) {
      return conn.reply(m.chat, `☑️ *DEBES MENCIONAR O RESPONDER A UN USUARIO*\n\n📌 *Ejemplo:*\n.amor @usuario\n\n📌 *O responde al mensaje de la persona*`, m, rcanal);
    }
    
    if (usuario === m.sender) {
      return conn.reply(m.chat, `☑️ No puedes hacerte esto a ti mismo. Menciona a otra persona.`, m, rcanal);
    }
    
    const nombreUsuario = m.pushName || m.sender.split('@')[0];
    const nombreMencionado = await conn.getName(usuario);
    
    // ==================== 5 TEXTOS VARIADOS ====================
    const textosAmor = [
      `━━━━━━━♥️ *𝑨𝑴𝑶𝑹* ♥️━━━━━━━
❥ 𝑬𝒏 𝒆𝒍 𝒖𝒏𝒊𝒗𝒆𝒓𝒔𝒐 𝒅𝒆𝒍 𝒂𝒎𝒐𝒓, *${nombreMencionado}* 𝒚 *${nombreUsuario}* 𝒕𝒊𝒆𝒏𝒆𝒏 𝒖𝒏𝒂 𝒄𝒐𝒏𝒆𝒙𝒊𝒐́𝒏 𝒆𝒔𝒑𝒆𝒄𝒊𝒂𝒍.
❥ 𝑺𝒖 𝒑𝒐𝒓𝒄𝒆𝒏𝒕𝒂𝒋𝒆 𝒅𝒆 𝒂𝒎𝒐𝒓 𝒆𝒔 𝒅𝒆𝒍 *${Math.floor(Math.random() * 100)}%*
━━━━━━━♥️ *𝑨𝑴𝑶𝑹* ♥️━━━━━━━`,

      `━━━━━━━💕 *𝑪𝑶𝑹𝑨𝒁𝑶𝑵𝑬𝑺* 💕━━━━━━━
❥ *${nombreUsuario}* y *${nombreMencionado}* están destinados a encontrarse.
❥ 𝑳𝒂 𝒆𝒔𝒕𝒓𝒆𝒍𝒍𝒂𝒔 𝒉𝒂𝒏 𝒂𝒍𝒊𝒏𝒆𝒂𝒅𝒐 𝒖𝒏 𝒂𝒎𝒐𝒓 𝒅𝒆 *${Math.floor(Math.random() * 100)}%*
━━━━━━━💕 *𝑪𝑶𝑹𝑨𝒁𝑶𝑵𝑬𝑺* 💕━━━━━━━`,

      `━━━━━━━🌟 *𝑫𝑬𝑺𝑻𝑰𝑵𝑶* 🌟━━━━━━━
❥ *${nombreUsuario}* 𝒍𝒆 𝒕𝒊𝒆𝒏𝒆 𝒖𝒏𝒂𝒔 𝒈𝒂𝒏𝒂𝒔 𝒅𝒆 𝒍𝒍𝒆𝒏𝒂𝒓 𝒅𝒆 𝒃𝒆𝒔𝒐𝒔 𝒂 *${nombreMencionado}*
❥ 𝑳𝒂 𝒄𝒐𝒏𝒆𝒙𝒊𝒐́𝒏 𝒆𝒔 𝒅𝒆 *${Math.floor(Math.random() * 100)}%*
━━━━━━━🌟 *𝑫𝑬𝑺𝑻𝑰𝑵𝑶* 🌟━━━━━━━`,

      `━━━━━━━💖 *𝑪𝑶𝑴𝑷𝑨𝑻𝑰𝑩𝑰𝑳𝑰𝑫𝑨𝑫* 💖━━━━━━━
❥ *${nombreUsuario}* 𝒚 *${nombreMencionado}* 𝒄𝒐𝒎𝒑𝒂𝒓𝒕𝒆𝒏 𝒖𝒏𝒂 𝒂𝒕𝒓𝒂𝒄𝒄𝒊𝒐́𝒏 𝒎𝒖𝒕𝒖𝒂.
❥ 𝑺𝒐𝒏 *${Math.floor(Math.random() * 100)}%* 𝒄𝒐𝒎𝒑𝒂𝒕𝒊𝒃𝒍𝒆𝒔.
━━━━━━━💖 *𝑪𝑶𝑴𝑷𝑨𝑻𝑰𝑩𝑰𝑳𝑰𝑫𝑨𝑫* 💖━━━━━━━`,

      `━━━━━━━✨ *𝑨𝑻𝑹𝑨𝑪𝑪𝑰𝑶́𝑵* ✨━━━━━━━
❥ *${nombreMencionado}* 𝒚 *${nombreUsuario}* 𝒕𝒊𝒆𝒏𝒆𝒏 𝒖𝒏𝒂 𝒄𝒉𝒊𝒔𝒑𝒂 𝒆𝒔𝒑𝒆𝒄𝒊𝒂𝒍.
❥ 𝑬𝒍 𝒂𝒎𝒐𝒓 𝒆𝒏𝒕𝒓𝒆 𝒆𝒍𝒍𝒐𝒔 𝒆𝒔 𝒅𝒆 𝒖𝒏 *${Math.floor(Math.random() * 100)}%*
━━━━━━━✨ *𝑨𝑻𝑹𝑨𝑪𝑪𝑰𝑶́𝑵* ✨━━━━━━━`
    ];
    
    const textoAleatorio = textosAmor[Math.floor(Math.random() * textosAmor.length)];
    
    // ==================== REACCIONES ====================
    await conn.sendMessage(m.chat, { react: { text: '💕', key: m.key } });
    
    // ==================== OBTENER STICKER ====================
    const res = await fetch('https://nekos.life/api/v2/img/kiss');
    const json = await res.json();
    const { url } = json;
    
    // ==================== ENVIAR TEXTO ====================
    await conn.sendMessage(m.chat, {
      text: textoAleatorio,
      mentions: [m.sender, usuario]
    }, { quoted: m });
    
    // ==================== ENVIAR STICKER ====================
    const stiker = await sticker(null, url, `💕 ${nombreUsuario} ❤️ ${nombreMencionado} 💕`);
    await conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, true);
    
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    
  } catch (e) {
    console.error('Error en comando amor:', e);
    await conn.reply(m.chat, `☑️ Ocurrió un error al enviar el mensaje de amor.`, m, rcanal);
  }
};

handler.command = /^(amor)$/i;
handler.group = true;

export default handler;
