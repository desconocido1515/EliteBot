import fs from 'fs';
import path from 'path';

export async function before(m, { conn }) {
  // Evitar doble ejecución
  if (global._cmdHandled) return;
  if (!m.text) return;
  
  // Detectar prefijo
  const prefixRegex = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.\\/\\-@©:;¿¡+*]+/;
  const match = m.text.match(prefixRegex);
  if (!match) return;
  
  const usedPrefix = match[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();
  
  if (!command) return;

  // ✅ FUNCIÓN PARA VERIFICAR SI EL COMANDO EXISTE
  const commandExists = (cmd) => {
    // Revisar plugins cargados en memoria
    if (global.plugins) {
      for (const plugin of Object.values(global.plugins)) {
        if (!plugin) continue;
        
        // Array de comandos
        if (Array.isArray(plugin.command) && plugin.command.includes(cmd)) return true;
        // String simple
        if (typeof plugin.command === 'string' && plugin.command === cmd) return true;
        // Expresión regular
        if (plugin.command instanceof RegExp && plugin.command.test(cmd)) return true;
        // handler.help
        if (Array.isArray(plugin.help) && plugin.help.includes(cmd)) return true;
        if (typeof plugin.help === 'string' && plugin.help === cmd) return true;
        if (plugin.help instanceof RegExp && plugin.help.test(cmd)) return true;
      }
    }
    return false;
  };

  // Si el comando NO existe, mostrar mensaje de error
  if (!commandExists(command)) {
    global._cmdHandled = true;
    
    const mensajes = [
      `✦ ¡Hey!\nDeja de inventar comandos raros.\nNo dispongo de ese comando.\nUsa \`.menu\` para ver opciones.`,
      `✦ ¡Hey!\nPero… ¿qué estás escribiendo?\nCreo que buscas \`.menu\`\nAhí está todo.`,
      `✦ ¡Hey!\nNi yo conozco ese comando.\nMejor usa \`.menu\`\ny revisa mi catálogo.`,
      `✦ ¡Hey!\nEse comando no existe.\nPero puedes usar \`.menu\`\npara ver todos los disponibles.`,
      `✦ ¡Hey!\nComando inválido.\nNo está en mi sistema.\nPrueba con \`.menu\`.`,
      `✦ ¡Hey!\nEse comando no está disponible.\nRevisa \`.menu\`\npara encontrar lo que buscas.`
    ];
    
    const texto = mensajes[Math.floor(Math.random() * mensajes.length)];
    
    await conn.reply(m.chat, texto, m, rcanal);
    
    setTimeout(() => {
      global._cmdHandled = false;
    }, 1000);
    
    return; // Detener ejecución
  }
  
  // Si el comando existe, contar y continuar
  let user = global.db.data.users[m.sender];
  if (user) user.commands = (user.commands || 0) + 1;
}
