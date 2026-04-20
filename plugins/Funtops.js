import util from 'util'
import path from 'path' 

function handler(m, { groupMetadata, command, usedPrefix, conn }) {
   
    // Obtener lista de participantes (JIDs completos)
    let participantes = groupMetadata.participants.map(v => v.id || v.jid)
    
    // Función para obtener N participantes únicos aleatorios
    const obtenerUnicos = (cantidad) => {
        if (participantes.length < cantidad) return null
        let shuffled = [...participantes]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled.slice(0, cantidad)
    }
    
    // Función para extraer número del JID
    const num = (jid) => jid.split('@')[0]
    
    // Función para formatear mención en texto
    const mention = (jid) => '@' + num(jid)
    
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
    
    // ========== TOP GAYS (10 únicos) ==========
    if (command == 'topgays') {
        if (!validarParticipantes(10, 'TOP GAYS')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let vn = './media/gay2.mp3'
        let texto = `*🌈TOP 10 GAYS/LESBIANAS DEL GRUPO🌈*
    
*_1.- 🏳️‍🌈 ${mention(a)}_* 🏳️‍🌈
*_2.- 🪂 ${mention(b)}_* 🪂
*_3.- 🪁 ${mention(c)}_* 🪁
*_4.- 🏳️‍🌈 ${mention(d)}_* 🏳️‍🌈
*_5.- 🪂 ${mention(e)}_* 🪂
*_6.- 🪁 ${mention(f)}_* 🪁
*_7.- 🏳️‍🌈 ${mention(g)}_* 🏳️‍🌈
*_8.- 🪂 ${mention(h)}_* 🪂
*_9.- 🪁 ${mention(i)}_* 🪁
*_10.- 🏳️‍🌈 ${mention(j)}_* 🏳️‍🌈`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
        conn.sendFile(m.chat, vn, 'error.mp3', null, m, true, { type: 'audioMessage', ptt: true })
    }
    
    // ========== TOP OTAKUS (10 únicos) ==========
    if (command == 'topotakus') {
        if (!validarParticipantes(10, 'TOP OTAKUS')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let vn = './media/otaku.mp3'
        let texto = `*🌸 TOP 10 OTAKUS DEL GRUPO 🌸*
    
*_1.- 💮 ${mention(a)}_* 💮
*_2.- 🌷 ${mention(b)}_* 🌷
*_3.- 💮 ${mention(c)}_* 💮
*_4.- 🌷 ${mention(d)}_* 🌷
*_5.- 💮 ${mention(e)}_* 💮
*_6.- 🌷 ${mention(f)}_* 🌷
*_7.- 💮 ${mention(g)}_* 💮
*_8.- 🌷 ${mention(h)}_* 🌷
*_9.- 💮 ${mention(i)}_* 💮
*_10.- 🌷 ${mention(j)}_* 🌷`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
        conn.sendFile(m.chat, vn, 'otaku.mp3', null, m, true, { type: 'audioMessage', ptt: true })
    }
    
    // ========== TOP INTEGRANTES (10 únicos) ==========
    if (command == 'topintegrantes' || command == 'topintegrante') {
        if (!validarParticipantes(10, 'TOP INTEGRANTES')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_💎TOP 10 L@S MEJORES INTEGRANTES👑_*
    
*_1.- 💎 ${mention(a)}_* 💎
*_2.- 👑 ${mention(b)}_* 👑
*_3.- 💎 ${mention(c)}_* 💎
*_4.- 👑 ${mention(d)}_* 👑
*_5.- 💎 ${mention(e)}_* 💎
*_6.- 👑 ${mention(f)}_* 👑
*_7.- 💎 ${mention(g)}_* 💎
*_8.- 👑 ${mention(h)}_* 👑
*_9.- 💎 ${mention(i)}_* 💎
*_10.- 👑 ${mention(j)}_* 👑`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP GRASA / TOP LAGRASA (10 únicos) ==========
    if (command == 'toplagrasa' || command == 'topgrasa') {
        if (!validarParticipantes(10, 'TOP GRASA')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_Uwu TOP 10 LA GRASA Uwu_* 
    
*_1.- Bv ${mention(a)} Bv_*
*_2.- :v ${mention(b)} :v_*
*_3.- :D ${mention(c)} :D_*
*_4.- Owo ${mention(d)} Owo_*
*_5.- U.u ${mention(e)} U.u_*
*_6.- >:v ${mention(f)} >:v_*
*_7.- :'v ${mention(g)} :'v_*
*_8.- ._. ${mention(h)} ._._*
*_9.- :V ${mention(i)} :V_*
*_10.- XD ${mention(j)} XD_*`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP PANAFRESCOS (10 únicos) ==========
    if (command == 'toppanafrescos' || command == 'toppanafresco') {
        if (!validarParticipantes(10, 'TOP PANAFRESCOS')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_👊TOP 10 PANAFRESCOS👊_* 
    
*_1.- 🤑 ${mention(a)}_* 🤑
*_2.- 🤙 ${mention(b)}_* 🤙
*_3.- 😎 ${mention(c)}_* 😎
*_4.- 👌 ${mention(d)}_* 👌
*_5.- 🧐 ${mention(e)}_* 🧐
*_6.- 😃 ${mention(f)}_* 😃
*_7.- 😋 ${mention(g)}_* 😋
*_8.- 🤜 ${mention(h)}_* 🤜
*_9.- 💪 ${mention(i)}_* 💪
*_10.- 😉 ${mention(j)}_* 😉`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP SHIPOSTERS (10 únicos) ==========
    if (command == 'topshiposters' || command == 'topshipost') {
        if (!validarParticipantes(10, 'TOP SHIPOSTERS')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_😱TOP 10 SHIPOSTERS DEL GRUPO😱_* 
    
*_1.- 😈 ${mention(a)}_* 😈
*_2.- 🤙 ${mention(b)}_* 🤙
*_3.- 🥶 ${mention(c)}_* 🥶
*_4.- 🤑 ${mention(d)}_* 🤑
*_5.- 🥵 ${mention(e)}_* 🥵
*_6.- 🤝 ${mention(f)}_* 🤝
*_7.- 😟 ${mention(g)}_* 😟
*_8.- 😨 ${mention(h)}_* 😨
*_9.- 😇 ${mention(i)}_* 😇
*_10.- 🤠 ${mention(j)}_* 🤠`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP PAJER@S (10 únicos) ==========
    if (command == 'toppajer@s') {
        if (!validarParticipantes(10, 'TOP PAJER@S')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_😏TOP L@S MAS PAJEROS/AS DEL GRUPO💦_* 
    
*_1.- 🥵 ${mention(a)}_* 💦
*_2.- 🥵 ${mention(b)}_* 💦
*_3.- 🥵 ${mention(c)}_* 💦
*_4.- 🥵 ${mention(d)}_* 💦
*_5.- 🥵 ${mention(e)}_* 💦
*_6.- 🥵 ${mention(f)}_* 💦
*_7.- 🥵 ${mention(g)}_* 💦
*_8.- 🥵 ${mention(h)}_* 💦
*_9.- 🥵 ${mention(i)}_* 💦
*_10.- 🥵 ${mention(j)}_* 💦`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP LIND@S (10 únicos) ==========
    if (command == 'toplind@s' || command == 'toplindos') {
        if (!validarParticipantes(10, 'TOP LIND@S')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_😳TOP L@S MAS LIND@S Y SEXIS DEL GRUPO😳_*
    
*_1.- ✨ ${mention(a)}_* ✨
*_2.- ✨ ${mention(b)}_* ✨
*_3.- ✨ ${mention(c)}_* ✨
*_4.- ✨ ${mention(d)}_* ✨
*_5.- ✨ ${mention(e)}_* ✨
*_6.- ✨ ${mention(f)}_* ✨
*_7.- ✨ ${mention(g)}_* ✨
*_8.- ✨ ${mention(h)}_* ✨
*_9.- ✨ ${mention(i)}_* ✨
*_10.- ✨ ${mention(j)}_* ✨`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP PUT@S (10 únicos) ==========
    if (command == 'topput@s') {
        if (!validarParticipantes(10, 'TOP PUT@S')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_😏TOP L@S MAS PUT@S DEL GRUPO SON🔥_* 
    
*_1.- 👉 ${mention(a)}_* 👌
*_2.- 👉 ${mention(b)}_* 👌
*_3.- 👉 ${mention(c)}_* 👌
*_4.- 👉 ${mention(d)}_* 👌
*_5.- 👉 ${mention(e)}_* 👌
*_6.- 👉 ${mention(f)}_* 👌
*_7.- 👉 ${mention(g)}_* 👌
*_8.- 👉 ${mention(h)}_* 👌
*_9.- 👉 ${mention(i)}_* 👌
*_10.- 👉 ${mention(j)}_* 👌`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP FAMOSOS (10 únicos) ==========
    if (command == 'topfamosos' || command == 'topfamos@s') {
        if (!validarParticipantes(10, 'TOP FAMOSOS')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_🌟TOP PERSONAS FAMOSAS EN EL GRUPO🌟_* 
    
*_1.- 🛫 ${mention(a)}_* 🛫
*_2.- 🥂 ${mention(b)}_* 🥂
*_3.- 🤩 ${mention(c)}_* 🤩
*_4.- 🛫 ${mention(d)}_* 🛫
*_5.- 🥂 ${mention(e)}_* 🥂
*_6.- 🤩 ${mention(f)}_* 🤩
*_7.- 🛫 ${mention(g)}_* 🛫
*_8.- 🥂 ${mention(h)}_* 🥂
*_9.- 🤩 ${mention(i)}_* 🤩
*_10.- 🛫 ${mention(j)}_* 🛫`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP PAREJAS (10 únicos para 5 parejas) ==========
    if (command == 'topparejas' || command == 'top5parejas') {
        if (!validarParticipantes(10, 'TOP PAREJAS')) return
        let seleccion = obtenerUnicos(10)
        let [a,b,c,d,e,f,g,h,i,j] = seleccion
        
        let texto = `*_😍 Las 5 maravillosas parejas del grupo 😍_*
    
*_1.- ${mention(a)} 💘 ${mention(b)}_* 
Que hermosa pareja 💖, me invitan a su Boda 🛐

*_2.- ${mention(c)} 💘 ${mention(d)}_*  
🌹 Ustedes se merecen lo mejor del mundo 💞

*_3.- ${mention(e)} 💘 ${mention(f)}_* 
Tan enamorados 😍, para cuando la familia 🥰

*_4.- ${mention(g)} 💘 ${mention(h)}_* 
💗 Decreto que ustedes son la pareja del Año 💗 

*_5.- ${mention(i)} 💘 ${mention(j)}_* 
Genial! 💝, están de Luna de miel 🥵✨❤️‍🔥`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
    // ========== TOP 2 PAREJAS (4 únicos) ==========
    if (command == 'top2parejas') {
        if (!validarParticipantes(4, 'TOP 2 PAREJAS')) return
        let seleccion = obtenerUnicos(4)
        let [a,b,c,d] = seleccion
        
        let texto = `*_😍 Las 2 maravillosas parejas del grupo 😍_*
    
*_1.- ${mention(a)} 💘 ${mention(b)}_* 
Que hermosa pareja 💖, me invitan a su Boda 🛐

*_2.- ${mention(c)} 💘 ${mention(d)}_*  
🌹 Ustedes se merecen lo mejor del mundo 💞`
        
        conn.sendMessage(m.chat, { text: texto, mentions: seleccion }, { quoted: m })
    }
    
}

handler.help = handler.command = ['topgays', 'topotakus', 'topintegrantes', 'topintegrante', 'toplagrasa', 'topgrasa', 'toppanafrescos', 'toppanafresco', 'topshiposters', 'topshipost', 'toppajer@s', 'toplindos', 'toplind@s', 'topput@s', 'topfamosos', 'topfamos@s', 'topparejas', 'top5parejas', 'top2parejas']
handler.tags = ['games']
handler.group = true

export default handler
