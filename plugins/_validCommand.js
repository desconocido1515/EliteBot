import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export async function before(m, { conn }) {
  if (global._cmdHandled) return;
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const fullCommand = m.text.slice(usedPrefix.length).trim();
  const command = fullCommand.split(' ')[0].toLowerCase();

  if (!command || command === 'bot') return;

  // ========== DETECCIÓN MEJORADA ==========
  let isValid = false;
  let foundPath = null;

  // Función para recolectar TODOS los comandos de TODOS los plugins (incluyendo subcarpetas)
  function getAllCommands(pluginsObj, currentPath = '') {
    let commands = new Map(); // comando -> ruta
    
    if (!pluginsObj || typeof pluginsObj !== 'object') return commands;
    
    for (let [key, value] of Object.entries(pluginsObj)) {
      // Si tiene propiedad 'command', es un plugin
      if (value && typeof value === 'object' && value.command) {
        let pluginCommands = [];
        
        if (Array.isArray(value.command)) {
          pluginCommands = value.command;
        } else if (typeof value.command === 'string') {
          pluginCommands = [value.command];
        }
        
        // Añadir alias también
        if (value.alias) {
          if (Array.isArray(value.alias)) pluginCommands.push(...value.alias);
          else if (typeof value.alias === 'string') pluginCommands.push(value.alias);
        }
        
        // Guardar cada comando con su ruta
        for (let cmd of pluginCommands) {
          if (typeof cmd === 'string') {
            commands.set(cmd.toLowerCase(), `${currentPath}/${key}`);
          }
        }
      }
      
      // Si es objeto y no tiene command, puede ser subcarpeta (escaneo recursivo)
      if (value && typeof value === 'object' && !value.command && Object.keys(value).length > 0) {
        const subCommands = getAllCommands(value, `${currentPath}/${key}`);
        for (let [cmd, path] of subCommands) {
          commands.set(cmd, path);
        }
      }
    }
    
    return commands;
  }

  // Recolectar todos los comandos disponibles
  let allCommands = new Map();
  if (global.plugins && typeof global.plugins === 'object') {
    allCommands = getAllCommands(global.plugins);
  }

  // Verificar si el comando existe
  if (allCommands.has(command)) {
    isValid = true;
    foundPath = allCommands.get(command);
  }

  // ========== LOG EN CONSOLA ==========
  console.log('\x1b[36m════════════════════════════════════════════\x1b[0m');
  console.log('\x1b[33m[ELITEBOT - DETECCIÓN]\x1b[0m');
  console.log(`\x1b[35m📨 Usuario:\x1b[0m ${m.sender.split('@')[0]}`);
  console.log(`\x1b[35m💬 Comando:\x1b[0m .${command}`);
  console.log(`\x1b[35m📊 Plugins totales:\x1b[0m ${Object.keys(global.plugins || {}).length}`);
  console.log(`\x1b[35m📋 Comandos registrados:\x1b[0m ${allCommands.size}`);
  
  if (isValid) {
    console.log(`\x1b[32m✓ COMANDO VÁLIDO\x1b[0m`);
    console.log(`\x1b[32m📂 Ruta:${foundPath}\x1b[0m`);
  } else {
    console.log(`\x1b[31m✗ COMANDO INVÁLIDO\x1b[0m`);
    // Mostrar primeros 10 comandos como ejemplo
    const sampleCommands = Array.from(allCommands.keys()).slice(0, 10);
    console.log(`\x1b[33m📌 Ejemplos de comandos válidos: ${sampleCommands.join(', ')}\x1b[0m`);
  }
  console.log('\x1b[36m════════════════════════════════════════════\x1b[0m');

  // ========== PROCESAR ==========
  if (isValid) {
    // Contar comando
    if (global.db && global.db.data && global.db.data.users) {
      let user = global.db.data.users[m.sender];
      if (user) {
        user.commands = (user.commands || 0) + 1;
      }
    }
    
    global._cmdHandled = true;
    setTimeout(() => {
      global._cmdHandled = false;
    }, 500);
    
    return true; // Dejar que ejecute el comando
  }

  // ========== COMANDO INVÁLIDO ==========
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
  
  await conn.reply(m.chat, texto, m, { quoted: m });

  setTimeout(() => {
    global._cmdHandled = false;
  }, 1000);
  
  return false;
}
