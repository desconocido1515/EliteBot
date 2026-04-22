import axios from 'axios';

const handler = async (m, { conn }) => {
  try {
    // Misma lógica que lolice
    let who = m.quoted?.sender || (m.mentionedJid && m.mentionedJid[0]) || m.sender;
    
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
    
    // Llamar a la API para generar imagen con fondo arcoíris
    const response = await axios.get(`https://some-random-api.com/canvas/rainbow?avatar=${encodeURIComponent(avatar)}`, { responseType: 'arraybuffer' });
    
    const imageBuffer = Buffer.from(response.data, 'binary');
    
    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: `☑️ *IMAGEN GENERADA*\n\nUsuario: @${who.split('@')[0]}\n\nElite Bot Global - Since 2023®`
    });
    
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
