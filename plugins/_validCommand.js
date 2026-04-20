import fetch from 'node-fetch';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export async function before(m, { conn }) {
  if (global._cmdHandled) return;
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const fullCommand = m.text.slice(usedPrefix.length).trim();
  const command = fullCommand.split(' ')[0].toLowerCase();

  if (!command || command === 'bot') return;

  // ========== SISTEMA DE DETECCIÓN RECURSIVA ==========
  let isValid = false;
  let foundPath = null;
  let foundCommand = null;

  // Función recursiva para escanear TODAS las subcarpetas
  function scanPluginsRecursive(pluginsObj, currentPath = 'root') {
    if (!pluginsObj || typeof pluginsObj !== 'object') return false;
    
    for (let [key, value] of Object.entries(pluginsObj)) {
      // Si es un plugin válido (tiene command)
      if (value && typeof value === 'object') {
        // Verificar si tiene propiedad 'command'
        if (value.command) {
          let pluginCommands = [];
          
          // Normalizar comandos (string o array)
          if (Array.isArray(value.command)) {
            pluginCommands = value.command;
          } else if (typeof value.command === 'string') {
            pluginCommands = [value.command];
          }
          
          // Verificar alias
          let aliases = [];
          if (value.alias) {
            if (Array.isArray(value.alias)) aliases = value.alias;
            else if (typeof value.alias === 'string') aliases = [value.alias];
          }
          
          const allCommands = [...pluginCommands, ...aliases];
          
          if (allCommands.includes(command)) {
            return { found: true, path: `${currentPath}/${key}`, cmd: command };
          }
        }
        
        // Si tiene subplugins (subcarpetas), escanear recursivamente
        if (value && typeof value === 'object' && !value.command) {
          const subResult = scanPluginsRecursive(value, `${currentPath}/${key}`);
          if (subResult.found) return subResult;
        }
      }
    }
    return { found: false };
  }

  // Método 1: Escanear global.plugins recursivamente
  if (global.plugins && typeof global.plugins === 'object') {
    const result = scanPluginsRecursive(global.plugins);
    if (result.found) {
      isValid = true;
      foundPath = result.path;
      foundCommand = result.cmd;
    }
  }

  // Método 2: Escanear sistema de archivos directamente (respaldo)
  if (!isValid && global.__dirname) {
    const pluginsPath = join(global.__dirname, 'plugins');
    try {
      function scanFilesystem(dir, relativePath = '') {
        const files = readdirSync(dir);
        
        for (const file of files) {
          const fullPath = join(dir, file);
          const stat = statSync(fullPath);
          
          if (stat.isDirectory()) {
            // Escanear subcarpeta
            const subResult = scanFilesystem(fullPath, `${relativePath}/${file}`);
            if (subResult) return subResult;
          } else if (file.endsWith('.js')) {
            // Intentar importar el plugin temporalmente para leer su command
            try {
              // Limpiar cache para evitar conflictos
              const modulePath = fullPath;
              delete require.cache[require.resolve(modulePath)];
              const plugin = await import(`file://${modulePath}`);
              
              if (plugin.default && plugin.default.command) {
                let cmds = [];
                if (Array.isArray(plugin.default.command)) cmds = plugin.default.command;
                else if (typeof plugin.default.command === 'string') cmds = [plugin.default.command];
                
                if (cmds.includes(command)) {
                  return { found: true, path: `${relativePath}/${file}`, cmd: command };
                }
              }
            } catch(e) {}
          }
        }
        return null;
      }
      
      const fsResult = scanFilesystem(pluginsPath);
      if (fsResult) {
        isValid = true;
        foundPath = fsResult.path;
        foundCommand = fsResult.cmd;
      }
    } catch(e) {
      console.log('Error escaneando filesystem:', e.message);
    }
  }

  // ========== LOG EXTREMO EN CONSOLA ==========
  console.log('\x1b[36m═══════════════════════════════════════════════════\x1b[0m');
  console.log('\x1b[33m[ELITEBOT - DETECCIÓN RECURSIVA]\x1b[0m');
  console.log(`\x1b[35m📨 Usuario:\x1b[0m ${m.sender.split('@')[0]}`);
  console.log(`\x1b[35m💬 Comando:\x1b[0m .${command}`);
  console.log(`\x1b[35m📊 Plugins totales:\x1b[0m ${Object.keys(global.plugins || {}).length}`);
  console.log(`\x1b[35m🔍 ¿Válido?:\x1b[0m ${isValid ? '\x1b[32m✓ SÍ\x1b[0m' : '\x1b[31m✗ NO\x1b[0m'}`);
  
  if (isValid) {
    console.log(`\x1b[32m📂 Ruta encontrada:\x1b[0m ${foundPath}`);
    console.log(`\x1b[32m⚡ Comando:\x1b[0m ${foundCommand}`);
  } else {
    console.log(`\x1b[31m⚠️  No encontrado en ninguna subcarpeta\x1b[0m`);
    
    // Mostrar estructura de carpetas para depuración
    if (global.__dirname) {
      const pluginsPath = join(global.__dirname, 'plugins');
      console.log('\x1b[33m📁 Estructura de plugins:\x1b[0m');
      function listDirs(path, indent = '') {
        try {
          const items = readdirSync(path);
          items.forEach(item => {
            const fullPath = join(path, item);
            if (statSync(fullPath).isDirectory()) {
              console.log(`${indent}📂 ${item}/`);
              listDirs(fullPath, indent + '  ');
            }
          });
        } catch(e) {}
      }
      listDirs(pluginsPath);
    }
  }
  console.log('\x1b[36m═══════════════════════════════════════════════════\x1b[0m');

  // ========== PROCESAR COMANDO ==========
  if (isValid) {
    let user = global.db.data.users[m.sender];
    if (user) {
      user.commands = (user.commands || 0) + 1;
    }
    
    global._cmdHandled = true;
    setTimeout(() => {
      global._cmdHandled = false;
    }, 500);
    
    return true; // Dejar que el handler ejecute el comando
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
