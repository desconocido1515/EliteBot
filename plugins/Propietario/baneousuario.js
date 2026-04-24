// plugins/global_ban.js

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `☑️ *USO CORRECTO*\n\n.${command} @usuario\n\nO responde al mensaje del usuario.`, m, rcanal)
  }
  
  // Usar la misma lógica de promote para obtener el JID
  let mentionedJid = await m.mentionedJid
  let user = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null
  
  // Si no hay mención, intentar extraer número del texto
  if (!user) {
    let numero = text.replace(/\s/g, '').replace(/[^0-9+]/g, '')
    if (!numero.startsWith('+')) numero = '+' + numero
    user = numero + '@s.whatsapp.net'
  }
  
  if (!user) {
    return conn.reply(m.chat, `☑️ *USO CORRECTO*\n\n.${command} @usuario\n\nO responde al mensaje del usuario.`, m, rcanal)
  }
  
  // Verificar que no se banee a sí mismo
  if (user === m.sender) {
    return conn.reply(m.chat, `☑️ No puedes banear a tu propio número.`, m, rcanal)
  }
  
  // Verificar que no se banee al bot
  if (user === conn.user.jid) {
    return conn.reply(m.chat, `☑️ No puedo banear mi propio número.`, m, rcanal)
  }
  
  // Verificar que no se banee a un owner
  let ownerNumbers = global.owner
    .map(v => Array.isArray(v) ? v[0] : v)
    .map(v => String(v).split(':')[0].replace(/[^0-9]/g, ''))
  
  let userNumber = user.split('@')[0].replace(/[^0-9]/g, '')
  if (ownerNumbers.includes(userNumber)) {
    return conn.reply(m.chat, `☑️ No puedes banear a un owner del bot.`, m, rcanal)
  }
  
  // Guardar en base de datos el usuario baneado globalmente
  if (!global.db.data.users[user]) global.db.data.users[user] = {}
  global.db.data.users[user].globalBan = true
  global.db.data.users[user].banned = true
  global.db.data.users[user].globalBanReason = text || 'Sin especificar'
  global.db.data.users[user].globalBanDate = Date.now()
  
  let nombre = user.split('@')[0]
  try {
    const name = await conn.getName(user)
    if (name) nombre = name
  } catch (e) {
    nombre = user.split('@')[0]
  }
  
  let mensaje = `☑️ *USUARIO BANEADO GLOBALMENTE*\n\n📌 *Usuario:* ${nombre}\n📌 *JID:* ${user}\n📌 *Razón:* ${text}\n\n🔒 El usuario ha sido baneado y no podrá usar ningún comando del bot en ningún grupo.`
  
  await conn.reply(m.chat, mensaje, m, rcanal)
}

// ==================== RESTRICCIÓN PARA USUARIOS BANEADOS ====================
let handlerBefore = async function (m, { conn }) {
  const userData = global.db.data.users[m.sender]
  
  if (userData && (userData.globalBan === true || userData.banned === true)) {
    const allowedCommands = ['unbang', 'unbanuser', 'desbloquear', 'unban', 'banuser', 'listbanuser', 'listbang']
    const cmd = (m.text || '').trim().toLowerCase().split(' ')[0].replace(/^\./g, '')
    
    if (allowedCommands.includes(cmd)) return false
    
    await conn.reply(m.chat, `☑️ *ESTAS BANEADO GLOBALMENTE*\nNo puedes usar mis comandos.\n\n📌 Contacta al owner para más información.`, m, rcanal)
    return true
  }
  return false
}

// ==================== COMANDO PARA DESBANEAR ====================
let handlerUnban = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, `☑️ *USO CORRECTO*\n\n.unbang @usuario\n\nO responde al mensaje del usuario.`, m, rcanal)
  }
  
  // Usar la misma lógica de promote
  let mentionedJid = await m.mentionedJid
  let user = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null
  
  if (!user) {
    let numero = text.replace(/\s/g, '').replace(/[^0-9+]/g, '')
    if (!numero.startsWith('+')) numero = '+' + numero
    user = numero + '@s.whatsapp.net'
  }
  
  if (!user) {
    return conn.reply(m.chat, `☑️ *USO CORRECTO*\n\n.unbang @usuario`, m, rcanal)
  }
  
  if (!global.db.data.users[user]?.globalBan && !global.db.data.users[user]?.banned) {
    return conn.reply(m.chat, `☑️ El usuario no está baneado globalmente.`, m, rcanal)
  }
  
  global.db.data.users[user].globalBan = false
  global.db.data.users[user].banned = false
  global.db.data.users[user].globalBanReason = null
  global.db.data.users[user].globalBanDate = null
  
  let nombre = user.split('@')[0]
  try {
    const name = await conn.getName(user)
    if (name) nombre = name
  } catch (e) {
    nombre = user.split('@')[0]
  }
  
  await conn.reply(m.chat, `☑️ *USUARIO DESBANEADO*\n\n📌 *Usuario:* ${nombre}\n✅ Ahora puede usar los comandos del bot nuevamente.`, m, rcanal)
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
