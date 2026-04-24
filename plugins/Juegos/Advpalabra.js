//Créditos a Katashi Fukushima

import fs from 'fs'

let timeout = 30000
let poin = 500

let handler = async (m, { conn, usedPrefix }) => {
    conn.palabra = conn.palabra ? conn.palabra : {}
    let id = m.chat
    if (id in conn.palabra) {
        await conn.reply(m.chat, '❌ Todavía hay una palabra sin ordenar en este chat', m, rcanal)
        return
    }
    
    let tekateki = JSON.parse(fs.readFileSync(`./src/game/palabra.json`))
    let json = tekateki[Math.floor(Math.random() * tekateki.length)]
    let clue = json.question
    let respuesta = json.response.toLowerCase()
    
    let caption = `
ⷮ *ORDENA LA PALABRA: ${clue.toUpperCase()}*

📌 *Tiempo:* ${(timeout / 1000).toFixed(2)} segundos

✨ *Responde a este mensaje con la palabra correcta* ✨
    `.trim()
    
    let msg = await conn.reply(m.chat, caption, m, rcanal)
    
    conn.palabra[id] = {
        id: id,
        msg: msg,
        respuesta: respuesta,
        timeout: setTimeout(() => {
            if (conn.palabra[id]) {
                conn.reply(m.chat, `⏰ *Se acabó el tiempo!*\n📌 *Palabra correcta:* ${respuesta.toUpperCase()}`, m, rcanal)
                delete conn.palabra[id]
            }
        }, timeout)
    }
}

handler.before = async (m, { conn }) => {
    if (!m.quoted) return
    if (!conn.palabra) conn.palabra = {}
    
    let id = m.chat
    let game = conn.palabra[id]
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
        delete conn.palabra[id]
        
        let poinUser = global.db.data.users[m.sender].exp || 0
        global.db.data.users[m.sender].exp = (poinUser || 0) + poin
        
        await conn.reply(m.chat, `✅ *RESPUESTA CORRECTA!*\n\n🎉 La palabra era *${game.respuesta.toUpperCase()}*\n🏆 +${poin} XP`, m, rcanal)
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } else {
        // Respuesta incorrecta
        await conn.reply(m.chat, `❌ *RESPUESTA INCORRECTA*\n\n📌 Sigue intentando!`, m, rcanal)
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.help = ['palabra']
handler.tags = ['game']
handler.command = /^(palabra|word|ordenar|order)$/i

export default handler
