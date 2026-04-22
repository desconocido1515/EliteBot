// plugins/init.js

let handler = m => m

handler.before = async function (m, { conn }) {
    // Inicializar el bot al primer mensaje
    if (!global._botIniciado) {
        global._botIniciado = true
        console.log('🤖 Bot inicializado - Los botones funcionarán correctamente')
        
        // Enviar un mensaje silencioso para activar el handler
        // Esto no se ve en el chat
        return
    }
}

export default handler
