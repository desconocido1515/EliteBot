import fs from 'fs'
import path from 'path'

const pluginFolder = path.resolve('./plugins')

// 🔁 Leer todo (incluye subcarpetas)
function getAllFiles(dir) {
  let results = []
  const list = fs.readdirSync(dir)

  for (const file of list) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath))
    } else {
      results.push(filePath)
    }
  }

  return results
}

let handler = async (m, { conn }) => {

  let comandos = new Set()
  const files = getAllFiles(pluginFolder)

  for (const file of files) {
    if (!file.endsWith('.js')) continue

    const content = fs.readFileSync(file, 'utf-8')

    // 📦 Arrays
    let arrayMatches = content.match(/handler\.command\s*=\s*\[([^\]]+)\]/g)
    if (arrayMatches) {
      for (let match of arrayMatches) {
        let cmds = match
          .replace(/handler\.command\s*=\s*\[|\]/g, '')
          .split(',')
          .map(v => v.replace(/['"`\s]/g, ''))
          .filter(Boolean)

        cmds.forEach(c => comandos.add(c))
      }
    }

    // 🔥 Regex mejorado
    let regexMatches = content.match(/\/\^\((.*?)\)\$\//g)
    if (regexMatches) {
      for (let match of regexMatches) {
        let clean = match.replace(/\/\^\(|\)\$\//g, '')
        clean.split('|').forEach(c => comandos.add(c))
      }
    }
  }

  let resultado = [...comandos]
    .sort()
    .map(c => `'${c}'`)
    .join(', ')

  await conn.reply(m.chat, `📜 Comandos encontrados:\n\n${resultado}`, m)
}

handler.command = ['cmdlist']
handler.tags = ['tools']
handler.help = ['cmdlist']

export default handler
