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
    
    // Reaccionar al mensaje con 🖼️
    await conn.sendMessage(m.chat, {
        react: {
            text: '🖼️',
            key: m.key
        }
    })
    
    // Ruta correcta de la imagen
    const pp = './media/menus/alpes.jpg'
    
    const cat = `» 𝙈𝘼𝙋𝘼 𝘼𝙇𝙋𝙀𝙎 𝙁𝙍𝙀𝙀 𝙁𝙄𝙍𝙀 🔰`
    
    await conn.sendFile(m.chat, pp, 'alpes.jpg', cat, fkontak)
}

handler.help = ['alpes']
handler.tags = ['info']
handler.command = /^(alpes)$/i

export default handler
