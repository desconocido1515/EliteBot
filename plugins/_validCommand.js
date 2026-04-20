import fetch from 'node-fetch';

export async function before(m, { conn }) {
  // Si ya se procesó un comando en este ciclo, salir
  if (global._cmdHandled) return;
  
  // Verificar si hay texto y prefijo
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const fullCommand = m.text.slice(usedPrefix.length).trim();
  const command = fullCommand.split(' ')[0].toLowerCase();
  const args = fullCommand.slice(command.length).trim();

  // Ignorar comando 'bot'
  if (!command || command === 'bot') return;

  // ========== SISTEMA DE DETECCIÓN MEJORADO ==========
  let isValid = false;
  let foundPlugin = null;
  let foundCommand = null;

  // Método 1: Recorrer todos los plugins registrados
  if (global.plugins && typeof global.plugins === 'object') {
    for (let [pluginName, plugin] of Object.entries(global.plugins)) {
      if (!plugin) continue;
      
      // Obtener comandos del plugin (puede ser string, array, o función)
      let pluginCommands = [];
      
      if (Array.isArray(plugin.command)) {
        pluginCommands = plugin.command;
      } else if (typeof plugin.command === 'string') {
        pluginCommands = [plugin.command];
      } else if (typeof plugin.command === 'function') {
        // Algunos plugins tienen command como función que retorna el comando
        try {
          const result = plugin.command();
          if (typeof result === 'string') pluginCommands = [result];
          else if (Array.isArray(result)) pluginCommands = result;
        } catch(e) {}
      }
      
      // Verificar alias también
      let aliases = [];
      if (plugin.alias && Array.isArray(plugin.alias)) {
        aliases = plugin.alias;
      } else if (plugin.alias && typeof plugin.alias === 'string') {
        aliases = [plugin.alias];
      }
      
      const allCommands = [...pluginCommands, ...aliases];
      
      if (allCommands.includes(command)) {
        isValid = true;
        foundPlugin = pluginName;
        foundCommand = command;
        break;
      }
    }
  }

  // Método 2: Verificar en global.commands (si existe)
  if (!isValid && global.commands && global.commands instanceof Map) {
    if (global.commands.has(command)) {
      isValid = true;
      foundCommand = command;
      foundPlugin = 'global.commands';
    }
  }

  // Método 3: Verificar en handler.js o comandos cargados dinámicamente
  if (!isValid && global.handler && global.handler.commands) {
    if (global.handler.commands.includes && global.handler.commands.includes(command)) {
      isValid = true;
      foundCommand = command;
      foundPlugin = 'handler.commands';
    }
  }

  // ========== LOG EN CONSOLA (DURO) ==========
  console.log('\x1b[36m════════════════════════════════════════════\x1b[0m');
  console.log('\x1b[33m[ELITEBOT - DETECCIÓN DE COMANDO]\x1b[0m');
  console.log(`\x1b[35m📨 Usuario:\x1b[0m ${m.sender.split('@')[0]}`);
  console.log(`\x1b[35m💬 Comando ingresado:\x1b[0m ${usedPrefix}${command}`);
  console.log(`\x1b[35m📝 Args:\x1b[0m ${args || '(sin argumentos)'}`);
  console.log(`\x1b[35m🔍 ¿Comando válido?:\x1b[0m ${isValid ? '\x1b[32m✓ SÍ\x1b[0m' : '\x1b[31m✗ NO\x1b[0m'}`);
  
  if (isValid) {
    console.log(`\x1b[32m📦 Plugin encontrado:\x1b[0m ${foundPlugin}`);
    console.log(`\x1b[32m⚡ Comando detectado:\x1b[0m ${foundCommand}`);
  } else {
    console.log(`\x1b[31m⚠️  No se encontró el comando en ningún plugin registrado\x1b[0m`);
    console.log(`\x1b[31m📋 Total plugins cargados:\x1b[0m ${global.plugins ? Object.keys(global.plugins).length : 0}`);
  }
  console.log('\x1b[36m════════════════════════════════════════════\x1b[0m');

  // ========== PROCESAR COMANDO VÁLIDO ==========
  if (isValid) {
    // Contar comando usado
    let user = global.db.data.users[m.sender];
    if (user) {
      user.commands = (user.commands || 0) + 1;
      console.log(`\x1b[32m📊 Comandos totales de usuario: ${user.commands}\x1b[0m`);
    }
    
    // IMPORTANTE: No bloquear la ejecución del comando
    // Devolvemos true para que el sistema sepa que hay un comando válido
    global._cmdHandled = true;
    setTimeout(() => {
      global._cmdHandled = false;
    }, 500);
    
    return true; // Permite que el handler principal ejecute el comando
  }

  // ========== COMANDO INVÁLIDO - ENVIAR MENSAJE ==========
  global._cmdHandled = true;

  const mensajes = [
`✦ ¡Hey! Deja de inventar comandos raros.
No dispongo de ese comando.
Usa \`.menu\` para ver opciones.`,

`✦ ¡Hey! Pero… ¿qué estás escribiendo?
Creo que buscas \`.menu\`
Ahí está todo.`,

`✦ ¡Hey! Ni yo conozco ese comando.
Mejor usa \`.menu\`
y revisa mi catálogo.`,

`✦ ¡Hey! Ese comando no existe.
Pero puedes usar \`.menu\`
para ver todos los disponibles.`,

`✦ ¡Hey! Comando inválido.
No está en mi sistema.
Prueba con \`.menu\`.`,

`✦ ¡Hey! Ese comando no está disponible.
Revisa \`.menu\`
para encontrar lo que buscas.`
  ];

  let texto = mensajes[Math.floor(Math.random() * mensajes.length)];
  
  // Añadir información de depuración (solo para admins/owner)
  if (global.owner && global.owner.includes(m.sender.split('@')[0])) {
    texto += `\n\n\`\`\`[DEBUG] Comando "${command}" no encontrado en plugins\`\`\``;
  }

  await conn.reply(m.chat, texto, m, { quoted: m });

  setTimeout(() => {
    global._cmdHandled = false;
  }, 1000);
  
  return false; // Comando inválido, no continuar
}
