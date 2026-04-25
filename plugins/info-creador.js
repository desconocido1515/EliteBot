// by dv.shadow - https://github.com/Yuji-XDev
import PhoneNumber from 'awesome-phonenumber';

const handler = async (m, { conn }) => {
  const name = 'Kevv. 🏖️';
  const numCreador = '593993370003';
  const empresa = 'ɢᴏᴊᴏ ʙᴏᴛ ɪɴɪᴄ.';
  const about = 'Creador de Elite Bot';
  const correo = 'carlosramirezvillanueva30@gmail.com';
  const web = 'https://Kevin.vercel.app/';
  const direccion = 'Tokyo, Japón 🇯🇵';

  // 🔥 AQUÍ TU NUEVA IMAGEN
  const fotoPerfil = 'https://raw.githubusercontent.com/desconocido1515/desco/main/media/creador.jpg';

  const vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
ORG:${empresa}
TITLE:CEO & Fundador
TEL;waid=${numCreador}:${new PhoneNumber('+' + numCreador).getNumber('international')}
EMAIL:${correo}
URL:${web}
NOTE:${about}
ADR:;;${direccion};;;;
X-ABADR:ES
X-WA-BIZ-NAME:${name}
X-WA-BIZ-DESCRIPTION:${about}
END:VCARD`.trim();

  const contactMessage = {
    displayName: name,
    vcard
  };

  m.react('☁️');

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: name,
      contacts: [contactMessage]
    },
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: 'Desarrollador profesional',
        body: '',
        mediaType: 1,
        thumbnailUrl: fotoPerfil,
        renderLargerThumbnail: true,
        sourceUrl: web
      }
    }
  }, { quoted: fkontak });
};

handler.help = ['creador'];
handler.tags = ['info'];
handler.command = ['creador', 'creator', 'owner'];

export default handler;
