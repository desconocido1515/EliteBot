import fs from 'fs'

let handler = async (m, { conn, usedPrefix, command }) => {
try {
    // 💳 Reacción
    await conn.sendMessage(m.chat, { react: { text: '💳', key: m.key } })

    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })

    let menu = `
¡Hola! 👋🏻 @${m.sender.split("@")[0]}
\`\`\`${week}, ${date}\`\`\`

INGRESA AL LINK PARA VER EL CATÁLOGO:
https://sites.google.com/view/elitebotglobal?usp=sharing

 © 2023 EliteBotGlobal // ProyectoX `.trim()

    // 📁 Ruta local
    let videoPath = './media/tienda.mp4'

    if (!fs.existsSync(videoPath)) {
        return conn.reply(m.chat, '❌ No se encontró el archivo en media/tienda.mp4', m, rcanal)
    }

    // 🎥 Enviar video con estilo sticker plugin
    await conn.sendMessage(
        m.chat,
        {
            video: fs.readFileSync(videoPath),
            caption: menu,
            gifPlayback: true,
            mentions: [m.sender]
        },
        { quoted: m, contextInfo: rcanal }
    )

} catch (e) {
    console.log(e)
    await conn.reply(m.chat, '❌ Error al enviar el menú', m, rcanal)
}}

handler.command = /^(tienda|comprar)$/i
handler.group = true
handler.register = false

export default handler
