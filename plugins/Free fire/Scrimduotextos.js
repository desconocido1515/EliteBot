let handler = async(m, { user, isOwner, isAdmin, conn, text, participants, args, command }) => {
    if (!(isAdmin || isOwner || user)) {
        return conn.reply(m.chat, `☑️ 𝙽𝙴𝙲𝙴𝚂𝙸𝚃𝙰𝚂 𝚂𝙴𝚁 𝙰𝙳𝙼𝙸𝙽 𝙿𝙰𝚁𝙰 𝚄𝚂𝙰𝚁 𝙴𝚂𝚃𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾`, m, rcanal)
    }
    
    let pesan = args.join` `
    let oi = `𝗦𝗖𝗥𝗜𝗠 𝗗𝗘 𝗗𝗨𝗢𝗦 📍 ${pesan}`
    let teks = `${oi}\n`
    teks += `⤨⤨⤨⤨⤨⤨⤨⤨⤨⤨⤨⤨⤨⤨⤨⤨⤨\n\n`
    teks += `» 𝐃𝐢𝐚: \n`
    teks += `» 𝐇𝐨𝐫𝐚: \n\n`
    teks += `» *𝐏𝐋𝐀𝐘𝐄𝐑𝐒*\n\n`
    teks += `♥️ 𝗗𝗨𝗢 *1*\n`
    teks += `🦄➛\n`
    teks += `🦄➛\n\n`
    teks += `♥️ 𝗗𝗨𝗢 *2*\n`
    teks += `🌈➛\n`
    teks += `🌈➛\n`
    
    await conn.reply(m.chat, teks, m, rcanal)
}

handler.help = ['scrimduos', 'scrimduo']
handler.tags = ['group']
handler.command = /^(scrimduos|scrimduo)$/i
handler.group = true
handler.admin = true

export default handler
