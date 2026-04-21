// plugins/presentacion.js

export async function before(m, { conn }) {

  // Detectar eventos de participantes en grupos
  if (m.chat.endsWith('@g.us') && m.isGroup) {
    
    // Mostrar en consola para depuración (puedes eliminar esta línea después)
    if (m.messageStubType) {
      console.log(`Evento detectado - Type: ${m.messageStubType}, Params:`, m.messageStubParameters);
    }
    
    // Texto único de presentación
    const botName = 'EliteBot';
    const mensaje = `🥇 ¡𝗛𝗢𝗟𝗔 𝗚𝗥𝗨𝗣𝗢!🥇  
¡Soy ${botName}, su nuevo asistente digital!  
━━━━━━━━━━━━━━━━━━━  
⚡ *Mis funciones :*  
▸ Descargar música/videos  
▸ Búsquedas en Google  
▸ Juegos y diversión  
▸ Generar imágenes con IA  
▸ Herramientas para Free Fire  
━━━━━━━━━━━━━━━━━━━  
📂 *Mis menús:*  
▸ .menu → *Menú general*  
▸ .menuimg → *Imágenes AI*  
▸ .menuhot → *Contenido hot*  
▸ .menuaudios → *Efectos*  
▸ .menujuegos → *Juegos grupales*  
▸ .menufreefire → *Free Fire tools*  
━━━━━━━━━━━━━━━━━━━  
©EliteBotGlobal 2023`;
    
    // CASO 1: Grupo recién creado (GROUP_CREATE)
    if (m.messageStubType === 20) {
      setTimeout(async () => {
        try {
          const groupMetadata = await conn.groupMetadata(m.chat);
          const participants = groupMetadata.participants;
          
          const users = [];
          for (let p of participants) {
            let jid = p.id.includes(':') ? p.id.split(':')[0] + '@s.whatsapp.net' : p.id;
            users.push(jid);
          }
          
          await conn.sendMessage(m.chat, {
            text: mensaje,
            mentions: users
          });
          
          console.log(`✅ Grupo creado - Notify enviado a: ${m.chat}`);
        } catch (error) {
          console.error('Error al enviar notify:', error);
          await conn.reply(m.chat, mensaje, m, rcanal);
        }
      }, 2000);
      return;
    }
    
    // CASO 2: Solo cuando el BOT es agregado al grupo
    if (m.messageStubType === 21) {
      const botId = conn.user.jid.split('@')[0];
      const addedUsers = m.messageStubParameters;
      const botAgregado = addedUsers.some(user => user.includes(botId));
      
      if (botAgregado) {
        try {
          const groupMetadata = await conn.groupMetadata(m.chat);
          const participants = groupMetadata.participants;
          
          const users = [];
          for (let p of participants) {
            let jid = p.id.includes(':') ? p.id.split(':')[0] + '@s.whatsapp.net' : p.id;
            users.push(jid);
          }
          
          await conn.sendMessage(m.chat, {
            text: mensaje,
            mentions: users
          });
          
          console.log(`✅ Bot agregado - Notify enviado a: ${m.chat}`);
        } catch (error) {
          console.error('Error al enviar notify:', error);
          await conn.reply(m.chat, mensaje, m, rcanal);
        }
      }
    }
  }
}
