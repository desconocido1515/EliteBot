import fs from 'fs'

let timeout = 15000
let poin = 1000

let handler = async (m, { conn, usedPrefix }) => {
    conn.capitales = conn.capitales ? conn.capitales : {}
    let id = m.chat
    if (id in conn.capitales) {
        await conn.reply(m.chat, '❌ Todavía hay un juego sin terminar en este chat', m, rcanal)
        return
    }
    
    let capitales = JSON.parse(fs.readFileSync("./src/game/capitales.json"))
    let json = capitales[Math.floor(Math.random() * capitales.length)]
    let respuesta = json.response.toLowerCase()
    
    let caption = `
ⷮ *🌍 ADIVINA LA CAPITAL* 🌍

📌 *País:* ${json.pais}

⏱️ *Tiempo:* ${(timeout / 1000).toFixed(2)} segundos

✨ *Responde a este mensaje con el nombre de la capital* ✨
    `.trim()
    
    let msg = await conn.reply(m.chat, caption, m, rcanal)
    
    conn.capitales[id] = {
        id: id,
        msg: msg,
        respuesta: respuesta,
        pais: json.pais,
        timeout: setTimeout(() => {
            if (conn.capitales[id]) {
                conn.reply(m.chat, `⏰ *Se acabó el tiempo!*\n\n📌 *País:* ${json.pais}\n📌 *Capital:* ${json.response.toUpperCase()}`, m, rcanal)
                delete conn.capitales[id]
            }
        }, timeout)
    }
}

handler.before = async (m, { conn }) => {
    if (!m.quoted) return
    if (!conn.capitales) conn.capitales = {}
    
    let id = m.chat
    let game = conn.capitales[id]
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
        delete conn.capitales[id]
        
        let poinUser = global.db.data.users[m.sender].exp || 0
        global.db.data.users[m.sender].exp = (poinUser || 0) + poin
        
        await conn.reply(m.chat, `✅ *RESPUESTA CORRECTA!*\n\n🌍 *País:* ${game.pais}\n🏙️ *Capital:* ${game.respuesta.toUpperCase()}\n🏆 +${poin} XP`, m, rcanal)
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } else {
        // Respuesta incorrecta
        await conn.reply(m.chat, `❌ *RESPUESTA INCORRECTA*\n\n📌 Sigue intentando!`, m, rcanal)
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.help = ['capitalde']
handler.tags = ['game']
handler.command = /^(capitalde|capitales|capital|adivinalacapital)$/i

export default handler
