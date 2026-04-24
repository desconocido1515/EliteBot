// plugins/test_ban.js

let handler = async (m, { conn }) => {
  let userData = global.db.data.users[m.sender]
  let mensaje = `📌 *TU ESTADO ACTUAL*\n\n`
  mensaje += `🔹 *JID:* ${m.sender}\n`
  mensaje += `🔹 *Número:* ${m.sender.split('@')[0]}\n`
  mensaje += `🔹 *Baneado:* ${userData?.banned ? '✅ SI' : '❌ NO'}\n`
  mensaje += `🔹 *Razón:* ${userData?.bannedReason || 'Ninguna'}\n\n`
  mensaje += `Si estás baneado y el bot te responde, hay un problema.`
  
  await conn.reply(m.chat, mensaje, m, rcanal)
}

handler.command = /^(testban)$/i
handler.rowner = true

export default handler
