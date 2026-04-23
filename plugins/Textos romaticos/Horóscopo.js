// plugins/test_horoscopo.js

import fetch from 'node-fetch';

// PORTADA (igual que en tu menú)
const portadaUrl = 'https://raw.githubusercontent.com/IrokzDal/data/main/1776950526519.jpeg';
const fuenteUrl = 'https://api-adonix.ultraplus.click';

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

// Lista de signos (solo 1 para prueba)
const signosList = [
  { key: 'cancer', label: '♋️ Cáncer', fecha: '21 jun - 22 jul' }
];

// Datos del horóscopo de prueba
const horoscopoTest = {
  nombre: '♋️ Cáncer',
  fecha: '21 jun - 22 jul',
  prediccion: 'Esta es una prueba exitosa. La portada se ve correctamente.',
  amor: 'Este es un texto de prueba para el amor.',
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

  // Construir botones interactivos (lista)
  const sections = signosList.map((signo) => ({
    title: signo.label,
    rows: [{
      title: `🔮 ${signo.label}`,
      description: signo.fecha,
      id: `horoscopo_${signo.key}`
    }]
  }));

  const textoMenu = `🌟 *TEST HORÓSCOPO* 🌟

Selecciona el signo para probar la portada y la lista interactiva.

✨ PRUEBA - 1 SOLO SIGNO ✨`;

  // Enviar mensaje con portada (misma lógica que tu menú)
  await conn.sendMessage(m.chat, {
    text: textoMenu,
    footer: 'Elite Bot Global - Test',
    buttons: [
      {
        buttonId: 'ver_signos',
        buttonText: { displayText: '🔮 VER SIGNOS' },
        type: 1
      }
    ],
    viewOnce: true,
    contextInfo: {
      externalAdReply: {
        title: 'HORÓSCOPO',
        body: 'ELITE BOT GLOBAL - SINCE 2023',
        thumbnailUrl: portadaUrl,
        sourceUrl: fuenteUrl,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });
};

// Capturar respuesta del botón
handler.before = async function (m, { conn }) {
  if (m.message?.buttonsResponseMessage) {
    const buttonId = m.message.buttonsResponseMessage.selectedButtonId;
    if (buttonId === 'ver_signos') {
      // Enviar lista de signos
      const rows = signosList.map((signo, index) => ({
        title: `${index + 1}. ${signo.label}`,
        description: signo.fecha,
        rowId: `horoscopo_${signo.key}`
      }));
      
      await conn.sendMessage(m.chat, {
        text: '📜 *SELECCIONA UN SIGNO* 📜',
        footer: 'Elite Bot Global - Test',
        templateButtons: [],
        list: {
          buttonText: '☑️ VER SIGNOS',
          description: 'Elige el signo que deseas consultar:',
          sections: [{ title: 'SIGNOS DEL ZODIACO', rows }]
        }
      });
      return true;
    }
    return false;
  }
  
  // Capturar selección de lista
  if (m.message?.listResponseMessage) {
    const selectedId = m.message.listResponseMessage.singleSelectReply.selectedRowId;
    if (selectedId && selectedId.startsWith('horoscopo_')) {
      const signoKey = selectedId.replace('horoscopo_', '');
      await mostrarHoroscopo(m, conn, signoKey);
      return true;
    }
  }
  
  return false;
};

handler.command = /^(testhoroscopo)$/i;

export default handler;
