import { createHash } from 'crypto'
import fetch from 'node-fetch'
import { FormData, Blob } from "formdata-node"
import { fileTypeFromBuffer } from "file-type"
import crypto from "crypto"

const handler = async (m, { conn, command, usedPrefix }) => {
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''

if (!mime) return conn.reply(m.chat, `☑️ 𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙴 𝙰 𝚄𝙽𝙰 𝙸𝙼𝙰𝙶𝙴𝙽`, m, rcanal)

await m.react('🕒')
const media = await q.download()

// Subir a ImgBB (enlace directo)
const formData = new FormData()
formData.append("image", Buffer.from(media).toString("base64"))
formData.append("key", "6d207e02198a847aa98d0a2a901485a5") // API key de ImgBB

const res = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: formData
})
const json = await res.json()

if (!json.success) throw new Error("Error al subir imagen")

const linkDirecto = json.data.url // Enlace directo .jpg

const txt = `☑️ *𝙴𝙽𝙻𝙰𝙲𝙴 𝙳𝙸𝚁𝙴𝙲𝚃𝙾*\n\n📷 *𝙻𝚒𝚗𝚔:* ${linkDirecto}\n📦 *𝚃𝚊𝚖𝚊ñ𝚘:* ${formatBytes(media.length)}`

await conn.sendMessage(m.chat, { image: { url: linkDirecto }, caption: txt })
await m.react('✔️')

} catch (error) {
await m.react('✖️')
await conn.reply(m.chat, `☑️ 𝙴𝚁𝚁𝙾𝚁: ${error.message}`, m, rcanal)
}}

handler.command = ['imgbb', 'directo']
export default handler

function formatBytes(bytes) {
if (bytes === 0) return '0 B'
const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
const i = Math.floor(Math.log(bytes) / Math.log(1024))
return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}
