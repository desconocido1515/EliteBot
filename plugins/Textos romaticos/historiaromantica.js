const handler = async (m, { conn, command }) => {
  if (command === 'consejo') {
    const consejo = consejos[Math.floor(Math.random() * consejos.length)];
    const mensaje = `╭─◆────◈⚘◈─────◆─╮\n\n⠀⠀🌟 *Consejo del día* 🌟\n\n❥ ${consejo}\n\n╰─◆────◈⚘◈─────◆─╯`;
    await conn.reply(m.chat, mensaje, m, rcanal);  // ✅ AGREGADO , rcanal
  }

  if (command === 'fraseromantica') {
    const frase = frasesRomanticas[Math.floor(Math.random() * frasesRomanticas.length)];
    const mensaje = `╭─◆────◈⚘◈─────◆─╮\n\n⠀⠀💖 *Frase Romántica* 💖\n\n❥ ${frase}\n\n╰─◆────◈⚘◈─────◆─╯`;
    await conn.reply(m.chat, mensaje, m, rcanal);  // ✅ AGREGADO , rcanal
  }

  if (command === 'historiaromantica') {
    const historia = historiasRomanticas[Math.floor(Math.random() * historiasRomanticas.length)];
    const mensaje = `╭─◆────◈⚘◈─────◆─╮\n\n⠀⠀📖 *Historia Romántica* 📖\n\n${historia}\n\n╰─◆────◈⚘◈─────◆─╯`;
    await conn.reply(m.chat, mensaje, m, rcanal);  // ✅ AGREGADO , rcanal
  }

  if (command === 'frases') {
    const frase = frasesGenerales[Math.floor(Math.random() * frasesGenerales.length)];
    const mensaje = `╭─◆────◈⚘◈─────◆─╮\n\n⠀⠀📝 *Frase del día* 📝\n\n❥ ${frase}\n\n╰─◆────◈⚘◈─────◆─╯`;
    await conn.reply(m.chat, mensaje, m, rcanal);  // ✅ AGREGADO , rcanal
  }
};

handler.tags = ['frases'];
handler.command = handler.help = ['consejo', 'fraseromantica', 'historiaromantica', 'frases'];
export default handler;

// ========== TEXTOS LOCALES (igual que antes) ==========

global.frasesRomanticas = [
  'Eres la luz que ilumina mi vida en la oscuridad.',
  'Contigo, cada día es una nueva aventura llena de amor.',
  'Tus ojos son el reflejo del cielo en el que quiero perderme.',
  'Cada latido de mi corazón lleva tu nombre.',
  'En tus brazos encontré el hogar que siempre busqué.',
  'Eres el sueño que nunca quiero despertar.',
  'El amor verdadero es estar juntos en las buenas y en las malas.',
  'No existen distancias cuando dos corazones están unidos.',
  'Tus besos son la melodía que acelera mi corazón.',
  'Amar es ver en ti lo que nadie más puede ver.'
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

global.historiasRomanticas = [
  `❝EL AMOR INESPERADO❞\n\nCarlos caminaba bajo la lluvia cuando vio a Valeria refugiada en una parada de autobús. Sin dudarlo, compartió su paraguas con ella. Caminaron juntos solo unas cuadras, pero esa noche ninguno de los dos pudo dormir pensando en el otro. Al día siguiente, Carlos volvió al mismo lugar. Y allí estaba ella, sonriendo, como si el destino los hubiera vuelto a encontrar. Desde entonces, nunca más se separaron.`,
  
  `❝CARTAS SIN NOMBRE❞\n\nAna recibía cada viernes una carta de amor sin remitente. Poemas, versos, promesas… Nunca supo quién las escribía, hasta que un día descubrió que era el chico tímido de la biblioteca, el mismo que siempre le sonreía sin atreverse a hablarle. Ella tomó valor, se acercó a él y le dijo: "La próxima carta, dámela en persona". Y así nació el amor más bonito de la escuela.`,
  
  `❝EL RELOJ DE ARENA❞\n\nMateo le regaló a Lucía un reloj de arena con una nota: "Cada grano que cae es un segundo más que quiero estar contigo". Ella se rió al principio, pero con el tiempo entendió que Mateo nunca le falló. Cuando el reloj se acababa, él lo volteaba y le decía: "Siempre empezamos de nuevo, como nuestro amor". Se casaron un año después, y el reloj de arena presidió su mesa de bodas.`
];

global.frasesGenerales = [
  'La vida es 10% lo que me sucede y 90% cómo reacciono ante ello.',
  'No esperes por el momento perfecto, toma el momento y hazlo perfecto.',
  'El éxito no es la clave de la felicidad. La felicidad es la clave del éxito.',
  'Sé el cambio que quieres ver en el mundo.',
  'No cuentes los días, haz que los días cuenten.',
  'La única manera de hacer un gran trabajo es amar lo que haces.',
  'El futuro depende de lo que hagas hoy.',
  'Cree en ti mismo y todo será posible.',
  'Cada día es una nueva oportunidad para cambiar tu vida.',
  'La felicidad no es algo hecho. Viene de tus propias acciones.'
];
