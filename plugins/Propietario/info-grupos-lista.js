let handler = async (m, { conn }) => {
  const participating = await conn.groupFetchAllParticipating()
  const grupos = Object.keys(participating)
  await conn.reply(m.chat, `Grupos encontrados: ${grupos.length}\n\nIDs: ${grupos.join('\n')}`, m)
}
handler.command = /^(testgrupos)$/i
handler.rowner = true
export default handler
