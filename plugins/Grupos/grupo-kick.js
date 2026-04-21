let handler = async (m, { conn, usedPrefix }) => {
  if (!global.db.data.settings[conn.user.jid].restrict) 
    throw '*[ ⚠️ ] MI CREADOR TIENE DESACTIVADO ESTA FUNCIÓN.*';

  let mentionedJid = m.mentionedJid
  let user = mentionedJid && mentionedJid.length 
    ? mentionedJid[0] 
    : m.quoted 
    ? m.quoted.sender 
    : null

  if (!user) {
    return conn.reply(
      m.chat, 
      `⚠️ *ETIQUETA A LA PERSONA O RESPONDE SU MENSAJE PARA ELIMINARLO.*`, 
      m, 
      rcanal
    )
  }

  try {
    const groupInfo = await conn.groupMetadata(m.chat)
    const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net'
    const ownerBot = global.owner[0][0] + '@s.whatsapp.net'

    if (user === conn.user.jid) 
      return conn.reply(m.chat, `No puedo eliminar el bot.`, m, rcanal)

    if (user === ownerGroup) 
      return conn.reply(m.chat, `No puedo eliminar al dueño del grupo.`, m, rcanal)

    if (user === ownerBot) 
      return conn.reply(m.chat, `No puedo eliminar al creador del bot.`, m, rcanal)

    // ⏳ MENSAJE ANTES DEL KICK
    await conn.reply(m.chat, 
      `*ADIOS BASURA🤮*\n@${user.split('@')[0]}\n\n*Tienes 15 segundos...*`, 
      m, 
      { mentions: [user], ...rcanal }
    )

    setTimeout(async () => {
      await conn.groupParticipantsUpdate(m.chat, [user], 'remove')

      await conn.reply(m.chat, 
        `Fue eliminado:\n@${user.split('@')[0]}`, 
        m, 
        { mentions: [user], ...rcanal }
      )

    }, 15000)

  } catch (e) {
    conn.reply(
      m.chat, 
      `⚠️ Error:\n${e.message}`, 
      m, 
      rcanal
    )
  }
}

handler.command = /^(kick|echar|hechar|ban|rip|basura)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler
