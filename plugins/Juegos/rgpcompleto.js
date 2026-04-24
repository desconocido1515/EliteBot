// plugins/rpg_completo.js

let handler = async (m, { conn, command, text, usedPrefix }) => {
    let user = global.db.data.users[m.sender]
    if (!user) user = global.db.data.users[m.sender] = { exp: 0, money: 0, bank: 0, diamond: 0, limit: 0, lastclaim: 0, lastwork: 0, lastmining: 0, lastrob: 0, lastgift: 0 }
    
    const time = new Date().getTime()
    
    switch (command) {
        
        // ==================== APOSTAR ====================
        case 'rpgapostar': {
            if (!text) return conn.reply(m.chat, `☑️ *APOSTAR*\n\nUsa: .rpgapostar [cantidad]\nEjemplo: .rpgapostar 1000`, m, rcanal)
            let amount = parseInt(text)
            if (isNaN(amount) || amount < 100) return conn.reply(m.chat, `☑️ Cantidad mínima: 100`, m, rcanal)
            if (amount > user.money) return conn.reply(m.chat, `☑️ No tienes suficiente dinero. Tienes: ${user.money}`, m, rcanal)
            
            let result = Math.random()
            let win = result > 0.5
            if (win) {
                let winAmount = amount * 2
                user.money += winAmount
                await conn.reply(m.chat, `🎲 *APUESTA GANADA*\n\n💰 Apostaste: ${amount}\n🎉 Ganaste: ${winAmount}\n💵 Saldo actual: ${user.money}`, m, rcanal)
            } else {
                user.money -= amount
                await conn.reply(m.chat, `🎲 *APUESTA PERDIDA*\n\n💰 Apostaste: ${amount}\n💔 Perdiste: ${amount}\n💵 Saldo actual: ${user.money}`, m, rcanal)
            }
            break
        }
        
        // ==================== BALANCE ====================
        case 'rpgbalance':
        case 'rpgbalance2': {
            let nombre = await conn.getName(m.sender)
            let mensaje = `☑️ *BALANCE DE ${nombre.toUpperCase()}*
            
💵 *Dinero:* ${user.money || 0}
🏦 *Banco:* ${user.bank || 0}
💎 *Diamantes:* ${user.diamond || 0}
📊 *Exp:* ${user.exp || 0}
🎫 *Límite:* ${user.limit || 0}

━━━━━━━━━━━━━━━━━━━
© Elite Bot Global - Since 2023®`
            await conn.reply(m.chat, mensaje, m, rcanal)
            break
        }
        
        // ==================== BANCO ====================
        case 'rpgbanco': {
            if (!text) return conn.reply(m.chat, `☑️ *BANCO*\n\nUsa:\n.depositar [cantidad]\n.retirar [cantidad]\n.banco`, m, rcanal)
            let [action, amount] = text.split(' ')
            amount = parseInt(amount)
            if (isNaN(amount)) return conn.reply(m.chat, `☑️ Cantidad inválida`, m, rcanal)
            
            if (action === 'depositar') {
                if (amount > user.money) return conn.reply(m.chat, `☑️ No tienes suficiente dinero`, m, rcanal)
                user.money -= amount
                user.bank += amount
                await conn.reply(m.chat, `🏦 *DEPÓSITO EXITOSO*\n\n💰 Depositado: ${amount}\n💵 Dinero restante: ${user.money}\n🏦 Saldo en banco: ${user.bank}`, m, rcanal)
            } else if (action === 'retirar') {
                if (amount > user.bank) return conn.reply(m.chat, `☑️ No tienes suficiente en el banco`, m, rcanal)
                user.bank -= amount
                user.money += amount
                await conn.reply(m.chat, `🏦 *RETIRO EXITOSO*\n\n💰 Retirado: ${amount}\n💵 Dinero actual: ${user.money}\n🏦 Saldo en banco: ${user.bank}`, m, rcanal)
            }
            break
        }
        
        // ==================== COMPRAR ====================
        case 'rpgbuy': {
            if (!text) return conn.reply(m.chat, `☑️ *TIENDA RPG*\n\n📌 Objetos disponibles:\n▸ .rpgbuy pocion - 500\n▸ .rpgbuy espada - 1000\n▸ .rpgbuy escudo - 800\n▸ .rpgbuy anillo - 1500\n▸ .rpgbuy botas - 600`, m, rcanal)
            
            let item = text.toLowerCase()
            let prices = { pocion: 500, espada: 1000, escudo: 800, anillo: 1500, botas: 600 }
            
            if (!prices[item]) return conn.reply(m.chat, `☑️ Objeto no válido`, m, rcanal)
            if (user.money < prices[item]) return conn.reply(m.chat, `☑️ Dinero insuficiente. Necesitas: ${prices[item]}`, m, rcanal)
            
            user.money -= prices[item]
            if (!user.inventory) user.inventory = {}
            user.inventory[item] = (user.inventory[item] || 0) + 1
            
            await conn.reply(m.chat, `🛒 *COMPRA EXITOSA*\n\n📦 Item: ${item}\n💰 Precio: ${prices[item]}\n💵 Saldo restante: ${user.money}\n📦 Cantidad: ${user.inventory[item]}`, m, rcanal)
            break
        }
        
        // ==================== RECLAMAR ====================
        case 'rpgclaim': {
            let cooldown = 3600000 // 1 hora
            if (time - user.lastclaim < cooldown) {
                let remaining = msToTime(cooldown - (time - user.lastclaim))
                return conn.reply(m.chat, `☑️ Ya reclamaste tu recompensa. Espera ${remaining}`, m, rcanal)
            }
            let reward = Math.floor(Math.random() * 1000) + 500
            user.money += reward
            user.lastclaim = time
            await conn.reply(m.chat, `🎁 *RECOMPENSA RECLAMADA*\n\n💰 Recibiste: ${reward}\n💵 Saldo actual: ${user.money}`, m, rcanal)
            break
        }
        
        // ==================== COFRE ====================
        case 'rpgcofre': {
            let cooldown = 86400000 // 24 horas
            if (time - user.lastgift < cooldown) {
                let remaining = msToTime(cooldown - (time - user.lastgift))
                return conn.reply(m.chat, `☑️ Ya abriste el cofre. Espera ${remaining}`, m, rcanal)
            }
            let reward = Math.floor(Math.random() * 5000) + 1000
            let diamonds = Math.floor(Math.random() * 10) + 1
            user.money += reward
            user.diamond = (user.diamond || 0) + diamonds
            user.lastgift = time
            await conn.reply(m.chat, `🎁 *COFRE MÁGICO*\n\n💰 Monedas: +${reward}\n💎 Diamantes: +${diamonds}\n💵 Saldo: ${user.money}\n💎 Diamantes: ${user.diamond}`, m, rcanal)
            break
        }
        
        // ==================== DAR COINS ====================
        case 'rpgdarcoins': {
            let mentionedJid = await m.mentionedJid
            let usuario = mentionedJid && mentionedJid.length ? mentionedJid[0] : null
            if (!usuario) return conn.reply(m.chat, `☑️ Menciona al usuario`, m, rcanal)
            if (!text) return conn.reply(m.chat, `☑️ Usa: .transfer [cantidad] @usuario`, m, rcanal)
            
            let amount = parseInt(text.split(' ')[0])
            if (isNaN(amount) || amount < 1) return conn.reply(m.chat, `☑️ Cantidad inválida`, m, rcanal)
            if (amount > user.money) return conn.reply(m.chat, `☑️ No tienes suficiente dinero`, m, rcanal)
            
            let targetUser = global.db.data.users[usuario]
            if (!targetUser) targetUser = global.db.data.users[usuario] = { money: 0 }
            
            user.money -= amount
            targetUser.money += amount
            
            let nombre = await conn.getName(usuario)
            await conn.reply(m.chat, `💰 *TRANSFERENCIA EXITOSA*\n\n📤 Enviaste: ${amount} a ${nombre}\n💵 Saldo restante: ${user.money}`, m, rcanal)
            break
        }
        
        // ==================== DAR DIAMANTES ====================
        case 'rpgdardiamantes': {
            let mentionedJid = await m.mentionedJid
            let usuario = mentionedJid && mentionedJid.length ? mentionedJid[0] : null
            if (!usuario) return conn.reply(m.chat, `☑️ Menciona al usuario`, m, rcanal)
            if (!text) return conn.reply(m.chat, `☑️ Usa: .dardiamantes [cantidad] @usuario`, m, rcanal)
            
            let amount = parseInt(text.split(' ')[0])
            if (isNaN(amount) || amount < 1) return conn.reply(m.chat, `☑️ Cantidad inválida`, m, rcanal)
            if (amount > (user.diamond || 0)) return conn.reply(m.chat, `☑️ No tienes suficientes diamantes`, m, rcanal)
            
            let targetUser = global.db.data.users[usuario]
            if (!targetUser) targetUser = global.db.data.users[usuario] = { diamond: 0 }
            
            user.diamond -= amount
            targetUser.diamond = (targetUser.diamond || 0) + amount
            
            let nombre = await conn.getName(usuario)
            await conn.reply(m.chat, `💎 *TRANSFERENCIA DE DIAMANTES*\n\n📤 Enviaste: ${amount} a ${nombre}\n💎 Diamantes restantes: ${user.diamond}`, m, rcanal)
            break
        }
        
        // ==================== DAR DOLARES ====================
        case 'rpgdardolares': {
            let mentionedJid = await m.mentionedJid
            let usuario = mentionedJid && mentionedJid.length ? mentionedJid[0] : null
            if (!usuario) return conn.reply(m.chat, `☑️ Menciona al usuario`, m, rcanal)
            if (!text) return conn.reply(m.chat, `☑️ Usa: .dardolares [cantidad] @usuario`, m, rcanal)
            
            let amount = parseInt(text.split(' ')[0])
            if (isNaN(amount) || amount < 1) return conn.reply(m.chat, `☑️ Cantidad inválida`, m, rcanal)
            if (amount > (user.dollar || 0)) return conn.reply(m.chat, `☑️ No tienes suficientes dólares`, m, rcanal)
            
            let targetUser = global.db.data.users[usuario]
            if (!targetUser) targetUser = global.db.data.users[usuario] = { dollar: 0 }
            
            user.dollar -= amount
            targetUser.dollar = (targetUser.dollar || 0) + amount
            
            let nombre = await conn.getName(usuario)
            await conn.reply(m.chat, `💵 *TRANSFERENCIA DE DÓLARES*\n\n📤 Enviaste: ${amount} a ${nombre}\n💵 Dólares restantes: ${user.dollar || 0}`, m, rcanal)
            break
        }
        
        // ==================== MINAR ====================
        case 'rpgminar':
        case 'rpgminar2':
        case 'rpgminar3': {
            let cooldown = 300000 // 5 minutos
            if (time - user.lastmining < cooldown) {
                let remaining = msToTime(cooldown - (time - user.lastmining))
                return conn.reply(m.chat, `☑️ Ya minaste. Espera ${remaining}`, m, rcanal)
            }
            let reward = Math.floor(Math.random() * 300) + 100
            let diamonds = Math.floor(Math.random() * 3) + 1
            user.money += reward
            user.diamond = (user.diamond || 0) + diamonds
            user.lastmining = time
            
            let emojis = { rpgminar: '⛏️', rpgminar2: '🪓', rpgminar3: '🔨' }
            await conn.reply(m.chat, `${emojis[command]} *MINADO EXITOSO*\n\n💰 Monedas: +${reward}\n💎 Diamantes: +${diamonds}\n💵 Saldo: ${user.money}\n💎 Diamantes: ${user.diamond}`, m, rcanal)
            break
        }
        
        // ==================== ROBAR ====================
        case 'rpgrobar': {
            let mentionedJid = await m.mentionedJid
            let usuario = mentionedJid && mentionedJid.length ? mentionedJid[0] : null
            if (!usuario) return conn.reply(m.chat, `☑️ Menciona a quién quieres robar`, m, rcanal)
            if (usuario === m.sender) return conn.reply(m.chat, `☑️ No puedes robarte a ti mismo`, m, rcanal)
            
            let targetUser = global.db.data.users[usuario]
            if (!targetUser || targetUser.money < 100) return conn.reply(m.chat, `☑️ El usuario no tiene suficiente dinero`, m, rcanal)
            
            let success = Math.random() > 0.4
            if (success) {
                let stolen = Math.floor(Math.random() * (targetUser.money * 0.3)) + 50
                targetUser.money -= stolen
                user.money += stolen
                await conn.reply(m.chat, `🕵️ *ROBO EXITOSO*\n\n💰 Robaste: ${stolen}\n💵 Saldo actual: ${user.money}`, m, rcanal)
            } else {
                let penalty = Math.floor(Math.random() * 200) + 50
                user.money -= penalty
                await conn.reply(m.chat, `🚨 *ROBO FALLIDO*\n\n💔 Perdiste: ${penalty}\n💵 Saldo actual: ${user.money}`, m, rcanal)
            }
            break
        }
        
        // ==================== TRABAJAR ====================
        case 'rpgtrabajar': {
            let cooldown = 1800000 // 30 minutos
            if (time - user.lastwork < cooldown) {
                let remaining = msToTime(cooldown - (time - user.lastwork))
                return conn.reply(m.chat, `☑️ Ya trabajaste. Espera ${remaining}`, m, rcanal)
            }
            let jobs = ['Programador', 'Camarero', 'Taxista', 'Mecánico', 'Profesor', 'Doctor', 'Policía', 'Bombero']
            let job = jobs[Math.floor(Math.random() * jobs.length)]
            let reward = Math.floor(Math.random() * 500) + 200
            user.money += reward
            user.lastwork = time
            await conn.reply(m.chat, `💼 *TRABAJO REALIZADO*\n\n📌 Trabajo: ${job}\n💰 Ganaste: ${reward}\n💵 Saldo actual: ${user.money}`, m, rcanal)
            break
        }
        
        // ==================== TRANSFERIR ====================
        case 'rpgtranfe': {
            let mentionedJid = await m.mentionedJid
            let usuario = mentionedJid && mentionedJid.length ? mentionedJid[0] : null
            if (!usuario) return conn.reply(m.chat, `☑️ Menciona al usuario`, m, rcanal)
            if (!text) return conn.reply(m.chat, `☑️ Usa: .transferir [cantidad] @usuario`, m, rcanal)
            
            let amount = parseInt(text.split(' ')[0])
            if (isNaN(amount) || amount < 1) return conn.reply(m.chat, `☑️ Cantidad inválida`, m, rcanal)
            if (amount > user.money) return conn.reply(m.chat, `☑️ No tienes suficiente dinero`, m, rcanal)
            
            let targetUser = global.db.data.users[usuario]
            if (!targetUser) targetUser = global.db.data.users[usuario] = { money: 0 }
            
            user.money -= amount
            targetUser.money += amount
            
            let nombre = await conn.getName(usuario)
            await conn.reply(m.chat, `💸 *TRANSFERENCIA*\n\n📤 Enviaste: ${amount} a ${nombre}\n💵 Saldo restante: ${user.money}`, m, rcanal)
            break
        }
        
        // ==================== MIRAR ANJO ====================
        case 'rpgmiranjo': {
            let emojis = ['😇', '👼', '✨', '🌟', '💫', '⭐']
            let mensajes = [
                "Ves un ángel brillante en la distancia",
                "Una luz celestial te ilumina el camino",
                "Sientes una paz profunda en tu corazón",
                "Una pluma blanca cae del cielo",
                "Escuchas un canto celestial",
                "El aura de un ángel te protege"
            ]
            let randomMsg = mensajes[Math.floor(Math.random() * mensajes.length)]
            await conn.reply(m.chat, `${emojis[Math.floor(Math.random() * emojis.length)]} *MIRANDO AL CIELO*\n\n${randomMsg}`, m, rcanal)
            break
        }
    }
}

function msToTime(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    let result = []
    if (h > 0) result.push(`${h} horas`)
    if (m > 0) result.push(`${m} minutos`)
    if (s > 0) result.push(`${s} segundos`)
    return result.join(' y ')
}

handler.command = [
    'rpgapostar', 'rpgbalance', 'rpgbalance2', 'rpgbanco', 'rpgbuy', 'rpgclaim',
    'rpgcofre', 'rpgdarcoins', 'rpgdardiamantes', 'rpgdardolares', 'rpgminar',
    'rpgminar2', 'rpgminar3', 'rpgmiranjo', 'rpgrobar', 'rpgtrabajar', 'rpgtranfe'
]
handler.group = true

export default handler
