export async function before(m, { conn }) {
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command) return;

  // 🔍 Obtener todos los comandos
  const getAllCommands = (plugins) => {
    let cmds = [];

    for (let plugin of Object.values(plugins)) {
      let cmd = plugin.command;
      if (!cmd) continue;

      if (Array.isArray(cmd)) {
        cmds.push(...cmd.filter(c => typeof c === 'string'));
      } else if (typeof cmd === 'string') {
        cmds.push(cmd);
      }
      // ignoramos regex porque no sirven para sugerencias
    }

    return cmds;
  };

  const commandsList = getAllCommands(global.plugins);

  // ✅ Si el comando existe → salir
  if (commandsList.includes(command)) return;

  // 🧠 Distancia de Levenshtein (magia)
  const levenshtein = (a, b) => {
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
  };

  // 🔍 Buscar el comando más parecido
  let sugerido = null;
  let minDist = 3; // tolerancia

  for (let cmd of commandsList) {
    let dist = levenshtein(command, cmd);
    if (dist < minDist) {
      minDist = dist;
      sugerido = cmd;
    }
  }

  // 🧠 RESPUESTA INTELIGENTE
  let texto;

  if (sugerido) {
    texto = `✦ Comando inválido: *${command}*\n\n¿Quisiste decir *${usedPrefix}${sugerido}*? 🤔`;
  } else {
    texto = `✦ No reconozco ese comando.\nUsa *${usedPrefix}menu* para ver opciones.`;
  }

  await conn.reply(m.chat, texto, m);
}
