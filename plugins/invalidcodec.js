// plugins/init_wait.js
let handler = m => m

handler.before = async function (m, { conn }) {
    // Esperar a que la conexión esté lista
    if (!conn.user) {
        console.log("Esperando conexión...")
        return true
    }
    return
}

export default handler
