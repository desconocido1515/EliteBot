const handler = async (m, { args, conn, usedPrefix }) => {
try {
if (!args[0]) return conn.reply(m.chat, `☑️ 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁, 𝙸𝙽𝙶𝚁𝙴𝚂𝙰 𝚄𝙽 𝙴𝙽𝙻𝙰𝙲𝙴 𝙳𝙴 𝙸𝙽𝚂𝚃𝙰𝙶𝚁𝙰𝙼/𝙵𝙰𝙲𝙴𝙱𝙾𝙾𝙺`, m, rcanal)
let data = []
try {
await m.react('🕒')
const api = `${global.APIs.vreden.url}/api/igdownload?url=${encodeURIComponent(args[0])}`
const res = await fetch(api)
const json = await res.json()
if (json.resultado?.respuesta?.datos?.length) {
data = json.resultado.respuesta.datos.map(v => v.url)
}} catch {}
if (!data.length) {
try {
const api = `${global.APIs.delirius.url}/download/instagram?url=${encodeURIComponent(args[0])}`
const res = await fetch(api)
const json = await res.json()
if (json.status && json.data?.length) {
data = json.data.map(v => v.url)
}} catch {}
}
if (!data.length) return conn.reply(m.chat, `☑️ 𝙽𝙾 𝚂𝙴 𝙿𝚄𝙳𝙾 𝙾𝙱𝚃𝙴𝙽𝙴𝚁 𝙴𝙻 𝙲𝙾𝙽𝚃𝙴𝙽𝙸𝙳𝙾`, m, rcanal)
for (let media of data) {
await conn.sendFile(m.chat, media, 'instagram.mp4', `☑️ 𝙰𝚀𝚄𝙸 𝚃𝙸𝙴𝙽𝙴𝚂 𝚃𝚄 𝙲𝙾𝙽𝚃𝙴𝙽𝙸𝙳𝙾 🍙`, m)
await m.react('✔️')
}} catch (error) {
await m.react('✖️')
await conn.reply(m.chat, `☑️ 𝚂𝙴 𝙷𝙰 𝙿𝚁𝙾𝙳𝚄𝙲𝙸𝙳𝙾 𝚄𝙽 𝙿𝚁𝙾𝙱𝙻𝙴𝙼𝙰\n\n𝙴𝚁𝚁𝙾𝚁: ${error.message}`, m, rcanal)
}}

handler.command = ['instagram', 'ig', 'facebook', 'fb']
handler.tags = ['download']
handler.help = ['instagram', 'ig', 'facebook', 'fb']
handler.group = true

export default handler
