import db from '../../lib/database.js'

let handler = async (m, { conn, args, text, isOwner, usedPrefix, command }) => {
    conn.advnro = conn.advnro ? conn.advnro : {}
    if (conn.advnro[m.chat]) {
        return conn.reply(m.chat, '⚠️ 𝗧𝗢𝗗𝗔𝗩𝗜́𝗔 𝗛𝗔𝗬 𝗣𝗥𝗘𝗚𝗨𝗡𝗧𝗔𝗦 𝗦𝗜𝗡 𝗥𝗘𝗦𝗣𝗢𝗡𝗗𝗘𝗥.', m, rcanal)
    }
    
    let numeroSecreto = Math.floor(Math.random() * 10) // 0-9
    let tiempo = 30000
    let bonus = 350
    
    conn.advnro[m.chat] = {
        number: numeroSecreto,
        time: tiempo,
        bonus: bonus,
        active: true
    }
    
    let teks = `🔢 *ADIVINA EL NÚMERO* 🔢

🤔 *Adivina el número del 0 al 9*

⏱️ *Tiempo:* ${(tiempo / 1000).toFixed(2)} segundos
🎁 *Recompensa:* +${bonus} XP

💫 *Responde a este mensaje con el número que creas correcto* 💫
━━━━━━━━━━━━━━━━━━━
© Elite Bot Global - Since 2023®`
    
    let msg = await conn.reply(m.chat, teks, m, rcanal)
    
    conn.advnro[m.chat].msg = msg
    
    setTimeout(() => {
        if (conn.advnro[m.chat] && conn.advnro[m.chat].active) {
            conn.reply(m.chat, `⏰ *SE ACABÓ EL TIEMPO!*\n\n🔢 *Número correcto:* ${conn.advnro[m.chat].number}\n\n💪 Sigue intentando!`, m, rcanal)
            delete conn.advnro[m.chat]
        }
    }, tiempo)
}

handler.before = async (m, { conn }) => {
    if (!m.quoted) return
    if (!conn.advnro) conn.advnro = {}
    
    let id = m.chat
    let game = conn.advnro[id]
    if (!game || !game.active) return
    
    // Verificar si el mensaje respondido es el del juego
    if (m.quoted.id !== game.msg.key.id) return
    
    let userNumber = parseInt(m.text.trim())
    
    if (isNaN(userNumber)) {
        await conn.reply(m.chat, `❌ *RESPUESTA NO VÁLIDA*\n\nResponde con un número del 0 al 9`, m, rcanal)
        return
    }
    
    if (userNumber < 0 || userNumber > 9) {
        await conn.reply(m.chat, `❌ *NÚMERO FUERA DE RANGO*\n\nResponde con un número del 0 al 9`, m, rcanal)
        return
    }
    
    if (userNumber === game.number) {
        // Respuesta correcta
        game.active = false
        clearTimeout(game.timeout)
        
        let poinUser = global.db.data.users[m.sender].exp || 0
        global.db.data.users[m.sender].exp = (poinUser || 0) + game.bonus
        
        await conn.reply(m.chat, `✅ *RESPUESTA CORRECTA!*\n\n🎉 El número era *${game.number}*\n🏆 +${game.bonus} XP\n\n¡Eres un genio! 🧠`, m, rcanal)
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        
        delete conn.advnro[id]
    } else {
        // Respuesta incorrecta
        let pista = userNumber < game.number ? '📈 *Más alto*' : '📉 *Más bajo*'
        await conn.reply(m.chat, `❌ *RESPUESTA INCORRECTA*\n\n🔢 Tu número: *${userNumber}*\n${pista}\n\n💪 Sigue intentando!`, m, rcanal)
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.help = ['advnro']
handler.tags = ['game']
handler.command = /^(advnro|adivinanumero|adivinaelnumero)$/i
handler.register = false

export default handler
