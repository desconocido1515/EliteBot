// plugins/test.js

let handler = async (m, { conn }) => {
    
    // Link de la imagen
    let imageUrl = 'https://qu.ax/ixXOE.jpg'
    
    // Texto que saldrá junto a la imagen
    let texto = `☑️ *HOLA*\n\nEste es un mensaje de prueba con imagen.`
    
    // Enviar imagen con texto
    await conn.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: texto
    })
}

handler.help = ['test']
handler.tags = ['tools']
handler.command = /^(test)$/i

export default handler
