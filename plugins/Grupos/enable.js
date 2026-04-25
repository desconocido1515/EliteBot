const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin }) => {
const primaryBot = global.db.data.chats[m.chat].primaryBot
if (primaryBot && conn.user.jid !== primaryBot) throw !1
const chat = global.db.data.chats[m.chat]
let type = command.toLowerCase()

// Extraer acción (on/off) y el comando real
let action = args[0]?.toLowerCase()
let comandoReal = args[1]?.toLowerCase() || type

// Si el primer argumento es on/off/enable/disable, usamos esa acción
if (action === 'on' || action === 'enable' || action === 'activar') {
    action = 'on'
} else if (action === 'off' || action === 'disable' || action === 'desactivar') {
    action = 'off'
} else {
    // Si no hay acción válida, mostrar ayuda
    action = null
    comandoReal = type
}

let isEnable = chat[comandoReal] !== undefined ? chat[comandoReal] : false

// Si no hay acción, mostrar panel de control
if (!action) {
    return conn.reply(m.chat, `╭━━━〔 ⚙️ ᴘᴀɴᴇʟ ᴅᴇ ᴄᴏɴᴛʀᴏʟ 〕━━⬣  
┃ ❣ *Un administrador puede gestionar el comando:*  
┃ ╰➤ *${usedPrefix}on ${comandoReal}* o *${usedPrefix}off ${comandoReal}*  
┃  
┃ ღ Comandos disponibles: 💫
┃ 𖥔 _welcome_ - Bienvenidas
┃ 𖥔 _nsfw_ - Contenido +18
┃ 𖥔 _economy_ - Sistema económico
┃ 𖥔 _rpg_ - Sistema RPG
┃ 𖥔 _detect_ - Alertas de grupo
┃ 𖥔 _antilink_ - Anti enlaces
┃ 𖥔 _modoadmin_ - Solo admins
┃ 𖥔 _jadibot_ - Sub bots
┃  
┃ ☙ Estado actual de *${comandoReal}*:  
┃ ╰➤ *${isEnable ? '✓ Activado' : '✗ Desactivado'}*  
╰━━━━━━━━━━━━━━━━━━━━━━⬣`, m, rcanal)
}

// Validar acción
if (action === 'on') {
    if (isEnable) return conn.reply(m.chat, `☑️ *${comandoReal}* ya estaba *activado*.`, m, rcanal)
    isEnable = true
} else if (action === 'off') {
    if (!isEnable) return conn.reply(m.chat, `☑️ *${comandoReal}* ya estaba *desactivado*.`, m, rcanal)
    isEnable = false
}

// Validar permisos según el comando
switch (comandoReal) {
case 'welcome': case 'bienvenida': {
    if (!m.isGroup) {
        if (!isOwner) {
            return conn.reply(m.chat, `☑️ Este comando solo funciona en grupos.`, m, rcanal)
        }
    } else if (!isAdmin && !isOwner) {
        return conn.reply(m.chat, `☑️ Solo administradores pueden usar este comando.`, m, rcanal)
    }
    chat.welcome = isEnable
    break
}
case 'modoadmin': case 'onlyadmin': {
    if (!m.isGroup) {
        if (!isOwner) {
            return conn.reply(m.chat, `☑️ Este comando solo funciona en grupos.`, m, rcanal)
        }
    } else if (!isAdmin && !isOwner) {
        return conn.reply(m.chat, `☑️ Solo administradores pueden usar este comando.`, m, rcanal)
    }
    chat.modoadmin = isEnable
    break
}
case 'detect': case 'alertas': {
    if (!m.isGroup) {
        if (!isOwner) {
            return conn.reply(m.chat, `☑️ Este comando solo funciona en grupos.`, m, rcanal)
        }
    } else if (!isAdmin && !isOwner) {
        return conn.reply(m.chat, `☑️ Solo administradores pueden usar este comando.`, m, rcanal)
    }
    chat.detect = isEnable
    break
}
case 'antilink': case 'antienlace': {
    if (!m.isGroup) {
        if (!isOwner) {
            return conn.reply(m.chat, `☑️ Este comando solo funciona en grupos.`, m, rcanal)
        }
    } else if (!isAdmin && !isOwner) {
        return conn.reply(m.chat, `☑️ Solo administradores pueden usar este comando.`, m, rcanal)
    }
    chat.antiLink = isEnable
    break
}
case 'nsfw': case 'modohorny': {
    if (!m.isGroup) {
        if (!isOwner) {
            return conn.reply(m.chat, `☑️ Este comando solo funciona en grupos.`, m, rcanal)
        }
    } else if (!isAdmin && !isOwner) {
        return conn.reply(m.chat, `☑️ Solo administradores pueden usar este comando.`, m, rcanal)
    }
    chat.nsfw = isEnable
    break
}
case 'economy': case 'economia': {
    if (!m.isGroup) {
        if (!isOwner) {
            return conn.reply(m.chat, `☑️ Este comando solo funciona en grupos.`, m, rcanal)
        }
    } else if (!isAdmin && !isOwner) {
        return conn.reply(m.chat, `☑️ Solo administradores pueden usar este comando.`, m, rcanal)
    }
    chat.economy = isEnable
    break
}
case 'rpg': case 'gacha': {
    if (!m.isGroup) {
        if (!isOwner) {
            return conn.reply(m.chat, `☑️ Este comando solo funciona en grupos.`, m, rcanal)
        }
    } else if (!isAdmin && !isOwner) {
        return conn.reply(m.chat, `☑️ Solo administradores pueden usar este comando.`, m, rcanal)
    }
    chat.gacha = isEnable
    break
}
case 'jadibot': case 'serbot': {
    // Solo owner puede usar este comando
    if (!isOwner) {
        return conn.reply(m.chat, `☑️ *COMANDO RESTRINGIDO*\n\nEste comando solo puede ser usado por el *OWNER* del bot.`, m, rcanal)
    }
    chat.jadibot = isEnable
    break
}
default:
    return conn.reply(m.chat, `☑️ Comando *${comandoReal}* no reconocido.`, m, rcanal)
}

chat[comandoReal] = isEnable
conn.reply(m.chat, `✅ Has *${isEnable ? 'activado' : 'desactivado'}* *${comandoReal}* para este grupo.`, m, rcanal)
}

handler.help = ['on', 'off']
handler.tags = ['nable']
handler.command = ['on', 'off']

export default handler
