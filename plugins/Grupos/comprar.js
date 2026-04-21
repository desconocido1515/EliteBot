import fs from 'fs'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
try {

    await conn.sendMessage(m.chat, { react: { text: '💳', key: m.key } })

    let d = new Date(new Date() + 3600000)
    let locale = 'es'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })

    let taguser = conn.getName(m.sender)

    let fkontak = {
      key: {
        participants: "0@s.whatsapp.net",
        remoteJid: "status@broadcast",
        fromMe: false,
        id: "Halo"
      },
      message: {
        contactMessage: {
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Bot;;;\nFN:Bot\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nEND:VCARD`
        }
      },
      participant: "0@s.whatsapp.net"
    }

    let menu = `
¡Hola! @${m.sender.split("@")[0]}
\`\`\`${week}, ${date}\`\`\`

INGRESA AL LINK PARA VER EL CATÁLOGO:
https://sites.google.com/view/elitebotglobal?usp=sharing

© 2023 EliteBotGlobal // ProyectoX
`.trim()

    // ✅ FIX AQUÍ
    const vi = ['https://files.catbox.moe/tpmd88.mp4']
    let video = vi[Math.floor(Math.random() * vi.length)]

    await conn.sendMessage(m.chat, {
        video: { url: video },
        gifPlayback: true,
        caption: menu,
        mentions: [m.sender]
    }, { quoted: fkontak })

} catch (e) {
    console.error(e)
    await conn.reply(m.chat, '❌ Error en el comando', m)
}}

handler.command = /^(tienda|comprar)$/i
handler.register = false
handler.group = true

export default handler
