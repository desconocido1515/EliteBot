let handler = async (m, { conn, text, participants }) => {

  // 🔥 Validación
  if (!text || text.trim() === '') {
    return conn.reply(
      m.chat,
      `⚠️ Ejemplo de uso:\n.sorteo2 Los 2 seleccionados van para pvp`,
      m,
      rcanal
    );
  }

  // 🔥 Obtener participantes (solo usuarios)
  let users = participants
    .map(u => u.id)
    .filter(v => v !== conn.user.jid); // quitar bot

  if (users.length < 2) {
    return conn.reply(m.chat, '❌ No hay suficientes participantes', m, rcanal);
  }

  // 🔥 Elegir 2 al azar
  let random1 = users[Math.floor(Math.random() * users.length)];
  let random2;

  do {
    random2 = users[Math.floor(Math.random() * users.length)];
  } while (random2 === random1);

  let ganadores = [random1, random2];

  // 🔥 Texto estilo pro
  let texto = `🎊━━━ *SORTEO* ━━━🎊

📩 *MENSAJE:*
${text}

━━━━━━━━━━━━━━━
» *INTEGRANTES AL AZAR SON:*

🥷 @${ganadores[0].split('@')[0]}
🥷 @${ganadores[1].split('@')[0]}

━━━━━━━━━━━━━━━
⚠️ *TIENEN PLAZO DE CONFIRMARME EN PRIVADO, EN CASO CONTRARIO ESTÁN FUERA DEL GRUPO.*
━━━━━━━━━━━━━━━`;

  // 🔥 Enviar con imagen
  await conn.sendMessage(m.chat, {
    image: { url: 'https://raw.githubusercontent.com/desconocido1515/desco/main/media/sorteo.jpeg' },
    caption: texto,
    mentions: ganadores
  }, { quoted: m });
};

handler.command = /^sorteo2$/i;
handler.group = true;
handler.register = false;

export default handler;
