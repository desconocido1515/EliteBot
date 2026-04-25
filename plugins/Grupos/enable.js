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
    
    return conn.reply(m.chat, `╭━━━ 𝙎𝙄𝙎𝙏𝙀𝙈𝘼 𝙀𝙇𝙄𝙏𝙀 ━━⬣
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
        return conn.reply(m.chat, `¡𝘏𝘰𝘭𝘢 𝘏𝘶𝘮𝘢𝘯𝘰! ✨
» 𝘛𝘦 𝘪𝘯𝘧𝘰𝘳𝘮𝘰 𝘲𝘶𝘦 𝘦𝘴𝘵𝘦 𝘤𝘰𝘮𝘢𝘯𝘥𝘰 𝘴𝘰𝘭𝘰 𝘱𝘶𝘦𝘥𝘦 𝘶𝘵𝘪𝘭𝘪𝘻𝘢𝘳 𝘮𝘪 𝘤𝘳𝘦𝘢𝘥𝘰𝘳 𝘒𝘦𝘷𝘪𝘯.`, m, rcanal)
    }
    
    let isEnable = settings.jadibotmd !== undefined ? settings.jadibotmd : true
    let estadoTexto = isEnable ? 'ACTIVADO' : 'DESACTIVADO'
    
    if (accion === 'on') {
        if (isEnable) return conn.reply(m.chat, `¡𝘏𝘰𝘭𝘢 𝘏𝘶𝘮𝘢𝘯𝘰! ✨
» 𝘑𝘈𝘋𝘐𝘉𝘖𝘛 𝘺𝘢 𝘦𝘴𝘵𝘢𝘣𝘢 *𝘈𝘊𝘛𝘐𝘝𝘈𝘋𝘖* 𝘨𝘭𝘰𝘣𝘢𝘭𝘮𝘦𝘯𝘵𝘦.`, m, rcanal)
        isEnable = true
        estadoTexto = 'ACTIVADO'
    } else if (accion === 'off') {
        if (!isEnable) return conn.reply(m.chat, `¡𝘏𝘰𝘭𝘢 𝘏𝘶𝘮𝘢𝘯𝘰! ✨
» 𝘑𝘈𝘋𝘐𝘉𝘖𝘛 𝘺𝘢 𝘦𝘴𝘵𝘢𝘣𝘢 *𝘋𝘌𝘚𝘈𝘊𝘛𝘐𝘝𝘈𝘋𝘖* 𝘨𝘭𝘰𝘣𝘢𝘭𝘮𝘦𝘯𝘵𝘦.`, m, rcanal)
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
    return conn.reply(m.chat, `¡𝘏𝘰𝘭𝘢 𝘏𝘶𝘮𝘢𝘯𝘰! ✨
» 𝘛𝘦 𝘪𝘯𝘧𝘰𝘳𝘮𝘰 𝘲𝘶𝘦 𝘦𝘴𝘵𝘦 𝘤𝘰𝘮𝘢𝘯𝘥𝘰 𝘴𝘰𝘭𝘰 𝘱𝘶𝘦𝘥𝘦 𝘶𝘴𝘢𝘳𝘴𝘦 𝘦𝘯 𝘨𝘳𝘶𝘱𝘰𝘴.`, m, rcanal)
}

if (!isAdmin && !isOwner) {
    return conn.reply(m.chat, `¡𝘏𝘰𝘭𝘢 𝘏𝘶𝘮𝘢𝘯𝘰! ✨
» 𝘛𝘦 𝘪𝘯𝘧𝘰𝘳𝘮𝘰 𝘲𝘶𝘦 𝘦𝘴𝘵𝘦 𝘤𝘰𝘮𝘢𝘯𝘥𝘰 𝘴𝘰𝘭𝘰 𝘱𝘶𝘦𝘥𝘦𝘯 𝘶𝘴𝘢𝘳 𝘭𝘰𝘴 𝘢𝘥𝘮𝘪𝘯𝘪𝘴𝘵𝘳𝘢𝘥𝘰𝘳𝘦𝘴 𝘥𝘦 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰.`, m, rcanal)
}

let isEnable = chat[comandoReal] !== undefined ? chat[comandoReal] : false
let nombreComando = ''
let estadoTexto = isEnable ? 'ACTIVADO' : 'DESACTIVADO'

switch (comandoReal) {
    case 'welcome': case 'bienvenida':
        nombreComando = 'welcome'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `¡𝘏𝘰𝘭𝘢 𝘏𝘶𝘮𝘢𝘯𝘰! ✨
» 𝘞𝘌𝘓𝘊𝘖𝘔𝘌 𝘺𝘢 𝘦𝘴𝘵𝘢𝘣𝘢 *𝘈𝘊𝘛𝘐𝘝𝘈𝘋𝘖* 𝘦𝘯 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰.`, m, rcanal)
            isEnable = true
            estadoTexto = 'ACTIVADO'
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `¡𝘏𝘰𝘭𝘢 𝘏𝘶𝘮𝘢𝘯𝘰! ✨
» 𝘞𝘌𝘓𝘊𝘖𝘔𝘌 𝘺𝘢 𝘦𝘴𝘵𝘢𝘣𝘢 *𝘋𝘌𝘚𝘈𝘊𝘛𝘐𝘝𝘈𝘋𝘖* 𝘦𝘯 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰.`, m, rcanal)
            isEnable = false
            estadoTexto = 'DESACTIVADO'
        }
        chat.welcome = isEnable
        break
    case 'modoadmin': case 'onlyadmin':
        nombreComando = 'modoadmin'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `¡𝘏𝘰𝘭𝘢 𝘏𝘶𝘮𝘢𝘯𝘰! ✨
» 𝘔𝘖𝘋𝘖 𝘈𝘋𝘔𝘐𝘕 𝘺𝘢 𝘦𝘴𝘵𝘢𝘣𝘢 *𝘈𝘊𝘛𝘐𝘝𝘈𝘋𝘖* 𝘦𝘯 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰.`, m, rcanal)
            isEnable = true
            estadoTexto = 'ACTIVADO'
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `¡𝘏𝘰𝘭𝘢 𝘏𝘶𝘮𝘢𝘯𝘰! ✨
» 𝘔𝘖𝘋𝘖 𝘈𝘋𝘔𝘐𝘕 𝘺𝘢 𝘦𝘴𝘵𝘢𝘣𝘢 *𝘋𝘌𝘚𝘈𝘊𝘛𝘐𝘝𝘈𝘋𝘖* 𝘦𝘯 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰.`, m, rcanal)
            isEnable = false
            estadoTexto = 'DESACTIVADO'
        }
        chat.modoadmin = isEnable
        break
    case 'detect': case 'alertas':
        nombreComando = 'detect'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `¡𝘏𝘰𝘭𝘢 𝘏𝘶𝘮𝘢𝘯𝘰! ✨
» 𝘋𝘌𝘛𝘌𝘊𝘛 𝘺𝘢 𝘦𝘴𝘵𝘢𝘣𝘢 *𝘈𝘊𝘛𝘐𝘝𝘈𝘋𝘖* 𝘦𝘯 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰.`, m, rcanal)
            isEnable = true
            estadoTexto = 'ACTIVADO'
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `¡𝘏𝘰𝘭𝘢 𝘏𝘶𝘮𝘢𝘯𝘰! ✨
» 𝘋𝘌𝘛𝘌𝘊𝘛 𝘺𝘢 𝘦𝘴𝘵𝘢𝘣𝘢 *𝘋𝘌𝘚𝘈𝘊𝘛𝘐𝘝𝘈𝘋𝘖* 𝘦𝘯 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰.`, m, rcanal)
            isEnable = false
            estadoTexto = 'DESACTIVADO'
        }
        chat.detect = isEnable
        break
    case 'antilink': case 'antienlace':
        nombreComando = 'antilink'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `¡𝘏𝘰𝘭𝘢 𝘏𝘶𝘮𝘢𝘯𝘰! ✨
» 𝘈𝘕𝘛𝘐 𝘓𝘐𝘕𝘒 𝘺𝘢 𝘦𝘴𝘵𝘢𝘣𝘢 *𝘈𝘊𝘛𝘐𝘝𝘈𝘋𝘖* 𝘦𝘯 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰.`, m, rcanal)
            isEnable = true
            estadoTexto = 'ACTIVADO'
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `¡𝘏𝘰𝘭𝘢 𝘏𝘶𝘮𝘢𝘯𝘰! ✨
» 𝘈𝘕𝘛𝘐 𝘓𝘐𝘕𝘒 𝘺𝘢 𝘦𝘴𝘵𝘢𝘣𝘢 *𝘋𝘌𝘚𝘈𝘊𝘛𝘐𝘝𝘈𝘋𝘖* 𝘦𝘯 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰.`, m, rcanal)
            isEnable = false
            estadoTexto = 'DESACTIVADO'
        }
        chat.antiLink = isEnable
        break
    case 'nsfw': case 'modohorny':
        nombreComando = 'nsfw'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `¡𝘏𝘰𝘭𝘢 𝘏𝘶𝘮𝘢𝘯𝘰! ✨
» 𝘕𝘚𝘍𝘞 𝘺𝘢 𝘦𝘴𝘵𝘢𝘣𝘢 *𝘈𝘊𝘛𝘐𝘝𝘈𝘋𝘖* 𝘦𝘯 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰.`, m, rcanal)
            isEnable = true
            estadoTexto = 'ACTIVADO'
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `¡𝘏𝘰𝘭𝘢 𝘏𝘶𝘮𝘢𝘯𝘰! ✨
» 𝘕𝘚𝘍𝘞 𝘺𝘢 𝘦𝘴𝘵𝘢𝘣𝘢 *𝘋𝘌𝘚𝘈𝘊𝘛𝘐𝘝𝘈𝘋𝘖* 𝘦𝘯 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰.`, m, rcanal)
            isEnable = false
            estadoTexto = 'DESACTIVADO'
        }
        chat.nsfw = isEnable
        break
    case 'economy': case 'economia':
        nombreComando = 'economy'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `¡𝘏𝘰𝘭𝘢 𝘏𝘶𝘮𝘢𝘯𝘰! ✨
» 𝘌𝘊𝘖𝘕𝘖𝘔𝘠 𝘺𝘢 𝘦𝘴𝘵𝘢𝘣𝘢 *𝘈𝘊𝘛𝘐𝘝𝘈𝘋𝘖* 𝘦𝘯 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰.`, m, rcanal)
            isEnable = true
            estadoTexto = 'ACTIVADO'
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `¡𝘏𝘰𝘭𝘢 𝘏𝘶𝘮𝘢𝘯𝘰! ✨
» 𝘌𝘊𝘖𝘕𝘖𝘔𝘠 𝘺𝘢 𝘦𝘴𝘵𝘢𝘣𝘢 *𝘋𝘌𝘚𝘈𝘊𝘛𝘐𝘝𝘈𝘋𝘖* 𝘦𝘯 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰.`, m, rcanal)
            isEnable = false
            estadoTexto = 'DESACTIVADO'
        }
        chat.economy = isEnable
        break
    case 'rpg': case 'gacha':
        nombreComando = 'rpg'
        if (accion === 'on') {
            if (isEnable) return conn.reply(m.chat, `¡𝘏𝘰𝘭𝘢 𝘏𝘶𝘮𝘢𝘯𝘰! ✨
» 𝘙𝘗𝘎 𝘺𝘢 𝘦𝘴𝘵𝘢𝘣𝘢 *𝘈𝘊𝘛𝘐𝘝𝘈𝘋𝘖* 𝘦𝘯 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰.`, m, rcanal)
            isEnable = true
            estadoTexto = 'ACTIVADO'
        } else if (accion === 'off') {
            if (!isEnable) return conn.reply(m.chat, `¡𝘏𝘰𝘭𝘢 𝘏𝘶𝘮𝘢𝘯𝘰! ✨
» 𝘙𝘗𝘎 𝘺𝘢 𝘦𝘴𝘵𝘢𝘣𝘢 *𝘋𝘌𝘚𝘈𝘊𝘛𝘐𝘝𝘈𝘋𝘖* 𝘦𝘯 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰.`, m, rcanal)
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
