// plugins/tiempo_grupo.js

// ==================== FUNCIÓN AUXILIAR ====================
function msToDate(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, ' *Días*\n ', h, ' *Horas*\n ', m, ' *Minutos*\n ', s, ' *Segundos* '].map(v => v.toString().padStart(2, 0)).join('')
}

// ==================== 1. INFO - VER TIEMPO RESTANTE ====================
let handlerInfo = async (m, { conn, args, usedPrefix, command }) => {
  if (global.db.data.chats[m.chat].expired < 1) {
    return conn.reply(m.chat, `✅ 𝘌𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰 𝘯𝘰 𝘵𝘪𝘦𝘯𝘦 𝘭𝘪𝘮𝘪𝘵𝘦 𝘥𝘦 𝘵𝘪𝘦𝘮𝘱𝘰.`, m, rcanal)
  }
  
  let who
  if (m.isGroup) who = args[1] ? args[1] : m.chat
  else who = args[1]

  var now = new Date() * 1
  
  conn.reply(m.chat, `🕔 El tiempo restante de la prueba gratis de Elitebotglobal es :  
    
 ${msToDate(global.db.data.chats[who].expired - now)}

Despues Elite Bot se saldra automáticamente del grupo.`, m, rcanal)
}

// ==================== 2. SIN TIEMPO - DESACTIVAR EXPIRACIÓN ====================
let handlerSinTiempo = async (m, { conn, args, usedPrefix, command }) => {
  let who
  if (m.isGroup) who = args[1] ? args[1] : m.chat
  else who = args[1]

  if (new Date() * 1 < global.db.data.chats[who].expired) global.db.data.chats[who].expired = false
  else global.db.data.chats[who].expired = false
  
  conn.reply(m.chat, `✅ 𝘌𝘯𝘵𝘦𝘯𝘥𝘪𝘥𝘰 𝘤𝘳𝘦𝘢𝘥𝘰𝘳 𝘴𝘦 𝘥𝘦𝘴𝘢𝘤𝘵𝘪𝘷𝘰 𝘦𝘭 𝘵𝘪𝘦𝘮𝘱𝘰 𝘥𝘦 𝘷𝘦𝘯𝘤𝘪𝘮𝘪𝘦𝘯𝘵𝘰 𝘥𝘦 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰.`, m, rcanal)
}

// ==================== 3. TIEMPO EN DÍAS ====================
let handlerDias = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0] || isNaN(args[0])) {
    return conn.reply(m.chat, `⚠️ 𝘐𝘯𝘨𝘳𝘦𝘴𝘢 𝘭𝘰𝘴 𝘥𝘪𝘢𝘴 𝘲𝘶𝘦 𝘲𝘶𝘪𝘦𝘳𝘦𝘴 𝘲𝘶𝘦 𝘦𝘴𝘵𝘦́ 𝘦𝘯 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰.\n\n» 𝘌𝘫𝘦𝘮𝘱𝘭𝘰:\n${usedPrefix + command} 30`, m, rcanal)
  }

  let who
  if (m.isGroup) who = args[1] ? args[1] : m.chat
  else who = args[1]

  var nDays = 86400000 * args[0]
  var now = new Date() * 1
  if (now < global.db.data.chats[who].expired) global.db.data.chats[who].expired += nDays
  else global.db.data.chats[who].expired = now + nDays
  
  let teks = `🕔 𝘌𝘭𝘪𝘵𝘦 𝘉𝘰𝘵 𝘎𝘭𝘰𝘣𝘢𝘭 𝘴𝘦 𝘦𝘴𝘵𝘢𝘣𝘭𝘦𝘤𝘪𝘰 𝘤𝘰𝘮𝘰 𝘣𝘰𝘵 𝘮𝘦𝘯𝘴𝘶𝘢𝘭 𝘦𝘯 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰.\n\n*Durante:* ${args[0]} Días\n\n*Cuenta regresiva :* ${msToDate(global.db.data.chats[who].expired - now)}\n\n𝗘𝗹𝗶𝘁𝗲𝗕𝗼𝘁𝗚𝗹𝗼𝗯𝗮𝗹 (𝗘𝗕𝗚)`
  conn.reply(m.chat, teks, m, rcanal)
}

// ==================== 4. TIEMPO EN HORAS ====================
let handlerHoras = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0] || isNaN(args[0])) {
    return conn.reply(m.chat, `⚠️ 𝘐𝘯𝘨𝘳𝘦𝘴𝘢 𝘭𝘢𝘴 𝘩𝘰𝘳𝘢𝘴 𝘲𝘶𝘦 𝘲𝘶𝘪𝘦𝘳𝘦𝘴 𝘲𝘶𝘦 𝘦𝘴𝘵𝘦́ 𝘦𝘯 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰.\n\n» 𝘌𝘫𝘦𝘮𝘱𝘭𝘰:\n${usedPrefix + command} 30`, m, rcanal)
  }

  let who
  if (m.isGroup) who = args[1] ? args[1] : m.chat
  else who = args[1]

  var nHours = 3600000 * args[0]
  var now = new Date() * 1
  if (now < global.db.data.chats[who].expired) global.db.data.chats[who].expired += nHours
  else global.db.data.chats[who].expired = now + nHours
  
  let teks = `🕔 Se activo la prueba gratis de Elite Bot Global, disfruta la variedad de comandos de Elite Bot con la palabra .menu \n\n» *Tiempo :* ${args[0]} Horas\n\n*Cuenta regresiva :*\n ${msToDate(global.db.data.chats[who].expired - now)}\n\n𝗘𝗹𝗶𝘁𝗲𝗕𝗼𝘁𝗚𝗹𝗼𝗯𝗮𝗹 (𝗘𝗕𝗚)`
  conn.reply(m.chat, teks, m, rcanal)
}

// ==================== 5. TIEMPO EN MINUTOS / DEMO ====================
let handlerMinutos = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0] || isNaN(args[0])) {
    return conn.reply(m.chat, `⚠️ 𝘐𝘯𝘨𝘳𝘦𝘴𝘢 𝘭𝘰𝘴 𝘮𝘪𝘯𝘶𝘵𝘰𝘴 𝘲𝘶𝘦 𝘲𝘶𝘪𝘦𝘳𝘦𝘴 𝘲𝘶𝘦 𝘦𝘴𝘵𝘦́ 𝘦𝘯 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰.\n\n» 𝘌𝘫𝘦𝘮𝘱𝘭𝘰:\n${usedPrefix + command} 15`, m, rcanal)
  }

  let who
  if (m.isGroup) who = args[1] ? args[1] : m.chat
  else who = args[1]

  var nMinutes = 60000 * args[0]
  var now = new Date() * 1
  if (now < global.db.data.chats[who].expired) global.db.data.chats[who].expired += nMinutes
  else global.db.data.chats[who].expired = now + nMinutes
  
  let teks = `🕔 Se activo la prueba gratis de Elite Bot Global, disfruta la variedad de comandos de Elite Bot con la palabra .menu \n\n» *Tiempo :* ${args[0]} Minutos\n\n*Cuenta regresiva :*\n ${msToDate(global.db.data.chats[who].expired - now)}\n\n𝗘𝗹𝗶𝘁𝗲𝗕𝗼𝘁𝗚𝗹𝗼𝗯𝗮𝗹 (𝗘𝗕𝗚)`
  conn.reply(m.chat, teks, m, rcanal)
}

// ==================== HANDLER PRINCIPAL UNIFICADO ====================
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (command === 'info') {
    return handlerInfo(m, { conn, args, usedPrefix, command })
  }
  if (command === 'sintiempo') {
    return handlerSinTiempo(m, { conn, args, usedPrefix, command })
  }
  if (command === 'tiempod' || command === 'addexpired') {
    return handlerDias(m, { conn, args, usedPrefix, command })
  }
  if (command === 'tiempoh' || command === 'addexpired') {
    return handlerHoras(m, { conn, args, usedPrefix, command })
  }
  if (command === 'demo' || command === 'tiempo') {
    return handlerMinutos(m, { conn, args, usedPrefix, command })
  }
}

// ==================== COMANDOS ====================
handler.help = ['info', 'sintiempo', 'tiempod', 'tiempoh', 'demo']
handler.tags = ['group', 'owner']
handler.command = /^(info|sintiempo|tiempod|tiempoh|addexpired|demo|tiempo)$/i

// Restricciones
handler.group = true
handler.rowner = /^(sintiempo|tiempod|tiempoh|addexpired|demo|tiempo)$/i.test(handler.command) ? true : false

export default handler
