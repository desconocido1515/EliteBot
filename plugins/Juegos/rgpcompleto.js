// plugins/rpg_completo.js

let handler = async (m, { conn, command, text, usedPrefix }) => {
    let user = global.db.data.users[m.sender]
    if (!user) user = global.db.data.users[m.sender] = { 
        exp: 0, money: 0, bank: 0, diamond: 0, limit: 0, 
        lastclaim: 0, lastwork: 0, lastmining: 0, lastrob: 0, lastgift: 0,
        lastdaily: 0, lastweekly: 0, lastmonthly: 0,
        inventory: {}
    }
    
    const time = new Date().getTime()
    
    switch (command) {
        
        // ==================== BANCO (INFORMACIÓN COMPLETA) ====================
        case 'banco':
        case 'bancorpg': {
            let nombre = await conn.getName(m.sender)
            let inventario = user.inventory || {}
            let itemsList = Object.entries(inventario).map(([item, qty]) => `▸ ${item}: ${qty}`).join('\n') || '▸ Vacío'
            
            // Próximas recompensas
            let dailyLeft = user.lastdaily ? msToTime(86400000 - (time - user.lastdaily)) : 'Disponible'
            let weeklyLeft = user.lastweekly ? msToTime(604800000 - (time - user.lastweekly)) : 'Disponible'
            let monthlyLeft = user.lastmonthly ? msToTime(2592000000 - (time - user.lastmonthly)) : 'Disponible'
            
            let mensaje = `☑️ *🏦 BANCO DE ${nombre.toUpperCase()}* ☑️

━━━━━━━━━━━━━━━━━━━
💎 *RECURSOS PRINCIPALES*
━━━━━━━━━━━━━━━━━━━
💰 *Dinero:* ${user.money || 0}
🏦 *Banco:* ${user.bank || 0}
💎 *Diamantes:* ${user.diamond || 0}
📊 *Experiencia:* ${user.exp || 0}
🎫 *Límite:* ${user.limit || 0}

━━━━━━━━━━━━━━━━━━━
📦 *INVENTARIO*
━━━━━━━━━━━━━━━━━━━
${itemsList}

━━━━━━━━━━━━━━━━━━━
⏰ *RECOMPENSAS DISPONIBLES*
━━━━━━━━━━━━━━━━━━━
📅 *Diaria:* ${dailyLeft === 'Disponible' ? '✅ LISTA' : `⏳ ${dailyLeft}`}
📆 *Semanal:* ${weeklyLeft === 'Disponible' ? '✅ LISTA' : `⏳ ${weeklyLeft}`}
🗓️ *Mensual:* ${monthlyLeft === 'Disponible' ? '✅ LISTA' : `⏳ ${monthlyLeft}`}
🎁 *Cofre:* ${user.lastgift ? msToTime(86400000 - (time - user.lastgift)) : '✅ LISTO'}
⛏️ *Minar:* ${user.lastmining ? msToTime(300000 - (time - user.lastmining)) : '✅ LISTO'}
💼 *Trabajar:* ${user.lastwork ? msToTime(1800000 - (time - user.lastwork)) : '✅ LISTO'}

━━━━━━━━━━━━━━━━━━━
🎮 *COMANDOS RPG*
━━━━━━━━━━━━━━━━━━━
▸ .apostar [cantidad]
▸ .balance o .bal
▸ .banco depositar/retirar
▸ .comprar [objeto]
▸ .reclamar (cada hora)
▸ .cofre (24h)
▸ .dar [cantidad] @usuario
▸ .dardiamantes [cantidad] @usuario
▸ .minar / .minar2 / .minar3
▸ .robar @usuario
▸ .trabajar (30min)
▸ .miranjo
▸ .diario / .semanal / .mensual

━━━━━━━━━━━━━━━━━━━
© Elite Bot Global - Since 2023®`
            await conn.reply(m.chat, mensaje, m, rcanal)
            break
        }
        
        // ==================== APOSTAR ====================
        case 'apostar': {
            if (!text) return conn.reply(m.chat, `☑️ *APOSTAR*\n\nUsa: .apostar [cantidad]\nEjemplo: .apostar 1000\n💰 Ganas: x2 si ganas\n💔 Pierdes: tu apuesta`, m, rcanal)
            let amount = parseInt(text)
            if (isNaN(amount) || amount < 100) return conn.reply(m.chat, `☑️ Cantidad mínima: 100`, m, rcanal)
            if (amount > user.money) return conn.reply(m.chat, `☑️ No tienes suficiente dinero. Tienes: ${user.money}`, m, rcanal)
            
            let result = Math.random()
            let win = result > 0.5
            if (win) {
                let winAmount = amount * 2
                user.money += winAmount
                await conn.reply(m.chat, `🎲 *APUESTA GANADA*\n\n💰 Apostaste: ${amount}\n🎉 Ganaste: ${winAmount}\n💵 Saldo actual: ${user.money}`, m, rcanal)
                await conn.sendMessage(m.chat, { react: { text: '🎉', key: m.key } })
            } else {
                user.money -= amount
                await conn.reply(m.chat, `🎲 *APUESTA PERDIDA*\n\n💰 Apostaste: ${amount}\n💔 Perdiste: ${amount}\n💵 Saldo actual: ${user.money}`, m, rcanal)
                await conn.sendMessage(m.chat, { react: { text: '💔', key: m.key } })
            }
            break
        }
        
        // ==================== BALANCE ====================
        case 'balance':
        case 'bal': {
            let nombre = await conn.getName(m.sender)
            let mensaje = `☑️ *BALANCE DE ${nombre.toUpperCase()}*
            
💵 *Dinero:* ${user.money || 0}
🏦 *Banco:* ${user.bank || 0}
💎 *Diamantes:* ${user.diamond || 0}
📊 *Exp:* ${user.exp || 0}

━━━━━━━━━━━━━━━━━━━
© Elite Bot Global - Since 2023®`
            await conn.reply(m.chat, mensaje, m, rcanal)
            break
        }
        
        // ==================== DEPOSITAR / RETIRAR ====================
        case 'depositar':
        case 'retirar': {
            if (!text) return conn.reply(m.chat, `☑️ Usa: .${command} [cantidad]\nEjemplo: .${command} 1000`, m, rcanal)
            let amount = parseInt(text)
            if (isNaN(amount) || amount < 1) return conn.reply(m.chat, `☑️ Cantidad inválida`, m, rcanal)
            
            if (command === 'depositar') {
                if (amount > user.money) return conn.reply(m.chat, `☑️ No tienes suficiente dinero. Tienes: ${user.money}`, m, rcanal)
                user.money -= amount
                user.bank += amount
                await conn.reply(m.chat, `🏦 *DEPÓSITO EXITOSO*\n\n💰 Depositado: ${amount}\n💵 Dinero restante: ${user.money}\n🏦 Saldo en banco: ${user.bank}`, m, rcanal)
            } else if (command === 'retirar') {
                if (amount > user.bank) return conn.reply(m.chat, `☑️ No tienes suficiente en el banco. Banco: ${user.bank}`, m, rcanal)
                user.bank -= amount
                user.money += amount
                await conn.reply(m.chat, `🏦 *RETIRO EXITOSO*\n\n💰 Retirado: ${amount}\n💵 Dinero actual: ${user.money}\n🏦 Saldo en banco: ${user.bank}`, m, rcanal)
            }
            break
        }
        
        // ==================== COMPRAR ====================
        case 'comprar': {
            if (!text) return conn.reply(m.chat, `☑️ *TIENDA RPG*\n\n📌 *Objetos disponibles:*\n▸ .comprar pocion - 500 💊\n▸ .comprar espada - 1000 ⚔️\n▸ .comprar escudo - 800 🛡️\n▸ .comprar anillo - 1500 💍\n▸ .comprar botas - 600 👢\n▸ .comprar varita - 2000 🪄\n▸ .comprar gema - 3000 💎`, m, rcanal)
            
            let item = text.toLowerCase()
            let prices = { pocion: 500, espada: 1000, escudo: 800, anillo: 1500, botas: 600, varita: 2000, gema: 3000 }
            let emojis = { pocion: '💊', espada: '⚔️', escudo: '🛡️', anillo: '💍', botas: '👢', varita: '🪄', gema: '💎' }
            
            if (!prices[item]) return conn.reply(m.chat, `☑️ Objeto no válido.\nDisponibles: pocion, espada, escudo, anillo, botas, varita, gema`, m, rcanal)
            if (user.money < prices[item]) return conn.reply(m.chat, `☑️ Dinero insuficiente. Necesitas: ${prices[item]}`, m, rcanal)
            
            user.money -= prices[item]
            if (!user.inventory) user.inventory = {}
            user.inventory[item] = (user.inventory[item] || 0) + 1
            
            await conn.reply(m.chat, `🛒 *COMPRA EXITOSA* ${emojis[item]}\n\n📦 Item: ${item}\n💰 Precio: ${prices[item]}\n💵 Saldo restante: ${user.money}\n📦 Cantidad: ${user.inventory[item]}`, m, rcanal)
            await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
            break
        }
        
        // ==================== RECLAMAR CADA HORA ====================
        case 'reclamar': {
            let cooldown = 3600000 // 1 hora
            if (time - user.lastclaim < cooldown) {
                let remaining = msToTime(cooldown - (time - user.lastclaim))
                return conn.reply(m.chat, `☑️ Ya reclamaste tu recompensa. Espera ${remaining}`, m, rcanal)
            }
            let reward = Math.floor(Math.random() * 1000) + 500
            let diamantes = Math.floor(Math.random() * 5) + 1
            user.money += reward
            user.diamond = (user.diamond || 0) + diamantes
            user.lastclaim = time
            await conn.reply(m.chat, `🎁 *RECOMPENSA RECLAMADA*\n\n💰 Monedas: +${reward}\n💎 Diamantes: +${diamantes}\n💵 Saldo: ${user.money}\n💎 Diamantes: ${user.diamond}`, m, rcanal)
            await conn.sendMessage(m.chat, { react: { text: '🎁', key: m.key } })
            break
        }
        
        // ==================== DIARIO ====================
        case 'diario': {
            let cooldown = 86400000 // 24 horas
            if (time - user.lastdaily < cooldown) {
                let remaining = msToTime(cooldown - (time - user.lastdaily))
                return conn.reply(m.chat, `☑️ Ya reclamaste tu recompensa diaria. Espera ${remaining}`, m, rcanal)
            }
            let reward = Math.floor(Math.random() * 5000) + 2000
            let diamantes = Math.floor(Math.random() * 15) + 5
            user.money += reward
            user.diamond = (user.diamond || 0) + diamantes
            user.lastdaily = time
            await conn.reply(m.chat, `📅 *RECOMPENSA DIARIA*\n\n💰 Monedas: +${reward}\n💎 Diamantes: +${diamantes}\n💵 Saldo: ${user.money}\n💎 Diamantes: ${user.diamond}\n\n🎉 ¡Vuelve mañana por más!`, m, rcanal)
            await conn.sendMessage(m.chat, { react: { text: '📅', key: m.key } })
            break
        }
        
        // ==================== SEMANAL ====================
        case 'semanal': {
            let cooldown = 604800000 // 7 días
            if (time - user.lastweekly < cooldown) {
                let remaining = msToTime(cooldown - (time - user.lastweekly))
                return conn.reply(m.chat, `☑️ Ya reclamaste tu recompensa semanal. Espera ${remaining}`, m, rcanal)
            }
            let reward = Math.floor(Math.random() * 20000) + 10000
            let diamantes = Math.floor(Math.random() * 50) + 20
            user.money += reward
            user.diamond = (user.diamond || 0) + diamantes
            user.lastweekly = time
            await conn.reply(m.chat, `📆 *RECOMPENSA SEMANAL*\n\n💰 Monedas: +${reward}\n💎 Diamantes: +${diamantes}\n💵 Saldo: ${user.money}\n💎 Diamantes: ${user.diamond}\n\n🎉 ¡Vuelve la próxima semana!`, m, rcanal)
            await conn.sendMessage(m.chat, { react: { text: '📆', key: m.key } })
            break
        }
        
        // ==================== MENSUAL ====================
        case 'mensual': {
            let cooldown = 2592000000 // 30 días
            if (time - user.lastmonthly < cooldown) {
                let remaining = msToTime(cooldown - (time - user.lastmonthly))
                return conn.reply(m.chat, `☑️ Ya reclamaste tu recompensa mensual. Espera ${remaining}`, m, rcanal)
            }
            let reward = Math.floor(Math.random() * 100000) + 50000
            let diamantes = Math.floor(Math.random() * 200) + 100
            user.money += reward
            user.diamond = (user.diamond || 0) + diamantes
            user.lastmonthly = time
            await conn.reply(m.chat, `🗓️ *RECOMPENSA MENSUAL*\n\n💰 Monedas: +${reward}\n💎 Diamantes: +${diamantes}\n💵 Saldo: ${user.money}\n💎 Diamantes: ${user.diamond}\n\n🎉 ¡Gracias por ser parte de Elite Bot!`, m, rcanal)
            await conn.sendMessage(m.chat, { react: { text: '🗓️', key: m.key } })
            break
        }
        
        // ==================== COFRE ====================
        case 'cofre': {
            let cooldown = 86400000 // 24 horas
            if (time - user.lastgift < cooldown) {
                let remaining = msToTime(cooldown - (time - user.lastgift))
                return conn.reply(m.chat, `☑️ Ya abriste el cofre. Espera ${remaining}`, m, rcanal)
            }
            let reward = Math.floor(Math.random() * 10000) + 2000
            let diamonds = Math.floor(Math.random() * 30) + 10
            user.money += reward
            user.diamond = (user.diamond || 0) + diamonds
            user.lastgift = time
            await conn.reply(m.chat, `🎁 *COFRE MÁGICO ABierto*\n\n💰 Monedas: +${reward}\n💎 Diamantes: +${diamonds}\n💵 Saldo: ${user.money}\n💎 Diamantes: ${user.diamond}`, m, rcanal)
            await conn.sendMessage(m.chat, { react: { text: '🎁', key: m.key } })
            break
        }
        
        // ==================== DAR ====================
        case 'dar': {
            let mentionedJid = await m.mentionedJid
            let usuario = mentionedJid && mentionedJid.length ? mentionedJid[0] : null
            if (!usuario) return conn.reply(m.chat, `☑️ Menciona al usuario\nEjemplo: .dar 1000 @usuario`, m, rcanal)
            if (!text) return conn.reply(m.chat, `☑️ Usa: .dar [cantidad] @usuario`, m, rcanal)
            
            let amount = parseInt(text.split(' ')[0])
            if (isNaN(amount) || amount < 1) return conn.reply(m.chat, `☑️ Cantidad inválida`, m, rcanal)
            if (amount > user.money) return conn.reply(m.chat, `☑️ No tienes suficiente dinero. Tienes: ${user.money}`, m, rcanal)
            
            let targetUser = global.db.data.users[usuario]
            if (!targetUser) targetUser = global.db.data.users[usuario] = { money: 0 }
            
            user.money -= amount
            targetUser.money += amount
            
            let nombre = await conn.getName(usuario)
            await conn.reply(m.chat, `💰 *TRANSFERENCIA*\n\n📤 Enviaste: ${amount} a ${nombre}\n💵 Saldo restante: ${user.money}`, m, rcanal)
            await conn.sendMessage(m.chat, { react: { text: '💰', key: m.key } })
            break
        }
        
        // ==================== DAR DIAMANTES ====================
        case 'dardiamantes': {
            let mentionedJid = await m.mentionedJid
            let usuario = mentionedJid && mentionedJid.length ? mentionedJid[0] : null
            if (!usuario) return conn.reply(m.chat, `☑️ Menciona al usuario\nEjemplo: .dardiamantes 5 @usuario`, m, rcanal)
            if (!text) return conn.reply(m.chat, `☑️ Usa: .dardiamantes [cantidad] @usuario`, m, rcanal)
            
            let amount = parseInt(text.split(' ')[0])
            if (isNaN(amount) || amount < 1) return conn.reply(m.chat, `☑️ Cantidad inválida`, m, rcanal)
            if (amount > (user.diamond || 0)) return conn.reply(m.chat, `☑️ No tienes suficientes diamantes. Tienes: ${user.diamond || 0}`, m, rcanal)
            
            let targetUser = global.db.data.users[usuario]
            if (!targetUser) targetUser = global.db.data.users[usuario] = { diamond: 0 }
            
            user.diamond -= amount
            targetUser.diamond = (targetUser.diamond || 0) + amount
            
            let nombre = await conn.getName(usuario)
            await conn.reply(m.chat, `💎 *TRANSFERENCIA DE DIAMANTES*\n\n📤 Enviaste: ${amount} a ${nombre}\n💎 Diamantes restantes: ${user.diamond}`, m, rcanal)
            await conn.sendMessage(m.chat, { react: { text: '💎', key: m.key } })
            break
        }
        
        // ==================== DAR DOLARES ====================
        case 'dardolares': {
            let mentionedJid = await m.mentionedJid
            let usuario = mentionedJid && mentionedJid.length ? mentionedJid[0] : null
            if (!usuario) return conn.reply(m.chat, `☑️ Menciona al usuario\nEjemplo: .dardolares 10 @usuario`, m, rcanal)
            if (!text) return conn.reply(m.chat, `☑️ Usa: .dardolares [cantidad] @usuario`, m, rcanal)
            
            let amount = parseInt(text.split(' ')[0])
            if (isNaN(amount) || amount < 1) return conn.reply(m.chat, `☑️ Cantidad inválida`, m, rcanal)
            if (amount > (user.dollar || 0)) return conn.reply(m.chat, `☑️ No tienes suficientes dólares. Tienes: ${user.dollar || 0}`, m, rcanal)
            
            let targetUser = global.db.data.users[usuario]
            if (!targetUser) targetUser = global.db.data.users[usuario] = { dollar: 0 }
            
            user.dollar -= amount
            targetUser.dollar = (targetUser.dollar || 0) + amount
            
            let nombre = await conn.getName(usuario)
            await conn.reply(m.chat, `💵 *TRANSFERENCIA DE DÓLARES*\n\n📤 Enviaste: ${amount} a ${nombre}\n💵 Dólares restantes: ${user.dollar || 0}`, m, rcanal)
            await conn.sendMessage(m.chat, { react: { text: '💵', key: m.key } })
            break
        }
        
        // ==================== MINAR ====================
        case 'minar':
        case 'minar2':
        case 'minar3': {
            let cooldown = 300000 // 5 minutos
            if (time - user.lastmining < cooldown) {
                let remaining = msToTime(cooldown - (time - user.lastmining))
                return conn.reply(m.chat, `☑️ Ya minaste. Espera ${remaining}`, m, rcanal)
            }
            let reward = Math.floor(Math.random() * 500) + 200
            let diamonds = Math.floor(Math.random() * 5) + 1
            user.money += reward
            user.diamond = (user.diamond || 0) + diamonds
            user.lastmining = time
            
            let nombres = { minar: '⛏️ MINERO', minar2: '🪓 MINADOR AVANZADO', minar3: '🔨 MINADOR EXPERTO' }
            await conn.reply(m.chat, `${nombres[command]}\n\n💰 Monedas: +${reward}\n💎 Diamantes: +${diamonds}\n💵 Saldo: ${user.money}\n💎 Diamantes: ${user.diamond}`, m, rcanal)
            await conn.sendMessage(m.chat, { react: { text: '⛏️', key: m.key } })
            break
        }
        
        // ==================== ROBAR ====================
        case 'robar': {
            let mentionedJid = await m.mentionedJid
            let usuario = mentionedJid && mentionedJid.length ? mentionedJid[0] : null
            if (!usuario) return conn.reply(m.chat, `☑️ Menciona a quién quieres robar\nEjemplo: .robar @usuario`, m, rcanal)
            if (usuario === m.sender) return conn.reply(m.chat, `☑️ No puedes robarte a ti mismo`, m, rcanal)
            
            let targetUser = global.db.data.users[usuario]
            if (!targetUser || targetUser.money < 500) return conn.reply(m.chat, `☑️ El usuario no tiene suficiente dinero (mínimo 500)`, m, rcanal)
            
            let success = Math.random() > 0.5
            if (success) {
                let stolen = Math.floor(Math.random() * (targetUser.money * 0.3)) + 100
                stolen = Math.min(stolen, targetUser.money)
                targetUser.money -= stolen
                user.money += stolen
                await conn.reply(m.chat, `🕵️ *ROBO EXITOSO*\n\n💰 Robaste: ${stolen}\n💵 Saldo actual: ${user.money}`, m, rcanal)
                await conn.sendMessage(m.chat, { react: { text: '🕵️', key: m.key } })
            } else {
                let penalty = Math.floor(Math.random() * 300) + 100
                user.money -= penalty
                await conn.reply(m.chat, `🚨 *ROBO FALLIDO*\n\n💔 Perdiste: ${penalty}\n💵 Saldo actual: ${user.money}`, m, rcanal)
                await conn.sendMessage(m.chat, { react: { text: '🚨', key: m.key } })
            }
            break
        }
        
        // ==================== TRABAJAR ====================
        case 'trabajar': {
            let cooldown = 1800000 // 30 minutos
            if (time - user.lastwork < cooldown) {
                let remaining = msToTime(cooldown - (time - user.lastwork))
                return conn.reply(m.chat, `☑️ Ya trabajaste. Espera ${remaining}`, m, rcanal)
            }
            let jobs = ['Programador', 'Camarero', 'Taxista', 'Mecánico', 'Profesor', 'Doctor', 'Policía', 'Bombero', 'Ingeniero', 'Chef', 'Cajero', 'Repartidor']
            let job = jobs[Math.floor(Math.random() * jobs.length)]
            let reward = Math.floor(Math.random() * 800) + 300
            user.money += reward
            user.lastwork = time
            await conn.reply(m.chat, `💼 *TRABAJO REALIZADO*\n\n📌 Trabajo: ${job}\n💰 Ganaste: ${reward}\n💵 Saldo actual: ${user.money}`, m, rcanal)
            await conn.sendMessage(m.chat, { react: { text: '💼', key: m.key } })
            break
        }
        
        // ==================== MIRAR ANJO ====================
        case 'miranjo': {
            let mensajes = [
                "😇 Ves un ángel brillante en la distancia",
                "👼 Una luz celestial te ilumina el camino",
                "✨ Sientes una paz profunda en tu corazón",
                "🌟 Una pluma blanca cae del cielo",
                "💫 Escuchas un canto celestial",
                "⭐ El aura de un ángel te protege",
                "🕊️ Un ser alado vuela sobre ti",
                "🌙 La luz de la luna te da esperanza"
            ]
            let randomMsg = mensajes[Math.floor(Math.random() * mensajes.length)]
            await conn.reply(m.chat, `☑️ *MIRANDO AL CIELO*\n\n${randomMsg}`, m, rcanal)
            await conn.sendMessage(m.chat, { react: { text: '😇', key: m.key } })
            break
        }
    }
}

function msToTime(ms) {
    if (ms <= 0) return 'Disponible'
    let d = Math.floor(ms / 86400000)
    let h = Math.floor(ms / 3600000) % 24
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    let result = []
    if (d > 0) result.push(`${d} días`)
    if (h > 0) result.push(`${h} horas`)
    if (m > 0) result.push(`${m} minutos`)
    if (s > 0) result.push(`${s} segundos`)
    return result.length ? result.join(' y ') : '0 segundos'
}

handler.command = [
    'banco', 'bancorpg', 'apostar', 'balance', 'bal', 'depositar', 'retirar',
    'comprar', 'reclamar', 'diario', 'semanal', 'mensual', 'cofre', 'dar',
    'dardiamantes', 'dardolares', 'minar', 'minar2', 'minar3', 'robar',
    'trabajar', 'miranjo'
]
handler.group = true

export default handler
