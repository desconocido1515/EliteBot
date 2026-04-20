import fs from 'fs';
import path from 'path';

export async function before(m, { conn }) {
  // Solo procesar mensajes de texto con prefijo
  if (!m.text) return;
  
  // Detectar prefijo (., !, #, etc.)
  const prefixRegex = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.\\/\\-@©:;¿¡+*]+/;
  const match = m.text.match(prefixRegex);
  if (!match) return;
  
  const usedPrefix = match[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();
  
  if (!command) return;

  // ✅ Verificar si el comando existe en los plugins cargados
  let commandExists = false;
  
  if (global.plugins) {
    for (const plugin of Object.values(global.plugins)) {
      if (!plugin) continue;
      
      // Array de comandos
      if (Array.isArray(plugin.command) && plugin.command.includes(command)) {
        commandExists = true;
        break;
      }
      // String simple
      if (typeof plugin.command === 'string' && plugin.command === command) {
        commandExists = true;
        break;
      }
      // Expresión regular
      if (plugin.command instanceof RegExp && plugin.command.test(command)) {
        commandExists = true;
        break;
      }
      // handler.help
      if (Array.isArray(plugin.help) && plugin.help.includes(command)) {
        commandExists = true;
        break;
      }
      if (typeof plugin.help === 'string' && plugin.help === command) {
        commandExists = true;
        break;
      }
      if (plugin.help instanceof RegExp && plugin.help.test(command)) {
        commandExists = true;
        break;
      }
    }
  }

  // Si el comando NO existe, mostrar mensaje de error
  if (!commandExists) {
    const mensajes = [
      `✦ ¡Hey!\nDeja de inventar comandos raros.\nNo dispongo de ese comando.\nUsa \`.menu\` para ver opciones.`,
      `✦ ¡Hey!\nPero… ¿qué estás escribiendo?\nCreo que buscas \`.menu\`\nAhí está todo.`,
      `✦ ¡Hey!\nNi yo conozco ese comando.\nMejor usa \`.menu\`\ny revisa mi catálogo.`,
      `✦ ¡Hey!\nEse comando no existe.\nPero puedes usar \`.menu\`\npara ver todos los disponibles.`,
      `✦ ¡Hey!\nComando inválido.\nNo está en mi sistema.\nPrueba con \`.menu\`.`,
      `✦ ¡Hey!\nEse comando no está disponible.\nRevisa \`.menu\`\npara encontrar lo que buscas.`
    ];
    
    const texto = mensajes[Math.floor(Math.random() * mensajes.length)];
    
    // Enviar mensaje de error
    await conn.reply(m.chat, texto, m, rcanal);
    
    // Detener la ejecución para que no procese otros handlers
    return true;
  }
  
  // Si el comando existe, contar y continuar
  let user = global.db.data.users[m.sender];
  if (user) user.commands = (user.commands || 0) + 1;
}

// Para depuración
console.log('✅ Validador de comandos cargado correctamente');
