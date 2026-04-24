import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, command }) => {
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
    
    // Para los demás comandos, se necesita mención o respuesta
    let who = m.mentionedJid?.[0] || m.quoted?.sender || null
    
    if (!who) {
      return conn.reply(m.chat, `☑️ *USO CORRECTO*\n\n.${cmd} @usuario\n\nO responde al mensaje del usuario.`, m, rcanal)
    }
    
    // No banear al bot
    if (who === conn.user.jid) {
      return conn.reply(m.chat, `☑️ No puedo banearme a mí mismo.`, m, rcanal)
    }
    
    // No banear owners
    let whoNumber = who.split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    let ownerNumbers = global.owner
      .map(v => Array.isArray(v) ? v[0] : v)
      .map(v => String(v).split(':')[0].replace(/[^0-9]/g, ''))
    
    if (ownerNumbers.includes(whoNumber)) {
      return conn.reply(m.chat, `☑️ No puedes banear a un owner del bot.`, m, rcanal)
    }
    
    switch (cmd) {
      case 'banuser':
      case 'bloqueado':
      case 'bloquear': {
        if (!global.db.data.users[who]) global.db.data.users[who] = {}
        
        global.db.data.users[who].banned = true
        saveDatabase()
        
        await conn.sendMessage(m.chat, {
          text: `☑️ *USUARIO BANEADO*\n\n@${who.split('@')[0].split(':')[0]} fue baneado en mi base de datos, no podrá usar mis comandos. ❌\n\n*Motivo:* Toxicidad hacia Elite Bot.`,
          mentions: [who]
        }, { quoted: m })
        break
      }
      
      case 'unbanuser':
      case 'desbloquear': {
        if (!global.db.data.users[who]) global.db.data.users[who] = {}
        
        global.db.data.users[who].banned = false
        saveDatabase()
        
        await conn.sendMessage(m.chat, {
          text: `☑️ *USUARIO DESBANEADO*\n\n@${who.split('@')[0].split(':')[0]} fue desbaneado en mi base de datos, ahora podrá usar mis comandos. ✅`,
          mentions: [who]
        }, { quoted: m })
        break
      }
    }
    
  } catch (error) {
    console.error('Error:', error)
    await conn.reply(m.chat, `☑️ Ocurrió un error al ejecutar el comando.`, m, rcanal)
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

export default handler
