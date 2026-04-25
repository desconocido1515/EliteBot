// plugins/antiprivado.js

let handler = async (m, { conn }) => {
    // Si es privado y no es el owner
    if (!m.isGroup && m.sender !== '593993370003@s.whatsapp.net') {
        // Bloquear inmediatamente
        await conn.updateBlockStatus(m.sender, 'block')
        // Opcional: enviar mensaje antes de bloquear
        await conn.reply(m.chat, `🔒 *BLOQUEADO* - Este bot solo funciona en grupos.`, m)
    }
}

handler.command = []

export default handler
