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
    if (!fs.existsSync(FILE)) return { enabled: false };
    const parsed = safeParse(fs.readFileSync(FILE, "utf-8"), {});
    return {
      enabled: Boolean(parsed?.enabled),
    };
  } catch {
    return { enabled: false };
  }
}

function saveState(state) {
  fs.writeFileSync(
    FILE,
    JSON.stringify(
      {
        enabled: Boolean(state?.enabled),
        updatedAt: Date.now(),
      },
      null,
      2
    )
  );
}

function normalizeAction(raw = "") {
  const value = String(raw || "").trim().toLowerCase();

  if (["on", "encender", "activar", "enable", "1", "si"].includes(value)) return "on";
  if (["off", "apagar", "desactivar", "disable", "0", "no"].includes(value)) return "off";
  if (["estado", "status", "info"].includes(value)) return "status";
  return "";
}

function getPrefixes(settings) {
  if (Array.isArray(settings?.prefix)) {
    return settings.prefix
      .map((item) => String(item || "").trim())
      .filter(Boolean)
      .sort((a, b) => b.length - a.length);
  }

  const single = String(settings?.prefix || ".").trim();
  return single ? [single] : ["."];
}

function getPrimaryPrefix(settings) {
  return getPrefixes(settings)[0] || ".";
}

const state = loadState();

let handler = async (m, { sock, args = [], settings }) => {

  const from = m.chat;
  const quoted = m?.key ? { quoted: m } : undefined;
  const prefix = getPrimaryPrefix(settings);
  const action = normalizeAction(args[0]);

  if (!action) {
    return sock.sendMessage(
      from,
      {
        text:
          `🔐 *ANTIPRIVADO*\n\n` +
          `Estado: *${state.enabled ? "ON ✅" : "OFF ❌"}*\n\n` +
          `Uso:\n` +
          `• ${prefix}antiprivado on\n` +
          `• ${prefix}antiprivado off\n` +
          `• ${prefix}antiprivado estado`,
      },
      quoted
    );
  }

  if (action === "status") {
    return sock.sendMessage(
      from,
      {
        text:
          `🔐 *ANTIPRIVADO*\n\n` +
          `Estado actual: *${state.enabled ? "ON ✅" : "OFF ❌"}*`,
      },
      quoted
    );
  }

  if (action === "on") {
    if (state.enabled) {
      return sock.sendMessage(from, { text: "ℹ️ Antiprivado ya estaba activo." }, quoted);
    }

    state.enabled = true;
    saveState(state);

    return sock.sendMessage(
      from,
      {
        text: `✅ *ANTIPRIVADO ACTIVADO*\n\nAhora el bot NO responderá en privado.`,
      },
      quoted
    );
  }

  if (action === "off") {
    if (!state.enabled) {
      return sock.sendMessage(from, { text: "ℹ️ Antiprivado ya estaba desactivado." }, quoted);
    }

    state.enabled = false;
    saveState(state);

    return sock.sendMessage(
      from,
      {
        text: `✅ *ANTIPRIVADO DESACTIVADO*\n\nEl bot vuelve a responder privados.`,
      },
      quoted
    );
  }
};

// 🔒 COMANDO
handler.command = ["antiprivado", "privateoff", "privadoff"];
handler.owner = true;

// 🔥 FILTRO REAL (ESTO ES LO IMPORTANTE)
handler.before = async function (m, { isOwner }) {
  if (!state.enabled) return;
  if (m.isGroup) return;
  if (isOwner) return;
  if (m.fromMe) return;

  return true; // ⛔ bloquea TODOS los comandos en privado
};

export default handler;
