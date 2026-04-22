import { Maker } from 'imagemaker.js';

const logos = {
  imglogo: 'https://en.ephoto360.com/create-3d-gold-text-effect-online-100.html',
  imglogo2: 'https://en.ephoto360.com/create-3d-silver-text-effect-online-101.html',
  imglogo3: 'https://en.ephoto360.com/create-3d-metal-text-effect-online-102.html',
  imglogo4: 'https://en.ephoto360.com/create-3d-neon-text-effect-online-103.html',
  imgcorazon: 'https://en.ephoto360.com/heart-text-effect-online-104.html',
  imgnavidad: 'https://en.ephoto360.com/christmas-text-effect-online-717.html',
  imgcarta: 'https://en.ephoto360.com/love-letter-text-effect-online-105.html',
  imgcumple: 'https://en.ephoto360.com/happy-birthday-text-effect-online-106.html',
  imgglobo: 'https://en.ephoto360.com/balloon-text-effect-online-107.html',
  imgpareja: 'https://en.ephoto360.com/couple-text-effect-online-108.html',
  imgretro: 'https://en.ephoto360.com/sunlight-shadow-text-204.html',
  imgretro2: 'https://en.ephoto360.com/vintage-text-effect-online-712.html',
  imgretro3: 'https://en.ephoto360.com/retro-text-effect-online-734.html',
  imgnube: 'https://en.ephoto360.com/cloud-text-effect-139.html',
  imgdbz: 'https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html',
  imgvidrio: 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html',
  imgvidrio2: 'https://en.ephoto360.com/crystal-glass-text-effect-online-738.html',
  imgcalle: 'https://en.ephoto360.com/street-text-effect-online-109.html',
  imgcalle2: 'https://en.ephoto360.com/graffiti-text-effect-on-pavement-online-110.html',
  imggraffiti: 'https://en.ephoto360.com/graffiti-text-effect-online-710.html',
  imggraffiti2: 'https://en.ephoto360.com/text-graffiti-3d-208.html',
  imggraffiti3: 'https://en.ephoto360.com/graffiti-wall-text-effect-online-111.html',
  imggraffiti4: 'https://en.ephoto360.com/spray-graffiti-text-effect-online-112.html',
  imggraffiti5: 'https://en.ephoto360.com/street-art-graffiti-text-effect-online-113.html',
  imggraffiti6: 'https://en.ephoto360.com/urban-graffiti-text-effect-online-114.html',
  imggraffiti7: 'https://en.ephoto360.com/graffiti-bubble-text-effect-online-115.html',
  imggraffiti8: 'https://en.ephoto360.com/graffiti-wild-style-text-effect-online-116.html'
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

    await conn.sendMessage(m.chat, {
      image: { url: res.imageUrl },
      caption: `*IMAGEN ENVIADA ☑️*\nElite Bot Global - Since 2023®`
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
