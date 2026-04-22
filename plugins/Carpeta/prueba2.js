import { Maker } from 'imagemaker.js';

const logos = {
  logobrillante: 'https://en.ephoto360.com/create-glowing-text-effects-online-706.html',
  logofuego: 'https://en.ephoto360.com/fire-text-effect-online-705.html',
  logoneon: 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html',
  logorombos: 'https://en.ephoto360.com/romantic-text-effect-online-711.html',
  logocristal: 'https://en.ephoto360.com/crystal-text-effect-online-701.html',
  logomadera: 'https://en.ephoto360.com/wood-text-effect-online-704.html',
  logored: 'https://en.ephoto360.com/red-text-effect-online-708.html',
  logolion: 'https://en.ephoto360.com/lion-text-effect-online-709.html',
  logotiger: 'https://en.ephoto360.com/tiger-text-effect-online-710.html',
  logowolf: 'https://en.ephoto360.com/wolf-text-effect-online-711.html',
  logoeagle: 'https://en.ephoto360.com/eagle-text-effect-online-712.html',
  logodragon: 'https://en.ephoto360.com/dragon-text-effect-online-713.html',
  logophoenix: 'https://en.ephoto360.com/phoenix-text-effect-online-714.html',
  logoglass: 'https://en.ephoto360.com/glass-text-effect-online-715.html',
  logomagic: 'https://en.ephoto360.com/magic-text-effect-online-716.html',
  logoroyal: 'https://en.ephoto360.com/royal-text-effect-online-717.html',
  logocrown: 'https://en.ephoto360.com/crown-text-effect-online-718.html',
  logostar: 'https://en.ephoto360.com/star-text-effect-online-719.html',
  logomoon: 'https://en.ephoto360.com/moon-text-effect-online-720.html',
  logogold: 'https://en.ephoto360.com/gold-text-effect-online-707.html',
  logosilver: 'https://en.ephoto360.com/silver-text-effect-online-708.html',
  logobronze: 'https://en.ephoto360.com/bronze-text-effect-online-709.html',
  logoplatinum: 'https://en.ephoto360.com/platinum-text-effect-online-710.html',
  logosteel: 'https://en.ephoto360.com/steel-text-effect-online-711.html',
  logocopper: 'https://en.ephoto360.com/copper-text-effect-online-712.html',
  logobronze2: 'https://en.ephoto360.com/bronze-text-effect-2-online-713.html',
  logorainbow: 'https://en.ephoto360.com/rainbow-text-effect-online-714.html',
  logoflower: 'https://en.ephoto360.com/flower-text-effect-online-715.html',
  logobutterfly: 'https://en.ephoto360.com/butterfly-text-effect-online-716.html',
  logoocean: 'https://en.ephoto360.com/ocean-text-effect-online-717.html',
  logoforest: 'https://en.ephoto360.com/forest-text-effect-online-718.html',
  logomountain: 'https://en.ephoto360.com/mountain-text-effect-online-719.html',
  logodesert: 'https://en.ephoto360.com/desert-text-effect-online-720.html',
  logospace: 'https://en.ephoto360.com/space-text-effect-online-721.html',
  logogalaxy: 'https://en.ephoto360.com/galaxy-text-effect-online-722.html',
  logouniverse: 'https://en.ephoto360.com/universe-text-effect-online-723.html',
  logoplanet: 'https://en.ephoto360.com/planet-text-effect-online-724.html',
  logostorm: 'https://en.ephoto360.com/storm-text-effect-online-725.html',
  logothunder: 'https://en.ephoto360.com/thunder-text-effect-online-726.html',
  logolightning: 'https://en.ephoto360.com/lightning-text-effect-online-727.html',
  logorain: 'https://en.ephoto360.com/rain-text-effect-online-728.html',
  logosnow: 'https://en.ephoto360.com/snow-text-effect-online-729.html',
  logowind: 'https://en.ephoto360.com/wind-text-effect-online-730.html',
  logohurricane: 'https://en.ephoto360.com/hurricane-text-effect-online-731.html',
  logotornado: 'https://en.ephoto360.com/tornado-text-effect-online-732.html',
  logovolcano: 'https://en.ephoto360.com/volcano-text-effect-online-733.html',
  logoearthquake: 'https://en.ephoto360.com/earthquake-text-effect-online-734.html',
  logotsunami: 'https://en.ephoto360.com/tsunami-text-effect-online-735.html',
  logoflood: 'https://en.ephoto360.com/flood-text-effect-online-736.html',
  logofire2: 'https://en.ephoto360.com/fire-text-effect-2-online-737.html',
  logoice2: 'https://en.ephoto360.com/ice-text-effect-2-online-738.html',
  logowater: 'https://en.ephoto360.com/water-text-effect-online-739.html',
  logoleaf: 'https://en.ephoto360.com/leaf-text-effect-online-740.html',
  logotree: 'https://en.ephoto360.com/tree-text-effect-online-741.html',
  logorock: 'https://en.ephoto360.com/rock-text-effect-online-742.html',
  logosand: 'https://en.ephoto360.com/sand-text-effect-online-743.html',
  logodust: 'https://en.ephoto360.com/dust-text-effect-online-744.html',
  logosmoke: 'https://en.ephoto360.com/smoke-text-effect-online-745.html',
  logofog: 'https://en.ephoto360.com/fog-text-effect-online-746.html',
  logomist: 'https://en.ephoto360.com/mist-text-effect-online-747.html',
  logodew: 'https://en.ephoto360.com/dew-text-effect-online-748.html',
  logofrost: 'https://en.ephoto360.com/frost-text-effect-online-749.html',
  logoice3: 'https://en.ephoto360.com/ice-text-effect-3-online-750.html',
  logofire3: 'https://en.ephoto360.com/fire-text-effect-3-online-751.html',
  logoinferno: 'https://en.ephoto360.com/inferno-text-effect-online-752.html',
  logohell: 'https://en.ephoto360.com/hell-text-effect-online-753.html',
  logoheaven: 'https://en.ephoto360.com/heaven-text-effect-online-754.html',
  logoparadise: 'https://en.ephoto360.com/paradise-text-effect-online-755.html',
  logogarden: 'https://en.ephoto360.com/garden-text-effect-online-756.html',
  logopark: 'https://en.ephoto360.com/park-text-effect-online-757.html',
  logozoo: 'https://en.ephoto360.com/zoo-text-effect-online-758.html',
  logofarm: 'https://en.ephoto360.com/farm-text-effect-online-759.html',
  logocastle: 'https://en.ephoto360.com/castle-text-effect-online-760.html',
  logopalace: 'https://en.ephoto360.com/palace-text-effect-online-761.html',
  logotemple: 'https://en.ephoto360.com/temple-text-effect-online-762.html',
  logochurch: 'https://en.ephoto360.com/church-text-effect-online-763.html',
  logomosque: 'https://en.ephoto360.com/mosque-text-effect-online-764.html',
  logosynagogue: 'https://en.ephoto360.com/synagogue-text-effect-online-765.html',
  logotower: 'https://en.ephoto360.com/tower-text-effect-online-766.html',
  logobridge: 'https://en.ephoto360.com/bridge-text-effect-online-767.html',
  logotunnel: 'https://en.ephoto360.com/tunnel-text-effect-online-768.html',
  logocave: 'https://en.ephoto360.com/cave-text-effect-online-769.html',
  logomine: 'https://en.ephoto360.com/mine-text-effect-online-770.html',
  logogoldmine: 'https://en.ephoto360.com/goldmine-text-effect-online-771.html',
  logodiamond: 'https://en.ephoto360.com/diamond-text-effect-online-772.html',
  logoruby: 'https://en.ephoto360.com/ruby-text-effect-online-773.html',
  logoemerald: 'https://en.ephoto360.com/emerald-text-effect-online-774.html',
  logosapphire: 'https://en.ephoto360.com/sapphire-text-effect-online-775.html',
  logotopaz: 'https://en.ephoto360.com/topaz-text-effect-online-776.html',
  logoamethyst: 'https://en.ephoto360.com/amethyst-text-effect-online-777.html',
  logojade: 'https://en.ephoto360.com/jade-text-effect-online-778.html',
  logoopal: 'https://en.ephoto360.com/opal-text-effect-online-779.html',
  logopearl: 'https://en.ephoto360.com/pearl-text-effect-online-780.html',
  logocoral: 'https://en.ephoto360.com/coral-text-effect-online-781.html',
  logojet: 'https://en.ephoto360.com/jet-text-effect-online-782.html',
  logoonyx: 'https://en.ephoto360.com/onyx-text-effect-online-783.html',
  logoquartz: 'https://en.ephoto360.com/quartz-text-effect-online-784.html'
};

const handler = async (m, { conn, args, command }) => {
  
  // Si solo pone .logo (sin comando específico)
  if (command === 'logo') {
    // Crear lista de comandos disponibles
    const listaComandos = Object.keys(logos).map(cmd => `.${cmd}`).join('\n');
    
    return conn.reply(
      m.chat,
      `✦ ¡Hey! El comando está mal escrito.\n\n📌 *Comandos disponibles:*\n${listaComandos}\n\n💡 *Ejemplo:*\n.logolion Kevv`,
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

// El comando .logo muestra la ayuda
handler.command = ['logo', ...Object.keys(logos)];

export default handler;
