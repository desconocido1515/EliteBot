import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

export async function before(m, { conn }) {
  if (global._cmdHandled) return;
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command || command === 'bot') return;

  // ✅ VALIDADOR MEJORADO (detecta regex)
  const commandExists = (cmd) => {
    // Revisar plugins en memoria
    if (global.plugins) {
      for (const plugin of Object.values(global.plugins)) {
        if (!plugin) continue;
        
        if (Array.isArray(plugin.command) && plugin.command.includes(cmd)) return true;
        if (typeof plugin.command === 'string' && plugin.command === cmd) return true;
        if (plugin.command instanceof RegExp && plugin.command.test(cmd)) return true;
        
        if (Array.isArray(plugin.help) && plugin.help.includes(cmd)) return true;
        if (typeof plugin.help === 'string' && plugin.help === cmd) return true;
        if (plugin.help instanceof RegExp && plugin.help.test(cmd)) return true;
      }
    }
    
    // Escanear archivos solo una vez
    if (!global._scannedCommands) {
      global._scannedCommands = new Set();
      global._scannedRegex = [];
      const scanDir = (dir) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const fullPath = path.join(dir, file);
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            scanDir(fullPath);
          } else if (file.endsWith('.js')) {
            try {
              const content = fs.readFileSync(fullPath, 'utf8');
              const regexMatch = content.match(/handler\.command\s*=\s*\/(.*?)\/[gimuy]*/);
              if (regexMatch) global._scannedRegex.push(new RegExp(regexMatch[1], 'i'));
              
              const arrayMatch = content.match(/handler\.command\s*=\s*\[(.*?)\]/s);
              if (arrayMatch) {
                const commands = arrayMatch[1].match(/['"](.*?)['"]/g);
                if (commands) {
                  for (const c of commands) global._scannedCommands.add(c.replace(/['"]/g, ''));
                }
              }
            } catch (e) {}
          }
        }
      };
      try { scanDir('./plugins'); } catch (e) {}
    }
    
    if (global._scannedCommands && global._scannedCommands.has(cmd)) return true;
    if (global._scannedRegex) {
      for (const regex of global._scannedRegex) {
        if (regex.test(cmd)) return true;
      }
    }
    return false;
  };

  if (commandExists(command)) {
    let user = global.db.data.users[m.sender];
    if (user) user.commands = (user.commands || 0) + 1;
    return;
  }

  global._cmdHandled = true;

  const mensajes = [
    `✦ ¡Hey!\nDeja de inventar comandos raros.\nNo dispongo de ese comando.\nUsa \`.menu\` para ver opciones.`,
    `✦ ¡Hey!\nPero… ¿qué estás escribiendo?\nCreo que buscas \`.menu\`\nAhí está todo.`,
    `✦ ¡Hey!\nNi yo conozco ese comando.\nMejor usa \`.menu\`\ny revisa mi catálogo.`,
    `✦ ¡Hey!\nEse comando no existe.\nPero puedes usar \`.menu\`\npara ver todos los disponibles.`,
    `✦ ¡Hey!\nComando inválido.\nNo está en mi sistema.\nPrueba con \`.menu\`.`,
    `✦ ¡Hey!\nEse comando no está disponible.\nRevisa \`.menu\`\npara encontrar lo que buscas.`
  ];

  let texto = mensajes[Math.floor(Math.random() * mensajes.length)];
  await conn.reply(m.chat, texto, m, rcanal);

  setTimeout(() => { global._cmdHandled = false; }, 1000);
}
