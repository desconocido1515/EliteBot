import axios from "axios"
import cheerio from "cheerio"
import FormData from "form-data"

const handler = async (m, { conn, args, usedPrefix, command }) => {

let rcanal = { contextInfo: { forwardingScore: 200, isForwarded: true }}

if (!args[0]) {
return conn.reply(m.chat,
`✦ *GENERADOR DE LOGOS*

📌 Uso correcto:
${usedPrefix + command} efecto texto

📌 Ejemplo:
${usedPrefix + command} american GOJOBOT

⚠️ Debes ingresar un efecto y un texto.`,
m, rcanal)
}

let effect = args[0].toLowerCase()
let text = args.slice(1).join(" ")

if (!text) {
return conn.reply(m.chat,
`⚠️ *Debes ingresar un texto*

📌 Ejemplo:
${usedPrefix + command} ${effect} GOJOBOT`,
m, rcanal)
}

let effectData = effects.find(v => v.title.toLowerCase() === effect)

if (!effectData) {
return conn.reply(m.chat,
`❌ *Efecto no válido*

📌 Usa uno de la lista disponible.`,
m, rcanal)
}

try {
await m.react('🕓')

let result = await maker(effectData.url, text)

if (!result || !result.image) {
throw 'No se generó imagen'
}

await conn.sendMessage(m.chat, {
image: { url: result.image },
caption: `✅ *LOGO GENERADO CORRECTAMENTE*

🎨 Efecto: ${effect}
📝 Texto: ${text}`
}, { quoted: m })

await m.react('✅')

} catch (e) {
console.log(e)

await conn.reply(m.chat,
`❌ *Error al generar el logo*

⚠️ Posible causa:
• Bloqueo de la web (403)
• Error temporal

🔄 Intenta nuevamente.`,
m, rcanal)

await m.react('✖️')
}
}

handler.command = ['logo']
export default handler

// ================= MAKER =================

async function maker(url, text) {
try {
let res = await axios.get(url, {
headers: {
"User-Agent": "Mozilla/5.0",
"Accept": "text/html"
}
})

let $ = cheerio.load(res.data)

let token = $('#token').val()
let build_server = $('#build_server').val()
let build_server_id = $('#build_server_id').val()

if (!token) throw 'Token no encontrado'

let form = new FormData()
form.append('token', token)
form.append('build_server', build_server)
form.append('build_server_id', build_server_id)
form.append('submit', 'Go')

form.append('text[]', text)

let post = await axios.post(url, form, {
headers: {
...form.getHeaders(),
"User-Agent": "Mozilla/5.0",
"Referer": url
}
})

let $$ = cheerio.load(post.data)
let json = $$('#form_value').val() || $$('#form_value').text()

if (!json) throw 'No hay respuesta del servidor'

let result = await axios.post(
new URL(url).origin + '/effect/create-image',
JSON.parse(json),
{
headers: {
"Content-Type": "application/json",
"User-Agent": "Mozilla/5.0"
}
}
)

return {
image: build_server + (result.data.image || result.data.fullsize_image)
}

} catch (e) {
throw e
}
}

// ================= EFECTOS =================

const effects = [
{
title: "american",
url: "https://textpro.me/create-american-flag-3d-text-effect-online-1051.html"
},
{
title: "neon",
url: "https://textpro.me/neon-text-effect-online-963.html"
},
{
title: "glitch",
url: "https://textpro.me/create-a-glitch-text-effect-online-free-1026.html"
},
{
title: "metallic",
url: "https://textpro.me/create-a-metallic-text-effect-free-online-1041.html"
}
]
