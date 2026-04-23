// plugins/mensajes.js

import fetch from 'node-fetch';
import { sticker } from '../../lib/sticker.js';

// Configuración de imágenes por comando (CAMBIA AQUÍ LAS RUTAS DE CADA COMANDO)
const imagenes = {
  buenasnoches: 'https://raw.githubusercontent.com/desconocido1515/desco/main/media/noche.jpg',
  buenosdias: 'https://raw.githubusercontent.com/desconocido1515/desco/main/media/dias.jpg',
  buenastardes: 'https://raw.githubusercontent.com/desconocido1515/desco/main/media/tardes.jpg',
  carta1: 'https://raw.githubusercontent.com/desconocido1515/desco/main/media/carta2.jpg',
  carta2: 'https://raw.githubusercontent.com/desconocido1515/desco/main/media/carta2.jpg',
  carta3: 'https://raw.githubusercontent.com/desconocido1515/desco/main/media/carta3.jpg',
  confesion: 'https://raw.githubusercontent.com/desconocido1515/desco/main/media/confesion.jpg'
};

// Emojis por comando
const emojis = {
  buenasnoches: '💤',
  buenosdias: '☀️',
  buenastardes: '🌅',
  carta1: '💌',
  carta2: '💖',
  carta3: '💕',
  confesion: '🤍'
};

// ==================== TEXTOS DE BUENAS NOCHES (7) ====================
const textosBuenasNoches = [
  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑨𝑺 𝑵𝑶𝑪𝑯𝑬𝑺 *⌋* 💌

💤 *${nombreMencionado}*, que tengas dulces sueños y descanses profundamente. Mañana será un nuevo día lleno de oportunidades. 🌙

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenas noches ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑨𝑺 𝑵𝑶𝑪𝑯𝑬𝑺 *⌋* 💌

⭐ *${nombreMencionado}*, que la luna ilumine tus sueños y las estrellas te guíen hacia un descanso reparador. ¡Felices sueños! 🌙

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenas noches ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑨𝑺 𝑵𝑶𝑪𝑯𝑬𝑺 *⌋* 💌

🌜 *${nombreMencionado}*, cierra los ojos y deja que la paz de la noche te envuelva. Mañana te esperan cosas maravillosas. ✨

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenas noches ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑨𝑺 𝑵𝑶𝑪𝑯𝑬𝑺 *⌋* 💌

🌃 *${nombreMencionado}*, que la noche te regale el descanso que mereces y mañana despiertes con energía renovada. 💪

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenas noches ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑨𝑺 𝑵𝑶𝑪𝑯𝑬𝑺 *⌋* 💌

🌌 *${nombreMencionado}*, que los ángeles cuiden tu sueño y mañana despiertes con una sonrisa. Buenas noches, hermoso/a. 💫

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenas noches ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑨𝑺 𝑵𝑶𝑪𝑯𝑬𝑺 *⌋* 💌

🌙 *${nombreMencionado}*, descansa, que la vida es corta y hay que recargar energías para seguir brillando. ¡Hasta mañana! 💤

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenas noches ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑨𝑺 𝑵𝑶𝑪𝑯𝑬𝑺 *⌋* 💌

🦋 *${nombreMencionado}*, que tus sueños sean tan hermosos como tú. Que descanses y mañana sea un día lleno de bendiciones. 🌟

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenas noches ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`
];

// ==================== TEXTOS DE BUENOS DÍAS (7) ====================
const textosBuenosDias = [
  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑶𝑺 𝑫𝑰́𝑨𝑺 *⌋* 💌

☀️ *${nombreMencionado}*, que tengas un hermoso día lleno de bendiciones, alegría y éxito en todo lo que hagas. 🌟

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenos días ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑶𝑺 𝑫𝑰́𝑨𝑺 *⌋* 💌

🌅 *${nombreMencionado}*, levántate con alegría, que el sol brilla para ti hoy. Aprovecha cada momento y sé feliz. 😊

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenos días ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑶𝑺 𝑫𝑰́𝑨𝑺 *⌋* 💌

🌸 *${nombreMencionado}*, hoy es un nuevo comienzo. Deja atrás lo que te pesa y enfócate en lo que te hace feliz. ¡Buenos días! 💪

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenos días ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑶𝑺 𝑫𝑰́𝑨𝑺 *⌋* 💌

🌞 *${nombreMencionado}*, despierta con fe y esperanza. Todo lo que sueñas puede hacerse realidad si trabajas por ello. ¡Éxitos hoy! 🚀

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenos días ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑶𝑺 𝑫𝑰́𝑨𝑺 *⌋* 💌

🌻 *${nombreMencionado}*, que hoy sea un día lleno de aprendizajes y momentos inolvidables. Disfruta cada segundo. ¡Buenos días! 💛

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenos días ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑶𝑺 𝑫𝑰́𝑨𝑺 *⌋* 💌

🌈 *${nombreMencionado}*, cada amanecer es una oportunidad para reinventarse. Hoy puede ser el día que cambie tu vida. ¡Adelante! 💫

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenos días ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑶𝑺 𝑫𝑰́𝑨𝑺 *⌋* 💌

🦋 *${nombreMencionado}*, que la luz del sol ilumine tu camino y te guíe hacia tus metas. ¡Que tengas un día espectacular! 🌟

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenos días ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`
];

// ==================== TEXTOS DE BUENAS TARDES (7) ====================
const textosBuenasTardes = [
  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑨𝑺 𝑻𝑨𝑹𝑫𝑬𝑺 *⌋* 💌

🌅 *${nombreMencionado}*, que tengas una hermosa tarde llena de energía positiva y momentos felices. Disfruta cada instante. 💫

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenas tardes ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑨𝑺 𝑻𝑨𝑹𝑫𝑬𝑺 *⌋* 💌

🌤️ *${nombreMencionado}*, que esta tarde encuentres motivos para sonreír y disfrutar. No dejes que nada ni nadie opaque tu día. 😊

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenas tardes ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑨𝑺 𝑻𝑨𝑹𝑫𝑬𝑺 *⌋* 💌

🍂 *${nombreMencionado}*, la tarde es un regalo para descansar un poco y seguir adelante. Tómate tu tiempo y relájate. 🌿

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenas tardes ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑨𝑺 𝑻𝑨𝑹𝑫𝑬𝑺 *⌋* 💌

🌇 *${nombreMencionado}*, que el atardecer te traiga paz y tranquilidad. Reflexiona sobre lo bueno del día. ¡Buenas tardes! 💛

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenas tardes ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑨𝑺 𝑻𝑨𝑹𝑫𝑬𝑺 *⌋* 💌

🌞 *${nombreMencionado}*, aunque el día avanza, la energía positiva no se acaba. Sigue brillando como siempre. ¡Linda tarde! 💫

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenas tardes ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑨𝑺 𝑻𝑨𝑹𝑫𝑬𝑺 *⌋* 💌

🌸 *${nombreMencionado}*, que esta tarde te regale momentos de felicidad y alegría. Disfruta de cada pequeño detalle. 🦋

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenas tardes ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑩𝑼𝑬𝑵𝑨𝑺 𝑻𝑨𝑹𝑫𝑬𝑺 *⌋* 💌

🌻 *${nombreMencionado}*, la tarde es el momento perfecto para agradecer por todo lo bueno que te ha pasado hoy. ¡Buenas tardes! 💖

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te deseó buenas tardes ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`
];

// ==================== TEXTOS CARTA1 (7) ====================
const textosCarta1 = [
  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💖 *${nombreMencionado}*, escribo esta carta de amor por si alguna vez olvidas cuánto te quiero y cuánto vales. Me he enamorado de esa mujer fuerte, real e inteligente que eres. Porque amo tu humanidad, tu determinación y tu manera de ver las cosas.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💗 *${nombreMencionado}*, desde que llegaste a mi vida, todo cambió. Tus ojos, tu sonrisa, tu forma de ser... Todo en ti es perfecto. Te amo más de lo que las palabras pueden expresar.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💕 *${nombreMencionado}*, cada día que pasa me enamoro más de ti. Eres mi razón de ser, mi motivación y mi mayor felicidad. Gracias por existir.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💞 *${nombreMencionado}*, no hay día que no piense en ti. Tu recuerdo me acompaña a donde voy y me da fuerzas para seguir adelante. Te quiero con todo mi corazón.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💓 *${nombreMencionado}*, eres la persona más especial que he conocido. Tu forma de ver la vida me inspira y me hace querer ser mejor cada día. Te admiro y te amo.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💝 *${nombreMencionado}*, en este mundo lleno de gente, tú eres única. Tu luz brilla con fuerza y me guía en los momentos oscuros. Te amo con locura.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💘 *${nombreMencionado}*, si tuviera que elegir entre respirar y amarte, usaría mi último aliento para decirte lo mucho que te quiero. Eres mi todo.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`
];

// ==================== TEXTOS CARTA2 (7) ====================
const textosCarta2 = [
  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💕 *${nombreMencionado}*, borracho y loco te recuerdo, recuerdo cada caricia que hacía que mi piel se convirtiera en única, recuerdo cada beso que hacía que mis labios fueran fuente de deseo, recuerdo cuanto te amaba y cuanto te deseaba.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💖 *${nombreMencionado}*, en cada latido de mi corazón está tu nombre. En cada pensamiento, tu rostro. Eres mi adicción más hermosa.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💗 *${nombreMencionado}*, tus besos son mi droga favorita. Tus abrazos, mi lugar seguro. Contigo aprendí lo que es el amor verdadero.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💓 *${nombreMencionado}*, recuerdo aquel día en que te vi por primera vez. Supe que algo especial iba a pasar. Y no me equivoqué. Llegaste a mi vida para quedarte.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💞 *${nombreMencionado}*, eres el sueño del cual no quiero despertar. Eres la melodía que quiero escuchar siempre. Eres mi amor eterno.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💝 *${nombreMencionado}*, no importa la distancia ni el tiempo. Mi amor por ti es infinito. Pase lo que pase, siempre estaré aquí para ti.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💘 *${nombreMencionado}*, contigo aprendí que el amor no se busca, se encuentra. Y yo tuve la suerte de encontrarte. Gracias por amarme como soy.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`
];

// ==================== TEXTOS CARTA3 (7) ====================
const textosCarta3 = [
  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💗 *${nombreMencionado}*, vuelvo a ti cada día, curas mis heridas con cada beso que me das, nuestro amor es un sol eterno que nos llevará a la gloria eterna. Eres todo, eres la fiesta de mi corazón.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💖 *${nombreMencionado}*, a tu lado el tiempo se detiene. Cada momento contigo es eterno. No hay lugar en el mundo donde prefiera estar si no es a tu lado.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💕 *${nombreMencionado}*, eres la razón por la que sonrío cada día. Eres mi felicidad, mi paz y mi alegría. Gracias por existir en mi vida.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💓 *${nombreMencionado}*, no hay obstáculo que no pueda superar si estás a mi lado. Eres mi fuerza, mi motivación y mi mayor tesoro.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💞 *${nombreMencionado}*, cada día me enamoro más de ti. Tu risa es mi canción favorita, tu mirada mi lugar favorito. Te amo.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💝 *${nombreMencionado}*, si el amor es un viaje, quiero recorrerlo toda la vida contigo. Eres mi destino, mi hogar y mi todo.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌

💘 *${nombreMencionado}*, desde que te conocí, mi vida tiene más color. Eres el arcoíris después de la tormenta. Te amo más de lo que imaginas.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te dedicó esta carta ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`
];

// ==================== TEXTOS CONFESIÓN (7) ====================
const textosConfesion = [
  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑶𝑵𝑭𝑬𝑺𝑰𝑶́𝑵 *⌋* 💌

🤍 *${nombreMencionado}*, ha pasado tanto tiempo y aún no tienes idea de lo importante que eres para mí, pues no he encontrado la manera de decirte lo que llevo dentro. Por fin he decidido hacerlo y para ello, te escribo esta carta.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te hizo una confesión ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑶𝑵𝑭𝑬𝑺𝑰𝑶́𝑵 *⌋* 💌

💭 *${nombreMencionado}*, desde que te vi supe que eras especial. No sé explicarlo, pero hay algo en ti que me atrapa. Y hoy decidí confesarlo.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te hizo una confesión ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑶𝑵𝑭𝑬𝑺𝑰𝑶́𝑵 *⌋* 💌

🌹 *${nombreMencionado}*, me gustas. Me gusta tu forma de ser, tu forma de hablar, tu forma de ver la vida. Solo quería que lo supieras.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te hizo una confesión ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑶𝑵𝑭𝑬𝑺𝑰𝑶́𝑵 *⌋* 💌

💫 *${nombreMencionado}*, no sé si sea correspondido, pero necesitaba sacar esto de mi pecho. Me gustas más de lo que debería.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te hizo una confesión ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑶𝑵𝑭𝑬𝑺𝑰𝑶́𝑵 *⌋* 💌

🌟 *${nombreMencionado}*, cada vez que te veo, mi corazón late más fuerte. No sé si es amor, pero es algo muy bonito. Quería compartirlo contigo.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te hizo una confesión ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑶𝑵𝑭𝑬𝑺𝑰𝑶́𝑵 *⌋* 💌

💖 *${nombreMencionado}*, siempre he admirado tu forma de ser. Tu energía, tu carisma, tu esencia. Y hoy me animé a decírtelo. Me gustas.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te hizo una confesión ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`,

  (nombreMencionado, nombreUsuario) => `💌 *⌈* 𝑪𝑶𝑵𝑭𝑬𝑺𝑰𝑶́𝑵 *⌋* 💌

💕 *${nombreMencionado}*, no espero nada a cambio, solo quería que supieras que alguien en este mundo piensa en ti más de lo que imaginas. Eres increíble.

━━━━━━━━━━━━━━━━━━━
✨ *${nombreUsuario}* te hizo una confesión ✨
━━━━━━━━━━━━━━━━━━━

© Elite Bot Global - Since 2023®`
];

// Mapeo de textos por comando
const textosPorComando = {
  buenasnoches: textosBuenasNoches,
  buenosdias: textosBuenosDias,
  buenastardes: textosBuenasTardes,
  carta1: textosCarta1,
  carta2: textosCarta2,
  carta3: textosCarta3,
  confesion: textosConfesion
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    // Validar mención o respuesta
    let mentionedJid = await m.mentionedJid;
    let usuario = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null;
    
    if (!usuario) {
      return conn.reply(m.chat, `☑️ ETIQUETA O RESPONDE AL MENSAJE DE LA PERSONA\n\n📌 *Ejemplo:*\n.${command} @usuario`, m, rcanal);
    }
    
    if (usuario === m.sender) {
      return conn.reply(m.chat, `☑️ No puedes enviarte esto a ti mismo. Etiqueta o responde a otra persona.`, m, rcanal);
    }
    
    const nombreUsuario = m.pushName || m.sender.split('@')[0];
    const nombreMencionado = await conn.getName(usuario);
    
    // Obtener los textos del comando
    const textosArray = textosPorComando[command];
    if (!textosArray) return;
    
    // Seleccionar un texto aleatorio
    const textoFunc = textosArray[Math.floor(Math.random() * textosArray.length)];
    const textoFinal = textoFunc(nombreMencionado, nombreUsuario);
    const emoji = emojis[command] || '💌';
    const imagenUrl = imagenes[command] || 'https://raw.githubusercontent.com/desconocido1515/desco/main/media/icono.jpg';
    
    // Reaccionar al mensaje
    await conn.sendMessage(m.chat, {
      react: { text: emoji, key: m.key }
    });
    
    // Enviar imagen con el mensaje
    await conn.sendMessage(m.chat, {
      image: { url: imagenUrl },
      caption: textoFinal,
      mentions: [usuario, m.sender]
    });
    
  } catch (error) {
    console.error('Error:', error);
    await conn.reply(m.chat, `☑️ Ocurrió un error al enviar el mensaje.`, m, rcanal);
  }
};

handler.command = /^(buenasnoches|buenosdias|buenastardes|carta1|carta2|carta3|confesion|confesión)$/i;
handler.group = true;

export default handler;
