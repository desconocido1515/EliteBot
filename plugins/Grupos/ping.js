import os from 'os'
import { performance } from 'perf_hooks'

let handler = async (m, { conn }) => {

  // ⏱️ Medición real
  const start = performance.now()

  // 📊 DB
  let chat = global.db.data.chats[m.chat] || {}
  let settings = global.db.data.settings[conn.user.jid] || {}

  // ⏰ Uptime
  const uptime = process.uptime()
  const formatTime = (s) => {
    let h = Math.floor(s / 3600)
    let m = Math.floor((s % 3600) / 60)
    let sec = Math.floor(s % 60)
    return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`
  }

  // 💻 RAM
  const used = (process.memoryUsage().rss / 1024 / 1024 / 1024).toFixed(2)
  const total = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)

  // ⚡ velocidad real
  const speed = (performance.now() - start)

  // 🔥 estados
  const estado = (v) => v ? '🟢 ON' : '🔴 OFF'

  let texto = `V E L O C I D A D

⚙️ *Velocidad:* ${speed.toFixed(2)} ms
⚙️ *RAM:* ${used} GB / ${total} GB

➡️ Welcome : ${estado(chat.welcome)}
➡️ Restrict : ${estado(settings.restrict)}
➡️ Modo Admin : ${estado(chat.modoadmin)}
➡️ Audios : ${estado(chat.audios)}
➡️ Jadibot : ${estado(settings.jadibot)}
➡️ Antiprivado : ${estado(settings.antiPrivate)}
➡️ Antilink : ${estado(chat.antilink)}
➡️ Delete : ${estado(chat.delete)}
➡️ Antitoxic : ${estado(chat.antitoxic)}
`

  // 🖼️ enviar con imagen
  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/j2lu62.jpg' },
    caption: texto
  }, { quoted: m })
}

handler.help = ['ping', 'pong', 'velocidad']
handler.tags = ['main']
handler.command = ['ping', 'pong', 'velocidad']

export default handler
