const { baileys, proto, generateWAMessageFromContent, getContentType } = require("@adiwajshing/baileys")
const { getGroupAdmins, fetchJson, getBuffer, isUrl, } = require("./lib/functions.js")
const { exec } = require("child_process")
const cheerio = require("cheerio")
const chalk = require("chalk")
const util = require("util")
const axios = require("axios")
const fs = require("fs")

global.msgapx = {
  error: '*EROR BANG*',
  author: '*Apxxx.com*',
  adminbot: '*JADIIN GUA ADMIN BLOG*',
  admin: '*FITUR KHUSUS ADMIN*',
  loading: '*OTW BANG...*',
  owner: '*FITUR KHUSUS OWNER*',
  onlygroup: '*FITUR WORK DI GROUP*',
}

module.exports = async (client, mek, msg) => {
try {
const type = getContentType(msg.message)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const quoted = type == 'extendedTextMessage' && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const body = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : ''
const prefix = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα~¦|/\\©^]/gi) : '.'
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const botNumber = client.user.id.split(':')[0]
const sender = msg.key.fromMe ? (client.user.id.split(':')[0]+'@s.whatsapp.net' || client.user.id) : (msg.key.participant || msg.key.remoteJid)
const isGroup = from.endsWith('@g.us')
const groupMetadata = isGroup ? await client.groupMetadata(from).catch(e => {}) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = isGroup ? groupAdmins.includes(sender) : false
const senderNumber = sender.split('@')[0]
const pushname = msg.pushName || `${senderNumber}`
const nomorOwner = [`6287705048235`]
const mime = (quoted.msg || quoted).mimetype || ''
const isBot = botNumber.includes(senderNumber)
const isOwner = nomorOwner.includes(senderNumber) || isBot

if (isCmd && msg.isGroup) { 
console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Group Chat"), chalk.bold('[' + args.length + ']')); 
}
if (isCmd && !msg.isGroup) { 
console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Private Chat"), chalk.bold('[' + args.length + ']')); 
}

const reply = (teks) => {
client.sendMessage(from, { text : teks }, { quoted : msg })
}

if (/whatsapp.com/g.test(body)) {
if (!isGroup) return
if (isAdmins) return reply(`Admin Mah Bebas Bro`)
if (isOwner) return reply(`Owner Mah Bebas Bro`)
reply(`*「 GROUP LINK DETECTOR 」*\n\nBot Mendeteksi Anda Telah Mengirim Link Group\nMaaf Anda Akan Di Kick & Pesan Anda Akan Di Hapus Oleh Bot`)
const sianj = sender
await client.groupParticipantsUpdate(from, [sianj], 'remove')
client.sendMessage(from, { delete: msg.key })
}

switch (command) {
case "menu":{
  let resmenu = `*ɪɴꜰᴏʀᴍᴀꜱɪ ʙᴏᴛ*
| ɴᴀᴍᴀ : ᴀᴘx ʙᴏᴛ
| ᴏᴡɴᴇʀ : ᴀᴘxxx.ᴄᴏᴍ
| ᴍᴏᴅᴜʟᴇ : ʙᴀɪʟᴇʏꜱ

*ᴛᴏʟꜱ ᴍᴇɴᴜ*
| ꜱᴛɪᴄᴋᴇʀ (ꜱᴇɴᴅ ꜰᴏᴛᴏ)
| ꜱᴛɪᴄᴋᴇʀɢɪꜰ (ꜱᴇɴᴅ ᴠɪᴅᴇᴏ)
| ꜱ (ꜱᴇɴᴅ ꜰᴏᴛᴏ)
| ꜱɢɪꜰ (ꜱᴇɴᴅ ᴠɪᴅᴇᴏ)
| ꜱɴᴀᴘᴛɪᴋ (ʟɪɴᴋᴛɪᴋᴛᴏᴋ)
| ʏᴛᴠɪᴅᴇᴏ (ʟɪɴpᴋʏᴛ)
| ʏᴛᴍᴜꜱɪᴄ (ʟɪɴᴋʏᴛ)
| ᴇᴍᴏᴊɪᴍɪx (ᴇᴍᴏᴊɪ1|ᴇᴍᴏᴊɪ2)
| ꜱᴛɪᴄᴋᴇʀᴍᴇᴍᴇ (ꜱᴇɴᴅ ꜰᴏᴛᴏ) + (ᴛᴇxᴛ1|ᴛᴇxᴛ2)*

*ɢʀᴏᴜᴘ ᴍᴇɴᴜ*
| ᴋɪᴄᴋ (@ᴛᴀɢ)
| ᴄᴜʟɪᴋ (628xxx)
| ʜɪᴅᴇᴛᴀɢ (ᴛᴇxᴛ)
| ᴘᴘɢᴄ (ꜱᴇɴᴅ ꜰᴏᴛᴏ)
| ᴅᴇꜱᴄ (ᴛᴇxᴛ)
| ʟɪɴᴋɢᴄ
| ʀᴇꜱᴇᴛʟɪɴᴋɢᴄ

*ᴛʜᴀɴᴋꜱ ᴛᴏ*
| ᴀʟʟᴀʜ ꜱ.ᴡ.ᴛ
| ᴀᴘxxx.ᴄᴏᴍ (ᴅᴇᴠ)
| ᴋɪʀʙᴏᴛᴢ (ʙᴀꜱᴇ)
| ᴢᴇᴇᴏɴᴇᴏꜰᴄ (ꜱᴄʀᴇꜱᴛᴀᴘɪ)
| ᴍʏ ꜱᴜʙꜱᴄʀɪʙᴇʀ (ꜱᴜᴘᴘᴏʀᴛ ᴍᴇ)
| ᴀʟʟ ᴄʀᴇᴀᴛᴏʀ & ᴅᴇᴠ`
client.sendMessage(from, { image: { url: 'https://i.ibb.co/413tM19/20230608-202722.png' }, caption: resmenu }
}
break

case 'sticker':
case 's':
case 'stickergif':
case 'sgif':{
if (!quoted) throw `*Balas Video/Image Dengan Caption* ${prefix + command}`
reply(msgapx.loading)
if (/image/.test(mime)) {
let media = await quoted.download()
client.sendMessage(from, { sticker: { url: media }, { packname: msgapx.author, author: msgapx.author }, { quoted }})
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return reply('*Maksimal 10 detik!*')
let media = await quoted.download()
client.sendMessage(from, { sticker: { url: media }, { packname: msgapx.author, author: msgapx.author }, { quoted }})
} else {
throw `*Kirim Gambar/Video Dengan Caption* ${prefix + command}\nDurasi *Video 1-9 Detik*`
}
}
break

case 'snaptik':{
  if (!text) return reply('Urlnya mana um?')
  if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply('LINK INVALID')
  let res = await fetchJson(`https://api.kamplenggg.repl.co/api/download/tiktok?url=${args[0]}&apikey=TeAyq8YBDT`)
  let buffer = await getBuffer(res.result.video.data.no_watermark)
  client.sendMessage(from, { video: { url: buffer }, mimetype: 'video/mp4', caption: 'NIH BANG' })
}
break

case 'ytvideo':{
  if (!text) return reply('Urlnya mana um?')
  if (!isUrl(args[0]) && args[0].includes('youtube.com')) return reply('LINK INVALID')
  let res = await fetchJson(`https://api.kamplenggg.repl.co/api/download/ytmp4?url=${args[0]}&apikey=TeAyq8YBDT`)
  let size = await getBuffer(res.size)
  if (!size == 100000) return ('Batas File Hanya 100Mb')
  let buffer await getBuffer(res.download)
  client.sendMessage(from, { video: { url: buffer }, mimetype: 'video/mp4', filename: res.id, caption: 'NIH BANG' })
}
break

case 'ytmusic':{
  if (!text) return reply('Urlnya mana um?')
  if (!isUrl(args[0]) && args[0].includes('youtube.com')) return reply('LINK INVALID')
  let res = await fetchJson(`https://api.kamplenggg.repl.co/api/download/ytmp3?url=${args[0]}&apikey=TeAyq8YBDT`)
  let buffer await getBuffer(res.download)
  await reply(URL SIAP : ${buffer})
}
break

case 'emojimix':{
let [emoji1, emoji2] = text.split`+`
if (!emoji1) throw `Example : ${prefix + command} 😅+🤔`
if (!emoji2) throw `Example : ${prefix + command} 😅+🤔`
reply(mess.wait)
let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
for (let res of anu.results) {
  client.sendMessage(from, { sticker: { url: media }, { packname: msgapx.author, author: msgapx.author }, { quoted }})
}
}
break

case 'hidetag':{
if (!isGroup) return reply(msgapx.onlygroup)
if (!isAdmins) return reply(msgapx.admin)
client.sendMessage(from, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: mek })
}
break

default:
}
}
} catch (err) {
console.log(util.format(err))
let e = String(err)
client.sendMessage("6285641598235@s.whatsapp.net", {text:e})
}

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})