import fs from 'fs'

let timeout = 15000
let poin = 500

let handler = async (m, { conn, usedPrefix }) => {
    conn.trivia = conn.trivia ? conn.trivia : {}
    let id = m.chat
    if (id in conn.trivia) {
        await conn.reply(m.chat, '❌ Todavía hay una pregunta sin responder en este chat', m, rcanal)
        return
    }
    
    let trivia = JSON.parse(fs.readFileSync(`./src/game/trivia.json`))
    let json = trivia[Math.floor(Math.random() * trivia.length)]
    let respuesta = json.response.toLowerCase()
    let opciones = json.options || []
    
    let caption = `
ⷮ *${json.question}*

📌 *Opciones:*
${opciones.map((opt, i) => `   ${String.fromCharCode(65 + i)}. ${opt}`).join('\n')}

⏱️ *Tiempo:* ${(timeout / 1000).toFixed(2)} segundos

✨ *Responde a este mensaje con la letra de la opción correcta (A, B, C, etc.)* ✨
    `.trim()
    
    let msg = await conn.reply(m.chat, caption, m, rcanal)
    
    conn.trivia[id] = {
        id: id,
        msg: msg,
        respuesta: respuesta,
        opciones: opciones,
        timeout: setTimeout(() => {
            if (conn.trivia[id]) {
                let respuestaCorrecta = opciones[respuesta.charCodeAt(0) - 65] || respuesta
                conn.reply(m.chat, `⏰ *Se acabó el tiempo!*\n📌 *Respuesta correcta:* ${respuesta.toUpperCase()} - ${respuestaCorrecta}`, m, rcanal)
                delete conn.trivia[id]
            }
        }, timeout)
    }
}

handler.before = async (m, { conn }) => {
    if (!m.quoted) return
    if (!conn.trivia) conn.trivia = {}
    
    let id = m.chat
    let game = conn.trivia[id]
    if (!game) return
    
    // Verificar si el mensaje respondido es el del juego
    if (m.quoted.id !== game.msg.key.id) return
    
    // Verificar si ya pasó el tiempo
    if (!game.timeout) return
    
    let userAnswer = m.text.toLowerCase().trim()
    let letrasValidas = ['a', 'b', 'c', 'd', 'e', 'f']
    
    if (!letrasValidas.includes(userAnswer)) {
        await conn.reply(m.chat, `❌ *RESPUESTA NO VÁLIDA*\n\nResponde con la letra de la opción: A, B, C, D, E o F`, m, rcanal)
        return
    }
    
    let letraIndex = userAnswer.charCodeAt(0) - 97 // a=0, b=1, etc.
    let respuestaCorrecta = game.respuesta
    let esCorrecto = (letraIndex + 1).toString() === respuestaCorrecta || 
                     String.fromCharCode(65 + letraIndex).toLowerCase() === respuestaCorrecta ||
                     game.opciones[letraIndex]?.toLowerCase() === game.opciones[parseInt(respuestaCorrecta) - 1]?.toLowerCase()
    
    if (esCorrecto) {
        // Respuesta correcta
        clearTimeout(game.timeout)
        delete conn.trivia[id]
        
        let poinUser = global.db.data.users[m.sender].exp || 0
        global.db.data.users[m.sender].exp = (poinUser || 0) + poin
        
        await conn.reply(m.chat, `✅ *RESPUESTA CORRECTA!*\n\n🎉 La opción correcta era: *${userAnswer.toUpperCase()}*. ${game.opciones[letraIndex]}\n🏆 +${poin} XP`, m, rcanal)
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } else {
        // Respuesta incorrecta
        let respuestaReal = game.opciones[parseInt(game.respuesta) - 1] || game.respuesta
        await conn.reply(m.chat, `❌ *RESPUESTA INCORRECTA*\n\n📌 La respuesta correcta era: *${game.respuesta.toUpperCase()}*. ${respuestaReal}\n\n💪 Sigue intentando!`, m, rcanal)
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.help = ['trivia']
handler.tags = ['game']
handler.command = /^(opcion|opción)$/i

export default handler
