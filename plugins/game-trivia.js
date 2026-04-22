// plugins/boton_test.js

let handler = m => m

handler.before = async function (m, { conn }) {
  // Detectar si es una respuesta de botón
  if (m.message?.buttonsResponseMessage) {
    const buttonId = m.message.buttonsResponseMessage.selectedButtonId
    const sender = m.sender
    
    console.log('Botón presionado:', buttonId)
    
    if (buttonId === '.si') {
      await conn.reply(m.chat, '✅ Presionaste SI - El botón funciona!', m)
      await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    }
    
    if (buttonId === '.no') {
      await conn.reply(m.chat, '❌ Presionaste NO - El botón funciona!', m)
      await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
    return
  }
  
  // Mostrar botones
  if (m.text === '.testboton') {
    const buttons = [
      { buttonId: '.si', buttonText: { displayText: '✅ SI' }, type: 1 },
      { buttonId: '.no', buttonText: { displayText: '❌ NO' }, type: 1 }
    ]
    
    await conn.sendMessage(m.chat, {
      text: '🧪 *PRUEBA DE BOTONES*\n\nPresiona un botón:',
      buttons: buttons,
      viewOnce: true
    })
  }
}

export default handler
