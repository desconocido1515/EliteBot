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
    const pp = './media/menus/combode.jpg'
    
    const cat = `» 𝘾𝙊𝙈𝘽𝙊 𝘿𝙀 𝙃𝘼𝘽𝙄𝙇𝙄𝘿𝘼𝘿𝙀𝙎
𝘿𝙀-𝘾𝙇𝘼𝙎𝙄𝙁𝙄𝘾𝘼𝙏𝙊𝙍𝙄𝘼 🐭`
    
    await conn.sendFile(m.chat, pp, 'combode.jpg', cat, fkontak)
}

handler.help = ['combode']
handler.tags = ['info']
handler.command = /^(combode)$/i

export default handler
