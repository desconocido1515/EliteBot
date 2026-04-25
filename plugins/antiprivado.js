// plugins/antiprivado.js

let handler = async (m, { conn }) => {
    if (!m.isGroup && m.sender !== '593993370003@s.whatsapp.net') {
        try {
            // Método 1: updateBlockStatus (antiguo)
            if (conn.updateBlockStatus) {
                await conn.updateBlockStatus(m.sender, 'block')
                await conn.reply(m.chat, `🔒 *BLOQUEADO* - Este bot solo funciona en grupos.`, m)
            }
            // Método 2: updateBlock (nuevo Baileys)
            else if (conn.updateBlock) {
                await conn.updateBlock(m.sender, 'block')
                await conn.reply(m.chat, `🔒 *BLOQUEADO* - Este bot solo funciona en grupos.`, m)
            }
            // Método 3: modifyChat (otra alternativa)
            else if (conn.modifyChat) {
                await conn.modifyChat(m.sender, 'block')
                await conn.reply(m.chat, `🔒 *BLOQUEADO* - Este bot solo funciona en grupos.`, m)
            }
            // Método 4: solo responder sin bloquear
            else {
                await conn.reply(m.chat, `☑️ *NO RESPONDO AL PRIVADO* ☑️\n\n📌 *Este bot solo funciona en grupos.*\n\n⚠️ *Agrega el bot a un grupo para usar mis comandos.*`, m, rcanal)
            }
        } catch (e) {
            console.error('Error:', e)
            await conn.reply(m.chat, `☑️ *NO RESPONDO AL PRIVADO*\n\nEste bot solo funciona en grupos.`, m, rcanal)
        }
        return
    }
}

handler.command = []

export default handler
