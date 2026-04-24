import { fileTypeFromBuffer } from 'file-type'

// ==================== CAMBIAR FOTO DEL BOT ====================
const handlerFoto = async (m, { conn, command, isOwner }) => {
  if (!isOwner) return conn.reply(m.chat, `☑️ Solo el owner puede usar este comando.`, m, rcanal)

  const q = m.quoted || m
  const mime = (q.msg || q).mimetype || ''

  if (!/image\/(jpe?g|png)/.test(mime)) {
    return conn.reply(m.chat, `☑️ Responde a una imagen con *.${command}*`, m, rcanal)
  }

  try {
    await conn.sendMessage(m.chat, {
      react: { text: '🕓', key: m.key }
    })

    const img = await q.download()
    if (!img) throw 'No se pudo descargar la imagen'

    const botJid = conn.user.id.split(':')[0] + '@s.whatsapp.net'

    await conn.updateProfilePicture(botJid, img)

    await conn.reply(m.chat, `☑️ Foto de perfil del BOT actualizada correctamente.`, m, rcanal)

    await conn.sendMessage(m.chat, {
      react: { text: '✅', key: m.key }
    })

  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, `☑️ Error al cambiar la foto del bot.`, m, rcanal)
  }
}

// ==================== CAMBIAR NOMBRE DEL BOT ====================
const handlerNombre = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, `☑️ *QUE NOMBRE DESEAS PONERME?*`, m, rcanal)
  }
  
  try {
    await conn.updateProfileName(text)
    return conn.reply(m.chat, `☑️ *NOMBRE CAMBIADO CON ÉXITO*`, m, rcanal)
  } catch (e) {
    console.log(e)
    return conn.reply(m.chat, `☑️ Ocurrió un error al cambiar el nombre.`, m, rcanal)
  }
}

// ==================== CAMBIAR BIO DEL BOT ====================
const handlerBio = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, `☑️ *INGRESE UN TEXTO PARA LA BIOGRAFÍA*`, m, rcanal)
  }
  
  try {
    await conn.updateProfileStatus(text)
    return conn.reply(m.chat, `☑️ *BIOGRAFÍA CAMBIADA CON ÉXITO* ✅`, m, rcanal)
  } catch (e) {
    console.log(e)
    return conn.reply(m.chat, `☑️ Error al cambiar la biografía del bot.`, m, rcanal)
  }
}

// ==================== HANDLER PRINCIPAL ====================
let handler = async (m, { conn, command, text, isOwner }) => {
  if (command === 'setfotobot') {
    return handlerFoto(m, { conn, command, isOwner })
  }
  if (command === 'nombrebot' || command === 'setnamebot' || command === 'cambianombre') {
    return handlerNombre(m, { conn, text })
  }
  if (command === 'biobot' || command === 'setbotbio') {
    return handlerBio(m, { conn, text })
  }
}

handler.help = ['setfotobot', 'nombrebot', 'setnamebot', 'cambianombre', 'biobot', 'setbotbio']
handler.tags = ['owner']
handler.command = ['setfotobot', 'nombrebot', 'setnamebot', 'cambianombre', 'biobot', 'setbotbio']
handler.owner = true

export default handler
