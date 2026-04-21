export async function before(m, { conn }) {
  if (global._cmdHandled) return;
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command || command === 'bot') return;

  const allCommands = [];

  for (let plugin of Object.values(global.plugins)) {
    let cmds = Array.isArray(plugin.command)
      ? plugin.command
      : [plugin.command];

    for (let cmd of cmds) {
      if (cmd) allCommands.push(cmd);
    }
  }

  // ✅ comando válido
  if (allCommands.includes(command)) {
    let user = global.db.data.users[m.sender];
    user.commands = (user.commands || 0) + 1;
    return;
  }

  // 🔥 función de distancia
  function levenshtein(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b[i - 1] === a[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  // 🔍 buscar el más cercano
  let closest = null;
  let minDist = Infinity;

  for (let cmd of allCommands) {
    let dist = levenshtein(command, cmd);

    if (dist < minDist) {
      minDist = dist;
      closest = cmd;
    }
  }

  let texto = `✦ Comando inválido: ${command}\n`;

  // 🔥 SOLO sugiere si realmente es parecido
  if (minDist <= 2) {
    texto += `\n¿Quisiste decir .${closest}? 🤔`;
  } else {
    texto += `\nUsa .menu para ver los comandos disponibles.`;
  }

  await conn.reply(m.chat, texto, m, rcanal);

  global._cmdHandled = true;
  setTimeout(() => {
    global._cmdHandled = false;
  }, 800);
}
