let handler = async (m, { conn, args }) => {

let fkontak = { 
  key: { 
    participants: "0@s.whatsapp.net", 
    remoteJid: "status@broadcast", 
    fromMe: false, 
    id: "Halo" 
  }, 
  message: { 
    contactMessage: { 
      vcard: `BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:Bot
item1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}
item1.X-ABLabel:Ponsel
END:VCARD` 
    } 
  }, 
  participant: "0@s.whatsapp.net" 
}

// ❌ si no pone texto
if (!args[0]) {
  return conn.reply(m.chat, '⚠️ Escribe el nuevo nombre del grupo.', fkontak, m)
}

try {
  let text = args.join(' ')

  // ✅ cambiar nombre
  await conn.groupUpdateSubject(m.chat, text)

  // ✅ confirmación
  conn.reply(m.chat, '✅ Nombre del grupo actualizado correctamente.', fkontak, m)

} catch (e) {
  console.log(e)
  conn.reply(m.chat, '❌ Error al cambiar el nombre del grupo.', fkontak, m)
}

}

handler.command = /^(setname|newnombre|nuevonombre)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
