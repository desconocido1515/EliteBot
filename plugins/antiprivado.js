// plugins/antiprivado.js

import fs from "fs";
import path from "path";

const DB_DIR = path.join(process.cwd(), "database");
const FILE = path.join(DB_DIR, "antiprivado.json");

if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
}

function safeParse(raw, fallback) {
    try {
        const parsed = JSON.parse(raw);
        return typeof parsed === "string" ? JSON.parse(parsed) : parsed;
    } catch {
        return fallback;
    }
}

function loadState() {
    try {
        if (!fs.existsSync(FILE)) return { enabled: true };
        const parsed = safeParse(fs.readFileSync(FILE, "utf-8"), {});
        return {
            enabled: Boolean(parsed?.enabled),
        };
    } catch {
        return { enabled: true };
    }
}

function saveState(state) {
    fs.writeFileSync(
        FILE,
        JSON.stringify({
            enabled: Boolean(state?.enabled),
            updatedAt: Date.now(),
        }, null, 2)
    );
}

function normalizeAction(raw = "") {
    const value = String(raw || "").trim().toLowerCase();
    if (["on", "encender", "activar", "enable", "1", "si"].includes(value)) return "on";
    if (["off", "apagar", "desactivar", "disable", "0", "no"].includes(value)) return "off";
    if (["estado", "status", "info"].includes(value)) return "status";
    return "";
}

const state = loadState();

let handler = async (m, { conn, args, command, usedPrefix }) => {
    const action = normalizeAction(args[0]);
    const isOwner = global.owner.some(v => v === m.sender.split('@')[0])
    
    if (!isOwner) {
        return conn.reply(m.chat, `☑️ *SOLO EL OWNER*\n\nEste comando solo puede ser usado por el creador del bot.`, m, rcanal)
    }
    
    if (!action) {
        return conn.reply(m.chat, 
            `☑️ *ANTIPRIVADO* ☑️\n\n` +
            `📌 *Estado actual:* ${state.enabled ? '✅ ACTIVADO' : '❌ DESACTIVADO'}\n\n` +
            `📝 *Uso:*\n` +
            `▸ ${usedPrefix}${command} on - Activar\n` +
            `▸ ${usedPrefix}${command} off - Desactivar\n` +
            `▸ ${usedPrefix}${command} estado - Ver estado\n\n` +
            `⚠️ *Con esta función, el bot no responderá comandos en privado.*`, m, rcanal)
    }
    
    if (action === "status") {
        return conn.reply(m.chat, 
            `☑️ *ANTIPRIVADO* ☑️\n\n📌 *Estado actual:* ${state.enabled ? '✅ ACTIVADO' : '❌ DESACTIVADO'}\n\n${state.enabled ? '⚠️ El bot NO responde en privado.' : '✅ El bot responde normalmente en privado.'}`, m, rcanal)
    }
    
    if (action === "on") {
        if (state.enabled) {
            return conn.reply(m.chat, `☑️ *ANTIPRIVADO* ☑️\n\n⚠️ Ya estaba activado.`, m, rcanal)
        }
        state.enabled = true;
        saveState(state);
        return conn.reply(m.chat, `✅ *ANTIPRIVADO ACTIVADO* ✅\n\n☑️ Ahora el bot NO responderá comandos en privado.\n📌 Solo el owner podrá usarlo en privado.`, m, rcanal)
    }
    
    if (action === "off") {
        if (!state.enabled) {
            return conn.reply(m.chat, `☑️ *ANTIPRIVADO* ☑️\n\n⚠️ Ya estaba desactivado.`, m, rcanal)
        }
        state.enabled = false;
        saveState(state);
        return conn.reply(m.chat, `❌ *ANTIPRIVADO DESACTIVADO* ❌\n\n☑️ Ahora el bot responderá comandos en privado normalmente.`, m, rcanal)
    }
}

// ==================== BLOQUEO DE COMANDOS EN PRIVADO ====================
let beforeHandler = async function (m, { conn }) {
    // Solo aplicar en privado
    if (m.isGroup) return false
    
    // Verificar si antiprivado está activado
    if (!state.enabled) return false
    
    // El owner puede usar en privado
    const isOwner = global.owner.some(v => v === m.sender.split('@')[0])
    if (isOwner) return false
    
    // El propio bot no se bloquea
    if (m.sender === conn.user.jid) return false
    
    // Si el mensaje empieza con . (posible comando)
    const text = m.text || ''
    if (text.startsWith('.')) {
        await conn.reply(m.chat, `☑️ *NO RESPONDO AL PRIVADO* ☑️\n\n📌 *Este bot solo funciona en grupos.*\n\n⚠️ *Agrega el bot a un grupo para usar mis comandos.*\n\n💡 *Si eres admin, contacta al owner para más información.*`, m, rcanal)
        return true // Bloquear el comando
    }
    
    return false
}

handler.help = ['antiprivado', 'privateoff', 'privadoff']
handler.tags = ['owner']
handler.command = ['antiprivado', 'privateoff', 'privadoff']
handler.rowner = true

export { beforeHandler as before }
export default handler
