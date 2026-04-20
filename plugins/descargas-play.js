import fetch from "node-fetch";
import yts from "yt-search";

const yt = {
  static: Object.freeze({
    baseUrl: 'https://cnv.cx',
    headers: {
      'accept-encoding': 'gzip, deflate, br, zstd',
      'origin': 'https://frame.y2meta-uk.com',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36'
    }
  }),

  resolvePayload(link, f) {
    const tipo = f.endsWith('k') ? 'mp3' : 'mp4';
    return {
      link,
      format: tipo,
      audioBitrate: tipo === 'mp3' ? f.replace('k', '') : '128',
      videoQuality: tipo === 'mp4' ? f.replace('p', '') : '480',
      filenameStyle: 'pretty',
      vCodec: 'h264'
    };
  },

  sanitize(name) {
    return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  },

  async getKey() {
    const r = await fetch(this.static.baseUrl + '/v2/sanity/key', {
      headers: this.static.headers
    });

    const j = await r.json();
    if (!j?.key) throw new Error('Key inválida');
    return j.key;
  },

  async convert(url, f) {
    const key = await this.getKey();
    const payload = this.resolvePayload(url, f);

    const r = await fetch(this.static.baseUrl + '/v2/converter', {
      method: 'POST',
      headers: { ...this.static.headers, key },
      body: new URLSearchParams(payload)
    });

    const j = await r.json();
    if (!j?.url) throw new Error('No se pudo convertir');
    return j;
  }
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text || !text.trim()) {
    throw `⭐ 𝘌𝘯𝘷𝘪𝘢 𝘦𝘭 𝘯𝘰𝘮𝘣𝘳𝘦 𝘥𝘦 𝘭𝘢 𝘤𝘢𝘯𝘤𝘪ó𝘯\n\n» 𝘌𝘫𝘦𝘮𝘱𝘭𝘰: ${usedPrefix + command} Bad Bunny - Monaco`;
  }

  try {
    await conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

    const searchResults = await yts({ query: text.trim(), hl: 'es', gl: 'ES' });
    const video = searchResults.videos[0];
    if (!video) throw new Error("No se encontró el video");

    if (video.seconds > 600) {
      throw "❌ El audio es muy largo (máximo 10 minutos)";
    }

    await conn.sendMessage(m.chat, {
      text: `01:27 ━━━━━⬤────── 05:48\n*⇄ㅤ      ◁        ❚❚        ▷        ↻*\n╴𝗘𝗹𝗶𝘁𝗲 𝗕𝗼𝘁 𝗚𝗹𝗼𝗯𝗮𝗹`,
      contextInfo: {
        externalAdReply: {
          title: video.title.slice(0, 60),
          body: "",
          thumbnailUrl: video.thumbnail,
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true,
          sourceUrl: video.url
        }
      }
    }, { quoted: m });

    // EXACTAMENTE como el primer código que sí funcionaba
    const formato = '128k';
    const data = await yt.convert(video.url, formato);

    const fileName = yt.sanitize(data.filename || video.title);

    const r = await fetch(data.url, {
      headers: {
        'user-agent': 'Mozilla/5.0'
      }
    });

    if (!r.ok) throw new Error(`Error al descargar audio: HTTP ${r.status}`);

    const buffer = Buffer.from(await r.arrayBuffer());

    await conn.sendMessage(
      m.chat,
      {
        audio: buffer,
        mimetype: 'audio/mpeg',
        fileName: `${fileName}.mp3`,
        ptt: false
      },
      { quoted: m }
    );

    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

  } catch (error) {
    console.error("Error real en play:", error);

    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });

    const errorMsg = typeof error === 'string'
      ? error
      : `❌ *Error:* ${error.message || 'Ocurrió un problema'}\n\n` +
        `🔸 *Posibles soluciones:*\n` +
        `• Verifica el nombre de la canción\n` +
        `• Intenta con otro tema\n` +
        `• Prueba más tarde`;

    await conn.sendMessage(m.chat, { text: errorMsg }, { quoted: m });
  }
};

handler.command = ['play', 'playaudio', 'ytmusic'];
handler.exp = 0;
export default handler;
