// plugins/global_ban.js

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `☑️ *USO CORRECTO*\n\n.${command} +593999999999`, m, rcanal)
  }
  
  // Extraer número de teléfono
  let numero = text.replace(/\s/g, '').replace(/[^0-9+]/g, '')
  if (!numero.startsWith('+')) numero = '+' + numero
  
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
  
  // Guardar en base de datos el usuario baneado globalmente
  if (!global.db.data.users[jid]) global.db.data.users[jid] = {}
  global.db.data.users[jid].globalBan = true
  global.db.data.users[jid].banned = true  // También marcar como baneado normal
  global.db.data.users[jid].globalBanReason = text || 'Sin especificar'
  global.db.data.users[jid].globalBanDate = Date.now()
  
  let nombre = numero
  try {
    const name = await conn.getName(jid)
    if (name) nombre = name
  } catch (e) {
    nombre = numero
  }
  
  let mensaje = `☑️ *USUARIO BANEADO GLOBALMENTE*\n\n📌 *Usuario:* ${nombre}\n📌 *Número:* ${numero}\n📌 *Razón:* ${text}\n\n🔒 El usuario ha sido baneado y no podrá usar ningún comando del bot en ningún grupo.`
  
  await conn.reply(m.chat, mensaje, m, rcanal)
}

// ==================== RESTRICCIÓN PARA USUARIOS BANEADOS GLOBALMENTE ====================
let handlerBefore = async function (m, { conn }) {
  // Verificar si el usuario está baneado globalmente o normal
  const userData = global.db.data.users[m.sender]
  
  if (userData && (userData.globalBan === true || userData.banned === true)) {
    // Comandos permitidos para usuarios baneados
    const allowedCommands = ['unbang', 'unbanuser', 'desbloquear', 'unban', 'banuser', 'listbanuser']
    const cmd = (m.text || '').trim().toLowerCase().split(' ')[0].replace(/^\./g, '')
    
    if (allowedCommands.includes(cmd)) return false
    
    // Enviar mensaje de restricción
    await conn.reply(m.chat, `☑️ *ESTAS BANEADO GLOBALMENTE*\nNo puedes usar mis comandos.\n\n📌 Contacta al owner para más información.`, m, rcanal)
    return true
  }
  return false
}

// ==================== COMANDO PARA DESBANEAR ====================
let handlerUnban = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, `☑️ *USO CORRECTO*\n\n.unbang +593999999999`, m, rcanal)
  }
  
  let numero = text.replace(/\s/g, '').replace(/[^0-9+]/g, '')
  if (!numero.startsWith('+')) numero = '+' + numero
  let jid = numero + '@s.whatsapp.net'
  
  if (!global.db.data.users[jid]?.globalBan && !global.db.data.users[jid]?.banned) {
    return conn.reply(m.chat, `☑️ El usuario ${numero} no está baneado globalmente.`, m, rcanal)
  }
  
  global.db.data.users[jid].globalBan = false
  global.db.data.users[jid].banned = false
  global.db.data.users[jid].globalBanReason = null
  global.db.data.users[jid].globalBanDate = null
  
  let nombre = numero
  try {
    const name = await conn.getName(jid)
    if (name) nombre = name
  } catch (e) {
    nombre = numero
  }
  
  await conn.reply(m.chat, `☑️ *USUARIO DESBANEADO GLOBALMENTE*\n\n📌 *Usuario:* ${nombre}\n📌 *Número:* ${numero}\n✅ Ahora puede usar los comandos del bot nuevamente.`, m, rcanal)
}

// ==================== COMANDO PARA VER LISTA DE BANEADOS ====================
let handlerListBan = async (m, { conn }) => {
  let users = global.db.data.users || {}
  let bannedUsers = Object.entries(users).filter(([jid, user]) => user?.globalBan === true || user?.banned === true)
  
  if (!bannedUsers.length) {
    return conn.reply(m.chat, `☑️ *LISTA DE USUARIOS BANEADOS*\n\nNo hay usuarios baneados actualmente.`, m, rcanal)
  }
  
  let txt = `☑️ *LISTA DE USUARIOS BANEADOS*\n\n`
  let mentions = []
  
  for (let i = 0; i < bannedUsers.length; i++) {
    let jid = bannedUsers[i][0]
    let num = jid.split('@')[0].split(':')[0]
    txt += `${i + 1}. @${num}\n`
    mentions.push(jid)
  }
  
  await conn.sendMessage(m.chat, { text: txt.trim(), mentions }, { quoted: m })
}

handler.help = ['bang', 'unbang', 'listbang']
handler.tags = ['owner']
handler.command = /^(bang|banearusuario|banear|globalban)$/i
handler.rowner = true

export { handlerBefore as before }
export default handler
