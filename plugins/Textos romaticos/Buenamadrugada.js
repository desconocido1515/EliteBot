import fetch from 'node-fetch';
import { sticker } from '../../lib/sticker.js';

const handler = async (m, { conn, text, usedPrefix }) => {
  try {
    // Validar mención o respuesta (funciona de las dos maneras)
    let mentionedJid = await m.mentionedJid;
    let usuario = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null;
    
    if (!usuario) {
      return conn.reply(m.chat, `☑️ ETIQUETA O RESPONDE AL MENSAJE DE LA PERSONA\n\n📌 *Ejemplos:*\n.buenamadrugada @usuario\n(Responde al mensaje de alguien con .buenamadrugada)`, m, rcanal);
    }
    
    if (usuario === m.sender) {
      return conn.reply(m.chat, `☑️ No puedes desearte buena madrugada a ti mismo. Etiqueta o responde a otra persona.`, m, rcanal);
    }
    
    const nombreUsuario = m.pushName || m.sender.split('@')[0];
    const nombreMencionado = await conn.getName(usuario);
    
    // Textos de buena madrugada aleatorios
    const textosMadrugada = [
      `🌙 *${nombreMencionado}*, que tengas una hermosa madrugada llena de paz y tranquilidad. Descansa y sueña bonito. ✨`,
      
      `⭐ *${nombreMencionado}*, la noche es joven y los sueños te esperan. Que tengas una madrugada llena de bendiciones. 🌟`,
      
      `🌃 *${nombreMencionado}*, mientras el mundo duerme, tú brillas con luz propia. Feliz madrugada, que descanses. 💫`,
      
      `🌜 *${nombreMencionado}*, que esta madrugada te traiga la calma que necesitas y los sueños que mereces. 🦋`,
      
      `✨ *${nombreMencionado}*, la madrugada es el momento perfecto para recargar energías. Descansa, mañana será un gran día. 💪`,
      
      `🌠 *${nombreMencionado}*, que las estrellas iluminen tu camino esta madrugada y te llenen de esperanza. 💖`,
      
      `🌸 *${nombreMencionado}*, la noche es un abrazo cálido que te invita a descansar. Feliz madrugada, que sueñes bonito. 🍀`
    ];
    
    const textoAleatorio = textosMadrugada[Math.floor(Math.random() * textosMadrugada.length)];
    
    // Reaccionar al mensaje
    await conn.sendMessage(m.chat, {
      react: { text: '🌙', key: m.key }
    });
    
    // Obtener imagen
    const imageUrl = 'https://raw.githubusercontent.com/desconocido1515/desco/main/media/noche.jpg';
    
    // Enviar imagen con el mensaje
    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: `💌 *⌈* 𝑩𝑼𝑬𝑵𝑨 𝑴𝑨𝑫𝑹𝑼𝑮𝑨𝑫𝑨 *⌋* 💌\n\n${textoAleatorio}\n\n━━━━━━━━━━━━━━━━━━━\n✨ *${nombreUsuario}* te deseó buena madrugada ✨\n━━━━━━━━━━━━━━━━━━━\n\n© Elite Bot Global - Since 2023®`,
      mentions: [usuario, m.sender]
    });
    
    // Reacción final
    await conn.sendMessage(m.chat, {
      react: { text: '✅', key: m.key }
    });
    
  } catch (error) {
    console.error('Error en comando buena madrugada:', error);
    await conn.reply(m.chat, `☑️ Ocurrió un error al enviar el mensaje.`, m, rcanal);
  }
};

handler.command = /^(buenamadrugada|buena madrugada)$/i;
handler.group = true;

export default handler;
