import fetch from 'node-fetch';

export async function before(m, { conn }) {
  if (global._cmdHandled) return;
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command || command === 'bot') return;

  // ✅ FUNCIÓN MEJORADA: ahora también detecta expresiones regulares
  const isValidCommand = (command, plugins) => {
    for (let plugin of Object.values(plugins)) {
      if (!plugin) continue;
      
      // Si es array
      if (Array.isArray(plugin.command) && plugin.command.includes(command)) return true;
      
      // Si es string
      if (typeof plugin.command === 'string' && plugin.command === command) return true;
      
      // ✅ NUEVO: Si es expresión regular (como /^(id|idgrupo|cekid)$/i)
      if (plugin.command instanceof RegExp && plugin.command.test(command)) return true;
      
      // También revisar handler.help
      if (Array.isArray(plugin.help) && plugin.help.includes(command)) return true;
      if (typeof plugin.help === 'string' && plugin.help === command) return true;
      if (plugin.help instanceof RegExp && plugin.help.test(command)) return true;
    }
    return false;
  };

  if (isValidCommand(command, global.plugins)) {
    let user = global.db.data.users[m.sender];
    if (user) user.commands = (user.commands || 0) + 1;
    return;
  }

  global._cmdHandled = true;

  const mensajes = [
`✦ ¡Hey!
Deja de inventar comandos raros.
No dispongo de ese comando.
Usa \`.menu\` para ver opciones.`,

`✦ ¡Hey!
Pero… ¿qué estás escribiendo?
Creo que buscas \`.menu\`
Ahí está todo.`,

`✦ ¡Hey!
Ni yo conozco ese comando.
Mejor usa \`.menu\`
y revisa mi catálogo.`,

`✦ ¡Hey!
Ese comando no existe.
Pero puedes usar \`.menu\`
para ver todos los disponibles.`,

`✦ ¡Hey!
Comando inválido.
No está en mi sistema.
Prueba con \`.menu\`.`,

`✦ ¡Hey!
Ese comando no está disponible.
Revisa \`.menu\`
para encontrar lo que buscas.`
  ];

  let texto = mensajes[Math.floor(Math.random() * mensajes.length)];

  await conn.reply(
    m.chat,
    texto,
    m,
    rcanal
  );

  setTimeout(() => {
    global._cmdHandled = false;
  }, 1000);
}
