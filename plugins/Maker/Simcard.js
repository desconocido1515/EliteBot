const handler = async (m, { conn }) => {
  try {
    // Obtener el usuario objetivo
    let who = m.quoted?.sender || (m.mentionedJid && m.mentionedJid[0]) || m.sender;
    
    // Reacción al inicio
    await conn.sendMessage(m.chat, {
      react: { text: '🖼️', key: m.key }
    });
    
    // Mensaje de espera
    await conn.reply(m.chat, `*Espera por favor, estoy creando tu tarjeta SIMP* 🚀`, m, rcanal);
    
    // Obtener avatar
    let avatar;
    try {
      avatar = await conn.profilePictureUrl(who, 'image');
    } catch {
      avatar = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
    }
    
    const url = global.API('https://some-random-api.com', '/canvas/simpcard', { avatar });
    
    await conn.sendMessage(m.chat, {
      image: { url: url },
      caption: `*¡¡𝚃𝚄 𝚁𝙴𝙻𝙸𝙶𝙸𝙾𝙽 𝙴𝚂 𝚂𝙴𝚁 𝚄𝙽 𝚂𝙸𝙼𝙿!!* ☑️\nElite Bot Global - Since 2023®`
    });
    
    // Reacción al final
    await conn.sendMessage(m.chat, {
      react: { text: '😢', key: m.key }
    });
    
  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, `✦ ¡Hey!\nNo se pudo generar la tarjeta SIMP.`, m, rcanal);
  }
};

handler.help = ['simpcard'];
handler.tags = ['maker'];
handler.command = /^(simpcard|simp)$/i;

export default handler;
