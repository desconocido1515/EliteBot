// plugins/ban_global.js

const handler = async (m, { conn, args, command, isOwner, isROwner }) => {
  if (!isOwner && !isROwner) {
    return conn.reply(m.chat, `☑️ Este comando es solo para el owner.`, m, rcanal)
  }

  if (!args[0]) {
    return conn.reply(m.chat, `☑️ *USO CORRECTO*\n\n.ban +593999999999\n\nEjemplo: .ban +593993370003`, m, rcanal)
  }

  let numero = args[0].replace(/[^0-9]/g, '')
  let jid = numero + '@s.whatsapp.net'

  try {
    if (command === 'ban' || command === 'banearusuario' || command === 'bloquear') {
      // Bloquear al usuario en WhatsApp
      await conn.updateBlockStatus(jid, 'block')
      
      // Guardar en base de datos
      if (!global.db.data.users) global.db.data.users = {}
      if (!global.db.data.users[jid]) global.db.data.users[jid] = {}
      global.db.data.users[jid].banned = true
      global.db.data.users[jid].bannedDate = Date.now()
      
      await conn.reply(m.chat, `☑️ *USUARIO BANEADO*\n\n📌 *Número:* +${numero}\n🔒 El usuario ha sido bloqueado y no podrá usar el bot.`, m, rcanal)
      
    } else if (command === 'unban' || command === 'desbloquear') {
      // Desbloquear al usuario en WhatsApp
      await conn.updateBlockStatus(jid, 'unblock')
      
      // Actualizar base de datos
      if (global.db.data.users && global.db.data.users[jid]) {
        global.db.data.users[jid].banned = false
      }
      
      await conn.reply(m.chat, `☑️ *USUARIO DESBANEADO*\n\n📌 *Número:* +${numero}\n✅ El usuario ha sido desbloqueado y puede usar el bot nuevamente.`, m, rcanal)
    }
  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, `☑️ Ocurrió un error al intentar ${command === 'ban' ? 'banear' : 'desbanear'} al usuario.`, m, rcanal)
  }
}

// ==================== LISTAR USUARIOS BLOQUEADOS ====================
const handlerList = async (m, { conn, isOwner, isROwner }) => {
  if (!isOwner && !isROwner) {
    return conn.reply(m.chat, `☑️ Este comando es solo para el owner.`, m, rcanal)
  }
  
  try {
    const blocklist = await conn.fetchBlocklist()
    
    if (!blocklist || blocklist.length === 0) {
      return conn.reply(m.chat, `☑️ *LISTA DE BLOQUEADOS*\n\nNo hay usuarios bloqueados actualmente.`, m, rcanal)
    }
    
    let txt = `☑️ *LISTA DE USUARIOS BLOQUEADOS*\n\n*Total:* ${blocklist.length}\n\n`
    
    for (let i = 0; i < blocklist.length; i++) {
      let jid = blocklist[i]
      let num = jid.split('@')[0]
      txt += `${i + 1}. +${num}\n`
    }
    
    await conn.reply(m.chat, txt, m, rcanal)
  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, `☑️ Error al obtener la lista de bloqueados.`, m, rcanal)
  }
}

handler.command = ['ban', 'banearusuario', 'bloquear', 'unban', 'desbloquear']
handler.owner = true
handler.group = false
handler.private = false

handlerList.command = ['banlist', 'listaban', 'listablock']
handlerList.owner = true

export { handlerList as list }
export default handler
