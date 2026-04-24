import { readdirSync, unlinkSync, existsSync, promises as fs, statSync } from 'fs'
import { tmpdir } from 'os'
import path, { join } from 'path'

const handler = async (m, { conn, __dirname, command, usedPrefix, isROwner }) => {
if (!isROwner) return
try {
switch (command) {
case 'limpieza': case 'dsowner': {
const sessionPath = `./${sessions}/`
if (!existsSync(sessionPath)) return conn.reply(m.chat, 'ꕥ La carpeta de sesión está vacía.', m, rcanal)
await m.react('🕒')
const files = await fs.readdir(sessionPath)
let filesDeleted = 0
for (const file of files) {
if (file !== 'creds.json') {
await fs.unlink(path.join(sessionPath, file))
filesDeleted++
}}
if (filesDeleted === 0) {
await conn.reply(m.chat, 'ꕥ La carpeta de sesión no contenía archivos eliminables.', m, rcanal)
} else {
await m.react('✔️')
await conn.reply(m.chat, `❱❱ 𝙀𝙉𝙏𝙀𝙉𝘿𝙄𝘿𝙊 𝘾𝙍𝙀𝘼𝘿𝙊𝙍 ❰❰\n﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘\n » 𝙎𝙀 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍𝙊𝙉 *${filesDeleted}* 𝘼𝙍𝘾𝙃𝙄𝙑𝙊𝙎 𝘿𝙀 𝙇𝘼 𝘾𝘼𝙍𝙋𝙀𝙏𝘼 𝙀𝙇𝙄𝙏𝙀 𝘽𝙊𝙏 𝙎𝙀𝙎𝙎𝙄𝙊𝙉.\n» 𝙎𝙀𝙍𝙑𝙄𝘿𝙊𝙍 𝙇𝙄𝙈𝙋𝙄𝘼𝘿𝙊 𝘾𝙊𝙍𝙍𝙀𝘾𝙏𝘼𝙈𝙀𝙉𝙏𝙀 🌎`, m, rcanal)
}
break
}
case 'cleartmp': case 'limpieza2': {
await m.react('🕒')
const tmpPaths = [tmpdir(), join(__dirname, '../tmp')]
let totalDeleted = 0
for (const dirname of tmpPaths) {
const files = readdirSync(dirname)
for (const file of files) {
const fullPath = join(dirname, file)
const stats = statSync(fullPath)
if (stats.isDirectory()) continue
unlinkSync(fullPath)
totalDeleted++
}}
await m.react('☑️ ')
conn.reply(m.chat, `𝙀𝙉𝙏𝙀𝙉𝘿𝙄𝘿𝙊 𝘾𝙍𝙀𝘼𝘿𝙊𝙍 ❰❰\n﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘\n » 𝘼𝙍𝘾𝙃𝙄𝙑𝙊𝙎 𝘿𝙀 𝙇𝘼 𝘾𝘼𝙍𝙋𝙀𝙍𝙏𝘼 𝙏𝙈𝙋 𝙁𝙐𝙀𝙍𝙊𝙉 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝘿𝙊𝙎.\n﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘`, m, rcanal)
break
}
}} catch (err) {
await m.react('✖️')
await conn.reply(m.chat, `⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${err.message}`, m, rcanal)
}}

handler.help = ['delai', 'dsowner', 'cleartmp', 'vaciartmp']
handler.tags = ['owner']
handler.command = ['limpieza', 'dsowner', 'cleartmp', 'limpieza2']

export default handler
