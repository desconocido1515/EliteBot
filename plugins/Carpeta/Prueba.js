import { Maker } from 'imagemaker.js';

const logos = {
  imgvidrio: 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html',
  imgretro: 'https://en.ephoto360.com/sunlight-shadow-text-204.html',
  imgneon: 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html',
  imgglitch: 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html',
  imggaming: 'https://en.ephoto360.com/make-team-logo-online-free-432.html',
  imgsolitario: 'https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html',
  imgdragonball: 'https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html',
  imggatito: 'https://en.ephoto360.com/handwritten-text-on-foggy-glass-online-680.html',
  imgchicagamer: 'https://en.ephoto360.com/create-cute-girl-gamer-mascot-logo-online-687.html',
  imgnaruto: 'https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html',
  imgfuturista: 'https://en.ephoto360.com/light-text-effect-futuristic-technology-style-648.html',
  imgnube: 'https://en.ephoto360.com/cloud-text-effect-139.html',
  imgangel: 'https://en.ephoto360.com/angel-wing-effect-329.html',
  imgcielo: 'https://en.ephoto360.com/create-a-cloud-text-effect-in-the-sky-618.html',
  imggraffiti3d: 'https://en.ephoto360.com/text-graffiti-3d-208.html',
  imgmatrix: 'https://en.ephoto360.com/matrix-text-effect-154.html',
  imghorror: 'https://en.ephoto360.com/blood-writing-text-online-77.html',
  imgarmy: 'https://en.ephoto360.com/free-gaming-logo-maker-for-fps-game-team-546.html',
  imgpubg: 'https://en.ephoto360.com/pubg-logo-maker-cute-character-online-617.html',
  imglol: 'https://en.ephoto360.com/make-your-own-league-of-legends-wallpaper-full-hd-442.html',
  imgamongus: 'https://en.ephoto360.com/create-a-cover-image-for-the-game-among-us-online-762.html',
  imgvideopubg: 'https://en.ephoto360.com/lightning-pubg-video-logo-maker-online-615.html',
  imgvideotiger: 'https://en.ephoto360.com/create-digital-tiger-logo-video-effect-723.html',
  imgvideointro: 'https://en.ephoto360.com/free-logo-intro-video-maker-online-558.html',
  imgvideogaming: 'https://en.ephoto360.com/create-elegant-rotation-logo-online-586.html',
  imgguerrero: 'https://en.ephoto360.com/create-project-yasuo-logo-384.html',
  imgportadaplayer: 'https://en.ephoto360.com/create-the-cover-game-playerunknown-s-battlegrounds-401.html',
  imgportadaff: 'https://en.ephoto360.com/create-free-fire-facebook-cover-online-567.html',
  imgportadapubg: 'https://en.ephoto360.com/create-facebook-game-pubg-cover-photo-407.html',
  imgportadacounter: 'https://en.ephoto360.com/create-youtube-banner-game-cs-go-online-403.html',
  img3d: 'https://en.ephoto360.com/3d-text-effect-online-685.html',
  imgcarbon: 'https://en.ephoto360.com/carbon-fiber-text-effect-online-700.html',
  imgcristal: 'https://en.ephoto360.com/crystal-text-effect-online-701.html',
  imgmetal: 'https://en.ephoto360.com/metal-text-effect-online-702.html',
  imgpapel: 'https://en.ephoto360.com/paper-text-effect-online-703.html',
  imgmadera: 'https://en.ephoto360.com/wood-text-effect-online-704.html',
  imgfuego: 'https://en.ephoto360.com/fire-text-effect-online-705.html',
  imgfrio: 'https://en.ephoto360.com/ice-text-effect-online-706.html',
  imgdorado: 'https://en.ephoto360.com/gold-text-effect-online-707.html',
  imgplateado: 'https://en.ephoto360.com/silver-text-effect-online-708.html',
  imgbrillante: 'https://en.ephoto360.com/shiny-text-effect-online-709.html',
  imggraffiti: 'https://en.ephoto360.com/graffiti-text-effect-online-710.html',
  imgromantico: 'https://en.ephoto360.com/romantic-text-effect-online-711.html',
  imgvintage: 'https://en.ephoto360.com/vintage-text-effect-online-712.html',
  imgmoderno: 'https://en.ephoto360.com/modern-text-effect-online-713.html',
  imgelegante: 'https://en.ephoto360.com/elegant-text-effect-online-714.html',
  imgcalavera: 'https://en.ephoto360.com/skull-text-effect-online-715.html',
  imghalloween: 'https://en.ephoto360.com/halloween-text-effect-online-716.html',
  imgnavidad: 'https://en.ephoto360.com/christmas-text-effect-online-717.html',
  imgpokemon: 'https://en.ephoto360.com/pokemon-text-effect-online-718.html',
  imgspiderman: 'https://en.ephoto360.com/spiderman-text-effect-online-719.html',
  imgbatman: 'https://en.ephoto360.com/batman-text-effect-online-720.html',
  imgsuperman: 'https://en.ephoto360.com/superman-text-effect-online-721.html',
  imgmarvel: 'https://en.ephoto360.com/marvel-text-effect-online-722.html',
  imgdc: 'https://en.ephoto360.com/dc-comics-text-effect-online-723.html',
  imgfutbol: 'https://en.ephoto360.com/soccer-text-effect-online-724.html',
  imgbasquet: 'https://en.ephoto360.com/basketball-text-effect-online-725.html',
  imgrock: 'https://en.ephoto360.com/rock-text-effect-online-726.html',
  imgrap: 'https://en.ephoto360.com/rap-text-effect-online-727.html',
  imgregueton: 'https://en.ephoto360.com/reggaeton-text-effect-online-728.html',
  imgkpop: 'https://en.ephoto360.com/kpop-text-effect-online-729.html',
  imganime: 'https://en.ephoto360.com/anime-text-effect-online-730.html',
  imgmanga: 'https://en.ephoto360.com/manga-text-effect-online-731.html',
  imgcartoon: 'https://en.ephoto360.com/cartoon-text-effect-online-732.html',
  imgpixel: 'https://en.ephoto360.com/pixel-text-effect-online-733.html',
  imgvaporwave: 'https://en.ephoto360.com/vaporwave-text-effect-online-735.html',
  imgcyberpunk: 'https://en.ephoto360.com/cyberpunk-text-effect-online-736.html',
  imgsteampunk: 'https://en.ephoto360.com/steampunk-text-effect-online-737.html'
};

const handler = async (m, { conn, args, command }) => {
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

    // Enviar imagen con el texto incluido en el caption
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

handler.command = Object.keys(logos);

export default handler;
