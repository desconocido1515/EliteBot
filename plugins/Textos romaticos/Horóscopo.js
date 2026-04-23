// plugins/test_portada.js

import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const STYLED_THUMBNAIL = 'https://raw.githubusercontent.com/IrokzDal/data/main/1776950526519.jpeg';
const STYLED_SOURCE_URL = 'https://api-adonix.ultraplus.click';

const createStyledInteractive = ({
  mentionJids,
  externalTitle,
  bodyText,
  footerText,
  thumbUrl = STYLED_THUMBNAIL,
  sourceUrl = STYLED_SOURCE_URL
}) => {
  return {
    contextInfo: {
      mentionedJid: mentionJids,
      externalAdReply: {
        title: externalTitle,
        body: '',
        thumbnailUrl: thumbUrl,
        sourceUrl,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    },
    body: {
      text: bodyText || ' '
    },
    footer: {
      text: footerText || ''
    },
    nativeFlowMessage: {
      messageParamsJson: JSON.stringify({}),
      buttons: []
    }
  };
};

const sendStyledInteractive = async (conn, chatId, interactiveMessage, quoted) => {
  const content = {
    viewOnceMessage: {
      message: {
        interactiveMessage
      }
    }
  };
  const userJid = conn?.user?.id || conn?.user?.jid;
  const msg = generateWAMessageFromContent(chatId, content, { userJid, quoted });
  await conn.relayMessage(chatId, msg.message, { messageId: msg.key.id });
};

async function makeFkontak() {
  try {
    const res = await fetch('https://i.postimg.cc/rFfVL8Ps/image.jpg');
    const thumb2 = Buffer.from(await res.arrayBuffer());
    return {
      key: { participants: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false, id: 'Halo' },
      message: { locationMessage: { name: 'Horóscopo', jpegThumbnail: thumb2 } },
      participant: '0@s.whatsapp.net'
    };
  } catch {
    return null;
  }
}

let handler = async (m, { conn }) => {
  let fkontak = await makeFkontak();
  if (!fkontak) fkontak = m;

  const interactiveMessage = createStyledInteractive({
    mentionJids: [m.sender],
    externalTitle: '🌟 PRUEBA DE PORTADA 🌟',
    bodyText: 'Esta es una prueba para ver si la imagen de portada se muestra correctamente.\n\nSi ves la imagen arriba, la portada funciona.\nSi no la ves, hay un problema con la URL o el formato.',
    footerText: 'Elite Bot Global - Test'
  });

  await sendStyledInteractive(conn, m.chat, interactiveMessage, fkontak);
};

handler.command = /^(testportada)$/i;

export default handler;
