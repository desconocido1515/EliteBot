import { Maker } from 'imagemaker.js';

const handler = async (m, { conn, args }) => {
  const texto = args.join(' ').trim();

  if (!texto) {
    return conn.reply(m.chat, `✦ ¡Hey!\nIngresa las dos palabras separadas por *espacio*\n\n📌 *Ejemplo:*\n.logodeadpool Kevv Elite`, m, rcanal);
  }

  // Separar las palabras por espacio
  const palabras = texto.split(' ');
  if (palabras.length < 2) {
    return conn.reply(m.chat, `✦ ¡Hey!\nDebes ingresar *DOS palabras* separadas por *espacio*\n\n📌 *Ejemplo:*\n.logodeadpool Kevv Elite`, m, rcanal);
  }

  const textoPequeño = palabras[0].trim();
  const textoGrande = palabras.slice(1).join(' ').trim();

  try {
    await conn.sendMessage(m.chat, {
      react: { text: '🖼️', key: m.key }
    });

    await conn.reply(m.chat, `*Espera por favor, estoy creando tu imagen* 🚀`, m, rcanal);

    const url = 'https://en.ephoto360.com/create-pornhub-style-logos-online-free-549.html';
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
