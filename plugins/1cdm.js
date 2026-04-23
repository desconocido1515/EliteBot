let handler = async (m, { conn }) => {

  let comandos = new Set()
  let porCarpeta = {}

  for (let name in global.plugins) {
    let plugin = global.plugins[name]
    if (!plugin) continue

    let lista = []
    let { command, help } = plugin

    // 🧠 COMMAND
    if (command) {
      if (Array.isArray(command)) lista.push(...command)
      else if (typeof command === 'string') lista.push(command)
      else if (command instanceof RegExp) {
        let match = command.toString().match(/\((.*?)\)/)
        if (match) lista.push(...match[1].split('|'))
      }
    }

    // 🧠 HELP
    if (help) {
      if (Array.isArray(help)) lista.push(...help)
      else if (typeof help === 'string') lista.push(help)
    }

    lista = lista.filter(c => typeof c === 'string' && c.length < 20)

    if (!lista.length) continue

    // 🔥 detectar carpeta desde el nombre del plugin
    // ejemplo: "Buscadores/google.js"
    let parts = name.split('/')
    let carpeta = parts.length > 1 ? parts[0] : 'principal'

    if (!porCarpeta[carpeta]) porCarpeta[carpeta] = new Set()

    lista.forEach(cmd => {
      comandos.add(cmd)
      porCarpeta[carpeta].add(cmd)
    })
  }

  // 🔝 TEXTO PRINCIPAL
  let listaTotal = [...comandos]
    .sort()
    .map(c => `'${c}'`)
    .join(', ')

  let total = comandos.size

  // 📂 POR CARPETAS
  let detalle = Object.keys(porCarpeta)
    .sort()
    .map(cat => {
      let cmds = [...porCarpeta[cat]]
        .sort()
        .map(c => `'${c}'`)
        .join(', ')
      return `📂 ${cat}\n${cmds}`
    })
    .join('\n\n')

  let texto = `📜 Total de comandos: ${total}\n\n${listaTotal}\n\n━━━━━━━━━━━━━━\n\n${detalle}`

  conn.reply(m.chat, texto, m)
}

handler.command = ['cmdlist']
handler.tags = ['tools']
handler.help = ['cmdlist']

export default handler
