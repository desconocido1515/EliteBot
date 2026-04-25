let handler = async (m, { conn, usedPrefix, command, isROwner }) => {
    if (!isROwner) return
    
    try {
        if (command === 'restart' || command === 'reiniciar') {
            await m.react('🕒')
            await conn.reply(m.chat, `☑️ *REINICIANDO BOT* ☑️\n\n⏳ Espera hasta que el bot se reinicie completamente.\n📌 *El proceso puede tomar unos segundos.*`, m, rcanal)
            await m.react('✔️')
            
            // Solo reiniciar, no salir del proceso
            setTimeout(() => {
                if (process.send) {
                    process.send("restart")
                } else {
                    // En panel, usar reinicio del proceso
                    console.log("Reiniciando bot...")
                    process.exit(0)
                }
            }, 3000)
        }
        
        else if (command === 'stop') {
            await m.react('🛑')
            await conn.reply(m.chat, `🛑 *DETENIENDO BOT* 🛑\n\n⚠️ El bot se detendrá inmediatamente.\n📌 Para iniciarlo nuevamente, presiona *Iniciar* en el panel.`, m, rcanal)
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
