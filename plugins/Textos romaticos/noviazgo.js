import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

let mensajesGrupos = new Map();
let parejasConfirmadas = new Map();

// --- HANDLER PRINCIPAL ---
let handler = async (m, { conn }) => {
    const groupId = m.chat;
    
    // ==================== DETECTAR RESPUESTA DE BOTONES ====================
    let response = null;
    
    // Forma 1: buttonsResponseMessage
    if (m.message?.buttonsResponseMessage) {
        response = m.message.buttonsResponseMessage.selectedButtonId;
        console.log('Botón detectado:', response);
    }
    
    // Forma 2: interactiveResponseMessage
    if (!response && m.message?.interactiveResponseMessage?.nativeFlowResponseMessage) {
        try {
            const params = JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson || '{}');
            response = params.id;
            console.log('Interactive detectado:', response);
        } catch {}
    }
    
    // Forma 3: listResponseMessage
    if (!response && m.message?.listResponseMessage?.singleSelectReply) {
        response = m.message.listResponseMessage.singleSelectReply.selectedRowId;
        console.log('Lista detectada:', response);
    }
    
    // ==================== COMANDO TERMINAR ====================
    if (response === 'terminar') {
        const parejas = parejasConfirmadas.get(groupId) || [];
        const pareja = parejas.find(p => p[0] === m.sender || p[1] === m.sender);
        
        if (pareja) {
            parejasConfirmadas.set(groupId, parejas.filter(p => p[0] !== m.sender && p[1] !== m.sender));
            await conn.reply(m.chat, `💔 *¡SE ACABÓ!*\n\nAdiós, espero no verte... aunque sé que volverás 😈\nGracias por los recuerdos (y los dramas).`, m, rcanal);
        } else {
            await conn.reply(m.chat, `❌ *¿Terminar qué?*\nNi novio/a tienes, mi ciela. 😂`, m, rcanal);
        }
        return;
    }
    
    // ==================== COMANDO PAREJAS ====================
    if (response === 'parejas') {
        const parejas = parejasConfirmadas.get(groupId) || [];
        if (parejas.length === 0) {
            await conn.reply(m.chat, `💔 *No hay parejas*\nEn este grupo solo hay solteros desesperados. 😂`, m, rcanal);
            return;
        }
        
        let lista = "💑 *Parejas del grupo:*\n";
        for (const [p1, p2] of parejas) {
            lista += `» ${await conn.getName(p1)} 💕 ${await conn.getName(p2)}\n`;
        }
        await conn.reply(m.chat, lista.trim(), m, rcanal);
        return;
    }
    
    // ==================== ACEPTAR / RECHAZAR ====================
    if (response === 'aceptar' || response === 'rechazar') {
        const tag = m.sender;
        const mensajeGuardado = mensajesGrupos.get(groupId);
        const proponente = mensajeGuardado?.proponente;
        const propuesto = mensajeGuardado?.propuesto;
        
        if (!proponente || tag !== propuesto) {
            await conn.reply(m.chat, `🚫 *Oops*\nEsta declaración no es para ti, sapito. 🐸`, m, rcanal);
            return;
        }
        
        if (proponente === tag) {
            await conn.reply(m.chat, response === 'aceptar' ? `🤡 *¿Auto-aceptarse?*\nNo seas triste, sal a conocer gente.` : `💢 *¿Auto-rechazo?*\nAl menos date una oportunidad.`, m, rcanal);
            return;
        }
        
        if (response === 'aceptar') {
            if (!parejasConfirmadas.has(groupId)) parejasConfirmadas.set(groupId, []);
            parejasConfirmadas.get(groupId).push([proponente, tag]);
            
            const nombre1 = await conn.getName(tag);
            const nombre2 = await conn.getName(proponente);
            
            await conn.reply(m.chat, `🎉 *¡NOVIOS!*\n\n» ${nombre2} y ${nombre1} ahora son pareja.\n» Si rompen, el grupo los funa. 🔫\n\n💌 Usa *terminar* cuando te aburras\n💑 Usa *parejas* para ver la lista`, m, rcanal);
        } else {
            await conn.reply(m.chat, `💔 *RECHAZADO/A*\n\n» ${await conn.getName(tag)} dijo NO.\n» A llorar al rincón, ${await conn.getName(proponente)}. 😢`, m, rcanal);
        }
        
        mensajesGrupos.delete(groupId);
        return;
    }
    
    // ==================== COMANDO .SERNOVIOS ====================
    const msgText = m.text?.toLowerCase() || '';
    
    if (msgText === '.sernovios' || msgText.startsWith('.sernovios ')) {
        // Usar la lógica de promote para obtener la mención
        let mentionedJid = await m.mentionedJid;
        let usuario = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null;
        
        if (!usuario) {
            return conn.reply(m.chat, `☑️ *DEBES MENCIONAR O RESPONDER A UN USUARIO*\n\n📌 *Ejemplo:*\n.sernovios @usuario\n\n📌 *O responde al mensaje de la persona*`, m, rcanal);
        }
        
        if (usuario === m.sender) {
            return conn.reply(m.chat, `☑️ No puedes ser tu propio novio/a. Menciona a otra persona.`, m, rcanal);
        }
        
        const parejas = parejasConfirmadas.get(groupId) || [];
        if (parejas.some(par => par.includes(m.sender) || par.includes(usuario))) {
            return conn.reply(m.chat, `⚡ *Infiel detectado*\nYa tienes pareja, ¿o te gusta el drama? 👀`, m, rcanal);
        }
        
        const nombreRemitente = await conn.getName(m.sender);
        const nombreMencionado = await conn.getName(usuario);
        
        mensajesGrupos.set(groupId, { proponente: m.sender, propuesto: usuario });
        
        const buttons = [
            { buttonId: 'aceptar', buttonText: { displayText: "✅ ACEPTAR" }, type: 1 },
            { buttonId: 'rechazar', buttonText: { displayText: "❌ RECHAZAR" }, type: 1 }
        ];
        
        await conn.sendMessage(m.chat, {
            text: `💘 *¡DECLARACIÓN!*\n\n» ${nombreRemitente} quiere ser tu novio/a.\n» Si aceptas, serás suyo/a... si no, igual. 😏`,
            buttons: buttons,
            mentions: [usuario]
        });
        return;
    }
};

handler.command = /^(sernovios)$/i;
handler.group = true;

export default handler;
