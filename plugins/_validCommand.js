export async function before(m, { conn }) {
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command || command === 'bot') return;

  const isValidCommand = (command, plugins) => {
    for (let plugin of Object.values(plugins)) {
      let cmd = Array.isArray(plugin.command) ? plugin.command : [plugin.command];

      if (cmd.some(c =>
        typeof c === 'string'
          ? c === command
          : c instanceof RegExp
          ? c.test(command)
          : false
      )) return true;
    }
    return false;
  };

  if (isValidCommand(command, global.plugins)) {
    let user = global.db.data.users[m.sender];
    user.commands = (user.commands || 0) + 1;
    return;
  }

  const mensajes = [
    '✦ Comando inválido. Usa `.menu`',
    '✦ No reconozco ese comando. Prueba `.menu`',
    '✦ Ese comando no existe. Usa `.menu`'
  ];

  let texto = mensajes[Math.floor(Math.random() * mensajes.length)];

  await conn.reply(m.chat, texto, m);
}
