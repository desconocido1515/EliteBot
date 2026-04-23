// plugins/horoscopo_opastro.js
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

let handler = async (m, { conn, text, command }) => {
    // Configurar según tu comando
    let signo = '';
    if (command === 'horoscopo') {
        signo = text.toLowerCase().trim();
        if (!signo) {
            return conn.reply(m.chat, `☑️ Usa: .horoscopo aries`, m, rcanal);
        }
    } else {
        signo = command.replace('horo', '').toLowerCase();
    }

    // Mapeo de nombres al inglés que OpAstro entiende
    const mapaSignos = {
        aries: 'ARIES', tauro: 'TAURUS', geminis: 'GEMINI', cancer: 'CANCER',
        leo: 'LEO', virgo: 'VIRGO', libra: 'LIBRA', escorpio: 'SCORPIO',
        sagitario: 'SAGITTARIUS', capricornio: 'CAPRICORN', acuario: 'AQUARIUS', piscis: 'PISCES'
    };

    const signoPython = mapaSignos[signo];
    if (!signoPython) {
        return conn.reply(m.chat, `☑️ Signo inválido. Ejemplo: .horoscopo aries`, m, rcanal);
    }

    await conn.sendMessage(m.chat, { react: { text: '🔮', key: m.key } });
    await conn.reply(m.chat, `☑️ Consultando astros para ${signo.toUpperCase()}...`, m, rcanal);

    const fecha = new Date().toISOString().split('T')[0];
    const comando = `opastro horoscope --period daily --sign ${signoPython} --target-date ${fecha}`;

    try {
        const { stdout, stderr } = await execAsync(comando);
        if (stderr) console.error('Error OpAstro:', stderr);
        
        const mensaje = `☑️ *Horóscopo de ${signo.toUpperCase()}*\n📅 Fecha: ${fecha}\n✨ ${stdout.trim() || 'No prediction generated.'}`;
        await conn.reply(m.chat, mensaje, m, rcanal);
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error('Error al ejecutar OpAstro:', error);
        await conn.reply(m.chat, `☑️ Error generando el horóscopo.`, m, rcanal);
    }
};

handler.command = ['horoscopo', 'horoaries', 'horotauro', 'horogeminis', 'horocancer', 'horoleo', 'horovirgo', 'horolibra', 'horoescorpio', 'horosagitario', 'horocapricornio', 'horoacuario', 'horopiscis'];
export default handler;
