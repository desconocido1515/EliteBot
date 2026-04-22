import { Maker } from 'imagemaker.js';

const logos = {
  // === EFECTOS QUE FUNCIONAN ===
  logoneon: 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html',
  logobrillante: 'https://en.ephoto360.com/create-glowing-text-effects-online-706.html',
  logofuego: 'https://en.ephoto360.com/fire-text-effect-online-705.html',
  logovidrio: 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html',
  logograffiti: 'https://en.ephoto360.com/graffiti-text-effect-online-710.html',
  logonube: 'https://en.ephoto360.com/cloud-text-effect-139.html',
  logocristal: 'https://en.ephoto360.com/crystal-text-effect-online-701.html',
  logoroyal: 'https://en.ephoto360.com/royal-text-effect-online-717.html',
  logogold: 'https://en.ephoto360.com/gold-text-effect-online-707.html',
  logosilver: 'https://en.ephoto360.com/silver-text-effect-online-708.html',
  logobronze: 'https://en.ephoto360.com/bronze-text-effect-online-709.html',
  logoplatinum: 'https://en.ephoto360.com/platinum-text-effect-online-710.html',
  logosteel: 'https://en.ephoto360.com/steel-text-effect-online-711.html',
  logocopper: 'https://en.ephoto360.com/copper-text-effect-online-712.html',
  logorainbow: 'https://en.ephoto360.com/rainbow-text-effect-online-714.html',
  logoflower: 'https://en.ephoto360.com/flower-text-effect-online-715.html',
  logobutterfly: 'https://en.ephoto360.com/butterfly-text-effect-online-716.html',
  logospace: 'https://en.ephoto360.com/space-text-effect-online-721.html',
  logogalaxy: 'https://en.ephoto360.com/galaxy-text-effect-online-722.html',
  logoplanet: 'https://en.ephoto360.com/planet-text-effect-online-724.html',
  logostorm: 'https://en.ephoto360.com/storm-text-effect-online-725.html',
  logothunder: 'https://en.ephoto360.com/thunder-text-effect-online-726.html',
  logolightning: 'https://en.ephoto360.com/lightning-text-effect-online-727.html',
  logorain: 'https://en.ephoto360.com/rain-text-effect-online-728.html',
  logosnow: 'https://en.ephoto360.com/snow-text-effect-online-729.html',
  logowind: 'https://en.ephoto360.com/wind-text-effect-online-730.html',
  logowater: 'https://en.ephoto360.com/water-text-effect-online-739.html',
  logoleaf: 'https://en.ephoto360.com/leaf-text-effect-online-740.html',
  logotree: 'https://en.ephoto360.com/tree-text-effect-online-741.html',
  logorock: 'https://en.ephoto360.com/rock-text-effect-online-742.html',
  logosand: 'https://en.ephoto360.com/sand-text-effect-online-743.html',
  logosmoke: 'https://en.ephoto360.com/smoke-text-effect-online-745.html',
  logofire2: 'https://en.ephoto360.com/fire-text-effect-2-online-737.html',
  logoice2: 'https://en.ephoto360.com/ice-text-effect-2-online-738.html',
  logoinferno: 'https://en.ephoto360.com/inferno-text-effect-online-752.html',
  logoheaven: 'https://en.ephoto360.com/heaven-text-effect-online-754.html',
  logoparadise: 'https://en.ephoto360.com/paradise-text-effect-online-755.html',
  logocastle: 'https://en.ephoto360.com/castle-text-effect-online-760.html',
  logopalace: 'https://en.ephoto360.com/palace-text-effect-online-761.html',
  logotower: 'https://en.ephoto360.com/tower-text-effect-online-766.html',
  logobridge: 'https://en.ephoto360.com/bridge-text-effect-online-767.html',
  logodiamond: 'https://en.ephoto360.com/diamond-text-effect-online-772.html',
  logoruby: 'https://en.ephoto360.com/ruby-text-effect-online-773.html',
  logoemerald: 'https://en.ephoto360.com/emerald-text-effect-online-774.html',
  logosapphire: 'https://en.ephoto360.com/sapphire-text-effect-online-775.html'
};

const handler = async (m, { conn, args, command }) => {
  
  // Si solo pone .logo
  if (command === 'logo') {
    const listaComandos = Object.keys(logos).map(cmd => `.${cmd}`).join('\n');
    return conn.reply(
      m.chat,
      `✦ ¡Hey! El comando está mal escrito.\n\n📌 *Comandos disponibles:*\n${listaComandos}\n\n💡 *Ejemplo:*\n.logoneon Kevv`,
      m,
      rcanal
    );
  }

  const texto = args.join(' ').trim();

  if (!texto) {
    return conn.reply(
      m.chat,
      `✦ ¡Hey!\nIngresa la palabra.\nEjemplo :\n.${command} Kevv`,
      m,
      rcanal
    );
  }

  const url = logos[command];
  if (!url) return;

  try {
    await conn.sendMessage(m.chat, {
      react: { text: '🖼️', key: m.key }
    });

    await conn.reply(
      m.chat,
      `*Espera por favor, estoy creando tu imagen* 🚀`,
      m,
      rcanal
    );

    const res = await new Maker().Ephoto360(url, [texto]);

    await conn.sendMessage(m.chat, {
      image: { url: res.imageUrl },
      caption: `IMAGEN ENVIADA ☑️\nElite Bot Global - Since 2023®`
    });

    await conn.sendMessage(m.chat, {
      react: { text: '☑️', key: m.key }
    });

  } catch (e) {
    console.error(e);
    await conn.reply(
      m.chat,
      `✦ ¡Hey!\nNo se pudo generar la imagen, intenta con otra palabra.`,
      m,
      rcanal
    );
  }
};

handler.command = ['logo', ...Object.keys(logos)];

export default handler;
