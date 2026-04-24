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

    // Obtener los chats donde el bot está presente
    const chats = conn.chats.all()
    const groupIds = []
    
    // Filtrar solo los grupos
    for (let chat of chats) {
      if (chat.id && chat.id.endsWith('@g.us') && chat.id !== 'status@broadcast') {
        // Verificar si el bot sigue en el grupo
        const isBotInGroup = chat.participants?.some(p => p.id === conn.user.jid)
        if (isBotInGroup !== false) {
          groupIds.push(chat.id)
        }
      }
    }
    
    // También obtener grupos mediante groupFetchAllParticipating como respaldo
    try {
      const participating = await conn.groupFetchAllParticipating() || {}
      for (let id in participating) {
        if (!groupIds.includes(id)) {
          groupIds.push(id)
        }
      }
    } catch (e) {}
    
    if (groupIds.length === 0) {
      return conn.reply(m.chat, `☑️ 𝙴𝙻 𝙱𝙾𝚃 𝙽𝙾 𝙴𝚂𝚃𝙰́ 𝙴𝙽 𝙽𝙸𝙽𝙶𝚄́𝙽 𝙶𝚁𝚄𝙿𝙾`, m, rcanal)
    }
    
    let txt = `☑️ *𝙻𝙸𝚂𝚃𝙰 𝙳𝙴 𝙶𝚁𝚄𝙿𝙾𝚂* 📋\n\n`
    txt += `📦 𝚃𝚘𝚝𝚊𝚕 𝚍𝚎 𝚐𝚛𝚞𝚙𝚘𝚜: *${groupIds.length}*\n\n`
    
    for (let id of groupIds) {
      try {
        // Obtener metadata actualizada del grupo
        const meta = await conn.groupMetadata(id).catch(() => null)
        
        let subject = meta?.subject || '— (sin nombre)'
        let participants = meta?.participants?.length || 0
        
        txt += `🏷️ *Nombre:* ${subject}\n`
        txt += `🆔 *ID:* ${id}\n`
        txt += `👥 *Miembros:* ${participants}\n`
        txt += `🔗 *Enlace:* ${meta?.inviteCode ? `https://chat.whatsapp.com/${meta.inviteCode}` : '—'}\n\n`
        
      } catch (e) {
        console.error(`Error obteniendo metadata del grupo ${id}:`, e)
        txt += `🏷️ *Nombre:* — (error)\n`
        txt += `🆔 *ID:* ${id}\n`
        txt += `👥 *Miembros:* —\n\n`
      }
    }
    
    await conn.reply(m.chat, txt.trim(), m, rcanal)
    
  } catch (error) {
    console.error('Error en listagrupos:', error)
    await conn.reply(m.chat, `☑️ 𝙴𝚁𝚁𝙾𝚁 𝙰𝙻 𝙾𝙱𝚃𝙴𝙽𝙴𝚁 𝙻𝙰 𝙻𝙸𝚂𝚃𝙰 𝙳𝙴 𝙶𝚁𝚄𝙿𝙾𝚂`, m, rcanal)
  }
}

handler.help = ['groups', 'grouplist']
handler.tags = ['info']
handler.command = /^(groups|grouplist|listadegrupo|gruposlista|listagrupos|listadegrupos|grupolista|listagrupo)$/i
handler.rowner = true
handler.exp = 30

export default handler
