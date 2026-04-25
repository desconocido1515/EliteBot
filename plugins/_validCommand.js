import fetch from 'node-fetch';

export async function before(m, { conn }) {
  if (global._cmdHandled) return;
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command || command === 'bot') return;
  
  // ========== LISTA DE COMANDOS A IGNORAR ==========
  const ignoreCommands = [
'(x','5','6vs6','6x6','?:','abrazar','abrazo','abrir','abrirgrupo','abrirgrupoen','aburrido',
'acert','acertijo','actualizar','acurrucarse','addexp','addexpired','addwarn','adivinaelnumero',
'adivinalacapital','adivinanumero','adivinanza','admins','advertencia','advlist','advnro','advpeli',
'agenda','agendasemanal','akira','akiyama','alertas','alpes','amigorandom','amistad','amor','amplay',
'angry','anime','animedl','animes','animo','anna','antienlace','antienlaces','antilink','antilinks',
'antiprivado','apk','apkmod','aplaudir','apocalypto','apostar','applemusic','applemusicsearch',
'aptoide','aptoidedl','asuna','asustada','asustado','audio','avergonzarse','aviso','avisos','ayuda',
'ayuzawa','backup','bailar','bal','balance','ban','banar','banchat','banchat2','banco','bancorpg',
'banuser','bard','bass','basura','bañar','bermuda','besar','beso','bhclk','bhcomp','bhinfi','bhmap',
'bienvenida','biobot','bite','blackpink','bleh','blocklist','bloqueados','bloqueadoslista','bloquear',
'blown','blur','blush','bofetada','boost','booty','bored','borracho','boruto','bots','brat','bratv',
'buenamadrugada','buenasnoches','buenastardes','buenosdias','bully','bullying','buscaminas',
'buscarpalabra','cafe','cal','calc','calculadora','calcular','camara','cambianombre','caminar',
'capcutse','capcutsearch','capital','capitalde','capitales','carta1','carta2','carta3','caso',
'casoinvestigar','casopoliciaco','cat','cena','cenar','cerrar','cerrargrupo','cerrargrupoen',
'chatgpt','chiho','chipmunk','chiste','chitoge','chocolate','clap','clasificatoria','cleartmp',
'clima','clk','clk90','clktpg','cmdlist','code','coffee','cofre','coger','cojer','comando','comandos',
'combobr','combode','comer','compe','comprar','confesion','confesión','consejo','convdocumento',
'copia','correr','cosplay','cr7','creador','creator','cringe','cristianoronaldo','cry','cuddle',
'culear','culiar','dado','dados','dadu','dalle','dameadmin','dance','dapk2','dar','darchocolate',
'dardiamantes','dardolares','darxp','dashboard','deep','degradar','deidara','del','delete','delwarn',
'demo','demote','depositar','desbloquear','detect','diario','difuminar','difuminar2','directo','dls',
'dlx','documento','donarsala','dormir','dragonbz','drama','dramatic','drunk','dsowner','duchar',
'duelo','duo','earrape','eat','eba','ecchi','echar','economia','economy','elaina','eliminar',
'embarazar','emilia','emojimix','empezarapocalypto','enamorar','encuesta','enhance','enlace',
'enlinea','enojado','erza','escupir','estado','estrellas','expulsar','facebook','facepalm','facto',
'fantasmas','fap','fast','fat','fb','feliz','ffban','flux','follar','formarpareja','formarpareja2',
'formarparejas','formartrio','formartrios','fototeta','foxgirl','fraseromantica','frases',
'frasestiktok','frasetiktok','freefiretoxic','ftoteta','fumar','fun','furro','gacha','gay','gc',
'gdrive','gemini','gif','girlfox','goku','golpe','golpear','golpiar','gp','group','grouplist',
'groups','grup','grupo','grupoabrir','grupocerrar','grupolista','gruposlista','guia','guia2','guiñar',
'handhold','happy','hd','hd2','hdvideo','hdvideos','hechar','hent','hentai','hentaisearch','hestia',
'hidetag','highfive','hinata','historiaromantica','hola','horario','hornycard','hornylicense',
'horoscopo','horóscopo','huevo','ia','ig','image','imagen','imagenlesbians','img','imgcalle',
'imgcalle2','imgcarta','imgcorazon','imgcumple','imgdbz','imgdirecto','imgglobo','imggrafiti',
'imggrafiti2','imggrafiti3','imggrafiti4','imggrafiti5','imggrafiti6','imggrafiti7','imggrafiti8',
'imglogo','imglogo2','imglogo3','imglogo4','imgnavidad','imgnube','imgpareja','imgretro',
'imgretro2','imgretro3','imgvidrio','imgvidrio2','inactivoff','inactivos','infipg','infitpg',
'info','infoanime','infogrupo','inori','instagram','investigarcaso','invocar','iss','isuzu',
'itachi','itori','jadibot','join2','jpg','juegos','kaga','kagura','kalahari','kaori','keneki',
'kick','kickfantasmas','kickinactivos','kicknum','kill','kiss','kotori','kpop','kurumi','lamer',
'laugh','leavegc','leavegroup','limpieza','limpieza2','link','logo','logopornhub','menu',
'menuimg','menulogos','messi','mp3','navidad','neko','nightcore','nsfw','owner','play','png',
'promote','remini','reverse','robot','scrim','spotify','sticker','tiktoksearch','toimg','top',
'trivia','ytmp3','ytmp4'
];
  // ==================================================
  
  if (ignoreCommands.includes(command)) return;

  const isValidCommand = (command, plugins) => {
    for (let plugin of Object.values(plugins)) {
      const cmd = Array.isArray(plugin.command) ? plugin.command : [plugin.command];
      if (cmd.includes(command)) return true;
    }
    return false;
  };

  if (isValidCommand(command, global.plugins)) {
    let user = global.db.data.users[m.sender];
    user.commands = (user.commands || 0) + 1;
    return;
  }

  global._cmdHandled = true;

  const mensajes = [
`✦ ¡Hey!
Deja de inventar comandos raros.
No dispongo de ese comando.
Usa \`.menu\` para ver opciones.`,

`✦ ¡Hey!
Pero… ¿qué estás escribiendo?
Creo que buscas \`.menu\`
Ahí está todo.`,

`✦ ¡Hey!
Ni yo conozco ese comando.
Mejor usa \`.menu\`
y revisa mi catálogo.`,

`✦ ¡Hey!
Ese comando no existe.
Pero puedes usar \`.menu\`
para ver todos los disponibles.`,

`✦ ¡Hey!
Comando inválido.
No está en mi sistema.
Prueba con \`.menu\`.`,

`✦ ¡Hey!
Ese comando no está disponible.
Revisa \`.menu\`
para encontrar lo que buscas.`
  ];

  let texto = mensajes[Math.floor(Math.random() * mensajes.length)];

  await conn.reply(
    m.chat,
    texto,
    m,
    rcanal
  );

  setTimeout(() => {
    global._cmdHandled = false;
  }, 1000);
}
