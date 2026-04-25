import chalk from 'chalk';
let WAMessageStubType = (await import("@whiskeysockets/baileys")).default;
import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs';
import path from 'path';
import './Grupos/_allfake.js.';

let handler = m => m;
handler.before = async function (m, { conn, participants, groupMetadata, isBotAdmin }) {

    if (!m.messageStubType || !m.isGroup) return;

    let usuario = `@${m.sender.split`@`[0]}`;
    let chat = global.db.data.chats[m.chat];
    let users = m.messageStubParameters[0];
    let groupAdmins = participants.filter(p => p.admin);
    let listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n');

    // Definir fkontak
    let fkontak = {
        key: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.messageStubParameters[0],
            participant: m.sender
        },
        message: {
            textMessage: {
                text: "Este es un mensaje de ejemplo."
            }
        }
    };

    /* ================== TEXTOS ================== */

    const nombre = `*\`INFORMACION\`✅*

✦ *SE CAMBIÓ EL NOMBRE DEL GRUPO A :*
*${m.messageStubParameters[0]}*

» *ACCIÓN HECHA POR :* ${usuario}`;

    const foto = `*\`INFORMACION\`✅*

✦ *SE CAMBIÓ LA IMAGEN DEL GRUPO*

» *ACCIÓN HECHA POR :* ${usuario}`;

    const edit = `*\`INFORMACION\`✅*

✦ *SE ACTUALIZARON LOS PERMISOS DEL GRUPO*

» *ACCIÓN HECHA POR :* ${usuario}`;

    const newlink = `*\`INFORMACION\`✅*

✦ *SE RESTABLECIÓ EL ENLACE DEL GRUPO*

» *ACCIÓN HECHA POR :* ${usuario}`;

    const status = `*\`INFORMACION\`✅*

✦ *EL GRUPO HA SIDO* *${m.messageStubParameters[0] == 'on' ? 'CERRADO' : 'ABIERTO'}*

» *ACCIÓN HECHA POR :* ${usuario}`;

    const admingp = `*\`NUEVO ADMINISTRADOR\`✅*

✦ *AHORA ES ADMINISTRADOR :* @${users.split('@')[0]}

» *ACCIÓN HECHA POR :* ${usuario}`;

    const noadmingp = `*\`INFORMACION\`✅*

✦ *YA NO ES ADMINISTRADOR :* @${users.split('@')[0]}

» *ACCIÓN HECHA POR :* ${usuario}`;

    const desc = `*\`INFORMACION\`✅*

✦ *SE CAMBIÓ LA DESCRIPCIÓN DEL GRUPO A :*
${m.messageStubParameters[0]}

» *ACCIÓN HECHA POR :* ${usuario}`;

    /* ============================================ */

    if (chat.detect && m.messageStubType == 2) {
        const uniqid = (m.isGroup ? m.chat : m.sender).split('@')[0];
        const sessionPath = `./${sessions}/`; // ✅ ruta corregida

        for (const file of await fs.readdir(sessionPath)) {
            if (file.includes(uniqid)) {
                await fs.unlink(path.join(sessionPath, file));
                console.log(`${chalk.yellow.bold('[ ⚠️ Archivo Eliminado ]')} ${chalk.greenBright(`'${file}'`)}\n` +
                `${chalk.blue('(Session PreKey)')} ${chalk.redBright('que provoca el "undefined" en el chat')}`);
            }
        }
    }

    if (chat.detect && m.messageStubType == 21) {
        await this.sendMessage(m.chat, { text: nombre, mentions: [m.sender, ...groupAdmins.map(v => v.id)] }, { quoted: fkontak });   
    } else if (chat.detect && m.messageStubType == 22) {
        await this.sendMessage(m.chat, { text: foto, mentions: [m.sender] }, { quoted: fkontak });  
    } else if (chat.detect && m.messageStubType == 23) {
        await this.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak }); 
    } else if (chat.detect && m.messageStubType == 24) {
        await this.sendMessage(m.chat, { text: desc, mentions: [m.sender] }, { quoted: fkontak }); 
    } else if (chat.detect && m.messageStubType == 25) {
        await this.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak }); 
    } else if (chat.detect && m.messageStubType == 26) {
        await this.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak });
    } else if (chat.detect && m.messageStubType == 29) {
        await this.sendMessage(m.chat, { text: admingp, mentions: [m.sender, users, ...groupAdmins.map(v => v.id)] }, { quoted: fkontak }); 
    } else if (chat.detect && m.messageStubType == 30) {
        await this.sendMessage(m.chat, { text: noadmingp, mentions: [m.sender, users, ...groupAdmins.map(v => v.id)] }, { quoted: fkontak });
    } else {
        if (m.messageStubType == 2) return;
        console.log({
            messageStubType: m.messageStubType,
            messageStubParameters: m.messageStubParameters,
            type: WAMessageStubType[m.messageStubType],
        });
    }
}

export default handler;
