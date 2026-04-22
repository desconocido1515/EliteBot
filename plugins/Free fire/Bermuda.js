
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
            text: '🏝️',
            key: m.key
        }
    })
    
    // Ruta fija de la imagen
    let pp = './media/menus/bermuda.jpg'
    
    const cat = `» 𝙈𝘼𝙋𝘼 𝘽𝙀𝙍𝙈𝙐𝘿𝘼 𝙁𝙍𝙀𝙀 𝙁𝙄𝙍𝙀 🔰`
    
    await conn.sendFile(m.chat, pp, 'bermuda.jpg', cat, fkontak)
}

handler.help = ['bermuda']
handler.tags = ['info']
handler.command = /^(bermuda)$/i

export default handler
