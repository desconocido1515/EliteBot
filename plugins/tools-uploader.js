import { createHash } from 'crypto'
import fetch from 'node-fetch'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { FormData, Blob } from "formdata-node"
import { fileTypeFromBuffer } from "file-type"
import crypto from "crypto"

const handler = async (m, { conn, command, usedPrefix, text }) => {
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
switch (command) {
case 'tourl': {
if (!mime) return conn.reply(m.chat, `☑️ 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁, 𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙴 𝙰 𝚄𝙽𝙰 𝙸𝙼𝙰𝙶𝙴𝙽 𝙾 𝚅𝙸𝙳𝙴𝙾`, m, rcanal)
await m.react('🕒')
const media = await q.download()
const isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
const link = await uploadImage(media)
// Limpiar el enlace y asegurar formato .jpg directo
let linkDirecto = link.split('?')[0]
if (!linkDirecto.match(/\.(jpg|jpeg|png|gif|mp4)$/i)) {
linkDirecto = linkDirecto + '.jpg'
}
const txt = `☑️ *𝙻𝙸𝙽𝙺 - 𝙴𝙽𝙻𝙰𝙲𝙴*\n\n» *𝙴𝚗𝚕𝚊𝚌𝚎 𝚍𝚒𝚛𝚎𝚌𝚝𝚘:* ${linkDirecto}\n» *𝚃𝚊𝚖𝚊ñ𝚘:* ${formatBytes(media.length)}\n» *𝙴𝚡𝚙𝚒𝚛𝚊𝚌𝚒ó𝚗:* ${isTele ? '𝙽𝚘 𝚎𝚡𝚙𝚒𝚛𝚊' : '𝙳𝚎𝚜𝚌𝚘𝚗𝚘𝚌𝚒𝚍𝚘'}`
await conn.sendMessage(m.chat, { image: { url: linkDirecto }, caption: txt })
await m.react('✔️')
break
}
case 'catbox': {
if (!mime) return conn.reply(m.chat, `☑️ 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁, 𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙴 𝙰 𝚄𝙽𝙰 𝙸𝙼𝙰𝙶𝙴𝙽 𝙾 𝚅𝙸𝙳𝙴𝙾`, m, rcanal)
await m.react('🕒')
const media = await q.download()
const isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
const link = await catbox(media)
let linkDirecto = link.split('?')[0]
if (!linkDirecto.match(/\.(jpg|jpeg|png|gif|mp4)$/i)) {
linkDirecto = linkDirecto + '.jpg'
}
const txt = `☑️ *𝙲𝙰𝚃𝙱𝙾𝚇 - 𝚄𝙿𝙻𝙾𝙰𝙳𝙴𝚁*\n\n» *𝙴𝚗𝚕𝚊𝚌𝚎:* ${linkDirecto}\n» *𝚃𝚊𝚖𝚊ñ𝚘:* ${formatBytes(media.length)}\n» *𝙴𝚡𝚙𝚒𝚛𝚊𝚌𝚒ó𝚗:* ${isTele ? '𝙽𝚘 𝚎𝚡𝚙𝚒𝚛𝚊' : '𝙳𝚎𝚜𝚌𝚘𝚗𝚘𝚌𝚒𝚍𝚘'}`
await conn.sendMessage(m.chat, { image: { url: linkDirecto }, caption: txt })
await m.react('✔️')
break
}
}} catch (error) {
await m.react('✖️')
await conn.reply(m.chat, `☑️ 𝚂𝙴 𝙷𝙰 𝙿𝚁𝙾𝙳𝚄𝙲𝙸𝙳𝙾 𝚄𝙽 𝙿𝚁𝙾𝙱𝙻𝙴𝙼𝙰\n\n𝙴𝚁𝚁𝙾𝚁: ${error.message}`, m, rcanal)
}}

handler.help = ['tourl', 'catbox']
handler.tags = ['tools']
handler.command = ['tourl', 'catbox']

export default handler

function formatBytes(bytes) {
if (bytes === 0) return '0 B'
const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
const i = Math.floor(Math.log(bytes) / Math.log(1024))
return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}

async function shortUrl(url) {
const res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
return await res.text()
}

async function catbox(content) {
const { ext, mime } = (await fileTypeFromBuffer(content)) || {}
const blob = new Blob([content.toArrayBuffer()], { type: mime })
const formData = new FormData()
const randomBytes = crypto.randomBytes(5).toString("hex")
formData.append("reqtype", "fileupload")
formData.append("fileToUpload", blob, randomBytes + "." + ext)
const response = await fetch("https://catbox.moe/user/api.php", { method: "POST", body: formData, headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64)" }})
return await response.text()
}
