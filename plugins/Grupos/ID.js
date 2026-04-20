import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

export async function before(m, { conn }) {
  if (global._cmdHandled) return;
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command || command === 'bot') return;

  // ✅ FUNCIÓN QUE ESCANEA TODAS LAS SUBCARPETAS
  const commandExists = (cmd) => {
    // Primero revisar plugins ya cargados en memoria
    if (global.plugins) {
      for (const plugin of Object.values(global.plugins)) {
        if (!plugin) continue;
        const pluginCommands = Array.isArray(plugin.command) ? plugin.command : [plugin.command];
        if (pluginCommands && pluginCommands.includes(cmd)) return true;
      }
    }
    
    // Si no está en memoria, escanear archivos físicos (solo una vez)
    if (!global._scannedCommands) {
      global._scannedCommands = new Set();
      const scanDir = (dir) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const fullPath = path.join(dir, file);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            scanDir(fullPath); // ← CLAVE: entra a subcarpetas
          } else if (file.endsWith('.js')) {
            try {
              const content = fs.readFileSync(fullPath, 'utf8');
              // Buscar handler.command = ['comando1', 'comando2']
              const match = content.match(/handler\.command\s*=\s*\[(.*?)\]/s);
              if (match) {
                const commands = match[1].match(/['"](.*?)['"]/g);
                if (commands) {
                  for (const c of commands) {
                    global._scannedCommands.add(c.replace(/['"]/g, ''));
                  }
                }
              }
              // Buscar handler.command = 'comando'
              const singleMatch = content.match(/handler\.command\s*=\s*['"](.*?)['"]/);
              if (singleMatch) {
                global._scannedCommands.add(singleMatch[1]);
              }
            } catch (e) {
              // Ignorar errores de lectura
            }
          }
        }
      };
      
      try {
        scanDir('./plugins');
      } catch (e) {
        console.log('Error escaneando plugins:', e);
      }
    }
    
    return global._scannedCommands && global._scannedCommands.has(cmd);
  };

  if (commandExists(command)) {
    let user = global.db.data.users[m.sender];
    if (user) {
      user.commands = (user.commands || 0) + 1;
    }
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

  await conn.reply(m.chat, texto, m, rcanal);

  setTimeout(() => {
    global._cmdHandled = false;
  }, 1000);
}
