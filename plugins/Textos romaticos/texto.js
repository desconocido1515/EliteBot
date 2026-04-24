import { spawn } from 'child_process';
import { join } from 'path';
import fs from 'fs';

const __dirname = global.__dirname;

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

const handler = async (m, { conn, args, usedPrefix, command }) => {
  const text = args.join(' ').trim();
  
  if (!text) {
    return conn.reply(m.chat,
      `✏️ Usa el comando así:\n\n*.${command} [color opcional] tu mensaje*\n\n📌 *Ejemplo:*\n*.${command} azul Hola grupo*\n\n🎨 *Colores disponibles:*\n` +
      Object.keys(colores).sort().join(', '), m, rcanal);
  }

  const [colorElegido, ...contenidoArr] = text.split(' ');
  const coloresGrad = colores[colorElegido.toLowerCase()] || colores['azul'];
  const contenido = colores[colorElegido.toLowerCase()] ? contenidoArr.join(' ') : text;
  const displayName = m.pushName || 'Usuario';
  
  let avatarUrl = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
  try {
    avatarUrl = await conn.profilePictureUrl(m.sender, 'image');
  } catch {}

  // Reacción al inicio
  await conn.sendMessage(m.chat, { react: { text: '🎨', key: m.key } });
  await conn.reply(m.chat, `☑️ Generando imagen, por favor espera...`, m, rcanal);

  if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp');
  
  // Descargar avatar temporalmente
  const avatarPath = `./tmp/avatar-${Date.now()}.jpg`;
  const avatarBuffer = await (await fetch(avatarUrl)).buffer();
  fs.writeFileSync(avatarPath, avatarBuffer);
  
  // Plantilla base (creamos un gradiente con ImageMagick)
  const bgPath = `./tmp/bg-${Date.now()}.png`;
  const outputPath = `./tmp/texto-${Date.now()}.png`;
  
  // Crear gradiente como fondo
  await new Promise((resolve, reject) => {
    const args = [
      '-size', '1080x1080',
      'gradient:' + coloresGrad[0] + '-' + coloresGrad[1],
      bgPath
    ];
    const proc = spawn('convert', args);
    proc.on('error', reject);
    proc.on('close', resolve);
  });
  
  // Construir comando de ImageMagick
  const convertArgs = [
    bgPath,
    // Avatar circular (opcional, si tienes avatar)
    '(',
    avatarPath,
    '-resize', '160x160',
    '-alpha', 'set',
    '-background', 'none',
    '-gravity', 'center',
    '-extent', '160x160',
    ')',
    '-geometry', '+20+20',
    '-compose', 'over',
    '-composite',
    // Texto del usuario
    '-font', 'Sans-serif',
    '-pointsize', '42',
    '-fill', 'white',
    '-annotate', '+220+100', displayName,
    // Texto principal
    '-font', 'Sans-serif',
    '-pointsize', '58',
    '-fill', 'white',
    '-gravity', 'center',
    '-annotate', '0', contenido,
    // Logo
    '(',
    'https://files.catbox.moe/9o4ugy.jpg',
    '-resize', '140x140',
    ')',
    '-geometry', '+940+940',
    '-compose', 'over',
    '-composite',
    outputPath
  ];
  
  await new Promise((resolve, reject) => {
    const proc = spawn('convert', convertArgs);
    proc.on('error', reject);
    proc.on('close', resolve);
  });
  
  // Enviar imagen
  await conn.sendMessage(m.chat, {
    image: { url: outputPath },
    caption: `☑️ *IMAGEN GENERADA*\n\n🎨 *Color:* ${colorElegido.toLowerCase() || 'azul'}\n👤 *Autor:* ${displayName}\n\nElite Bot Global - Since 2023®`
  });
  
  // Limpiar archivos temporales
  try {
    fs.unlinkSync(avatarPath);
    fs.unlinkSync(bgPath);
    fs.unlinkSync(outputPath);
  } catch (e) {}
  
  await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
};

handler.command = ['texto'];
export default handler;
