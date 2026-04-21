// plugins/welcome.js

let handler = async (m, { conn, text, command }) => {

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

// Inicializar datos del chat si no existen
if (!global.db.data.chats[m.chat]) {
  global.db.data.chats[m.chat] = {}
}
if (global.db.data.chats[m.chat].sWelcome === undefined) {
  global.db.data.chats[m.chat].sWelcome = false
}
if (global.db.data.chats[m.chat].sBye === undefined) {
  global.db.data.chats[m.chat].sBye = false
}

// ================= RESET WELCOME =================
if (/^resetwelcome$/i.test(command)) {
  global.db.data.chats[m.chat].sWelcome = false
  return conn.reply(m.chat, '✅ Bienvenida restablecida a la normalidad.', fkontak, m)
}

// ================= RESET BYE =================
if (/^resetbye$/i.test(command)) {
  global.db.data.chats[m.chat].sBye = false
  return conn.reply(m.chat, '✅ Despedida restablecida a la normalidad.', fkontak, m)
}

// ================= SET WELCOME =================
if (/^(setwelcome|bienvenida)$/i.test(command)) {

  let txt = m.message?.extendedTextMessage?.text || m.text || ''
  txt = txt.replace(/^\.setwelcome\s*/i, '').replace(/^\.bienvenida\s*/i, '').trim()

  if (txt && txt.length > 0) {
    global.db.data.chats[m.chat].sWelcome = txt
    return conn.reply(m.chat, '✅ Bienvenida configurada correctamente.\n\n📝 Texto guardado:\n' + txt, fkontak, m)
  } else {
    const ayuda = `✦ ¡Hola!
Te ayudaré a configurar la bienvenida y despedida. 

> Primeramente debes saber que al usar este símbolo (@) te ayuda a etiquetar a la persona , mencionar el grupo e incluir la descripción en este grupo. 

» (@user)
Para etiquetar a la persona .
» (@desc)
Para incluir la descripción del grupo.
» (@subject)
Para mencionar el nombre de este grupo.

💫 Ejemplo Bienvenida:

.setwelcome Bienvenido @user al mejor grupo @subject ,  siéntete en casa. ❤️ 

@desc

💫 Ejemplo Despedida:

.setbye Adiós Popo 🤡 @user.

🌟 Para restablecer despedida o bienvenida:
.resetwelcome 
.resetbye`
    
    return conn.reply(m.chat, ayuda, fkontak, m)
  }
}

// ================= SET BYE =================
if (/^(setbye|despedida)$/i.test(command)) {

  let txt = m.message?.extendedTextMessage?.text || m.text || ''
  txt = txt.replace(/^\.setbye\s*/i, '').replace(/^\.despedida\s*/i, '').trim()

  if (txt && txt.length > 0) {
    global.db.data.chats[m.chat].sBye = txt
    return conn.reply(m.chat, '✅ Despedida configurada correctamente.\n\n📝 Texto guardado:\n' + txt, fkontak, m)
  } else {
    const ayuda = `✦ ¡Hola!
Te ayudaré a configurar la bienvenida y despedida. 

> Primeramente debes saber que al usar este símbolo (@) te ayuda a etiquetar a la persona , mencionar el grupo e incluir la descripción en este grupo. 

» (@user)
Para etiquetar a la persona .
» (@desc)
Para incluir la descripción del grupo.
» (@subject)
Para mencionar el nombre de este grupo.

💫 Ejemplo Bienvenida:

.setwelcome Bienvenido @user al mejor grupo @subject ,  siéntete en casa. ❤️ 

@desc

💫 Ejemplo Despedida:

.setbye Adiós Popo 🤡 @user.

🌟 Para restablecer despedida o bienvenida:
.resetwelcome 
.resetbye`
    
    return conn.reply(m.chat, ayuda, fkontak, m)
  }
}

}

handler.command = ['setwelcome', 'bienvenida', 'resetwelcome', 'setbye', 'despedida', 'resetbye']
handler.botAdmin = true
handler.admin = true
handler.group = true

export default handler

// ================= ENVÍO DE BIENVENIDA Y DESPEDIDA =================
export async function before(m, { conn, isGroup }) {
  if (!isGroup) return
  
  // Verificar que exista la base de datos
  if (!global.db.data.chats[m.chat]) {
    global.db.data.chats[m.chat] = {}
  }
  
  // Detectar cuando alguien se une al grupo (ADD)
  if (m.messageStubType === 21) {
    const addedUsers = m.messageStubParameters
    
    // Obtener datos del grupo
    const groupMetadata = await conn.groupMetadata(m.chat)
    const groupName = groupMetadata.subject || 'Grupo'
    const groupDesc = groupMetadata.desc || 'Sin descripción'
    
    // Obtener el texto de bienvenida configurado
    let welcomeText = global.db.data.chats[m.chat]?.sWelcome || false
    
    // Si hay texto de bienvenida configurado
    if (welcomeText && welcomeText !== false) {
      for (let user of addedUsers) {
        // Reemplazar variables
        let processedText = welcomeText
          .replace(/@user/g, `@${user.split('@')[0]}`)
          .replace(/@subject/g, groupName)
          .replace(/@desc/g, groupDesc)
        
        // Enviar bienvenida mencionando al nuevo usuario
        await conn.sendMessage(m.chat, {
          text: processedText,
          mentions: [user]
        })
      }
    }
  }
  
  // Detectar cuando alguien se va del grupo (REMOVE)
  if (m.messageStubType === 22) {
    const removedUsers = m.messageStubParameters
    
    // Obtener el texto de despedida configurado
    let byeText = global.db.data.chats[m.chat]?.sBye || false
    
    // Si hay texto de despedida configurado
    if (byeText && byeText !== false) {
      for (let user of removedUsers) {
        let processedText = byeText.replace(/@user/g, `@${user.split('@')[0]}`)
        
        await conn.sendMessage(m.chat, {
          text: processedText,
          mentions: [user]
        })
      }
    }
  }
}
