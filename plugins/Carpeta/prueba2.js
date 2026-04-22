import { Maker } from 'imagemaker.js';

const logos = {
  // === 1 PALABRA 
  
  logoassassin: { url: 'https://en.ephoto360.com/create-logo-team-logo-gaming-assassin-style-574.html', palabras: 1 },
  logoshield: { url: 'https://en.ephoto360.com/create-mascot-shield-logo-online-for-free-758.html', palabras: 1 },
  logofootball: { url: 'https://en.ephoto360.com/create-football-team-logo-online-free-671.html', palabras: 1 },
  logominimal: { url: 'https://en.ephoto360.com/free-minimal-logo-maker-online-445.html', palabras: 1 },
  logometal: { url: 'https://en.ephoto360.com/metal-text-effect-online-110.html', palabras: 1 },
  logobw: { url: 'https://en.ephoto360.com/create-a-black-and-white-mascot-logo-371.html', palabras: 1 },
  logoqueen: { url: 'https://en.ephoto360.com/create-a-personalized-queen-card-avatar-730.html', palabras: 1 },
  logoamerican: { url: 'https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html', palabras: 1 },
  logoaov: { url: 'https://en.ephoto360.com/generate-banner-arena-of-valor-aov-with-name-440.html', palabras: 1 },
  logocomix: { url: 'https://en.ephoto360.com/create-online-3d-comic-style-text-effects-817.html', palabras: 1 },
  logorotation: { url: 'https://en.ephoto360.com/create-elegant-rotation-logo-online-586.html', palabras: 1 },
  logointro: { url: 'https://en.ephoto360.com/free-logo-intro-video-maker-online-558.html', palabras: 1 },

  // === 2 PALABRAS ===
  logoletters: { url: 'https://en.ephoto360.com/create-letter-logos-online-for-free-545.html', palabras: 2 },
  logopornhub: { url: 'https://en.ephoto360.com/create-pornhub-style-logos-online-free-549.html', palabras: 2 },
  logomascot: { url: 'https://en.ephoto360.com/create-logo-avatar-mascot-style-364.html', palabras: 2 },
  logocaptain: { url: 'https://en.ephoto360.com/create-a-cinematic-captain-america-text-effect-online-715.html', palabras: 2 },
  logowarzone: { url: 'https://en.ephoto360.com/create-call-of-duty-warzone-youtube-banner-online-548.html', palabras: 2 },
  logoamongus: { url: 'https://en.ephoto360.com/create-a-banner-game-among-us-with-your-name-763.html', palabras: 2 },
  logololbanner: { url: 'https://en.ephoto360.com/create-youtube-banner-league-of-legends-online-428.html', palabras: 2 },
  logowanted: { url: 'https://en.ephoto360.com/one-piece-wanted-237.html', palabras: 2 }
};

const handler = async (m, { conn, args, command }) => {
  const texto = args.join(' ').trim();

  if (!texto) {
    return conn.reply(m.chat, `✦ ¡Hey!\nIngresa el texto.\n\n📌 *Ejemplo:*\n.${command} Kevv`, m, rcanal);
  }

  const config = logos[command];
  if (!config) return;

  const necesitaPalabras = config.palabras;
  const url = config.url;

  // Separar palabras
  const palabras = texto.split(' ');
  
  if (necesitaPalabras === 2 && palabras.length < 2) {
    return conn.reply(m.chat, `✦ ¡Hey!\nEste comando necesita *DOS palabras* separadas por *espacio*\n\n📌 *Ejemplo:*\n.${command} Kevv Elite`, m, rcanal);
  }

  try {
    await conn.sendMessage(m.chat, {
      react: { text: '🖼️', key: m.key }
    });

    await conn.reply(m.chat, `*Espera por favor, estoy creando tu imagen* 🚀`, m, rcanal);

    let res;
    if (necesitaPalabras === 2) {
      const texto1 = palabras[0].trim();
      const texto2 = palabras.slice(1).join(' ').trim();
      res = await new Maker().Ephoto360(url, [texto1, texto2]);
    } else {
      res = await new Maker().Ephoto360(url, [texto]);
    }

    await conn.sendMessage(m.chat, {
      image: { url: res.imageUrl },
      caption: `IMAGEN ENVIADA ☑️\nElite Bot Global - Since 2023®`
    });

    await conn.sendMessage(m.chat, {
      react: { text: '🌟', key: m.key }
    });

  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, `✦ ¡Hey!\nNo se pudo generar la imagen.`, m, rcanal);
  }
};

handler.command = Object.keys(logos);

export default handler;
