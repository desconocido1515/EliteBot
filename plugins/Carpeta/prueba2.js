import { Maker } from 'imagemaker.js';

let handler = async (m, { conn, args }) => {

  const texto = args.join(' ').trim();

  if (!texto) {
    return conn.reply(
      m.chat,
      `✦ Ingresa un texto\n\n📌 Ejemplo:\n.logominimal Kevv`,
      m
    );
  }

  try {
    await conn.sendMessage(m.chat, {
      react: { text: '🖼️', key: m.key }
    });

    await conn.reply(
      m.chat,
      `*Creando logo minimal...* 🚀`,
      m
    );

    const url = 'https://en.ephoto360.com/free-minimal-logo-maker-online-445.html';

    let res;
    const colores = ['1', '2', '3', '4', '5', '6'];

    // 🔥 intenta con todos los colores automáticamente
    for (let color of colores) {
      try {
        res = await new Maker().Ephoto360(url, [texto, color]);

        if (res?.imageUrl) break;

      } catch (e) {
        console.log('Color falló:', color);
      }
    }

    if (!res?.imageUrl) {
      throw 'No se pudo generar la imagen';
    }

    await conn.sendMessage(m.chat, {
      image: { url: res.imageUrl },
      caption: `✔️ Logo minimal generado`
    });

    await conn.sendMessage(m.chat, {
      react: { text: '🌟', key: m.key }
    });

  } catch (e) {
    console.error(e);
    conn.reply(
      m.chat,
      `❌ Error al generar el logo`,
      m
    );
  }
};

handler.command = ['logominimal'];

export default handler;
