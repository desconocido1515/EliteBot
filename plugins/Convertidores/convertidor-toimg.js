import {webp2png} from '../../lib/webp2mp4.js';

const handler = async (m, { conn, usedPrefix, command }) => {
  const notStickerMessage = `☑️ 𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙰 𝙰𝙻 𝚂𝚃𝙸𝙲𝙺𝙴𝚁 𝚀𝚄𝙴 𝙳𝙴𝚂𝙴𝙴 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝚁 𝙴𝙽 𝙸𝙼𝙰𝙶𝙴𝙽 𝙲𝙾𝙽 𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 ${usedPrefix + command}`;
  
  if (!m.quoted) {
    return conn.reply(m.chat, notStickerMessage, m, rcanal);
  }
  
  const q = m.quoted || m;
  const mime = q.mediaType || '';
  
  if (!/sticker/.test(mime)) {
    return conn.reply(m.chat, notStickerMessage, m, rcanal);
  }
  
  await conn.reply(m.chat, `☑️ 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝙴𝙽𝙳𝙾 𝚂𝚃𝙸𝙲𝙺𝙴𝚁 𝙰 𝙸𝙼𝙰𝙶𝙴𝙽...`, m, rcanal);
  
  const media = await q.download();
  const out = await webp2png(media).catch((_) => null) || Buffer.alloc(0);
  
  await conn.sendFile(m.chat, out, 'error.png', null, m);
};

handler.help = ['toimg (reply)'];
handler.tags = ['sticker'];
handler.command = ['toimg', 'jpg', 'img'];

export default handler;
