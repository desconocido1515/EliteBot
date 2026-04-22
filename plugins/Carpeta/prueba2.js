import { Maker } from 'imagemaker.js';

let handler = async (m, { conn, args }) => {

  const texto = args.join(' ').trim();

  if (!texto) {
    return conn.reply(
      m.chat,
      `✦ Ejemplo:\n.logominimal Kevv`,
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

    // 🔥 AUTO COLOR + ANTI ERROR
    for (let color of colores) {
      try {
        let temp = await new Maker().Ephoto360(url, [texto, color]);

        if (temp && temp.imageUrl) {
          res = temp;
          break;
        }

      } catch (e) {
        console.log('falló color:', color);
      }
    }

    // 👉 si no responde
    if (!res) {
      return conn.reply(
        m.chat,
        `❌ No se pudo generar el logo (Ephoto360 no respondió)`,
        m
      );
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
      `❌ Error al generar logo`,
      m
    );
  }
};

handler.command = ['logominimal'];

export default handler;
