import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, isOwner, isRowner }) => {
  try {
    const fkontak = {
      key: { participants: "0@s.whatsapp.net", remoteJid: "status@broadcast", fromMe: false, id: "Halo" },
      message: {
        contactMessage: {
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      },
      participant: "0@s.whatsapp.net"
    }

    // Obtener grupos donde está el bot
    const grupos = []
    
    try {
      const participating = await conn.groupFetchAllParticipating()
      
      for (let id in participating) {
        const meta = participating[id]
        grupos.push({
          subject: meta.subject || 'Sin nombre',
          participants: meta.participants?.length || 0
        })
      }
    } catch (e) {
      console.log('Error con groupFetchAllParticipating:', e)
    }
    
    if (grupos.length === 0) {
      return conn.reply(m.chat, `☑️ 𝙴𝙻 𝙱𝙾𝚃 𝙽𝙾 𝙴𝚂𝚃𝙰́ 𝙴𝙽 𝙽𝙸𝙽𝙶𝚄́𝙽 𝙶𝚁𝚄𝙿𝙾`, m, rcanal)
    }
    
    let txt = `☑️ *𝙻𝙸𝚂𝚃𝙰 𝙳𝙴 𝙶𝚁𝚄𝙿𝙾𝚂* 📋\n\n`
    txt += `📦 𝚃𝚘𝚝𝚊𝚕 𝚍𝚎 𝚐𝚛𝚞𝚙𝚘𝚜: *${grupos.length}*\n\n`
    
    for (let i = 0; i < grupos.length; i++) {
      const g = grupos[i]
      txt += `🏷️ *${i + 1}. Nombre:* ${g.subject}\n`
      txt += `👥 *Miembros:* ${g.participants}\n\n`
    }
    
    await conn.reply(m.chat, txt.trim(), m, rcanal)
    
  } catch (error) {
    console.error('Error en listagrupos:', error)
    await conn.reply(m.chat, `☑️ 𝙴𝚁𝚁𝙾𝚁 𝙰𝙻 𝙾𝙱𝚃𝙴𝙽𝙴𝚁 𝙻𝙰 𝙻𝙸𝚂𝚃𝙰`, m, rcanal)
  }
}

handler.help = ['groups', 'grouplist']
handler.tags = ['info']
handler.command = /^(groups|grouplist|listadegrupo|gruposlista|listagrupos|listadegrupos|grupolista|listagrupo)$/i
handler.rowner = true
handler.exp = 30

export default handler
