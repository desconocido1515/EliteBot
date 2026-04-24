// plugins/global_ban.js

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `☑️ *USO CORRECTO*\n\n.${command} +593999999999\n\nO responde al mensaje del usuario con .${command}`, m, rcanal)
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
  
  try {
    // Obtener todos los grupos donde está el bot
    const groups = await conn.groupFetchAllParticipating()
    let gruposBaneados = []
    
    for (let groupId in groups) {
      try {
        // Obtener metadata del grupo
        const metadata = await conn.groupMetadata(groupId)
        
        // Verificar si el usuario está en el grupo
        const userInGroup = metadata.participants.some(p => p.id === jid)
        
        if (userInGroup) {
          // Verificar si el bot es admin
          const isBotAdmin = metadata.participants.some(p => p.id === conn.user.jid && p.admin)
          
          if (isBotAdmin) {
            // Expulsar al usuario
            await conn.groupParticipantsUpdate(groupId, [jid], 'remove')
            gruposBaneados.push(metadata.subject || groupId)
            await delay(1000) // Pequeña pausa para evitar rate limit
          } else {
            console.log(`⚠️ No soy admin en ${metadata.subject}, no puedo banear`)
          }
        }
      } catch (err) {
        console.error(`Error procesando grupo ${groupId}:`, err)
      }
    }
    
    // Guardar en base de datos el usuario baneado globalmente
    if (!global.db.data.users[jid]) global.db.data.users[jid] = {}
    global.db.data.users[jid].globalBan = true
    global.db.data.users[jid].globalBanReason = text || 'Sin especificar'
    global.db.data.users[jid].globalBanDate = Date.now()
    
    let mensaje = `☑️ *USUARIO BANEADO GLOBALMENTE*\n\n📌 *Usuario:* ${numero}\n📍 *Grupos donde fue expulsado:* ${gruposBaneados.length}\n\n`
    
    if (gruposBaneados.length > 0) {
      mensaje += `📋 *Lista de grupos:*\n`
      for (let i = 0; i < Math.min(gruposBaneados.length, 10); i++) {
        mensaje += `▸ ${gruposBaneados[i]}\n`
      }
      if (gruposBaneados.length > 10) {
        mensaje += `▸ ...y ${gruposBaneados.length - 10} grupos más\n`
      }
    } else {
      mensaje += `⚠️ No se pudo expulsar al usuario porque el bot no es admin en los grupos donde está.\n`
    }
    
    mensaje += `\n🔒 *El usuario ha sido baneado globalmente* y no podrá usar ningún comando del bot.`
    
    await conn.reply(m.chat, mensaje, m, rcanal)
    
  } catch (error) {
    console.error('Error:', error)
    await conn.reply(m.chat, `☑️ Ocurrió un error al intentar banear al usuario.\n\n${error.message}`, m, rcanal)
  }
}

// ==================== RESTRICCIÓN PARA USUARIOS BANEADOS GLOBALMENTE ====================
let handlerBefore = async function (m, { conn }) {
  if (global.db.data.users[m.sender]?.globalBan) {
    const allowedCommands = ['unbang']
    const cmd = (m.text || '').trim().toLowerCase().split(' ')[0].replace(/^\./g, '')
    if (allowedCommands.includes(cmd)) return false
    
    await conn.reply(m.chat, `☑️ *ESTAS BANEADO GLOBALMENTE*\nNo puedes usar mis comandos.\n\n📌 Contacta al owner para más información: wa.me/${global.owner[0][0]}`, m, rcanal)
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
  
  await conn.reply(m.chat, `☑️ *USUARIO DESBANEADO GLOBALMENTE*\n\n📌 *Usuario:* ${numero}\n✅ Ahora puede usar los comandos del bot nuevamente.`, m, rcanal)
}

handler.help = ['bang', 'bang <número>']
handler.tags = ['owner']
handler.command = /^(bang|banearusuario|banear|globalban)$/i
handler.rowner = true

export { handlerBefore as before }
export default handler

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
