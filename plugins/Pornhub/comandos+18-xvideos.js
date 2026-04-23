import fetch from 'node-fetch';
import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { conn, args = [], command, usedPrefix }) => {

  // 🔥 VALIDACIÓN (ANTES no se mostraba)
  if (!args[0] || args[0].trim() === '') {
    return conn.reply(
      m.chat,
      `⚠️ INGRESA UN ENLACE DE XVIDEOS\n\nEjemplo:\n${usedPrefix + command} https://www.xvideos.com/video123`,
      m
    );
  }

  try {
    await conn.reply(m.chat, '⏳ Enviando video...', m);

    const res = await xvideosdl(args[0]);

    if (!res || !res.result || !res.result.url) {
      return conn.reply(m.chat, '❌ No se pudo obtener el video', m);
    }

    await conn.sendMessage(
      m.chat,
      {
        document: { url: res.result.url },
        mimetype: 'video/mp4',
        fileName: res.result.title || 'video.mp4'
      },
      { quoted: m }
    );

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ Error, usa un enlace válido', m);
  }
};

handler.command = /^(xvideosdl)$/i;
handler.register = false;

export default handler;


// 🔥 SCRAPER ARREGLADO
async function xvideosdl(url) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    const title = $("meta[property='og:title']").attr("content") || 'Sin título';
    const thumb = $("meta[property='og:image']").attr("content");

    // 🔥 FIX: selector correcto
    const videoUrl = $("#html5video > #html5video_base > div > a").attr("href");

    return {
      status: 200,
      result: {
        title,
        url: videoUrl,
        thumb
      }
    };

  } catch (err) {
    console.error(err);
    return null;
  }
}
