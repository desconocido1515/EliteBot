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
  if (global.db.data.users[m.sender]?.globalBan) {
    const allowedCommands = ['unbang', 'unbanuser', 'desbloquear']
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
    return conn.reply(m.chat, `☑️ *USO CORRECTO*\n\n.unbang +593999999999`, m, rcanal)
  }
  
  let numero = text.replace(/\s/g, '').replace(/[^0-9+]/g, '')
  if (!numero.startsWith('+')) numero = '+' + numero
  let jid = numero + '@s.whatsapp.net'
  
  if (!global.db.data.users[jid]?.globalBan) {
    return conn.reply(m.chat, `☑️ El usuario ${numero} no está baneado globalmente.`, m, rcanal)
  }
  
  global.db.data.users[jid].globalBan = false
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

handler.help = ['bang', 'unbang']
handler.tags = ['owner']
handler.command = /^(bang|banearusuario|banear|globalban)$/i
handler.rowner = true

export { handlerBefore as before }
export default handler
