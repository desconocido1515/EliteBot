// plugins/porcentajes.js

let handler = async (m, { conn, command, text, usedPrefix }) => {
    
    // Validar que haya texto o mención
    if (!text && !m.mentionedJid) {
        return conn.reply(m.chat, `☑️ 𝙴𝚃𝙸𝚀𝚄𝙴𝚃𝙰 @𝚃𝙰𝙶 𝙾 𝙴𝚂𝙲𝚁𝙸𝙱𝙴 𝙴𝙻 𝙽𝙾𝙼𝙱𝚁𝙴\n\n📌 *Ejemplo:*\n.${command} @usuario`, m, rcanal)
    }
    
    // Función para generar porcentaje aleatorio
    const randomPercent = () => Math.floor(Math.random() * 101)
    
    // Usar la misma lógica de mención que en interacciones
    let mentionedJid = await m.mentionedJid
    let usuario = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null
    
    let targetTag = text.toUpperCase()
    let mentions = []
    
    if (usuario) {
        mentions = [usuario]
        targetTag = '@' + usuario.split('@')[0]
    } else if (m.mentionedJid && m.mentionedJid.length > 0) {
        mentions = m.mentionedJid
        targetTag = '@' + mentions[0].split('@')[0]
    } else {
        // Si no hay mención, usar el texto como nombre
        targetTag = text.toUpperCase()
    }
    
    const percent = randomPercent()
    let texto = ''
    
    // Reacción según el comando
    let emoji = '🎲'
    
    // ========== GAY2 ==========
    if (command == 'gay2') {
        texto = `_*${targetTag}* *ES* *${percent}%* *GAY*_ 🏳️‍🌈`
        emoji = '🏳️‍🌈'
    }
    
    // ========== LESBIANA ==========
    else if (command == 'lesbiana') {
        texto = `_*${targetTag}* *ES* *${percent}%* *LESBIANA*_ 🏳️‍🌈`
        emoji = '🏳️‍🌈'
    }
    
    // ========== PAJERO ==========
    else if (command == 'pajero') {
        texto = `_*${targetTag}* *ES* *${percent}%* *PAJERO*_ 😏💦`
        emoji = '😏'
    }
    
    // ========== TETONA ==========
    else if (command == 'tetona') {
        texto = `_*${targetTag}* *ES* *${percent}%* *TETONA*,🍒 *EMPODERADA Y PUTA, MAS INFORMACIÓN A SU PRIVADO.😈*_`
        emoji = '🍒'
    }
    
    // ========== COGIBLE ==========
    else if (command == 'cogible') {
        texto = `_*${targetTag}* *ES* *${percent}%* *COGIBLE*,🥵 *NECESITA COGER YA !! ESCRIBILE AL PRIV.😈*_`
        emoji = '🥵'
    }
    
    // ========== CULONA ==========
    else if (command == 'culona') {
        texto = `_*${targetTag}* *ES* *${percent}%* *CULONA*,🍑 *NECESITA UNA NALGUEADA, MAS INFORMACIÓN A SU PRIVADO.😈*_`
        emoji = '🍑'
    }
    
    // ========== COLORCARTON ==========
    else if (command == 'colorcarton') {
        texto = `_*${targetTag}* *ES* *${percent}%* *COLOR CARTON*,🧑🏿‍🦲 *HECHATE CREMITA DE ARROZ.🍚*_`
        emoji = '🧑🏿‍🦲'
    }
    
    // ========== DURARCAMA ==========
    else if (command == 'durarcama') {
        texto = `_*${targetTag}* *TU DURACIÓN EN LA CAMA ES DE* *${percent}* *MINUTOS.🥵*_`
        emoji = '🛏️'
    }
    
    // ========== MEDIR NEPE ==========
    else if (command == 'medirnepe') {
        let nepeSize = Math.floor(Math.random() * 31)
        texto = `_*EL TAMAÑO DEL NEPE DE ${targetTag}* *ES DE* *${nepeSize}* *CENTÍMETROS 🍆💦*_`
        emoji = '🍆'
    }
    
    // ========== PAJERA ==========
    else if (command == 'pajera') {
        texto = `_*${targetTag}* *ES* *${percent}%* *PAJERA*_ 😏💦`
        emoji = '😏'
    }
    
    // ========== PUT0 ==========
    else if (command == 'puto') {
        texto = `_*${targetTag}* *ES* *${percent}%* *PUTO*, *MÁS INFORMACIÓN A SU PRIVADO 🔥🥵 XD*_`
        emoji = '🔥'
    }
    
    // ========== PUTA ==========
    else if (command == 'puta') {
        texto = `_*${targetTag}* *ES* *${percent}%* *PUTA*, *MÁS INFORMACIÓN A SU PRIVADO 🔥🥵 XD*_`
        emoji = '🔥'
    }
    
    // ========== MANCO ==========
    else if (command == 'manco') {
        texto = `_*${targetTag}* *ES* *${percent}%* *MANCO 💩*_`
        emoji = '💩'
    }
    
    // ========== MANCA ==========
    else if (command == 'manca') {
        texto = `_*${targetTag}* *ES* *${percent}%* *MANCA 💩*_`
        emoji = '💩'
    }
    
    // ========== RATA ==========
    else if (command == 'rata') {
        texto = `_*${targetTag}* *ES* *${percent}%* *RATA 🐁 COME QUESO 🧀*_`
        emoji = '🐀'
    }
    
    // ========== PROSTITUTO ==========
    else if (command == 'prostituto') {
        texto = `_*${targetTag}* *ES* *${percent}%* *PROSTITUTO 🫦👅, QUIEN QUIERE DE SUS SERVICIOS? XD*_`
        emoji = '🫦'
    }
    
    // ========== PROSTITUTA ==========
    else if (command == 'prostituta') {
        texto = `_*${targetTag}* *ES* *${percent}%* *PROSTITUTA 🫦👅, QUIEN QUIERE DE SUS SERVICIOS? XD*_`
        emoji = '🫦'
    }
    
    // ========== LOVE ==========
    else if (command == 'love') {
        texto = `*❣️❣️ MEDIDOR DE AMOR ❣️❣️*\n*_El amor de ${targetTag} ES DE ${percent}% Deberias pedirle que sea tu novia/o ?_*`
        emoji = '💕'
    }
    
    // Enviar reacción y mensaje
    if (texto) {
        await conn.sendMessage(m.chat, { react: { text: emoji, key: m.key } })
        await conn.reply(m.chat, texto, m, rcanal)
    }
}

handler.help = ['love', 'gay2', 'tetona', 'cogible', 'medirnepe', 'culona', 'durarcama', 'colorcarton', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'manco', 'manca', 'rata', 'prostituta', 'prostituto'].map(v => v + ' @tag | nombre')
handler.tags = ['calculator']
handler.command = /^love|gay2|culona|tetona|cogible|medirnepe|durarcama|colorcarton|lesbiana|pajero|pajera|puto|puta|manco|manca|rata|prostituta|prostituto/i
handler.exp = 100

export default handler
