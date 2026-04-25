let handler = async (m, { conn, usedPrefix, command, isROwner }) => {
    if (!isROwner) return
    
    try {
        if (command === 'restart' || command === 'reiniciar') {
            await m.react('🕒')
            await conn.reply(m.chat, `☑️ *REINICIANDO BOT* ☑️\n\n⏳ Espera hasta que el bot se reinicie completamente.\n📌 *El proceso puede tomar unos segundos.*`, m, rcanal)
            await m.react('✔️')
            
            setTimeout(() => {
                // Método más confiable para reiniciar en panel
                process.kill(process.pid, 'SIGINT')
            }, 3000)
        }
        
        else if (command === 'stop') {
            await m.react('🛑')
            await conn.reply(m.chat, `🛑 *DETENIENDO BOT* 🛑\n\n⚠️ El bot se detendrá inmediatamente.\n📌 Presiona *Iniciar* en el panel para volver a encenderlo.`, m, rcanal)
            await m.react('✔️')
            setTimeout(() => {
                process.exit(0)
            }, 2000)
        }
        
    } catch (error) {
        await m.react('✖️')
        console.log(error)
        await conn.reply(m.chat, `⚠️ *ERROR*\n\n☑️ Ocurrió un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`, m, rcanal)
    }
}

handler.help = ['restart', 'reiniciar', 'stop']
handler.tags = ['owner']
handler.command = ['restart', 'reiniciar', 'stop']
handler.rowner = true

export default handler
