// plugins/test_portada.js

import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const STYLED_THUMBNAIL = 'https://raw.githubusercontent.com/IrokzDal/data/main/1776950526519.jpeg';
const STYLED_SOURCE_URL = 'https://api-adonix.ultraplus.click';

const DOCUMENT_TEMPLATE = {
  url: 'https://mmg.whatsapp.net/v/t62.7119-24/539012045_745537058346694_1512031191239726227_n.enc',
  mimetype: 'application/pdf',
  fileSha256: '+gmvvCB6ckJSuuG3ZOzHsTBgRAukejv1nnfwGSSSS/4=',
  fileLength: '999999999999',
  pageCount: 0,
  mediaKey: 'MWO6fI223TY8T0i9onNcwNBBPldWfwp1j1FPKCiJFzw=',
  fileName: 'Choso🔥',
  fileEncSha256: 'ZS8v9tio2un1yWVOOG3lwBxiP+mNgaKPY9+wl5pEoi8=',
  directPath: '/v/t62.7119-24/539012045_745537058346694_1512031191239726227_n.enc'
};

const buildDocumentMessage = () => ({
  ...DOCUMENT_TEMPLATE,
  mediaKeyTimestamp: String(Math.floor(Date.now() / 1000))
});

const safeDomainFromUrl = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return 'api-adonix.ultraplus.click';
  }
};

const createStyledInteractive = ({
  mentionJids,
  externalTitle,
  bodyText,
  footerText,
  sections,
  listTitle,
  buttonTitle,
  buttons = [],
  thumbUrl = STYLED_THUMBNAIL,
  sourceUrl = STYLED_SOURCE_URL,
  limitedText,
  limitedCopyCode,
  tapDescription
}) => {
  const nativeButtons = [...buttons];

  if (sections && sections.length) {
    nativeButtons.unshift({
      name: 'single_select',
      buttonParamsJson: JSON.stringify({
        title: buttonTitle || 'Lista de selección',
        sections,
        has_multiple_buttons: true
      })
    });
  }

  const dividerIndices = nativeButtons.map((_, idx) => idx + 1);
  const domain = safeDomainFromUrl(sourceUrl);

  const params = {
    bottom_sheet: {
      in_thread_buttons_limit: Math.max(1, nativeButtons.length),
      divider_indices: dividerIndices,
      list_title: listTitle || 'Selecciona una opción',
      button_title: buttonTitle || 'Abrir'
    },
    tap_target_configuration: {
      title: externalTitle,
      description: tapDescription || (bodyText ? bodyText.split('\n')[0].slice(0, 80) : ''),
      canonical_url: sourceUrl,
      domain,
      button_index: 0
    }
  };

  if (limitedText) {
    params.limited_time_offer = {
      text: limitedText,
      url: sourceUrl,
      copy_code: limitedCopyCode || '',
      expiration_time: Math.floor(Date.now() / 1000) + 3600
    };
  }

  const messageParamsJson = JSON.stringify(params);

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
    header: {
      documentMessage: buildDocumentMessage(),
      hasMediaAttachment: true
    },
    body: {
      text: bodyText || ' '
    },
    footer: {
      text: footerText || ''
    },
    nativeFlowMessage: {
      messageParamsJson,
      buttons: nativeButtons
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
    footerText: 'Elite Bot Global - Test',
    sections: null,
    buttons: []
  });

  await sendStyledInteractive(conn, m.chat, interactiveMessage, fkontak);
};

handler.command = /^(testportada)$/i;

export default handler;
