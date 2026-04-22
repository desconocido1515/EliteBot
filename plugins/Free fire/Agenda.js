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
            text: '📋',
            key: m.key
        }
    })
    
    // Ruta de la imagen según el comando
    const pp = `./media/menus/${command}.jpg`
    
    const cat = `» 𝘼𝙂𝙀𝙉𝘿𝘼 𝘿𝙀 𝙑𝙀𝙍𝙎𝙐𝙎 🔰`
    
    await conn.sendFile(m.chat, pp, `${command}.jpg`, cat, fkontak)
}

handler.help = ['agenda']
handler.tags = ['info']
handler.command = /^(agenda)$/i

export default handler
