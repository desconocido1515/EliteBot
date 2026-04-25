// plugins/antiprivado.js

let handler = async (m, { conn }) => {
    // Si el mensaje es en privado (no grupo)
    if (!m.isGroup) {
        // Verificar si es owner (cambia el número por el tuyo)
        const isOwner = m.sender === '593993370003@s.whatsapp.net'
        
        if (!isOwner) {
            // Enviar mensaje y bloquear el comando
            await conn.reply(m.chat, `☑️ *NO RESPONDO AL PRIVADO* ☑️\n\n📌 *Este bot solo funciona en grupos.*\n\n⚠️ *Agrega el bot a un grupo para usar mis comandos.*`, m, rcanal)
            return // Salir sin ejecutar el comando
        }
    }
}

// Este plugin no tiene comandos, solo bloquea
handler.command = []

export default handler
