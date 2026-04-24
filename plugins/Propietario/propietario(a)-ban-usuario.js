const handler = async (m, { conn, text, usedPrefix, command, args, isROwner }) => {
if (!isROwner) return
const bot = conn.user.jid.split('@')[0]
const users = global.db.data.users
const chats = global.db.data.chats
function no(number) { return number.replace(/\s/g, '').replace(/([@+-])/g, '') }
try {
let mentionedJid = await m.mentionedJid
let who = mentionedJid[0] ? mentionedJid[0] : m.quoted ? await m.quoted.sender : text ? no(text.split(' ')[0]) + '@s.whatsapp.net' : false
switch (command) {
case 'banuser': {
if (!who) return conn.reply(m.chat, '☑️ Por favor, etiqueta, cita o escribe el número del usuario que quieres banear del Bot.', m, rcanal)
var reason = 'Sin Especificar'
if (mentionedJid && mentionedJid[0]) {
var mentionIdx = args.findIndex(arg => arg.startsWith('@'))
var reasonArgs = args.slice(mentionIdx + 1).join(' ')
if (reasonArgs.trim()) reason = reasonArgs.trim()
} else if (m.quoted) {
if (args.length) reason = args.join(' ')
} else if (text) {
var parts = text.trim().split(' ')
if (parts.length > 1) reason = parts.slice(1).join(' ')
}
if (who === conn.user.jid) return conn.reply(m.chat, `☑️ @${bot} No puede ser baneado.`, m, { mentions: [who] }, rcanal)
if (global.owner.some(function (x) { return who === x[0] + '@s.whatsapp.net' })) {
return conn.reply(m.chat, `☑️ No puedo banear al propietario @${who.split('@')[0]} de *@${bot}*.`, m, { mentions: [who, bot] }, rcanal)
}
if (!users[who]) users[who] = {}
if (users[who].banned) return conn.reply(m.chat, `☑️ @${who.split('@')[0]} ya está baneado.`, m, { mentions: [who] }, rcanal)
await m.react('🕒')
users[who].banned = true
users[who].bannedReason = reason
var nameBan = await conn.getName(who)
await m.react('✔️')
await conn.reply(m.chat, `☑️ ${nameBan} ha sido baneado.\n> Razón: ${reason}`, m, { mentions: [who] }, rcanal)
await conn.reply(`${suittag}@s.whatsapp.net`, `☑️ ${nameBan} fue baneado por ${await conn.getName(m.sender)}\n> Razón: ${reason}`, m, rcanal)
break
}
case 'unbanuser': {
if (!who) return conn.reply(m.chat, '☑️ Por favor, etiqueta o coloca el número del usuario que quieres desbanear del Bot.', m, rcanal)
if (!users[who]) return conn.reply(m.chat, '☑️ El usuario no está registrado.', m, rcanal)
if (!users[who].banned) return conn.reply(m.chat, `☑️ @${who.split('@')[0]} no está baneado.`, m, { mentions: [who] }, rcanal)
await m.react('🕒')
users[who].banned = false
users[who].bannedReason = ''
await m.react('✔️')
let nameUnban = await conn.getName(who)
await conn.reply(m.chat, `☑️ ${nameUnban} ha sido desbaneado.`, m, { mentions: [who] }, rcanal)
await conn.reply(`${suittag}@s.whatsapp.net`, `☑️ ${nameUnban} fue desbaneado por ${await conn.getName(m.sender)}.`, m, rcanal)
break
}
case 'bloquear': {
if (!who) return conn.reply(m.chat, '☑️ Por favor, menciona al usuario que quieres bloquear del número de la Bot.', m, rcanal)
await m.react('🕒')
await conn.updateBlockStatus(who, 'block')
await m.react('✔️')
conn.reply(m.chat, `☑️ Bloqueado correctamente a @${who.split('@')[0]}`, m, { mentions: [who] }, rcanal)
break
}
case 'desbloquear': {
if (!who) return conn.reply(m.chat, '☑️ Por favor, menciona al usuario que quieres desbloquear del número de la Bot.', m, rcanal)
await m.react('🕒')
await conn.updateBlockStatus(who, 'unblock')
await m.react('✔️')
conn.reply(m.chat, `☑️ Desbloqueado correctamente a @${who.split('@')[0]}`, m, { mentions: [who] }, rcanal)
break
}
case 'listbanuser': {
await m.react('🕒')
const bannedUsers = Object.entries(users).filter(([_, data]) => data.banned)
const bannedChats = Object.entries(chats).filter(([_, data]) => data.isBanned)
const usersList = bannedUsers.map(([jid]) => {
const num = jid.split('@')[0]
return `▢ @${num}`
})
const chatsList = bannedChats.map(([jid]) => {
return `▢ ${jid}`
})
const bannedText = `☑️ *USUARIOS BANEADOS* • Total: ${bannedUsers.length}\n${usersList.join('\n')}\n\n☑️ *CHATS BANEADOS* • Total: ${bannedChats.length}\n${chatsList.join('\n')}`.trim()
const mentions = [...bannedUsers.map(([jid]) => jid), ...bannedChats.map(([jid]) => jid)]
await m.react('✔️')
conn.reply(m.chat, bannedText, m, { mentions }, rcanal)
break
}
}
} catch (e) {
await m.react('✖️')
return conn.reply(m.chat, `☑️ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message || e}`, m, rcanal)
}}

handler.help = ['banuser', 'unbanuser', 'bloquear', 'desbloquear', 'listbanuser']
handler.tags = ['owner']

// ✅ Con o sin punto
handler.customPrefix = /^\.?(banuser|unbanuser|bloquear|desbloquear|listbanuser)(\s|$)/i
handler.command = new RegExp
handler.rowner = true

export default handler
