import { Maker } from 'imagemaker.js';

const logos = {
  logobrillante: 'https://en.ephoto360.com/create-glowing-text-effects-online-706.html',
  logofuego: 'https://en.ephoto360.com/fire-text-effect-online-705.html',
  logoneon: 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html',
  logorombos: 'https://en.ephoto360.com/romantic-text-effect-online-711.html',
  logovidrio: 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html',
  logograffiti: 'https://en.ephoto360.com/graffiti-text-effect-online-710.html',
  logonube: 'https://en.ephoto360.com/cloud-text-effect-139.html'
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
