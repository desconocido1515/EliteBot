import fs from 'fs'
import path from 'path'

// ==================== RESTRICCIÓN PARA USUARIOS BANEADOS ====================
let handlerBefore = async function (m, { conn }) {
  // Verificar si el usuario está baneado
  if (global.db.data.users[m.sender]?.banned) {
    // No bloquear comandos específicos
    const allowedCommands = ['unbanuser', 'desbloquear', 'listbanuser', 'banuser', 'bloqueado', 'bloquear']
    const cmd = (m.text || '').trim().toLowerCase().split(' ')[0].replace(/^\./g, '')
    if (allowedCommands.includes(cmd)) return false
    
    // Enviar mensaje de restricción
    await conn.reply(m.chat, `☑️ *ESTAS BANEADO*\nNo puedes usar mis comandos.`, m, rcanal)
    return true
  }
  return false
}

// ==================== HANDLER PRINCIPAL ====================
let handler = async (m, { conn, command, usedPrefix }) => {
  try {
    // Obtener el comando real (sin el punto)
    const cmd = command || (m.text || '').trim().toLowerCase().replace(/^\./, '')
    
    // Verificar si el comando es listbanuser (no necesita mención)
    if (cmd === 'listbanuser') {
      let users = global.db.data.users || {}
      let bannedUsers = Object.entries(users).filter(([jid, user]) => user?.banned)
      
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
      return
    }
    
    // Usar la misma lógica de promote para obtener la mención
    let mentionedJid = await m.mentionedJid
    let who = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null
    
    if (!who) {
      return conn.reply(m.chat, `☑️ *USO CORRECTO*\n\n.${cmd} @usuario\n\nO responde al mensaje del usuario.`, m, rcanal)
    }
    
    // No banear al bot
    if (who === conn.user.jid) {
      return conn.reply(m.chat, `☑️ No puedo banearme a mí mismo.`, m, rcanal)
    }
    
    // No banear owners (usando global.owner)
    let whoNumber = who.split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    let isOwner = false
    if (global.owner) {
      for (let owner of global.owner) {
        let ownerNum = Array.isArray(owner) ? owner[0] : owner
        ownerNum = String(ownerNum).split(':')[0].replace(/[^0-9]/g, '')
        if (ownerNum === whoNumber) {
          isOwner = true
          break
        }
      }
    }
    
    if (isOwner) {
      return conn.reply(m.chat, `☑️ No puedes banear a un owner del bot.`, m, rcanal)
    }
    
    switch (cmd) {
      case 'banuser':
      case 'bloqueado':
      case 'bloquear': {
        if (!global.db.data.users[who]) global.db.data.users[who] = {}
        
        global.db.data.users[who].banned = true
        saveDatabase()
        
        await conn.reply(m.chat, `☑️ *USUARIO BANEADO*\n\n@${who.split('@')[0].split(':')[0]} fue baneado en mi base de datos, no podrá usar mis comandos. ❌\n\n*Motivo:* Toxicidad hacia Elite Bot.`, m, rcanal)
        break
      }
      
      case 'unbanuser':
      case 'desbloquear': {
        if (!global.db.data.users[who]) global.db.data.users[who] = {}
        
        global.db.data.users[who].banned = false
        saveDatabase()
        
        await conn.reply(m.chat, `☑️ *USUARIO DESBANEADO*\n\n@${who.split('@')[0].split(':')[0]} fue desbaneado en mi base de datos, ahora podrá usar mis comandos. ✅`, m, rcanal)
        break
      }
    }
    
  } catch (error) {
    console.error('Error:', error)
    await conn.reply(m.chat, `☑️ Ocurrió un error al ejecutar el comando.\n\n${error.message}`, m, rcanal)
  }
}

// ========================================
// GUARDAR DB EN DISCO
// ========================================
function saveDatabase() {
  try {
    const dbFile = path.join('./', 'database.json')
    fs.writeFileSync(dbFile, JSON.stringify(global.db.data, null, 2))
    console.log('✅ Base de datos guardada correctamente')
  } catch (err) {
    console.error('❌ Error guardando la base de datos:', err)
  }
}

handler.help = [
  'banuser @user',
  'bloqueado @user',
  'bloquear @user',
  'unbanuser @user',
  'desbloquear @user',
  'listbanuser'
]
handler.tags = ['owner']
handler.command = /^(banuser|bloqueado|bloquear|unbanuser|desbloquear|listbanuser)$/i
handler.rowner = true

export { handlerBefore as before }
export default handler
