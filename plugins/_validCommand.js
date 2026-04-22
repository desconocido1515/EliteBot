import fetch from 'node-fetch';

export async function before(m, { conn }) {
  if (global._cmdHandled) return;
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command || command === 'bot') return;
  
  // ========== LISTA DE COMANDOS A IGNORAR ==========
  // Agrega aquí todos los comandos que NO deben mostrar el mensaje de error
  const ignoreCommands = [
    // Comandos básicos
    'menu', 'bass', 'blown', 'deep', 'earrape', 'fast', 'fat', 'tienda', 'comprar', 
    'nightcore', 'reverse', 'robot', 'slow', 'smooth', 'desblock','ayuda', 'tupai', 'squirrel', 'kick', 'basura', ' echar', 'echar', 'ban', 'rip', 'basura', 
    'setname', 'newnombre','nuevonombre','clima' , 
'setpp', 'group', 'grup', 'gc','todos', 'programar', 
'hidetag', 'notify', 'notificar', 'noti', 'n', 'avisos', 'aviso', 


'1vs1', '4vs4', '6vs6', '8vs8', '12vs12', '16vs16', '20vs20',
'pvpm1014', 'pvpsmg', 'scrimduo',
'agenda', 'agendasemanal',
'alpes', 'bermuda', 'kalahari', 'nexterra', 'purgatorio',
'blackpink', 'brackpink', 'kpop',
'cat', 'neko', 'foxgirl',
'clk', 'clktpg', 'rbclk',
'combobr', 'combode',
'cr7', 'messi',
'dragonbz', 'goku', 'vegueta',
'inactivoff', 'infipg', 'infitpg',
'interna4vs4', 'interna6vs6',
'listacuadrilatero', 'listapgnuestra', 'listavs',
'mapacuadrilatero', 'mapahexagonal',
'navidad',
'podiocuadri',
'png',
'reglasckl', 'reglasclk', 'reglaslow', 'reglasvk', 'reglasword', 'reglaswz',
'scrim',
'tomp3',
'trivia',
'vegueta',
'vestimencuadri', 


    
    
    'chipmunk'];
  // ==================================================
  
  if (ignoreCommands.includes(command)) return;

  const isValidCommand = (command, plugins) => {
    for (let plugin of Object.values(plugins)) {
      const cmd = Array.isArray(plugin.command) ? plugin.command : [plugin.command];
      if (cmd.includes(command)) return true;
    }
    return false;
  };

  if (isValidCommand(command, global.plugins)) {
    let user = global.db.data.users[m.sender];
    user.commands = (user.commands || 0) + 1;
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
