// plugins/antiprivado.js

let handler = m => m

handler.before = async function (m, { conn }) {
    // Verificar si es mensaje privado
    if (!m.isGroup) {
        // Si el usuario es el owner, dejar pasar
        const isOwner = global.owner.some(v => v === m.sender.split('@')[0])
        if (isOwner) return false
        
        // Enviar mensaje de advertencia
        await conn.reply(m.chat, `☑️ *NO RESPONDO AL PRIVADO* ☑️\n\n📌 *Este bot solo funciona en grupos.*\n\n⚠️ *Agrega el bot a un grupo para usar mis comandos.*`, m, rcanal)
        
        // IMPORTANTE: Retornar true y luego lanzar un error para detener la ejecución
        throw new Error('Comando bloqueado en privado')
    }
    return false
}

export default handler
