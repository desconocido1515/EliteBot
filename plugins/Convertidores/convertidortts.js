import gtts from 'node-gtts';
import {readFileSync, unlinkSync} from 'fs';
import {join} from 'path';

const defaultLang = 'es';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  let lang = args[0];
  let text = args.slice(1).join(' ');
  
  if ((args[0] || '').length !== 2) {
    lang = defaultLang;
    text = args.join(' ');
  }
  
  if (!text && m.quoted?.text) text = m.quoted.text;
  
  if (!text) {
    return conn.reply(m.chat, `☑️ 𝙸𝙽𝚂𝙴𝚁𝚃𝙴 𝙴𝙻 𝚃𝙴𝚇𝚃𝙾 𝚀𝚄𝙴 𝚀𝚄𝙸𝙴𝚁𝙰 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝚁 𝙰 𝙽𝙾𝚃𝙰 𝙳𝙴 𝚅𝙾𝚉\n\n📝 𝙴𝙹𝙴𝙼𝙿𝙻𝙾: ${usedPrefix + command} es Hola Mundo`, m, rcanal);
  }
  
  await conn.reply(m.chat, `☑️ 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝙴𝙽𝙳𝙾 𝚃𝙴𝚇𝚃𝙾 𝙰 𝙰𝚄𝙳𝙸𝙾...`, m, rcanal);
  
  let res;
  try {
    res = await tts(text, lang);
  } catch (e) {
    console.error(e);
    return conn.reply(m.chat, `☑️ 𝙴𝚁𝚁𝙾𝚁 𝙰𝙻 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝚁 𝙴𝙻 𝚃𝙴𝚇𝚃𝙾, 𝙸𝙽𝚃𝙴𝙽𝚃𝙴 𝙽𝚄𝙴𝚅𝙰𝙼𝙴𝙽𝚃𝙴`, m, rcanal);
  }
  
  if (res) {
    await conn.sendFile(m.chat, res, 'tts.opus', null, m, true);
  }
};

handler.help = ['tts <lang> <teks>'];
handler.tags = ['tools'];
handler.command = /^g?tts$/i;

export default handler;

function tts(text, lang = 'es') {
  console.log(lang, text);
  return new Promise((resolve, reject) => {
    try {
      const tts = gtts(lang);
      const filePath = join(global.__dirname(import.meta.url), '../../tmp', (1 * new Date) + '.wav');
      tts.save(filePath, text, () => {
        resolve(readFileSync(filePath));
        unlinkSync(filePath);
      });
    } catch (e) {
      reject(e);
    }
  });
}
