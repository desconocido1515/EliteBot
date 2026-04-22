// plugins/interna6vs6.js

// Estado global de las listas por grupo
let listasGrupos = new Map();
let mensajesGrupos = new Map();

// Función para obtener o crear las listas de un grupo
const getListasGrupo = (groupId) => {
    if (!listasGrupos.has(groupId)) {
        listasGrupos.set(groupId, {
            squad1: ['➤', '➤', '➤', '➤', '➤', '➤'],
            squad2: ['➤', '➤', '➤', '➤', '➤', '➤']
        });
    }
    return listasGrupos.get(groupId);
};

// Función para reiniciar las listas
const reiniciarListas = (groupId) => {
    listasGrupos.set(groupId, {
        squad1: ['➤', '➤', '➤', '➤', '➤', '➤'],
        squad2: ['➤', '➤', '➤', '➤', '➤', '➤']
    });
};

// Función para mostrar la lista con botones
async function mostrarLista(conn, chat, listas, mensajeUsuario = '') {
    const texto = `🕓 𝗛𝗢𝗥𝗔: ${mensajeUsuario ? `*${mensajeUsuario}*\n` : ''} 
╭──────⚔──────╮
    𝗘𝗡𝗙𝗥𝗘𝗡𝗧𝗔𝗠𝗜𝗘𝗡𝗧𝗢
            𝗜𝗡𝗧𝗘𝗥𝗡𝗢 
╰──────⚔──────╯
╭─────────────╮
│ 𝗦𝗤𝗨𝗔𝗗 1
│👑 ${listas.squad1[0]}
│🥷🏻 ${listas.squad1[1]}
│🥷🏻 ${listas.squad1[2]}
│🥷🏻 ${listas.squad1[3]}
│🥷🏻 ${listas.squad1[4]}
│🥷🏻 ${listas.squad1[5]}
╰─────────────╯
---------------- 🆚 ----------------
╭─────────────╮
│ 𝗦𝗤𝗨𝗔𝗗 2
│👑 ${listas.squad2[0]}
│🥷🏻 ${listas.squad2[1]}
│🥷🏻 ${listas.squad2[2]}
│🥷🏻 ${listas.squad2[3]}
│🥷🏻 ${listas.squad2[4]}
│🥷🏻 ${listas.squad2[5]}
╰─────────────╯
©EliteBotGlobal 2023`;

    const buttons = [
        { buttonId: 'squad1_int6', buttonText: { displayText: "⚔️ SQUAD 1" }, type: 1 },
        { buttonId: 'squad2_int6', buttonText: { displayText: "⚔️ SQUAD 2" }, type: 1 }
    ];

    await conn.sendMessage(chat, {
        text: texto,
        buttons: buttons,
        viewOnce: true
    });
}

let handler = m => m

handler.before = async function (m, { conn }) {
    // DETECTAR RESPUESTA DE BOTONES
    if (m.message?.buttonsResponseMessage) {
        const buttonId = m.message.buttonsResponseMessage.selectedButtonId
        const groupId = m.chat
        let listas = getListasGrupo(groupId)
        const nombreUsuario = m.pushName || m.sender.split('@')[0]
        
        console.log('Botón interna6vs6 presionado:', buttonId)
        
        // Borrar al usuario de todas las escuadras
        Object.keys(listas).forEach(key => {
            const index = listas[key].findIndex(p => p.includes(`@${nombreUsuario}`))
            if (index !== -1) {
                listas[key][index] = '➤'
            }
        })
        
        let squadType
        
        if (buttonId === 'squad1_int6') {
            squadType = 'squad1'
        } else if (buttonId === 'squad2_int6') {
            squadType = 'squad2'
        } else {
            return
        }
        
        const libre = listas[squadType].findIndex(p => p === '➤')
        if (libre !== -1) {
            listas[squadType][libre] = `@${nombreUsuario}`
        }
        
        const mensajeGuardado = mensajesGrupos.get(groupId) || ''
        await mostrarLista(conn, m.chat, listas, mensajeGuardado)
        return
    }
    
    // DETECTAR COMANDO .interna6vs6 (con o sin espacio)
    const textLimpio = m.text ? m.text.toLowerCase().trim() : ''
    
    if (textLimpio === '.interna6vs6' || textLimpio === '. interna6vs6' || textLimpio.startsWith('.interna6vs6 ') || textLimpio.startsWith('. interna6vs6 ')) {
        let mensaje = ''
        if (textLimpio.startsWith('.interna6vs6 ')) {
            mensaje = m.text.substring(12).trim()
        } else if (textLimpio.startsWith('. interna6vs6 ')) {
            mensaje = m.text.substring(13).trim()
        }
        
        if (!mensaje) {
            await conn.reply(m.chat, `🕓 𝗜𝗡𝗚𝗥𝗘𝗦𝗔 𝗨𝗡 𝗛𝗢𝗥𝗔𝗥𝗜𝗢.\n𝗘𝗷𝗲𝗺𝗽𝗹𝗼:\n.interna6vs6 4pm🇪🇨/3pm🇲🇽`, m, rcanal)
            return
        }
        
        reiniciarListas(m.chat)
        mensajesGrupos.set(m.chat, mensaje)
        let listas = getListasGrupo(m.chat)
        
        await mostrarLista(conn, m.chat, listas, mensaje)
        return
    }
}

export default handler
