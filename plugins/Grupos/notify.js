let handler = async (m, { conn, text, participants, command, usedPrefix }) => {
  // Verificar que el bot sea admin
  if (!handler.botAdmin) {
    return conn.reply(m.chat, 'ⓘ 𝘕𝘦𝘤𝘦𝘴𝘪𝘵𝘰 𝘴𝘦𝘳 𝘢𝘥𝘮𝘪𝘯𝘪𝘴𝘵𝘳𝘢𝘥𝘰𝘳 𝘱𝘢𝘳𝘢 𝘲𝘶𝘦 𝘱𝘶𝘦𝘥𝘢𝘴 𝘶𝘴𝘢𝘳 𝘦𝘴𝘵𝘦 𝘤𝘰𝘮𝘢𝘯𝘥𝘰.', m, rcanal);
  }

  try {
    // Obtener JIDs de todos los participantes
    const users = [];
    for (let p of participants) {
      let jid = p.id.includes(':') ? p.id.split(':')[0] + '@s.whatsapp.net' : p.id;
      users.push(jid);
    }
    
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    const isMedia = /image|video|sticker|audio/.test(mime);

    // Obtener el nombre del grupo
    const groupMetadata = await conn.groupMetadata(m.chat);
    const groupName = groupMetadata.subject || 'Grupo';
    
    // RESPETAR EXACTAMENTE el texto original
    let finalText = "";
    
    if (text) {
      // Si es texto directo
      finalText = text;
    } else if (quoted?.text) {
      // Si es mensaje citado
      finalText = quoted.text;
    } else if (quoted?.caption) {
      // Si es caption de una imagen/video
      finalText = quoted.caption;
    }
    
    // NO usar trim() ni replace() - mantener TODO igual
    // Solo agregar el nombre del grupo al final con un salto de línea
    const fullMessage = finalText + '\nㅤㅤㅤㅤㅤㅤㅤㅤ' + groupName;

    const options = {
      mentions: users,
      quoted: m
    };

    if (isMedia) {
      const media = await quoted.download?.();
      const caption = fullMessage;

      if (quoted.mtype === 'imageMessage') {
        await conn.sendMessage(m.chat, { image: media, caption, ...options });
      } else if (quoted.mtype === 'videoMessage') {
        await conn.sendMessage(m.chat, { video: media, caption, mimetype: 'video/mp4', ...options });
      } else if (quoted.mtype === 'audioMessage') {
        await conn.sendMessage(m.chat, { audio: media, mimetype: 'audio/mpeg', ptt: true, ...options });
      } else if (quoted.mtype === 'stickerMessage') {
        await conn.sendMessage(m.chat, { sticker: media, ...options });
      }
    } else {
      await conn.sendMessage(m.chat, {
        text: fullMessage,
        mentions: users
      }, { quoted: m });
    }

    // Reacción al mensaje original
    await conn.sendMessage(m.chat, {
      react: {
        text: '🗣️',
        key: m.key
      }
    });

  } catch (e) {
    console.error('Error en el comando hidetag:', e);
    await conn.reply(m.chat, '❌ Ocurrió un error al ejecutar el comando.', m, rcanal);
  }
};

handler.help = ['hidetag'];
handler.tags = ['group'];
handler.command = /^(hidetag|notify|notificar|noti|n|avisos|aviso)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.register = false;

export default handler;
