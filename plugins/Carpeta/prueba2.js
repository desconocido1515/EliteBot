import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { conn, args }) => {

  const texto = args.join(' ').trim();
  if (!texto) {
    return conn.reply(m.chat, `✦ Ejemplo:\n.logominimal Kevv`, m);
  }

  try {
    await conn.sendMessage(m.chat, {
      react: { text: '🖼️', key: m.key }
    });

    await conn.reply(m.chat, `*Generando logo minimal...* 🚀`, m);

    // 🔥 Paso 1: obtener página
    const { data } = await axios.get('https://en.ephoto360.com/free-minimal-logo-maker-online-445.html');

    const $ = cheerio.load(data);

    const token = $('input[name="token"]').attr('value');
    const build_server = $('#build_server').attr('value');
    const build_server_id = $('#build_server_id').attr('value');

    // 🔥 Paso 2: enviar datos (simula formulario)
    const form = new URLSearchParams();
    form.append('text[]', texto);
    form.append('token', token);
    form.append('build_server', build_server);
    form.append('build_server_id', build_server_id);

    const post = await axios.post(
      'https://en.ephoto360.com/effect/create-image',
      form,
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    );

    const json = post.data;

    if (!json.success) throw 'Error en generación';

    // 🔥 Paso 3: obtener imagen final
    const result = `https:${json.image}`;

    await conn.sendMessage(m.chat, {
      image: { url: result },
      caption: `✔️ Logo minimal generado`
    });

    await conn.sendMessage(m.chat, {
      react: { text: '🌟', key: m.key }
    });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, `❌ Error real al generar logo`, m);
  }
};

handler.command = ['logominimal'];

export default handler;
