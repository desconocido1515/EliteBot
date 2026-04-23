import fetch from 'node-fetch';

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
    
    // Enviar audio usando la misma lógica que tu plugin de bienvenida
    const audioUrl = 'https://raw.githubusercontent.com/desconocido1515/desco/main/media/gay.mp3';
    const audio = await (await fetch(audioUrl)).buffer();
    
    await conn.sendMessage(m.chat, {
      audio: audio,
      mimetype: 'audio/mpeg',
      ptt: true
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
