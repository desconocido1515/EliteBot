import cheerio from 'cheerio';
import axios from 'axios';

const handler = async (m, { conn, text = '', command }) => {

  // 🔥 Validación correcta
  if (!text || text.trim() === '') {
    return conn.reply(
      m.chat,
      '*[❗] 𝙄𝙉𝙂𝙍𝙀𝙎𝘼 𝙀𝙇 𝙉𝙊𝙈𝘽𝙍𝙀 𝘿𝙀 𝘼𝙇𝙂𝙐𝙉 𝙃𝙀𝙉𝙏𝘼𝙄 𝘼 𝘽𝙐𝙎𝘾𝘼𝙍*',
      m
    );
  }

  try {
    const searchResults = await searchHentai(text);

    let teks = searchResults.result.map((v, i) => `
${i + 1}. *_${v.title}_*
↳ 📺 *_Vistas:_* ${v.views}
↳ 🎞️ *_Link:_* ${v.url}`).join('\n\n');

    let randomThumbnail;

    if (searchResults.result.length > 0) {
      const randomIndex = Math.floor(Math.random() * searchResults.result.length);
      randomThumbnail = searchResults.result[randomIndex].thumbnail;
    } else {
      randomThumbnail = 'https://pictures.hentai-foundry.com/e/Error-Dot/577798/Error-Dot-577798-Zero_Two.png';
      teks = '*[❗] 𝙽𝙾 𝚂𝙴 𝙷𝙰𝙽 𝙴𝙽𝙲𝙾𝙽𝚃𝚁𝙰𝙳𝙾 𝚁𝙴𝚂𝚄𝙻𝚃𝙰𝙳𝙾𝚂*';
    }

    await conn.sendFile(m.chat, randomThumbnail, 'result.jpg', teks, m);

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '*[❗] Error al buscar resultados*', m);
  }
};

handler.command = /^(hentaisearch|searchhentai)$/i;
export default handler;


// 🔍 Función de búsqueda
async function searchHentai(search) {
  try {
    const { data } = await axios.get('https://hentai.tv/?s=' + encodeURIComponent(search));
    const $ = cheerio.load(data);

    const result = [];
    
    $('div.flex > div.crsl-slde').each((a, b) => {
      const thumbnail = $(b).find('img').attr('src');
      const title = $(b).find('a').text().trim();
      const views = $(b).find('p').text().trim();
      const url = $(b).find('a').attr('href');

      result.push({ thumbnail, title, views, url });
    });

    return { result };

  } catch (err) {
    console.error(err);
    return { result: [] };
  }
}
