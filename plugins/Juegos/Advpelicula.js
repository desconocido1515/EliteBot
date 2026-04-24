//Créditos a Katashi Fukushima

import fs from 'fs'

let timeout = 30000
let poin = 500

let handler = async (m, { conn, usedPrefix }) => {
    conn.advpeli = conn.advpeli ? conn.advpeli : {}
    let id = m.chat
    if (id in conn.advpeli) {
        await conn.reply(m.chat, '❌ Todavía hay una adivinanza sin responder en este chat', m, rcanal)
        return
    }
    
    let tekateki = JSON.parse(fs.readFileSync(`./src/game/peliculas.json`))
    let json = tekateki[Math.floor(Math.random() * tekateki.length)]
    let respuesta = json.response.toLowerCase()
    
    let caption = `
ⷮ *🎬 ADIVINA LA PELÍCULA CON EMOJIS* 🎬

*${json.question}*

📌 *Tiempo:* ${(timeout / 1000).toFixed(2)} segundos

✨ *Responde a este mensaje con el nombre de la película* ✨
    `.trim()
    
    let msg = await conn.reply(m.chat, caption, m, rcanal)
    
    conn.advpeli[id] = {
        id: id,
        msg: msg,
        respuesta: respuesta,
        timeout: setTimeout(() => {
            if (conn.advpeli[id]) {
                conn.reply(m.chat, `⏰ *Se acabó el tiempo!*\n📌 *Película:* ${json.response.toUpperCase()}`, m, rcanal)
                delete conn.advpeli[id]
            }
        }, timeout)
    }
}

handler.before = async (m, { conn }) => {
    if (!m.quoted) return
    if (!conn.advpeli) conn.advpeli = {}
    
    let id = m.chat
    let game = conn.advpeli[id]
    if (!game) return
    
    // Verificar si el mensaje respondido es el del juego
    if (m.quoted.id !== game.msg.key.id) return
    
    // Verificar si ya pasó el tiempo
    if (!game.timeout) return
    
    let userAnswer = m.text.toLowerCase().trim()
    let isCorrect = userAnswer === game.respuesta
    
    if (isCorrect) {
        // Respuesta correcta
        clearTimeout(game.timeout)
        delete conn.advpeli[id]
        
        let poinUser = global.db.data.users[m.sender].exp || 0
        global.db.data.users[m.sender].exp = (poinUser || 0) + poin
        
        await conn.reply(m.chat, `✅ *RESPUESTA CORRECTA!*\n\n🎉 La película era *${game.respuesta.toUpperCase()}*\n🏆 +${poin} XP`, m, rcanal)
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } else {
        // Respuesta incorrecta
        await conn.reply(m.chat, `❌ *RESPUESTA INCORRECTA*\n\n📌 Sigue intentando!`, m, rcanal)
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.help = ['advpeli']
handler.tags = ['game']
handler.command = /^(advpeli)$/i

export default handler
