'use strict';
const BootBot = require('bootbot');
const https = require('http');

// Creating a bot instance
const bot = new BootBot({
  accessToken: process.env.ACCESS_TOKEN,
  verifyToken: process.env.VERIFICATION_TOKEN, //process.env.VERIFICATION_TOKEN is the same as access token but this is used as a variable on heroku
  appSecret: process.env.APP_SECRET
});

//looking for received messages
bot.on('message', (payload, chat) => {
  const text = payload.message.text;
  var txt;
  var response = "";
  //Check if user have put more than 9 letters (API is not accepting more than 9 letters)
  if(text.length <= 9 & /^[a-zA-Z]+$/.test(text))
  {
        console.log("Word Received: "+text);
        https.get('http://www.anagramica.com/all/:'+text,(resp) => {
        let data = '';
       
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });
       
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          txt = JSON.parse(data);
          var response = "";
          var _txt = [];
          for(var i = 0; i<txt.all.length ; i++) {
            //Checking if word has more than one letter
              if(txt.all[i].length >1)
              {
                //Adding this word into temporary aray
                _txt.push(txt.all[i]);
                
              }
           }
           for(var i =0; i < _txt.length; i++)
           {
              //Checking if loop index is less than not last word to add comma
              if(i < _txt.length-1)
              {
                response = response + _txt[i]+ ", ";
              }
              // if loop index is last word add fullstop instead
              else
              {
                response = response + _txt[i] + ".";
              }
           }
           console.log("Words sent: "+response);
           //Send the words to the user
           if(response != "")
           {
            chat.say(`Words: ${response}`);
           }
           else
           {
             chat.say(`No words could be made out of "${text}"`);
           }
        
        });
       
      })
    
    
  }else
  {
    //Sending user message to put less than 9 letters
    chat.say(`Too many letters! Max 9 letters!`);
  }
});

//Start this bot
bot.start();