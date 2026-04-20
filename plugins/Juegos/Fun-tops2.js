import util from 'util'
import path from 'path' 

function handler(m, { groupMetadata, command, usedPrefix, conn }) {
   
    // Obtener lista de participantes (JIDs completos)
    let participantes = groupMetadata.participants.map(v => v.id || v.jid)
    
    // Función para obtener N participantes únicos aleatorios
    const obtenerUnicos = (cantidad) => {
        if (participantes.length < cantidad) return null
        // Mezclar array y tomar los primeros 'cantidad'
        let shuffled = [...participantes]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled.slice(0, cantidad)
    }
    
    // Función para extraer número del JID
    const num = (jid) => jid.split('@')[0]
    
    // Validación genérica
    const validarParticipantes = (necesarios, comandoNombre) => {
        if (participantes.length < necesarios) {
            conn.sendMessage(m.chat, { 
                text: `⚠️ *${comandoNombre}*\n\n❌ *Hola humano, no hay suficientes integrantes.*\n✅ *Activa este grupo* con al menos ${necesarios} participantes.` 
            }, { quoted: m })
            return false
        }
        return true
    }
    
    // ========== TOP M1014 (10 únicos) ==========
    if (command == 'topm1014') {
        if (!validarParticipantes(10, 'TOP M1014')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_TOP 10 MEJORES JUGADORES A M1014☠️_*
    
*_1.- ☠️ @${num(a)}_* ☠️
*_2.- ☠️ @${num(b)}_* ☠️
*_3.- ☠️ @${num(c)}_* ☠️
*_4.- ☠️ @${num(d)}_* ☠️
*_5.- ☠️ @${num(e)}_* ☠️
*_6.- ☠️ @${num(f)}_* ☠️
*_7.- ☠️ @${num(g)}_* ☠️
*_8.- ☠️ @${num(h)}_* ☠️
*_9.- ☠️ @${num(i)}_* ☠️
*_10.- ☠️ @${num(j)}_* ☠️`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP COMPE (10 únicos) ==========
    if (command == 'topcompe') {
        if (!validarParticipantes(10, 'TOP COMPE')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_TOP 10 MEJORES JUGADORES DE COMPE🇧🇷_*
    
*_1.- 🇧🇷 @${num(a)}_* 🇧🇷
*_2.- 🇧🇷 @${num(b)}_* 🇧🇷
*_3.- 🇧🇷 @${num(c)}_* 🇧🇷
*_4.- 🇧🇷 @${num(d)}_* 🇧🇷
*_5.- 🇧🇷 @${num(e)}_* 🇧🇷
*_6.- 🇧🇷 @${num(f)}_* 🇧🇷
*_7.- 🇧🇷 @${num(g)}_* 🇧🇷
*_8.- 🇧🇷 @${num(h)}_* 🇧🇷
*_9.- 🇧🇷 @${num(i)}_* 🇧🇷
*_10.- 🇧🇷 @${num(j)}_* 🇧🇷`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== CLASIFICATORIA (3 únicos) ==========
    if (command == 'clasificatoria') {
        if (!validarParticipantes(3, 'CLASIFICATORIA')) return
        let seleccion = obtenerUnicos(3)
        let [a,b,c] = seleccion
        
        let texto = `¡𝑽𝑨𝑴𝑶𝑺 𝑨 𝑩𝑹 𝑪𝑳𝑨𝑺𝑰𝑭𝑰𝑪𝑨𝑻𝑶𝑹𝑰𝑨!⚔️

𝐶𝑜𝑛𝑓𝑖𝑟𝑚𝑒𝑛:
🥷🏻 @${num(a)}
🥷🏻 @${num(b)}
🥷🏻 @${num(c)}

¡𝑳𝑳𝑬𝑽𝑬𝑵 𝑯𝑨𝑩𝑰𝑳𝑰𝑫𝑨𝑫𝑬𝑺 𝒀 𝑴𝑨𝑺𝑪𝑶𝑻𝑨, 𝑽𝑨𝑴𝑶𝑺 𝑨 𝑷𝑹𝑬𝑵𝑫𝑬𝑹 𝑭𝑶𝑭𝑶𝑮𝑶 𝑬𝑵 𝑩𝑹!`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== DUELO (3 únicos) ==========
    if (command == 'duelo') {
        if (!validarParticipantes(3, 'DUELO')) return
        let seleccion = obtenerUnicos(3)
        let [a,b,c] = seleccion
        
        let texto = `¡𝑽𝑨𝑴𝑶𝑺 𝑨 𝑫𝑬 𝑪𝑳𝑨𝑺𝑰𝑭𝑰𝑪𝑨𝑻𝑶𝑹𝑰𝑨 !🇧🇷

𝐶𝑜𝑛𝑓𝑖𝑟𝑚𝑒𝑛:
🥷🏻 @${num(a)}
🥷🏻 @${num(b)}
🥷🏻 @${num(c)}

¡𝑳𝑳𝑬𝑽𝑬𝑵 𝑯𝑨𝑩𝑰𝑳𝑰𝑫𝑨𝑫𝑬𝑺 𝒀 𝑴𝑨𝑺𝑪𝑶𝑻𝑨, 𝑽𝑨𝑴𝑶𝑺 𝑨 𝑷𝑹𝑬𝑵𝑫𝑬𝑹 𝑭𝑶𝑭𝑶𝑮𝑶 𝑬𝑵 𝑫𝑬!`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== DUO (1 único) ==========
    if (command == 'duo') {
        if (!validarParticipantes(1, 'DUO')) return
        let seleccion = obtenerUnicos(1)
        let [a] = seleccion
        
        let texto = `¡𝑽𝑨𝑴𝑶𝑺 𝑼𝑵 𝑫𝑼𝑰𝑻𝑶!⚔️

𝐶𝑜𝑛𝑓𝑖𝑟𝑚𝑎:
❤️ @${num(a)}

¡𝑺𝑬𝑹𝑬 𝑻𝑼 𝑫𝑼́𝑶 𝑫𝑰𝑵𝑨́𝑴𝑰𝑪𝑶 𝑴𝑨𝑺 𝑶𝑻𝑨𝑲𝑼!`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== COMPE (10 únicos) ==========
    if (command == 'compe') {
        if (!validarParticipantes(10, 'COMPE')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `¡𝑽𝑨𝑴𝑶𝑺 𝑨 𝑼𝑵 𝑪𝑶𝑴𝑷𝑬! 🇧🇷

𝐶𝑜𝑛𝑓𝑖𝑟𝑚𝑒𝑛:
🥷🏻 @${num(a)}
🥷🏻 @${num(b)}
🥷🏻 @${num(c)}
🥷🏻 @${num(d)}
🥷🏻 @${num(e)}
🥷🏻 @${num(f)}
🥷🏻 @${num(g)}
🥷🏻 @${num(h)}
🥷🏻 @${num(i)}
🥷🏻 @${num(j)}

𝑸𝑼𝑰𝑬𝑵 𝑵𝑶 𝑪𝑶𝑵𝑭𝑰𝑹𝑴𝑬 𝑫𝑬 𝑳𝑶𝑺 𝑴𝑬𝑵𝑪𝑰𝑶𝑵𝑨𝑫𝑶𝑺  𝑴𝑬𝑪𝑶 𝒀 𝑮𝑨𝒀.🏳️‍🌈`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP UMP (10 únicos) ==========
    if (command == 'topump') {
        if (!validarParticipantes(10, 'TOP UMP')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_TOP 10 MEJORES JUGADORES A UMP👹_*
    
*_1.- 👹 @${num(a)}_* 👹
*_2.- 👹 @${num(b)}_* 👹
*_3.- 👹 @${num(c)}_* 👹
*_4.- 👹 @${num(d)}_* 👹
*_5.- 👹 @${num(e)}_* 👹
*_6.- 👹 @${num(f)}_* 👹
*_7.- 👹 @${num(g)}_* 👹
*_8.- 👹 @${num(h)}_* 👹
*_9.- 👹 @${num(i)}_* 👹
*_10.- 👹 @${num(j)}_* 👹`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP FIELES (10 únicos) ==========
    if (command == 'topfieles') {
        if (!validarParticipantes(10, 'TOP FIELES')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_TOP 10 FIELES DEL GRUPO👩🏻‍❤️‍👨🏻_*
    
*_1.- 👩🏻‍❤️‍👨🏻 @${num(a)}_* 👩🏻‍❤️‍👨🏻
*_2.- 👩🏻‍❤️‍👨🏻 @${num(b)}_* 👩🏻‍❤️‍👨🏻
*_3.- 👩🏻‍❤️‍👨🏻 @${num(c)}_* 👩🏻‍❤️‍👨🏻
*_4.- 👩🏻‍❤️‍👨🏻 @${num(d)}_* 👩🏻‍❤️‍👨🏻
*_5.- 👩🏻‍❤️‍👨🏻 @${num(e)}_* 👩🏻‍❤️‍👨🏻
*_6.- 👩🏻‍❤️‍👨🏻 @${num(f)}_* 👩🏻‍❤️‍👨🏻
*_7.- 👩🏻‍❤️‍👨🏻 @${num(g)}_* 👩🏻‍❤️‍👨🏻
*_8.- 👩🏻‍❤️‍👨🏻 @${num(h)}_* 👩🏻‍❤️‍👨🏻
*_9.- 👩🏻‍❤️‍👨🏻 @${num(i)}_* 👩🏻‍❤️‍👨🏻
*_10.- 👩🏻‍❤️‍👨🏻 @${num(j)}_* 👩🏻‍❤️‍👨🏻`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP MAPA (10 únicos) ==========
    if (command == 'topmapa') {
        if (!validarParticipantes(10, 'TOP MAPA')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_TOP 10 MEJORES JUGADORES DE MAPA GRANDE💀_*
    
*_1.- 💀 @${num(a)}_* 💀
*_2.- 💀 @${num(b)}_* 💀
*_3.- 💀 @${num(c)}_* 💀
*_4.- 💀 @${num(d)}_* 💀
*_5.- 💀 @${num(e)}_* 💀
*_6.- 💀 @${num(f)}_* 💀
*_7.- 💀 @${num(g)}_* 💀
*_8.- 💀 @${num(h)}_* 💀
*_9.- 💀 @${num(i)}_* 💀
*_10.- 💀 @${num(j)}_* 💀`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP JUGADORES (10 únicos) ==========
    if (command == 'topjugadores') {
        if (!validarParticipantes(10, 'TOP JUGADORES')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_TOP 10  MEJORES JUGADORES DEL CLAN/TEAM_*
    
*_1.- 🎮 @${num(a)}_* 🎮
*_2.- 🎮 @${num(b)}_* 🎮
*_3.- 🎮 @${num(c)}_* 🎮
*_4.- 🎮 @${num(d)}_* 🎮
*_5.- 🎮 @${num(e)}_* 🎮
*_6.- 🎮 @${num(f)}_* 🎮
*_7.- 🎮 @${num(g)}_* 🎮
*_8.- 🎮 @${num(h)}_* 🎮
*_9.- 🎮 @${num(i)}_* 🎮
*_10.- 🎮 @${num(j)}_* 🎮`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP INFIELES (10 únicos) ==========
    if (command == 'topinfieles') {
        if (!validarParticipantes(10, 'TOP INFIELES')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_TOP 10 INFIELES DEL GRUPO_*
    
*_1.- 🫣 @${num(a)}_* 🫣
*_2.- 🫣 @${num(b)}_* 🫣
*_3.- 🫣 @${num(c)}_* 🫣
*_4.- 🫣 @${num(d)}_* 🫣
*_5.- 🫣 @${num(e)}_* 🫣
*_6.- 🫣 @${num(f)}_* 🫣
*_7.- 🫣 @${num(g)}_* 🫣
*_8.- 🫣 @${num(h)}_* 🫣
*_9.- 🫣 @${num(i)}_* 🫣
*_10.- 🫣 @${num(j)}_* 🫣`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP BINARIOS (10 únicos) ==========
    if (command == 'topbinarios') {
        if (!validarParticipantes(10, 'TOP BINARIOS')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_TOP 10 BINARIOS DEL CLAN/TEAM🍌_*
    
*_1.- 🍌 @${num(a)}_* 🍌
*_2.- 🍌 @${num(b)}_* 🍌
*_3.- 🍌 @${num(c)}_* 🍌
*_4.- 🍌 @${num(d)}_* 🍌
*_5.- 🍌 @${num(e)}_* 🍌
*_6.- 🍌 @${num(f)}_* 🍌
*_7.- 🍌 @${num(g)}_* 🍌
*_8.- 🍌 @${num(h)}_* 🍌
*_9.- 🍌 @${num(i)}_* 🍌
*_10.- 🍌 @${num(j)}_* 🍌`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP ALCOHOLICOS (10 únicos) ==========
    if (command == 'topalcoholicos') {
        if (!validarParticipantes(10, 'TOP ALCOHÓLICOS')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_TOP 10 ALCOHÓLIC@S DEL GRUPO🍺_*
    
*_1.- 🍻 @${num(a)}_* 🍺
*_2.- 🍻 @${num(b)}_* 🍺
*_3.- 🍻 @${num(c)}_* 🍺
*_4.- 🍻 @${num(d)}_* 🍺
*_5.- 🍻 @${num(e)}_* 🍺
*_6.- 🍻 @${num(f)}_* 🍺
*_7.- 🍻 @${num(g)}_* 🍺
*_8.- 🍻 @${num(h)}_* 🍺
*_9.- 🍻 @${num(i)}_* 🍺
*_10.- 🍻 @${num(j)}_* 🍺`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP SIDOSOS (10 únicos) ==========
    if (command == 'topsidosos') {
        if (!validarParticipantes(10, 'TOP SIDOSOS')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_TOP 10 SIDOS@S DEL GRUPO🦠_*
    
*_1.- 🦠 @${num(a)}_* 🦠
*_2.- 🦠 @${num(b)}_* 🦠
*_3.- 🦠 @${num(c)}_* 🦠
*_4.- 🦠 @${num(d)}_* 🦠
*_5.- 🦠 @${num(e)}_* 🦠
*_6.- 🦠 @${num(f)}_* 🦠
*_7.- 🦠 @${num(g)}_* 🦠
*_8.- 🦠 @${num(h)}_* 🦠
*_9.- 🦠 @${num(i)}_* 🦠
*_10.- 🦠 @${num(j)}_* 🦠`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP CACHUDOS (10 únicos) ==========
    if (command == 'topcachudos') {
        if (!validarParticipantes(10, 'TOP CACHUDOS')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_TOP 10 CACHUD@S DEL GRUPO🐂_*
    
*_1.- 🐂 @${num(a)}_* 🐂
*_2.- 🐂 @${num(b)}_* 🐂
*_3.- 🐂 @${num(c)}_* 🐂
*_4.- 🐂 @${num(d)}_* 🐂
*_5.- 🐂 @${num(e)}_* 🐂
*_6.- 🐂 @${num(f)}_* 🐂
*_7.- 🐂 @${num(g)}_* 🐂
*_8.- 🐂 @${num(h)}_* 🐂
*_9.- 🐂 @${num(i)}_* 🐂
*_10.- 🐂 @${num(j)}_* 🐂

*_EL PRIMERO EL MAS CACHUD@_*🤪`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP CHICHONAS (10 únicos) ==========
    if (command == 'topchichonas') {
        if (!validarParticipantes(10, 'TOP CHICHONAS')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_😈TOP 10 CHICHONAS DEL GRUPO😈_*
    
*_1.- 👿 @${num(a)}_* 😈
*_2.- 👿 @${num(b)}_* 😈
*_3.- 👿 @${num(c)}_* 😈
*_4.- 👿 @${num(d)}_* 😈
*_5.- 👿 @${num(e)}_* 😈
*_6.- 👿 @${num(f)}_* 😈
*_7.- 👿 @${num(g)}_* 😈
*_8.- 👿 @${num(h)}_* 😈
*_9.- 👿 @${num(i)}_* 😈
*_10.- 😈 @${num(j)}_* 😈

*_LA 5 ESTA COGIBLE_*🤫`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP CULONAS (10 únicos) ==========
    if (command == 'topculonas') {
        if (!validarParticipantes(10, 'TOP CULONAS')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_TOP 10 CULONAS DEL GRUPO🍑_*
    
*_1.- 🍑 @${num(a)}_* 🍑
*_2.- 🍑 @${num(b)}_* 🍑
*_3.- 🍑 @${num(c)}_* 🍑
*_4.- 🍑 @${num(d)}_* 🍑
*_5.- 🍑 @${num(e)}_* 🍑
*_6.- 🍑 @${num(f)}_* 🍑
*_7.- 🍑 @${num(g)}_* 🍑
*_8.- 🍑 @${num(h)}_* 🍑
*_9.- 🍑 @${num(i)}_* 🍑
*_10.- 🍑 @${num(j)}_* 🍑

*_LA PRIMERA ESTA COGIBLE_*🥵`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP FEOS (10 únicos) ==========
    if (command == 'topfeos') {
        if (!validarParticipantes(10, 'TOP FEOS')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_TOP FE@S DEL GRUPO🤢_*
    
*_1.- 🤢 @${num(a)}_* 🤮
*_2.- 🤢 @${num(b)}_* 🤮
*_3.- 🤢 @${num(c)}_* 🤮
*_4.- 🤢 @${num(d)}_* 🤮
*_5.- 🤢 @${num(e)}_* 🤮
*_6.- 🤢 @${num(f)}_* 🤮
*_7.- 🤢 @${num(g)}_* 🤮
*_8.- 🤢 @${num(h)}_* 🤮
*_9.- 🤢 @${num(i)}_* 🤮
*_10.- 🤢 @${num(j)}_* 🤮

*_EL 1 Y 10 LOS MAS FE@S_*🤢`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
   
}

handler.help = handler.command = ['topm1014','clasificatoria','duelo','duo','compe','topump','topcompe','topfieles','topmapa','topjugadores','topinfieles','topbinarios','topalcoholicos','topsidosos','topcachudos','topculonas','topchichonas','topfeos']
handler.tags = ['games']
handler.group = true

export default handler
