export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  if (m.isBaileys && m.fromMe) return true;
  if (m.isGroup) return false;
  if (!m.message) return true;

  const chat = global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {}; // asegurar existencia
  const bot = global.db.data.settings[conn.user.jid] || {};

  const palabrasClave = ['PIEDRA', 'PAPEL', 'TIJERA', 'serbot', 'jadibot'];

  if (palabrasClave.some((palabra) => m.text.includes(palabra))) return true;
  if (m.chat === '120363416409380841@newsletter') return true;

  const creador = '+5804242773183';
  if (m.sender.includes(creador.replace('+', ''))) return true;

  // 🚫 Si ya se le envió antes, no hacer nada
  if (chat.antiPrivateSent) return true;

  if (bot.antiPrivate && !isOwner && !isROwner) {
    const prefixRegex = /^[!/#$.]/; 
    if (prefixRegex.test(m.text)) {
      const grupoURL = 'https://chat.whatsapp.com/ETHW7aP7kOICrR2RBrfE6N'; 
      const nombreUsuario = await conn.getName(m.sender);

      const now = new Date();
      const week = now.toLocaleDateString('es-EC', { weekday: 'long' });
      const date = now.toLocaleDateString('es-EC');

      const mensajeBloqueo = `¡Hola! 👋🏻 @${m.sender.split("@")[0]}
\`\`\`${week}, ${date}\`\`\`

INGRESA AL LINK PARA VER EL CATÁLOGO:
https://sites.google.com/view/elitebotglobal?usp=sharing

 © 2023 EliteBotGlobal // ProyectoX`;
      
      // 📁 Ruta local
      let videoPath = './media/tienda.mp4';

      await conn.sendFile(
        m.chat,
        videoPath,
        'antiprivado.mp4',
        mensajeBloqueo,
        m,
        false,
        { mentions: [m.sender], gifPlayback: true }
      );

      // ✅ Marcar como ya enviado
      chat.antiPrivateSent = true;

      await conn.updateBlockStatus(m.chat, 'block');
    }
  }

  return false;
}
