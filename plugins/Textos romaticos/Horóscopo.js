// plugins/horoscopo_adonix.js

import fetch from 'node-fetch';
import crypto from 'crypto';
import { generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys';

const STYLED_THUMBNAIL = 'https://files.catbox.moe/kcpa4c.jpg';
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

  if (!nativeButtons.length) {
    nativeButtons.push({
      name: 'cta_copy',
      buttonParamsJson: JSON.stringify({
        display_text: 'Copiar contenido',
        copy_code: bodyText || '',
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

// ==================== DATOS DE HORÓSCOPO ====================
const horoscopos = {
  aries: {
    nombre: '♈️ Aries',
    fecha: '21 mar - 19 abr',
    prediccion: 'Hoy tu energía estará al máximo, perfecto para iniciar proyectos audaces. Un desafío laboral revelará tu verdadero potencial de liderazgo.',
    amor: 'El amor llegará de forma inesperada con alguien que comparte tu pasión.',
    dinero: 'Tus finanzas mejorarán gracias a una oportunidad que surgirá hoy.',
    salud: 'Excelente energía física, ideal para hacer ejercicio.',
    numero: Math.floor(Math.random() * 9) + 1,
    color: 'Rojo'
  },
  tauro: {
    nombre: '♉️ Tauro',
    fecha: '20 abr - 20 may',
    prediccion: 'Tus finanzas mejorarán notablemente gracias a decisiones pasadas. La paciencia que has mostrado finalmente dará sus frutos.',
    amor: 'Una relación antigua resurgirá con nuevos significados.',
    dinero: 'Buen momento para inversiones a largo plazo.',
    salud: 'Mantén una rutina de ejercicios constante.',
    numero: Math.floor(Math.random() * 9) + 1,
    color: 'Verde'
  },
  geminis: {
    nombre: '♊️ Géminis',
    fecha: '21 may - 20 jun',
    prediccion: 'Una conversación casual podría convertirse en una gran oportunidad laboral. Tu ingenio te sacará de un apuro inesperado.',
    amor: 'Dos opciones interesantes se presentarán simultáneamente.',
    dinero: 'Evita gastos innecesarios hoy.',
    salud: 'Cuida tu sistema respiratorio.',
    numero: Math.floor(Math.random() * 9) + 1,
    color: 'Amarillo'
  },
  cancer: {
    nombre: '♋️ Cáncer',
    fecha: '21 jun - 22 jul',
    prediccion: 'Un sueño revelador te dará claridad sobre una situación confusa. La energía lunar intensificará tu intuición.',
    amor: 'Un reencuentro familiar traerá sanación emocional.',
    dinero: 'Buen momento para ahorrar.',
    salud: 'Cuida tus emociones, medita.',
    numero: Math.floor(Math.random() * 9) + 1,
    color: 'Blanco'
  },
  leo: {
    nombre: '♌️ Leo',
    fecha: '23 jul - 22 ago',
    prediccion: 'Tu carisma atraerá oportunidades profesionales importantes. Tu liderazgo inspirará a otros a superarse.',
    amor: 'Un romance apasionado comenzará bajo cielos favorables.',
    dinero: 'Inversión creativa dará resultados sorprendentes.',
    salud: 'Alta energía, canalízala bien.',
    numero: Math.floor(Math.random() * 9) + 1,
    color: 'Dorado'
  },
  virgo: {
    nombre: '♍️ Virgo',
    fecha: '23 ago - 22 sep',
    prediccion: 'Tu atención al detalle evitará un error costoso. Un hábito saludable que inicies hoy tendrá efectos duraderos.',
    amor: 'Ayudarás a alguien cercano a resolver un problema práctico.',
    dinero: 'Tu organización financiera te dará ventaja.',
    salud: 'Cuida tu alimentación.',
    numero: Math.floor(Math.random() * 9) + 1,
    color: 'Verde menta'
  },
  libra: {
    nombre: '♎️ Libra',
    fecha: '23 sep - 22 oct',
    prediccion: 'Resolverás un conflicto con tu diplomacia característica. El equilibrio entre trabajo y vida personal mejorará.',
    amor: 'Una colaboración artística traerá satisfacción creativa.',
    dinero: 'Decisiones financieras acertadas.',
    salud: 'Busca armonía mental.',
    numero: Math.floor(Math.random() * 9) + 1,
    color: 'Rosa'
  },
  escorpio: {
    nombre: '♏️ Escorpio',
    fecha: '23 oct - 21 nov',
    prediccion: 'Descubrirás información oculta que cambiará tu perspectiva. Tu determinación superará obstáculos.',
    amor: 'Tu intensidad emocional atraerá a alguien especial.',
    dinero: 'Transformarás una debilidad en fortaleza financiera.',
    salud: 'Alta energía emocional.',
    numero: Math.floor(Math.random() * 9) + 1,
    color: 'Morado'
  },
  sagitario: {
    nombre: '♐️ Sagitario',
    fecha: '22 nov - 21 dic',
    prediccion: 'Una oportunidad de viaje se presentará inesperadamente. Tu optimismo inspirará a otros.',
    amor: 'Una aventura romántica exótica está en tu futuro.',
    dinero: 'Buena racha económica.',
    salud: 'Excelente vitalidad.',
    numero: Math.floor(Math.random() * 9) + 1,
    color: 'Púrpura'
  },
  capricornio: {
    nombre: '♑️ Capricornio',
    fecha: '22 dic - 19 ene',
    prediccion: 'Tu disciplina dará resultados tangibles. Un proyecto a largo plazo finalmente mostrará progreso.',
    amor: 'La estabilidad emocional que buscas llegará.',
    dinero: 'Inversiones seguras prosperarán.',
    salud: 'Cuida tus articulaciones.',
    numero: Math.floor(Math.random() * 9) + 1,
    color: 'Negro'
  },
  acuario: {
    nombre: '♒️ Acuario',
    fecha: '20 ene - 18 feb',
    prediccion: 'Una idea revolucionaria cambiará tu perspectiva. Lo inesperado será tu aliado.',
    amor: 'Conectarás con alguien que comparte tus ideales.',
    dinero: 'Oportunidades innovadoras.',
    salud: 'Alta energía mental.',
    numero: Math.floor(Math.random() * 9) + 1,
    color: 'Azul'
  },
  piscis: {
    nombre: '♓️ Piscis',
    fecha: '19 feb - 20 mar',
    prediccion: 'Tu intuición te guiará hacia una decisión crucial. El arte jugará un papel sanador.',
    amor: 'Una conexión espiritual se profundizará.',
    dinero: 'Ayudarás a alguien sin esperar nada a cambio.',
    salud: 'Cuida tus pies y descansa.',
    numero: Math.floor(Math.random() * 9) + 1,
    color: 'Turquesa'
  }
};

// Lista de signos para el menú
const signosList = [
  { key: 'aries', label: '♈️ Horóscopo Aries', emoji: '♈️' },
  { key: 'tauro', label: '♉️ Horóscopo Tauro', emoji: '♉️' },
  { key: 'geminis', label: '♊️ Horóscopo Géminis', emoji: '♊️' },
  { key: 'cancer', label: '♋️ Horóscopo Cáncer', emoji: '♋️' },
  { key: 'leo', label: '♌️ Horóscopo Leo', emoji: '♌️' },
  { key: 'virgo', label: '♍️ Horóscopo Virgo', emoji: '♍️' },
  { key: 'libra', label: '♎️ Horóscopo Libra', emoji: '♎️' },
  { key: 'escorpio', label: '♏️ Horóscopo Escorpio', emoji: '♏️' },
  { key: 'sagitario', label: '♐️ Horóscopo Sagitario', emoji: '♐️' },
  { key: 'capricornio', label: '♑️ Horóscopo Capricornio', emoji: '♑️' },
  { key: 'acuario', label: '♒️ Horóscopo Acuario', emoji: '♒️' },
  { key: 'piscis', label: '♓️ Horóscopo Piscis', emoji: '♓️' }
];

async function sendHoroscopoChooser(m, conn, usedPrefix) {
  let fkontak = await makeFkontak();
  if (!fkontak) fkontak = m;
  
  const rows = signosList.map((signo, index) => ({
    title: `${index + 1}. ${signo.label}`,
    description: `Consulta el horóscopo de ${signo.label.split(' ')[1] || signo.label}`,
    id: `horoscopo_${signo.key}`
  }));

  const sections = [
    {
      title: '📜 SIGNOS DEL ZODIACO',
      highlight_label: '🔮',
      rows
    }
  ];

  const interactiveMessage = createStyledInteractive({
    mentionJids: [m.sender],
    externalTitle: '🌟 HORÓSCOPO DEL DÍA 🌟',
    bodyText: 'Selecciona tu signo zodiacal para conocer tu predicción diaria.\n\n✨ *Amor, dinero, salud y más* ✨',
    footerText: 'Elite Bot Global - Horóscopo',
    sections,
    listTitle: 'Signos del Zodiaco',
    buttonTitle: 'Ver signos',
    buttons: [],
    thumbUrl: STYLED_THUMBNAIL,
    sourceUrl: STYLED_SOURCE_URL,
    limitedText: '🔮 Hoy es un buen día',
    limitedCopyCode: 'Confía en el universo',
    tapDescription: 'Consulta tu horóscopo diario gratis'
  });

  await sendStyledInteractive(conn, m.chat, interactiveMessage, fkontak);
  return true;
}

// Función para mostrar el horóscopo
async function mostrarHoroscopo(m, conn, signoKey) {
  const signo = horoscopos[signoKey];
  if (!signo) {
    return conn.reply(m.chat, `☑️ *SIGNO NO VÁLIDO*`, m, rcanal);
  }
  
  const fecha = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const mensaje = `
☑️ *${signo.nombre}*
📅 *Fecha:* ${fecha}
📆 *Período:* ${signo.fecha}

🔮 *Predicción general:*
${signo.prediccion}

💕 *Amor:*
${signo.amor}

💰 *Dinero:*
${signo.dinero}

💪 *Salud:*
${signo.salud}

✨ *Número de la suerte:* ${signo.numero}
🎨 *Color favorable:* ${signo.color}

━━━━━━━━━━━━━━━━━━━
© Elite Bot Global - Since 2023®
  `;
  
  await conn.sendMessage(m.chat, { react: { text: '🔮', key: m.key } });
  await conn.reply(m.chat, mensaje, m, rcanal);
}

// ==================== HANDLER PRINCIPAL ====================
let handler = async (m, { conn, text, usedPrefix }) => {
  // Si no hay texto, mostrar el menú de selección
  if (!text) {
    return sendHoroscopoChooser(m, conn, usedPrefix);
  }
  
  const signoKey = text.toLowerCase().trim();
  
  if (!horoscopos[signoKey]) {
    return conn.reply(m.chat, `☑️ *SIGNO NO VÁLIDO*\n\n📌 *Signos disponibles:*\n.horoscopo aries\n.horoscopo tauro\n.horoscopo geminis\n.horoscopo cancer\n.horoscopo leo\n.horoscopo virgo\n.horoscopo libra\n.horoscopo escorpio\n.horoscopo sagitario\n.horoscopo capricornio\n.horoscopo acuario\n.horoscopo piscis`, m, rcanal);
  }
  
  await mostrarHoroscopo(m, conn, signoKey);
};

// ==================== CAPTURAR RESPUESTA DE BOTONES ====================
handler.before = async function (m, { conn }) {
  if (m.message?.buttonsResponseMessage) {
    const buttonId = m.message.buttonsResponseMessage.selectedButtonId;
    if (buttonId && buttonId.startsWith('horoscopo_')) {
      const signoKey = buttonId.replace('horoscopo_', '');
      await mostrarHoroscopo(m, conn, signoKey);
      return true;
    }
  }
  return false;
};

handler.help = ['horoscopo'];
handler.tags = ['horoscope'];
handler.command = /^(horoscopo|horóscopo)$/i;

export default handler;
