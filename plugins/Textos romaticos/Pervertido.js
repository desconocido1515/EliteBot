import fetch from 'node-fetch';
import { sticker } from '../../lib/sticker.js';

let handler = async (m, { conn, text, command }) => {
  try {
    // RESTRICCIÓN: debe mencionar o responder a un usuario
    let mentionedJid = await m.mentionedJid;
    let usuario = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null;
    
    if (!usuario) {
      return conn.reply(m.chat, `☑️ *DEBES MENCIONAR O RESPONDER A UN USUARIO*\n\n📌 *Ejemplo:*\n.${command} @usuario\n\n📌 *O responde al mensaje de la persona*`, m, rcanal);
    }
    
    if (usuario === m.sender) {
      return conn.reply(m.chat, `☑️ No puedes hacerte esto a ti mismo. Menciona a otra persona.`, m, rcanal);
    }
    
    const nombreUsuario = m.pushName || m.sender.split('@')[0];
    const nombreMencionado = await conn.getName(usuario);
    
    // Textos según el comando
    let texto = '';
    if (command === 'pervertida') {
      texto = `ㅤㅤㅤㅤㅤ💌 *⌈* 𝑪𝑶𝑵𝑭𝑬𝑺𝑰𝑶́𝑵 𝑷𝑬𝑹𝑽𝑬𝑹𝑻𝑰𝑫𝑨 *⌋* 💌
    
𝑫𝑬: @${nombreUsuario} 
𝑷𝑨𝑹𝑨: @${nombreMencionado}

𝑴𝒆 𝒈𝒖𝒔𝒕𝒂 𝒎𝒊 𝒄𝒂𝒎𝒂, 𝒑𝒆𝒓𝒐 𝒂𝒉𝒐𝒓𝒂 𝒎𝒊𝒔𝒎𝒐 𝒔𝒐𝒍𝒐 𝒒𝒖𝒊𝒆𝒓𝒐 𝒆𝒔𝒕𝒂𝒓 𝒆𝒏 𝒍𝒂 𝒕𝒖𝒚𝒂, 𝒒𝒖𝒆 𝒎𝒆 𝒉𝒂𝒈𝒂𝒔 𝒕𝒖𝒚𝒂 , 𝒎𝒆 𝒃𝒆𝒔𝒆𝒔 𝒆𝒍 𝒄𝒖𝒆𝒍𝒍𝒐 𝒚 𝒃𝒓𝒊𝒏𝒄𝒂𝒓 𝒆𝒏𝒄𝒊𝒎𝒂 𝒅𝒆 𝒕𝒊 𝒕𝒐𝒅𝒂 𝒍𝒂 𝒏𝒐𝒄𝒉𝒆.`.trim();
    } else if (command === 'pervertido') {
      texto = `ㅤㅤㅤㅤㅤ💌 *⌈* 𝑪𝑶𝑵𝑭𝑬𝑺𝑰𝑶́𝑵 𝑷𝑬𝑹𝑽𝑬𝑹𝑻𝑰𝑫𝑶 *⌋* 💌
    
𝑫𝑬: @${nombreUsuario} 
𝑷𝑨𝑹𝑨: @${nombreMencionado}

𝑴𝒆 𝒈𝒖𝒔𝒕𝒂 𝒎𝒊 𝒄𝒂𝒎𝒂, 𝒑𝒆𝒓𝒐 𝒂𝒉𝒐𝒓𝒂 𝒎𝒊𝒔𝒎𝒐 𝒔𝒐𝒍𝒐 𝒒𝒖𝒊𝒆𝒓𝒐 𝒆𝒔𝒕𝒂𝒓 𝒆𝒏 𝒍𝒂 𝒕𝒖𝒚𝒂, 𝒒𝒖𝒆 𝒎𝒆 𝒉𝒂𝒈𝒂𝒔 𝒕𝒖𝒚𝒐 , 𝒎𝒆 𝒃𝒆𝒔𝒆𝒔 𝒆𝒍 𝒄𝒖𝒆𝒍𝒍𝒐 𝒚 𝒃𝒓𝒊𝒏𝒄𝒂𝒓 𝒆𝒏𝒄𝒊𝒎𝒂 𝒅𝒆 𝒕𝒊 𝒕𝒐𝒅𝒂 𝒍𝒂 𝒏𝒐𝒄𝒉𝒆.`.trim();
    }
    
    // Reacción según el comando
    const emoji = command === 'pervertida' ? '💋' : '🔥';
    await conn.sendMessage(m.chat, { react: { text: emoji, key: m.key } });
    
    // Obtener imagen de la API
    const res = await fetch('https://nekos.life/api/v2/img/lewd');
    const json = await res.json();
    const { url } = json;
    
    // Enviar mensaje de texto con menciones
    await conn.sendMessage(m.chat, {
      text: texto,
      mentions: [m.sender, usuario]
    }, { quoted: m });
    
    // Crear y enviar sticker
    const stiker = await sticker(null, url, `@${nombreUsuario} le envió un mensaje picante a @${nombreMencionado}`);
    await conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, true);
    
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    
  } catch (e) {
    console.error('Error en comando pervertido/a:', e);
    await conn.reply(m.chat, `☑️ Ocurrió un error al enviar tu confesión.`, m, rcanal);
  }
};

handler.command = /^(pervertida|pervertido)$/i;
handler.group = true;

export default handler;
