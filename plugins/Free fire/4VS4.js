// plugins/test_buttons.js

let handler = m => m

handler.before = async function (m, { conn }) {
    // Diagnosticar si llegan los botones
    if (m.message?.buttonsResponseMessage) {
        const button = m.message.buttonsResponseMessage;
        console.log('🔘 BOTÓN DETECTADO:', {
            id: button.selectedButtonId,
            sender: m.sender,
            chat: m.chat
        });
        
        await conn.reply(m.chat, `✅ Botón detectado: *${button.selectedButtonId}*`, m);
    }
}

export default handler
