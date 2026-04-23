// plugins/interacciones.js

import fs, { promises } from 'fs'
import fetch from 'node-fetch'

// ==================== TEXTOS POR COMANDO (3 cada uno) ====================

// ABRAZAR
const textosAbrazar = [
  (from, who) => `*@${from}* 𝙏𝙀 𝘿𝙄𝙊 𝙐𝙉 𝘼𝘽𝙍𝘼𝙕𝙊 𝘿𝙀 𝙊𝙎𝙊 𝘼 *@${who}* , 𝙀𝙍𝙀𝙎 𝙐𝙉𝘼 𝙂𝙍𝘼𝙉 𝙋𝙀𝙍𝙎𝙊𝙉𝘼, 𝙏𝙀 𝘼𝘿𝙈𝙄𝙍𝘼 𝙔 𝙀𝙎𝙏𝘼 𝙊𝙍𝙂𝙐𝙇𝙇𝙊𝙎𝙊 𝘿𝙀 𝙏𝙄. 😍\n━━━━━━━━━━━━━━━\n*@${who}*\n 𝙏𝙀 𝘿𝙄𝙀𝙍𝙊𝙉 𝙐𝙉 𝘼𝘽𝙍𝘼𝙕𝙊. 🫂`,
  (from, who) => `*@${from}* 𝙇𝙀 𝘿𝙄𝙊 𝙐𝙉 𝘼𝘽𝙍𝘼𝙕𝙊 𝘼 *@${who}* 🤗\n━━━━━━━━━━━━━━━\n*@${who}*\n 𝙍𝙀𝘾𝙄𝘽𝙄𝙊 𝙐𝙉 𝘼𝘽𝙍𝘼𝙕𝙊 𝙈𝙐𝙔 𝙁𝙐𝙀𝙍𝙏𝙀. 💪`,
  (from, who) => `*@${from}* 𝘼𝘽𝙍𝘼𝙕𝙊 𝘼 *@${who}* 𝘾𝙊𝙉 𝙏𝙊𝘿𝘼 𝙎𝙐 𝘼𝙇𝙈𝘼 ❤️\n━━━━━━━━━━━━━━━\n*@${who}*\n 𝙌𝙐𝙀 𝘽𝙊𝙉𝙄𝙏𝙊 𝘼𝘽𝙍𝘼𝙕𝙊. 🫂`
]

// BAILAR
const textosBailar = [
  (from, who) => `━━━━━━━━━━━━━━━━━━\n🎉 *¡@${from} está bailando con @${who}!* 💃🏻🕺🏻✨\n\n🎶 *¡Que suene la música y a disfrutar!* 🎶\n\n💖 *Que el ritmo los acompañe* 💖\n\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`,
  (from, who) => `━━━━━━━━━━━━━━━━━━\n💃 *@${from} y @${who} están bailando salsa!* 🕺\n\n🎵 *¡Que viva la fiesta!* 🎵\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`,
  (from, who) => `━━━━━━━━━━━━━━━━━━\n🕺 *@${from} invitó a bailar a @${who}!* 💃\n\n✨ *¡A mover el esqueleto!* ✨\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`
]

// BAÑAR
const textosBañar = [
  (from, who) => `━━━━━━━━━━━━━━━━━━\n🛁 *@${from} está bañándose con @${who}!* 🛀🏻🚿✨\n\n💖 *¡Relájate y disfruten del baño!*\n\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`,
  (from, who) => `━━━━━━━━━━━━━━━━━━\n🛀 *@${from} y @${who} están compartiendo un baño relajante* 🫧\n\n💫 *¡Pura armonía!*\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`,
  (from, who) => `━━━━━━━━━━━━━━━━━━\n🚿 *@${from} le está echando agua a @${who}!* 🛁\n\n😊 *¡Qué divertido!*\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`
]

// BESAR
const textosBesar = [
  (from, who) => `*@${from}* 𝙀𝙎𝙏𝘼 𝘽𝙀𝙎𝘼𝙉𝘿𝙊 𝘼 *@${who}* ♥️\n━━━━━━━━━━━━━━━\n*@${who}*\n 𝙏𝙀 𝘼𝘾𝘼𝘽𝘼𝙉 𝘿𝙀 𝘽𝙀𝙎𝘼𝙍. 🥺`,
  (from, who) => `*@${from}* 𝙇𝙀 𝘿𝙄𝙊 𝙐𝙉 𝘽𝙀𝙎𝙊 𝙀𝙉 𝙇𝘼 𝙈𝙀𝙅𝙄𝙇𝙇𝘼 𝘼 *@${who}* 💋\n━━━━━━━━━━━━━━━\n*@${who}*\n 𝙌𝙐𝙀 𝘿𝙐𝙇𝘾𝙀. 🥰`,
  (from, who) => `*@${from}* 𝘽𝙀𝙎𝙊 𝘼 *@${who}* 𝘾𝙊𝙉 𝙋𝘼𝙎𝙄𝙊𝙉 🔥\n━━━━━━━━━━━━━━━\n*@${who}*\n 𝙌𝙐𝙀𝘿𝙊 𝙀𝙉𝘼𝙈𝙊𝙍𝘼𝘿𝙊/𝘼. 💕`
]

// CENAR
const textosCenar = [
  (from, who) => `━━━━━━━━━━━━━━━━━━\n🍕 *@${from}* 𝘵𝘪𝘦𝘯𝘦 𝘶𝘯𝘢 𝘤𝘦𝘯𝘢 𝘳𝘰𝘮𝘢𝘯𝘵𝘪𝘤𝘢 𝘤𝘰𝘯 *@${who}* 🍷\n\n💖 *¡Que la cena sea deliciosa y romántica!* ✨\n\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`,
  (from, who) => `━━━━━━━━━━━━━━━━━━\n🍝 *@${from} invitó a cenar a @${who}!* 🍷\n\n🌹 *Noche romántica asegurada*\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`,
  (from, who) => `━━━━━━━━━━━━━━━━━━\n🍽️ *@${from} y @${who} están cenando a la luz de las velas* 🕯️\n\n💫 *¡Qué romántico!*\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`
]

// DAR CHOCOLATE
const textosChocolate = [
  (from, who) => `━━━━━━━━━━━━━━━━━━\n🎉 *¡Felicidades, @${from}!* 🎉\n\n🍫 *¡Le diste un delicioso chocolate a @${who}!* 🤩\n\n💖 *Disfrútenlo con mucho amor* 💖\n\n✨ *¡Qué dulce momento!* ✨\n\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`,
  (from, who) => `━━━━━━━━━━━━━━━━━━\n🍬 *@${from} le regaló un chocolate a @${who}!* 🍫\n\n😊 *¡Qué detalle tan dulce!*\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`,
  (from, who) => `━━━━━━━━━━━━━━━━━━\n🎁 *@${from} sorprendió a @${who} con un chocolate!* 🍫\n\n💕 *El amor es dulce como el chocolate*\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`
]

// COGER
const textosCoger = [
  (from, who) => `*@${from}* 𝙏𝙀 𝘼𝘾𝘼𝘽𝘼𝙎 𝘿𝙀 𝘾𝙊𝙂𝙀𝙍 𝘼 𝙇𝘼 𝙋𝙐𝙏𝙄𝙏𝘼 𝘿𝙀 *@${who}* 𝙈𝙄𝙀𝙉𝙏𝙍𝘼𝙎 𝙏𝙀 𝘿𝙀𝘾𝙄𝘼 "𝙢𝙚𝙩𝙚𝙢𝙚𝙡𝙖 𝙙𝙪𝙧𝙤𝙤𝙤 𝙢𝙖́𝙨 𝙙𝙪𝙧𝙤𝙤𝙤 𝙦𝙪𝙚 𝙧𝙞𝙘𝙤 𝙥𝙞𝙩𝙤𝙩𝙚"...\n𝙏𝙚𝙣𝙚𝙢𝙤𝙨 𝙦𝙪𝙚 𝙫𝙤𝙡𝙫𝙚𝙧 𝙖 𝙨𝙪𝙙𝙖𝙧 𝙟𝙪𝙣𝙩𝙤𝙨!!\n━━━━━━━━━━━━━━━\n*@${who}*\n 𝙏𝙀 𝘼𝘾𝘼𝘽𝘼𝙉 𝘿𝙀 𝘾𝙊𝙂𝙀𝙍.\n 💦💦🍆🍆💦💦`,
  (from, who) => `*@${from}* 𝙎𝙀 𝘼𝘾𝙊𝙎𝙏𝙊́ 𝘾𝙊𝙉 *@${who}* 🔥\n━━━━━━━━━━━━━━━\n*@${who}*\n 𝙌𝙐𝙀𝘿𝙊 𝘿𝙀𝙎𝙃𝙀𝘾𝙃𝙊/𝘼. 💦`,
  (from, who) => `*@${from}* 𝙇𝙇𝙀𝙉𝙊́ 𝘿𝙀 𝙋𝙇𝘼𝘾𝙀𝙍 𝘼 *@${who}* 🌙\n━━━━━━━━━━━━━━━\n*@${who}*\n 𝙉𝙊 𝙋𝙐𝙀𝘿𝙀 𝘾𝘼𝙈𝙄𝙉𝘼𝙍. 🤤`
]

// FOLLAR
const textosFollar = [
  (from, who) => `*@${from}* 𝙏𝙀 𝘼𝘾𝘼𝘽𝘼𝙎 𝘿𝙀 𝙁𝙊𝙇𝙇𝘼𝙍 𝘼 𝙇𝘼 𝙋𝙀𝙍𝙍𝘼 𝘿𝙀 *@${who}* 𝙀𝙉 4 𝙈𝙄𝙀𝙉𝙏𝙍𝘼𝙎 𝙏𝙀 𝙂𝙀𝙈𝙄𝘼 𝘾𝙊𝙈𝙊 𝙐𝙉𝘼 𝙈𝘼𝙇𝘿𝙄𝙏𝘼 𝙋𝙀𝙍𝙍𝘼 "𝘼𝙖𝙖𝙝 ... 𝘼𝙖𝙖𝙝, 𝙨𝙞𝙜𝙪𝙚 𝙣𝙤 𝙥𝙖𝙧𝙚𝙨 𝙣𝙤 𝙥𝙖𝙧𝙚𝙨 ... 𝙔 𝙇𝘼 𝙃𝘼𝙕 𝘿𝙀𝙅𝘼𝘿𝙊 𝙏𝘼𝙉 𝙍𝙀𝙑𝙀𝙉𝙏𝘼𝘿𝘼 𝙌𝙐𝙀 𝙉𝙊 𝙋𝙐𝙀𝘿𝙀 𝙎𝙊𝙎𝙏𝙀𝙉𝙀𝙍 𝙉𝙄 𝙎𝙐 𝙋𝙍𝙊𝙋𝙄𝙊 𝘾𝙐𝙀𝙍𝙋𝙊 𝙇𝘼 𝙈𝘼𝙇𝘿𝙄𝙏𝘼 𝙕𝙊𝙍𝙍𝘼.\n━━━━━━━━━━━━━━━\n*@${who}*\n 𝙏𝙀 𝘼𝘾𝘼𝘽𝘼𝙉 𝘿𝙀 𝙁𝙊𝙇𝙇𝘼𝙍.\n 💦💦😈😈💦💦`,
  (from, who) => `*@${from}* 𝙎𝙀 𝙁𝙊𝙇𝙇𝙊́ 𝘼 *@${who}* 𝙎𝙄𝙉 𝙋𝙄𝙀𝘿𝘼𝘿 🔥\n━━━━━━━━━━━━━━━\n*@${who}*\n 𝙌𝙐𝙀𝘿𝙊 𝘿𝙀𝙎𝙏𝙍𝙐𝙄𝘿𝙊/𝘼. 💀`,
  (from, who) => `*@${from}* 𝙇𝙀 𝘿𝙄𝙊 𝙐𝙉𝘼 𝙉𝙊𝘾𝙃𝙀 𝘿𝙀 𝙎𝙀𝙓𝙊 𝘼 *@${who}* 🌙\n━━━━━━━━━━━━━━━\n*@${who}*\n 𝙀𝙎𝙏𝘼́ 𝘼𝙂𝙊𝙏𝘼𝘿𝙊/𝘼. 😵`
]

// GOLPEAR
const textosGolpear = [
  (from, who) => `*@${from}* 𝙏𝙀 𝘼𝘾𝘼𝘽𝙊 𝘿𝙀 𝘿𝘼𝙍 𝙐𝙉 𝙂𝙊𝙇𝙋𝙀 𝘼 *@${who}* 𝙋𝙊𝙍 𝙏𝙊𝙉𝙏𝙊 𝙔 𝙀𝙎𝙏𝙐𝙋𝙄𝘿𝙊, 𝙋𝙊𝙍𝙏𝘼𝙏𝙀 𝘽𝙄𝙀𝙉! 👊🏿\n━━━━━━━━━━━━━━━\n*@${who}*\n𝙏𝙀 𝘼𝘾𝘼𝘽𝘼𝙉 𝘿𝙀 𝙂𝙊𝙇𝙋𝙀𝘼𝙍. \n👊🏾👊🏾👊🏾👊🏾`,
  (from, who) => `*@${from}* 𝙇𝙀 𝘿𝙄𝙊 𝙐𝙉 𝙈𝘼𝙉𝙊𝙏𝘼𝙕𝙊 𝘼 *@${who}* 💥\n━━━━━━━━━━━━━━━\n*@${who}*\n 𝙉𝙊 𝙎𝙀 𝙇𝙊 𝙀𝙎𝙋𝙀𝙍𝘼𝘽𝘼. 😵`,
  (from, who) => `*@${from}* 𝙂𝙊𝙇𝙋𝙀𝙊́ 𝘼 *@${who}* 𝙎𝙄𝙉 𝙈𝙄𝙎𝙀𝙍𝙄𝘾𝙊𝙍𝘿𝙸𝘼 👊\n━━━━━━━━━━━━━━━\n*@${who}*\n 𝙃𝙊𝙔 𝙉𝙊 𝙎𝙀 𝙇𝙀𝙑𝘼𝙉𝙏𝘼. 🤕`
]

// MIRAR ESTRELLAS
const textosMirar = [
  (from, who) => `━━━━━━━━━━━━━━━━━━\n🌌 *@${from}* 𝘦𝘴𝘵𝘢 𝘮𝘪𝘳𝘢𝘯𝘥𝘰 𝘭𝘢𝘴 𝘦𝘴𝘵𝘳𝘦𝘭𝘭𝘢𝘴 𝘤𝘰𝘯 *@${who}* 💫\n\n🌙 *Noche perfecta para soñar juntos...* ✨\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`,
  (from, who) => `━━━━━━━━━━━━━━━━━━\n⭐ *@${from} y @${who} están viendo caer una estrella fugaz* 🌠\n\n✨ *¡Pidan un deseo!*\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`,
  (from, who) => `━━━━━━━━━━━━━━━━━━\n🌃 *@${from} invitó a @${who} a ver las estrellas* 🌟\n\n💫 *Noche mágica bajo el cielo*\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`
]

// PENETRAR
const textosPenetrar = [
  (from, who) => `*@${from}* 𝙇𝙀 𝙃𝘼 𝙈𝙀𝙏𝙄𝘿𝙊 𝙀𝙇 𝙋𝙀𝙉𝙀 𝘼 *@${who}* 𝘾𝙊𝙉 𝙏𝙊𝘿𝙊 𝙔 𝘾𝙊𝙉𝘿𝙊́𝙉 𝙃𝘼𝙎𝙏𝘼 𝙌𝙐𝙀𝘿𝘼𝙍 𝙎𝙀𝘾𝙊, 𝙔 𝙃𝘼𝙕 𝘿𝙄𝘾𝙃𝙊 "𝙋𝙤𝙧 𝙛𝙖𝙫𝙤𝙧 𝙢𝙖́𝙨 𝙙𝙪𝙧𝙤𝙤𝙤𝙤𝙤𝙤"!! , 𝙖𝙝𝙝𝙝𝙝𝙝𝙝𝙝 𝙖𝙝𝙝𝙝𝙝𝙝𝙝𝙝 , 𝙝𝙖𝙯𝙢𝙚 𝙪𝙣 𝙝𝙞𝙟𝙤 𝙦𝙪𝙚 𝙨𝙚𝙖 𝙞𝙜𝙪𝙖𝙡 𝙙𝙚 𝙥𝙞𝙩𝙪𝙙𝙤 𝙦𝙪𝙚 𝙩𝙪́ !! 𝙈𝙄𝙀𝙉𝙏𝙍𝘼𝙎 𝙏𝙀 𝙋𝙀𝙉𝙀𝙏𝙍𝘼𝘽𝘼𝙉 𝙔 𝙇𝙐𝙀𝙂𝙊 𝙏𝙀 𝙃𝘼𝙉 𝘿𝙀𝙅𝘼𝘿𝙊 𝙀𝙉 𝙎𝙄𝙇𝙇𝘼𝙎 𝘿𝙀 𝙍𝙐𝙀𝘿𝘼𝙎 .\n━━━━━━━━━━━━━━━\n*@${who}*\n 𝙏𝙀 𝘼𝘾𝘼𝘽𝘼𝙉 𝘿𝙀 𝙈𝙀𝙏𝙀𝙍𝙏𝙀.\n 🤤🤤🔥🔥🤤🤤`,
  (from, who) => `*@${from}* 𝙎𝙀 𝙈𝙀𝙏𝙄𝙊́ 𝙀𝙉 *@${who}* 𝙃𝘼𝙎𝙏𝘼 𝙀𝙇 𝙁𝙊𝙉𝘿𝙊 🔥\n━━━━━━━━━━━━━━━\n*@${who}*\n 𝙌𝙐𝙀𝘿𝙊 𝙎𝙄𝙉 𝙁𝙐𝙀𝙍𝙕𝘼𝙎. 💦`,
  (from, who) => `*@${from}* 𝙇𝙀 𝙃𝙄𝙕𝙊 𝙀𝙇 𝘼𝙈𝙊𝙍 𝙈𝘼́𝙎 𝙁𝙐𝙀𝙍𝙏𝙀 𝘼 *@${who}* 🌋\n━━━━━━━━━━━━━━━\n*@${who}*\n 𝙉𝙊 𝙋𝙐𝙀𝘿𝙀 𝙎𝙀𝙉𝙏𝘼𝙍𝙎𝙀. 🥴`
]

// SALUDAR
const textosSaludar = [
  (from, who) => `━━━━━━━━━━━━━━━━━━\n🖐🏻 *@${from}* 𝘦𝘴𝘵𝘢 𝘴𝘢𝘭𝘶𝘥𝘢𝘯𝘥𝘰 𝘢 *@${who}* 😄\n\n💬 *¡Un saludo lleno de buena vibra!* ✨\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`,
  (from, who) => `━━━━━━━━━━━━━━━━━━\n👋 *@${from} le dice hola a @${who}!* 😊\n\n🌟 *¡Qué lindo saludo!*\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`,
  (from, who) => `━━━━━━━━━━━━━━━━━━\n💫 *@${from} saluda con mucho cariño a @${who}!* 🤗\n\n✨ *Buena onda para todos*\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`
]

// TOMAR CAFÉ
const textosCafe = [
  (from, who) => `━━━━━━━━━━━━━━━━━━\n☕ *@${from}* 𝘴𝘦 𝘦𝘴𝘵𝘢́ 𝘵𝘰𝘮𝘢𝘯𝘥𝘰 𝘶𝘯 𝘤𝘢𝘧𝘦́ 𝘤𝘰𝘯 *@${who}* 🤎\n\n💬 *Un cafecito y buena compañía lo arreglan todo.*\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`,
  (from, who) => `━━━━━━━━━━━━━━━━━━\n☕ *@${from} invitó a @${who} a tomar un café!* 🫶\n\n💭 *Charlas y café, la mejor combinación*\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`,
  (from, who) => `━━━━━━━━━━━━━━━━━━\n🍵 *@${from} y @${who} están compartiendo un café caliente* ☕\n\n🔥 *Una amistad que crece*\n━━━━━━━━━━━━━━━━━━\n©𝘌𝘭𝘪𝘵𝘦𝘉𝘰𝘵𝘎𝘭𝘰𝘣𝘢𝘭 -`
]

// ==================== LINKS DE VIDEOS E IMÁGENES ====================

// Videos de abrazo
const abrazarVideos = [
  'https://telegra.ph/file/899eb3e64097ff236113f.mp4',
  'https://telegra.ph/file/3f2223646db5e854dcd94.mp4',
  'https://telegra.ph/file/8da4ce3f1cc7297037aba.mp4',
  'https://telegra.ph/file/b7371a28e5afebdcb1666.mp4',
  'https://telegra.ph/file/edc48fbdde69d7fc5b889.mp4'
]

// Videos de besos
const besarVideos = [
  'https://telegra.ph/file/382d64b9295270f65bdc8.mp4',
  'https://telegra.ph/file/3a59074f828ac6784965e.mp4',
  'https://telegra.ph/file/f8b307542b1325f4f63e9.mp4',
  'https://telegra.ph/file/0f3ba18c0748fa9e54f1c.mp4',
  'https://telegra.ph/file/6c30ffe0b714c9990e32e.mp4'
]

// Videos de follar/coger
const follarVideos = [
  'https://telegra.ph/file/fe0acdba609a470e8e406.mp4',
  'https://telegra.ph/file/80b860fc52f0fe957f102.mp4',
  'https://telegra.ph/file/b76da2b6aa919cadc55cc.mp4',
  'https://telegra.ph/file/dff739bf4ceed628729a4.mp4',
  'https://telegra.ph/file/1d22d042fb123425af5aa.mp4'
]

// Videos de golpes
const golpearVideos = [
  'https://telegra.ph/file/09bcade511263b3822cb9.mp4',
  'https://telegra.ph/file/78e653eb99ae6b869d6d9.mp4',
  'https://telegra.ph/file/a51cf354202b789bd08bc.mp4',
  'https://telegra.ph/file/7c26992a620e407dce9e6.mp4',
  'https://telegra.ph/file/c66407bc09d3edffff039.mp4'
]

// Videos de penetrar
const penetrarVideos = [
  'https://telegra.ph/file/0fa519399cea3d74022c3.mp4',
  'https://telegra.ph/file/0aaec457747fad13bf4bf.mp4',
  'https://telegra.ph/file/fc5dfc0bd91fc2d860dc5.mp4',
  'https://telegra.ph/file/388c4aa86e88049a9afcd.mp4'
]

// ==================== FUNCIONES HANDLER ====================

async function handlerAbrazar(m, { conn, text }) {
  let mentionedJid = await m.mentionedJid
  let userId = mentionedJid.length > 0 ? mentionedJid[0] : (m.quoted ? await m.quoted.sender : null)
  
  if (!userId) {
    return conn.reply(m.chat, `⚠️ 𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝘼 𝘼 𝙇𝘼 𝙋𝙀𝙍𝙎𝙊𝙉𝘼 𝙌𝙐𝙀 𝙌𝙐𝙄𝙀𝙍𝙀𝙎 𝘿𝘼𝙍 𝙐𝙉 𝘼𝘽𝙍𝘼𝙕𝙊.`, m, rcanal);
  }
  
  let from = m.sender.split('@')[0]
  let who = userId.split('@')[0]
  
  let texto = textosAbrazar[Math.floor(Math.random() * textosAbrazar.length)](from, who)
  let video = abrazarVideos[Math.floor(Math.random() * abrazarVideos.length)]
  
  await conn.sendMessage(m.chat, { react: { text: '🫂', key: m.key } })
  
  try {
    await conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: texto, mentions: [m.sender, userId] })
  } catch (e) {
    await conn.sendMessage(m.chat, { text: texto, mentions: [m.sender, userId] })
  }
}

async function handlerBailar(m, { conn, text }) {
  let mentionedJid = await m.mentionedJid
  let userId = mentionedJid.length > 0 ? mentionedJid[0] : (m.quoted ? await m.quoted.sender : null)
  
  if (!userId) {
    return conn.reply(m.chat, `🎶 *¡Oops! Olvidaste mencionar al usuario con quien quieres bailar!* 💃\n\n✨ *Ejemplo:*\n\n.bailar @usuario`, m, rcanal);
  }
  
  let from = m.sender.split('@')[0]
  let who = userId.split('@')[0]
  
  let texto = textosBailar[Math.floor(Math.random() * textosBailar.length)](from, who)
  
  await conn.sendMessage(m.chat, { react: { text: '💃🏻', key: m.key } })
  await conn.sendMessage(m.chat, { text: texto, mentions: [m.sender, userId] })
}

async function handlerBañar(m, { conn, text }) {
  let mentionedJid = await m.mentionedJid
  let userId = mentionedJid.length > 0 ? mentionedJid[0] : (m.quoted ? await m.quoted.sender : null)
  
  if (!userId) {
    return conn.reply(m.chat, `🛀🏻 *¡Oops! Olvidaste mencionar al usuario con el que quieres bañarte!* 🚿\n\n✨ *Ejemplo:*\n\n.bañar @usuario`, m, rcanal);
  }
  
  let from = m.sender.split('@')[0]
  let who = userId.split('@')[0]
  
  let texto = textosBañar[Math.floor(Math.random() * textosBañar.length)](from, who)
  
  await conn.sendMessage(m.chat, { react: { text: '🛁', key: m.key } })
  await conn.sendMessage(m.chat, { text: texto, mentions: [m.sender, userId] })
}

async function handlerBesar(m, { conn, text }) {
  let mentionedJid = await m.mentionedJid
  let userId = mentionedJid.length > 0 ? mentionedJid[0] : (m.quoted ? await m.quoted.sender : null)
  
  if (!userId) {
    return conn.reply(m.chat, `⚠️ 𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝘼 𝘼 𝙇𝘼 𝙋𝙀𝙍𝙎𝙊𝙉𝘼 𝙌𝙐𝙀 𝙏𝙀 𝙌𝙐𝙄𝙀𝙍𝙀𝙎 𝘽𝙀𝙎𝘼𝙍.\n\n✨ *Ejemplo:*\n.besar @usuario`, m, rcanal);
  }
  
  let from = m.sender.split('@')[0]
  let who = userId.split('@')[0]
  
  let texto = textosBesar[Math.floor(Math.random() * textosBesar.length)](from, who)
  let video = besarVideos[Math.floor(Math.random() * besarVideos.length)]
  
  await conn.sendMessage(m.chat, { react: { text: '😘', key: m.key } })
  
  try {
    await conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: texto, mentions: [m.sender, userId] })
  } catch (e) {
    await conn.sendMessage(m.chat, { text: texto, mentions: [m.sender, userId] })
  }
}

async function handlerCenar(m, { conn, text }) {
  let mentionedJid = await m.mentionedJid
  let userId = mentionedJid.length > 0 ? mentionedJid[0] : (m.quoted ? await m.quoted.sender : null)
  
  if (!userId) {
    return conn.reply(m.chat, `🍽️ *¡Ups! Olvidaste mencionar al usuario con el que quieres cenar!* 🌹\n\n✨ *Ejemplo:*\n\n.cenar @usuario`, m, rcanal);
  }
  
  let from = m.sender.split('@')[0]
  let who = userId.split('@')[0]
  
  let texto = textosCenar[Math.floor(Math.random() * textosCenar.length)](from, who)
  
  await conn.sendMessage(m.chat, { react: { text: '🍽️', key: m.key } })
  await conn.sendMessage(m.chat, { text: texto, mentions: [m.sender, userId] })
}

async function handlerDarChocolate(m, { conn, text }) {
  let mentionedJid = await m.mentionedJid
  let userId = mentionedJid.length > 0 ? mentionedJid[0] : (m.quoted ? await m.quoted.sender : null)
  
  if (!userId) {
    return conn.reply(m.chat, `🌟 *¡Oops! Olvidaste mencionar al usuario!*\n➡️ *Etiqueta al usuario que le quieres dar un chocolate* 🍫\n\n✨ *Ejemplo:*\n\n.darchocolate @usuario`, m, rcanal);
  }
  
  let from = m.sender.split('@')[0]
  let who = userId.split('@')[0]
  
  let texto = textosChocolate[Math.floor(Math.random() * textosChocolate.length)](from, who)
  
  await conn.sendMessage(m.chat, { react: { text: '🍫', key: m.key } })
  await conn.sendMessage(m.chat, { text: texto, mentions: [m.sender, userId] })
}

async function handlerCoger(m, { conn, text }) {
  let mentionedJid = await m.mentionedJid
  let userId = mentionedJid.length > 0 ? mentionedJid[0] : (m.quoted ? await m.quoted.sender : null)
  
  if (!userId) {
    return conn.reply(m.chat, `⚠️ 𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝘼 𝘼 𝙇𝘼 𝙋𝙀𝙍𝙎𝙊𝙉𝘼 𝙌𝙐𝙀 𝙏𝙀 𝙌𝙐𝙄𝙀𝙍𝙀𝙎 𝘾𝙊𝙂𝙀𝙍.\n\n✨ *Ejemplo:*\n.coger @usuario`, m, rcanal);
  }
  
  let from = m.sender.split('@')[0]
  let who = userId.split('@')[0]
  
  let texto = textosCoger[Math.floor(Math.random() * textosCoger.length)](from, who)
  let video = follarVideos[Math.floor(Math.random() * follarVideos.length)]
  
  await conn.sendMessage(m.chat, { react: { text: '🍆', key: m.key } })
  
  try {
    await conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: texto, mentions: [m.sender, userId] })
  } catch (e) {
    await conn.sendMessage(m.chat, { text: texto, mentions: [m.sender, userId] })
  }
}

async function handlerFollar(m, { conn, text }) {
  let mentionedJid = await m.mentionedJid
  let userId = mentionedJid.length > 0 ? mentionedJid[0] : (m.quoted ? await m.quoted.sender : null)
  
  if (!userId) {
    return conn.reply(m.chat, `⚠️ 𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝘼 𝘼 𝙇𝘼 𝙋𝙀𝙍𝙎𝙊𝙉𝘼 𝙌𝙐𝙀 𝙏𝙀 𝙌𝙐𝙄𝙀𝙍𝙀𝙎 𝙁𝙊𝙇𝙇𝘼𝙍.`, m, rcanal);
  }
  
  let from = m.sender.split('@')[0]
  let who = userId.split('@')[0]
  
  let texto = textosFollar[Math.floor(Math.random() * textosFollar.length)](from, who)
  let video = follarVideos[Math.floor(Math.random() * follarVideos.length)]
  
  await conn.sendMessage(m.chat, { react: { text: '😈', key: m.key } })
  
  try {
    await conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: texto, mentions: [m.sender, userId] })
  } catch (e) {
    await conn.sendMessage(m.chat, { text: texto, mentions: [m.sender, userId] })
  }
}

async function handlerGolpear(m, { conn, text }) {
  let mentionedJid = await m.mentionedJid
  let userId = mentionedJid.length > 0 ? mentionedJid[0] : (m.quoted ? await m.quoted.sender : null)
  
  if (!userId) {
    return conn.reply(m.chat, `⚠️ 𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝘼 𝘼 𝙇𝘼 𝙋𝙀𝙍𝙎𝙊𝙉𝘼 𝙌𝙐𝙀 𝙏𝙀 𝙌𝙐𝙄𝙀𝙍𝙀𝙎 𝙂𝙊𝙇𝙋𝙀𝘼𝙍.\n\n✨ *Ejemplo:*\n.golpear @usuario`, m, rcanal);
  }
  
  let from = m.sender.split('@')[0]
  let who = userId.split('@')[0]
  
  let texto = textosGolpear[Math.floor(Math.random() * textosGolpear.length)](from, who)
  let video = golpearVideos[Math.floor(Math.random() * golpearVideos.length)]
  
  await conn.sendMessage(m.chat, { react: { text: '👊', key: m.key } })
  
  try {
    await conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: texto, mentions: [m.sender, userId] })
  } catch (e) {
    await conn.sendMessage(m.chat, { text: texto, mentions: [m.sender, userId] })
  }
}

async function handlerMirar(m, { conn, text }) {
  let mentionedJid = await m.mentionedJid
  let userId = mentionedJid.length > 0 ? mentionedJid[0] : (m.quoted ? await m.quoted.sender : null)
  
  if (!userId) {
    return conn.reply(m.chat, `🌠 *¿Con quién deseas mirar las estrellas?*\n\n✨ *Ejemplo:*\n\n.mirar @usuario`, m, rcanal);
  }
  
  let from = m.sender.split('@')[0]
  let who = userId.split('@')[0]
  
  let texto = textosMirar[Math.floor(Math.random() * textosMirar.length)](from, who)
  
  await conn.sendMessage(m.chat, { react: { text: '🌃', key: m.key } })
  await conn.sendMessage(m.chat, { text: texto, mentions: [m.sender, userId] })
}

async function handlerPenetrar(m, { conn, text }) {
  let mentionedJid = await m.mentionedJid
  let userId = mentionedJid.length > 0 ? mentionedJid[0] : (m.quoted ? await m.quoted.sender : null)
  
  if (!userId) {
    return conn.reply(m.chat, `⚠️ 𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝘼 𝘼 𝙇𝘼 𝙋𝙀𝙍𝙎𝙊𝙉𝘼 𝙌𝙐𝙀 𝙏𝙀 𝙌𝙐𝙄𝙀𝙍𝙀𝙎 𝙋𝙀𝙉𝙀𝙏𝙍𝘼𝙍.\n\n✨ *Ejemplo:*\n.penetrar @usuario`, m, rcanal);
  }
  
  let from = m.sender.split('@')[0]
  let who = userId.split('@')[0]
  
  let texto = textosPenetrar[Math.floor(Math.random() * textosPenetrar.length)](from, who)
  let video = penetrarVideos[Math.floor(Math.random() * penetrarVideos.length)]
  
  await conn.sendMessage(m.chat, { react: { text: '🔥', key: m.key } })
  
  try {
    await conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: texto, mentions: [m.sender, userId] })
  } catch (e) {
    await conn.sendMessage(m.chat, { text: texto, mentions: [m.sender, userId] })
  }
}

async function handlerSaludar(m, { conn, text }) {
  let mentionedJid = await m.mentionedJid
  let userId = mentionedJid.length > 0 ? mentionedJid[0] : (m.quoted ? await m.quoted.sender : null)
  
  if (!userId) {
    return conn.reply(m.chat, `🎵 *¿A quién deseas saludar?*\n\n🏠 *Ejemplo:*\n.saludar @usuario`, m, rcanal);
  }
  
  let from = m.sender.split('@')[0]
  let who = userId.split('@')[0]
  
  let texto = textosSaludar[Math.floor(Math.random() * textosSaludar.length)](from, who)
  
  await conn.sendMessage(m.chat, { react: { text: '🖐🏻', key: m.key } })
  await conn.sendMessage(m.chat, { text: texto, mentions: [m.sender, userId] })
}

async function handlerTomarCafe(m, { conn, text }) {
  let mentionedJid = await m.mentionedJid
  let userId = mentionedJid.length > 0 ? mentionedJid[0] : (m.quoted ? await m.quoted.sender : null)
  
  if (!userId) {
    return conn.reply(m.chat, `☕ *¿Con quién quieres compartir un café?*\n\n✨ *Ejemplo:*\n\n.cafe @usuario`, m, rcanal);
  }
  
  let from = m.sender.split('@')[0]
  let who = userId.split('@')[0]
  
  let texto = textosCafe[Math.floor(Math.random() * textosCafe.length)](from, who)
  
  await conn.sendMessage(m.chat, { react: { text: '☕', key: m.key } })
  await conn.sendMessage(m.chat, { text: texto, mentions: [m.sender, userId] })
}

// ==================== HANDLER PRINCIPAL ====================
let handler = async (m, { conn, command, text }) => {
  switch (command) {
    case 'abrazar': case 'abrazo':
      return handlerAbrazar(m, { conn, text })
    case 'bailar': case 'dance':
      return handlerBailar(m, { conn, text })
    case 'bañar': case 'banar': case 'duchar':
      return handlerBañar(m, { conn, text })
    case 'besar': case 'beso': case 'kiss':
      return handlerBesar(m, { conn, text })
    case 'cenar': case 'cena':
      return handlerCenar(m, { conn, text })
    case 'darchocolate': case 'dar': case 'chocolate':
      return handlerDarChocolate(m, { conn, text })
    case 'coger': case 'cojer': case 'sexo':
      return handlerCoger(m, { conn, text })
    case 'follar':
      return handlerFollar(m, { conn, text })
    case 'golpear': case 'golpiar': case 'golpe':
      return handlerGolpear(m, { conn, text })
    case 'mirar': case 'estrellas': case 'mirar-estrellas':
      return handlerMirar(m, { conn, text })
    case 'penetrar': case 'penetra':
      return handlerPenetrar(m, { conn, text })
    case 'saludar':
      return handlerSaludar(m, { conn, text })
    case 'tomarcafe': case 'cafe': case 'coffee': case 'tomarcafé':
      return handlerTomarCafe(m, { conn, text })
    default:
      return
  }
}

handler.command = /^(abrazar|abrazo|bailar|dance|bañar|banar|duchar|besar|beso|kiss|cenar|cena|darchocolate|dar|chocolate|coger|cojer|sexo|follar|golpear|golpiar|golpe|mirar|estrellas|mirar-estrellas|penetrar|penetra|saludar|tomarcafe|cafe|coffee|tomarcafé)$/i
handler.group = true

export default handler
