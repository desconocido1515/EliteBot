// plugins/reglas_vestimenta.js

// ==================== PLUGIN 1: VESTIMENTA ====================
var handler1 = async (m, { conn, command, args, usedPrefix, DevMode }) => {
    let fkontak = { 
        "key": { 
            "participants": "0@s.whatsapp.net", 
            "remoteJid": "status@broadcast", 
            "fromMe": false, 
            "id": "Halo" 
        }, 
        "message": { 
            "contactMessage": { 
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            }
        }, 
        "participant": "0@s.whatsapp.net" 
    }
    
    // Reaccionar al mensaje
    await conn.sendMessage(m.chat, {
        react: { text: '👕', key: m.key }
    })
    
    // Ruta fija de la imagen
    let pp = './media/menus/vestimentacuadri.jpg'
    
    const cat = `» 𝙑𝙀𝙎𝙏𝙄𝙈𝙀𝙉𝙏𝘼𝙎 & 𝙋𝙊𝙎𝙄𝘾𝙄𝙊𝙉𝙀𝙎 👕`
    
    await conn.sendFile(m.chat, pp, 'vestimentacuadri.jpg', cat, fkontak)
}

// ==================== PLUGIN 2: REGLAS VK ====================
let handler2 = async(m, { user, isOwner, isAdmin, conn, text, participants, args, command }) => {
    if (!(isAdmin || isOwner || user)) {
        return conn.reply(m.chat, `☑️ 𝙽𝙴𝙲𝙴𝚂𝙸𝚃𝙰𝚂 𝚂𝙴𝚁 𝙰𝙳𝙼𝙸𝙽 𝙿𝙰𝚁𝙰 𝚄𝚂𝙰𝚁 𝙴𝚂𝚃𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾`, m, rcanal)
    }
    
    let pesan = args.join` `
    let oi = `VK OFF ${pesan}`
    let teks = `${oi}\n\n`
    teks += `_Reglas Generales_\n\n`
    teks += `1. Respeto: Todos los miembros deben respetarse entre sí, sin importar rango o experiencia.\n`
    teks += `2. Comunicación: La comunicación debe ser clara y respetuosa en todos los canales del clan.\n`
    teks += `3. Colaboración: Los miembros deben trabajar juntos para alcanzar los objetivos del clan.\n\n`
    teks += `_Reglas de Conducta_\n\n`
    teks += `1. No se tolerará el acoso, insultos o discriminación hacia otros miembros.\n`
    teks += `2. No se permitirá el spam, publicidad no autorizada o difusión de información falsa.\n`
    teks += `3. No se tolerará el uso de lenguaje ofensivo o inapropiado.\n`
    teks += `4. No se permitirá la difusión de contenido explícito, incluyendo:\n`
    teks += `- Pornografía\n`
    teks += `- Pornografía infantil\n`
    teks += `- Gore\n`
    teks += `- Contenido violento o sangriento\n`
    teks += `- Imágenes o videos explícitos\n`
    teks += `- Stickers o GIFs inapropiados\n\n`
    teks += `_Reglas de Juego_\n\n`
    teks += `1. Los miembros deben seguir las reglas del juego y no utilizar trucos o hacks.\n`
    teks += `2. Los miembros deben participar en eventos y actividades del clan de manera activa.\n`
    teks += `3. Los miembros deben contribuir al crecimiento y mejora del clan.\n\n`
    teks += `_Reglas de Liderazgo_\n\n`
    teks += `1. Los líderes deben ser justos y transparentes en sus decisiones.\n`
    teks += `2. Los líderes deben comunicar cambios y actualizaciones a los miembros.\n`
    teks += `3. Los líderes deben resolver conflictos de manera justa y rápida.\n\n`
    teks += `_Sanciones_\n\n`
    teks += `1. Advertencia verbal para infracciones menores.\n`
    teks += `2. Suspensión temporal para infracciones graves.\n`
    teks += `3. Expulsión permanente por infracciones repetidas o graves, incluyendo la difusión de contenido explícito.\n\n`
    teks += `_Proceso de Reclamaciones_\n\n`
    teks += `1. Los miembros pueden presentar reclamaciones a contacto que se llama valak.\n`
    teks += `2. Los líderes deben investigar y resolver reclamaciones de manera justa.\n`
    teks += `3. Los miembros pueden apelar decisiones a un líder superior.`
    
    await conn.reply(m.chat, teks, m, rcanal)
}

// ==================== HANDLER UNIFICADO ====================
let handler = async (m, { conn, command, args, usedPrefix, DevMode, user, isOwner, isAdmin, text, participants }) => {
    if (command === 'vestimencuadri') {
        return handler1(m, { conn, command, args, usedPrefix, DevMode })
    }
    
    if (command === 'reglasvk') {
        return handler2(m, { user, isOwner, isAdmin, conn, text, participants, args, command })
    }
}

handler.help = ['vestimencuadri', 'reglasvk']
handler.tags = ['info', 'group']
handler.command = /^(vestimencuadri|reglasvk)$/i

export default handler
