// plugins/antiprivado.js

export async function before(m, { conn, isOwner, isROwner }) {
    // Ignorar mensajes del propio bot
    if (m.isBaileys && m.fromMe) return true;
    
    // Solo aplicar en privado (no grupos)
    if (m.isGroup) return false;
    if (!m.message) return true;
    
    // Permitir al creador
    const creador = '+5804242773183';
    if (m.sender.includes(creador.replace('+', ''))) return true;
    
    // Verificar si está activado
    const bot = global.db.data.settings[conn.user.jid] || {};
    
    if (bot.antiPrivate && !isOwner && !isROwner) {
        const nombreUsuario = await conn.getName(m.sender);
        const grupoURL = 'https://chat.whatsapp.com/ETHW7aP7kOICrR2RBrfE6N';
        const imagenURL = 'https://files.catbox.moe/y6hfiv.jpg';
        
        const mensajeBloqueo = `⚠️ *Hola ${nombreUsuario}*, mi creador ha desactivado los comandos en chats privados.\n\n🌌 *Únete al grupo oficial para usar el bot:*\n${grupoURL}`;
        
        // Enviar mensaje
        await conn.sendFile(m.chat, imagenURL, 'antiprivado.jpg', mensajeBloqueo, m, false, { mentions: [m.sender] });
        
        // Bloquear la ejecución
        return true;
    }
    
    return false;
}
