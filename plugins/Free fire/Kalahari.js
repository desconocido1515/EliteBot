
var handler = async (m, { conn, command, args, usedPrefix, DevMode }) => {
    let fkontak = { 
        "key": { 
            "participants": "0@s.whatsapp.net", 
            "remoteJid": "status@broadcast", 
            "fromMe": false, 
            "id": "Halo" 
        }, 
        "message": { 
            "contactMessage": { 
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            }
        }, 
        "participant": "0@s.whatsapp.net" 
    }
    
    // Reaccionar al mensaje
    await conn.sendMessage(m.chat, {
        react: {
            text: '🖼️',
            key: m.key
        }
    })
    
    // Ruta de la imagen
    const pp = './media/menus/kalahari.jpg'
    
    const cat = `» 𝙈𝘼𝙋𝘼 𝙆𝘼𝙇𝘼𝙃𝘼𝙍𝙄 𝙁𝙍𝙀𝙀 𝙁𝙄𝙍𝙀 🔰`
    
    await conn.sendFile(m.chat, pp, 'kalahari.jpg', cat, fkontak)
}

handler.help = ['kalahari']
handler.tags = ['info']
handler.command = /^(kalahari)$/i

export default handler
