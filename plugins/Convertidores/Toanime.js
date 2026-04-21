import uploadImage from '../lib/uploadImage.js';
const handler = async (m, {conn, text, args, usedPrefix, command}) => {
const q = m.quoted ? m.quoted : m;
const mime = (q.msg || q).mimetype || q.mediaType || '';
if (!/image/g.test(mime)) throw `${lenguajeGB.smsAvisoMG()}𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝘼 𝙊 𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝙀 𝘼 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉`
  m.reply(`${lenguajeGB.smsAvisoIIG()}𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙀𝙎𝙏𝙊𝙔 𝘾𝙊𝙉𝙑𝙄𝙍𝙏𝙄𝙀𝙉𝘿𝙊 𝙇𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝘼 𝘿𝙄𝙎𝙀𝙉̃𝙊 𝘼𝙉𝙄𝙈𝙀, 𝙎𝙀𝘼 𝙋𝘼𝘾𝙄𝙀𝙉𝙏𝙀 𝙀𝙉 𝙇𝙊 𝙌𝙐𝙀 𝙀𝙉𝙑𝙄𝙊 𝙀𝙇 𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊`);
const data = await q.download?.();
const image = await uploadImage(data);
try {
const anime = `https://api.lolhuman.xyz/api/imagetoanime?apikey=${lolkeysapi}&img=${image}`;
await conn.sendFile(m.chat, anime, 'error.jpg', null, m);
} catch (i) {
try {
const anime2 = `https://api.zahwazein.xyz/photoeditor/jadianime?url=${image}&apikey=${keysxxx}`;
await conn.sendFile(m.chat, anime2, 'error.jpg', null, m);
} catch (a) {
try {
const anime3 = `https://api.caliph.biz.id/api/animeai?img=${image}&apikey=caliphkey`;
await conn.sendFile(m.chat, anime3, 'error.jpg', null, m);
} catch (e) {
throw `${lenguajeGB.smsAvisoFG()}𝙀𝙍𝙍𝙊𝙍, 𝙑𝙀𝙍𝙄𝙁𝙄𝙌𝙐𝙀 𝙌𝙐𝙀 𝙇𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝙎𝙀𝘼 𝙀𝙇 𝙍𝙊𝙎𝙏𝙍𝙊 𝘿𝙀 𝙐𝙉𝘼 𝙋𝙀𝙍𝙎𝙊𝙉𝘼`
}}}}
handler.help = ['toanime'];
handler.tags = ['tools'];
handler.command = /^(anime|toanime)$/i;
export default handler;
