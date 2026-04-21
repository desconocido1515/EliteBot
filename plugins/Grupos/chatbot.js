export async function before(m, { conn }) {

  if (!m.text) return
  if (m.isBaileys) return

  if (m.text.trim().toLowerCase() === 'bot') {

    await conn.reply(
      m.chat,
      'Hola brow estoy activo ☑️',
      m,
      rcanal
    )

  }
}
