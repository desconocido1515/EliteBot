import fetch from 'node-fetch';

export async function before(m, { conn }) {
  if (global._cmdHandled) return;
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command || command === 'bot') return;
  
  // ========== LISTA DE COMANDOS A IGNORAR ==========
  // Agrega aquí todos los comandos que NO deben mostrar el mensaje de error
  const ignoreCommands = [
    // Comandos básicos
    'menu', 'bass', 'blown', 'deep', 'earrape', 'fast', 'fat', 'tienda', 'comprar', 
    'nightcore', 'reverse', 'robot', 'slow', 'smooth', 'desblock','ayuda', 'tupai', 'squirrel', 'kick', 'basura', ' echar', 'echar', 'ban', 'rip', 'basura', 
    'setname', 'newnombre','nuevonombre','clima' , 
'setpp', 'group', 'grup', 'gc','todos', 'programar', 
'hidetag', 'notify', 'notificar', 'noti', 'n', 'avisos', 'aviso', 


'1vs1', '4vs4', '6vs6', '8vs8', '12vs12', '16vs16', '20vs20',
'pvpm1014', 'pvpsmg', 'scrimduo',
'agenda', 'agendasemanal',
'alpes', 'bermuda', 'kalahari', 'nexterra', 'purgatorio',
'blackpink', 'brackpink', 'kpop',
'cat', 'neko', 'foxgirl',
'clk', 'clktpg', 'rbclk',
'combobr', 'combode',
'cr7', 'messi',
'dragonbz', 'goku', 'vegueta',
'inactivoff', 'infipg', 'infitpg',
'interna4vs4', 'interna6vs6',
'listacuadrilatero', 'listapgnuestra', 'listavs',
'mapacuadrilatero', 'mapahexagonal',
'navidad',
'podiocuadri',
'png',
'reglasckl', 'reglasclk', 'reglaslow', 'reglasvk', 'reglasword', 'reglaswz',
'scrim',
'tomp3',
'trivia',
'vegueta',
'vestimencuadri', 'menulogos', 'menulogo','logos', 'menuimg', 

'imglogo', 'imglogo2', 'imglogo3', 'imglogo4', 'imgcorazon', 'imgnavidad', 'imgcarta', 'imgcumple', 'imgglobo', 'imgpareja', 'imgretro', 'imgretro2', 'imgretro3', 'imgnube', 'imgdbz', 'imgvidrio', 'imgvidrio2', 'imgcalle', 'imgcalle2', 'imggrafiti', 'imggrafiti2', 'imggrafiti3', 'imggrafiti4', 'imggrafiti5', 'imggrafiti6', 'imggrafiti7', 'imggrafiti8', 
    




'$', '(x', '69', '6vs6', '6x6', '?:', '@admins', 'Buy', 'Buyall', 'abrazar', 'abrazo', 'abrir', 'abrircofre', 'abrirgrupoen', 'acciones', 'acert', 'acertijo', 'actualizar', 'add', 'addcoin', 'addd', 'addexp', 'addexpired', 'addprem', 'addwarn', 'addxp', 'adivinalacapital', 'adivinanza', 'admins', 'adventure', 'advertencia', 'advlist', 'advnro', 'advpeli', 'agarrartetas', 'agenda', 'agendasemanal', 'agregar', 'ainfo', 'akira', 'akiyama', 'alertas', 'alpes', 'amigorandom', 'amistad', 'amor', 'amplay', 'anal', 'anime', 'animedl', 'animeinfo', 'animelist', 'animes', 'animo', 'anna', 'antienlace', 'antienlaces', 'antilink', 'antilinks', 'antiprivado', 'antiprivate', 'apk', 'apkmod', 'apocalypto', 'apostar', 'applemusic', 'applemusicsearch', 'aptoide', 'aptoidedl', 'asuna', 'audio', 'autoadmin', 'aventura', 'aviso', 'avisos', 'avisoschannel', 'ayuda', 'ayuzawa', 'añadir', 'añadircoins', 'añadirdiamantes', 'añadirdolares', 'backup', 'bailar', 'bal', 'balance', 'balance2', 'baltop', 'ban', 'banar', 'banchat', 'banco', 'bank', 'banlist', 'banned', 'bard', 'bass', 'bañar', 'bermuda', 'besar', 'beso', 'bhclk', 'bhcomp', 'bhinfi', 'bhmap', 'bienvenida', 'blackpink', 'block', 'blocklist', 'bloqueados', 'bloqueadoslista', 'blowjob', 'blown', 'blur', 'boobjob', 'boost', 'booty', 'borrardatos', 'borrartemp', 'borrartmp', 'boruto', 'bot', 'bots', 'brat', 'bratv', 'buenamadrugada', 'buenasnoches', 'buenastardes', 'buenosdias', 'bug', 'bugs', 'buscaminas', 'buscarpalabra', 'buy', 'buyall', 'buyc', 'buychar', 'buycharacter', 'c', 'cafe', 'cal', 'calc', 'calculadora', 'calcular', 'camara', 'cambianombre', 'capcutse', 'capcutsearch', 'capital', 'capitalde', 'capitales', 'carta1', 'carta2', 'carta3', 'casino', 'caso', 'casoinvestigar', 'casopoliciaco', 'cat', 'cazar', 'cekid', 'cena', 'cenar', 'cerrar', 'cerrargrupoen', 'cf', 'chamba', 'chambear', 'charimage', 'charinfo', 'charvideo', 'chatgpt', 'chiho', 'chipmunk', 'chiste', 'chitoge', 'chocolate', 'chupar', 'chupartetas', 'cimage', 'claim', 'claims', 'clasificatoria', 'clearallsession', 'cleartemp', 'cleartmp', 'clima', 'clk', 'clk90', 'clktpg', 'close', 'cmdlist', 'code', 'coffee', 'coffer', 'cofre', 'cofreabrir', 'coger', 'coinflip', 'coins', 'coinsgive', 'cojer', 'comando', 'comandos', 'combobr', 'combode', 'compe', 'comprar', 'confesion', 'confesión', 'consejo', 'convdocumento', 'copia', 'cosplay', 'coño', 'cr7', 'creador', 'creator', 'crime', 'crimen', 'cristianoronaldo', 'cuenta', 'culear', 'culiar', 'cum', 'curar', 'cvideo', 'd', 'dado', 'dados', 'dadu', 'daily', 'dalle', 'dance', 'dapk2', 'dar', 'darchocolate', 'darcoins', 'dard', 'dardiamantes', 'dardolares', 'darxp', 'dashboard', 'decir', 'deep', 'degradar', 'deidara', 'del', 'del(ete', 'delai', 'delbirth', 'delchar', 'delclaimmsg', 'deldesc', 'deldescription', 'delete', 'deletedatauser', 'deletefav', 'deletefile', 'deletewaifu', 'delfav', 'delgenre', 'delmeta', 'delprem', 'delprimary', 'delwaifu', 'delwarn', 'demo', 'demote', 'dep', 'deposit', 'depositar', 'desbanear', 'desbanearuser', 'desbanearusuario', 'detect', 'detectar', 'diamantes', 'diario', 'difuminar', 'difuminar2', 'directo', 'divorce', 'dls', 'dlx', 'dmins', 'documento', 'donarsala', 'dragonbz', 'ds', 'dsowner', 'duchar', 'duelo', 'dungeon', 'duo', 'earrape', 'eba', 'eboard', 'ecchi', 'echar', 'economia', 'economy', 'economyboard', 'economyinfo', 'einfo', 'elaina', 'eliminar', 'eliminarfotochannel', 'eliminartmp', 'emilia', 'emojimix', 'empezarapocalypto', 'enamorar', 'encuerar', 'encuesta', 'enhance', 'enlace', 'enlinea', 'enviar', 'errores', 'erza', 'estado', 'estrellas', 'exp', 'experiencia', 'experiensia', 'facebook', 'facto', 'fantasmas', 'fap', 'fas?t', 'fast', 'fat', 'favboard', 'favoritetop', 'favtop', 'fb', 'fechadeexpiracion', 'fetch', 'ffban', 'fish', 'fix', 'fixmsg', 'flip', 'flux', 'follar', 'footjob', 'formarpareja', 'formarpareja2', 'formarparejas', 'formartrio', 'formartrios', 'forward', 'fototeta', 'foxgirl', 'frase(s', 'fraseromantica', 'frases', 'frasestiktok', 'frasetiktok', 'freefiretoxic', 'ftoteta', 'fuck', 'fun', 'furro', 'gacha', 'gachainfo', 'gay', 'gc', 'gdrive', 'gemini', 'get', 'getpic', 'getplugin', 'ginfo', 'girlfox', 'gitclone', 'githubstalk', 'giveallharem', 'givechar', 'givecoins', 'givewaifu', 'goku', 'golpe', 'golpear', 'golpiar', 'google', 'gp', 'gpbanner', 'gpdesc', 'gpname', 'gponly', 'grabboobs', 'grop', 'grope', 'group', 'groupdesc', 'groupimg', 'grouplist', 'groupname', 'groups', 'grup', 'grupolista', 'gruposlista', 'guia', 'guia2', 'guía', 'guía2', 'harem', 'haremshop', 'hd', 'hd2', 'hdvideo', 'hdvideos', 'heal', 'hechar', 'hent', 'hentai', 'hentai2', 'hentaisearch', 'hestia', 'hidetag', 'hinata', 'historiaromantica', 'horario', 'hornycard', 'hornylicense', 'huevo', 'hunt', 'ia', 'id', 'idgc', 'idgrupo', 'ig', 'image', 'imagen', 'imagenlesbians', 'img', 'imgcalle', 'imgcalle2', 'imgcarta', 'imgcorazon', 'imgcumple', 'imgdbz', 'imgdirecto', 'imgglobo', 'imggrafiti', 'imggrafiti2', 'imggrafiti3', 'imggrafiti4', 'imggrafiti5', 'imggrafiti6', 'imggrafiti7', 'imggrafiti8', 'imglogo', 'imglogo2', 'imglogo3', 'imglogo4', 'imgnavidad', 'imgnube', 'imgpareja', 'imgretro', 'imgretro2', 'imgretro3', 'imgvidrio', 'imgvidrio2', 'inactivoff', 'inactivos', 'infinito90', 'infipg', 'infitpg', 'info', 'infoanime', 'infoeconomy', 'infogacha', 'infogrupo', 'inori', 'inspeccionar', 'inspect', 'instagram', 'intercambiar', 'investigarcaso', 'invite', 'invocación', 'invocar', 'ip', 'iss', 'isuzu', 'itachi', 'itori', 'itssostupid', 'jadibot', 'join', 'join2', 'joinfor', 'jpg', 'juegos', 'kaga', 'kagura', 'kalahari', 'kaori', 'keneki', 'kick', 'kickfantasmas', 'kickinactivos', 'kicknum', 'kiss', 'kotori', 'kpop', 'kurumi', 'lb', 'lboard', 'leave', 'leavegc', 'leavegroup', 'leche', 'leer', 'lesbianas', 'letra', 'level', 'levelup', 'lickpussy', 'lid', 'lideres', 'lids', 'limpieza', 'limpieza2', 'linea', 'link', 'listablock', 'listabloqueados', 'listacuadrilatero', 'listadegrupo', 'listadegrupos', 'listadv', 'listagrupo', 'listagrupos', 'listahexagonal', 'listanum', 'listapgcontra', 'listapgnuestra', 'listavs', 'listcuadrilátero', 'listnum', 'listonline', 'listprem', 'logo', 'logoamerican', 'logoamongus', 'logoaov', 'logoassassin', 'logocaptain', 'logocomix', 'logodead', 'logofootball', 'logogirl', 'logoletters', 'logololbanner', 'logomascot', 'logometal', 'logoneon', 'logopixel', 'logopornhub', 'logoqueen', 'logoshield', 'logosilver', 'logostone', 'logout', 'logowarzone', 'loli', 'loli2', 'lolice', 'lolis', 'love', 'luminai', 'lvl', 'lyrics', 'madara', 'mamada', 'manosear', 'mapacuadrilatero', 'mapahexagonal', 'marcar', 'marry', 'mastur', 'masturbar', 'mazmorra', 'mediafire', 'mediafiresearch', 'mega', 'mensual', 'menu', 'menuanime', 'menuanimes', 'menuaudio', 'menuaudios', 'menuhot', 'menuimg', 'menujuego', 'menujuegos', 'menulogo', 'menulogos', 'menú', 'mercadolibre', 'messi', 'meter', 'metersela', 'mf', 'mfse', 'mfsearch', 'mg', 'mikasa', 'miku', 'miming', 'miming3', 'minar', 'minar2', 'minar3', 'minarcoins', 'minardiamante', 'minardiamantes', 'minargemas', 'minarhades', 'minarhadescoins', 'minato', 'mine', 'mine3', 'minivel', 'mirango', 'mirar', 'mirar-estrellas', 'modapk', 'modoadmin', 'modohorny', 'monthly', 'mp3', 'mute', 'mylid', 'n', 'nalgada', 'naruto', 'navidad', 'neko', 'newnombre', 'nexterra', 'nezuko', 'nightcore', 'nivel', 'nodo', 'nodovip', 'nombrebot', 'noseguircanal', 'nosilenciarcanal', 'noti', 'notificar', 'notify', 'npm', 'npmdl', 'npmdownloader', 'npmjs', 'nsfw', 'nsfw1', 'nsfw2', 'nsfwass', 'nsfwbdsm', 'nsfwcum', 'nsfwero', 'nsfwfemdom', 'nsfwfoot', 'nsfwglass', 'nsfwloli', 'nsfworgy', 'nuevadescchannel', 'nuevafotochannel', 'nuevoenlace', 'nuevolink', 'nuevonombre', 'nuevonombrecanal', 'online', 'onlyadmin', 'opcion', 'opción', 'open', 'openai', 'opinion', 'opinión', 'ordenar', 'order', 'owner', 'p', 'pack2', 'paja', 'pajatebot', 'pajeate', 'pajeatebot', 'palabra', 'panties', 'pay', 'pechos', 'pelea', 'pelear', 'pene', 'penetra', 'penetrado', 'penetrar', 'perfil', 'perfíl', 'pervertida', 'pervertido', 'pescar', 'pfp', 'phsearch', 'pies', 'pin', 'ping', 'pinterest', 'pinv', 'pinvideo', 'piropo', 'pixel', 'pixelar', 'play', 'playaudio', 'playmp4', 'playstore', 'png', 'podiocuadri', 'pokedex', 'poll', 'polling', 'pornhubsearch', 'porno', 'ppcouple', 'ppcp', 'ppt', 'prefix', 'prem', 'premium', 'privadoff', 'privateoff', 'profile', 'promote', 'promover', 'protituirse', 'ps', 'public', 'purgatorio', 'puta', 'pvpm1014', 'pvpsmg', 'qc', 'qc2', 'qr', 'quieropene', 'r34', 'randomxxx', 'rango', 'rangos', 'rbclk', 'rch', 'reaccioneschannel', 'reactch', 'reactioneschannel', 'read', 'readviewonce', 'readvo', 'reclamar', 'reenviar', 'refresh', 'regalar', 'reglascbg', 'reglasclk', 'reglascp', 'reglascuadri', 'reglasibg', 'reglaslideres', 'reglaslow', 'reglaspg', 'reglasvk', 'reglasword', 'reglaswz', 'reiniciar', 'reload', 'remini', 'removerventa', 'removesale', 'report', 'report-owner', 'reportar', 'reporte', 'reportes', 'request', 'resetclaimmsg', 'resetear', 'resetlink', 'resetprefix', 'resetuser', 'resiviravisos', 'respaldo', 'restablecer', 'restablecerdatos', 'restart', 'restrict', 'restringir', 'retar', 'retirar', 'reto', 'reverse', 'revoke', 'rob', 'robar', 'robarwaifu', 'robot', 'robwaifu', 'rol', 'roll', 'rollwaifu', 'roulette', 'rpg', 'rt', 'rule34', 'ruleta', 'ruletamuerte', 'rusa', 'rv', 'rw', 's', 'sacar', 'sagiri', 'sakura', 'salir', 'salirgrupo', 'saludar', 'sasuke', 'savefile', 'saveplugin', 'say', 'sc', 'scdl', 'scplay', 'scrim', 'scrimduo', 'scrimduos', 'scrims', 'script', 'scsearch', 'searchhentai', 'seguircanal', 'self', 'sell', 'semanal', 'serbot', 'serieinfo', 'serielist', 'setbio', 'setbirth', 'setclaim', 'setclaimmsg', 'setdesc', 'setdescription', 'setfav', 'setfotobot', 'setgenero', 'setgenre', 'setimage', 'setmeta', 'setname', 'setnamebot', 'setpfp', 'setppbot', 'setprimary', 'setprofile', 'setstatus', 'setuser', 'setusername', 'sex', 'sexo', 'shazam', 'ship', 'silenciarcanal', 'simp', 'simpcard', 'sintiempo', 'sistema', 'sixnine', 'slist', 'slot', 'slow', 'slut', 'smooth', 'sologp', 'sopa', 'sorteo', 'sorteo2', 'sorteo3', 'sorteo4', 'sorteo5', 'sorteo6', 'soundcloud', 'soundcloudsearch', 'soup', 'spalabras', 'spank', 'spdeletras', 'spdepalabras', 'speedtest', 'speedtest?', 'splay', 'spletras', 'spotify', 'spotifysearch', 'sppalabras', 'squirrel', 'ss', 'ssweb', 'staff', 'status', 'steal', 'stest', 'sticker', 'stickerly', 'stickerlydl', 'stickerpack', 'stupid', 'style', 'sub', 'subsbots', 'suckboobs', 'suerte', 'sug', 'suggest', 'susprecios', 'syntax', 'tagall', 'take', 'tebakff', 'tebaklagu', 'tekateki', 'tenor', 'tenorsearch', 'terabox', 'terminos', 'test', 'test?speed', 'tetas', 'texto', 'tiempo', 'tiempod', 'tiempoh', 'tienda', 'tiendawaifus', 'tijeras', 'tiktokfrase', 'tiktokfrases', 'tiktokhot', 'tiktokmusic', 'tiktokrandom', 'tiktoksearch', 'tiktokstalk', 'tiktokvalle', 'todos', 'togif', 'toimg', 'tomarcafe', 'tomarcafé', 'top', 'top2parejas', 'top5parejas', 'topalcoholicos', 'topbinarios', 'topcachudos', 'topchichonas', 'topcompe', 'topculonas', 'topex', 'topfamos@s', 'topfamosos', 'topfeos', 'topfieles', 'topgays', 'topgrasa', 'topinfieles', 'topintegrante', 'topintegrantes', 'topjugadores', 'toplagrasa', 'toplind@s', 'toplindos', 'topm1014', 'topmapa', 'topotakus', 'toppajer@s', 'toppanafresco', 'toppanafrescos', 'topparejas', 'topput@s', 'topshipost', 'topshiposters', 'topsidosos', 'topump', 'topwaifus', 'totalfunciones', 'trabajar', 'trad', 'trade', 'traducir', 'transfer', 'transferir', 'translate', 'trapito', 'trivia', 'tupai', 'tw', 'twdl', 'twitter', 'twt', 'unban', 'unblock', 'undress', 'unmute', 'unwarn', 'update', 'url', 'vaciartmp', 'vegueta', 'vender', 'ver', 'verdad', 'vestimencuadri', 'videoxxx', 'vip', 'votar', 'vote', 'vxxx', 'w', 'waifu', 'waifuimage', 'waifuinfo', 'waifus', 'waifusboard', 'waifustop', 'waifuvideo', 'warn', 'weekly', 'welcome', 'wfav', 'whatmusic', 'wiki', 'wikipedia', 'wimage', 'winfo', 'with', 'withdraw', 'wm', 'word', 'wordfind', 'wordsearch', 'work', 'wshop', 'wtop', 'wvideo', 'x', 'xdl', 'xnxx', 'xnxxdl', 'xnxxs', 'xnxxsearch', 'xnxxx', 'xvid', 'xvideos', 'xvideosdl', 'xvsearch', 'yaoi', 'yaoi2', 'yta', 'ytmp3', 'ytmp3doc', 'ytmp4', 'ytmp4doc', 'ytmp4v2', 'ytmusic', 'yts', 'yts2', 'ytsearch', 'ytsearch2', 'ytv', 'yuri', 'yuri2', 'ánimo', 







    
    'chipmunk'];
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

