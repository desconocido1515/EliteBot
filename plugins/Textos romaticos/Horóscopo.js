// plugins/aztro.js

import fetch from 'node-fetch';

const handler = async (m, { conn, text, command }) => {
  // Extraer el signo del comando (ej: "aztroaries" -> "aries")
  let signo = '';
  
  if (command === 'aztro') {
    // Si es .aztro aries
    signo = text.toLowerCase().trim();
    if (!signo) {
      return conn.reply(m.chat, `☑️ *EJEMPLO:*\n.aztro aries\n.aztrogeminis\n.horocancer`, m, rcanal);
    }
  } else {
    // Si es .aztroaries, .aztrogeminis, etc.
    signo = command.replace('aztro', '').toLowerCase();
  }
  
  // Lista de signos válidos
  const signosValidos = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ];
  
  if (!signosValidos.includes(signo)) {
    return conn.reply(m.chat, `☑️ *SIGNOS DISPONIBLES:*\n.aztro aries\n.aztro taurus\n.aztro gemini\n.aztro cancer\n.aztro leo\n.aztro virgo\n.aztro libra\n.aztro scorpio\n.aztro sagittarius\n.aztro capricorn\n.aztro aquarius\n.aztro pisces`, m, rcanal);
  }
  
  try {
    // Reaccionar
    await conn.sendMessage(m.chat, {
      react: { text: '🔮', key: m.key }
    });
    
    // Llamar a la API Aztro (POST)
    const url = `https://aztro.sameerkumar.website/?sign=${signo}&day=today`;
    const response = await fetch(url, { method: 'POST' });
    const data = await response.json();
    
    // Formatear respuesta
    const nombreSigno = {
      aries: '♈️ Aries', taurus: '♉️ Tauro', gemini: '♊️ Géminis',
      cancer: '♋️ Cáncer', leo: '♌️ Leo', virgo: '♍️ Virgo',
      libra: '♎️ Libra', scorpio: '♏️ Escorpio', sagittarius: '♐️ Sagitario',
      capricorn: '♑️ Capricornio', aquarius: '♒️ Acuario', pisces: '♓️ Piscis'
    };
    
    const mensaje = `
*${nombreSigno[signo]}*

📅 *Fecha:* ${data.current_date}
🎨 *Color:* ${data.color}
🔢 *Número de la suerte:* ${data.lucky_number}
⏰ *Hora de la suerte:* ${data.lucky_time}
😊 *Estado de ánimo:* ${data.mood}
💕 *Compatibilidad:* ${data.compatibility}

📖 *Descripción:*
${data.description}

🔮 *${data.date_range}*
    `;
    
    await conn.reply(m.chat, mensaje, m, rcanal);
    
  } catch (error) {
    console.error('Error en Aztro API:', error);
    await conn.reply(m.chat, `☑️ Error al conectar con la API. Intenta más tarde.`, m, rcanal);
  }
};

// Comandos disponibles
handler.command = [
  'aztro', 'aztroaries', 'aztrotaurus', 'aztrogemini', 'aztrocancer',
  'aztroleo', 'aztrovirgo', 'aztrolibra', 'aztroscorpio', 'aztrosagittarius',
  'aztrocapricorn', 'aztroaquarius', 'aztropisces'
];

export default handler;
