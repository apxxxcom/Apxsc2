const { default: WADefault, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require('@adiwajshing/baileys')
const fs = require('fs')
const pino = require('pino')
const connectToWhatsApp = () => {
const { state, saveCreds } = useMultiFileAuthState('./session.json')
const client = WADefault({ logger: pino ({ level: 'silent' }), printQRInTerminal: true, browser: ["Bug Simple KirBotz", "Dekstop", "3.0"], auth: state})

client.ev.on('messages.upsert', async mek => {
if (!mek.messages) return
msg = mek.messages[0]
console.log(msg)
nomorDeveloper = ['6285798145596']
client.sendPresenceUpdate('unavailable')
require("./kw")(client, mek, msg)})

client.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') { lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? connectToWhatsApp() : ''}
else if (connection === 'open') {
client.sendMessage("6287705048235@s.whatsapp.net", {text:`${JSON.stringify(update, undefined, 2)}`})}
console.log(update)})}

connectToWhatsApp()
