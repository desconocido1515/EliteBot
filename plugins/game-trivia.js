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
      // Si hay argumento, es una respuesta (viene del botón)
      if (args[0] && /^[ABC]$/i.test(args[0])) {
        const session = triviaSessions.get(m.chat)
        
        if (!session || session.answered) {
          return conn.reply(m.chat, `☑️ 𝚄𝚂𝙰 *${usedPrefix}trivia* 𝙿𝙰𝚁𝙰 𝚄𝙽𝙰 𝙽𝚄𝙴𝚅𝙰 𝙿𝚁𝙴𝙶𝚄𝙽𝚃𝙰`, m, rcanal)
        }

        const userAnswer = args[0].toUpperCase()
        const correctAnswer = questions[session.index].answer
        const isCorrect = userAnswer === correctAnswer

        const userId = m.sender
        if (!userScores.has(userId)) userScores.set(userId, 0)
        if (isCorrect) userScores.set(userId, userScores.get(userId) + 1)

        const points = userScores.get(userId)
        
        let respuestaTexto = ""
        if (isCorrect) {
          respuestaTexto = `☑️ *✨ ¡CORRECTO! ✨*\n\n🎉 La respuesta correcta era: *${questions[session.index].options[correctAnswer === 'A' ? 0 : correctAnswer === 'B' ? 1 : 2]}*\n\n🏅 𝚃𝚄 𝙿𝚄𝙽𝚃𝙰𝙹𝙴: *${points}* 𝚙𝚞𝚗𝚝𝚘𝚜\n\n📝 𝚄𝚂𝙰 *${usedPrefix}trivia* 𝙿𝙰𝚁𝙰 𝙻𝙰 𝚂𝙸𝙶𝚄𝙸𝙴𝙽𝚃𝙴 𝙿𝚁𝙴𝙶𝚄𝙽𝚃𝙰`
        } else {
          respuestaTexto = `☑️ *💔 INCORRECTO 💔*\n\n❌ 𝚃𝚄 𝚁𝙴𝚂𝙿𝚄𝙴𝚂𝚃𝙰: *${userAnswer}*\n✅ 𝚁𝙴𝚂𝙿𝚄𝙴𝚂𝚃𝙰 𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙰: *${correctAnswer}*\n📖 𝚁𝙴𝚂𝙿𝚄𝙴𝚂𝚃𝙰: *${questions[session.index].options[correctAnswer === 'A' ? 0 : correctAnswer === 'B' ? 1 : 2]}*\n\n🏅 𝚃𝚄 𝙿𝚄𝙽𝚃𝙰𝙹𝙴: *${points}* 𝚙𝚞𝚗𝚝𝚘𝚜\n\n📝 𝚄𝚂𝙰 *${usedPrefix}trivia* 𝙿𝙰𝚁𝙰 𝙻𝙰 𝚂𝙸𝙶𝚄𝙸𝙴𝙽𝚃𝙴 𝙿𝚁𝙴𝙶𝚄𝙽𝚃𝙰`
        }

        await conn.reply(m.chat, respuestaTexto, m, rcanal)
        await m.react(isCorrect ? "✅" : "❌")

        triviaSessions.set(m.chat, { ...session, answered: true })
        return
      }

      // Si no hay argumento, es una nueva pregunta
      let currentSession = triviaSessions.get(m.chat)
      let availableQuestions = [...questions]

      if (currentSession?.asked?.length) {
        availableQuestions = availableQuestions.filter((_, i) => !currentSession.asked.includes(i))
      }

      if (availableQuestions.length === 0) {
        triviaSessions.delete(m.chat)
        return conn.reply(m.chat, "☑️ 🎉 *𝚈𝙰 𝚁𝙴𝚂𝙿𝚄𝙴𝚂𝚃𝙸𝚂𝚃𝙴 𝚃𝙾𝙳𝙰𝚂 𝙻𝙰𝚂 𝙿𝚁𝙴𝙶𝚄𝙽𝚃𝙰𝚂!* 𝚄𝚂𝙰 *${usedPrefix}trivia* 𝙿𝙰𝚁𝙰 𝚁𝙴𝙸𝙽𝙸𝙲𝙸𝙰𝚁", m, rcanal)
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

      const caption = `☑️ *🎓 𝐓𝐑𝐈𝐕𝐈𝐀 𝐃𝐄 𝐂𝐔𝐋𝐓𝐔𝐑𝐀 🎓*\n\n📖 ${q.question}\n\n🌿 *𝙾𝙿𝙲𝙸𝙾𝙽𝙴𝚂:*\n▸ *A)* ${q.options[0]}\n▸ *B)* ${q.options[1]}\n▸ *C)* ${q.options[2]}\n\n🎯 𝚂𝙴𝙻𝙴𝙲𝙲𝙸𝙾𝙽𝙰 𝚄𝙽𝙰 𝙾𝙿𝙲𝙸𝙾́𝙽`

      const buttons = [
        { buttonId: `${usedPrefix}trivia A`, buttonText: { displayText: `🅰 ${q.options[0].substring(0, 20)}` }, type: 1 },
        { buttonId: `${usedPrefix}trivia B`, buttonText: { displayText: `🅱 ${q.options[1].substring(0, 20)}` }, type: 1 },
        { buttonId: `${usedPrefix}trivia C`, buttonText: { displayText: `🅲 ${q.options[2].substring(0, 20)}` }, type: 1 }
      ]

      await conn.sendMessage(m.chat, { image: { url: img }, caption, buttons, viewOnce: true }, { quoted: m })
      await m.react("🎯")
      return
    }

    if (command === "triviascore") {
      if (userScores.size === 0) {
        return conn.reply(m.chat, "☑️ 📭 𝙽𝙰𝙳𝙸𝙴 𝙷𝙰 𝙿𝙰𝚁𝚃𝙸𝙲𝙸𝙿𝙰𝙳𝙾 𝙰𝚄𝙽 𝙴𝙽 𝙻𝙰 𝚃𝚁𝙸𝚅𝙸𝙰", m, rcanal)
      }

      const sorted = [...userScores.entries()].sort((a, b) => b[1] - a[1])
      const top = sorted.slice(0, 10)
      const mentions = top.map(([u]) => u)

      const ranking = top
        .map(([user, score], i) => `*${i + 1}.* @${user.split("@")[0]} — 🏅 *${score} pts*`)
        .join("\n")

      const caption = `☑️ *🏆 𝐑𝐀𝐍𝐊𝐈𝐍𝐆 𝐓𝐑𝐈𝐕𝐈𝐀 🏆*\n\n${ranking}\n\n🎓 𝚂𝙸𝙶𝚄𝙴 𝙿𝙰𝚁𝚃𝙸𝙲𝙸𝙿𝙰𝙽𝙳𝙾`

      const img = triviaImages[Math.floor(Math.random() * triviaImages.length)]

      await conn.sendMessage(m.chat, { image: { url: img }, caption, mentions }, { quoted: m })
      await m.react("🏆")
    }
  } catch (err) {
    console.error(err)
    await conn.reply(m.chat, "☑️ ⚠️ 𝙾𝙲𝚄𝚁𝚁𝙸𝙾́ 𝚄𝙽 𝙴𝚁𝚁𝙾𝚁 𝙴𝙹𝙴𝙲𝚄𝚃𝙰𝙽𝙳𝙾 𝙻𝙰 𝚃𝚁𝙸𝚅𝙸𝙰", m, rcanal)
  }
}

handler.help = ["trivia", "triviascore"]
handler.tags = ["game"]
handler.command = ["trivia", "triviascore"]

export default handler
