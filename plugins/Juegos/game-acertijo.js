import fs from 'fs'

let timeout = 40000
let poin = 500

let handler = async (m, { conn, usedPrefix }) => {
    conn.acertijo = conn.acertijo ? conn.acertijo : {}
    let id = m.chat
    if (id in conn.acertijo) {
        await conn.reply(m.chat, '⚠️ 𝙏𝙊𝘿𝘼𝙑𝙄𝘼 𝙃𝘼𝙔 𝘼𝘾𝙀𝙍𝙏𝙄𝙅𝙊𝙎 𝙎𝙄𝙉 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀𝙍', m, rcanal)
        return
    }
    
    let tekateki = JSON.parse(fs.readFileSync(`./src/game/acertijo.json`))
    let json = tekateki[Math.floor(Math.random() * tekateki.length)]
    let respuestaCorrecta = json.response.toLowerCase()
    
    const caption = `
ⷮ *${json.question}*

⏱️ *Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
🎁 *Recompensa:* +${poin} XP

💫 *Responde a este mensaje con la respuesta correcta* 💫
━━━━━━━━━━━━━━━━━━━
© Elite Bot Global - Since 2023®`
    
    let msg = await conn.reply(m.chat, caption, m, rcanal)
    
    conn.acertijo[id] = {
        id: id,
        msg: msg,
        respuesta: respuestaCorrecta,
        pregunta: json.question,
        timeout: setTimeout(() => {
            if (conn.acertijo[id]) {
                conn.reply(m.chat, `⏰ *SE ACABÓ EL TIEMPO!*\n\n📌 *Respuesta correcta:* ${json.response}\n\n💪 Sigue participando!`, m, rcanal)
                delete conn.acertijo[id]
            }
        }, timeout)
    }
}

handler.before = async (m, { conn }) => {
    if (!m.quoted) return
    if (!conn.acertijo) conn.acertijo = {}
    
    let id = m.chat
    let game = conn.acertijo[id]
    if (!game) return
    
    // Verificar si el mensaje respondido es el del juego
    if (m.quoted.id !== game.msg.key.id) return
    
    let userAnswer = m.text.toLowerCase().trim()
    let isCorrect = userAnswer === game.respuesta
    
    if (isCorrect) {
        // Respuesta correcta
        clearTimeout(game.timeout)
        delete conn.acertijo[id]
        
        let poinUser = global.db.data.users[m.sender].exp || 0
        global.db.data.users[m.sender].exp = (poinUser || 0) + poin
        
        await conn.reply(m.chat, `✅ *RESPUESTA CORRECTA!*\n\n🎉 *${game.pregunta}*\n📌 *Respuesta:* ${game.respuesta.toUpperCase()}\n🏆 +${poin} XP\n\n¡Eres muy inteligente! 🧠`, m, rcanal)
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } else {
        // Respuesta incorrecta
        await conn.reply(m.chat, `❌ *RESPUESTA INCORRECTA*\n\n📌 *Pista:* ${game.pregunta}\n\n💪 Sigue intentando!`, m, rcanal)
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.help = ['acertijo']
handler.tags = ['game']
handler.command = /^(acertijo|acert|adivinanza|tekateki)$/i

export default handler
