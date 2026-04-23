import axios from 'axios';
import fs from 'fs';
import path from 'path';

const handler = async (m, { conn }) => {
  try {
    // Usar la misma lógica que promote
    let mentionedJid = await m.mentionedJid;
    let who = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null;
    
    if (!who) {
      return conn.reply(m.chat, `☑️ Debes mencionar a un usuario o responder a su mensaje.\n\n📌 *Ejemplo:*\n.gay @usuario`, m, rcanal);
    }
    
    let name = await conn.getName(who);
    
    await conn.sendMessage(m.chat, {
      react: { text: '🖼️', key: m.key }
    });
    
    await conn.reply(m.chat, `☑️ Procesando tu solicitud, por favor espera un momento...`, m, rcanal);
    
    // Obtener avatar
    let avatar;
    try {
      avatar = await conn.profilePictureUrl(who, 'image');
    } catch {
      avatar = 'https://i.ibb.co/1ZxrXKJ/avatar-contact.jpg';
    }
    
    // Usar la API de some-random-api para efecto gay
    const url = `https://some-random-api.com/canvas/gay?avatar=${encodeURIComponent(avatar)}`;
    
    // Enviar imagen con el texto
    await conn.sendMessage(m.chat, {
      image: { url: url },
      caption: `☑️ *MIREN A ESTE GAY JAJAJAJA* 👬🏻 🏳️‍🌈\n\n👤 *Usuario:* @${name}\n\nElite Bot Global - Since 2023®`
    });
    
    // Enviar audio después de la imagen (ruta corregida)
    const audioPath = 'audios/gay.mp3';
    if (fs.existsSync(audioPath)) {
      const audioBuffer = fs.readFileSync(audioPath);
      await conn.sendMessage(m.chat, {
        audio: audioBuffer,
        mimetype: 'audio/mpeg',
        ptt: true
      });
    } else {
      console.log('Audio no encontrado en:', audioPath);
      // Intentar con ruta alternativa
      const audioPath2 = './audios/gay.mp3';
      if (fs.existsSync(audioPath2)) {
        const audioBuffer = fs.readFileSync(audioPath2);
        await conn.sendMessage(m.chat, {
          audio: audioBuffer,
          mimetype: 'audio/mpeg',
          ptt: true
        });
      } else {
        console.log('Audio no encontrado en ninguna ruta');
      }
    }
    
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    
  } catch (error) {
    console.error('Error al obtener la imagen:', error);
    await conn.reply(m.chat, `☑️ No se pudo generar la imagen. El servicio puede estar temporalmente fuera de servicio.`, m, rcanal);
  }
};

handler.help = ['gay'];
handler.tags = ['maker'];
handler.command = /^(gay)$/i;

export default handler;
