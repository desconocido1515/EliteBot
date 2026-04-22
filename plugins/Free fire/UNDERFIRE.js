let handler = async(m, { user, isOwner, isAdmin, conn, text, participants, args, command }) => {
    if (!(isAdmin || isOwner || user)) {
        return conn.reply(m.chat, `☑️ 𝙽𝙴𝙲𝙴𝚂𝙸𝚃𝙰𝚂 𝚂𝙴𝚁 𝙰𝙳𝙼𝙸𝙽 𝙿𝙰𝚁𝙰 𝚄𝚂𝙰𝚁 𝙴𝚂𝚃𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾`, m, rcanal)
    }
    
    let pesan = args.join` `
    let oi = ` ${pesan}`
    let teks = `𝐔𝐍𝐃𝐄𝐑 𝐅𝐈𝐑𝐄${oi}\n\n`
    teks += `• *Armas:* Desert, ump y m10\n`
    teks += `• *Habilidades:* alok, kelly, maxim, moco\n`
    teks += `• Primera ronda a desert (solo se usa en primera)\n`
    teks += `• 1 M10 por equipo\n`
    teks += `• Alturas solo cuentan segundo pisos y techos\n`
    teks += `• +4 para segunda y reclamos (solo válido para el equipo contrario)\n`
    teks += `• 2 cambios por equipo\n`
    teks += `• 2 espectadores por equipo\n`
    teks += `• 10 de tolerancia para todo\n`
    teks += `• Si ambos equipos incumplieron reglas el punto se dará al ganador de la sala\n`
    teks += `• Cancelar el vs 2 horas antes o se tomará por ganado`
    
    await conn.reply(m.chat, teks, m, rcanal)
}

handler.help = ['reglaslow']
handler.tags = ['group']
handler.command = /^(reglaslow)$/i
handler.group = true
handler.admin = true

export default handler
