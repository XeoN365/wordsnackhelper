'use strict';
const BootBot = require('bootbot');
const https = require('http');

// Creating a bot instance
const bot = new BootBot({
  accessToken: 'EAAaTzJFfr8QBAKCxGe7GOxHUbcERn3OcGZCDeEN2HoofyDJgRLtcCVZAz37pgNyASGYrOr33bKoeCncYkBtWLaQ8ZASeMD2l4ZCBPKZApIDqeaI6V5SL3fZBbU0tv0T0cTdMdU5lnkBMyFSQWNZAAC8jOZBxo9o7B7ElS3AsxexXZAQZDZD',
  verifyToken: process.env.VERIFICATION_TOKEN, //process.env.VERIFICATION_TOKEN is the same as access token but this is used as a variable on heroku
  appSecret: 'b4429f036f24817598d0cf688b244095'
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
          var _txt_temp = [];
          for(var i = 0; i<txt.all.length ; i++) {
            //Checking if word has more than one letter
              if(txt.all[i].length >1)
              {
                //Adding this word into temporary aray
                _txt_temp.push(txt.all[i]);
                
              }
           }
           //Assigning data from temporary array into array that is going to be used
           _txt = _txt_temp;
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