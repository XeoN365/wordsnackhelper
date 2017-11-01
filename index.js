'use strict';
const BootBot = require('bootbot');
const https = require('http');


const bot = new BootBot({
  accessToken: 'EAAaTzJFfr8QBAKCxGe7GOxHUbcERn3OcGZCDeEN2HoofyDJgRLtcCVZAz37pgNyASGYrOr33bKoeCncYkBtWLaQ8ZASeMD2l4ZCBPKZApIDqeaI6V5SL3fZBbU0tv0T0cTdMdU5lnkBMyFSQWNZAAC8jOZBxo9o7B7ElS3AsxexXZAQZDZD',
  verifyToken: process.env.VERIFICATION_TOKEN,
  appSecret: 'b4429f036f24817598d0cf688b244095'
});

bot.on('message', (payload, chat) => {
  const text = payload.message.text;
  var txt;
  var response = "";
  console.log(text);
  if(text.length <= 9)
  {
    https.get('http://www.anagramica.com/all/:'+text,(resp) => {
        let data = '';
       
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });
       
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          txt = JSON.parse(data);
          console.log(txt);
          console.log(txt.all);
          for(var i = 0; i<txt.all.length ; i++) {
            response.concat(" ".concat(txt.all[i]));
            console.log(txt.all[i]);
            console.log("Current: "+response);
           }
        
        });
       
      })
    
    chat.say(`Echo: ${response}`);
  }
});

bot.start();