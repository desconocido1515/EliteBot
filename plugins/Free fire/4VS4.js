// plugins/4vs4.js
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

let listasGrupos = new Map();
let mensajesGrupos = new Map();

const getListasGrupo = (groupId) => {
    if (!listasGrupos.has(groupId)) {
        listasGrupos.set(groupId, {
            squad1: ['➤', '➤', '➤', '➤'],
            suplente: ['➤', '➤', '➤', '➤']
        });
    }
    return listasGrupos.get(groupId);
};

const reiniciarListas = (groupId) => {
    listasGrupos.set(groupId, {
        squad1: ['➤', '➤', '➤', '➤'],
        suplente: ['➤', '➤', '➤', '➤']
    });
};

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
        { buttonId: 'asistir', buttonText: { displayText: '⚔️ ASISTIR' }, type: 1 },
        { buttonId: 'suplente', buttonText: { displayText: '🔄 SUPLENTE' }, type: 1 }
    ];

    await conn.sendMessage(chat, { text: texto, buttons, mentions });
}

let handler = m => m;

handler.before = async function (m, { conn }) {
    // Detectar botones
    if (m.message?.buttonsResponseMessage) {
        const id = m.message.buttonsResponseMessage.selectedButtonId;
        const groupId = m.chat;
        let listas = getListasGrupo(groupId);
        const nombreUsuario = m.pushName || m.sender.split('@')[0];
        const tag = m.sender;

        Object.keys(listas).forEach(key => {
            const index = listas[key].findIndex(p => p.includes(`@${nombreUsuario}`));
            if (index !== -1) listas[key][index] = '➤';
        });

        const squadType = id === 'asistir' ? 'squad1' : 'suplente';
        const libre = listas[squadType].findIndex(p => p === '➤');
        
        if (libre !== -1) listas[squadType][libre] = `@${nombreUsuario}`;
        
        const mensajeGuardado = mensajesGrupos.get(groupId);
        await mostrarLista(conn, m.chat, listas, [tag], mensajeGuardado);
        return;
    }
    
    // Comando .4vs4
    const msgText = m.text?.toLowerCase().trim() || '';
    if (msgText.startsWith('.4vs4')) {
        const mensaje = m.text.substring(5).trim();
        if (!mensaje) {
            await conn.reply(m.chat, `🕓 INGRESA UN HORARIO.\nEjemplo:\n.4vs4 4pm`, m);
            return;
        }
        reiniciarListas(m.chat);
        mensajesGrupos.set(m.chat, mensaje);
        let listas = getListasGrupo(m.chat);
        await mostrarLista(conn, m.chat, listas, [], mensaje);
        return;
    }
};

handler.command = /^(4vs4)$/i;
handler.group = true;

export default handler;
