import fetch from 'node-fetch';
import { unlinkSync, readFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

let handler = async (m, { conn }) => {
  try {
    // Usar la misma lógica de promote
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
      avatar = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
    }
    
    // Usar la API de some-random-api para efecto gay
    const url = `https://some-random-api.com/canvas/gay?avatar=${encodeURIComponent(avatar)}`;
    
    // Enviar imagen con el texto
    await conn.sendMessage(m.chat, {
      image: { url: url },
      caption: `☑️ *MIREN A ESTE GAY JAJAJAJA* 👬🏻 🏳️‍🌈\n\n👤 *Usuario:* @${name}\n\nElite Bot Global - Since 2023®`
    });
    
    // Descargar audio y guardar temporalmente
    const audioUrl = 'https://files.catbox.moe/2ksqaa.mp3';
    const audioBuffer = await (await fetch(audioUrl)).buffer();
    
    // Guardar temporalmente
    const tempFile = join(tmpdir(), `${Date.now()}.mp3`);
    const outFile = join(tmpdir(), `${Date.now()}.opus`);
    
    const fs = await import('fs');
    fs.writeFileSync(tempFile, audioBuffer);
    
    // Convertir a opus usando ffmpeg (misma lógica que tu plugin de audio)
    exec(`ffmpeg -i "${tempFile}" -vn -c:a libopus -b:a 128k "${outFile}"`, async (err) => {
      try { unlinkSync(tempFile) } catch {}
      
      if (err) {
        console.error(err);
        return;
      }
      
      let buff = readFileSync(outFile);
      
      await conn.sendFile(
        m.chat,
        buff,
        'audio.opus',
        null,
        m,
        rcanal,
        {
          mimetype: 'audio/ogg; codecs=opus',
          ptt: true
        }
      );
      
      try { unlinkSync(outFile) } catch {}
    });
    
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    
  } catch (error) {
    console.error('Error:', error);
    await conn.reply(m.chat, `☑️ No se pudo generar la imagen. El servicio puede estar temporalmente fuera de servicio.`, m, rcanal);
  }
};

handler.help = ['gay'];
handler.tags = ['maker'];
handler.command = /^(gay)$/i;

export default handler;
