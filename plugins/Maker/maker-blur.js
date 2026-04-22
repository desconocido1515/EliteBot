const handler = async (m, { conn }) => {
  try {
    // Obtener el usuario objetivo
    let who = m.quoted?.sender || (m.mentionedJid && m.mentionedJid[0]) || m.sender;
    
    // Reacción al inicio
    await conn.sendMessage(m.chat, {
      react: { text: '🖼️', key: m.key }
    });
    
    // Mensaje de espera
    await conn.reply(m.chat, `*Espera por favor, estoy aplicando el efecto blur* 🚀`, m, rcanal);
    
    // Obtener avatar
    let avatar;
    try {
      avatar = await conn.profilePictureUrl(who, 'image');
    } catch {
      avatar = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
    }
    
    const url = global.API('https://some-random-api.com', '/canvas/blur', { avatar });
    
    await conn.sendMessage(m.chat, {
      image: { url: url },
      caption: `☑️ *𝙴𝙵𝙴𝙲𝚃𝙾 𝙰𝙿𝙻𝙸𝙲𝙰𝙳𝙾*\nElite Bot Global - Since 2023®`
    });
    
    // Reacción al final
    await conn.sendMessage(m.chat, {
      react: { text: '✅', key: m.key }
    });
    
  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, `✦ ¡Hey!\nNo se pudo aplicar el efecto blur.`, m, rcanal);
  }
};

handler.help = ['blur', 'difuminar2'];
handler.tags = ['maker'];
handler.command = /^(blur|difuminar2)$/i;

export default handler;
