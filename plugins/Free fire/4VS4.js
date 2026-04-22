// plugins/4vs4_fixed.js

// Estado global de las listas por grupo
let listasGrupos = new Map();
let mensajesGrupos = new Map();

// Función para obtener o crear las listas de un grupo
const getListasGrupo = (groupId) => {
    if (!listasGrupos.has(groupId)) {
        listasGrupos.set(groupId, {
            squad1: ['➤', '➤', '➤', '➤'],
            suplente: ['➤', '➤', '➤', '➤']
        });
    }
    return listasGrupos.get(groupId);
};

// Función para reiniciar las listas
const reiniciarListas = (groupId) => {
    listasGrupos.set(groupId, {
        squad1: ['➤', '➤', '➤', '➤'],
        suplente: ['➤', '➤', '➤', '➤']
    });
};

// Función para mostrar la lista
async function mostrarLista(conn, chat, listas, mentions = [], mensajeUsuario = '') {
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
        {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
                display_text: "⚔️ ASISTIR",
                id: "asistir"
            })
        },
        {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
                display_text: "🔄 SUPLENTE",
                id: "suplente"
            })
        }
    ];

    const { generateWAMessageFromContent, proto } = await import('@whiskeysockets/baileys');
    
    const mensaje = generateWAMessageFromContent(chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    mentionedJid: mentions
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: { text: texto },
                    footer: { text: "Selecciona una opción:" },
                    nativeFlowMessage: { buttons }
                })
            }
        }
    }, {});

    await conn.relayMessage(chat, mensaje.message, { messageId: mensaje.key.id });
}

let handler = m => m

// Capturar botones usando before (más confiable)
handler.before = async function (m, { conn }) {
    // Detectar respuesta de botón
    if (m.message?.buttonsResponseMessage) {
        const button = m.message.buttonsResponseMessage;
        const id = button.selectedButtonId;
        const groupId = m.chat;
        let listas = getListasGrupo(groupId);
        const nombreUsuario = m.pushName || m.sender.split('@')[0];
        const tag = m.sender;

        console.log('Botón detectado en before:', id);

        // Borrar al usuario de todas las escuadras
        Object.keys(listas).forEach(key => {
            const index = listas[key].findIndex(p => p.includes(`@${nombreUsuario}`));
            if (index !== -1) {
                listas[key][index] = '➤';
            }
        });

        const squadType = id === 'asistir' ? 'squad1' : 'suplente';
        const libre = listas[squadType].findIndex(p => p === '➤');
        
        if (libre !== -1) {
            listas[squadType][libre] = `@${nombreUsuario}`;
        }
        
        const mensajeGuardado = mensajesGrupos.get(groupId);
        await mostrarLista(conn, m.chat, listas, [tag], mensajeGuardado);
        return;
    }
    
    // Comando .4vs4
    const msgText = m.text ? m.text.toLowerCase().trim() : '';
    
    if (msgText.startsWith('.4vs4')) {
        const mensaje = m.text.substring(5).trim();
        if (!mensaje) {
            await conn.reply(m.chat, `🕓 𝗜𝗡𝗚𝗥𝗘𝗦𝗔 𝗨𝗡 𝗛𝗢𝗥𝗔𝗥𝗜𝗢.\n𝗘𝗷𝗲𝗺𝗽𝗹𝗼:\n.4vs4 4pm🇪🇨/3pm🇲🇽`, m, rcanal);
            return;
        }
        reiniciarListas(m.chat);
        mensajesGrupos.set(m.chat, mensaje);
        let listas = getListasGrupo(m.chat);
        await mostrarLista(conn, m.chat, listas, [], mensaje);
        return;
    }
}

handler.command = /^(4vs4)$/i
handler.group = true

export default handler
