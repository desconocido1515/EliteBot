// plugins/horoscopo_adonix.js

import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const STYLED_THUMBNAIL = 'https://raw.githubusercontent.com/IrokzDal/data/main/1776950526519.jpeg';
const STYLED_SOURCE_URL = 'https://api-Elite.Bot.click';

const DOCUMENT_TEMPLATE = {
  url: 'https://mmg.whatsapp.net/v/t62.7119-24/539012045_745537058346694_1512031191239726227_n.enc',
  mimetype: 'application/pdf',
  fileSha256: '+gmvvCB6ckJSuuG3ZOzHsTBgRAukejv1nnfwGSSSS/4=',
  fileLength: '999999999999',
  pageCount: 0,
  mediaKey: 'MWO6fI223TY8T0i9onNcwNBBPldWfwp1j1FPKCiJFzw=',
  fileName: ' ',
  fileEncSha256: 'ZS8v9tio2un1yWVOOG3lwBxiP+mNgaKPY9+wl5pEoi8=',
  directPath: '/v/t62.7119-24/539012045_745537058346694_1512031191239726227_n.enc'
};

const buildDocumentMessage = () => ({
  ...DOCUMENT_TEMPLATE,
  mediaKeyTimestamp: String(Math.floor(Date.now() / 1000))
});

const safeDomainFromUrl = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return 'horoscopo.elitebot.global';
  }
};

const createStyledInteractive = ({
  mentionJids,
  externalTitle,
  bodyText,
  footerText,
  sections,
  listTitle,
  buttonTitle,
  buttons = [],
  thumbUrl = STYLED_THUMBNAIL,
  sourceUrl = STYLED_SOURCE_URL,
  limitedText,
  limitedCopyCode,
  tapDescription
}) => {
  const nativeButtons = [...buttons];

  if (sections && sections.length) {
    nativeButtons.unshift({
      name: 'single_select',
      buttonParamsJson: JSON.stringify({
        title: buttonTitle || 'Lista de selección',
        sections,
        has_multiple_buttons: true
      })
    });
  }

  const dividerIndices = nativeButtons.map((_, idx) => idx + 1);
  const domain = safeDomainFromUrl(sourceUrl);

  const params = {
    bottom_sheet: {
      in_thread_buttons_limit: Math.max(1, nativeButtons.length),
      divider_indices: dividerIndices,
      list_title: listTitle || 'Selecciona una opción',
      button_title: buttonTitle || 'Abrir'
    },
    tap_target_configuration: {
      title: externalTitle,
      description: tapDescription || (bodyText ? bodyText.split('\n')[0].slice(0, 80) : ''),
      canonical_url: sourceUrl,
      domain,
      button_index: 0
    }
  };

  if (limitedText) {
    params.limited_time_offer = {
      text: limitedText,
      url: sourceUrl,
      copy_code: limitedCopyCode || '',
      expiration_time: Math.floor(Date.now() / 1000) + 3600
    };
  }

  const messageParamsJson = JSON.stringify(params);

  return {
    contextInfo: {
      mentionedJid: mentionJids,
      externalAdReply: {
        title: externalTitle,
        body: '',
        thumbnailUrl: thumbUrl,
        sourceUrl,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    },
    header: {
      documentMessage: buildDocumentMessage(),
      hasMediaAttachment: true
    },
    body: {
      text: bodyText || ' '
    },
    footer: {
      text: footerText || ''
    },
    nativeFlowMessage: {
      messageParamsJson,
      buttons: nativeButtons
    }
  };
};

const sendStyledInteractive = async (conn, chatId, interactiveMessage, quoted) => {
  const content = {
    viewOnceMessage: {
      message: {
        interactiveMessage
      }
    }
  };
  const userJid = conn?.user?.id || conn?.user?.jid;
  const msg = generateWAMessageFromContent(chatId, content, { userJid, quoted });
  await conn.relayMessage(chatId, msg.message, { messageId: msg.key.id });
};

async function makeFkontak() {
  try {
    const res = await fetch('https://i.postimg.cc/rFfVL8Ps/image.jpg');
    const thumb2 = Buffer.from(await res.arrayBuffer());
    return {
      key: { participants: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false, id: 'Halo' },
      message: { locationMessage: { name: 'Horóscopo', jpegThumbnail: thumb2 } },
      participant: '0@s.whatsapp.net'
    };
  } catch {
    return null;
  }
}

// ==================== DATOS DE HORÓSCOPO CON 5 TEXTOS CADA UNO ====================

// ARIES
const ariesPredicciones = [
  'Hoy tu energía estará al máximo, perfecto para iniciar proyectos audaces.',
  'Un desafío laboral revelará tu verdadero potencial de liderazgo.',
  'Tu creatividad estará en su punto más alto, aprovecha para innovar.',
  'Una discusión familiar se resolverá favorablemente si controlas tu temperamento.',
  'La suerte estará de tu lado en decisiones importantes que tomes hoy.'
];
const ariesAmor = [
  'El amor llegará de forma inesperada con alguien que comparte tu pasión.',
  'Una llama del pasado podría reaparecer, evalúa si vale la pena.',
  'Tu pareja te sorprenderá con un gesto romántico inesperado.',
  'Si estás soltero, hoy podrías conocer a alguien especial en el trabajo.',
  'La comunicación con tu ser amado fluirá mejor que nunca.'
];
const ariesDinero = [
  'Tus finanzas mejorarán gracias a una oportunidad que surgirá hoy.',
  'Evita gastos impulsivos, la estabilidad llegará pronto.',
  'Un ingreso extra inesperado mejorará tu situación económica.',
  'Es buen momento para invertir en educación o desarrollo personal.',
  'Revisa tus cuentas, encontrarás un error que te beneficiará.'
];
const ariesSalud = [
  'Excelente energía física, ideal para hacer ejercicio.',
  'Tu sistema inmunológico está fuerte, aprovecha para activarte.',
  'Cuida tu alimentación, evita excesos que puedan afectarte.',
  'Practica meditación para equilibrar tu mente activa.',
  'El descanso será clave para mantener tu vitalidad.'
];

// TAURO
const tauroPredicciones = [
  'Tus finanzas mejorarán notablemente gracias a decisiones pasadas.',
  'La paciencia que has mostrado finalmente dará sus frutos.',
  'Un cambio en tu espacio vital traerá mayor armonía.',
  'Descubrirás un talento oculto que te sorprenderá.',
  'La estabilidad emocional será tu mayor aliada hoy.'
];
const tauroAmor = [
  'Una relación antigua resurgirá con nuevos significados.',
  'El romance florecerá en los lugares más inesperados.',
  'Tu pareja valorará tu lealtad y compromiso.',
  'Si estás soltero, alguien del pasado podría volver.',
  'Un mensaje de amor te alegrará el día.'
];
const tauroDinero = [
  'Buen momento para inversiones a largo plazo.',
  'Un negocio pendiente se concretará favorablemente.',
  'Evita prestar dinero, podrías tener problemas para recuperarlo.',
  'Una herencia o regalo inesperado mejorará tus finanzas.',
  'El trabajo duro de hoy se traducirá en ganancias mañana.'
];
const tauroSalud = [
  'Mantén una rutina de ejercicios constante.',
  'Cuida tu garganta y sistema respiratorio.',
  'La alimentación balanceada será tu mejor medicina.',
  'Hoy es buen día para comenzar una dieta saludable.',
  'El estrés disminuirá si dedicas tiempo a relajarte.'
];

// GÉMINIS
const geminisPredicciones = [
  'Una conversación casual podría convertirse en una gran oportunidad laboral.',
  'Tu ingenio te sacará de un apuro inesperado.',
  'Viajes cortos traerán perspectivas reveladoras sobre tu vida.',
  'La comunicación será tu mejor herramienta hoy.',
  'Dos opciones interesantes se presentarán simultáneamente.'
];
const geminisAmor = [
  'Dos opciones interesantes se presentarán en el amor.',
  'Una declaración inesperada cambiará tu vida sentimental.',
  'La honestidad será clave para fortalecer tu relación.',
  'Si estás soltero, hoy podrías conocer a alguien muy especial.',
  'Las redes sociales te conectarán con un viejo amor.'
];
const geminisDinero = [
  'Evita gastos innecesarios, la economía estará inestable.',
  'Un negocio paralelo podría generar ingresos extras.',
  'La prudencia financiera te dará tranquilidad.',
  'Revisa tus inversiones, hay oportunidades de mejora.',
  'Un familiar te ayudará económicamente si lo necesitas.'
];
const geminisSalud = [
  'Cuida tu sistema respiratorio y evita cambios bruscos.',
  'La mente activa necesita descanso, medita un rato.',
  'Haz ejercicio al aire libre para recargar energías.',
  'Evita el exceso de cafeína, te pondrá nervioso.',
  'La risa será tu mejor medicina hoy.'
];

// CÁNCER
const cancerPredicciones = [
  'Un sueño revelador te dará claridad sobre una situación confusa.',
  'La energía lunar intensificará tu intuición esta semana.',
  'Tu hogar se convertirá en un centro de armonía y creatividad.',
  'Un reencuentro familiar traerá sanación emocional.',
  'La nostalgia te invadirá, pero será constructiva.'
];
const cancerAmor = [
  'Un reencuentro familiar traerá sanación emocional.',
  'La vulnerabilidad te acercará más a tu ser amado.',
  'Un gesto romántico inesperado te robará el aliento.',
  'Si estás soltero, alguien del trabajo te coqueteará.',
  'La familia será el puente para un nuevo amor.'
];
const cancerDinero = [
  'Buen momento para ahorrar y planificar el futuro.',
  'Un ingreso extra relacionado con el hogar se aproxima.',
  'Evita préstamos, podrías tener problemas para pagar.',
  'La estabilidad financiera llegará después de un esfuerzo.',
  'Un regalo inesperado mejorará tu economía.'
];
const cancerSalud = [
  'Cuida tus emociones, medita para mantener la calma.',
  'La alimentación casera te hará bien.',
  'El agua será tu aliada para desintoxicarte.',
  'Descansa lo suficiente, tu cuerpo lo necesita.',
  'Evita discusiones que generen estrés innecesario.'
];

// LEO
const leoPredicciones = [
  'Tu carisma atraerá oportunidades profesionales importantes.',
  'Tu liderazgo inspirará a otros a superarse.',
  'Una inversión creativa dará resultados sorprendentes.',
  'El reconocimiento por tus talentos llegará de forma inesperada.',
  'La confianza en ti mismo abrirá puertas cerradas.'
];
const leoAmor = [
  'Un romance apasionado comenzará bajo cielos favorables.',
  'Tu pareja se sentirá orgullosa de tus logros hoy.',
  'Una cita romántica será inolvidable.',
  'Si estás soltero, alguien admirará tu seguridad.',
  'La pasión estará a flor de piel.'
];
const leoDinero = [
  'Inversión creativa dará resultados sorprendentes.',
  'Un aumento de sueldo o bonificación está en camino.',
  'Evita el juego de azar, la suerte no estará contigo.',
  'Un negocio relacionado con el arte prosperará.',
  'La generosidad te traerá recompensas inesperadas.'
];
const leoSalud = [
  'Alta energía, canalízala bien con ejercicio.',
  'Cuida tu espalda, evita malas posturas.',
  'El corazón necesita cuidados, evita el estrés.',
  'Practica actividades que te diviertan para liberar tensión.',
  'Tu vitalidad estará al máximo hoy.'
];

// VIRGO
const virgoPredicciones = [
  'Tu atención al detalle evitará un error costoso en el trabajo.',
  'Un hábito saludable que inicies hoy tendrá efectos duraderos.',
  'Ayudarás a alguien cercano a resolver un problema práctico.',
  'La organización será tu mejor aliada para alcanzar metas.',
  'Un proyecto pendiente finalmente verá la luz.'
];
const virgoAmor = [
  'Ayudarás a alguien cercano a resolver un problema práctico.',
  'La sinceridad fortalecerá tu relación actual.',
  'Un malentendido se aclarará favorablemente.',
  'Si estás soltero, hoy podrías conocer a alguien ordenado y metódico.',
  'Un gesto de servicio a tu pareja será muy valorado.'
];
const virgoDinero = [
  'Tu organización financiera te dará una ventaja inesperada.',
  'Un descuento o promoción te beneficiará hoy.',
  'Evita las compras por impulso, analiza bien cada gasto.',
  'Un dinero que creías perdido aparecerá.',
  'La planificación será clave para el éxito económico.'
];
const virgoSalud = [
  'Cuida tu alimentación, evita excesos.',
  'La limpieza de tu entorno mejorará tu salud.',
  'Hoy es buen día para comenzar un detox.',
  'El intestino necesita cuidados, come fibra.',
  'La rutina de ejercicios te dará resultados visibles.'
];

// LIBRA
const libraPredicciones = [
  'Resolverás un conflicto con tu diplomacia característica.',
  'El equilibrio entre trabajo y vida personal mejorará notablemente.',
  'Una colaboración artística traerá satisfacción creativa.',
  'La justicia estará de tu lado en un asunto importante.',
  'Tu buen gusto atraerá oportunidades sociales interesantes.'
];
const libraAmor = [
  'Una colaboración artística traerá satisfacción creativa en el amor.',
  'La armonía familiar será tu prioridad hoy.',
  'Un detalle romántico mejorará tu relación significativamente.',
  'Si estás soltero, alguien con tus mismos gustos te atraerá.',
  'La música será el puente para un nuevo romance.'
];
const libraDinero = [
  'Decisiones financieras acertadas te darán tranquilidad.',
  'Un socio de negocios traerá buenas noticias.',
  'Evita las disputas por dinero, no valen la pena.',
  'Una herencia o legado está en camino.',
  'La belleza estética puede generar ingresos hoy.'
];
const libraSalud = [
  'Busca armonía mental para mantener la paz interior.',
  'La meditación te ayudará a equilibrar energías.',
  'Hoy es buen día para un tratamiento de belleza o spa.',
  'Evita decisiones impulsivas sobre tu salud.',
  'La terapia de pareja fortalecerá tu bienestar emocional.'
];

// ESCORPIO
const escorpioPredicciones = [
  'Descubrirás información oculta que cambiará tu perspectiva.',
  'Tu determinación superará obstáculos que parecían imposibles.',
  'Un proyecto secreto comenzará a dar frutos inesperados.',
  'La intensidad será tu mejor aliada para lograr metas.',
  'Transformarás una debilidad percibida en tu mayor fortaleza.'
];
const escorpioAmor = [
  'Tu intensidad emocional atraerá a alguien especial hoy.',
  'Una conversación profunda fortalecerá tu relación.',
  'Los celos podrían aparecer, controla tus emociones.',
  'Si estás soltero, alguien misterioso te cautivará.',
  'La pasión estará en su punto máximo esta noche.'
];
const escorpioDinero = [
  'Transformarás una debilidad percibida en tu mayor fortaleza financiera.',
  'Una inversión arriesgada podría dar buenos resultados.',
  'Evita los secretos financieros, la transparencia es clave.',
  'Un dinero oculto saldrá a la luz.',
  'El trabajo en equipo multiplicará tus ganancias.'
];
const escorpioSalud = [
  'Alta energía emocional, canalízala positivamente.',
  'La terapia psicológica te ayudará a liberar tensiones.',
  'Cuida tu sistema reproductivo.',
  'El agua y la hidratación serán vitales hoy.',
  'El sexo saludable mejorará tu bienestar general.'
];

// SAGITARIO
const sagitarioPredicciones = [
  'Una oportunidad de viaje se presentará inesperadamente.',
  'Tu optimismo inspirará a alguien que pasa por dificultades.',
  'Aprenderás algo que expandirá significativamente tus horizontes.',
  'La aventura te llamará, no le temas.',
  'La filosofía de vida te dará respuestas importantes.'
];
const sagitarioAmor = [
  'Una aventura romántica exótica está en tu futuro cercano.',
  'Tu pareja querrá explorar nuevos horizontes contigo.',
  'Si estás soltero, el amor puede llegar de otro país.',
  'La honestidad será clave para avanzar en tu relación.',
  'Un viaje en pareja fortalecerá el vínculo.'
];
const sagitarioDinero = [
  'Buena racha económica, aprovecha para invertir.',
  'Un negocio relacionado con viajes prosperará.',
  'Evita las apuestas, la suerte no está garantizada.',
  'Un extranjero podría ayudarte con tus finanzas.',
  'La educación financiera te dará nuevas perspectivas.'
];
const sagitarioSalud = [
  'Excelente vitalidad, ideal para actividades al aire libre.',
  'Cuida tus caderas y piernas al hacer ejercicio.',
  'El optimismo será tu mejor medicina.',
  'Hoy es buen día para comenzar una rutina de ejercicios.',
  'La naturaleza te recargará de energía positiva.'
];

// CAPRICORNIO
const capricornioPredicciones = [
  'Tu disciplina dará resultados tangibles en el trabajo.',
  'Un mentor te ofrecerá consejos valiosos para tu carrera.',
  'La estabilidad financiera que buscas está más cerca de lo que crees.',
  'Un proyecto a largo plazo finalmente mostrará progreso.',
  'Tu reputación profesional alcanzará nuevos niveles.'
];
const capricornioAmor = [
  'La estabilidad emocional que buscas llegará a tu vida amorosa.',
  'Tu pareja valorará tu responsabilidad y compromiso.',
  'Un compromiso importante está en el horizonte.',
  'Si estás soltero, alguien mayor podría interesarte.',
  'La confianza será la base para avanzar.'
];
const capricornioDinero = [
  'Inversiones seguras prosperarán como lo planeaste.',
  'Un ascenso o aumento salarial está muy cerca.',
  'Evita mezclar amistad con negocios, podría salir mal.',
  'La disciplina financiera dará sus frutos pronto.',
  'Un familiar te ayudará económicamente con un proyecto.'
];
const capricornioSalud = [
  'Cuida tus articulaciones y huesos.',
  'La rutina de ejercicios debe mantenerse, no bajes los brazos.',
  'El descanso programado mejorará tu rendimiento.',
  'La disciplina en la alimentación dará resultados.',
  'Evita el sedentarismo, tu cuerpo necesita movimiento.'
];

// ACUARIO
const acuarioPredicciones = [
  'Una idea revolucionaria cambiará tu perspectiva hoy.',
  'Conectarás con alguien que comparte tus ideales más elevados.',
  'Lo inesperado será tu aliado en situaciones importantes.',
  'Tu círculo social se expandirá con personas influyentes.',
  'La innovación te llevará al éxito.'
];
const acuarioAmor = [
  'Conectarás con alguien que comparte tus ideales más elevados.',
  'Una amistad podría convertirse en algo más hoy.',
  'La libertad será fundamental en tu relación actual.',
  'Si estás soltero, alguien con pensamiento innovador te atraerá.',
  'La tecnología te acercará a un viejo amor.'
];
const acuarioDinero = [
  'Oportunidades innovadoras generarán ganancias inesperadas.',
  'Un proyecto tecnológico podría ser muy rentable.',
  'Evita las inversiones tradicionales, busca algo nuevo.',
  'La creatividad aplicada a los negocios dará frutos.',
  'Una comunidad o grupo te ayudará económicamente.'
];
const acuarioSalud = [
  'Alta energía mental, canalízala con actividades creativas.',
  'La desconexión tecnológica te ayudará a relajarte.',
  'Hoy es buen día para probar una terapia alternativa.',
  'Cuida tus tobillos y pantorrillas.',
  'La meditación grupal te beneficiará.'
];

// PISCIS
const piscisPredicciones = [
  'Tu intuición te guiará hacia una decisión crucial.',
  'El arte o la música jugarán un papel sanador en tu vida.',
  'Un sueño revelador contendrá mensajes importantes.',
  'Ayudarás a alguien de manera significativa sin esperar nada a cambio.',
  'La conexión espiritual se profundizará esta semana.'
];
const piscisAmor = [
  'Una conexión espiritual se profundizará con tu pareja.',
  'El romanticismo estará a flor de piel hoy.',
  'Si estás soltero, alguien artístico te cautivará.',
  'Un gesto poético conquistará tu corazón.',
  'La empatía fortalecerá tu relación actual.'
];
const piscisDinero = [
  'Ayudarás a alguien de manera significativa sin esperar nada a cambio.',
  'Un ingreso relacionado con el arte está en camino.',
  'Evita las estafas piramidales, confía en tu intuición.',
  'La caridad te traerá bendiciones económicas.',
  'Un sueño te dará una idea para generar dinero.'
];
const piscisSalud = [
  'Cuida tus pies y descansa lo suficiente.',
  'La natación o actividades acuáticas te harán bien.',
  'Hoy es buen día para una terapia de relajación.',
  'La música será tu mejor medicina para el estrés.',
  'Tu intuición te alertará sobre cualquier malestar.'
];

// NÚMEROS Y COLORES ALEATORIOS
function getRandomNumber() {
  return Math.floor(Math.random() * 9) + 1;
}

function getRandomColor() {
  const colores = ['Rojo', 'Verde', 'Azul', 'Amarillo', 'Morado', 'Naranja', 'Rosa', 'Blanco', 'Negro', 'Dorado', 'Plateado', 'Turquesa'];
  return colores[Math.floor(Math.random() * colores.length)];
}

// ==================== SIGNOS CON TODOS LOS TEXTOS ====================
const horoscopos = {
  aries: { nombre: '♈️ Aries', fecha: '21 mar - 19 abr', predicciones: ariesPredicciones, amores: ariesAmor, dineros: ariesDinero, saluds: ariesSalud },
  tauro: { nombre: '♉️ Tauro', fecha: '20 abr - 20 may', predicciones: tauroPredicciones, amores: tauroAmor, dineros: tauroDinero, saluds: tauroSalud },
  geminis: { nombre: '♊️ Géminis', fecha: '21 may - 20 jun', predicciones: geminisPredicciones, amores: geminisAmor, dineros: geminisDinero, saluds: geminisSalud },
  cancer: { nombre: '♋️ Cáncer', fecha: '21 jun - 22 jul', predicciones: cancerPredicciones, amores: cancerAmor, dineros: cancerDinero, saluds: cancerSalud },
  leo: { nombre: '♌️ Leo', fecha: '23 jul - 22 ago', predicciones: leoPredicciones, amores: leoAmor, dineros: leoDinero, saluds: leoSalud },
  virgo: { nombre: '♍️ Virgo', fecha: '23 ago - 22 sep', predicciones: virgoPredicciones, amores: virgoAmor, dineros: virgoDinero, saluds: virgoSalud },
  libra: { nombre: '♎️ Libra', fecha: '23 sep - 22 oct', predicciones: libraPredicciones, amores: libraAmor, dineros: libraDinero, saluds: libraSalud },
  escorpio: { nombre: '♏️ Escorpio', fecha: '23 oct - 21 nov', predicciones: escorpioPredicciones, amores: escorpioAmor, dineros: escorpioDinero, saluds: escorpioSalud },
  sagitario: { nombre: '♐️ Sagitario', fecha: '22 nov - 21 dic', predicciones: sagitarioPredicciones, amores: sagitarioAmor, dineros: sagitarioDinero, saluds: sagitarioSalud },
  capricornio: { nombre: '♑️ Capricornio', fecha: '22 dic - 19 ene', predicciones: capricornioPredicciones, amores: capricornioAmor, dineros: capricornioDinero, saluds: capricornioSalud },
  acuario: { nombre: '♒️ Acuario', fecha: '20 ene - 18 feb', predicciones: acuarioPredicciones, amores: acuarioAmor, dineros: acuarioDinero, saluds: acuarioSalud },
  piscis: { nombre: '♓️ Piscis', fecha: '19 feb - 20 mar', predicciones: piscisPredicciones, amores: piscisAmor, dineros: piscisDinero, saluds: piscisSalud }
};

const signosList = [
  { key: 'aries', label: '♈️ Horóscopo Aries' },
  { key: 'tauro', label: '♉️ Horóscopo Tauro' },
  { key: 'geminis', label: '♊️ Horóscopo Géminis' },
  { key: 'cancer', label: '♋️ Horóscopo Cáncer' },
  { key: 'leo', label: '♌️ Horóscopo Leo' },
  { key: 'virgo', label: '♍️ Horóscopo Virgo' },
  { key: 'libra', label: '♎️ Horóscopo Libra' },
  { key: 'escorpio', label: '♏️ Horóscopo Escorpio' },
  { key: 'sagitario', label: '♐️ Horóscopo Sagitario' },
  { key: 'capricornio', label: '♑️ Horóscopo Capricornio' },
  { key: 'acuario', label: '♒️ Horóscopo Acuario' },
  { key: 'piscis', label: '♓️ Horóscopo Piscis' }
];

async function sendHoroscopoChooser(m, conn, usedPrefix) {
  let fkontak = await makeFkontak();
  if (!fkontak) fkontak = m;
  
  const rows = signosList.map((signo, index) => ({
    title: `${index + 1}. ${signo.label}`,
    description: `Consulta el horóscopo de ${signo.label.split(' ')[1]}`,
    id: `horoscopo_${signo.key}`
  }));

  const sections = [{ title: '📜 SIGNOS DEL ZODIACO', highlight_label: '🔮', rows }];

  const interactiveMessage = createStyledInteractive({
    mentionJids: [m.sender],
    externalTitle: '🌟 HORÓSCOPO DEL DÍA 🌟',
    bodyText: 'Selecciona tu signo zodiacal para conocer tu predicción diaria.\n\n✨ Amor, dinero, salud y más ✨',
    footerText: 'Horóscopo Elite Bot Global ',
    sections,
    listTitle: 'Signos del Zodiaco',
    buttonTitle: 'Ver signos',
    buttons: [],
    thumbUrl: STYLED_THUMBNAIL,
    sourceUrl: STYLED_SOURCE_URL,
    limitedText: '🔮 ¡HOLA BUEN DÍA!',
    limitedCopyCode: 'Confía en el universo',
    tapDescription: 'Consulta tu horóscopo diario gratis'
  });

  await sendStyledInteractive(conn, m.chat, interactiveMessage, fkontak);
  return true;
}

async function mostrarHoroscopo(m, conn, signoKey) {
  const signo = horoscopos[signoKey];
  if (!signo) return;
  
  // Seleccionar textos aleatorios
  const prediccion = signo.predicciones[Math.floor(Math.random() * signo.predicciones.length)];
  const amor = signo.amores[Math.floor(Math.random() * signo.amores.length)];
  const dinero = signo.dineros[Math.floor(Math.random() * signo.dineros.length)];
  const salud = signo.saluds[Math.floor(Math.random() * signo.saluds.length)];
  const numeroSuerte = getRandomNumber();
  const colorFavorable = getRandomColor();
  
  const fecha = new Date().toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  
  const mensaje = `☑️ *${signo.nombre}*
📅 *Fecha:* ${fecha}
📆 *Período:* ${signo.fecha}

🔮 *Predicción:* ${prediccion}

💕 *Amor:* ${amor}
💰 *Dinero:* ${dinero}
💪 *Salud:* ${salud}

✨ *Número de la suerte:* ${numeroSuerte}
🎨 *Color favorable:* ${colorFavorable}

━━━━━━━━━━━━━━━━━━━
© Elite Bot Global - Since 2023®`;

  await conn.sendMessage(m.chat, { react: { text: '🔮', key: m.key } });
  await conn.reply(m.chat, mensaje, m, rcanal);
}

// ==================== HANDLER PRINCIPAL ====================
let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) {
    return sendHoroscopoChooser(m, conn, usedPrefix);
  }
  
  const signoKey = text.toLowerCase().trim();
  if (!horoscopos[signoKey]) {
    return conn.reply(m.chat, `☑️ *SIGNO NO VÁLIDO*\n\n.horoscopo aries, tauro, geminis, cancer, leo, virgo, libra, escorpio, sagitario, capricornio, acuario, piscis`, m, rcanal);
  }
  
  await mostrarHoroscopo(m, conn, signoKey);
};

// ==================== CAPTURAR RESPUESTA DE BOTONES ====================
handler.before = async function (m, { conn }) {
  try {
    const msg = m.message || {};
    let selectedId = null;
    
    const irm = msg.interactiveResponseMessage;
    if (!selectedId && irm?.nativeFlowResponseMessage) {
      try {
        const params = JSON.parse(irm.nativeFlowResponseMessage.paramsJson || '{}');
        if (typeof params.id === 'string') selectedId = params.id;
      } catch {}
    }
    
    const lrm = msg.listResponseMessage;
    if (!selectedId && lrm?.singleSelectReply?.selectedRowId) selectedId = lrm.singleSelectReply.selectedRowId;
    
    const brm = msg.buttonsResponseMessage;
    if (!selectedId && brm?.selectedButtonId) selectedId = brm.selectedButtonId;
    
    if (!selectedId) return false;
    
    if (selectedId && selectedId.startsWith('horoscopo_')) {
      const signoKey = selectedId.replace('horoscopo_', '');
      await mostrarHoroscopo(m, conn, signoKey);
      return true;
    }
    
    return false;
  } catch { return false; }
};

handler.help = ['horoscopo'];
handler.tags = ['horoscope'];
handler.command = /^(horoscopo|horóscopo)$/i;

export default handler;
