// plugins/antiprivado.js

let handler = m => m

handler.before = async function (m, { conn }) {
    // Verificar si es mensaje privado
    if (!m.isGroup) {
        await conn.reply(m.chat, `☑️ *NO RESPONDO AL PRIVADO* ☑️\n\n📌 *Este bot solo funciona en grupos.*\n\n⚠️ *Agrega el bot a un grupo para usar mis comandos.*`, m, rcanal)
        return true
    }
    return false
}

export default handler
