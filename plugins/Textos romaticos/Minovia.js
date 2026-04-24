import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
  try {
    // RESTRICCIÓN: debe mencionar o responder a un usuario
    let mentionedJid = await m.mentionedJid
    let who = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null
    
    if (!who) {
      return conn.reply(m.chat, `☑️ *DEBES MENCIONAR O RESPONDER A UN USUARIO*\n\n📌 *Ejemplo:*\n.${command} @usuario\n\n📌 *O responde al mensaje de la persona*`, m, rcanal)
    }
    
    if (who === m.sender) {
      return conn.reply(m.chat, `☑️ No puedes dedicarte esto a ti mismo. Menciona a otra persona.`, m, rcanal)
    }
    
    let _pp = './storage/menus/Menu1.jpg'
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './src/novios.jpg')
    let nombreUsuario = conn.getName(m.sender)
    let nombreMencionado = conn.getName(who)
    
    let fkon = { 
      key: { 
        fromMe: false, 
        participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, 
        ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) 
      }, 
      message: { 
        contactMessage: { 
          displayName: `${nombreMencionado}`, 
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${nombreMencionado}\nitem1.TEL;waid=${who.split('@')[0]}:${who.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      }
    }
    
    // Determinar género según el comando
    let texto = ''
    if (command === 'minovia') {
      texto = `𝙀𝙎𝙏𝘼 𝙀𝙎 𝙈𝙄 𝙉𝙊𝙑𝙄𝘼, *¿* 𝙀𝙎 𝙃𝙀𝙍𝙈𝙊𝙎𝘼 𝙑𝙀𝙍𝘿𝘼𝘿 *?* 😍

@${who.replace(/@.+/, '')} 𝙀𝙍𝙀𝙎 𝙇𝘼 𝙈𝙀𝙅𝙊𝙍 𝙉𝙊𝙑𝙄𝘼 𝘿𝙀𝙇 𝙈𝙐𝙉𝘿𝙊, 𝙏𝙀 𝙌𝙐𝙄𝙀𝙍𝙊 𝘽𝙀𝘽𝙀.🫶🏻♥️`
    } else if (command === 'minovio') {
      texto = `𝙀𝙎𝙏𝙀 𝙀𝙎 𝙈𝙄 𝙉𝙊𝙑𝙄𝙊, *¿* 𝙀𝙎 𝙃𝙀𝙍𝙈𝙊𝙎𝙊 𝙑𝙀𝙍𝘿𝘼𝘿 *?* 😍

@${who.replace(/@.+/, '')} 𝙀𝙍𝙀𝙎 𝙀𝙇 𝙈𝙀𝙅𝙊𝙍 𝙉𝙊𝙑𝙄𝙊 𝘿𝙀𝙇 𝙈𝙐𝙉𝘿𝙊, 𝙏𝙀 𝙌𝙐𝙄𝙀𝙍𝙊 𝘽𝙀𝘽𝙀.🫶🏻💙`
    }
    
    // Reacción al inicio según el comando
    const emojiInicio = command === 'minovia' ? '💃' : '🕺'
    await conn.sendMessage(m.chat, { react: { text: emojiInicio, key: m.key } })
    
    conn.sendFile(m.chat, pp, 'perfil.jpg', texto, fkon, false, { mentions: [who] })
    
  } catch (error) {
    console.error('Error:', error)
    await conn.reply(m.chat, `☑️ Ocurrió un error al ejecutar el comando.`, m, rcanal)
  }
}

handler.help = ['minovia', 'minovio']
handler.tags = ['rg']
handler.command = /^(minovia|minovio)$/i

export default handler
