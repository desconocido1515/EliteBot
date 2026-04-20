let handler = async (m, { conn, participants }) => {
  // JID del bot
  let botJid = conn.user.jid;

  // Owner(s) del bot desde global.owner
  let ownerJids = (global.owner || []).map(v =>
    Array.isArray(v) ? v[0] + '@s.whatsapp.net' : v + '@s.whatsapp.net'
  );

  // Usuarios que se pueden eliminar (solo no admins)
  let usersToRemove = participants
    .filter(p => !p.admin)
    .map(p => p.id)
    .filter(id => id !== botJid && !ownerJids.includes(id));

  if (!usersToRemove.length) {
    return m.reply('⚠️ No hay integrantes normales para eliminar. Solo quedan admins/owner/bot.');
  }

  await conn.sendMessage(m.chat, {
    text: '🗑️🚯 *INICIANDO LIMPIEZA MASIVA EN ESTE GRUPO* 🚯🗑️'
  });

  let eliminados = 0;

  for (let user of usersToRemove) {
    try {
      await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
      eliminados++;
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 segundos
    } catch (e) {
      console.error(`Error al eliminar ${user}:`, e);
    }
  }

  // Obtener participantes actualizados del grupo
  let groupData = await conn.groupMetadata(m.chat);
  let restantes = groupData.participants || [];

  // Quienes quedaron (para mencionar)
  let quedanJids = restantes.map(p => p.id);

  // Solo admins que quedan
  let adminsRestantes = restantes.filter(p => p.admin);

  let textoFinal = `✅ *LIMPIEZA MASIVA COMPLETADA*

🗑️ *Total eliminados:* ${eliminados}
👑 *Total que quedan en el grupo:* ${restantes.length}
🛡️ *Total admins que quedan:* ${adminsRestantes.length}

📢 *Usuarios que quedaron:*
${quedanJids.map(u => `➤ @${u.split('@')[0]}`).join('\n')}`;

  await conn.sendMessage(m.chat, {
    text: textoFinal,
    mentions: quedanJids
  });
};

handler.command = /^limpiezamasiva$/i;
handler.admin = true;
handler.group = true;
handler.botAdmin = true;
handler.register = false;

export default handler;
