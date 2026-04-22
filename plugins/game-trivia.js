// plugins/test_boton.js

const handler = async (m, { conn, usedPrefix }) => {
  // Si es una respuesta de botón
  if (m.text === '.si') {
    await conn.reply(m.chat, '✅ Presionaste SI - El botón funciona correctamente', m)
    await m.react('✅')
    return
  }
  
  if (m.text === '.no') {
    await conn.reply(m.chat, '❌ Presionaste NO - El botón funciona correctamente', m)
    await m.react('❌')
    return
  }
  
  // Si es el comando para mostrar botones
  if (m.text === '.testboton') {
    const buttons = [
      { buttonId: '.si', buttonText: { displayText: '✅ SI' }, type: 1 },
      { buttonId: '.no', buttonText: { displayText: '❌ NO' }, type: 1 }
    ]
    
    await conn.sendMessage(m.chat, {
      text: '🧪 *PRUEBA DE BOTONES*\n\nPresiona un botón para ver si funciona:',
      buttons: buttons,
      viewOnce: true
    }, { quoted: m })
    return
  }
}

handler.command = ['testboton', 'si', 'no']
export default handler
