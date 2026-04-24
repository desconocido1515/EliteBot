switch (command) {

case 'delai':
case 'dsowner':
case 'limpieza': {   // 👈 añadido

const sessionPath = `./${sessions}/`
if (!existsSync(sessionPath)) return conn.reply(m.chat, 'ꕥ La carpeta de sesión está vacía.', m)

await m.react('🕒')

const files = await fs.readdir(sessionPath)
let filesDeleted = 0

for (const file of files) {
if (file !== 'creds.json') {
await fs.unlink(path.join(sessionPath, file))
filesDeleted++
}}

if (filesDeleted === 0) {
await conn.reply(m.chat, 'ꕥ La carpeta de sesión no contenía archivos eliminables.', m)
} else {
await m.react('✔️')
await conn.reply(m.chat, `❱❱ 𝙀𝙉𝙏𝙀𝙉𝘿𝙄𝘿𝙊 𝘾𝙍𝙀𝘼𝘿𝙊𝙍 ❰❰
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
 » 𝙎𝙀 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍𝙊𝙉 *${filesDeleted}* 𝘼𝙍𝘾𝙃𝙄𝙑𝙊𝙎 𝘿𝙀 𝙇𝘼 𝘾𝘼𝙍𝙋𝙀𝙏𝘼 𝙀𝙇𝙄𝙏𝙀 𝘽𝙊𝙏 𝙎𝙀𝙎𝙎𝙄𝙊𝙉.
» 𝙎𝙀𝙍𝙑𝙄𝘿𝙊𝙍 𝙇𝙄𝙈𝙋𝙄𝘼𝘿𝙊 𝘾𝙊𝙍𝙍𝙀𝘾𝙏𝘼𝙈𝙀𝙉𝙏𝙀 🌎`, m)
}
break
}

case 'cleartmp':
case 'vaciartmp':
case 'limpieza2': {  // 👈 añadido

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

await m.react('✔️')

conn.reply(m.chat, `𝙀𝙉𝙏𝙀𝙉𝘿𝙄𝘿𝙊 𝘾𝙍𝙀𝘼𝘿𝙊𝙍 ❰❰
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
 » 𝘼𝙍𝘾𝙃𝙄𝙑𝙊𝙎 𝘿𝙀 𝙇𝘼 𝘾𝘼𝙍𝙋𝙀𝙏𝘼 𝙏𝙈𝙋 𝙁𝙐𝙀𝙍𝙊𝙉 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝘿𝙊𝙎 (*${totalDeleted}*).
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘`, m)

break
}
}
