let handler = async (m, { conn, participants, usedPrefix, command }) => {
  if (!global.db.data.settings[conn.user.jid].restrict) 
    throw '*[ ⚠️ ] MI CREADOR TIENE DESACTIVADO ESTA FUNCIÓN.*\n💻 593993370003';

  let kicktext = `⚠️ *ETIQUETA A LA PERSONA O RESPONDE SU MENSAJE PARA ELIMINARLO DE ESTE GRUPO.*`;

  if (!m.mentionedJid[0] && !m.quoted) 
    return conn.reply(m.chat, kicktext, m, rcanal);

  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;

  // ⏳ Cuenta regresiva
  let texto1 = `*ADIOS BASURA🤮*\n@${user.split('@')[0]}\n\n *¡Tienes 15 segundos para decir tus últimas palabras!* ⏳`;

  await conn.reply(m.chat, texto1, m, {
    mentions: [user],
    ...rcanal
  });

  // ⏱️ Espera y elimina
  setTimeout(async () => {
    try {
      await conn.groupParticipantsUpdate(m.chat, [user], 'remove');

      let texto2 = `Le mandamos botando a esta basura\n@${user.split('@')[0]}\n\nOjalá no vuelva.`;

      await conn.reply(m.chat, texto2, m, {
        mentions: [user],
        ...rcanal
      });

    } catch (error) {
      console.error("Error al kickear:", error);
    }
  }, 15000);

};

handler.command = /^(kick|echar|hechar|ban|rip|basura)$/i;
handler.admin = true;
handler.group = true;
handler.botAdmin = true;
handler.register = false;

export default handler;
