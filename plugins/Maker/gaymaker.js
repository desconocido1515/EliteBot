import axios from 'axios';

const handler = async (m, { conn }) => {
  try {
    // Misma lógica que lolice
    let who = m.quoted?.sender || (m.mentionedJid && m.mentionedJid[0]) || m.sender;
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
    
    await conn.sendMessage(m.chat, {
      image: { url: url },
      caption: `☑️ *IMAGEN GENERADA*\n\n🏳️‍🌈 *Usuario:* @${name}\n\nElite Bot Global - Since 2023®`
    });
    
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    
  } catch (error) {
    console.error('Error al obtener la imagen:', error);
    await conn.reply(m.chat, `☑️ No se pudo generar la imagen. El servicio puede estar temporalmente fuera de servicio.`, m, rcanal);
  }
};

handler.help = ['gay5'];
handler.tags = ['maker'];
handler.command = /^(gay5)$/i;

export default handler;
