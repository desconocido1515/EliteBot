// plugins/8vs8.js

// Estado global de las listas por grupo
let listasGrupos = new Map();
let mensajesGrupos = new Map();

// Función para obtener o crear las listas de un grupo
const getListasGrupo = (groupId) => {
    if (!listasGrupos.has(groupId)) {
        listasGrupos.set(groupId, {
            squad1: ['➤', '➤', '➤', '➤'],
            squad2: ['➤', '➤', '➤', '➤'],
            suplente: ['➤', '➤', '➤', '➤']
        });
    }
    return listasGrupos.get(groupId);
};

// Función para reiniciar las listas
const reiniciarListas = (groupId) => {
    listasGrupos.set(groupId, {
        squad1: ['➤', '➤', '➤', '➤'],
        squad2: ['➤', '➤', '➤', '➤'],
        suplente: ['➤', '➤', '➤', '➤']
    });
};

// Función para mostrar la lista con botones
async function mostrarLista(conn, chat, listas, mensajeUsuario = '') {
    const texto = `🕓 𝗛𝗢𝗥𝗔: ${mensajeUsuario ? `*${mensajeUsuario}*\n` : ''} 🗣️ 𝗜𝗡𝗗𝗜𝗖𝗔𝗖𝗜𝗢𝗡𝗘𝗦 :
» Reglas y color se avisa al llenar este listado.

╭──────⚔──────╮
          8 𝗩𝗘𝗥𝗦𝗨𝗦 8
╰──────⚔──────╯
╭─────────────╮
│ 𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1
│👑 ${listas.squad1[0]}
│🥷🏻 ${listas.squad1[1]}
│🥷🏻 ${listas.squad1[2]}
│🥷🏻 ${listas.squad1[3]}
╰─────────────╯
╭─────────────╮
│ 𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 2
│👑 ${listas.squad2[0]}
│🥷🏻 ${listas.squad2[1]}
│🥷🏻 ${listas.squad2[2]}
│🥷🏻 ${listas.squad2[3]}
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
        { buttonId: 'escuadra1_8', buttonText: { displayText: "⚔️ ESCUADRA 1" }, type: 1 },
        { buttonId: 'escuadra2_8', buttonText: { displayText: "⚔️ ESCUADRA 2" }, type: 1 },
        { buttonId: 'suplente_8', buttonText: { displayText: "🔄 SUPLENTES" }, type: 1 }
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
        
        console.log('Botón 8vs8 presionado:', buttonId)
        
        // Borrar al usuario de todas las escuadras
        Object.keys(listas).forEach(key => {
            const index = listas[key].findIndex(p => p.includes(`@${nombreUsuario}`))
            if (index !== -1) {
                listas[key][index] = '➤'
            }
        })
        
        let squadType
        
        switch(buttonId) {
            case 'escuadra1_8':
                squadType = 'squad1'
                break
            case 'escuadra2_8':
                squadType = 'squad2'
                break
            case 'suplente_8':
                squadType = 'suplente'
                break
            default:
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
    
    // DETECTAR COMANDO .8vs8 (con o sin espacio)
    const textLimpio = m.text ? m.text.toLowerCase().trim() : ''
    
    if (textLimpio === '.8vs8' || textLimpio === '. 8vs8' || textLimpio.startsWith('.8vs8 ') || textLimpio.startsWith('. 8vs8 ')) {
        let mensaje = ''
        if (textLimpio.startsWith('.8vs8 ')) {
            mensaje = m.text.substring(5).trim()
        } else if (textLimpio.startsWith('. 8vs8 ')) {
            mensaje = m.text.substring(6).trim()
        }
        
        if (!mensaje) {
            await conn.reply(m.chat, `🕓 𝗜𝗡𝗚𝗥𝗘𝗦𝗔 𝗨𝗡 𝗛𝗢𝗥𝗔𝗥𝗜𝗢.\n𝗘𝗷𝗲𝗺𝗽𝗹𝗼:\n.8vs8 4pm🇪🇨/3pm🇲🇽`, m, rcanal)
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
