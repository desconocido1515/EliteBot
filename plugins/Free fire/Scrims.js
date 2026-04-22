let handler = async(m, { user, isOwner, isAdmin, conn, text, participants, args, command }) => {
    if (!(isAdmin || isOwner || user)) {
        return conn.reply(m.chat, `☑️ 𝙽𝙴𝙲𝙴𝚂𝙸𝚃𝙰𝚂 𝚂𝙴𝚁 𝙰𝙳𝙼𝙸𝙽 𝙿𝙰𝚁𝙰 𝚄𝚂𝙰𝚁 𝙴𝚂𝚃𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾`, m, rcanal)
    }
    
    let pesan = args.join` `
    let oi = `🌍 𝗦𝗖𝗥𝗜𝗠 🌍 ${pesan}`
    let teks = `${oi}\n`
    teks += `⤨⤨⤨⤨⤨⤨⤨⤨⤨⤨⤨⤨⤨⤨⤨⤨⤨\n\n`
    teks += `» 𝐃𝐢𝐚: \n`
    teks += `» 𝐇𝐨𝐫𝐚: \n\n`
    teks += `» 𝗠𝗔𝗣𝗔𝗦:\n`
    teks += `🏝️┝𝗕\n`
    teks += `🏞️┝𝗣\n`
    teks += `🏜️┝𝗞\n\n`
    teks += `» 𝗖𝗮𝘀𝗶𝗹𝗹𝗮: \n`
    teks += `» 𝗩𝗲𝘀𝘁𝗶𝗺𝗲𝗻𝘁𝗮: \n\n`
    teks += `» *𝐏𝐋𝐀𝐘𝐄𝐑𝐒*\n\n`
    teks += `🥷🏻➛\n`
    teks += `🥷🏻➛\n`
    teks += `🥷🏻➛\n`
    teks += `🥷🏻➛\n\n`
    teks += `» 𝙈𝙄𝘾𝙍𝙊 𝙊𝘽𝙇𝙄𝙂𝘼𝙏𝙊𝙍𝙄𝙊/𝙉𝙊 𝙈𝙐𝘿𝘼𝙎 𝙔 𝙌𝙐𝙀 𝙏𝙍𝘼𝘽𝘼𝙅𝙀𝙉 𝙀𝙉 𝙀𝙌𝙐𝙄𝙋𝙊, 𝘼𝙌𝙐𝙄 𝙉𝘼𝘿𝙄𝙀 𝙀𝙎 𝘿𝙄𝙊𝙎.`
    
    // Usar conn.reply para que tenga el botón "ver mensaje" de rcanal
    await conn.reply(m.chat, teks, m, rcanal)
}

handler.help = ['scrims', 'scrim']
handler.tags = ['group']
handler.command = /^(scrims|scrim)$/i
handler.group = true
handler.admin = true

export default handler
