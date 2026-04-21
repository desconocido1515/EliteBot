// plugins/presentacion.js

export async function before(m, { conn }) {
  
  // Detectar cuando el bot es agregado a un grupo
  if (m.chat.endsWith('@g.us') && m.isGroup && m.messageStubType === 9) {
    
    const botId = conn.user.jid.split('@')[0];
    const addedUsers = m.messageStubParameters;
    
    if (addedUsers.includes(botId)) {
      
      await conn.sendMessage(m.chat, { 
        text: `🤖 *¡Hola a todos!*\n\nSoy *EliteBot*, su nuevo asistente.\n\n📝 Usa *!menu* para ver todos mis comandos.\n\n✨ *Gracias por agregarme!* ✨`
      });
    }
  }
}
