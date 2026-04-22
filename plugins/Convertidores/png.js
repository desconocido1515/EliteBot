let handler = async (m, { conn }) => {
    const q = m.quoted || m

    let mime = (q.msg || q).mimetype || ''

    if (!m.quoted || !/image/.test(mime)) {
        return conn.reply(m.chat, `☑️ 𝙼𝙴𝙽𝙲𝙸𝙾𝙽𝙰 𝚄𝙽𝙰 𝙵𝙾𝚃𝙾 𝙿𝙰𝚁𝙰 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝚁 𝙰 𝙳𝙾𝙲𝚄𝙼𝙴𝙽𝚃𝙾 𝙿𝙽𝙶`, m, rcanal)
    }

    let media = await q.download?.()

    if (!media) {
        return conn.reply(m.chat, `☑️ 𝙴𝚁𝚁𝙾𝚁 𝙰𝙻 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚁 𝙻𝙰 𝙸𝙼𝙰𝙶𝙴𝙽`, m, rcanal)
    }

    await conn.reply(m.chat, `☑️ 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝙴𝙽𝙳𝙾 𝙰 𝙿𝙽𝙶...`, m, rcanal)

    return conn.sendMessage(m.chat, { document: media, mimetype: 'image/png', fileName: `Imagen.png` }, { quoted: m })
}

handler.help = ['png']
handler.tags = ['tools']
handler.command = ['png']

export default handler
