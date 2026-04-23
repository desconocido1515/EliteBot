import fetch from 'node-fetch';
import cheerio from 'cheerio';

const handler = async (m, { conn, text = '', usedPrefix, command }) => {

  // 🔥 VALIDACIÓN (YA NO USA THROW)
  if (!text || text.trim() === '') {
    return conn.reply(
      m.chat,
      `⚠️ Ejemplo de uso:\n${usedPrefix + command} naruto`,
      m
    );
  }

  try {
    const vids_ = {
      from: m.sender,
      urls: [],
    };

    // 🔥 Reset lista
    if (!global.videoListXXX) global.videoListXXX = [];
    global.videoListXXX = global.videoListXXX.filter(v => v.from !== m.sender);

    const res = await xnxxsearch(text);
    const json = res.result;

    if (!json || json.length === 0) {
      return conn.reply(m.chat, '❌ Sin resultados', m);
    }

    let cap = `🔍 RESULTADOS: ${text.toUpperCase()}\n\n`;

    let count = 1;
    for (const v of json) {
      vids_.urls.push(v.link);

      cap += `*[${count}]*\n`;
      cap += `• 🎬 Título: ${v.title}\n`;
      cap += `• 🔗 Link: ${v.link}\n`;
      cap += `• ℹ️ Info: ${v.info}\n`;
      cap += `------------------------\n\n`;

      count++;
    }

    await conn.reply(m.chat, cap, m);

    global.videoListXXX.push(vids_);

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ Error al buscar', m);
  }
};

handler.help = ['xnxxsearch <texto>'];
handler.tags = ['search'];
handler.command = /^(xnxxsearch|xnxxs)$/i;
handler.register = false;
handler.group = true;

export default handler;


// 🔍 BUSCADOR FIX
async function xnxxsearch(query) {
  try {
    const baseurl = 'https://www.xnxx.com';
    const res = await fetch(`${baseurl}/search/${encodeURIComponent(query)}/${Math.floor(Math.random() * 3) + 1}`);
    const html = await res.text();

    const $ = cheerio.load(html);

    const results = [];

    $('div.mozaique').each((a, b) => {
      $(b).find('div.thumb').each((i, el) => {
        const link = baseurl + $(el).find('a').attr('href')?.replace('/THUMBNUM/', '/');
        
        const parent = $(el).parent();
        const title = parent.find('a').attr('title');
        const info = parent.find('p.metadata').text();

        if (link && title) {
          results.push({
            title,
            info,
            link
          });
        }
      });
    });

    return {
      status: true,
      result: results
    };

  } catch (err) {
    console.error(err);
    return {
      status: false,
      result: []
    };
  }
}
