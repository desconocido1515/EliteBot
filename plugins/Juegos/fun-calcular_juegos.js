let handler = async (m, { conn, command, text, usedPrefix }) => {
    
    // Validar que haya texto
    if (!text) throw `${lenguajeGB['smsAvisoMG']()}𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝙀 @𝙏𝘼𝙂 𝙊 𝙀𝙎𝘾𝙍𝙄𝘽𝘼 𝙀𝙇 𝙉𝙊𝙈𝘽𝙍𝙀\n𝙏𝘼𝙂 𝙎𝙊𝙈𝙀𝙊𝙉𝙀 @𝙏𝘼𝙂 𝙊𝙍 𝙏𝙔𝙋𝙀 𝙏𝙃𝙀 𝙉𝘼𝙈𝙀`
    
    // Función para generar porcentaje aleatorio
    const randomPercent = () => Math.floor(Math.random() * 101)
    
    // Obtener el nombre/etiqueta del objetivo (igual que en duo/compe)
    let targetTag = text.toUpperCase()
    let mentions = []
    
    // Si el texto contiene una mención (@algo), extraer el JID si existe
    if (m.mentionedJid && m.mentionedJid.length > 0) {
        mentions = m.mentionedJid
        targetTag = '@' + mentions[0].split('@')[0]
    }
    
    const percent = randomPercent()
    let texto = ''
    
    // ========== GAY2 ==========
    if (command == 'gay2') {
        texto = `_*${targetTag}* *ES* *${percent}%* *GAY*_ 🏳️‍🌈`
    }
    
    // ========== LESBIANA ==========
    else if (command == 'lesbiana') {
        texto = `_*${targetTag}* *ES* *${percent}%* *LESBIANA*_ 🏳️‍🌈`
    }
    
    // ========== PAJERO ==========
    else if (command == 'pajero') {
        texto = `_*${targetTag}* *ES* *${percent}%* *PAJERO*_ 😏💦`
    }
    
    // ========== TETONA ==========
    else if (command == 'tetona') {
        texto = `_*${targetTag}* *ES* *${percent}%* *TETONA*,🍒 *EMPODERADA Y PUTA, MAS INFORMACIÓN A SU PRIVADO.😈*_`
    }
    
    // ========== COGIBLE ==========
    else if (command == 'cogible') {
        texto = `_*${targetTag}* *ES* *${percent}%* *COGIBLE*,🥵 *NECESITA COGER YA !! ESCRIBILE AL PRIV.😈*_`
    }
    
    // ========== CULONA ==========
    else if (command == 'culona') {
        texto = `_*${targetTag}* *ES* *${percent}%* *CULONA*,🍑 *NECESITA UNA NALGUEADA, MAS INFORMACIÓN A SU PRIVADO.😈*_`
    }
    
    // ========== COLORCARTON ==========
    else if (command == 'colorcarton') {
        texto = `_*${targetTag}* *ES* *${percent}%* *COLOR CARTON*,🧑🏿‍🦲 *HECHATE CREMITA DE ARROZ.🍚*_`
    }
    
    // ========== DURARCAMA ==========
    else if (command == 'durarcama') {
        texto = `_*${targetTag}* *TU DURACIÓN EN LA CAMA ES DE* *${percent}* *MINUTOS.🥵*_`
    }
    
    // ========== MEDIR NEPE ==========
    else if (command == 'medirnepe') {
        let nepeSize = Math.floor(Math.random() * 31)
        texto = `_*EL TAMAÑO DEL NEPE DE ${targetTag}* *ES DE* *${nepeSize}* *CENTÍMETROS 🍆💦*_`
    }
    
    // ========== PAJERA ==========
    else if (command == 'pajera') {
        texto = `_*${targetTag}* *ES* *${percent}%* *PAJERA*_ 😏💦`
    }
    
    // ========== PUT0 ==========
    else if (command == 'puto') {
        texto = `_*${targetTag}* *ES* *${percent}%* *PUTO*, *MÁS INFORMACIÓN A SU PRIVADO 🔥🥵 XD*_`
    }
    
    // ========== PUTA ==========
    else if (command == 'puta') {
        texto = `_*${targetTag}* *ES* *${percent}%* *PUTA*, *MÁS INFORMACIÓN A SU PRIVADO 🔥🥵 XD*_`
    }
    
    // ========== MANCO ==========
    else if (command == 'manco') {
        texto = `_*${targetTag}* *ES* *${percent}%* *MANCO 💩*_`
    }
    
    // ========== MANCA ==========
    else if (command == 'manca') {
        texto = `_*${targetTag}* *ES* *${percent}%* *MANCA 💩*_`
    }
    
    // ========== RATA ==========
    else if (command == 'rata') {
        texto = `_*${targetTag}* *ES* *${percent}%* *RATA 🐁 COME QUESO 🧀*_`
    }
    
    // ========== PROSTITUTO ==========
    else if (command == 'prostituto') {
        texto = `_*${targetTag}* *ES* *${percent}%* *PROSTITUTO 🫦👅, QUIEN QUIERE DE SUS SERVICIOS? XD*_`
    }
    
    // ========== PROSTITUTA ==========
    else if (command == 'prostituta') {
        texto = `_*${targetTag}* *ES* *${percent}%* *PROSTITUTA 🫦👅, QUIEN QUIERE DE SUS SERVICIOS? XD*_`
    }
    
    // ========== LOVE ==========
    else if (command == 'love') {
        texto = `*❣️❣️ MEDIDOR DE AMOR ❣️❣️*\n*_El amor de ${targetTag} ES DE ${percent}% Deberias pedirle que sea tu novia/o ?_*`
    }
    
    // Enviar mensaje IGUAL que en duo/compe
    if (texto) {
        await conn.sendMessage(m.chat, { text: texto, mentions: mentions }, { quoted: m })
    }
}

handler.help = ['love', 'gay2', 'tetona', 'cogible', 'medirnepe', 'culona', 'durarcama', 'colorcarton', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'manco', 'manca', 'rata', 'prostituta', 'prostituto'].map(v => v + ' @tag | nombre')
handler.tags = ['calculator']
handler.command = /^love|gay2|culona|tetona|cogible|medirnepe|durarcama|colorcarton|lesbiana|pajero|pajera|puto|puta|manco|manca|rata|prostituta|prostituto/i
handler.exp = 100

export default handler
