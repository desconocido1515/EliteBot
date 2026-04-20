import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

export async function before(m, { conn }) {
  if (global._cmdHandled) return;
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command || command === 'bot') return;

  // ✅ FUNCIÓN QUE REVISA TODAS LAS SUBCARPETAS
  const isValidCommand = (command) => {
    // Primero revisa plugins cargados en memoria (global.plugins)
    if (global.plugins) {
      for (let plugin of Object.values(global.plugins)) {
        if (!plugin) continue;
        const cmd = Array.isArray(plugin.command) ? plugin.command : [plugin.command];
        if (cmd && cmd.includes(command)) return true;
      }
    }
    
    // Si no lo encuentra, escanea las carpetas físicas
    const pluginsPath = './plugins';
    const searchInDir = (dir) => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          // Buscar en subcarpetas
          const found = searchInDir(fullPath);
          if (found) return true;
        } else if (file.endsWith('.js')) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');
            // Buscar handler.command o handler.command = ['comando']
            const match = content.match(/handler\.command\s*=\s*\[(.*?)\]/s);
            if (match) {
              const commands = match[1].match(/['"](.*?)['"]/g);
              if (commands) {
                for (const cmd of commands) {
                  const cleanCmd = cmd.replace(/['"]/g, '');
                  if (cleanCmd === command) return true;
                }
              }
            }
          } catch (e) {
            console.log('Error leyendo', fullPath, e.message);
          }
        }
      }
      return false;
    };
    
    try {
      return searchInDir(pluginsPath);
    } catch (e) {
      console.log('Error escaneando plugins:', e);
      return false;
    }
  };

  if (isValidCommand(command)) {
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
