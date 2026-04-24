// plugins/ban_global.js

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `☑️ *USO CORRECTO*\n\n.${command} +593999999999\n\nEjemplo: .ban +593993370003`, m, rcanal)
  }
  
  // Extraer número
  let numero = text.replace(/\s/g, '').replace(/[^0-9+]/g, '')
  if (!numero.startsWith('+')) numero = '+' + numero
  
  let jid = numero + '@s.whatsapp.net'
  
  // Validaciones
  if (jid === m.sender) return conn.reply(m.chat, `☑️ No puedes banear tu propio número.`, m, rcanal)
  if (jid === conn.user.jid) return conn.reply(m.chat, `☑️ No puedo banear mi propio número.`, m, rcanal)
  
  // Verificar owners
  let numLimpio = numero.replace(/[^0-9]/g, '')
  let isOwner = false
  if (global.owner) {
    for (let owner of global.owner) {
      let ownerNum = Array.isArray(owner) ? owner[0] : owner
      ownerNum = String(ownerNum).replace(/[^0-9]/g, '')
      if (ownerNum === numLimpio) isOwner = true
    }
  }
  if (isOwner) return conn.reply(m.chat, `☑️ No puedes banear a un owner del bot.`, m, rcanal)
  
  // Guardar ban en base de datos
  if (!global.db.data.users[jid]) global.db.data.users[jid] = {}
  global.db.data.users[jid].banned = true
  global.db.data.users[jid].bannedReason = text
  global.db.data.users[jid].bannedDate = Date.now()
  
  // Guardar también con el número sin @ para búsqueda fácil
  let numJid = numero + '@s.whatsapp.net'
  if (!global.db.data.users[numJid]) global.db.data.users[numJid] = {}
  global.db.data.users[numJid].banned = true
  
  let nombre = numero
  try { nombre = await conn.getName(jid) || numero } catch(e) { nombre = numero }
  
  await conn.reply(m.chat, `☑️ *USUARIO BANEADO*\n\n📌 *Usuario:* ${nombre}\n📌 *Número:* ${numero}\n🔒 No podrá usar ningún comando.`, m, rcanal)
}

// ==================== COMANDO UNBAN ====================
let handlerUnban = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, `☑️ *USO CORRECTO*\n\n.unban +593999999999`, m, rcanal)
  }
  
  let numero = text.replace(/\s/g, '').replace(/[^0-9+]/g, '')
  if (!numero.startsWith('+')) numero = '+' + numero
  let jid = numero + '@s.whatsapp.net'
  
  if (!global.db.data.users[jid]?.banned) {
    return conn.reply(m.chat, `☑️ El usuario ${numero} no está baneado.`, m, rcanal)
  }
  
  global.db.data.users[jid].banned = false
  global.db.data.users[jid].bannedReason = null
  
  let numJid = numero + '@s.whatsapp.net'
  if (global.db.data.users[numJid]) global.db.data.users[numJid].banned = false
  
  let nombre = numero
  try { nombre = await conn.getName(jid) || numero } catch(e) { nombre = numero }
  
  await conn.reply(m.chat, `☑️ *USUARIO DESBANEADO*\n\n📌 *Usuario:* ${nombre}\n✅ Ahora puede usar los comandos.`, m, rcanal)
}

// ==================== LISTAR BANEADOS ====================
let handlerList = async (m, { conn }) => {
  let users = global.db.data.users || {}
  let bannedUsers = []
  
  for (let jid in users) {
    if (users[jid].banned === true && jid.includes('@s.whatsapp.net')) {
      bannedUsers.push(jid)
    }
  }
  
  if (!bannedUsers.length) {
    return conn.reply(m.chat, `☑️ No hay usuarios baneados.`, m, rcanal)
  }
  
  let txt = `☑️ *USUARIOS BANEADOS*\n\n`
  for (let i = 0; i < bannedUsers.length; i++) {
    let num = bannedUsers[i].split('@')[0]
    txt += `${i + 1}. ${num}\n`
  }
  
  await conn.reply(m.chat, txt, m, rcanal)
}

// ==================== RESTRICCIÓN (LO MÁS IMPORTANTE) ====================
let handlerBefore = async function (m, { conn }) {
  // Verificar si el usuario está baneado
  const userData = global.db.data.users[m.sender]
  
  if (userData && userData.banned === true) {
    // Comandos permitidos incluso si está baneado
    const allowedCommands = ['unban', 'unbanuser', 'unbannumero', 'listaban', 'testban']
    const cmd = (m.text || '').trim().toLowerCase().split(' ')[0].replace(/^\./g, '')
    
    // Si es un comando permitido, dejar pasar
    if (allowedCommands.includes(cmd)) return false
    
    // Bloquear el comando
    await conn.reply(m.chat, `☑️ *ESTAS BANEADO*\nNo puedes usar mis comandos.\n\n📌 Contacta al owner: wa.me/${global.owner[0][0]}`, m, rcanal)
    return true
  }
  return false
}

handler.command = /^(ban|banear|bannumero|banuserusuario)$/i
handler.rowner = true

export { handlerBefore as before }
export default handler
