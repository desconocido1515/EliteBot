let handler = async (m, { conn, usedPrefix, command }) => {
    const q = m.quoted || m

    let mime = (q.msg || q).mimetype || ''

    if (!m.quoted) {
        return conn.reply(m.chat, `☑️ 𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙴 𝙰𝙻 𝚅𝙸𝙳𝙴𝙾 𝙾 𝙰𝚄𝙳𝙸𝙾 𝙿𝙰𝚁𝙰 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝚁 𝙰 𝙳𝙾𝙲𝚄𝙼𝙴𝙽𝚃𝙾`, m, rcanal)
    }

    if (!/audio|video/.test(mime)) {
        return conn.reply(m.chat, `☑️ 𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙴 𝙰𝙻 𝚅𝙸𝙳𝙴𝙾 𝙾 𝙰𝚄𝙳𝙸𝙾 𝙿𝙰𝚁𝙰 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝚁 𝙰 𝙳𝙾𝙲𝚄𝙼𝙴𝙽𝚃𝙾`, m, rcanal)
    }

    let media = await q.download?.()

    if (!media) {
        return conn.reply(m.chat, `☑️ 𝙴𝚁𝚁𝙾𝚁 𝙰𝙻 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚁 𝙴𝙻 𝙼𝙴𝙳𝙸𝙾`, m, rcanal)
    }

    await conn.reply(m.chat, `☑️ 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝙴𝙽𝙳𝙾 𝙰 𝙳𝙾𝙲𝚄𝙼𝙴𝙽𝚃𝙾...`, m, rcanal)

    if (/video/.test(mime)) {
        return conn.sendMessage(m.chat, { document: media, mimetype: 'video/mp4', fileName: `Documento.mp4` }, { quoted: m })
    } else if (/audio/.test(mime)) {
        return conn.sendMessage(m.chat, { document: media, mimetype: 'audio/mpeg', fileName: `Documento.mp3` }, { quoted: m })
    }
}

handler.help = ['documento']
handler.tags = ['tools']
handler.command = ['documento', 'convdocumento']

export default handler
