let handler = async (m, { conn }) => {

let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''

// ❌ si no es imagen
if (!/image/.test(mime)) {
  return conn.reply(
    m.chat,
    '⚠️ Responde a una imagen para cambiar la foto del grupo.',
    m,
    rcanal
  )
}

try {
  let img = await q.download()

  if (!img) {
    return conn.reply(
      m.chat,
      '❌ No se pudo descargar la imagen.',
      m,
      rcanal
    )
  }

  // ✅ cambiar foto
  await conn.updateProfilePicture(m.chat, img)

  // ✅ confirmación
  await conn.reply(
    m.chat,
    '✅ Se cambió la foto del grupo correctamente.',
    m,
    rcanal
  )

} catch (e) {
  console.log(e)
  await conn.reply(
    m.chat,
    '❌ Error al cambiar la foto del grupo.',
    m,
    rcanal
  )
}

}

handler.command = /^setpp(group|grup|gc)?$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
