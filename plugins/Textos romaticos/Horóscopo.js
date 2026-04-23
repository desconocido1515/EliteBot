// plugins/test_horoscopo.js

import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

// PORTADA
const STYLED_THUMBNAIL = 'https://raw.githubusercontent.com/IrokzDal/data/main/1776950526519.jpeg';
const STYLED_SOURCE_URL = 'https://api-adonix.ultraplus.click';

// Documento oculto (para que funcione la portada)
const DOCUMENT_TEMPLATE = {
  url: 'https://mmg.whatsapp.net/v/t62.7119-24/539012045_745537058346694_1512031191239726227_n.enc',
  mimetype: 'application/pdf',
  fileSha256: '+gmvvCB6ckJSuuG3ZOzHsTBgRAukejv1nnfwGSSSS/4=',
  fileLength: '999999999999',
  pageCount: 0,
  mediaKey: 'MWO6fI223TY8T0i9onNcwNBBPldWfwp1j1FPKCiJFzw=',
  fileName: ' ',
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
    return 'test.horoscopo';
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
      message: { locationMessage: { name: 'Test', jpegThumbnail: thumb2 } },
      participant: '0@s.whatsapp.net'
    };
  } catch {
    return null;
  }
}

// ==================== LISTA DE PRUEBA (1 SOLO SIGNO) ====================
const signosList = [
  { key: 'cancer', label: '♋️ Cáncer', fecha: '21 jun - 22 jul' }
];

// Datos del signo de prueba
const horoscopoTest = {
  nombre: '♋️ Cáncer',
  fecha: '21 jun - 22 jul',
  prediccion: 'Esta es una prueba. La portada debería verse arriba.',
  amor: 'Texto de prueba para el amor.',
  dinero: 'Texto de prueba para el dinero.',
  salud: 'Texto de prueba para la salud.',
  numero: 7,
  color: 'Blanco'
};

async function mostrarHoroscopo(m, conn, signoKey) {
  const fecha = new Date().toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  
  const mensaje = `☑️ *${horoscopoTest.nombre}*
📅 *Fecha:* ${fecha}
📆 *Período:* ${horoscopoTest.fecha}

🔮 *Predicción:* ${horoscopoTest.prediccion}

💕 *Amor:* ${horoscopoTest.amor}
💰 *Dinero:* ${horoscopoTest.dinero}
💪 *Salud:* ${horoscopoTest.salud}

✨ *Número de la suerte:* ${horoscopoTest.numero}
🎨 *Color favorable:* ${horoscopoTest.color}

━━━━━━━━━━━━━━━━━━━
© Elite Bot Global - Test`;

  await conn.sendMessage(m.chat, { react: { text: '🔮', key: m.key } });
  await conn.reply(m.chat, mensaje, m, rcanal);
}

let handler = async (m, { conn }) => {
  let fkontak = await makeFkontak();
  if (!fkontak) fkontak = m;

  const rows = signosList.map((signo, index) => ({
    title: `${index + 1}. ${signo.label}`,
    description: signo.fecha,
    id: `horoscopo_${signo.key}`
  }));

  const sections = [{ title: '📜 SIGNOS DEL ZODIACO', highlight_label: '🔮', rows }];

  const interactiveMessage = createStyledInteractive({
    mentionJids: [m.sender],
    externalTitle: '🌟 TEST HORÓSCOPO 🌟',
    bodyText: 'Selecciona el signo para probar la portada y la lista interactiva.\n\n✨ PRUEBA - 1 SOLO SIGNO ✨',
    footerText: 'Elite Bot Global - Test',
    sections,
    listTitle: 'Signos disponibles',
    buttonTitle: 'Ver signos',
    buttons: [],
    thumbUrl: STYLED_THUMBNAIL,
    sourceUrl: STYLED_SOURCE_URL,
    limitedText: '🔮 Prueba',
    limitedCopyCode: 'Funciona',
    tapDescription: 'Test de horóscopo interactivo'
  });

  await sendStyledInteractive(conn, m.chat, interactiveMessage, fkontak);
};

// Capturar respuesta del botón
handler.before = async function (m, { conn }) {
  try {
    const msg = m.message || {};
    let selectedId = null;
    
    const irm = msg.interactiveResponseMessage;
    if (!selectedId && irm?.nativeFlowResponseMessage) {
      try {
        const params = JSON.parse(irm.nativeFlowResponseMessage.paramsJson || '{}');
        if (typeof params.id === 'string') selectedId = params.id;
      } catch {}
    }
    
    const lrm = msg.listResponseMessage;
    if (!selectedId && lrm?.singleSelectReply?.selectedRowId) selectedId = lrm.singleSelectReply.selectedRowId;
    
    const brm = msg.buttonsResponseMessage;
    if (!selectedId && brm?.selectedButtonId) selectedId = brm.selectedButtonId;
    
    if (!selectedId) return false;
    
    if (selectedId && selectedId.startsWith('horoscopo_')) {
      const signoKey = selectedId.replace('horoscopo_', '');
      await mostrarHoroscopo(m, conn, signoKey);
      return true;
    }
    
    return false;
  } catch { return false; }
};

handler.command = /^(testhoroscopo)$/i;

export default handler;
