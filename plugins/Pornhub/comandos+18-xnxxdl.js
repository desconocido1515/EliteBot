import fetch from 'node-fetch';
import cheerio from 'cheerio';

const handler = async (m, { conn, args = [], command, usedPrefix }) => {

  // 🔥 Validación correcta (ANTES no salía por el throw)
  if (!args[0] || args[0].trim() === '') {
    return conn.reply(
      m.chat,
      `𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 𝙑𝘼𝙇𝙄𝘿𝙊 𝘿𝙀 𝙓𝙉𝙓𝙓\n\n𝙀𝙅𝙀𝙈𝙋𝙇𝙊:\n${usedPrefix + command} https://www.xnxx.com/video-xxxx`,
      m
    );
  }

  try {
    await conn.reply(
      m.chat,
      '➤ 𝙀𝙎𝙋𝙀𝙍𝙀 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍...',
      m
    );

    let xnxxLink = '';

    // 🔥 Detectar si es link directo
    if (args[0].includes('xnxx')) {
      xnxxLink = args[0];
    } else {
      const index = parseInt(args[0]) - 1;

      if (!isNaN(index) && index >= 0) {
        if (Array.isArray(global.videoListXXX)) {
          const userData = global.videoListXXX.find(v => v.from === m.sender);

          if (userData && index < userData.urls.length) {
            xnxxLink = userData.urls[index];
          } else {
            return conn.reply(m.chat, '❌ Índice inválido o sin resultados', m);
          }
        } else {
          return conn.reply(m.chat, '❌ No hay lista disponible', m);
        }
      }
    }

    // 🔥 Validación final
    if (!xnxxLink) {
      return conn.reply(m.chat, '❌ Enlace inválido', m);
    }

    const res = await xnxxdl(xnxxLink);

    if (!res || !res.result || !res.result.files) {
      return conn.reply(m.chat, '❌ No se pudo obtener el video', m);
    }

    const video = res.result.files.high || res.result.files.low;

    if (!video) {
      return conn.reply(m.chat, '❌ Video no disponible', m);
    }

    await conn.sendMessage(
      m.chat,
      {
        document: { url: video },
        mimetype: 'video/mp4',
        fileName: res.result.title || 'video.mp4'
      },
      { quoted: m }
    );

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ Error al procesar el video', m);
  }
};

handler.command = /^(xnxxx)$/i;
handler.register = false;

export default handler;


// 🔥 SCRAPER FIXEADO
async function xnxxdl(URL) {
  try {
    const res = await fetch(URL);
    const html = await res.text();
    const $ = cheerio.load(html);

    const title = $('meta[property="og:title"]').attr('content') || 'Sin título';
    const duration = $('meta[property="og:duration"]').attr('content');
    const image = $('meta[property="og:image"]').attr('content');

    const script = $('script').map((i, el) => $(el).html()).get().join('\n');

    const files = {
      low: (script.match(/html5player\.setVideoUrlLow\('(.*?)'\)/) || [])[1],
      high: (script.match(/html5player\.setVideoUrlHigh\('(.*?)'\)/) || [])[1],
      HLS: (script.match(/html5player\.setVideoHLS\('(.*?)'\)/) || [])[1],
    };

    return {
      status: 200,
      result: {
        title,
        URL,
        duration,
        image,
        files
      }
    };

  } catch (err) {
    console.error(err);
    return null;
  }
}
