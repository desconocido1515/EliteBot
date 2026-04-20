const handler = async (m, {conn, command}) => {
  if (command === 'consejo') {
    const consejo = consejos[Math.floor(Math.random() * consejos.length)];
    const mensaje = `╭─◆────◈⚘◈─────◆─╮\n\n⠀⠀🌟 *Consejo del día* 🌟\n\n❥ ${consejo}\n\n╰─◆────◈⚘◈─────◆─╯`;
    await m.reply(mensaje);
  }

  if (command === 'fraseromantica') {
    const frase_romantica = frasesromanticas[Math.floor(Math.random() * frasesromanticas.length)];
    const mensaje = `╭─◆────◈⚘◈─────◆─╮\n\n⠀⠀💖 *Frase romántica* 💖\n\n❥ ${frase_romantica}\n\n╰─◆────◈⚘◈─────◆─╯`;
    await m.reply(mensaje);
  }

  if (command === 'historiaromantica') {
    // Usar historias locales en lugar de APIs externas
    const historia = historiasRomanticas[Math.floor(Math.random() * historiasRomanticas.length)];
    const mensaje = `╭─◆────◈⚘◈─────◆─╮\n\n📖 *Historia Romántica* 💕\n\n${historia}\n\n╰─◆────◈⚘◈─────◆─╯`;
    await m.reply(mensaje);
  }
};

handler.tags = ['frases'];
handler.command = handler.help = ['consejo', 'fraseromantica', 'historiaromantica'];
export default handler;

// ========== TEXTO LOCAL (sin APIs) ==========
global.frasesromanticas = [
  'Eres la luz que ilumina mi vida en la oscuridad.',
  'Contigo, cada día es una nueva aventura llena de amor.',
  'Tus ojos son el reflejo del cielo en el que quiero perderme.',
  'Cada latido de mi corazón lleva tu nombre.',
  'En tus brazos encontré el hogar que siempre busqué.',
  'Eres el sueño que nunca quiero despertar.',
  'El amor verdadero es estar juntos en las buenas y en las malas.',
  'No existen distancias cuando dos corazones están unidos.',
  'Tus besos son la melodía que acelera mi corazón.',
  'Amar es ver en ti lo que nadie más puede ver.',
  'En cada latido, te llevo conmigo a todas partes.',
  'El amor que siento por ti es mi fuerza y mi inspiración.',
  'Tus palabras dulces son mi alimento emocional diario.',
  'Eres el regalo más preciado que la vida me ha dado.',
  'El tiempo se detiene cuando estoy junto a ti.',
  'En tu sonrisa encuentro la felicidad que buscaba.',
  'Cada día a tu lado es una historia de amor sin fin.',
  'Nuestro amor es como un cuento de hadas hecho realidad.',
  'Tus abrazos son mi refugio en este mundo caótico.',
  'Eres la razón por la que creo en el destino.'
];

global.consejos = [
  'Acepta que los cambios son parte natural de la vida, y aprende a adaptarte a ellos.',
  'Nunca dejes de aprender; el conocimiento es una herramienta poderosa.',
  'Cuida de tu salud física y mental, son fundamentales para una vida plena.',
  'Disfruta de las pequeñas cosas, pues son ellas las que dan sentido a la vida.',
  'Aprende a perdonar, tanto a los demás como a ti mismo, para liberar tu corazón.',
  'Valora el tiempo que pasas con tus seres queridos, es el regalo más valioso.',
  'Sé amable y compasivo con los demás, cada acto de bondad puede marcar la diferencia.',
  'Aprende a decir "no" cuando sea necesario, y establece límites saludables.',
  'Encuentra tiempo para hacer lo que te apasiona, pues eso nutre tu alma.',
  'No te compares con los demás, cada persona tiene su propio camino.'
];

// ========== HISTORIAS ROMÁNTICAS LOCALES ==========
global.historiasRomanticas = [
  `❝El amor inesperado❞

Carlos caminaba bajo la lluvia cuando vio a Valeria refugiada en una parada de autobús. Sin dudarlo, compartió su paraguas con ella. Caminaron juntos solo unas cuadras, pero esa noche ninguno de los dos pudo dormir pensando en el otro. Al día siguiente, Carlos volvió al mismo lugar. Y allí estaba ella, sonriendo, como si el destino los hubiera vuelto a encontrar. Desde entonces, nunca más se separaron.`,

  `❝Cartas sin nombre❞

Ana recibía cada viernes una carta de amor sin remitente. Poemas, versos, promesas… Nunca supo quién las escribía, hasta que un día descubrió que era el chico tímido de la biblioteca, el mismo que siempre le sonreía sin atreverse a hablarle. Ella tomó valor, se acercó a él y le dijo: "La próxima carta, dámela en persona". Y así nació el amor más bonito de la escuela.`,

  `❝El reloj de arena❞

Mateo le regaló a Lucía un reloj de arena con una nota: "Cada grano que cae es un segundo más que quiero estar contigo". Ella se rió al principio, pero con el tiempo entendió que Mateo nunca le falló. Cuando el reloj se acababa, él lo volteaba y le decía: "Siempre empezamos de nuevo, como nuestro amor". Se casaron un año después, y el reloj de arena presidió su mesa de bodas.`,

  `❝Café frío❞

Sofía odiaba el café frío, pero todas las mañanas encontraba una taza en su escritorio. Un día llegó más temprano y descubrió que era su compañero de trabajo, Andrés, quien lo dejaba antes de que ella llegara. "¿Por qué frío?", preguntó. "Porque si lo dejo caliente, te quemas. Prefiero que se enfríe a que te lastimes", respondió. Ahí entendió que el amor a veces se sirve frío, pero con el corazón caliente.`
];
