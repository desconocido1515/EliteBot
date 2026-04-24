// plugins/banchat.js

// ==================== BAN CHAT ====================
let handlerBan = async (m, { conn }) => {
  global.db.data.chats[m.chat].isBanned = true
  await conn.reply(m.chat, `✅ EL BOT HA SIDO BANEADO EN ESTE GRUPO\n\n📌 ESTARE DISPONIBLE HASTA QUE RECIBA LA ORDEN DE PAGO`, m, rcanal)
}

// ==================== UNBAN CHAT ====================
let handlerUnban = async (m, { conn }) => {
  global.db.data.chats[m.chat].isBanned = false
  await conn.reply(m.chat, `✅ EL BOT HA SIDO DESBANEADO EN ESTE GRUPO\n\n📌 AHORA PUEDEN USAR LOS COMANDOS NUEVAMENTE`, m, rcanal)
}

// ==================== RESTRICCIÓN PARA GRUPOS BANEADOS ====================
let handlerBefore = async function (m, { conn }) {
  // Verificar si el chat está baneado
  if (global.db.data.chats[m.chat]?.isBanned && m.chat.endsWith('@g.us')) {
    // No bloquear al propio bot ni al creador
    if (m.sender === conn.user.jid) return
    if (m.sender === '593993370003@s.whatsapp.net') return
    
    // No bloquear comandos específicos (banchat, unbanchat, etc)
    const allowedCommands = ['banchat', 'banchat2', 'unbanchat', 'unban']
    const cmd = m.text?.toLowerCase().trim().split(' ')[0].replace(/^\./g, '')
    if (allowedCommands.includes(cmd)) return
    
    // Enviar mensaje de restricción
    await conn.reply(m.chat, `⚠️ ESTE CHAT ESTA BANEADO POR FALTA DE PAGO\n\n📌 PARA MAS INFO A MI CREADOR:\nwa.me/593993370003`, m, rcanal)
    return true
  }
  return
}

// ==================== HANDLER PRINCIPAL ====================
let handler = async (m, { conn }) => {
  // Este handler es para los comandos banchat y unbanchat
  const text = m.text?.toLowerCase() || ''
  if (text === '.banchat' || text === '.banchat2') {
    return handlerBan(m, { conn })
  }
  if (text === '.unbanchat' || text === '.unban') {
    return handlerUnban(m, { conn })
  }
}

handler.command = /^(banchat|banchat2|unbanchat|unban)$/i
handler.rowner = true
handler.botAdmin = true
handler.group = true

export { handlerBefore as before }
export default handler
