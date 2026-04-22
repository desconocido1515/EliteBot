import { Maker } from 'imagemaker.js';

const handler = async (m, { conn, args }) => {
  const texto = args.join(' ').trim();

  if (!texto) {
    return conn.reply(m.chat, `✦ ¡Hey!\nIngresa las dos palabras separadas por *|*\n\n📌 *Ejemplo:*\n.logodeadpool Kevv|Elite`, m, rcanal);
  }

  // Separar las dos palabras
  const palabras = texto.split('|');
  if (palabras.length < 2) {
    return conn.reply(m.chat, `✦ ¡Hey!\nDebes ingresar *DOS palabras* separadas por *|*\n\n📌 *Ejemplo:*\n.logodeadpool Kevv|Elite`, m, rcanal);
  }

  const textoPequeño = palabras[0].trim();
  const textoGrande = palabras[1].trim();

  try {
    await conn.sendMessage(m.chat, {
      react: { text: '🖼️', key: m.key }
    });

    await conn.reply(m.chat, `*Espera por favor, estoy creando tu imagen* 🚀`, m, rcanal);

    const url = 'https://en.ephoto360.com/create-text-effects-in-the-style-of-the-deadpool-logo-818.html';
    const res = await new Maker().Ephoto360(url, [textoPequeño, textoGrande]);

    await conn.sendMessage(m.chat, {
      image: { url: res.imageUrl },
      caption: `IMAGEN ENVIADA ☑️\nElite Bot Global - Since 2023®`
    });

    await conn.sendMessage(m.chat, {
      react: { text: '☑️', key: m.key }
    });

  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, `✦ ¡Hey!\nNo se pudo generar la imagen.`, m, rcanal);
  }
};

handler.command = /^(logodeadpool)$/i;

export default handler;
