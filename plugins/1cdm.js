import fs from 'fs'
import path from 'path'

let handler = async (m, { conn }) => {

  let comandos = new Set()
  let porCarpeta = {}

  // 🔥 recorrer plugins cargados (comandos reales)
  for (let name in global.plugins) {
    let plugin = global.plugins[name]
    if (!plugin) continue

    let { command, help } = plugin

    let lista = []

    // COMMAND
    if (command) {
      if (Array.isArray(command)) lista.push(...command)
      else if (typeof command === 'string') lista.push(command)
      else if (command instanceof RegExp) {
        let match = command.toString().match(/\((.*?)\)/)
        if (match) lista.push(...match[1].split('|'))
      }
    }

    // HELP (clave en tu repo)
    if (help) {
      if (Array.isArray(help)) lista.push(...help)
      else if (typeof help === 'string') lista.push(help)
    }

    // limpiar
    lista = lista
      .filter(c => typeof c === 'string' && c.length < 20 && !c.includes(''))

    if (lista.length === 0) continue

    // 🧠 detectar carpeta desde path del plugin
    let ruta = plugin?.__filename || name
    let carpeta = ruta.split(path.sep)[1] || 'otros'

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

  // 📂 ORDEN POR CARPETAS
  let detalle = Object.keys(porCarpeta)
    .sort()
    .map(carpeta => {
      let cmds = [...porCarpeta[carpeta]]
        .sort()
        .map(c => `'${c}'`)
        .join(', ')
      return `📂 ${carpeta}\n${cmds}`
    })
    .join('\n\n')

  // 📨 MENSAJE FINAL
  let texto = `📜 Total de comandos: ${total}\n\n${listaTotal}\n\n━━━━━━━━━━━━━━\n\n${detalle}`

  conn.reply(m.chat, texto, m)
}

handler.command = ['cmdlist']
handler.tags = ['tools']
handler.help = ['cmdlist']

export default handler
