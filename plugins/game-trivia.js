const triviaImages = [
  'https://cdn.yupra.my.id/yp/o720p39m.jpg',
  'https://cdn.yupra.my.id/yp/ey5l5cct.jpg',
  'https://i.pinimg.com/originals/b3/67/d5/b367d513d861de468305c32c6cd22756.jpg'
]

const questions = [
    {
        question: "¿Quién fue el padre de Melquisedec?",
        options: ["Abraham", "Noé", "Ninguno, Melquisedec no tenía padre"],
        answer: "C"
    },
    {
        question: "¿Cuál es el nombre del rey que pidió que se escribieran los Salmos?",
        options: ["David", "Salomón", "Ezequías"],
        answer: "A"
    },
    {
        question: "¿En qué libro de la Biblia se describe la creación del mundo?",
        options: ["Éxodo", "Génesis", "Levítico"],
        answer: "B"
    },
    {
        question: "¿Qué profeta desafió a los profetas de Baal en el monte Carmelo?",
        options: ["Isaías", "Elías", "Jeremías"],
        answer: "B"
    },
    {
        question: "¿Quién fue el último juez de Israel antes de que se estableciera la monarquía?",
        options: ["Samuel", "Débora", "Sansón"],
        answer: "A"
    }
]

let triviaSessions = new Map()
let userScores = new Map()

const handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    if (command === "trivia") {
      console.log("Comando trivia ejecutado con args:", args) // Debug

      // Verificar si es una respuesta (args contiene A, B o C)
      if (args.length > 0 && /^[ABC]$/i.test(args[0])) {
        const session = triviaSessions.get(m.chat)
        
        if (!session) {
          return conn.reply(m.chat, `☑️ No hay una trivia activa. Usa *${usedPrefix}trivia* para comenzar una nueva.`, m)
        }
        
        if (session.answered) {
          return conn.reply(m.chat, `☑️ Ya respondiste esta pregunta. Usa *${usedPrefix}trivia* para la siguiente.`, m)
        }

        const userAnswer = args[0].toUpperCase()
        const correctAnswer = questions[session.index].answer
        const isCorrect = userAnswer === correctAnswer

        const userId = m.sender
        if (!userScores.has(userId)) userScores.set(userId, 0)
        if (isCorrect) userScores.set(userId, userScores.get(userId) + 1)

        const points = userScores.get(userId)
        
        let respuestaTexto
        if (isCorrect) {
          respuestaTexto = `✅ *¡CORRECTO!*\n\nLa respuesta correcta es: *${questions[session.index].options[correctAnswer === 'A' ? 0 : correctAnswer === 'B' ? 1 : 2]}*\n\n🏅 Tu puntaje: *${points}* puntos\n\nUsa *${usedPrefix}trivia* para la siguiente pregunta`
        } else {
          respuestaTexto = `❌ *INCORRECTO*\n\nTu respuesta: *${userAnswer}*\nRespuesta correcta: *${correctAnswer}* - ${questions[session.index].options[correctAnswer === 'A' ? 0 : correctAnswer === 'B' ? 1 : 2]}\n\n🏅 Tu puntaje: *${points}* puntos\n\nUsa *${usedPrefix}trivia* para la siguiente pregunta`
        }

        await conn.reply(m.chat, respuestaTexto, m)
        await m.react(isCorrect ? "✅" : "❌")

        triviaSessions.set(m.chat, { ...session, answered: true })
        return
      }

      // Si no hay args, mostrar nueva pregunta
      let currentSession = triviaSessions.get(m.chat)
      let availableQuestions = [...questions]

      if (currentSession?.asked?.length) {
        availableQuestions = availableQuestions.filter((_, i) => !currentSession.asked.includes(i))
      }

      if (availableQuestions.length === 0) {
        triviaSessions.delete(m.chat)
        return conn.reply(m.chat, `🎉 *¡Felicitaciones!* Respondiste todas las preguntas. Usa *${usedPrefix}trivia* para reiniciar.`, m)
      }

      const randomIndex = Math.floor(Math.random() * availableQuestions.length)
      const questionIndex = questions.indexOf(availableQuestions[randomIndex])
      const q = questions[questionIndex]
      const img = triviaImages[Math.floor(Math.random() * triviaImages.length)]

      triviaSessions.set(m.chat, {
        index: questionIndex,
        answered: false,
        asked: currentSession?.asked ? [...currentSession.asked, questionIndex] : [questionIndex]
      })

      const caption = `*🎓 TRIVIA DE CULTURA 🎓*\n\n📖 ${q.question}\n\n*OPCIONES:*\nA) ${q.options[0]}\nB) ${q.options[1]}\nC) ${q.options[2]}\n\n🎯 Presiona un botón para responder`

      const buttons = [
        { buttonId: `${usedPrefix}trivia A`, buttonText: { displayText: `A) ${q.options[0].substring(0, 15)}` }, type: 1 },
        { buttonId: `${usedPrefix}trivia B`, buttonText: { displayText: `B) ${q.options[1].substring(0, 15)}` }, type: 1 },
        { buttonId: `${usedPrefix}trivia C`, buttonText: { displayText: `C) ${q.options[2].substring(0, 15)}` }, type: 1 }
      ]

      await conn.sendMessage(m.chat, { image: { url: img }, caption, buttons, viewOnce: true }, { quoted: m })
      await m.react("🎯")
      return
    }

    if (command === "triviascore") {
      if (userScores.size === 0) {
        return conn.reply(m.chat, "📭 Nadie ha participado aún en la trivia.", m)
      }

      const sorted = [...userScores.entries()].sort((a, b) => b[1] - a[1])
      const top = sorted.slice(0, 10)
      const mentions = top.map(([u]) => u)

      let ranking = `*🏆 RANKING TRIVIA 🏆*\n\n`
      for (let i = 0; i < top.length; i++) {
        ranking += `${i + 1}. @${top[i][0].split("@")[0]} — 🏅 *${top[i][1]} pts*\n`
      }

      const img = triviaImages[Math.floor(Math.random() * triviaImages.length)]

      await conn.sendMessage(m.chat, { image: { url: img }, caption: ranking, mentions }, { quoted: m })
      await m.react("🏆")
    }
  } catch (err) {
    console.error(err)
    await conn.reply(m.chat, "⚠️ Ocurrió un error ejecutando la trivia.", m)
  }
}

handler.help = ["trivia", "triviascore"]
handler.tags = ["game"]
handler.command = ["trivia", "triviascore"]

export default handler
