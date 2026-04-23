var handler = async (m, { conn, command, text }) => {
  if (!text) {
    return conn.reply(m.chat, `🍭 𝙴𝚂𝙲𝚁𝙸𝙱𝙴 𝙴𝙻 𝙽𝙾𝙼𝙱𝚁𝙴 𝙳𝙴 𝙳𝙾𝚂 𝙿𝙴𝚁𝚂𝙾𝙽𝙰𝚂 𝙾 𝙴𝚃𝙸𝚀𝚄𝙴𝚃𝙰𝙻𝙾𝚂 𝙿𝙰𝚁𝙰 𝙲𝙰𝙻𝙲𝚄𝙻𝙰𝚁 𝚂𝙸 𝚂𝙴 𝙿𝚄𝙴𝙳𝙴𝙽 𝙲𝚄𝙻𝙴𝙰𝚁.`, m, rcanal);
  }
  
  let [text1, ...text2] = text.split(' ');
  text2 = (text2 || []).join(' ');
  
  if (!text2) {
    return conn.reply(m.chat, `🔥 𝙴𝚂𝙲𝚁𝙸𝙱𝙴 𝙾 𝙴𝚃𝙸𝚀𝚄𝙴𝚃𝙰 𝙴𝙻 𝙽𝙾𝙼𝙱𝚁𝙴 𝙳𝙴 𝙻𝙰 𝚂𝙴𝙶𝚄𝙽𝙳𝙰 𝙿𝙴𝚁𝚂𝙾𝙽𝙰.`, m, rcanal);
  }
  
  let love = `━━━━━━━━━━━━━━━
😈 *${text1}* 𝙏𝙐 𝙊𝙋𝙊𝙍𝙏𝙐𝙉𝙄𝘿𝘼𝘿 𝘿𝙀 𝘾𝙐𝙇𝙀𝘼𝙍𝙏𝙀 𝘼 *${text2}* 𝙀𝙎 𝘿𝙀 *${Math.floor(Math.random() * 100)}%* 🔥 
━━━━━━━━━━━━━━━
𝙀𝙇𝙄𝙏𝙀 𝘽𝙊𝙏 𝙂𝙇𝙊𝘽𝘼𝙇`.trim();
  
  m.reply(love, null, { mentions: conn.parseMention(love) });
}

handler.help = ['love']
handler.tags = ['fun']
handler.command = /^(culear|culiar)$/i

export default handler;
