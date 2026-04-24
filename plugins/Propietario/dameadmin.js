let handler = async (m, { conn, isAdmin }) => {
  try {
    // Verificar si el bot es admin
    if (!handler.botAdmin) {
      return conn.reply(m.chat, `☑️ 𝙽𝙴𝙲𝙴𝚂𝙸𝚃𝙾 𝚂𝙴𝚁 𝙰𝙳𝙼𝙸𝙽 𝙿𝙰𝚁𝙰 𝙳𝙰𝚁 𝙰𝙳𝙼𝙸𝙽`, m, rcanal)
    }
    
    // Verificar si el usuario ya es admin
    if (isAdmin) {
      return conn.reply(m.chat, `☑️ 𝚈𝙰 𝙴𝚁𝙴𝚂 𝙰𝙳𝙼𝙸𝙽𝙸𝚂𝚃𝚁𝙰𝙳𝙾𝚁 𝙳𝙴 𝙴𝚂𝚃𝙴 𝙶𝚁𝚄𝙿𝙾`, m, rcanal)
    }
    
    // Dar admin al usuario
    await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote")
    await conn.reply(m.chat, `☑️ 𝙰𝙷𝙾𝚁𝙰 𝙴𝚁𝙴𝚂 𝙰𝙳𝙼𝙸𝙽𝙸𝚂𝚃𝚁𝙰𝙳𝙾𝚁 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾`, m, rcanal)
    
  } catch (error) {
    console.error('Error al dar admin:', error)
    await conn.reply(m.chat, `☑️ 𝙴𝚁𝚁𝙾𝚁 𝙰𝙻 𝙳𝙰𝚁 𝙰𝙳𝙼𝙸𝙽`, m, rcanal)
  }
}

handler.command = /^(dameadmin|tenerpoder)$/i
handler.rowner = true
handler.botAdmin = true
handler.group = true

export default handler
