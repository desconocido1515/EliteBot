// Créditos base: Starlight team (editado)

import cheerio from 'cheerio';
import axios from 'axios';

let handler = async (m, { conn, args = [], command, usedPrefix }) => {

  // 🔥 VALIDACIÓN CORRECTA
  if (!args[0] || args.join(' ').trim() === '') {
    return conn.reply(
      m.chat,
      `⚠️ Formato incorrecto\n\nEjemplo:\n${usedPrefix + command} con mi prima`,
      m
    );
  }

  try {
    let query = args.join(' ');
    let searchResults = await searchPornhub(query);

    let teks = searchResults.result.map((v, i) => 
`「 *P O R N H U B - S E A R C H* 」
• *Título:* ${v.title}
• *Duración:* ${v.duration}
• *Vistas:* ${v.views}
• *Link:* ${v.url}
-----------------------------------`).join('\n\n');

    if (!searchResults.result.length) {
      teks = '❌ Sin resultados';
    }

    await conn.reply(m.chat, teks, m);

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ Error al buscar', m);
  }
};

handler.command = /^(phsearch|pornhubsearch)$/i;
export default handler;


// 🔍 BUSCADOR
async function searchPornhub(search) {
  try {
    const response = await axios.get(
      `https://www.pornhub.com/video/search?search=${encodeURIComponent(search)}`
    );

    const $ = cheerio.load(response.data);
    const result = [];

    $('ul#videoSearchResult > li.pcVideoListItem').each((a, b) => {
      const title = $(b).find('a').attr('title');
      const duration = $(b).find('var.duration').text().trim();
      const views = $(b).find('var.views').text().trim();
      const url = 'https://www.pornhub.com' + $(b).find('a').attr('href');

      if (title && url) {
        result.push({ title, duration, views, url });
      }
    });

    return { result };

  } catch (error) {
    console.error(error);
    return { result: [] };
  }
}
