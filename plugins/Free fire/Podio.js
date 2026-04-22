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
            text: '🏆',
            key: m.key
        }
    })
    
    // Ruta de la imagen
    const pp = './media/menus/podiocuadri.jpg'
    
    const cat = `» 𝙋𝙊𝘿𝙄𝙊 𝘾𝙐𝘼𝘿𝙍𝙄𝙇𝘼́𝙏𝙀𝙍𝙊 🏆`
    
    await conn.sendFile(m.chat, pp, 'podiocuadri.jpg', cat, fkontak)
}

handler.help = ['podiocuadri']
handler.tags = ['info']
handler.command = /^(podiocuadri)$/i

export default handler
