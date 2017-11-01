'use strict';
const BootBot = require('bootbot');

const bot = new BootBot({
  accessToken: 'EAAaTzJFfr8QBAKCxGe7GOxHUbcERn3OcGZCDeEN2HoofyDJgRLtcCVZAz37pgNyASGYrOr33bKoeCncYkBtWLaQ8ZASeMD2l4ZCBPKZApIDqeaI6V5SL3fZBbU0tv0T0cTdMdU5lnkBMyFSQWNZAAC8jOZBxo9o7B7ElS3AsxexXZAQZDZD',
  verifyToken: 'EAAaTzJFfr8QBAKCxGe7GOxHUbcERn3OcGZCDeEN2HoofyDJgRLtcCVZAz37pgNyASGYrOr33bKoeCncYkBtWLaQ8ZASeMD2l4ZCBPKZApIDqeaI6V5SL3fZBbU0tv0T0cTdMdU5lnkBMyFSQWNZAAC8jOZBxo9o7B7ElS3AsxexXZAQZDZD',
  appSecret: 'b4429f036f24817598d0cf688b244095'
});

bot.on('message', (payload, chat) => {
  const text = payload.message.text;
  chat.say(`Echo: ${text}`);
});

bot.start();