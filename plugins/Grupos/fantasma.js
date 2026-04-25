import { areJidsSameUser } from '@whiskeysockets/baileys'

var handler = async (m, { conn, text, participants, args, command, usedPrefix }) => {
    try {
        let member = participants.map(u => u.id)
        if (!text) {
            var sum = member.length
        } else {
            var sum = text
        }
        var total = 0
        var sider = []
        
        for (let i = 0; i < sum; i++) {
            let users = m.isGroup ? participants.find(u => u.id == member[i]) : {}
            if ((typeof global.db.data.users[member[i]] == 'undefined' || global.db.data.users[member[i]].chat == 0) && !users.isAdmin && !users.isSuperAdmin) {
                if (typeof global.db.data.users[member[i]] !== 'undefined') {
                    if (global.db.data.users[member[i]].whitelist == false) {
                        total++
                        sider.push(member[i])
                    }
                } else {
                    total++
                    sider.push(member[i])
                }
            }
        }
        
        const delay = time => new Promise(res => setTimeout(res, time))
        
        switch (command) {
            case 'inactivos': case 'fantasmas': {
                if (total == 0) {
                    return conn.reply(m.chat, `✅ *GRUPO ACTIVO*\n\n☑️ Este grupo es activo, no tiene miembros inactivos.`, m, rcanal)
                }
                
                await conn.reply(m.chat, `👻 *LISTA DE INACTIVOS* 👻\n\n📌 *Total de inactivos:* ${total}\n\n${sider.map(v => '▸ @' + v.replace(/@.+/, '')).join('\n')}\n\n⚠️ *NOTA:* El bot comienza a contar mensajes desde que se activó en este grupo.`, m, rcanal)
                break
            }
            
            case 'kickinactivos': case 'kickfantasmas': {
                if (total == 0) {
                    return conn.reply(m.chat, `✅ *GRUPO ACTIVO*\n\n☑️ Este grupo es activo, no hay inactivos para eliminar.`, m, rcanal)
                }
                
                await conn.reply(m.chat, `🗑️ *ELIMINANDO INACTIVOS* 🗑️\n\n📌 *Lista de inactivos:*\n${sider.map(v => '▸ @' + v.replace(/@.+/, '')).join('\n')}\n\n⏰ *Proceso iniciado...*\n⚠️ Los usuarios serán eliminados en 10 segundos.`, m, rcanal)
                
                await delay(1 * 10000)
                
                let chat = global.db.data.chats[m.chat]
                chat.welcome = false
                
                try {
                    let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id))
                    let kickedGhost = sider.map(v => v.id).filter(v => v !== conn.user.jid)
                    
                    for (let user of users) {
                        if (user.endsWith('@s.whatsapp.net') && !(participants.find(v => areJidsSameUser(v.id, user)) || { admin: true }).admin) {
                            let res = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
                            kickedGhost.concat(res)
                            await delay(1 * 10000)
                        }
                    }
                    
                    await conn.reply(m.chat, `✅ *INACTIVOS ELIMINADOS*\n\n☑️ Se han eliminado ${sider.length} miembros inactivos del grupo.`, m, rcanal)
                    
                } finally {
                    chat.welcome = true
                }
                break
            }
        }
    } catch (e) {
        console.error(e)
        await conn.reply(m.chat, `⚠️ *ERROR*\n\n☑️ Ocurrió un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n*Error:* ${e.message}`, m, rcanal)
    }
}

handler.tags = ['group']
handler.command = ['inactivos', 'fantasmas', 'kickinactivos', 'kickfantasmas']
handler.group = true
handler.botAdmin = true
handler.admin = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
