let handler = async (m, { conn }) => {

  let comandos = new Set()

  for (let name in global.plugins) {
    let plugin = global.plugins[name]

    if (!plugin || !plugin.command) continue

    let cmd = plugin.command

    // 🧠 ARRAY
    if (Array.isArray(cmd)) {
      cmd.forEach(c => comandos.add(c))
    }

    // 🧠 STRING
    else if (typeof cmd === 'string') {
      comandos.add(cmd)
    }

    // 🧠 REGEX
    else if (cmd instanceof RegExp) {
      let match = cmd.toString().match(/\((.*?)\)/)
      if (match) {
        match[1].split('|').forEach(c => comandos.add(c))
      }
    }
  }

  let resultado = [...comandos]
    .sort()
    .map(c => `'${c}'`)
    .join(', ')

  if (!resultado) return m.reply('❌ No se encontraron comandos')

  m.reply(`📜 Lista REAL de comandos:\n\n${resultado}`)
}

handler.command = ['cmdlist']
handler.tags = ['tools']
handler.help = ['cmdlist']

export default handler
