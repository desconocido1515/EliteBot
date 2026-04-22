/* 𝐂𝐑𝐄𝐀𝐃𝐎 𝐏𝐎𝐑 https://github.com/BrunoSobrino */

let handler = async (m, { conn }) => {
  if (!m.quoted) {
    return conn.reply(m.chat, `☑️ 𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙴 𝙰 𝚄𝙽 𝚅𝙸𝙳𝙴𝙾 𝚀𝚄𝙴 𝙳𝙴𝚂𝙴𝙴 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝚁 𝙴𝙽 𝙶𝙸𝙵 𝙲𝙾𝙽 𝙰𝚄𝙳𝙸𝙾`, m, rcanal);
  }
  
  const q = m.quoted || m;
  let mime = (q.msg || q).mimetype || "";
  
  if (!/(mp4)/.test(mime)) {
    return conn.reply(m.chat, `☑️ 𝙴𝙻 𝚃𝙸𝙿𝙾 𝙳𝙴 𝙰𝚁𝙲𝙷𝙸𝚅𝙾 ${mime} 𝙽𝙾 𝙴𝚂 𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙾, 𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙰 𝙰 𝚄𝙽 𝚅𝙸𝙳𝙴𝙾 𝙼𝙿𝟺 𝙿𝙰𝚁𝙰 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝚁 𝙴𝙽 𝙶𝙸𝙵`, m, rcanal);
  }
  
  await conn.reply(m.chat, `☑️ 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝙴𝙽𝙳𝙾 𝙰 𝙶𝙸𝙵...`, m, rcanal);
  
  let media = await q.download();
  
  await conn.sendMessage(
    m.chat,
    { video: media, gifPlayback: true, caption: "*ᴀϙᴜɪ ᴇsᴛᴀ sᴜ ɢɪғ ᴄᴏɴ ᴀᴜᴅɪᴏ, ᴀʟ ᴀʙʀɪʀʟᴏ sᴇ ʀᴇᴘʀᴏᴅᴜᴄᴇ ᴄᴏɴ ᴀᴜᴅɪᴏ*" },
    { quoted: m }
  );
};

handler.command = ["togif"];
export default handler;
