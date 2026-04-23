import fetch from 'node-fetch'

let handler = async (m, { conn, command, usedPrefix }) => {
  // Usar la misma lógica de mención que funciona
  let mentionedJid = await m.mentionedJid
  let userId = mentionedJid.length > 0 ? mentionedJid[0] : (m.quoted ? await m.quoted.sender : null)
  
  if (!userId) {
    return conn.reply(m.chat, `⚠️ 𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝘼 𝘼 𝙇𝘼 𝙋𝙀𝙍𝙎𝙊𝙉𝘼 𝙌𝙐𝙀 𝙌𝙐𝙄𝙀𝙍𝙀𝙎 𝘿𝘼𝙍 𝙐𝙉 𝘼𝘽𝙍𝘼𝙕𝙊.`, m, rcanal);
  }
  
  let from = m.sender.split('@')[0]
  let who = userId.split('@')[0]
  
  let str = `*@${from}* 𝙏𝙀 𝘿𝙄𝙊 𝙐𝙉 𝘼𝘽𝙍𝘼𝙕𝙊 𝘿𝙀 𝙊𝙎𝙊 𝘼 *@${who}* , 𝙀𝙍𝙀𝙎 𝙐𝙉𝘼 𝙂𝙍𝘼𝙉 𝙋𝙀𝙍𝙎𝙊𝙉𝘼, 𝙏𝙀 𝘼𝘿𝙈𝙄𝙍𝘼 𝙔 𝙀𝙎𝙏𝘼 𝙊𝙍𝙂𝙐𝙇𝙇𝙊𝙎𝙊 𝘿𝙀 𝙏𝙄. 😍
━━━━━━━━━━━━━━━
*@${who}*
 𝙏𝙀 𝘿𝙄𝙀𝙍𝙊𝙉 𝙐𝙉 𝘼𝘽𝙍𝘼𝙕𝙊. 🫂`

  // Array de videos
  const vi = [
    'https://telegra.ph/file/899eb3e64097ff236113f.mp4',
    'https://telegra.ph/file/3f2223646db5e854dcd94.mp4',
    'https://telegra.ph/file/8da4ce3f1cc7297037aba.mp4',
    'https://telegra.ph/file/b7371a28e5afebdcb1666.mp4',
    'https://telegra.ph/file/edc48fbdde69d7fc5b889.mp4'
  ]

  try {
    await conn.sendMessage(m.chat, { 
      video: { url: vi[Math.floor(Math.random() * vi.length)] }, 
      gifPlayback: true, 
      caption: str, 
      mentions: [m.sender, userId]
    })
  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, str, m, rcanal)
  }
}

handler.command = /^(abrazar|abrazo)$/i
handler.group = true

export default handler
