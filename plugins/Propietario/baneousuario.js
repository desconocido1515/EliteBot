// plugins/ban_por_numero.js

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `☑️ *USO CORRECTO*\n\n.${command} +593999999999\n\nEjemplo: .banuserusuario +593993370003`, m, rcanal)
  }
  
  // Extraer número de teléfono del texto
  let numero = text.replace(/\s/g, '').replace(/[^0-9+]/g, '')
  if (!numero.startsWith('+')) numero = '+' + numero
  
  // Construir JID
  let jid = numero + '@s.whatsapp.net'
  
  // Verificar que no se banee a sí mismo
  if (jid === m.sender) {
    return conn.reply(m.chat, `☑️ No puedes banear a tu propio número.`, m, rcanal)
  }
  
  // Verificar que no se banee al bot
  if (jid === conn.user.jid) {
    return conn.reply(m.chat, `☑️ No puedo banear mi propio número.`, m, rcanal)
  }
  
  // Verificar que no se banee a un owner
  let ownerNumbers = global.owner
    .map(v => Array.isArray(v) ? v[0] : v)
    .map(v => String(v).split(':')[0].replace(/[^0-9]/g, ''))
  
  let numLimpio = numero.replace(/[^0-9]/g, '')
  if (ownerNumbers.includes(numLimpio)) {
    return conn.reply(m.chat, `☑️ No puedes banear a un owner del bot.`, m, rcanal)
  }
  
  // Inicializar usuario si no existe
  if (!global.db.data.users[jid]) global.db.data.users[jid] = {}
  
  // Verificar si ya está baneado
  if (global.db.data.users[jid].banned) {
    return conn.reply(m.chat, `☑️ El usuario ${numero} ya está baneado.`, m, rcanal)
  }
  
  // Banear al usuario
  global.db.data.users[jid].banned = true
  global.db.data.users[jid].bannedReason = text
  global.db.data.users[jid].bannedDate = Date.now()
  
  // Obtener nombre si es posible
  let nombre = numero
  try {
    const name = await conn.getName(jid)
    if (name) nombre = name
  } catch (e) {
    nombre = numero
  }
  
  let mensaje = `☑️ *USUARIO BANEADO*\n\n📌 *Usuario:* ${nombre}\n📌 *Número:* ${numero}\n📌 *Razón:* ${text}\n\n🔒 El usuario ha sido baneado y no podrá usar ningún comando del bot.`
  
  await conn.reply(m.chat, mensaje, m, rcanal)
}

// ==================== DESBANEAR ====================
let handlerUnban = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, `☑️ *USO CORRECTO*\n\n.unbanuserusuario +593999999999`, m, rcanal)
  }
  
  let numero = text.replace(/\s/g, '').replace(/[^0-9+]/g, '')
  if (!numero.startsWith('+')) numero = '+' + numero
  let jid = numero + '@s.whatsapp.net'
  
  if (!global.db.data.users[jid]?.banned) {
    return conn.reply(m.chat, `☑️ El usuario ${numero} no está baneado.`, m, rcanal)
  }
  
  global.db.data.users[jid].banned = false
  global.db.data.users[jid].bannedReason = null
  global.db.data.users[jid].bannedDate = null
  
  let nombre = numero
  try {
    const name = await conn.getName(jid)
    if (name) nombre = name
  } catch (e) {
    nombre = numero
  }
  
  await conn.reply(m.chat, `☑️ *USUARIO DESBANEADO*\n\n📌 *Usuario:* ${nombre}\n📌 *Número:* ${numero}\n✅ Ahora puede usar los comandos del bot nuevamente.`, m, rcanal)
}

// ==================== LISTAR BANEADOS ====================
let handlerList = async (m, { conn }) => {
  let users = global.db.data.users || {}
  let bannedUsers = Object.entries(users).filter(([_, data]) => data.banned === true)
  
  if (!bannedUsers.length) {
    return conn.reply(m.chat, `☑️ *LISTA DE USUARIOS BANEADOS*\n\nNo hay usuarios baneados actualmente.`, m, rcanal)
  }
  
  let txt = `☑️ *LISTA DE USUARIOS BANEADOS*\n\n*Total:* ${bannedUsers.length}\n\n`
  
  for (let i = 0; i < bannedUsers.length; i++) {
    let jid = bannedUsers[i][0]
    let num = jid.split('@')[0]
    txt += `${i + 1}. ${num}\n`
  }
  
  await conn.reply(m.chat, txt, m, rcanal)
}

// ==================== RESTRICCIÓN PARA USUARIOS BANEADOS ====================
let handlerBefore = async function (m, { conn }) {
  const userData = global.db.data.users[m.sender]
  
  if (userData && userData.banned === true) {
    const allowedCommands = ['unbanuserusuario', 'unbanuser', 'listbanuserusuario', 'listbanuser']
    const cmd = (m.text || '').trim().toLowerCase().split(' ')[0].replace(/^\./g, '')
    
    if (allowedCommands.includes(cmd)) return false
    
    await conn.reply(m.chat, `☑️ *ESTAS BANEADO*\nNo puedes usar mis comandos.\n\n📌 Contacta al owner: wa.me/${global.owner[0][0]}`, m, rcanal)
    return true
  }
  return false
}

handler.help = ['banuserusuario', 'unbanuserusuario', 'listbanuserusuario']
handler.tags = ['owner']
handler.command = /^(banuserusuario|banearusuario|bannumero|unbanuserusuario|unbannumero|listbanuserusuario|listbannumero)$/i
handler.rowner = true

export { handlerBefore as before }
export default handler
