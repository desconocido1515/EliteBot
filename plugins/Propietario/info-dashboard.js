let handler = async (m, { conn }) => {
  try {
    // Verificar que exista db.data.stats
    if (!global.db?.data?.stats) {
      return conn.reply(m.chat, `☑️ 𝙽𝙾 𝙷𝙰𝚈 𝙳𝙰𝚃𝙾𝚂 𝙳𝙴 𝙴𝚂𝚃𝙰𝙳𝙸𝚂𝚃𝙸𝙲𝙰𝚂 𝙳𝙸𝚂𝙿𝙾𝙽𝙸𝙱𝙻𝙴𝚂`, m, rcanal)
    }
    
    let stats = Object.entries(global.db.data.stats).map(([key, val]) => {
      let name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' & ') : plugins[key]?.help || key 
      if (/exec/.test(name)) return null
      return { name, ...val }
    }).filter(v => v !== null)
    
    if (stats.length === 0) {
      return conn.reply(m.chat, `☑️ 𝙽𝙾 𝙷𝙰𝚈 𝙲𝙾𝙼𝙰𝙽𝙳𝙾𝚂 𝚁𝙴𝙶𝙸𝚂𝚃𝚁𝙰𝙳𝙾𝚂`, m, rcanal)
    }
    
    stats = stats.sort((a, b) => b.total - a.total)
    let txt = stats.slice(0, 10).map(({ name, total, last }, idx) => {
      if (name && name.includes('-') && name.endsWith('.js')) name = name.split('-')[1].replace('.js', '')
      if (!name) name = 'Comando desconocido'
      return `(${idx + 1})\n┏━━━━━━━━━━━━━━━━┓\n┣📚 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 : ${name}\n┣≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋\n┣🗂️ 𝙐𝙎𝙊𝙎 : ${total}\n┣≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋\n┣📍 𝙐𝙇𝙏𝙄𝙈𝙊𝙎 𝙐𝙎𝙊 : ${getTime(last)}\n┗━━━━━━━━━━━━━━━━┛`
    }).join`\n\n`
    
    await conn.reply(m.chat, `*☘️ Dashboard comandos mas usados ☘️*\n\n${txt}`, m, rcanal)
    
  } catch (error) {
    console.error('Error en dashboard:', error)
    await conn.reply(m.chat, `☑️ 𝙴𝚁𝚁𝙾𝚁 𝙰𝙻 𝙶𝙴𝙽𝙴𝚁𝙰𝚁 𝙴𝙻 𝙳𝙰𝚂𝙷𝙱𝙾𝙰𝚁𝙳`, m, rcanal)
  }
}

handler.help = ['dashboard']
handler.tags = ['info']
handler.command = /^dashboard$/i
handler.rowner = true

export default handler

export function parseMs(ms) {
  if (typeof ms !== 'number') return { dias: 0, horas: 0, minutos: 0, segundos: 0, milisegundos: 0, microsegundos: 0, nanosegundos: 0 }
  return {
    dias: Math.trunc(ms / 86400000),
    horas: Math.trunc(ms / 3600000) % 24,
    minutos: Math.trunc(ms / 60000) % 60,
    segundos: Math.trunc(ms / 1000) % 60,
    milisegundos: Math.trunc(ms) % 1000,
    microsegundos: Math.trunc(ms * 1000) % 1000,
    nanosegundos: Math.trunc(ms * 1e6) % 1000
  }
}

export function getTime(ms) {
  if (!ms || isNaN(ms)) return 'Nunca'
  let now = parseMs(+new Date() - ms)
  if (now.dias > 0) return `hace ${now.dias} días`
  if (now.dias === 1) return `hace 1 día`
  if (now.horas > 0) return `hace ${now.horas} horas`
  if (now.horas === 1) return `hace 1 hora`
  if (now.minutos > 0) return `hace ${now.minutos} minutos`
  if (now.minutos === 1) return `hace 1 minuto`
  return `hace unos segundos`
}
