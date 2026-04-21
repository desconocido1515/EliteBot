// plugins/presentacion.js

export async function before(m, { conn }) {

  // Detectar eventos de participantes en grupos
  if (m.chat.endsWith('@g.us') && m.isGroup) {
    
    // Para grupos recién creados (GROUP_CREATE)
    if (m.messageStubType === 20 && m.messageStubParameters[0] === '') {
      // El bot acaba de crear el grupo
      setTimeout(async () => {
        await conn.reply(
          m.chat,
          `🎉 *¡Hola a todos!* 🎉\n\nSoy *EliteBot*, su nuevo asistente.\n\n📝 Usa *!menu* para ver todos mis comandos.\n\n✨ *Gracias por crearme!* ✨`,
          m,
          rcanal
        );
      }, 2000);
      return;
    }
    
    // Para cuando alguien es agregado al grupo (ADD)
    if (m.messageStubType === 21) {
      const botId = conn.user.jid.split('@')[0];
      const addedUsers = m.messageStubParameters;
      
      // Verificar si el bot está entre los agregados
      const botAgregado = addedUsers.some(user => user.includes(botId));
      
      if (botAgregado) {
        // Mensajes de presentación variados
        const presentaciones = [
          `🌟 *¡Hola a todos!* 🌟\n\nSoy *EliteBot*, su asistente virtual.\n\n✅ Estoy aquí para ayudarles con:\n• Comandos de música\n• Descargas de videos\n• Juegos y diversión\n• Moderación del grupo\n\n📝 Usa *!menu* para ver todos mis comandos.\n\n✨ *¡Espero serles útil!* ✨`,

          `🤖 *¡Buen día familia!* 🤖\n\nMe presento, soy *EliteBot*, su nuevo compañero.\n\n🎯 *Mis funciones:*\n✓ Comandos de audio y video\n✓ Descargas de redes sociales\n✓ Administración del grupo\n✓ Entretenimiento\n\n📌 *Comando principal:* !menu\n\n🎉 *Gracias por agregarme!*`,

          `🌈 *¡Hola, hola!* 🌈\n\nSoy *EliteBot*, un bot con muchos trucos bajo la manga.\n\n⚡ *¿Qué puedo hacer?*\n▸ Convertir audios (bass, nightcore, etc.)\n▸ Descargar de YouTube, Instagram, Facebook\n▸ Crear stickers\n▸ Y mucho más\n\n🔍 *Explora con:* !menu\n\n💫 *Un placer estar aquí!*`,

          `🎈 *¡Nuevo integrante en el grupo!* 🎈\n\nSoy *EliteBot*, su asistente de confianza.\n\n🛠️ *Servicios disponibles:*\n✦ Efectos de audio\n✦ Descarga de contenido\n✦ Juegos y trivia\n✦ Anti-spam y moderación\n\n📖 *Lista completa:* !menu\n\n🚀 *¡Comencemos la diversión!*`,

          `💎 *¡Saludos, comunidad!* 💎\n\n*EliteBot* reportándose al servicio.\n\n🎨 *Características:*\n🎵 Transformación de audios\n📥 Descargador multimedia\n🎮 Entretenimiento interactivo\n🛡️ Protección del grupo\n\n💡 *Usa !menu* para descubrir todo\n\n❤️ *¡Gracias por invitarme!*`
        ];
        
        const mensaje = presentaciones[Math.floor(Math.random() * presentaciones.length)];
        
        await conn.reply(
          m.chat,
          mensaje,
          m,
          rcanal
        );
        
        console.log(`✅ Bot agregado al grupo: ${m.chat}`);
      }
    }
  }
}
