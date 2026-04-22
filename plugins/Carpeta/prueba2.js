import { Maker } from 'imagemaker.js';

const handler = async (m, { conn, args }) => {
  const texto = args.join(' ').trim();

  if (!texto) {
    return conn.reply(m.chat, `✦ ¡Hey!\nIngresa la palabra.\nEjemplo: .logodeadpool Kevv`, m, rcanal);
  }

  try {
    await conn.reply(m.chat, `*Espera por favor, estoy creando tu imagen* 🚀`, m, rcanal);

    const url = 'https://en.ephoto360.com/create-text-effects-in-the-style-of-the-deadpool-logo-818.html';
    const res = await new Maker().Ephoto360(url, [texto]);

    await conn.sendMessage(m.chat, {
      image: { url: res.imageUrl },
      caption: `IMAGEN ENVIADA ☑️\nElite Bot Global - Since 2023®`
    });

  } catch (e) {
    await conn.reply(m.chat, `✦ ¡Hey!\nNo se pudo generar la imagen.`, m, rcanal);
  }
};

handler.command = /^(logodeadpool)$/i;

export default handler;
