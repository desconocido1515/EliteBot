var handler = async (m, { conn, text, usedPrefix, command }) => {

let poin = 500
let reseqv = `☑️ *JUEGO: PIEDRA, PAPEL O TIJERA*

📌 *Instrucciones:*
• Puedes usar estos comandos:
  🥌 .ppt piedra
  📄 .ppt papel
  ✂️ .ppt tijera

• Usa en minúsculas
📌 *Ejemplo:* .ppt papel`

if (!text) return conn.reply(m.chat, reseqv, m, rcanal)

// Validar que el texto sea válido
let opciones = ['piedra', 'papel', 'tijera']
if (!opciones.includes(text.toLowerCase())) {
    return conn.reply(m.chat, `☑️ *Opción no válida*\n\nUsa: piedra, papel o tijera`, m, rcanal)
}

var astro = Math.random()

if (astro < 0.34) {
    astro = 'piedra'
} else if (astro > 0.34 && astro < 0.67) {
    astro = 'tijera'
} else {
    astro = 'papel'
}

let resultado = ''
let ganancia = 0

if (text == astro) {
    resultado = '🔰 *EMPATE* 🔰'
    ganancia = 100
    global.db.data.users[m.sender].exp += ganancia
} else if (text == 'piedra') {
    if (astro == 'tijera') {
        resultado = '🎊 *GANASTE* 🎊'
        ganancia = 300
        global.db.data.users[m.sender].exp += ganancia
    } else {
        resultado = '❌ *PERDISTE* ❌'
        ganancia = -300
        global.db.data.users[m.sender].exp += ganancia
    }
} else if (text == 'tijera') {
    if (astro == 'papel') {
        resultado = '🎊 *GANASTE* 🎊'
        ganancia = 500
        global.db.data.users[m.sender].exp += ganancia
    } else {
        resultado = '❌ *PERDISTE* ❌'
        ganancia = -150
        global.db.data.users[m.sender].exp += ganancia
    }
} else if (text == 'papel') {
    if (astro == 'piedra') {
        resultado = '🎊 *GANASTE* 🎊'
        ganancia = 600
        global.db.data.users[m.sender].exp += ganancia
    } else {
        resultado = '❌ *PERDISTE* ❌'
        ganancia = -300
        global.db.data.users[m.sender].exp += ganancia
    }
}

let mensaje = `
━━━━━━━━━━━━━━━
${resultado}
━━━━━━━━━━━━━━━
👤 *TU:* ${text}
🤖 *BOT:* ${astro}
━━━━━━━━━━━━━━━
💰 *${ganancia >= 0 ? '+' : ''}${ganancia} XP*
📊 *XP Total:* ${global.db.data.users[m.sender].exp}
━━━━━━━━━━━━━━━
`

await conn.reply(m.chat, mensaje, m, rcanal)
}

handler.help = ['ppt']
handler.tags = ['juegos']
handler.command = ['ppt'] 
handler.register = false

export default handler
