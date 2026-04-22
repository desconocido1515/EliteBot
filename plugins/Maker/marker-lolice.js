// plugins/maker.js

// ==================== SIMPCARD ====================
const handlerSimp = async (m, { conn }) => {
  try {
    let who = m.quoted?.sender || (m.mentionedJid && m.mentionedJid[0]) || m.sender;
    
    await conn.sendMessage(m.chat, { react: { text: '🖼️', key: m.key } });
    await conn.reply(m.chat, `☑️ Procesando tu solicitud, por favor espera un momento...`, m, rcanal);
    
    let avatar;
    try {
      avatar = await conn.profilePictureUrl(who, 'image');
    } catch {
      avatar = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
    }
    
    const url = global.API('https://some-random-api.com', '/canvas/simpcard', { avatar });
    
    await conn.sendMessage(m.chat, {
      image: { url: url },
      caption: `☑️ *TARJETA SIMP GENERADA*\n\nUsuario: @${who.split('@')[0]}\n\nElite Bot Global - Since 2023®`
    });
    
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
  } catch (e) {
    await conn.reply(m.chat, `☑️ Ocurrió un error al generar la tarjeta. Intenta nuevamente.`, m, rcanal);
  }
};

// ==================== BLUR ====================
const handlerBlur = async (m, { conn }) => {
  try {
    let who = m.quoted?.sender || (m.mentionedJid && m.mentionedJid[0]) || m.sender;
    
    await conn.sendMessage(m.chat, { react: { text: '🖼️', key: m.key } });
    await conn.reply(m.chat, `☑️ Aplicando efecto blur, por favor espera...`, m, rcanal);
    
    let avatar;
    try {
      avatar = await conn.profilePictureUrl(who, 'image');
    } catch {
      avatar = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
    }
    
    const url = global.API('https://some-random-api.com', '/canvas/blur', { avatar });
    
    await conn.sendMessage(m.chat, {
      image: { url: url },
      caption: `☑️ *EFECTO BLUR APLICADO*\n\nUsuario: @${who.split('@')[0]}\n\nElite Bot Global - Since 2023®`
    });
    
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
  } catch (e) {
    await conn.reply(m.chat, `☑️ No se pudo aplicar el efecto blur. Intenta nuevamente.`, m, rcanal);
  }
};

// ==================== HORNYCARD ====================
const handlerHorny = async (m, { conn }) => {
  try {
    let who = m.quoted?.sender || (m.mentionedJid && m.mentionedJid[0]) || m.sender;
    
    await conn.sendMessage(m.chat, { react: { text: '🖼️', key: m.key } });
    await conn.reply(m.chat, `☑️ Generando tarjeta, por favor espera...`, m, rcanal);
    
    let avatar;
    try {
      avatar = await conn.profilePictureUrl(who, 'image');
    } catch {
      avatar = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
    }
    
    const url = global.API('https://some-random-api.com', '/canvas/horny', { avatar });
    
    await conn.sendMessage(m.chat, {
      image: { url: url },
      caption: `☑️ *TARJETA GENERADA*\n\nUsuario: @${who.split('@')[0]}\n\nElite Bot Global - Since 2023®`
    });
    
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
  } catch (e) {
    await conn.reply(m.chat, `☑️ Ocurrió un error al generar la tarjeta. Intenta nuevamente.`, m, rcanal);
  }
};

// ==================== ITS SO STUPID ====================
const handlerStupid = async (m, { conn, args }) => {
  try {
    const text = args.slice(1).join(' ') || 'im+stupid';
    let who = m.quoted?.sender || (m.mentionedJid && m.mentionedJid[0]) || m.sender;
    
    await conn.sendMessage(m.chat, { react: { text: '🖼️', key: m.key } });
    await conn.reply(m.chat, `☑️ Procesando tu solicitud, por favor espera...`, m, rcanal);
    
    let avatar;
    try {
      avatar = await conn.profilePictureUrl(who, 'image');
    } catch {
      avatar = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
    }
    
    const url = global.API('https://some-random-api.com', '/canvas/its-so-stupid', { avatar, dog: text });
    const nombre = await conn.getName(who);
    
    await conn.sendMessage(m.chat, {
      image: { url: url },
      caption: `☑️ *IMAGEN GENERADA*\n\nUsuario: @${nombre}\n\nElite Bot Global - Since 2023®`
    });
    
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
  } catch (e) {
    await conn.reply(m.chat, `☑️ No se pudo generar la imagen. Intenta nuevamente.`, m, rcanal);
  }
};

// ==================== PIXELATE ====================
const handlerPixel = async (m, { conn, text }) => {
  try {
    let who = m.sender;
    
    await conn.sendMessage(m.chat, { react: { text: '🖼️', key: m.key } });
    await conn.reply(m.chat, `☑️ Aplicando efecto pixelado, por favor espera...`, m, rcanal);
    
    let avatar;
    try {
      avatar = await conn.profilePictureUrl(who, 'image');
    } catch {
      avatar = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
    }
    
    const url = global.API('https://some-random-api.com', '/canvas/pixelate', { avatar, comment: text || '' });
    
    await conn.sendMessage(m.chat, {
      image: { url: url },
      caption: `☑️ *EFECTO PIXELADO APLICADO*\n\nUsuario: @${who.split('@')[0]}\n\nElite Bot Global - Since 2023®`
    });
    
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
  } catch (e) {
    await conn.reply(m.chat, `☑️ No se pudo pixelar la imagen. Intenta nuevamente.`, m, rcanal);
  }
};

// ==================== LOLICE ====================
const handlerLolice = async (m, { conn }) => {
  try {
    let who = m.quoted?.sender || (m.mentionedJid && m.mentionedJid[0]) || m.sender;
    
    await conn.sendMessage(m.chat, { react: { text: '🖼️', key: m.key } });
    await conn.reply(m.chat, `☑️ Generando tarjeta, por favor espera...`, m, rcanal);
    
    let avatar;
    try {
      avatar = await conn.profilePictureUrl(who, 'image');
    } catch {
      avatar = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
    }
    
    const url = global.API('https://some-random-api.com', '/canvas/lolice', { avatar });
    
    await conn.sendMessage(m.chat, {
      image: { url: url },
      caption: `☑️ *TARJETA GENERADA*\n\nUsuario: @${who.split('@')[0]}\n\nElite Bot Global - Since 2023®`
    });
    
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
  } catch (e) {
    await conn.reply(m.chat, `☑️ Ocurrió un error al generar la tarjeta. Intenta nuevamente.`, m, rcanal);
  }
};

// ==================== HANDLER UNIFICADO ====================
let handler = async (m, { conn, args, command }) => {
  if (command === 'simpcard' || command === 'simp') {
    return handlerSimp(m, { conn });
  }
  if (command === 'blur' || command === 'difuminar2') {
    return handlerBlur(m, { conn });
  }
  if (command === 'hornycard' || command === 'hornylicense') {
    return handlerHorny(m, { conn });
  }
  if (command === 'itssostupid' || command === 'iss' || command === 'stupid') {
    return handlerStupid(m, { conn, args });
  }
  if (command === 'pixel' || command === 'pixelar' || command === 'difuminar') {
    return handlerPixel(m, { conn, text: args.join(' ') });
  }
  if (command === 'lolice') {
    return handlerLolice(m, { conn });
  }
};

handler.help = ['simpcard', 'blur', 'hornycard', 'itssostupid', 'pixel', 'lolice'];
handler.tags = ['maker'];
handler.command = /^(simpcard|simp|blur|difuminar2|hornycard|hornylicense|itssostupid|iss|stupid|pixel|pixelar|difuminar|lolice)$/i;

export default handler;
