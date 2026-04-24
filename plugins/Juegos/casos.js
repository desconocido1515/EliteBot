import fs from 'fs'

let timeout = 40000
let poin = 10000

let handler = async (m, { conn, usedPrefix }) => {
    conn.casos = conn.casos ? conn.casos : {}
    let id = m.chat
    if (id in conn.casos) {
        await conn.reply(m.chat, '⚠️ Todavía hay un caso sin resolver en este chat', m, rcanal)
        return
    }
    
    let casos = JSON.parse(fs.readFileSync("./src/game/casos.json", 'utf8'))
    let json = casos[Math.floor(Math.random() * casos.length)]
    let respuestaCorrecta = json.response.toLowerCase()
    
    let caption = `
🕵️ *CASO POLICIACO* 🕵️

📋 *${json.caso}*

🔍 *Sospechosos:*
${json.Sospechosos}

⏱️ *Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
💰 *Recompensa:* +${poin} XP

💫 *Responde a este mensaje con el nombre completo del culpable* 💫
━━━━━━━━━━━━━━━━━━━
© Elite Bot Global - Since 2023®`
    
    let msg = await conn.reply(m.chat, caption, m, rcanal)
    
    conn.casos[id] = {
        id: id,
        msg: msg,
        respuesta: respuestaCorrecta,
        nombre: json.nombre || json.response,
        sospechosos: json.Sospechosos,
        timeout: setTimeout(() => {
            if (conn.casos[id]) {
                conn.reply(m.chat, `⏰ *SE ACABÓ EL TIEMPO!*\n\n🕵️ *Culpable:* ${json.response}\n\n💪 Sigue investigando en el próximo caso!`, m, rcanal)
                delete conn.casos[id]
            }
        }, timeout)
    }
}

handler.before = async (m, { conn }) => {
    if (!m.quoted) return
    if (!conn.casos) conn.casos = {}
    
    let id = m.chat
    let game = conn.casos[id]
    if (!game) return
    
    // Verificar si el mensaje respondido es el del juego
    if (m.quoted.id !== game.msg.key.id) return
    
    let userAnswer = m.text.toLowerCase().trim()
    let isCorrect = userAnswer === game.respuesta
    
    if (isCorrect) {
        // Respuesta correcta
        clearTimeout(game.timeout)
        delete conn.casos[id]
        
        let poinUser = global.db.data.users[m.sender].exp || 0
        global.db.data.users[m.sender].exp = (poinUser || 0) + poin
        
        await conn.reply(m.chat, `✅ *CASO RESUELTO!*\n\n🕵️ *Culpable:* ${game.respuesta.toUpperCase()}\n🏆 +${poin} XP\n\n¡Excelente trabajo, detective! 🎉`, m, rcanal)
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } else {
        // Respuesta incorrecta
        await conn.reply(m.chat, `❌ *RESPUESTA INCORRECTA*\n\n🔍 *Sospechosos:*\n${game.sospechosos}\n\n💪 Sigue investigando!`, m, rcanal)
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.help = ['caso']
handler.tags = ['game']
handler.command = /^(caso|casoinvestigar|casopoliciaco|investigarcaso)$/i

export default handler
