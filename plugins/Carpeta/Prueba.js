import { Maker } from 'imagemaker.js';

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

    let url = '';
    switch (command) {
      case 'imgcorazon':
        url = 'https://en.ephoto360.com/text-heart-flashlight-188.html';
        break;
      case 'imgnavidad':
        url = 'https://en.ephoto360.com/christmas-effect-by-name-376.html';
        break;
      case 'imgcarta':
        url = 'https://en.ephoto360.com/love-card-187.html';
        break;
      case 'imgpareja':
        url = 'https://en.ephoto360.com/sunlight-shadow-text-204.html';
        break;
      case 'imgretro':
        url = 'https://en.ephoto360.com/create-online-typography-art-effects-with-multiple-layers-811.html';
        break;
      case 'imgretro2':
        url = 'https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html';
        break;
      case 'imgdbz':
        url = 'https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html';
        break;
      case 'imgcalle':
        url = 'https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html';
        break;
      case 'imgvidrio':
        url = 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html';
        break;
      case 'imggrafiti':
        url = 'https://en.ephoto360.com/graffiti-text-5-180.html';
        break;
      case 'imggrafiti2':
        url = 'https://en.ephoto360.com/graffiti-color-199.html';
        break;
      case 'imggrafiti3':
        url = 'https://en.ephoto360.com/text-graffiti-3d-208.html';
        break;
      case 'imggrafiti4':
        url = 'https://en.ephoto360.com/cover-graffiti-181.html';
        break;
      case 'imggrafiti5':
        url = 'https://en.ephoto360.com/graffiti-text-3-179.html';
        break;
      case 'imggrafiti6':
        url = 'https://en.ephoto360.com/graffiti-text-text-effect-online-178.html';
        break;
      case 'imggrafiti7':
        url = 'https://en.ephoto360.com/graffiti-color-199.html';
        break;
      case 'imggrafiti8':
        url = 'https://en.ephoto360.com/graffiti-lettering-online-64.html';
        break;
      case 'imglogo':
        url = 'https://en.ephoto360.com/create-a-black-and-white-mascot-logo-371.html';
        break;
      case 'imglogo2':
        url = 'https://en.ephoto360.com/create-a-gaming-mascot-logo-free-560.html';
        break;
      case 'imglogo3':
        url = 'https://en.ephoto360.com/make-team-logo-online-free-432.html';
        break;
      case 'imglogo4':
        url = 'https://en.ephoto360.com/metal-mascots-logo-maker-486.html';
        break;
      case 'imgcumple':
        url = 'https://en.ephoto360.com/colorful-birthday-foil-balloon-text-effects-620.html';
        break;
      case 'imgglobo':
        url = 'https://en.ephoto360.com/writing-your-name-on-hot-air-balloon-506.html';
        break;
      case 'imgnube':
        url = 'https://en.ephoto360.com/cloud-text-effect-139.html';
        break;
      case 'imgvidrio2':
        url = 'https://en.ephoto360.com/foggy-rainy-text-effect-75.html';
        break;
      case 'imgcalle2':
        url = 'https://en.ephoto360.com/create-glowing-text-effects-online-706.html';
        break;
      case 'imgretro3':
        url = 'https://en.ephoto360.com/paint-splatter-text-effect-72.html';
        break;
      default:
        return conn.reply(m.chat, `✦ Comando no válido`, m, rcanal);
    }

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

handler.command = /^(imgcorazon|imgnavidad|imgcarta|imgpareja|imgretro|imgretro2|imgdbz|imgcalle|imgvidrio|imggrafiti|imggrafiti2|imggrafiti3|imggrafiti4|imggrafiti5|imggrafiti6|imggrafiti7|imggrafiti8|imglogo|imglogo2|imglogo3|imglogo4|imgcumple|imgglobo|imgnube|imgvidrio2|imgcalle2|imgretro3)$/i;

export default handler;
