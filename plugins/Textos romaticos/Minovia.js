import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  try {
    // RESTRICCIÓN: debe mencionar o responder a un usuario
    let mentionedJid = await m.mentionedJid
    let who = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null
    
    if (!who) {
      return conn.reply(m.chat, `☑️ *DEBES MENCIONAR O RESPONDER A UN USUARIO*\n\n📌 *Ejemplo:*\n.minovia @usuario\n\n📌 *O responde al mensaje de la persona*`, m, rcanal)
    }
    
    let _pp = './storage/menus/Menu1.jpg'
    let user = db.data.users[m.sender]
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './src/novios.jpg')
    let { premium, level, diamond, exp, lastclaim, registered, regTime, age } = global.db.data.users[m.sender]
    let username = conn.getName(who)
    let name = conn.getName(who)
    
    let fkon = { 
      key: { 
        fromMe: false, 
        participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, 
        ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) 
      }, 
      message: { 
        contactMessage: { 
          displayName: `${name}`, 
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      }
    }
    
    let str = `𝙀𝙎𝙏𝘼 𝙀𝙎 𝙈𝙄 𝙉𝙊𝙑𝙄𝘼, *¿* 𝙀𝙎 𝙃𝙀𝙍𝙈𝙊𝙎𝘼 𝙑𝙀𝙍𝘿𝘼𝘿 *?* 😍

@${who.replace(/@.+/, '')} 𝙀𝙍𝙀𝙎 𝙇𝘼 𝙈𝙀𝙅𝙊𝙍 𝙉𝙊𝙑𝙄𝘼 𝘿𝙀𝙇 𝙈𝙐𝙉𝘿𝙊, 𝙏𝙀 𝙌𝙐𝙄𝙀𝙍𝙊 𝘽𝙀𝘽𝙀.🫶🏻♥️`.trim()
    
    // Reacción al inicio
    await conn.sendMessage(m.chat, { react: { text: '🌟', key: m.key } })
    
    conn.sendFile(m.chat, pp, 'perfil.jpg', str, fkon, false, { mentions: [who] })
    
  } catch (error) {
    console.error('Error:', error)
    await conn.reply(m.chat, `☑️ Ocurrió un error al ejecutar el comando.`, m, rcanal)
  }
}

handler.help = ['minovia']
handler.tags = ['rg']
handler.command = /^minovia$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, ' *Dias ☀️*\n ', h, ' *Horas 🕐*\n ', m, ' *Minutos ⏰*\n ', s, ' *Segundos ⏱️* '].map(v => v.toString().padStart(2, 0)).join('')
}
