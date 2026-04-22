import fs, { promises } from 'fs'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
  // Eliminada la restricción de modohorny
  
  try {
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length 
    let more = String.fromCharCode(8206)
    let readMore = more.repeat(850)   
    let taguser = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    let fkontak = { 
      "key": { 
        "participants": "0@s.whatsapp.net", 
        "remoteJid": "status@broadcast", 
        "fromMe": false, 
        "id": "Halo" 
      }, 
      "message": { 
        "contactMessage": { 
          "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
        }
      }, 
      "participant": "0@s.whatsapp.net" 
    }
    
    let menu = `
¡Hola! 👋🏻 @${m.sender.split("@")[0]}
 \`\`\`${week}, ${date}\`\`\`

╭──𝗠𝗘𝗡𝗨 𝗛𝗢𝗧──────
│ 𝘉𝘪𝘦𝘯𝘷𝘦𝘯𝘪𝘥𝘰 ...
│ 𝘋𝘢𝘭𝘦 𝘤𝘢𝘳𝘪𝘯̃𝘰 𝘢 𝘵𝘶 𝘨𝘢𝘯𝘻𝘰 
│ 𝘤𝘰𝘯 𝘦𝘭 𝘮𝘦𝘯𝘶 𝘩𝘰𝘵.
╰────────────────

» 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦 𝗛𝗢𝗧 
│🔥➺ .𝘩𝘰𝘵𝘵𝘪𝘬𝘵𝘰𝘬
│🔥➺ .𝘵𝘦𝘵𝘢𝘴
│🔥➺ .𝘱𝘦𝘯𝘦
│🔥➺ .𝘱𝘢𝘤𝘬
│🔥➺ .𝘹𝘷𝘪𝘥𝘦𝘰𝘴
│🔥➺ .𝘩𝘦𝘯𝘵𝘢𝘪𝘱𝘥𝘧
│🔥➺ .𝘹𝘯𝘹𝘹𝘹 𝘭𝘪𝘯𝘬
│🔥➺ .𝘹𝘯𝘹𝘹𝘴𝘦𝘢𝘳𝘤𝘩 𝘵𝘦𝘹𝘵𝘰
│🔥➺ .𝘩𝘦𝘯𝘵𝘢𝘪𝘴𝘦𝘢𝘳𝘤𝘩 𝘵𝘦𝘹𝘵𝘰
│🔥➺ .𝘱𝘰𝘳𝘯𝘩𝘶𝘣𝘴𝘦𝘢𝘳𝘤𝘩 𝘵𝘦𝘹𝘵𝘰
╰━━━━━━⋆★⋆━━━━━━⬣

» 𝗧𝗥𝗜𝗣𝗘 𝗫
│🔞➺ .𝘯𝘴𝘧𝘸𝘭𝘰𝘭𝘪
│🔞➺ .𝘯𝘴𝘧𝘸𝘧𝘰𝘰𝘵
│🔞➺ .𝘯𝘴𝘧𝘸𝘢𝘴𝘴
│🔞➺ .𝘯𝘴𝘧𝘸𝘣𝘥𝘴𝘮
│🔞➺ .𝘯𝘴𝘧𝘸𝘤𝘶𝘮
│🔞➺ .𝘯𝘴𝘧𝘸𝘦𝘳𝘰
│🔞➺ .𝘯𝘴𝘧𝘸𝘧𝘦𝘮𝘥𝘰𝘮
│🔞➺ .𝘯𝘴𝘧𝘸𝘧𝘰𝘰𝘵
│🔞➺ .𝘯𝘴𝘧𝘸𝘨𝘭𝘢𝘴𝘴
│🔞➺ .𝘯𝘴𝘧𝘸𝘰𝘳𝘨𝘺
│🔞➺ .𝘺𝘶𝘳𝘪
│🔞➺ .𝘺𝘶𝘳𝘪2
│🔞➺ .𝘺𝘶𝘳𝘪2
│🔞➺ .𝘺𝘢𝘰𝘪
│🔞➺ .𝘺𝘢𝘰𝘪2
│🔞➺ .𝘣𝘰𝘰𝘵𝘺
│🔞➺ .𝘦𝘤𝘤𝘩𝘪
│🔞➺ .𝘧𝘶𝘳𝘳𝘰
│🔞➺ .𝘩𝘦𝘯𝘵𝘢𝘪
│🔞➺ .𝘵𝘳𝘢𝘱𝘪𝘵𝘰
╰━━━━━━⋆★⋆━━━━━━⬣
    `.trim()
    
    const vi = ['https://telegra.ph/file/aa3e11b1cc4246ad72b9b.mp4']

    try {
      await conn.sendMessage(m.chat, { video: { url: vi.getRandom() }, gifPlayback: true, caption: menu, mentions: [m.sender, global.conn.user.jid] }, { quoted: fkontak }) 
    } catch (error) {
      try {
        await conn.sendMessage(m.chat, { image: { url: gataMenu.getRandom() }, gifPlayback: false, caption: menu, mentions: [m.sender, global.conn.user.jid] }, { quoted: fkontak }) 
      } catch (error) {
        try {
          await conn.sendMessage(m.chat, { image: gataImg.getRandom(), gifPlayback: false, caption: menu, mentions: [m.sender, global.conn.user.jid] }, { quoted: fkontak }) 
        } catch (error) {
          try {
            await conn.sendFile(m.chat, imagen5, 'menu.jpg', menu, fkontak, false, { mentions: [m.sender, global.conn.user.jid] })
          } catch (error) {
            return 
          }
        }
      }
    } 
  } catch (e) {
    await m.reply(`☑️ Ocurrió un error al mostrar el menú.`)
    console.log(`❗❗ Error en menú hot: ${e}`)
  }
}

handler.command = /^(menuhot)$/i
handler.register = false
handler.group = true

export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
