import fetch from 'node-fetch'

let handler = async (m, { conn, command, usedPrefix }) => {
    let mentionedJid = await m.mentionedJid
    let userId = mentionedJid.length > 0 ? mentionedJid[0] : (m.quoted ? await m.quoted.sender : m.sender)
    let from = await conn.getName(m.sender) || m.sender.split('@')[0]
    let who = await conn.getName(userId) || userId.split('@')[0]
    
    let str, query
    
    switch (command) {
        // ==================== ENOJADO ====================
        case 'angry': case 'enojado':
            str = from === who ? `☑️ *${from}* está enojado/a! 😠` : `☑️ *${from}* está enojado/a con *${who}*! 😠`
            query = 'anime angry'
            break
            
        // ==================== MORDER ====================
        case 'bite': case 'morder':
            str = from === who ? `☑️ *${from}* se mordió a sí mismo/a! 🦷` : `☑️ *${from}* mordió a *${who}*! 🦷`
            query = 'anime bite'
            break
            
        // ==================== SACAR LENGUA ====================
        case 'bleh': case 'lengua':
            str = from === who ? `☑️ *${from}* saca la lengua! 😛` : `☑️ *${from}* le sacó la lengua a *${who}*! 😛`
            query = 'anime bleh'
            break
            
        // ==================== SONROJARSE ====================
        case 'blush': case 'sonrojarse':
            str = from === who ? `☑️ *${from}* se sonrojó! 😊` : `☑️ *${from}* se sonrojó por *${who}*! 😊`
            query = 'anime blush'
            break
            
        // ==================== ABURRIDO ====================
        case 'bored': case 'aburrido':
            str = from === who ? `☑️ *${from}* está aburrido/a! 😑` : `☑️ *${from}* está aburrido/a de *${who}*! 😑`
            query = 'anime bored'
            break
            
        // ==================== APLAUDIR ====================
        case 'clap': case 'aplaudir':
            str = from === who ? `☑️ *${from}* está aplaudiendo! 👏` : `☑️ *${from}* está aplaudiendo por *${who}*! 👏`
            query = 'anime clap'
            break
            
        // ==================== LLORAR ====================
        case 'cry': case 'llorar':
            str = from === who ? `☑️ *${from}* está llorando! 😢` : `☑️ *${from}* está llorando por *${who}*! 😢`
            query = 'anime cry'
            break
            
        // ==================== ACURRUCARSE ====================
        case 'cuddle': case 'acurrucarse':
            str = from === who ? `☑️ *${from}* se acurrucó! 🥰` : `☑️ *${from}* se acurrucó con *${who}*! 🥰`
            query = 'anime cuddle'
            break
            
        // ==================== BORRACHO ====================
        case 'drunk': case 'borracho':
            str = from === who ? `☑️ *${from}* está borracho! 🥴` : `☑️ *${from}* está borracho con *${who}*! 🥴`
            query = 'anime drunk'
            break
            
        // ==================== COMER ====================
        case 'eat': case 'comer':
            str = from === who ? `☑️ *${from}* está comiendo! 🍔` : `☑️ *${from}* está comiendo con *${who}*! 🍔`
            query = 'anime eat'
            break
            
        // ==================== PALMADA EN LA CARA ====================
        case 'facepalm': case 'palmada':
            str = from === who ? `☑️ *${from}* se da una palmada en la cara! 🤦` : `☑️ *${from}* se frustra por *${who}*! 🤦`
            query = 'anime facepalm'
            break
            
        // ==================== FELIZ ====================
        case 'happy': case 'feliz':
            str = from === who ? `☑️ *${from}* está feliz! 😊` : `☑️ *${from}* está feliz por *${who}*! 😊`
            query = 'anime happy'
            break
            
        // ==================== MATAR ====================
        case 'kill': case 'matar':
            str = from === who ? `☑️ *${from}* se mató a sí mismo/a! 💀` : `☑️ *${from}* mató a *${who}*! 💀`
            query = 'anime kill'
            break
            
        // ==================== REÍRSE ====================
        case 'laugh': case 'reirse':
            str = from === who ? `☑️ *${from}* se ríe! 😂` : `☑️ *${from}* se está riendo de *${who}*! 😂`
            query = 'anime laugh'
            break
            
        // ==================== LAMER ====================
        case 'lick': case 'lamer':
            str = from === who ? `☑️ *${from}* se lamió! 👅` : `☑️ *${from}* lamió a *${who}*! 👅`
            query = 'anime lick'
            break
            
        // ==================== BOFETADA ====================
        case 'slap': case 'bofetada':
            str = from === who ? `☑️ *${from}* se golpeó a sí mismo/a! 👋` : `☑️ *${from}* le dio una bofetada a *${who}*! 👋`
            query = 'anime slap'
            break
            
        // ==================== DORMIR ====================
        case 'sleep': case 'dormir':
            str = from === who ? `☑️ *${from}* está durmiendo profundamente! 😴` : `☑️ *${from}* duerme junto a *${who}*! 😴`
            query = 'anime sleep'
            break
            
        // ==================== FUMAR ====================
        case 'smoke': case 'fumar':
            str = from === who ? `☑️ *${from}* está fumando! 🚬` : `☑️ *${from}* está fumando con *${who}*! 🚬`
            query = 'anime smoke'
            break
            
        // ==================== ESCUPIR ====================
        case 'spit': case 'escupir':
            str = from === who ? `☑️ *${from}* se escupió a sí mismo/a! 🫧` : `☑️ *${from}* escupió a *${who}*! 🫧`
            query = 'anime spit'
            break
            
        // ==================== PISAR ====================
        case 'step': case 'pisar':
            str = from === who ? `☑️ *${from}* se pisó a sí mismo/a! 👣` : `☑️ *${from}* pisó a *${who}*! 👣`
            query = 'anime step'
            break
            
        // ==================== PENSAR ====================
        case 'think': case 'pensar':
            str = from === who ? `☑️ *${from}* está pensando! 🤔` : `☑️ *${from}* está pensando en *${who}*! 🤔`
            query = 'anime think'
            break
            
        // ==================== PALMADITA ====================
        case 'pat': case 'palmadita': case 'palmada':
            str = from === who ? `☑️ *${from}* se da palmaditas! 🫳` : `☑️ *${from}* acaricia suavemente a *${who}*! 🫳`
            query = 'anime pat'
            break
            
        // ==================== PICAR ====================
        case 'poke': case 'picar':
            str = from === who ? `☑️ *${from}* se da un toque curioso! ☝️` : `☑️ *${from}* da un golpecito a *${who}*! ☝️`
            query = 'anime poke'
            break
            
        // ==================== PUCHEROS ====================
        case 'pout': case 'pucheros':
            str = from === who ? `☑️ *${from}* hace pucheros! 😤` : `☑️ *${from}* está haciendo pucheros por *${who}*! 😤`
            query = 'anime pout'
            break
            
        // ==================== GOLPEAR ====================
        case 'punch': case 'pegar': case 'golpear':
            str = from === who ? `☑️ *${from}* se golpeó a sí mismo/a! 👊` : `☑️ *${from}* golpea a *${who}*! 👊`
            query = 'anime punch'
            break
            
        // ==================== PREÑAR ====================
        case 'preg': case 'preñar': case 'embarazar':
            str = from === who ? `☑️ *${from}* se embarazó solito/a... 🤰` : `☑️ *${from}* le regaló 9 meses a *${who}*! 🤰`
            query = 'anime preg'
            break
            
        // ==================== CORRER ====================
        case 'run': case 'correr':
            str = from === who ? `☑️ *${from}* está corriendo! 🏃` : `☑️ *${from}* sale corriendo de *${who}*! 🏃`
            query = 'anime run'
            break
            
        // ==================== TRISTE ====================
        case 'sad': case 'triste':
            str = from === who ? `☑️ *${from}* está triste! 😔` : `☑️ *${from}* está triste por *${who}*! 😔`
            query = 'anime sad'
            break
            
        // ==================== ASUSTADO ====================
        case 'scared': case 'asustada': case 'asustado':
            str = from === who ? `☑️ *${from}* se asusta! 😨` : `☑️ *${from}* está aterrorizado/a de *${who}*! 😨`
            query = 'anime scared'
            break
            
        // ==================== SEDUCIR ====================
        case 'seduce': case 'seducir':
            str = from === who ? `☑️ *${from}* susurra versos de amor! 💋` : `☑️ *${from}* lanza una mirada que derrite a *${who}*! 💋`
            query = 'anime seduce'
            break
            
        // ==================== TÍMIDO ====================
        case 'shy': case 'timido': case 'timida':
            str = from === who ? `☑️ *${from}* está tímido/a! 😳` : `☑️ *${from}* baja la mirada frente a *${who}*! 😳`
            query = 'anime shy'
            break
            
        // ==================== CAMINAR ====================
        case 'walk': case 'caminar':
            str = from === who ? `☑️ *${from}* está caminando! 🚶` : `☑️ *${from}* está caminando con *${who}*! 🚶`
            query = 'anime walk'
            break
            
        // ==================== DRAMÁTICO ====================
        case 'dramatic': case 'drama':
            str = from === who ? `☑️ *${from}* está montando un show! 🎭` : `☑️ *${from}* está actuando dramáticamente por *${who}*! 🎭`
            query = 'anime dramatic'
            break
            
        // ==================== GUIÑAR ====================
        case 'wink': case 'guiñar':
            str = from === who ? `☑️ *${from}* se guiñó el ojo! 😉` : `☑️ *${from}* le guiñó el ojo a *${who}*! 😉`
            query = 'anime wink'
            break
            
        // ==================== AVERGONZARSE ====================
        case 'cringe': case 'avergonzarse':
            str = from === who ? `☑️ *${from}* siente vergüenza ajena! 😬` : `☑️ *${from}* siente vergüenza por *${who}*! 😬`
            query = 'anime cringe'
            break
            
        // ==================== PRESUMIR ====================
        case 'smug': case 'presumir':
            str = from === who ? `☑️ *${from}* está presumiendo! 😏` : `☑️ *${from}* está presumiendo a *${who}*! 😏`
            query = 'anime smug'
            break
            
        // ==================== SONREÍR ====================
        case 'smile': case 'sonreir':
            str = from === who ? `☑️ *${from}* está sonriendo! 😁` : `☑️ *${from}* le sonrió a *${who}*! 😁`
            query = 'anime smile'
            break
            
        // ==================== CHOCAR LOS 5 ====================
        case 'highfive': case '5':
            str = from === who ? `☑️ *${from}* se chocó los cinco! 🖐️` : `☑️ *${from}* chocó los 5 con *${who}*! 🖐️`
            query = 'anime highfive'
            break
            
        // ==================== AGARRAR MANO ====================
        case 'handhold': case 'mano':
            str = from === who ? `☑️ *${from}* se dio la mano! 🤝` : `☑️ *${from}* le agarró la mano a *${who}*! 🤝`
            query = 'anime handhold'
            break
            
        // ==================== BULLYING ====================
        case 'bullying': case 'bully':
            str = from === who ? `☑️ *${from}* se hace bullying solo... 😔` : `☑️ *${from}* le está haciendo bullying a *${who}*! 😠`
            query = 'anime bullying'
            break
            
        // ==================== SALUDAR ====================
        case 'wave': case 'hola': case 'ola':
            str = from === who ? `☑️ *${from}* se saludó a sí mismo/a! 👋` : `☑️ *${from}* está saludando a *${who}*! 👋`
            query = 'anime wave'
            break
    }
    
    if (m.isGroup && str) {
        try {
            const res = await fetch(`${global.APIs.delirius.url}/search/tenor?q=${query}`)
            const json = await res.json()
            const gifs = json.data
            if (!gifs || gifs.length === 0) return conn.reply(m.chat, `☑️ No se encontraron resultados.`, m, rcanal)
            const randomGif = gifs[Math.floor(Math.random() * gifs.length)].mp4
            await conn.sendMessage(m.chat, { video: { url: randomGif }, gifPlayback: true, caption: str, mentions: [userId] }, { quoted: m })
        } catch (e) {
            console.error(e)
            await conn.reply(m.chat, `☑️ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.`, m, rcanal)
        }
    }
}

handler.help = ['angry', 'enojado', 'bite', 'morder', 'bleh', 'lengua', 'blush', 'sonrojarse', 'bored', 'aburrido', 'clap', 'aplaudir', 'cry', 'llorar', 'cuddle', 'acurrucarse', 'drunk', 'borracho', 'eat', 'comer', 'facepalm', 'palmada', 'happy', 'feliz', 'kill', 'matar', 'laugh', 'reirse', 'lick', 'lamer', 'slap', 'bofetada', 'sleep', 'dormir', 'smoke', 'fumar', 'spit', 'escupir', 'step', 'pisar', 'think', 'pensar', 'pat', 'palmadita', 'palmada', 'poke', 'picar', 'pout', 'pucheros', 'punch', 'pegar', 'golpear', 'preg', 'preñar', 'embarazar', 'run', 'correr', 'sad', 'triste', 'scared', 'asustada', 'asustado', 'seduce', 'seducir', 'shy', 'timido', 'timida', 'walk', 'caminar', 'dramatic', 'drama', 'wink', 'guiñar', 'cringe', 'avergonzarse', 'smug', 'presumir', 'smile', 'sonreir', 'highfive', '5', 'handhold', 'mano', 'bully', 'bullying', 'wave', 'hola', 'ola']
handler.tags = ['anime']
handler.command = ['angry', 'enojado', 'bite', 'morder', 'bleh', 'lengua', 'blush', 'sonrojarse', 'bored', 'aburrido', 'clap', 'aplaudir', 'cry', 'llorar', 'cuddle', 'acurrucarse', 'drunk', 'borracho', 'eat', 'comer', 'facepalm', 'palmada', 'happy', 'feliz', 'kill', 'matar', 'laugh', 'reirse', 'lick', 'lamer', 'slap', 'bofetada', 'sleep', 'dormir', 'smoke', 'fumar', 'spit', 'escupir', 'step', 'pisar', 'think', 'pensar', 'pat', 'palmadita', 'palmada', 'poke', 'picar', 'pout', 'pucheros', 'punch', 'pegar', 'golpear', 'preg', 'preñar', 'embarazar', 'run', 'correr', 'sad', 'triste', 'scared', 'asustada', 'asustado', 'seduce', 'seducir', 'shy', 'timido', 'timida', 'walk', 'caminar', 'dramatic', 'drama', 'wink', 'guiñar', 'cringe', 'avergonzarse', 'smug', 'presumir', 'smile', 'sonreir', 'highfive', '5', 'handhold', 'mano', 'bully', 'bullying', 'wave', 'hola', 'ola']
handler.group = true

export default handler
