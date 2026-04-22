import {toAudio} from '../../lib/converter.js';

const handler = async (m, { conn, usedPrefix, command }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q || q.msg).mimetype || q.mediaType || '';
  
  if (!/video|audio/.test(mime)) {
    return conn.reply(m.chat, `☑️ 𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙴 𝙰𝙻 𝚅𝙸𝙳𝙴𝙾 𝙾 𝙽𝙾𝚃𝙰 𝙳𝙴 𝚅𝙾𝚉 𝚀𝚄𝙴 𝙳𝙴𝚂𝙴𝙴 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝚁 𝙰 𝙰𝚄𝙳𝙸𝙾/𝙼𝙿𝟹`, m, rcanal);
  }
  
  await conn.reply(m.chat, `☑️ 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝙴𝙽𝙳𝙾 𝙰 𝙰𝚄𝙳𝙸𝙾...`, m, rcanal);
  
  const media = await q.download();
  
  if (!media) {
    return conn.reply(m.chat, `☑️ 𝙻𝙾 𝙻𝙰𝙼𝙴𝙽𝚃𝙾, 𝙾𝙲𝚄𝚁𝚁𝙸𝙾 𝚄𝙽 𝙴𝚁𝚁𝙾𝚁 𝙰𝙻 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚁 𝙴𝙻 𝙰𝚁𝙲𝙷𝙸𝚅𝙾, 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁 𝚅𝚄𝙴𝙻𝚅𝙰 𝙰 𝙸𝙽𝚃𝙴𝙽𝚃𝙰𝚁𝙻𝙾`, m, rcanal);
  }
  
  const audio = await toAudio(media, 'mp4');
  
  if (!audio.data) {
    return conn.reply(m.chat, `☑️ 𝙻𝙾 𝙻𝙰𝙼𝙴𝙽𝚃𝙾, 𝙾𝙲𝚄𝚁𝚁𝙸𝙾 𝚄𝙽 𝙴𝚁𝚁𝙾𝚁 𝙰𝙻 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝚁 𝙴𝙻 𝙰𝚁𝙲𝙷𝙸𝚅𝙾 𝙰 𝙰𝚄𝙳𝙸𝙾/𝙼𝙿𝟹, 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁 𝚅𝚄𝙴𝙻𝚅𝙰 𝙰 𝙸𝙽𝚃𝙴𝙽𝚃𝙰𝚁𝙻𝙾`, m, rcanal);
  }
  
  await conn.sendMessage(m.chat, { audio: audio.data, mimetype: 'audio/mpeg', ptt: false }, { quoted: m });
};

handler.alias = ['tomp3', 'toaudio'];
handler.command = /^to(mp3|audio)$/i;

export default handler;
