import uploadImage from '../lib/uploadImage.js'

const handler = async (m, { conn, command, usedPrefix }) => {
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''

if (!mime) return conn.reply(m.chat, `☑️ 𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙴 𝙰 𝚄𝙽𝙰 𝙸𝙼𝙰𝙶𝙴𝙽`, m, rcanal)

await m.react('🕒')
const media = await q.download()

// Usar Telegra.ph (enlace directo)
const link = await uploadImage(media)

// Limpiar el enlace para que sea directo
let linkDirecto = link.split('?')[0]
if (!linkDirecto.match(/\.(jpg|jpeg|png|gif)$/i)) {
    linkDirecto = linkDirecto + '.jpg'
}

const txt = `☑️ *𝙴𝙽𝙻𝙰𝙲𝙴 𝙳𝙸𝚁𝙴𝙲𝚃𝙾*\n\n📷 *𝙻𝚒𝚗𝚔:* ${linkDirecto}\n📦 *𝚃𝚊𝚖𝚊ñ𝚘:* ${formatBytes(media.length)}`

// Enviar la imagen directamente desde el enlace
await conn.sendMessage(m.chat, { 
    image: { url: linkDirecto }, 
    caption: txt 
})

await m.react('✔️')

} catch (error) {
await m.react('✖️')
await conn.reply(m.chat, `☑️ 𝙴𝚁𝚁𝙾𝚁: ${error.message}`, m, rcanal)
}}

handler.command = ['directo', 'enlace', 'imgdirecto']
export default handler

function formatBytes(bytes) {
if (bytes === 0) return '0 B'
const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
const i = Math.floor(Math.log(bytes) / Math.log(1024))
return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}
