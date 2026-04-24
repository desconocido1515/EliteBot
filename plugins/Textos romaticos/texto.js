import { spawn } from 'child_process';
import fs from 'fs';

const colores = {
  rojo: ['#F44336', '#FFCDD2'],
  azul: ['#00B4DB', '#0083B0'],
  verde: ['#4CAF50', '#C8E6C9'],
  rosa: ['#E91E63', '#F8BBD0'],
  morado: ['#9C27B0', '#E1BEE7'],
  negro: ['#212121', '#9E9E9E'],
  naranja: ['#FF9800', '#FFE0B2'],
  gris: ['#607D8B', '#CFD8DC'],
  celeste: ['#00FFFF', '#E0FFFF'],
  dorado: ['#FFD700', '#FFF8DC'],
  vino: ['#800000', '#C08080'],
  lima: ['#C0FF33', '#F0FFC2'],
  cian: ['#00CED1', '#E0FFFF'],
  coral: ['#FF7F50', '#FFDAB9'],
  aguamarina: ['#7FFFD4', '#E0FFFF'],
  lavanda: ['#E6E6FA', '#F3E5F5'],
  menta: ['#98FF98', '#D0F0C0'],
  esmeralda: ['#50C878', '#A8E6A2'],
  carbon: ['#333333', '#999999'],
  azulmarino: ['#001F3F', '#003366'],
  ocre: ['#CC7722', '#FFD39B'],
  salmon: ['#FA8072', '#FFE4E1'],
  perla: ['#F8F6F0', '#EDEAE0'],
  tierra: ['#A0522D', '#D2B48C'],
  purpura: ['#800080', '#D8BFD8'],
  acero: ['#4682B4', '#B0C4DE']
};

// Detectar qué programa de imagen está disponible (misma lógica que levelup)
const isGm = global.support?.gm || false;
const isMagick = global.support?.magick || false;
const imageCmd = isGm ? 'gm' : (isMagick ? 'magick' : null);

const handler = async (m, { conn, args, usedPrefix, command }) => {
  const text = args.join(' ').trim();
  
  if (!text) {
    return conn.reply(m.chat,
      `✏️ Usa el comando así:\n\n*.${command} [color opcional] tu mensaje*\n\n📌 *Ejemplo:*\n*.${command} azul Hola grupo*\n\n🎨 *Colores disponibles:*\n` +
      Object.keys(colores).sort().join(', '), m, rcanal);
  }

  if (!imageCmd) {
    return conn.reply(m.chat, `☑️ No hay soporte de imágenes en este servidor.`, m, rcanal);
  }

  const [colorElegido, ...contenidoArr] = text.split(' ');
  const coloresGrad = colores[colorElegido.toLowerCase()] || colores['azul'];
  const contenido = colores[colorElegido.toLowerCase()] ? contenidoArr.join(' ') : text;
  const displayName = m.pushName || m.sender.split('@')[0];

  // Reacción al inicio
  await conn.sendMessage(m.chat, { react: { text: '🎨', key: m.key } });
  await conn.reply(m.chat, `☑️ Generando imagen, por favor espera...`, m, rcanal);

  if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp');
  
  const outputPath = `./tmp/texto-${Date.now()}.png`;
  
  // Crear gradiente y texto con GraphicsMagick
  const convertArgs = [
    'convert',
    '-size', '1080x1080',
    'gradient:' + coloresGrad[0] + '-' + coloresGrad[1],
    '-font', 'Sans-serif',
    '-pointsize', '60',
    '-fill', 'white',
    '-gravity', 'center',
    '-annotate', '0', contenido,
    '-pointsize', '40',
    '-gravity', 'northwest',
    '-annotate', '+20+20', displayName,
    outputPath
  ];
  
  await new Promise((resolve, reject) => {
    const proc = spawn(imageCmd, convertArgs);
    proc.on('error', reject);
    proc.on('close', resolve);
  });
  
  // Enviar imagen
  await conn.sendMessage(m.chat, {
    image: { url: outputPath },
    caption: `☑️ *IMAGEN GENERADA*\n\n🎨 *Color:* ${colorElegido.toLowerCase() || 'azul'}\n👤 *Autor:* ${displayName}\n📝 *Texto:* ${contenido.substring(0, 50)}${contenido.length > 50 ? '...' : ''}\n\nElite Bot Global - Since 2023®`
  });
  
  // Limpiar archivos temporales
  try {
    fs.unlinkSync(outputPath);
  } catch (e) {}
  
  await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
};

handler.command = ['texto'];
export default handler;
