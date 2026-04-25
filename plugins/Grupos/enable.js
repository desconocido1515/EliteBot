const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin }) => {
const primaryBot = global.db.data.chats[m.chat].primaryBot
if (primaryBot && conn.user.jid !== primaryBot) throw !1
const chat = global.db.data.chats[m.chat]
const settings = global.db.data.settings[conn.user.jid] || {}

const accion = command.toLowerCase()
const comandoReal = args[0]?.toLowerCase()

// Si no hay comandoReal, mostrar panel
if (!comandoReal) {
    const estadoJadibot = settings.jadibotmd ? '𝘼𝘾𝙏𝙄𝙑𝘼𝘿𝙊' : '𝘿𝙀𝙎𝘼𝘾𝙏𝙄𝙑𝘼𝘿𝙊'
    const estadoWelcome = chat.welcome ? '𝘼𝘾𝙏𝙄𝙑𝘼𝘿𝙊' : '𝘿𝙀𝙎𝘼𝘾𝙏𝙄𝙑𝘼𝘿𝙊'
    const estadoNsfw = chat.nsfw ? '𝘼𝘾𝙏𝙄𝙑𝘼𝘿𝙊' : '𝘿𝙀𝙎𝘼𝘾𝙏𝙄𝙑𝘼𝘿𝙊'
    const estadoEconomy = chat.economy ? '𝘼𝘾𝙏𝙄𝙑𝘼𝘿𝙊' : '𝘿𝙀𝙎𝘼𝘾𝙏𝙄𝙑𝘼𝘿𝙊'
    const estadoRpg = chat.gacha ? '𝘼𝘾𝙏𝙄𝙑𝘼𝘿𝙊' : '𝘿𝙀𝙎𝘼𝘾𝙏𝙄𝙑𝘼𝘿𝙊'
    const estadoDetect = chat.detect ? '𝘼𝘾𝙏𝙄𝙑𝘼𝘿𝙊' : '𝘿𝙀𝙎𝘼𝘾𝙏𝙄𝙑𝘼𝘿𝙊'
    const estadoAntiLink = chat.antiLink ? '𝘼𝘾𝙏𝙄𝙑𝘼𝘿𝙊' : '𝘿𝙀𝙎𝘼𝘾𝙏𝙄𝙑𝘼𝘿𝙊'
    const estadoModoAdmin = chat.modoadmin ? '𝘼𝘾𝙏𝙄𝙑𝘼𝘿𝙊' : '𝘿𝙀𝙎𝘼𝘾𝙏𝙄𝙑𝘼𝘿𝙊'
    
    return conn.reply(m.chat, `╭━━━〔 ⚙️ ᴘᴀɴᴇʟ ᴅᴇ ᴄᴏɴᴛʀᴏʟ 〕━━⬣
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
    let estadoTexto = isEnable ? 'ACTIVADO' : 'DESACTIVADO'
    
    if (accion === 'on') {
        if (isEnable) return conn.reply(m.chat, `☑️ *JADIBOT* ya estaba *ACTIVADO* globalmente.`, m, rcanal)
        isEnable = true
        estadoTexto = 'ACTIVADO'
    } else if (accion === 'off') {
        if (!isEnable) return conn.reply(m.chat, `☑️ *JADIBOT* ya estaba *DESACTIVADO* globalmente.`, m, rcanal)
        isEnable = false
        estadoTexto = 'DESACTIVADO'
    } else {
        return conn.reply(m.chat, `☑️ Acción no válida. Usa *${usedPrefix}on* o *${usedPrefix}off*.`, m, rcanal)
    }
    
    settings.jadibotmd = isEnable
    
    return conn.reply(m.chat, `
❱❱ 𝙀𝙇𝙄𝙏𝙀 𝘽𝙊𝙏 𝙂𝙇𝙊𝘽𝘼𝙇 ❰❰

⚙️ 𝙁𝙐𝙉𝘾𝙄𝙊́𝙉 *|* jadibot
⚙️ 𝙀𝙎𝙏𝘼𝘿𝙊 *|* ${estadoTexto}
⚙️ 𝙀𝙉 𝙀𝙎𝙏𝙀 *|* 𝘽𝙊𝙏
`, m, rcanal)
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
let estadoTexto = isEnable ? 'ACTIVADO' : 'DESACTIVADO'

switch (comandoReal) {
    case 'welcome': case 'bienvenida':
        nombreComando = 'welcome'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `☑️ *WELCOME* ya estaba *ACTIVADO* en este grupo.`, m, rcanal)
            isEnable = true
            estadoTexto = 'ACTIVADO'
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `☑️ *WELCOME* ya estaba *DESACTIVADO* en este grupo.`, m, rcanal)
            isEnable = false
            estadoTexto = 'DESACTIVADO'
        }
        chat.welcome = isEnable
        break
    case 'modoadmin': case 'onlyadmin':
        nombreComando = 'modoadmin'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `☑️ *MODO ADMIN* ya estaba *ACTIVADO* en este grupo.`, m, rcanal)
            isEnable = true
            estadoTexto = 'ACTIVADO'
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `☑️ *MODO ADMIN* ya estaba *DESACTIVADO* en este grupo.`, m, rcanal)
            isEnable = false
            estadoTexto = 'DESACTIVADO'
        }
        chat.modoadmin = isEnable
        break
    case 'detect': case 'alertas':
        nombreComando = 'detect'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `☑️ *DETECT* ya estaba *ACTIVADO* en este grupo.`, m, rcanal)
            isEnable = true
            estadoTexto = 'ACTIVADO'
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `☑️ *DETECT* ya estaba *DESACTIVADO* en este grupo.`, m, rcanal)
            isEnable = false
            estadoTexto = 'DESACTIVADO'
        }
        chat.detect = isEnable
        break
    case 'antilink': case 'antienlace':
        nombreComando = 'antilink'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `☑️ *ANTI LINK* ya estaba *ACTIVADO* en este grupo.`, m, rcanal)
            isEnable = true
            estadoTexto = 'ACTIVADO'
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `☑️ *ANTI LINK* ya estaba *DESACTIVADO* en este grupo.`, m, rcanal)
            isEnable = false
            estadoTexto = 'DESACTIVADO'
        }
        chat.antiLink = isEnable
        break
    case 'nsfw': case 'modohorny':
        nombreComando = 'nsfw'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `☑️ *NSFW* ya estaba *ACTIVADO* en este grupo.`, m, rcanal)
            isEnable = true
            estadoTexto = 'ACTIVADO'
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `☑️ *NSFW* ya estaba *DESACTIVADO* en este grupo.`, m, rcanal)
            isEnable = false
            estadoTexto = 'DESACTIVADO'
        }
        chat.nsfw = isEnable
        break
    case 'economy': case 'economia':
        nombreComando = 'economy'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `☑️ *ECONOMY* ya estaba *ACTIVADO* en este grupo.`, m, rcanal)
            isEnable = true
            estadoTexto = 'ACTIVADO'
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `☑️ *ECONOMY* ya estaba *DESACTIVADO* en este grupo.`, m, rcanal)
            isEnable = false
            estadoTexto = 'DESACTIVADO'
        }
        chat.economy = isEnable
        break
    case 'rpg': case 'gacha':
        nombreComando = 'rpg'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `☑️ *RPG* ya estaba *ACTIVADO* en este grupo.`, m, rcanal)
            isEnable = true
            estadoTexto = 'ACTIVADO'
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `☑️ *RPG* ya estaba *DESACTIVADO* en este grupo.`, m, rcanal)
            isEnable = false
            estadoTexto = 'DESACTIVADO'
        }
        chat.gacha = isEnable
        break
    default:
        return conn.reply(m.chat, `☑️ Comando *${comandoReal}* no reconocido.`, m, rcanal)
}

chat[comandoReal] = isEnable

return conn.reply(m.chat, `
❱❱ 𝙀𝙇𝙄𝙏𝙀 𝘽𝙊𝙏 𝙂𝙇𝙊𝘽𝘼𝙇 ❰❰

⚙️ 𝙁𝙐𝙉𝘾𝙄𝙊́𝙉 *|* ${nombreComando}
⚙️ 𝙀𝙎𝙏𝘼𝘿𝙊 *|* ${estadoTexto}
⚙️ 𝙀𝙉 𝙀𝙎𝙏𝙀 *|* 𝙂𝙍𝙐𝙋𝙊
`, m, rcanal)
}

handler.help = ['on', 'off']
handler.tags = ['nable']
handler.command = ['on', 'off']

export default handler
