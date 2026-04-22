// plugins/1vs1.js

let handler = m => m

handler.before = async function (m, { conn }) {
    // DETECTAR RESPUESTA DE BOTONES (misma lógica que funcionó en la prueba)
    if (m.message?.buttonsResponseMessage) {
        const buttonId = m.message.buttonsResponseMessage.selectedButtonId
        console.log('Botón presionado:', buttonId) // Debug
        
        // Respuesta ACEPTO
        if (buttonId === 'acepto') {
            const nombre = await conn.getName(m.sender)
            const buttons = [
                {
                    buttonId: 'yomismo',
                    buttonText: { displayText: "🔥 YO LA HAGO (PORQUE SOY PRO)" },
                    type: 1
                },
                {
                    buttonId: 'notengo',
                    buttonText: { displayText: "💸 NO TENGO SALA (SOY POBRE)" },
                    type: 1
                }
            ]
            
            await conn.sendMessage(m.chat, {
                text: `*¡JA! ${nombre} TE ENTERRASTE TU MISMO!* 😈\n\n*A ver, ¿quién pone la sala o solo sabes chupar experiencia?* 🍼\n\n*¿Pones sala o que?* 🐭`,
                buttons: buttons,
                mentions: [m.sender]
            })
            return
        }
        
        // Respuesta NEGADO
        if (buttonId === 'negado') {
            const nombre = await conn.getName(m.sender)
            await conn.sendMessage(m.chat, {
                text: `┏━━━━━━━━━━━━━━━━┓\n*${nombre} ES TAN NOOB QUE NI EL BOT LE JUEGA.*\n┗━━━━━━━━━━━━━━━━┛\n*Vete a practicar contra bots, baby* 🤖🍼`,
                mentions: [m.sender]
            })
            return
        }
        
        // Respuesta YOMISMO
        if (buttonId === 'yomismo') {
            await conn.sendMessage(m.chat, {
                text: `┏━━━━━━━━━━━━━━━━┓\n*FINALMENTE ALGUIEN CON HUEVOS* 🥚🔥\n\n@${m.sender.split('@')[0]}\n\n*Pero seguro se desconectan a medio juego* 📵💀\n*MANDA DATOS DE LA SALA DE UUUNA*`,
                mentions: [m.sender]
            })
            return
        }
        
        // Respuesta NOTENGO
        if (buttonId === 'notengo') {
            await conn.sendMessage(m.chat, {
                text: `┏━━━━━━━━━━━━━━━━┓\n*¿PA' QUÉ ACEPTAS SI ERES POBRE?* 💸\n\n*Anda a vender dulces para que te compres una sala, rata* 🍬🐀`,
                mentions: [m.sender]
            })
            return
        }
    }
    
    // COMANDO .1vs1 para mostrar botones iniciales
    if (m.text && m.text.toLowerCase() === '.1vs1') {
        const buttons = [
            { buttonId: 'acepto', buttonText: { displayText: "🔥 ACEPTO (PA' HUMILLARTE)" }, type: 1 },
            { buttonId: 'negado', buttonText: { displayText: "💀 NEGADO (SOY NOOB)" }, type: 1 }
        ]
        
        await conn.sendMessage(m.chat, {
            text: `🔥 *MODO TÓXICO ACTIVADO* 🔥\n\n¿QUIÉN SE ATREVE A UN 1VS1? (O SOLO SABEN HUIR COMO RATAS?) 🐁💨\n───────────────\n*Si pierdes, borras el juego y te vas a jugar Candy Crush* 🍭💀`,
            buttons: buttons
        })
        return
    }
}

export default handler
