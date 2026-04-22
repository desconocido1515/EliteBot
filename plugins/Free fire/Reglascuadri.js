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
    
    // Reaccionar al mensaje según el comando
    let emoji = '📑'
    let rutaImagen = ''
    let cat = ''
    
    if (command === 'reglascuadri') {
        emoji = '📑'
        rutaImagen = './media/menus/reglascuadri.jpg'
        cat = `» 𝙍𝙀𝙂𝙇𝘼𝙈𝙀𝙉𝙏𝙊 𝘾𝙐𝘼𝘿𝙍𝙄𝙇𝘼́𝙏𝙀𝙍𝙊 📑`
    } else if (command === 'reglaslideres' || command === 'lideres') {
        emoji = '👑'
        rutaImagen = './media/menus/reglaslideres.jpg'
        cat = `» 𝙍𝙀𝙂𝙇𝘼𝙎 𝙇𝙄𝘿𝙀𝙍𝙀𝙎 👑`
    }
    
    await conn.sendMessage(m.chat, {
        react: {
            text: emoji,
            key: m.key
        }
    })
    
    await conn.sendFile(m.chat, rutaImagen, `${command}.jpg`, cat, fkontak)
}

handler.help = ['reglascuadri', 'reglaslideres', 'lideres']
handler.tags = ['info']
handler.command = /^(reglascuadri|reglaslideres|lideres)$/i

export default handler
