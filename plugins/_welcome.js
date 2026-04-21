import fs from 'fs'
import fetch from 'node-fetch'
import { WAMessageStubType } from '@whiskeysockets/baileys'

// ─────────────────────────────
// 🛡️ UTILIDAD SEGURA DE USUARIO
// ─────────────────────────────
function safeUser(userId) {
    if (!userId) return null
    if (!userId.includes('@')) return null
    if (userId.length < 10) return null
    return userId
}

// ─────────────────────────────
// 🔍 VERIFICAR SI TIENE FOTO PÚBLICA
// ─────────────────────────────
async function tieneFotoPublica(conn, userId) {
    try {
        const url = await conn.profilePictureUrl(userId, 'image')
        if (url && url.startsWith('http')) {
            return url
        }
        return null
    } catch (error) {
        return null
    }
}

// ─────────────────────────────
// 📝 TEXTOS ALEATORIOS DE DESPEDIDA
// ─────────────────────────────
const TEXTOS_DESPEDIDA = [
    '𝗡𝗨𝗡𝗖𝗔 𝗟𝗘 𝗤𝗨𝗜𝗦𝗜𝗠𝗢𝗦 𝗔𝗤𝗨𝗜 🚯',
    '𝗠𝗔𝗡𝗗𝗘𝗡𝗟𝗘 𝗣𝗢𝗟𝗡𝗜𝗧𝗢 𝗔 𝗘𝗦𝗘 𝗕𝗜𝗡𝗔𝗥𝗜𝗢 🚮',
    '𝗡𝗢 𝗦𝗜𝗥𝗩𝗜𝗢 𝗣𝗔𝗥𝗔 𝗡𝗔𝗗𝗔 😴',
    '𝗦𝗘 𝗙𝗨𝗘 𝗔 𝗠𝗢𝗥𝗗𝗘𝗥 𝗘𝗟 𝗣𝗢𝗟𝗩𝗢 💄',
    '𝗬𝗔 𝗘𝗥𝗔 𝗛𝗢𝗥𝗔, 𝗣𝗨𝗥𝗔 𝗕𝗔𝗦𝗨𝗥𝗔 𝗔𝗣𝗘𝗦𝗧𝗔𝗕𝗔 🚮',
    '𝗨𝗡𝗢 𝗠𝗘𝗡𝗢𝗦, 𝗠𝗘𝗝𝗢𝗥 𝗣𝗔𝗥𝗔 𝗘𝗟 𝗚𝗥𝗨𝗣𝗢 💯',
    '𝗦𝗘 𝗙𝗨𝗘 𝗘𝗟 𝗤𝗨𝗘 𝗡𝗔𝗗𝗜𝗘 𝗤𝗨𝗘𝗥𝗜́𝗔 😂',
    '𝗣𝗨𝗘𝗥𝗧𝗔 𝗚𝗥𝗔𝗡𝗗𝗘 𝗣𝗔𝗥𝗔 𝗟𝗢𝗦 𝗤𝗨𝗘 𝗡𝗢 𝗦𝗜𝗥𝗩𝗘𝗡 🚯',
    '𝗙, 𝗡𝗢 𝗟𝗢 𝗩𝗔𝗠𝗢𝗦 𝗔 𝗘𝗫𝗧𝗥𝗔𝗡̃𝗔𝗥 🦗',
    '𝗬𝗔 𝗡𝗢 𝗛𝗔𝗬 𝗘𝗦𝗣𝗔𝗖𝗜𝗢 𝗣𝗔𝗥𝗔 𝗙𝗥𝗔𝗖𝗔𝗦𝗔𝗗𝗢𝗦 💩'
]

// ─────────────────────────────
// 📝 TEXTOS ALEATORIOS DE BIENVENIDA
// ─────────────────────────────
const TEXTOS_BIENVENIDA = [
    '¡𝗔𝗛𝗢𝗥𝗔 𝗙𝗢𝗥𝗠𝗔𝗦 𝗣𝗔𝗥𝗧𝗘 𝗗𝗘 𝗟𝗢𝗦 𝗠𝗘𝗝𝗢𝗥𝗘𝗦! 🥇',
    '𝗣𝗥𝗘𝗦𝗘𝗡𝗧𝗔𝗧𝗘: 𝗙𝗢𝗧𝗢, 𝗡𝗢𝗠𝗕𝗥𝗘, 𝗘𝗗𝗔𝗗 𝗬 𝗦𝗜 𝗘𝗦𝗧𝗔𝗦 𝗦𝗢𝗟𝗘𝗧𝗘𝗥𝗢/𝗔 🥵',
    '𝗠𝗜𝗥𝗘𝗡 𝗔 𝗘𝗦𝗘 𝗚𝗨𝗔𝗣𝗢/𝗔 🤤',
    '¡𝗬𝗔 𝗟𝗟𝗘𝗚𝗢 𝗢𝗧𝗥𝗢 𝗔 𝗥𝗢𝗠𝗣𝗘𝗥𝗟𝗔! 💪🏻',
    '𝗖𝗨𝗜𝗗𝗔𝗗𝗢 𝗖𝗢𝗡 𝗘́𝗟/𝗘𝗟𝗟𝗔, 𝗩𝗜𝗘𝗡𝗘 𝗖𝗢𝗡 𝗧𝗢𝗗𝗢 💪🏻',
    '𝗣𝗥𝗘𝗦𝗘𝗡𝗧𝗔𝗧𝗘 𝗢 𝗧𝗘 𝗠𝗨𝗧𝗘𝗔𝗠𝗢𝗦 😂',
    '𝗘𝗖𝗛𝗔𝗟𝗘 𝗚𝗔𝗡𝗔𝗦 𝗢 𝗧𝗘 𝗦𝗔𝗖𝗔𝗠𝗢𝗦 ☠️',
    '𝗢𝗧𝗥𝗢 𝗟𝗢𝗖𝗢 𝗤𝗨𝗘 𝗦𝗘 𝗨𝗡𝗘 𝗔 𝗟𝗔 𝗟𝗢𝗖𝗨𝗥𝗔 🔥',
    '𝗣𝗥𝗘𝗦𝗘𝗡𝗧𝗔𝗧𝗘 𝗔𝗡𝗧𝗘𝗦 𝗗𝗘 𝗤𝗨𝗘 𝗧𝗘 𝗙𝗨𝗡𝗘𝗡 📃'
]

// ─────────────────────────────
// 🌿 BIENVENIDA CON IMAGEN Y BOTÓN
// ─────────────────────────────
async function generarBienvenida({ conn, userId, groupMetadata, chat }) {
    userId = safeUser(userId)
    if (!userId) return null

    const username = `@${userId.split('@')[0]}`
    
    // Usar texto personalizado si existe, si no usar texto aleatorio
    let textoAleatorio
    if (chat.sWelcome && chat.sWelcome !== false) {
        textoAleatorio = chat.sWelcome
    } else {
        textoAleatorio = TEXTOS_BIENVENIDA[Math.floor(Math.random() * TEXTOS_BIENVENIDA.length)]
    }

    let imageUrl = await tieneFotoPublica(conn, userId)
    if (!imageUrl) {
        imageUrl = './media/sinfoto.jpg'
    }

    const caption = `╭━━━━━━━━⋆⋆━━━━━━━━─
┃ ⏤͟͟͞͞𝗕𝗜𝗘𝗡𝗩𝗘𝗡𝗜𝗗𝗢 🌟
┃ 👤 ${username}
┃ 
┃ 𝗖𝗟𝗔𝗡 : ${groupMetadata.subject}
┃ ${textoAleatorio}
┃ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘
╰━━━━━━━━⋆⋆━━━━━━━━─

𝗗𝗔𝗥 𝗕𝗜𝗘𝗡𝗩𝗘𝗡𝗜𝗗𝗔 💫`

    const buttons = [
        { buttonId: `welcome_${userId}`, buttonText: { displayText: `𝗗𝗔𝗥 𝗕𝗜𝗘𝗡𝗩𝗘𝗡𝗜𝗗𝗔 💫` }, type: 1 }
    ]

    return { imageUrl, caption, mentions: [userId], buttons }
}

// ─────────────────────────────
// 🍂 DESPEDIDA CON IMAGEN Y BOTÓN
// ─────────────────────────────
async function generarDespedida({ conn, userId, groupMetadata, chat }) {
    userId = safeUser(userId)
    if (!userId) return null

    const username = `@${userId.split('@')[0]}`
    
    // Usar texto personalizado si existe, si no usar texto aleatorio
    let textoAleatorio
    if (chat.sBye && chat.sBye !== false) {
        textoAleatorio = chat.sBye
    } else {
        textoAleatorio = TEXTOS_DESPEDIDA[Math.floor(Math.random() * TEXTOS_DESPEDIDA.length)]
    }

    let imageUrl = await tieneFotoPublica(conn, userId)
    if (!imageUrl) {
        imageUrl = './media/sinfoto.jpg'
    }

    const caption = `╭━━━━━━━━⋆⋆━━━━━━━━─
┃ 𝗦𝗘 𝗦𝗔𝗟𝗜𝗢 𝗨𝗡𝗔 𝗕𝗔𝗦𝗨𝗥𝗔.
┃ *-1* 𝗜𝗡𝗦𝗘𝗥𝗩𝗜𝗕𝗟𝗘 🚮
┃ ${username}
┃ ${textoAleatorio}
╰━━━━━━━━⋆⋆━━━━━━━━─

𝗘𝗦𝗖𝗨𝗣𝗔𝗡𝗟𝗘 🤮`

    const buttons = [
        { buttonId: `spit_${userId}`, buttonText: { displayText: `𝗘𝗦𝗖𝗨𝗣𝗜𝗥 🤮` }, type: 1 }
    ]

    return { imageUrl, caption, mentions: [userId], buttons }
}

// ─────────────────────────────
// 🎵 AUDIOS Y STICKERS
// ─────────────────────────────
const STICKER_URLS = [
    'https://files.catbox.moe/o58tbw.webp',
    'https://files.catbox.moe/0boonh.webp'
]

const AUDIO_SALIDA_URLS = [
    'https://files.catbox.moe/2olqg1.ogg',
    'https://files.catbox.moe/k8znal.ogg',
    'https://files.catbox.moe/oj61hq.ogg'
]
const AUDIO_BIENVENIDA_URL = 'https://files.catbox.moe/kgykxt.ogg'

// ================= COMANDOS SETWELCOME =================
let handler = async (m, { conn, command, text }) => {

let fkontak = { 
  "key": { 
    "participants": "0@s.whatsapp.net", 
    "remoteJid": "status@broadcast", 
    "fromMe": false, 
    "id": "Halo" 
  }, 
  "message": { 
    "contactMessage": { 
      "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
    }
  }, 
  "participant": "0@s.whatsapp.net" 
}

// Inicializar datos del chat
if (!global.db.data.chats[m.chat]) {
  global.db.data.chats[m.chat] = {}
}
if (global.db.data.chats[m.chat].sWelcome === undefined) {
  global.db.data.chats[m.chat].sWelcome = false
}
if (global.db.data.chats[m.chat].sBye === undefined) {
  global.db.data.chats[m.chat].sBye = false
}
if (global.db.data.chats[m.chat].welcome === undefined) {
  global.db.data.chats[m.chat].welcome = true
}

// ================= ACTIVAR/DESACTIVAR BIENVENIDA =================
if (/^(welcome|bienvenida)$/i.test(command)) {
  if (text === 'on' || text === '1' || text === 'activar') {
    global.db.data.chats[m.chat].welcome = true
    return conn.reply(m.chat, '✅ Bienvenida y despedida ACTIVADAS correctamente.', fkontak, m)
  } else if (text === 'off' || text === '0' || text === 'desactivar') {
    global.db.data.chats[m.chat].welcome = false
    return conn.reply(m.chat, '❌ Bienvenida y despedida DESACTIVADAS correctamente.', fkontak, m)
  } else {
    const estado = global.db.data.chats[m.chat].welcome ? 'ACTIVADAS' : 'DESACTIVADAS'
    return conn.reply(m.chat, `⚙️ Bienvenida y despedida están *${estado}*\n\n📝 Usa:\n.welcome on - Activar\n.welcome off - Desactivar`, fkontak, m)
  }
}

// ================= RESET WELCOME =================
if (/^resetwelcome$/i.test(command)) {
  global.db.data.chats[m.chat].sWelcome = false
  return conn.reply(m.chat, '✅ Bienvenida restablecida al texto por defecto.', fkontak, m)
}

// ================= RESET BYE =================
if (/^resetbye$/i.test(command)) {
  global.db.data.chats[m.chat].sBye = false
  return conn.reply(m.chat, '✅ Despedida restablecida al texto por defecto.', fkontak, m)
}

// ================= SET WELCOME =================
if (/^(setwelcome)$/i.test(command)) {
  let txt = text
  if (!txt || txt.length === 0) {
    const ayuda = `✦ ¡Hola!
Te ayudaré a configurar la bienvenida personalizada.

📌 *Variables disponibles:*
» @user - Para etiquetar a la persona
» @subject - Para mencionar el nombre del grupo

💫 *Ejemplo:*
.setwelcome Bienvenido @user al grupo @subject, siéntete en casa.

🌟 *Para restablecer:*
.resetwelcome`
    return conn.reply(m.chat, ayuda, fkontak, m)
  }

  global.db.data.chats[m.chat].sWelcome = txt
  return conn.reply(m.chat, '✅ Bienvenida configurada correctamente.\n\n📝 Texto guardado:\n' + txt, fkontak, m)
}

// ================= SET BYE =================
if (/^(setbye)$/i.test(command)) {
  let txt = text
  if (!txt || txt.length === 0) {
    const ayuda = `✦ ¡Hola!
Te ayudaré a configurar la despedida personalizada.

📌 *Variables disponibles:*
» @user - Para etiquetar a la persona

💫 *Ejemplo:*
.setbye Adiós @user, te extrañaremos.

🌟 *Para restablecer:*
.resetbye`
    return conn.reply(m.chat, ayuda, fkontak, m)
  }

  global.db.data.chats[m.chat].sBye = txt
  return conn.reply(m.chat, '✅ Despedida configurada correctamente.\n\n📝 Texto guardado:\n' + txt, fkontak, m)
}

}

handler.command = ['setwelcome', 'resetwelcome', 'setbye', 'resetbye', 'welcome', 'bienvenida']
handler.botAdmin = true
handler.admin = true
handler.group = true

// ================= EVENTOS DE BIENVENIDA/DESPEDIDA =================
handler.before = async function (m, { conn, groupMetadata }) {
    // Manejar respuestas de botones
    if (m.message?.buttonsResponseMessage) {
        const buttonId = m.message.buttonsResponseMessage.selectedButtonId
        const sender = m.sender
        const senderName = sender.split('@')[0]
        
        if (buttonId.startsWith('welcome_')) {
            const targetUserId = buttonId.replace('welcome_', '')
            const targetName = targetUserId.split('@')[0]
            
            await conn.sendMessage(m.chat, {
                text: `🎉 @${senderName} le dio la bienvenida a @${targetName} 🌟\n\n𝗦𝗘𝗚𝗨𝗜𝗥 𝗗𝗔𝗡𝗗𝗢 𝗟𝗔 𝗕𝗜𝗘𝗡𝗩𝗘𝗡𝗜𝗗𝗔 ♥️`,
                buttons: [
                    { buttonId: `welcome_${targetUserId}`, buttonText: { displayText: `𝗗𝗔𝗥 𝗕𝗜𝗘𝗡𝗩𝗘𝗡𝗜𝗗𝗔 💫` }, type: 1 }
                ],
                mentions: [sender, targetUserId]
            })
            await m.react('💫')
            return
        }
        
        if (buttonId.startsWith('spit_')) {
            const targetUserId = buttonId.replace('spit_', '')
            const targetName = targetUserId.split('@')[0]
            
            await conn.sendMessage(m.chat, {
                text: `@${senderName} 𝗘𝗦𝗖𝗨𝗣𝗜𝗢 𝗔 @${targetName} 🤮\n\n⇓ 𝗦𝗘𝗚𝗨𝗜𝗥 𝗘𝗦𝗖𝗨𝗣𝗜𝗘𝗡𝗗𝗢 ⇓`,
                buttons: [
                    { buttonId: `spit_${targetUserId}`, buttonText: { displayText: `𝗘𝗦𝗖𝗨𝗣𝗜𝗥 🤮` }, type: 1 }
                ],
                mentions: [sender, targetUserId]
            })
            await m.react('🤮')
            return
        }
        return
    }
    
    // VERIFICAR EVENTOS DE ENTRADA/SALIDA
    if (!m.messageStubType || !m.isGroup) return true
    
    let userId = m.messageStubParameters?.[0]
    
    if (userId === conn.user.jid) {
        console.log(`⏭️ Ignorando evento del propio bot`)
        return true
    }
    
    const chat = global.db.data.chats[m.chat]
    if (!chat || !chat.welcome) return true
    
    const isAdd = m.messageStubType === 27
    const isRemove = m.messageStubType === 28 || m.messageStubType === 29 || m.messageStubType === 32
    
    if (!isAdd && !isRemove) return true
    if (!safeUser(userId)) return true
    
    if (isRemove) {
        try {
            const metadata = await conn.groupMetadata(m.chat)
            const participantExists = metadata.participants.some(p => p.id === userId)
            if (participantExists) {
                console.log(`⏭️ Falso positivo: ${userId} sigue en el grupo`)
                return true
            }
        } catch (error) {
            console.log(`⚠️ Error verificando participante: ${error}`)
        }
    }
    
    console.log(`⚡ Evento detectado - Enviando ${isAdd ? 'bienvenida' : 'despedida'} para: ${userId}`)
    
    const freshGroupMetadata = await conn.groupMetadata(m.chat).catch(() => groupMetadata)
    
    let data
    if (isAdd) {
        data = await generarBienvenida({ conn, userId, groupMetadata: freshGroupMetadata, chat })
    } else {
        data = await generarDespedida({ conn, userId, groupMetadata: freshGroupMetadata, chat })
    }
    
    if (data) {
        await conn.sendMessage(m.chat, {
            image: { url: data.imageUrl },
            caption: data.caption,
            buttons: data.buttons,
            mentions: data.mentions,
            viewOnce: true
        })
        console.log(`✅ ${isAdd ? 'Bienvenida' : 'Despedida'} con botón enviada`)
        
        if (isRemove) {
            try {
                await m.react('🤮')
            } catch (e) {}
        }
    }
    
    if (isRemove) {
        setTimeout(async () => {
            try {
                const isSticker = Math.random() < 0.5
                if (isSticker) {
                    const url = STICKER_URLS[Math.floor(Math.random() * STICKER_URLS.length)]
                    const sticker = await (await fetch(url)).buffer()
                    await conn.sendMessage(m.chat, { sticker })
                } else {
                    const url = AUDIO_SALIDA_URLS[Math.floor(Math.random() * AUDIO_SALIDA_URLS.length)]
                    const audio = await (await fetch(url)).buffer()
                    await conn.sendMessage(m.chat, {
                        audio,
                        mimetype: 'audio/ogg; codecs=opus',
                        ptt: true
                    })
                }
                console.log(`✅ Sticker/audio de salida enviado`)
            } catch (e) {
                console.error('Error:', e)
            }
        }, 1000)
    }
    
    if (isAdd) {
        setTimeout(async () => {
            try {
                const audio = await (await fetch(AUDIO_BIENVENIDA_URL)).buffer()
                await conn.sendMessage(m.chat, {
                    audio,
                    mimetype: 'audio/ogg; codecs=opus',
                    ptt: true
                })
                console.log(`✅ Audio de bienvenida enviado`)
            } catch (e) {
                console.error('Error:', e)
            }
        }, 1000)
    }
    
    return true
}

export { generarBienvenida, generarDespedida }
export default handler
