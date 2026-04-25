const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin }) => {
const primaryBot = global.db.data.chats[m.chat].primaryBot
if (primaryBot && conn.user.jid !== primaryBot) throw !1
const chat = global.db.data.chats[m.chat]

// El comando puede ser 'on' o 'off'
const accion = command.toLowerCase() // 'on' o 'off'
const comandoReal = args[0]?.toLowerCase() // 'welcome', 'nsfw', etc.

// Si no hay comandoReal, mostrar panel
if (!comandoReal) {
    return conn.reply(m.chat, `╭━━━〔 ⚙️ ᴘᴀɴᴇʟ ᴅᴇ ᴄᴏɴᴛʀᴏʟ 〕━━⬣  
┃ ❣ *Un administrador puede gestionar el comando:*  
┃ ╰➤ *${usedPrefix}${accion} [comando]*  
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
╰━━━━━━━━━━━━━━━━━━━━━━⬣`, m, rcanal)
}

let isEnable = chat[comandoReal] !== undefined ? chat[comandoReal] : false

// Validar permisos según el comando
const permitir = (() => {
    switch (comandoReal) {
        case 'jadibot': case 'serbot':
            return isOwner
        default:
            return (m.isGroup && (isAdmin || isOwner))
    }
})()

if (!permitir) {
    return conn.reply(m.chat, `☑️ *ACCESO DENEGADO*\n\nNo tienes permisos para ${accion} *${comandoReal}*.`, m, rcanal)
}

// Ejecutar acción
if (accion === 'on') {
    if (isEnable) return conn.reply(m.chat, `☑️ *${comandoReal}* ya estaba *activado*.`, m, rcanal)
    isEnable = true
} else if (accion === 'off') {
    if (!isEnable) return conn.reply(m.chat, `☑️ *${comandoReal}* ya estaba *desactivado*.`, m, rcanal)
    isEnable = false
} else {
    return conn.reply(m.chat, `☑️ Acción no válida. Usa *${usedPrefix}on* o *${usedPrefix}off*.`, m, rcanal)
}

// Guardar cambio
chat[comandoReal] = isEnable
conn.reply(m.chat, `✅ Has *${isEnable ? 'activado' : 'desactivado'}* *${comandoReal}* para este grupo.`, m, rcanal)
}

handler.help = ['on', 'off']
handler.tags = ['nable']
handler.command = ['on', 'off']

export default handler
