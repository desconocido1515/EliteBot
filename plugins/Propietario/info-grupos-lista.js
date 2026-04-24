import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, isOwner, isRowner }) => {
  try {
    const grupos = []
    const botJid = conn.user.jid  // JID del bot
    
    // Obtener todos los grupos donde el bot está participando
    const participating = await conn.groupFetchAllParticipating()
    
    for (let id in participating) {
      const meta = participating[id]
      
      // Verificar que el bot esté en el grupo (usando la misma lógica que promote)
      const botEnGrupo = meta.participants?.some(p => p.id === botJid)
      
      if (botEnGrupo) {
        grupos.push({
          subject: meta.subject || 'Sin nombre',
          participants: meta.participants?.length || 0,
          id: id
        })
      }
    }
    
    if (grupos.length === 0) {
      return conn.reply(m.chat, `☑️ 𝙴𝙻 𝙱𝙾𝚃 𝙽𝙾 𝙴𝚂𝚃𝙰́ 𝙴𝙽 𝙽𝙸𝙽𝙶𝚄́𝙽 𝙶𝚁𝚄𝙿𝙾`, m, rcanal)
    }
    
    let txt = `☑️ *𝙻𝙸𝚂𝚃𝙰 𝙳𝙴 𝙶𝚁𝚄𝙿𝙾𝚂*\n\n`
    txt += `📦 𝚃𝚘𝚝𝚊𝚕: *${grupos.length}*\n`
    txt += `🤖 𝙱𝚘𝚝: *${botJid.split('@')[0]}*\n\n`
    
    for (let i = 0; i < grupos.length; i++) {
      const g = grupos[i]
      txt += `🏷️ *${i + 1}. ${g.subject}*\n`
      txt += `👥 ${g.participants} 𝚖𝚒𝚎𝚖𝚋𝚛𝚘𝚜\n\n`
    }
    
    await conn.reply(m.chat, txt.trim(), m, rcanal)
    
  } catch (error) {
    console.error('Error:', error)
    await conn.reply(m.chat, `☑️ 𝙴𝚁𝚁𝙾𝚁: ${error.message}`, m, rcanal)
  }
}

handler.help = ['groups', 'grouplist']
handler.tags = ['info']
handler.command = /^(groups|grouplist|listadegrupo|gruposlista|listagrupos|listadegrupos|grupolista|listagrupo)$/i
handler.rowner = true
handler.exp = 30

export default handler
