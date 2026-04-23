let handler = async (m, { conn }) => {

  let comandos = new Set()

  for (let name in global.plugins) {
    let plugin = global.plugins[name]
    if (!plugin) continue

    let { command, help } = plugin

    // 🧠 1. COMMAND
    if (command) {

      // ARRAY
      if (Array.isArray(command)) {
        command.forEach(c => typeof c === 'string' && comandos.add(c))
      }

      // STRING
      else if (typeof command === 'string') {
        comandos.add(command)
      }

      // REGEX
      else if (command instanceof RegExp) {
        let match = command.toString().match(/\((.*?)\)/)
        if (match) {
          match[1].split('|').forEach(c => comandos.add(c))
        }
      }
    }

    // 🧠 2. HELP (MUY IMPORTANTE en este repo)
    if (help) {

      if (Array.isArray(help)) {
        help.forEach(c => typeof c === 'string' && comandos.add(c))
      }

      else if (typeof help === 'string') {
        comandos.add(help)
      }
    }
  }

  let resultado = [...comandos]
    .filter(c => c && c.length < 20 && !c.includes(' '))
    .sort()
    .map(c => `'${c}'`)
    .join(', ')

  if (!resultado) return m.reply('❌ No se detectaron comandos')

  m.reply(`📜 Lista REAL de comandos:\n\n${resultado}`)
}

handler.command = ['cmdlist']
handler.tags = ['tools']
handler.help = ['cmdlist']

export default handler
