import fs from 'fs'
import path from 'path'

let handler = async (m, { conn }) => {
  let who = m.mentionedJid?.[0] || m.quoted?.sender || null
  let command = (m.text || '').trim().split(/\s+/)[0].toLowerCase()

  if (command !== 'listbanuser' && !who) {
    throw `✳️ *Uso correcto:*\n\n${command} @usuario\n\no responde al mensaje del usuario.`
  }

  switch (command) {
    case 'banuser':
    case 'bloqueado':
    case 'bloquear': {
      if (!global.db.data.users[who]) global.db.data.users[who] = {}

      // No banear al bot
      if (who === conn.user.jid) {
        return m.reply('🤖 No puedo banearme a mí mismo.')
      }

      // No banear owners
      let whoNumber = who.split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
      let ownerNumbers = global.owner
        .map(v => Array.isArray(v) ? v[0] : v)
        .map(v => String(v).split(':')[0].replace(/[^0-9]/g, ''))

      if (ownerNumbers.includes(whoNumber)) {
        return m.reply('👑 No puedes banear a un owner del bot.')
      }

      global.db.data.users[who].banned = true
      saveDatabase()

      await conn.sendMessage(m.chat, {
        text: `> *INFORMACIÓN 📢*\n\n@${who.split('@')[0].split(':')[0]} fuiste baneado en mi base de datos, no podrás usar mis comandos. ❌\n\n*Motivo :* Toxicidad hacia Elite Bot.`,
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
        text: `> *INFORMACIÓN 📢*\n\nEl usuario @${who.split('@')[0].split(':')[0]} fue desbaneado en mi base de datos, ahora podrá usar mis comandos. ✅`,
        mentions: [who]
      }, { quoted: m })

      break
    }

    case 'listbanuser': {
      let users = global.db.data.users || {}
      let bannedUsers = Object.entries(users).filter(([jid, user]) => user?.banned)

      if (!bannedUsers.length) {
        return m.reply(`*LISTA DE TÓXICOS*\n\nNo hay usuarios baneados actualmente.`)
      }

      let txt = `*LISTA DE TÓXICOS*\n\n`
      let mentions = []

      for (let i = 0; i < bannedUsers.length; i++) {
        let jid = bannedUsers[i][0]
        let num = jid.split('@')[0].split(':')[0]
        txt += `${i + 1}. @${num}\n`
        mentions.push(jid)
      }

      await conn.sendMessage(m.chat, {
        text: txt.trim(),
        mentions
      }, { quoted: m })

      break
    }
  }
}

// ========================================
// GUARDAR DB EN DISCO
// ========================================
function saveDatabase() {
  try {
    const dbFile = path.join('./', 'database.json') // ajusta según la ruta de tu DB
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

// ✅ Punto o sin punto
handler.customPrefix = /^\.?(banuser|bloqueado|bloquear|unbanuser|desbloquear|listbanuser)(\s|$)/i
handler.command = new RegExp

handler.rowner = true

export default handler
