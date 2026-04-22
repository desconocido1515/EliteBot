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


  imgprueba: 'https://textpro.me/create-american-flag-3d-text-effect-online-1051.html', 
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
  imglogopareja: 'https://en.ephoto360.com/sunlight-shadow-text-204.html',
  imglogoglitch: 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html',
  imglogogaming: 'https://en.ephoto360.com/make-team-logo-online-free-432.html',
  imglogosolitario: 'https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html',
  imglogodragonball: 'https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html',
  imglogoneon: 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html',
  imglogogatito: 'https://en.ephoto360.com/handwritten-text-on-foggy-glass-online-680.html',
  imglogochicagamer: 'https://en.ephoto360.com/create-cute-girl-gamer-mascot-logo-online-687.html',
  imglogonaruto: 'https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html',
  imglogofuturista: 'https://en.ephoto360.com/light-text-effect-futuristic-technology-style-648.html',
  imglogonube: 'https://en.ephoto360.com/cloud-text-effect-139.html',
  imglogoangel: 'https://en.ephoto360.com/angel-wing-effect-329.html',
  imglogocielo: 'https://en.ephoto360.com/create-a-cloud-text-effect-in-the-sky-618.html',
  imglogograffiti3d: 'https://en.ephoto360.com/text-graffiti-3d-208.html',
  imglogomatrix: 'https://en.ephoto360.com/matrix-text-effect-154.html',
  imglogohorror: 'https://en.ephoto360.com/blood-writing-text-online-77.html',
  imglogoalas: 'https://en.ephoto360.com/the-effect-of-galaxy-angel-wings-289.html',
  imglogoarmy: 'https://en.ephoto360.com/free-gaming-logo-maker-for-fps-game-team-546.html',
  imglogopubg: 'https://en.ephoto360.com/pubg-logo-maker-cute-character-online-617.html',
  imglogopubgfem: 'https://en.ephoto360.com/pubg-mascot-logo-maker-for-an-esports-team-612.html',
  imglogolol: 'https://en.ephoto360.com/make-your-own-league-of-legends-wallpaper-full-hd-442.html',
  imglogoamongus: 'https://en.ephoto360.com/create-a-cover-image-for-the-game-among-us-online-762.html',
  imglogovideopubg: 'https://en.ephoto360.com/lightning-pubg-video-logo-maker-online-615.html',
  imglogovideotiger: 'https://en.ephoto360.com/create-digital-tiger-logo-video-effect-723.html',
  imglogovideointro: 'https://en.ephoto360.com/free-logo-intro-video-maker-online-558.html',
  imglogovideogaming: 'https://en.ephoto360.com/create-elegant-rotation-logo-online-586.html',
  imglogoguerrero: 'https://en.ephoto360.com/create-project-yasuo-logo-384.html',
  imglogoportadaplayer: 'https://en.ephoto360.com/create-the-cover-game-playerunknown-s-battlegrounds-401.html',
  imglogoportadaff: 'https://en.ephoto360.com/create-free-fire-facebook-cover-online-567.html',
  imglogoportadapubg: 'https://en.ephoto360.com/create-facebook-game-pubg-cover-photo-407.html',
  imglogoportadacounter: 'https://en.ephoto360.com/create-youtube-banner-game-cs-go-online-403.html'
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
    await conn.reply(
      m.chat,
      `*Espera por favor, estoy creando tu imagen* 🚀`,
      m,
      rcanal
    );

    const res = await new Maker().Ephoto360(url, [texto]);

    await conn.sendFile(m.chat, res.imageUrl, 'logo.jpg', '', m);

    await conn.reply(
      m.chat,
      `IMAGEN ENVIADA ☑️\nElite Bot Global - Since 2023®`,
      m,
      rcanal
    );
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
