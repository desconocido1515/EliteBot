// plugins/sorteos.js

/*---------------------------------------------------------------------------------------
  🍀 • By https://github.com/HACHEJOTA
  📌 PLUGIN UNIFICADO: sorteos (sorteo, sorteo2, sorteo3, sorteo4, sorteo5, sorteo6)
-----------------------------------------------------------------------------------------*/

import util from 'util'
import path from 'path'

let user = a => '@' + a.split('@')[0]

// ==================== SORTEO (1 participante) ====================
async function handlerSorteo(m, { groupMetadata, command, conn, text, usedPrefix }) {
  if (!text) {
    return conn.reply(m.chat, `𝙀𝙟𝙚𝙢𝙥𝙡𝙤 𝙙𝙚 𝙪𝙨𝙤:\n.sorteo 𝙩𝙚𝙭𝙩𝙤`, m, rcanal)
  }
  let ps = groupMetadata.participants.map(v => v.id)
  let a = ps.getRandom()
  let k = Math.floor(Math.random() * 70);
  let x = `${pickRandom(['ㅤ'])}`
  let l = Math.floor(Math.random() * x.length);
  let vn = ``
  let top = `*${x}🎊━━━𝙎𝙊𝙍𝙏𝙀𝙊━━━🎊*

📩 𝙈𝙀𝙉𝙎𝘼𝙅𝙀: 
*${text} ${x}*
*_________________*
» 𝙄𝙉𝙏𝙀𝙂𝙍𝘼𝙉𝙏𝙀 𝘼𝙇 𝘼𝙕𝘼𝙍 𝙀𝙎: 
👤 *${user(a)}*
*_________________*
⇝𝙏𝙄𝙀𝙉𝙀𝙎 𝙋𝙇𝘼𝙕𝙊 𝘿𝙀 𝘾𝙊𝙉𝙁𝙄𝙍𝙈𝘼𝙍𝙈𝙀 𝙀𝙉 𝙋𝙍𝙄𝙑𝘼𝘿𝙊, 𝙀𝙉 𝘾𝘼𝙎𝙊 𝘾𝙊𝙉𝙏𝙍𝘼𝙍𝙄𝙊́ 𝙀𝙎𝙏𝘼𝙎 𝙁𝙐𝙀𝙍𝘼 𝘿𝙀 𝙂𝙍𝙐𝙋𝙊.
*_________________*
`
  let txt = '';
  let count = 0;
  for (const c of top) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;
    if (count % 10 === 0) {
      conn.sendPresenceUpdate('composing', m.chat);
    }
  }
  await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });
  conn.sendFile(m.chat, vn, '🏆ACERQUESE A RECLAMAR SU PREMIO🏅', null, m, true, {
    type: 'audioMessage',
    ptt: true
  })
}

// ==================== SORTEO2 (2 participantes) ====================
async function handlerSorteo2(m, { groupMetadata, command, conn, text, usedPrefix }) {
  if (!text) {
    return conn.reply(m.chat, `𝙀𝙟𝙚𝙢𝙥𝙡𝙤 𝙙𝙚 𝙪𝙨𝙤:\n.sorteo2 𝙩𝙚𝙭𝙩𝙤`, m, rcanal)
  }
  let ps = groupMetadata.participants.map(v => v.id)
  let a = ps.getRandom()
  let b = ps.getRandom()
  let k = Math.floor(Math.random() * 70);
  let x = `${pickRandom(['ㅤ'])}`
  let l = Math.floor(Math.random() * x.length);
  let vn = ``
  let top = `*${x}🎊━━━𝙎𝙊𝙍𝙏𝙀𝙊━━━🎊*

📩 𝙈𝙀𝙉𝙎𝘼𝙅𝙀: 
*${text} ${x}*
*_________________*
» 𝙄𝙉𝙏𝙀𝙂𝙍𝘼𝙉𝙏𝙀𝙎 𝘼𝙇 𝘼𝙕𝘼𝙍 𝙎𝙊𝙉: 
🥷🏻 *${user(a)}*
🥷🏻 *${user(b)}*
*_________________*
⇝𝙏𝙄𝙀𝙉𝙀𝙉 𝙋𝙇𝘼𝙕𝙊 𝘿𝙀 𝘾𝙊𝙉𝙁𝙄𝙍𝙈𝘼𝙍𝙈𝙀 𝙀𝙉 𝙋𝙍𝙄𝙑𝘼𝘿𝙊, 𝙀𝙉 𝘾𝘼𝙎𝙊 𝘾𝙊𝙉𝙏𝙍𝘼𝙍𝙄𝙊́ 𝙀𝙎𝙏𝘼𝙉 𝙁𝙐𝙀𝙍𝘼 𝘿𝙀 𝙂𝙍𝙐𝙋𝙊.
*_________________*
`
  let txt = '';
  let count = 0;
  for (const c of top) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;
    if (count % 10 === 0) {
      conn.sendPresenceUpdate('composing', m.chat);
    }
  }
  await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });
  
  // Enviar imagen (la URL que tenías)
  await conn.sendMessage(m.chat, {
    image: { url: 'https://raw.githubusercontent.com/desconocido1515/desco/main/media/sorteo.jpeg' },
    caption: txt.trim(),
    mentions: conn.parseMention(txt)
  }, { quoted: m });
  
  conn.sendFile(m.chat, vn, '🏆ACERQUESE A RECLAMAR SU PREMIO🏅', null, m, true, {
    type: 'audioMessage',
    ptt: true
  })
}

// ==================== SORTEO3 (3 participantes) ====================
async function handlerSorteo3(m, { groupMetadata, command, conn, text, usedPrefix }) {
  if (!text) {
    return conn.reply(m.chat, `𝙀𝙟𝙚𝙢𝙥𝙡𝙤 𝙙𝙚 𝙪𝙨𝙤:\n.sorteo3 𝙩𝙚𝙭𝙩𝙤`, m, rcanal)
  }
  let ps = groupMetadata.participants.map(v => v.id)
  let a = ps.getRandom()
  let b = ps.getRandom()
  let c = ps.getRandom()
  let k = Math.floor(Math.random() * 70);
  let x = `${pickRandom(['ㅤ'])}`
  let l = Math.floor(Math.random() * x.length);
  let vn = ``
  let top = `*${x}🎊━━━𝙎𝙊𝙍𝙏𝙀𝙊━━━🎊*

📩 𝙈𝙀𝙉𝙎𝘼𝙅𝙀: 
*${text} ${x}*
*_________________*
» 𝙄𝙉𝙏𝙀𝙂𝙍𝘼𝙉𝙏𝙀𝙎 𝘼𝙇 𝘼𝙕𝘼𝙍 𝙎𝙊𝙉: 
🥷🏻 *${user(a)}*
🥷🏻 *${user(b)}*
🥷🏻 *${user(c)}*
*_________________*
⇝𝙏𝙄𝙀𝙉𝙀𝙉 𝙋𝙇𝘼𝙕𝙊 𝘿𝙀 𝘾𝙊𝙉𝙁𝙄𝙍𝙈𝘼𝙍𝙈𝙀 𝙀𝙉 𝙋𝙍𝙄𝙑𝘼𝘿𝙊, 𝙀𝙉 𝘾𝘼𝙎𝙊 𝘾𝙊𝙉𝙏𝙍𝘼𝙍𝙄𝙊́ 𝙀𝙎𝙏𝘼𝙉 𝙁𝙐𝙀𝙍𝘼 𝘿𝙀 𝙂𝙍𝙐𝙋𝙊.
*_________________*
`
  let txt = '';
  let count = 0;
  for (const c of top) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;
    if (count % 10 === 0) {
      conn.sendPresenceUpdate('composing', m.chat);
    }
  }
  await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });
  conn.sendFile(m.chat, vn, '🏆ACERQUESE A RECLAMAR SU PREMIO🏅', null, m, true, {
    type: 'audioMessage',
    ptt: true
  })
}

// ==================== SORTEO4 (4 participantes) ====================
async function handlerSorteo4(m, { groupMetadata, command, conn, text, usedPrefix }) {
  if (!text) {
    return conn.reply(m.chat, `𝙀𝙟𝙚𝙢𝙥𝙡𝙤 𝙙𝙚 𝙪𝙨𝙤:\n.sorteo4 𝙩𝙚𝙭𝙩𝙤`, m, rcanal)
  }
  let ps = groupMetadata.participants.map(v => v.id)
  let a = ps.getRandom()
  let b = ps.getRandom()
  let c = ps.getRandom()
  let d = ps.getRandom()
  let k = Math.floor(Math.random() * 70);
  let x = `${pickRandom(['ㅤ'])}`
  let l = Math.floor(Math.random() * x.length);
  let vn = ``
  let top = `*${x}🎊━━━𝙎𝙊𝙍𝙏𝙀𝙊━━━🎊*

📩 𝙈𝙀𝙉𝙎𝘼𝙅𝙀: 
*${text} ${x}*
*_________________*
» 𝙄𝙉𝙏𝙀𝙂𝙍𝘼𝙉𝙏𝙀𝙎 𝘼𝙇 𝘼𝙕𝘼𝙍 𝙎𝙊𝙉: 
🥷🏻 *${user(a)}*
🥷🏻 *${user(b)}*
🥷🏻 *${user(c)}*
🥷🏻 *${user(d)}*
*_________________*
⇝𝙏𝙄𝙀𝙉𝙀𝙉 𝙋𝙇𝘼𝙕𝙊 𝘿𝙀 𝘾𝙊𝙉𝙁𝙄𝙍𝙈𝘼𝙍𝙈𝙀 𝙀𝙉 𝙋𝙍𝙄𝙑𝘼𝘿𝙊, 𝙀𝙉 𝘾𝘼𝙎𝙊 𝘾𝙊𝙉𝙏𝙍𝘼𝙍𝙄𝙊́ 𝙀𝙎𝙏𝘼𝙉 𝙁𝙐𝙀𝙍𝘼 𝘿𝙀 𝙂𝙍𝙐𝙋𝙊.
*_________________*
`
  let txt = '';
  let count = 0;
  for (const c of top) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;
    if (count % 10 === 0) {
      conn.sendPresenceUpdate('composing', m.chat);
    }
  }
  await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });
  conn.sendFile(m.chat, vn, '🏆ACERQUESE A RECLAMAR SU PREMIO🏅', null, m, true, {
    type: 'audioMessage',
    ptt: true
  })
}

// ==================== SORTEO5 (5 participantes) ====================
async function handlerSorteo5(m, { groupMetadata, command, conn, text, usedPrefix }) {
  if (!text) {
    return conn.reply(m.chat, `𝙀𝙟𝙚𝙢𝙥𝙡𝙤 𝙙𝙚 𝙪𝙨𝙤:\n.sorteo5 𝙩𝙚𝙭𝙩𝙤`, m, rcanal)
  }
  let ps = groupMetadata.participants.map(v => v.id)
  let a = ps.getRandom()
  let b = ps.getRandom()
  let c = ps.getRandom()
  let d = ps.getRandom()
  let e = ps.getRandom()
  let k = Math.floor(Math.random() * 70);
  let x = `${pickRandom(['ㅤ'])}`
  let l = Math.floor(Math.random() * x.length);
  let vn = ``
  let top = `*${x}🎊━━━𝙎𝙊𝙍𝙏𝙀𝙊━━━🎊*

📩 𝙈𝙀𝙉𝙎𝘼𝙅𝙀: 
*${text} ${x}*
*_________________*
» 𝙄𝙉𝙏𝙀𝙂𝙍𝘼𝙉𝙏𝙀𝙎 𝘼𝙇 𝘼𝙕𝘼𝙍 𝙎𝙊𝙉: 
🥷🏻 *${user(a)}*
🥷🏻 *${user(b)}*
🥷🏻 *${user(c)}*
🥷🏻 *${user(d)}*
🥷🏻 *${user(e)}*
*_________________*
⇝𝙏𝙄𝙀𝙉𝙀𝙉 𝙋𝙇𝘼𝙕𝙊 𝘿𝙀 𝘾𝙊𝙉𝙁𝙄𝙍𝙈𝘼𝙍𝙈𝙀 𝙀𝙉 𝙋𝙍𝙄𝙑𝘼𝘿𝙊, 𝙀𝙉 𝘾𝘼𝙎𝙊 𝘾𝙊𝙉𝙏𝙍𝘼𝙍𝙄𝙊́ 𝙀𝙎𝙏𝘼𝙉 𝙁𝙐𝙀𝙍𝘼 𝘿𝙀 𝙂𝙍𝙐𝙋𝙊.
*_________________*
`
  let txt = '';
  let count = 0;
  for (const c of top) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;
    if (count % 10 === 0) {
      conn.sendPresenceUpdate('composing', m.chat);
    }
  }
  await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });
  conn.sendFile(m.chat, vn, '🏆ACERQUESE A RECLAMAR SU PREMIO🏅', null, m, true, {
    type: 'audioMessage',
    ptt: true
  })
}

// ==================== SORTEO6 (6 participantes) ====================
async function handlerSorteo6(m, { groupMetadata, command, conn, text, usedPrefix }) {
  if (!text) {
    return conn.reply(m.chat, `𝙀𝙟𝙚𝙢𝙥𝙡𝙤 𝙙𝙚 𝙪𝙨𝙤:\n.sorteo6 𝙩𝙚𝙭𝙩𝙤`, m, rcanal)
  }
  let ps = groupMetadata.participants.map(v => v.id)
  let a = ps.getRandom()
  let b = ps.getRandom()
  let c = ps.getRandom()
  let d = ps.getRandom()
  let e = ps.getRandom()
  let f = ps.getRandom()
  let k = Math.floor(Math.random() * 70);
  let x = `${pickRandom(['ㅤ'])}`
  let l = Math.floor(Math.random() * x.length);
  let vn = ``
  let top = `*${x}🎊━━━𝙎𝙊𝙍𝙏𝙀𝙊━━━🎊*

📩 𝙈𝙀𝙉𝙎𝘼𝙅𝙀: 
*${text} ${x}*
*_________________*
» 𝙄𝙉𝙏𝙀𝙂𝙍𝘼𝙉𝙏𝙀𝙎 𝘼𝙇 𝘼𝙕𝘼𝙍 𝙎𝙊𝙉: 
🥷🏻 *${user(a)}*
🥷🏻 *${user(b)}*
🥷🏻 *${user(c)}*
🥷🏻 *${user(d)}*
🥷🏻 *${user(e)}*
🥷🏻 *${user(f)}*
*_________________*
⇝𝙏𝙄𝙀𝙉𝙀𝙉 𝙋𝙇𝘼𝙕𝙊 𝘿𝙀 𝘾𝙊𝙉𝙁𝙄𝙍𝙈𝘼𝙍𝙈𝙀 𝙀𝙉 𝙋𝙍𝙄𝙑𝘼𝘿𝙊, 𝙀𝙉 𝘾𝘼𝙎𝙊 𝘾𝙊𝙉𝙏𝙍𝘼𝙍𝙄𝙊́ 𝙀𝙎𝙏𝘼𝙉 𝙁𝙐𝙀𝙍𝘼 𝘿𝙀 𝙂𝙍𝙐𝙋𝙊.
*_________________*
`
  let txt = '';
  let count = 0;
  for (const c of top) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;
    if (count % 10 === 0) {
      conn.sendPresenceUpdate('composing', m.chat);
    }
  }
  await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });
  conn.sendFile(m.chat, vn, '🏆ACERQUESE A RECLAMAR SU PREMIO🏅', null, m, true, {
    type: 'audioMessage',
    ptt: true
  })
}

// ==================== HANDLER PRINCIPAL ====================
let handler = async (m, { groupMetadata, command, conn, text, usedPrefix }) => {
  if (command === 'sorteo') {
    return handlerSorteo(m, { groupMetadata, command, conn, text, usedPrefix })
  }
  if (command === 'sorteo2') {
    return handlerSorteo2(m, { groupMetadata, command, conn, text, usedPrefix })
  }
  if (command === 'sorteo3') {
    return handlerSorteo3(m, { groupMetadata, command, conn, text, usedPrefix })
  }
  if (command === 'sorteo4') {
    return handlerSorteo4(m, { groupMetadata, command, conn, text, usedPrefix })
  }
  if (command === 'sorteo5') {
    return handlerSorteo5(m, { groupMetadata, command, conn, text, usedPrefix })
  }
  if (command === 'sorteo6') {
    return handlerSorteo6(m, { groupMetadata, command, conn, text, usedPrefix })
  }
}

handler.help = ['sorteo', 'sorteo2', 'sorteo3', 'sorteo4', 'sorteo5', 'sorteo6']
handler.tags = ['fun']
handler.command = ['sorteo', 'sorteo2', 'sorteo3', 'sorteo4', 'sorteo5', 'sorteo6']
handler.group = true
handler.limit = 0

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
                      }
