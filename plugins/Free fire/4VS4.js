// plugins/4vs4.js

// Función para obtener o crear las listas de un grupo (usando base de datos persistente)
const getListasGrupo = (groupId, db) => {
    if (!db.data.chats[groupId]) {
        db.data.chats[groupId] = {}
    }
    if (!db.data.chats[groupId].listas4vs4) {
        db.data.chats[groupId].listas4vs4 = {
            squad1: ['➤', '➤', '➤', '➤'],
            suplente: ['➤', '➤', '➤', '➤']
        }
    }
    return db.data.chats[groupId].listas4vs4
}

// Función para reiniciar las listas
const reiniciarListas = (groupId, db) => {
    if (!db.data.chats[groupId]) {
        db.data.chats[groupId] = {}
    }
    db.data.chats[groupId].listas4vs4 = {
        squad1: ['➤', '➤', '➤', '➤'],
        suplente: ['➤', '➤', '➤', '➤']
    }
}

// Guardar y obtener mensaje (horario)
const guardarMensaje = (groupId, mensaje, db) => {
    if (!db.data.chats[groupId]) {
        db.data.chats[groupId] = {}
    }
    db.data.chats[groupId].mensaje4vs4 = mensaje
}

const obtenerMensaje = (groupId, db) => {
    return db.data.chats[groupId]?.mensaje4vs4 || ''
}

// Función para mostrar la lista con botones
async function mostrarLista(conn, chat, listas, mensajeUsuario = '') {
    const texto = `🕓 𝗛𝗢𝗥𝗔: ${mensajeUsuario ? `*${mensajeUsuario}*\n` : ''} 📑 𝗥𝗘𝗚𝗟𝗔𝗦: 𝗖𝗟𝗞
    
╭──────⚔──────╮
          4 𝗩𝗘𝗥𝗦𝗨𝗦 4
╰──────⚔──────╯
╭─────────────╮
│ 𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔
│👑 ${listas.squad1[0]}
│🥷🏻 ${listas.squad1[1]}
│🥷🏻 ${listas.squad1[2]}
│🥷🏻 ${listas.squad1[3]}
╰─────────────╯
╭─────────────╮
│ 𝗦𝗨𝗣𝗟𝗘𝗡𝗧𝗘𝗦
│🥷🏻 ${listas.suplente[0]}
│🥷🏻 ${listas.suplente[1]}
│🥷🏻 ${listas.suplente[2]}
│🥷🏻 ${listas.suplente[3]}
╰─────────────╯
©EliteBotGlobal 2023`;

    const buttons = [
        { buttonId: 'asistir4', buttonText: { displayText: "⚔️ ASISTIR" }, type: 1 },
        { buttonId: 'suplente4', buttonText: { displayText: "🔄 SUPLENTE" }, type: 1 }
    ];

    await conn.sendMessage(chat, {
        text: texto,
        buttons: buttons,
        viewOnce: true
    });
}

let handler = m => m

handler.before = async function (m, { conn, db }) {
    // DETECTAR RESPUESTA DE BOTONES
    if (m.message?.buttonsResponseMessage) {
        const buttonId = m.message.buttonsResponseMessage.selectedButtonId
        const groupId = m.chat
        let listas = getListasGrupo(groupId, db)
        const nombreUsuario = m.pushName || m.sender.split('@')[0]
        
        console.log('Botón 4vs4 presionado:', buttonId)
        
        // Borrar al usuario de todas las escuadras
        Object.keys(listas).forEach(key => {
            const index = listas[key].findIndex(p => p.includes(`@${nombreUsuario}`))
            if (index !== -1) {
                listas[key][index] = '➤'
            }
        })
        
        let squadType
        
        if (buttonId === 'asistir4') {
            squadType = 'squad1'
        } else if (buttonId === 'suplente4') {
            squadType = 'suplente'
        } else {
            return
        }
        
        const libre = listas[squadType].findIndex(p => p === '➤')
        if (libre !== -1) {
            listas[squadType][libre] = `@${nombreUsuario}`
        }
        
        const mensajeGuardado = obtenerMensaje(groupId, db)
        await mostrarLista(conn, m.chat, listas, mensajeGuardado)
        return
    }
    
    // DETECTAR COMANDO .4vs4 (con o sin espacio)
    const textLimpio = m.text ? m.text.toLowerCase().trim() : ''
    
    if (textLimpio === '.4vs4' || textLimpio === '. 4vs4' || textLimpio.startsWith('.4vs4 ') || textLimpio.startsWith('. 4vs4 ')) {
        let mensaje = ''
        if (textLimpio.startsWith('.4vs4 ')) {
            mensaje = m.text.substring(5).trim()
        } else if (textLimpio.startsWith('. 4vs4 ')) {
            mensaje = m.text.substring(6).trim()
        }
        
        if (!mensaje) {
            await conn.reply(m.chat, `🕓 𝗜𝗡𝗚𝗥𝗘𝗦𝗔 𝗨𝗡 𝗛𝗢𝗥𝗔𝗥𝗜𝗢.\n𝗘𝗷𝗲𝗺𝗽𝗹𝗼:\n.4vs4 4pm🇪🇨/3pm🇲🇽`, m, rcanal)
            return
        }
        
        reiniciarListas(m.chat, db)
        guardarMensaje(m.chat, mensaje, db)
        let listas = getListasGrupo(m.chat, db)
        
        await mostrarLista(conn, m.chat, listas, mensaje)
        return
    }
}

export default handler
