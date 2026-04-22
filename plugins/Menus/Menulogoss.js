import fs, { promises } from 'fs'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command }) => {
try {
let d = new Date(new Date + 3600000)
let locale = 'es'
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime)
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length 
let more = String.fromCharCode(8206)
let readMore = more.repeat(850)   
let taguser = conn.getName(m.sender)
let user = global.db.data.users[m.sender]
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let menu = `
¡Hola! 👋🏻 @${m.sender.split("@")[0]}
 \`\`\`${week}, ${date}\`\`\`
╭──𝗟𝗢𝗚𝗢𝗦 𝗘𝗟𝗜𝗧𝗘 𝗕𝗢𝗧 
│ 𝘉𝘪𝘦𝘯𝘷𝘦𝘯𝘪𝘥𝘰 ...
│ [❗] 𝙚𝙟𝙚𝙢𝙥𝙡𝙤 :
│ .logodead Kevv Elite
│ 𝘾𝙤𝙢𝙖𝙣𝙙𝙤 + 𝙩𝙚𝙭𝙩𝙤
╰────────────────

» 𝗠𝗘𝗡𝗨 𝗟𝗢𝗚𝗢𝗦

│ 🔹 *1 PALABRA*
│° 🔰 .logoassassin texto
│° 🔰 .logoshield texto
│° 🔰 .logofootball texto
│° 🔰 .logominimal texto
│° 🔰 .logometal texto
│° 🔰 .logobw texto
│° 🔰 .logoqueen texto
│° 🔰 .logoamerican texto
│° 🔰 .logoaov texto
│° 🔰 .logocomix texto
│° 🔰 .logorotation texto
│° 🔰 .logointro texto

│ 🔹 *2 PALABRAS*
│° 🔰 .logodead texto texto
│° 🔰 .logoletters texto texto
│° 🔰 .logopornhub texto texto
│° 🔰 .logomascot texto texto
│° 🔰 .logocaptain texto texto
│° 🔰 .logowarzone texto texto
│° 🔰 .logoamongus texto texto
│° 🔰 .logololbanner texto texto
│° 🔰 .logowanted texto texto

╰━━━━━━⋆★⋆━━━━━━⬣`.trim()
    
const vi = ['https://telegra.ph/file/d5570b8dfde7d7fa5df5b.mp4']

try {
await conn.sendMessage(m.chat, { video: { url: vi.getRandom() }, gifPlayback: true, caption: menu, mentions: [m.sender, global.conn.user.jid] }, { quoted: fkontak }) 
} catch (error) {
try {
await conn.sendMessage(m.chat, { image: { url: gataMenu.getRandom() }, gifPlayback: false, caption: menu, mentions: [m.sender, global.conn.user.jid] }, { quoted: fkontak }) 
} catch (error) {
try {
await conn.sendMessage(m.chat, { image: gataImg.getRandom(), gifPlayback: false, caption: menu, mentions: [m.sender, global.conn.user.jid] }, { quoted: fkontak }) 
} catch (error) {
try{
await conn.sendFile(m.chat, imagen5, 'menu.jpg', menu, fkontak, false, { mentions: [m.sender, global.conn.user.jid] })
} catch (error) {
return 
}}}} 

} catch (e) {
await m.reply(lenguajeGB['smsMalError3']() + '\n*' + lenguajeGB.smsMensError1() + '*\n*' + usedPrefix + `${lenguajeGB.lenguaje() == 'es' ? 'reporte' : 'report'}` + '* ' + `${lenguajeGB.smsMensError2()} ` + usedPrefix + command)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)}}

handler.command = /^(menulogos|menulogo)$/i
handler.register = false
handler.group = true
export default handler
    
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
