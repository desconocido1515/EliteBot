let WAMessageStubType = (await import('@whiskeysockets/baileys')).default
import chalk from 'chalk'
import fs from 'fs'
import axios from 'axios'
import path from 'path'
import fetch from 'node-fetch'

const groupMetadataCache = new Map()
const lidCache = new Map()
const handler = m => m

handler.before = async function (m, { conn, participants, groupMetadata }) {
if (!m.messageStubType || !m.isGroup) return

const primaryBot = global.db.data.chats[m.chat].primaryBot
if (primaryBot && conn.user.jid !== primaryBot) throw !1

const chat = global.db.data.chats[m.chat]
const users = m.messageStubParameters[0]
const usuario = await resolveLidToRealJid(m?.sender, conn, m?.chat)
const groupAdmins = participants.filter(p => p.admin)

const getThumbnail = async () => {
  const res = await axios.get("https://files.catbox.moe/e6br3k.jpg", { responseType: "arraybuffer" })
  return Buffer.from(res.data, "binary")
}

const thumbnail = await getThumbnail()

const shadow_xyz = {
  key: {
    fromMe: false,
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast"
  },
  message: {
    productMessage: {
      product: {
        productImage: {
          mimetype: "image/jpeg",
          jpegThumbnail: thumbnail
        },
        title: "",
        description: "",
        currencyCode: "",
        priceAmount1000: 5000,
        retailerId: "ShadowCore",
        productImageCount: 1
      },
      businessOwnerJid: "51900922660@s.whatsapp.net"
    }
  }
}

const rcanal = {
contextInfo: {
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: channelRD.id,
    serverMessageId: '（つ  / ♡. ㅤ•*゜・。... 🄶🄾🄹🄾 🄱🄾🅃 - 🄼🄳💫⃤꙰ ꒱* ',
    newsletterName: channelRD.name
  },
  externalAdReply: {
    title: "",
    body: textbot,
    mediaUrl: null,
    description: null,
    previewType: "PHOTO",
    thumbnail: await (await fetch(icono)).buffer(),
    sourceUrl: redes,
    mediaType: 1,
    renderLargerThumbnail: false
  },
  mentionedJid: []
}}

const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/5biv5v.jpg'

/* ================== TEXTOS CORREGIDOS ================== */

const nombre = `*\`INFORMACION\`✅*

✦ *SE CAMBIÓ EL NOMBRE DEL GRUPO A :*
*${m.messageStubParameters[0]}*

» *ACCIÓN HECHA POR :* @${usuario.split('@')[0]}`

const foto = `*\`INFORMACION\`✅*

✦ *SE CAMBIÓ LA IMAGEN DEL GRUPO*

» *ACCIÓN HECHA POR :* @${usuario.split('@')[0]}`

const edit = `*\`INFORMACION\`✅*

✦ *SE ACTUALIZARON LOS PERMISOS DEL GRUPO*

» *ACCIÓN HECHA POR :* @${usuario.split('@')[0]}`

const newlink = `*\`INFORMACION\`✅*

✦ *SE RESTABLECIÓ EL ENLACE DEL GRUPO*

» *ACCIÓN HECHA POR :* @${usuario.split('@')[0]}`

const status = `*\`INFORMACION\`✅*

✦ *EL GRUPO HA SIDO* *${m.messageStubParameters[0] == 'on' ? 'CERRADO' : 'ABIERTO'}*

» *ACCIÓN HECHA POR :* @${usuario.split('@')[0]}`

const admingp = `*\`NUEVO ADMINISTRADOR\`✅*

✦ *AHORA ES ADMINISTRADOR :* @${users.split('@')[0]}

» *ACCIÓN HECHA POR :* @${usuario.split('@')[0]}`

const noadmingp = `*\`INFORMACION\`✅*

✦ *YA NO ES ADMINISTRADOR :* @${users.split('@')[0]}

» *ACCIÓN HECHA POR :* @${usuario.split('@')[0]}`

const desc = `*\`INFORMACION\`✅*

✦ *SE CAMBIO LA DESCRIPCIÓN DEL GRUPO A :* ${m.messageStubParameters[0]}

» *ACCIÓN HECHA POR :* @${usuario.split('@')[0]}`

/* ======================================================= */

if (chat.detect && m.messageStubType == 2) {
const uniqid = (m.isGroup ? m.chat : m.sender).split('@')[0]
const sessionPath = `./${sessions}/`
for (const file of await fs.promises.readdir(sessionPath)) {
if (file.includes(uniqid)) {
await fs.promises.unlink(path.join(sessionPath, file))
console.log(`${chalk.yellow.bold('✎ Delete!')} ${chalk.greenBright(`'${file}'`)}\n${chalk.redBright('Que provoca el "undefined" en el chat.')}`)
}}}

if (chat.detect && m.messageStubType == 21) {
rcanal.contextInfo.mentionedJid = [usuario, ...groupAdmins.map(v => v.id)]
await this.sendMessage(m.chat, { text: nombre, ...rcanal }, { quoted: shadow_xyz })
}

if (chat.detect && m.messageStubType == 22) {
rcanal.contextInfo.mentionedJid = [usuario, ...groupAdmins.map(v => v.id)]
await this.sendMessage(m.chat, { image: { url: pp }, caption: foto, ...rcanal }, { quoted: shadow_xyz })
}

if (chat.detect && m.messageStubType == 23) {
rcanal.contextInfo.mentionedJid = [usuario, ...groupAdmins.map(v => v.id)]
await this.sendMessage(m.chat, { text: newlink, ...rcanal }, { quoted: shadow_xyz })
}

if (chat.detect && m.messageStubType == 25) {
rcanal.contextInfo.mentionedJid = [usuario, ...groupAdmins.map(v => v.id)]
await this.sendMessage(m.chat, { text: edit, ...rcanal }, { quoted: shadow_xyz })
}

if (chat.detect && m.messageStubType == 26) {
rcanal.contextInfo.mentionedJid = [usuario, ...groupAdmins.map(v => v.id)]
await this.sendMessage(m.chat, { text: status, ...rcanal }, { quoted: shadow_xyz })
}

if (chat.detect && m.messageStubType == 29) {
rcanal.contextInfo.mentionedJid = [usuario, users, ...groupAdmins.map(v => v.id)].filter(Boolean)
await this.sendMessage(m.chat, { text: admingp, ...rcanal }, { quoted: shadow_xyz })
return
}

if (chat.detect && m.messageStubType == 30) {
rcanal.contextInfo.mentionedJid = [usuario, users, ...groupAdmins.map(v => v.id)].filter(Boolean)
await this.sendMessage(m.chat, { text: noadmingp, ...rcanal }, { quoted: shadow_xyz })
}

else {
if (m.messageStubType == 2) return
console.log({
messageStubType: m.messageStubType,
messageStubParameters: m.messageStubParameters,
type: WAMessageStubType[m.messageStubType],
})
}
}

export default handler

async function resolveLidToRealJid(lid, conn, groupChatId, maxRetries = 3, retryDelay = 60000) {
const inputJid = lid.toString()

if (!inputJid.endsWith("@lid") || !groupChatId?.endsWith("@g.us")) {
return inputJid.includes("@") ? inputJid : `${inputJid}@s.whatsapp.net`
}

if (lidCache.has(inputJid)) return lidCache.get(inputJid)

const lidToFind = inputJid.split("@")[0]
let attempts = 0

while (attempts < maxRetries) {
try {
const metadata = await conn?.groupMetadata(groupChatId)
if (!metadata?.participants) throw new Error("No se obtuvieron participantes")

for (const participant of metadata.participants) {
try {
if (!participant?.jid) continue

const contactDetails = await conn?.onWhatsApp(participant.jid)
if (!contactDetails?.[0]?.lid) continue

const possibleLid = contactDetails[0].lid.split("@")[0]

if (possibleLid === lidToFind) {
lidCache.set(inputJid, participant.jid)
return participant.jid
}
} catch {
continue
}
}

lidCache.set(inputJid, inputJid)
return inputJid

} catch {
if (++attempts >= maxRetries) {
lidCache.set(inputJid, inputJid)
return inputJid
}
await new Promise(resolve => setTimeout(resolve, retryDelay))
}
}

return inputJid
  }
