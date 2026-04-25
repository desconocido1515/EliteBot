import db from '../../lib/database.js'

const handler = async (m, { conn, text, command, usedPrefix }) => {
    try {
        const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => 'https://files.catbox.moe/xr2m6u.jpg')
        let mentionedJid = await m.mentionedJid
        let who = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null
        const user = global.db.data.users[m.sender]
        const usuario = conn.user.jid.split`@`[0] + '@s.whatsapp.net'
        const groupInfo = await conn.groupMetadata(m.chat)
        const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net'
        const ownerBot = global.owner[0][0] + '@s.whatsapp.net'
        
        switch (command) {
            case 'advertencia': case 'warn': case 'addwarn': {
                if (!who || typeof who !== 'string' || !who.includes('@')) {
                    return conn.reply(m.chat, `☑️ *USO CORRECTO*\n\n📌 *Ejemplo:*\n.${command} @usuario (motivo)\n\nO responde al mensaje del usuario.`, m, rcanal)
                }
                
                const msgtext = text?.trim() || ''
                const partes = msgtext.split(/\s+/)
                const tieneMencion = partes.some(part => part.startsWith('@'))
                const motivo = tieneMencion ? partes.filter(part => !part.startsWith('@')).join(' ').trim() || 'Sin especificar' : msgtext || 'Sin especificar'
                
                if (who === conn.user.jid) return conn.reply(m.chat, `☑️ No puedo ponerle advertencias al bot.`, m, rcanal)
                if (who === ownerGroup) return conn.reply(m.chat, `☑️ No puedo darle advertencias al propietario del grupo.`, m, rcanal)
                if (who === ownerBot) return conn.reply(m.chat, `☑️ No puedo darle advertencias al propietario del bot.`, m, rcanal)
                
                if (!global.db.data.users[who]) global.db.data.users[who] = {}
                global.db.data.users[who].warn = (global.db.data.users[who].warn || 0) + 1
                
                await conn.reply(m.chat, `⚠️ *ADVERTENCIA* ⚠️\n\n@${who.split`@`[0]} recibió una advertencia en este grupo!\n📌 *Motivo:* ${motivo}\n⚠️ *Advertencias:* ${global.db.data.users[who].warn}/3`, m, rcanal)
                
                if (global.db.data.users[who].warn >= 3) {
                    global.db.data.users[who].warn = 0
                    await conn.reply(m.chat, `💀 *EXPULSIÓN POR ADVERTENCIAS* 💀\n\n@${who.split`@`[0]} superó las *3* advertencias.\n\n*¡TE LO ADVERTÍ VARIAS VECES!*\n\n*Serás eliminado del grupo.*`, m, rcanal)
                    await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
                }
                break
            }
            
            case 'delwarn': case 'unwarn': {
                if (!who) return conn.reply(m.chat, `☑️ *USO CORRECTO*\n\n📌 *Ejemplo:*\n.${command} @usuario\n\nO responde al mensaje del usuario.`, m, rcanal)
                if (mentionedJid.includes(conn.user.jid)) return
                
                if (!global.db.data.users[who] || global.db.data.users[who].warn === 0 || global.db.data.users[who].warn === undefined) {
                    return conn.reply(m.chat, `☑️ El usuario @${who.split`@`[0]} tiene 0 advertencias.`, m, rcanal)
                }
                
                global.db.data.users[who].warn -= 1
                await conn.reply(m.chat, `✅ *ADVERTENCIA QUITADA* ✅\n\n@${who.split`@`[0]} se le quitó una advertencia.\n⚠️ *Advertencias restantes:* ${global.db.data.users[who].warn}/3`, m, rcanal)
                break
            }
            
            case 'listadv': case 'advlist': {
                const warns = global.db.data.chats[m.chat]?.users || {}
                const adv = Object.entries(warns).filter(([_, u]) => u.warn)
                const totalWarns = Object.values(warns).reduce((acc, u) => acc + (u.warn || 0), 0)
                
                let listadvs = `☑️ *LISTA DE USUARIOS ADVERTIDOS* ☑️\n\n`
                listadvs += `📊 *Total de usuarios:* ${adv.length}\n`
                listadvs += `⚠️ *Total de advertencias:* ${totalWarns}\n\n`
                
                if (adv.length > 0) {
                    listadvs += `👥 *Usuarios:*\n`
                    listadvs += adv.map(([jid, user]) => `▸ @${jid.split`@`[0]} : *(${user.warn}/3)*`).join('\n')
                } else {
                    listadvs += `✅ *No hay usuarios con advertencias.*`
                }
                
                await conn.sendMessage(m.chat, { image: { url: pp }, caption: listadvs, mentions: await conn.parseMention(listadvs) }, { quoted: m })
                break
            }
        }
    } catch (error) {
        console.error(error)
        await conn.reply(m.chat, `⚠️ *ERROR*\n\n☑️ Ocurrió un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`, m, rcanal)
    }
}

handler.help = ['advertencia', 'warn', 'addwarn', 'delwarn', 'unwarn', 'listadv', 'advlist']
handler.tags = ['group']
handler.command = ['advertencia', 'warn', 'addwarn', 'delwarn', 'unwarn', 'listadv', 'advlist']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
