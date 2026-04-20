import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

var handler = async (m, { conn, text, participants }) => {

const groupMetadata = await conn.groupMetadata(m.chat)
const groupName = groupMetadata.subject || 'Grupo'
let users = participants.map(u => conn.decodeJid(u.id))

// 🔊 Reacción al mensaje
await conn.sendMessage(m.chat, {
react: {
text: '🗣️',
key: m.key
}
})

// 📥 Capturar texto
let userText = ""

if (text && text.length > 0) {
userText = text
} else if (m.quoted) {
userText = m.quoted.text || m.quoted.caption || ""
if (!userText) userText = "✅ Mensaje"
}

if (!userText) {
return conn.reply(m.chat, '❀ Usa: .notify texto\nO responde a un mensaje con .notify', m)
}

// 🧾 Formato final (nombre abajo)
let finalText = `${userText}\nㅤㅤㅤㅤㅤㅤㅤㅤ${groupName}`

// 📦 Detectar mensaje citado o actual
let quoted = m.quoted || m
let mime = (quoted.msg || quoted).mimetype || ''
let mtype = quoted.mtype || ''

let media = await quoted.download?.()

// 📸 Imagen
if (mtype === 'imageMessage' && media) {
return conn.sendMessage(m.chat, {
image: media,
caption: finalText,
mentions: users
}, { quoted: null })
}

// 🎥 Video
if (mtype === 'videoMessage' && media) {
return conn.sendMessage(m.chat, {
video: media,
caption: finalText,
mentions: users
}, { quoted: null })
}

// 🎤 Audio
if (mtype === 'audioMessage' && media) {
return conn.sendMessage(m.chat, {
audio: media,
mimetype: mime || 'audio/mpeg',
ptt: true,
mentions: users
}, { quoted: null })
}

// 📄 Documento
if (mtype === 'documentMessage' && media) {
return conn.sendMessage(m.chat, {
document: media,
mimetype: mime,
fileName: quoted.fileName || 'archivo',
caption: finalText,
mentions: users
}, { quoted: null })
}

// 🧩 Sticker
if (mtype === 'stickerMessage' && media) {
return conn.sendMessage(m.chat, {
sticker: media,
mentions: users
}, { quoted: null })
}

// 📝 Texto (fallback)
try {
let msg = generateWAMessageFromContent(m.chat, {
extendedTextMessage: {
text: finalText,
contextInfo: { mentionedJid: users }
}
}, { quoted: null })

await conn.relayMessage(m.chat, msg.message, { messageId: msg.key?.id })

} catch {
let more = String.fromCharCode(8206)
let masss = more.repeat(850)

await conn.relayMessage(m.chat, {
extendedTextMessage: {
text: `${masss}\n${finalText}\n`,
contextInfo: { mentionedJid: users }
}
})
}
}

// ✅ Comandos múltiples
handler.command = ['notify', 'n', 'avisos', 'aviso', 'notificar']

// 🔒 Restricciones
handler.group = true
handler.admin = true

export default handler
