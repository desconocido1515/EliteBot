export default {
  async participantsUpdate({ id, participants, action }) {
    try {
      const bot = this.user.jid

      if (action === 'add' && participants.includes(bot)) {
        let text = `👋 Hola grupo, acabo de ser agregado 🤖

Usa:
• .menu`

        await this.sendMessage(id, { text })

        console.log('✅ Bot agregado, mensaje enviado')
      }

    } catch (e) {
      console.error(e)
    }
  }
}
