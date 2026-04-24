// plugins/sernovios.js

let mensajesGrupos = new Map();
let parejasConfirmadas = new Map();

// Función para mostrar el mensaje de declaración
async function mostrarDeclaracion(conn, chat, proponente, propuesto, nombreRemitente, nombreMencionado) {
    const texto = `💘 *¡DECLARACIÓN!* 💘
    
💑 *${nombreRemitente}* quiere ser tu novio/a.

💌 Si aceptas, serás suyo/a... si no, igual. 😏

*¿ACEPTAS EL DESAFÍO DEL AMOR?*`;

    const buttons = [
        { buttonId: 'aceptar', buttonText: { displayText: "✅ ACEPTAR" }, type: 1 },
        { buttonId: 'rechazar', buttonText: { displayText: "❌ RECHAZAR" }, type: 1 }
    ];

    await conn.sendMessage(chat, {
        text: texto,
        buttons: buttons,
        mentions: [propuesto],
        viewOnce: true
    });
}

// Función para mostrar mensaje de parejas
async function mostrarParejas(conn, chat, parejas) {
    if (parejas.length === 0) {
        await conn.reply(chat, `💔 *NO HAY PAREJAS*\n\nEn este grupo solo hay solteros desesperados. 😂`, null, rcanal);
        return;
    }
    
    let lista = "💑 *PAREJAS DEL GRUPO* 💑\n\n";
    for (const [p1, p2] of parejas) {
        lista += `▸ ${await conn.getName(p1)} 💕 ${await conn.getName(p2)}\n`;
    }
    
    const buttons = [
        { buttonId: 'terminar', buttonText: { displayText: "💔 TERMINAR" }, type: 1 }
    ];
    
    await conn.sendMessage(chat, {
        text: lista,
        buttons: buttons,
        viewOnce: true
    });
}

let handler = m => m

handler.before = async function (m, { conn }) {
    // DETECTAR RESPUESTA DE BOTONES
    if (m.message?.buttonsResponseMessage) {
        const buttonId = m.message.buttonsResponseMessage.selectedButtonId
        const groupId = m.chat
        
        console.log('Botón parejas presionado:', buttonId)
        
        // ==================== ACEPTAR ====================
        if (buttonId === 'aceptar') {
            const tag = m.sender;
            const mensajeGuardado = mensajesGrupos.get(groupId);
            const proponente = mensajeGuardado?.proponente;
            const propuesto = mensajeGuardado?.propuesto;
            
            if (!proponente || tag !== propuesto) {
                await conn.reply(m.chat, `🚫 *Oops*\nEsta declaración no es para ti, sapito. 🐸`, m, rcanal);
                return;
            }
            
            if (proponente === tag) {
                await conn.reply(m.chat, `🤡 *¿Auto-aceptarse?*\nNo seas triste, sal a conocer gente.`, m, rcanal);
                return;
            }
            
            if (!parejasConfirmadas.has(groupId)) parejasConfirmadas.set(groupId, []);
            parejasConfirmadas.get(groupId).push([proponente, tag]);
            
            const nombre1 = await conn.getName(tag);
            const nombre2 = await conn.getName(proponente);
            
            const texto = `🎉 *¡NOVIOS!* 🎉
            
💕 *${nombre2}* y *${nombre1}* ahora son pareja.

💀 Si rompen, el grupo los funa. 🔫

💔 Usa *terminar* cuando te aburras
💑 Usa *parejas* para ver la lista`;
            
            const buttons = [
                { buttonId: 'terminar', buttonText: { displayText: "💔 TERMINAR" }, type: 1 },
                { buttonId: 'parejas', buttonText: { displayText: "💑 VER PAREJAS" }, type: 1 }
            ];
            
            await conn.sendMessage(m.chat, {
                text: texto,
                buttons: buttons,
                mentions: [proponente, tag],
                viewOnce: true
            });
            
            mensajesGrupos.delete(groupId);
            return;
        }
        
        // ==================== RECHAZAR ====================
        if (buttonId === 'rechazar') {
            const tag = m.sender;
            const mensajeGuardado = mensajesGrupos.get(groupId);
            const proponente = mensajeGuardado?.proponente;
            const propuesto = mensajeGuardado?.propuesto;
            
            if (!proponente || tag !== propuesto) {
                await conn.reply(m.chat, `🚫 *Oops*\nEsta declaración no es para ti, sapito. 🐸`, m, rcanal);
                return;
            }
            
            if (proponente === tag) {
                await conn.reply(m.chat, `💢 *¿Auto-rechazo?*\nAl menos date una oportunidad.`, m, rcanal);
                return;
            }
            
            await conn.reply(m.chat, `💔 *RECHAZADO/A* 💔\n\n» ${await conn.getName(tag)} dijo NO.\n» A llorar al rincón, ${await conn.getName(proponente)}. 😢`, m, rcanal);
            
            mensajesGrupos.delete(groupId);
            return;
        }
        
        // ==================== TERMINAR ====================
        if (buttonId === 'terminar') {
            const parejas = parejasConfirmadas.get(groupId) || [];
            const pareja = parejas.find(p => p[0] === m.sender || p[1] === m.sender);
            
            if (pareja) {
                parejasConfirmadas.set(groupId, parejas.filter(p => p[0] !== m.sender && p[1] !== m.sender));
                await conn.reply(m.chat, `💔 *¡SE ACABÓ!* 💔\n\nAdiós, espero no verte... aunque sé que volverás 😈\nGracias por los recuerdos (y los dramas).`, m, rcanal);
            } else {
                await conn.reply(m.chat, `❌ *¿Terminar qué?*\nNi novio/a tienes, mi ciela. 😂`, m, rcanal);
            }
            return;
        }
        
        // ==================== VER PAREJAS ====================
        if (buttonId === 'parejas') {
            const parejas = parejasConfirmadas.get(groupId) || [];
            await mostrarParejas(conn, m.chat, parejas);
            return;
        }
        
        return;
    }
    
    // DETECTAR COMANDO .sernovios (con o sin espacio)
    const textLimpio = m.text ? m.text.toLowerCase().trim() : ''
    
    if (textLimpio === '.sernovios' || textLimpio === '. sernovios' || textLimpio.startsWith('.sernovios ') || textLimpio.startsWith('. sernovios ')) {
        // Obtener el usuario mencionado (misma lógica que promote)
        let mentionedJid = await m.mentionedJid;
        let usuario = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null;
        
        if (!usuario) {
            await conn.reply(m.chat, `☑️ *DEBES MENCIONAR O RESPONDER A UN USUARIO*\n\n📌 *Ejemplo:*\n.sernovios @usuario\n\n📌 *O responde al mensaje de la persona*`, m, rcanal);
            return;
        }
        
        if (usuario === m.sender) {
            await conn.reply(m.chat, `☑️ No puedes ser tu propio novio/a. Menciona a otra persona.`, m, rcanal);
            return;
        }
        
        const parejas = parejasConfirmadas.get(m.chat) || [];
        if (parejas.some(par => par.includes(m.sender) || par.includes(usuario))) {
            await conn.reply(m.chat, `⚡ *Infiel detectado*\nYa tienes pareja, ¿o te gusta el drama? 👀`, m, rcanal);
            return;
        }
        
        const nombreRemitente = m.pushName || m.sender.split('@')[0];
        const nombreMencionado = await conn.getName(usuario);
        
        mensajesGrupos.set(m.chat, { proponente: m.sender, propuesto: usuario });
        
        await mostrarDeclaracion(conn, m.chat, m.sender, usuario, nombreRemitente, nombreMencionado);
        return;
    }
}

export default handler;
