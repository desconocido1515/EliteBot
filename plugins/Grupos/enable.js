const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin }) => {
const primaryBot = global.db.data.chats[m.chat].primaryBot
if (primaryBot && conn.user.jid !== primaryBot) throw !1
const chat = global.db.data.chats[m.chat]
const settings = global.db.data.settings[conn.user.jid] || {}

// El comando puede ser 'on' o 'off'
const accion = command.toLowerCase()
const comandoReal = args[0]?.toLowerCase()

// Si no hay comandoReal, mostrar panel con estados
if (!comandoReal) {
    // Obtener estados de los comandos
    const estadoWelcome = chat.welcome ? '✅ ACTIVADO' : '❌ DESACTIVADO'
    const estadoNsfw = chat.nsfw ? '✅ ACTIVADO' : '❌ DESACTIVADO'
    const estadoEconomy = chat.economy ? '✅ ACTIVADO' : '❌ DESACTIVADO'
    const estadoRpg = chat.gacha ? '✅ ACTIVADO' : '❌ DESACTIVADO'
    const estadoDetect = chat.detect ? '✅ ACTIVADO' : '❌ DESACTIVADO'
    const estadoAntiLink = chat.antiLink ? '✅ ACTIVADO' : '❌ DESACTIVADO'
    const estadoModoAdmin = chat.modoadmin ? '✅ ACTIVADO' : '❌ DESACTIVADO'
    const estadoJadibot = settings.jadibotmd ? '✅ ACTIVADO' : '❌ DESACTIVADO'
    
    return conn.reply(m.chat, `╭━━━〔 ⚙️ PANEL DE CONTROL 〕━━⬣
┃
┃ ✨ *COMANDOS DISPONIBLES* ✨
┃
┃ 🟢 *welcome* - Bienvenidas
┃    └▸ Estado: ${estadoWelcome}
┃
┃ 🔞 *nsfw* - Contenido +18
┃    └▸ Estado: ${estadoNsfw}
┃
┃ 💰 *economy* - Sistema económico
┃    └▸ Estado: ${estadoEconomy}
┃
┃ 🎮 *rpg* - Sistema RPG
┃    └▸ Estado: ${estadoRpg}
┃
┃ 📢 *detect* - Alertas de grupo
┃    └▸ Estado: ${estadoDetect}
┃
┃ 🔗 *antilink* - Anti enlaces
┃    └▸ Estado: ${estadoAntiLink}
┃
┃ 👑 *modoadmin* - Solo admins
┃    └▸ Estado: ${estadoModoAdmin}
┃
┃ 🤖 *jadibot* - Sub bots (🌍 GLOBAL)
┃    └▸ Estado: ${estadoJadibot}
┃
┃
┃ 📌 *Cómo usar:*
┃ ▸ ${usedPrefix}on welcome  → Activar
┃ ▸ ${usedPrefix}off welcome → Desactivar
┃
╰━━━━━━━━━━━━━━━━━━━━━━⬣`, m, rcanal)
}

// ==================== CONFIGURACIÓN GLOBAL JADIBOT ====================
if (comandoReal === 'jadibot' || comandoReal === 'serbot') {
    if (!isOwner) {
        return conn.reply(m.chat, `☑️ *ACCESO DENEGADO*\n\nEl comando *${comandoReal}* solo puede ser usado por el *OWNER* del bot.`, m, rcanal)
    }
    
    let isEnable = settings.jadibotmd !== undefined ? settings.jadibotmd : true
    
    if (accion === 'on') {
        if (isEnable) return conn.reply(m.chat, `☑️ *${comandoReal.toUpperCase()}* ya estaba *ACTIVADO* globalmente.`, m, rcanal)
        isEnable = true
    } else if (accion === 'off') {
        if (!isEnable) return conn.reply(m.chat, `☑️ *${comandoReal.toUpperCase()}* ya estaba *DESACTIVADO* globalmente.`, m, rcanal)
        isEnable = false
    } else {
        return conn.reply(m.chat, `☑️ Acción no válida. Usa *${usedPrefix}on* o *${usedPrefix}off*.`, m, rcanal)
    }
    
    settings.jadibotmd = isEnable
    return conn.reply(m.chat, `🌍 *CONFIGURACIÓN GLOBAL* 🌍\n\n✅ *${comandoReal.toUpperCase()}* ha sido *${isEnable ? 'ACTIVADO' : 'DESACTIVADO'}* para TODO el bot.`, m, rcanal)
}

// ==================== CONFIGURACIÓN POR GRUPO ====================
if (!m.isGroup) {
    return conn.reply(m.chat, `☑️ Este comando solo funciona en grupos.`, m, rcanal)
}

if (!isAdmin && !isOwner) {
    return conn.reply(m.chat, `☑️ Solo administradores pueden usar este comando.`, m, rcanal)
}

let isEnable = chat[comandoReal] !== undefined ? chat[comandoReal] : false
let nombreComando = ''

switch (comandoReal) {
    case 'welcome': case 'bienvenida':
        nombreComando = 'WELCOME'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `☑️ *WELCOME* ya estaba *ACTIVADO* en este grupo.`, m, rcanal)
            isEnable = true
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `☑️ *WELCOME* ya estaba *DESACTIVADO* en este grupo.`, m, rcanal)
            isEnable = false
        }
        chat.welcome = isEnable
        break
    case 'modoadmin': case 'onlyadmin':
        nombreComando = 'MODO ADMIN'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `☑️ *MODO ADMIN* ya estaba *ACTIVADO* en este grupo.`, m, rcanal)
            isEnable = true
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `☑️ *MODO ADMIN* ya estaba *DESACTIVADO* en este grupo.`, m, rcanal)
            isEnable = false
        }
        chat.modoadmin = isEnable
        break
    case 'detect': case 'alertas':
        nombreComando = 'DETECT'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `☑️ *DETECT* ya estaba *ACTIVADO* en este grupo.`, m, rcanal)
            isEnable = true
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `☑️ *DETECT* ya estaba *DESACTIVADO* en este grupo.`, m, rcanal)
            isEnable = false
        }
        chat.detect = isEnable
        break
    case 'antilink': case 'antienlace':
        nombreComando = 'ANTI LINK'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `☑️ *ANTI LINK* ya estaba *ACTIVADO* en este grupo.`, m, rcanal)
            isEnable = true
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `☑️ *ANTI LINK* ya estaba *DESACTIVADO* en este grupo.`, m, rcanal)
            isEnable = false
        }
        chat.antiLink = isEnable
        break
    case 'nsfw': case 'modohorny':
        nombreComando = 'NSFW'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `☑️ *NSFW* ya estaba *ACTIVADO* en este grupo.`, m, rcanal)
            isEnable = true
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `☑️ *NSFW* ya estaba *DESACTIVADO* en este grupo.`, m, rcanal)
            isEnable = false
        }
        chat.nsfw = isEnable
        break
    case 'economy': case 'economia':
        nombreComando = 'ECONOMY'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `☑️ *ECONOMY* ya estaba *ACTIVADO* en este grupo.`, m, rcanal)
            isEnable = true
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `☑️ *ECONOMY* ya estaba *DESACTIVADO* en este grupo.`, m, rcanal)
            isEnable = false
        }
        chat.economy = isEnable
        break
    case 'rpg': case 'gacha':
        nombreComando = 'RPG'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `☑️ *RPG* ya estaba *ACTIVADO* en este grupo.`, m, rcanal)
            isEnable = true
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `☑️ *RPG* ya estaba *DESACTIVADO* en este grupo.`, m, rcanal)
            isEnable = false
        }
        chat.gacha = isEnable
        break
    default:
        return conn.reply(m.chat, `☑️ Comando *${comandoReal}* no reconocido.`, m, rcanal)
}

chat[comandoReal] = isEnable
conn.reply(m.chat, `✅ *${nombreComando}* ha sido *${isEnable ? 'ACTIVADO' : 'DESACTIVADO'}* para ESTE grupo.`, m, rcanal)
}

handler.help = ['on', 'off']
handler.tags = ['nable']
handler.command = ['on', 'off']

export default handler
