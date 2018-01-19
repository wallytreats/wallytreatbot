//Initial requires
var tmi = require("tmi.js");
var env = require("dotenv").config();
var axios = require("axios");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var httpRequest = new XMLHttpRequest();
var globalChannel = "Wallytreats";
var globalTwitter = "Wallytreats";
var globalDiscord = null;

//functions that make calls
async function clipRequest(){
  var theChannel = globalChannel
  httpRequest.open('GET', 'https://api.twitch.tv/kraken/clips/top?limit=1&trending=true&channel=wallytreats');
  httpRequest.setRequestHeader('Client-ID', 'of5bj8zj77v9e2z4pve9w0edt1tfdl');
  httpRequest.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  await httpRequest.send();
}

// async function grabUsers (){
//   await axios.get('https://wallybotdb.herokuapp.com/username')
//   .then(function (response) {
//     for(let i = 0; i < response.data.length; i++){
//       options.channels.push(response.data[i].username);
//     }
//     console.log("USERS FETCHED");
//   })
//   .catch(function (error) {
//     // console.log(error);
//   });
//   clipRequest();
// }
// grabUsers();

//These are the settings for the client to use.
var options = {
  options: {
    debug: true
  },
  connection: {
    cluster: "aws",
    reconnect: true
  },
  identity: {
    username: "wallytreatbot",
    password: process.env.TOKEN
  },
  channels: ["Wallytreats"],//these come from the server
}

//This is creating our client connection with settings.
var client = new tmi.client(options);

//This connects to the twitch.
setTimeout(function(){
  client.connect();
}, 1000);

//when connected do this
client.on("connected", function(address, port){
  for (let i = 0; i < options.channels.length; i++){
    client.action(options.channels[i], " PogChamp");
  }
});

//This function is executed everytime someone sends a message in the chat.
client.on("chat", function(channel, user, message){
  // globalChannel = channel.replace(/[#]/g, "");

  //get trendingclip from async await function
  function getClip(user) {
        var clipList = JSON.parse(httpRequest.responseText);
        console.log(httpRequest.responseText);
        if (clipList.clips.length > 0){
          clipList.clips.forEach(function(clip, index, array) {
            client.say(channel, "Here is " + globalChannel + "'s current trending clip:" + clip.embed_url)
            console.log("log", clip.embed_url);
          });
        } else {
          client.say(channel, globalChannel + " does not have a current trending clip")
        }
      };

      // async function grabTwitter (){
      //   await axios.get('https://wallybotdb.herokuapp.com/twitter' + globalChannel)
      //   .then(function (response) {
      //     globalTwitter = response.data[0].twitter;
      //     console.log(response.data[0].twitter);
      //   })
      //   .catch(function (error) {
      //     // console.log(error);
      //   });
      // }
      //
      // async function grabDiscord (){
      //   await axios.get('https://wallybotdb.herokuapp.com/discord' + globalChannel)
      //   .then(function (response) {
      //     globalDiscord = response.data[0].discord;
      //     console.log(response.data[0].discord);
      //   })
      //   .catch(function (error) {
      //     // console.log(error);
      //   });
      // }

//test command
  // if(message === "hello" || "hey" || "hi"){
  //   client.say(channel, "Hi! " + user["display-name"] + "Welcome to the stream.")
  // }

  if(message == "!gay"){
    client.say(channel, "Im glad you are so open about your sexuallity " + user["display-name"])
  }

  if(message == "!ember"){
    client.say(channel, "@TheEmberStrife is amazing follow her Twitch channel here: https://twitch.tv/theemberstrife")
  }

  if(message == "!tits"){
    client.say(channel, "Here's some tits for ya " + user["display-name"] + " http://i25.tinypic.com/205bhjd.jpg")
  }

  if(message == "!twitter"){
    // grabTwitter();
    // setTimeout(function(){
      client.say(channel, "Follow Wallytreats on Twitter => twitter.com/Wallytreats")
    // }, 1000);
  }

  if(message == "!discord"){
    // grabDiscord();
    // setTimeout(function(){
      client.say(channel, "Join  Wallytreats's Discord => discord.gg/jfQ3kTd")
    // }, 1000);
  }

  if(message == "!howbig"){
    client.say(channel, "Wouldnt you like to know " + user["display-name"])
  }

  // if(message == "!omg"){
  //   client.say(channel, user["display-name"] + " @Wallytreats has said 'oh my god' " + omgcount + 1 + " times.")
  // }

  if(message === "!tc" ){
    // console.log(globalChannel);
    setTimeout(function(){
      getClip(channel);
    }, 4000);
    clipRequest();
    console.log();
  }

  if(message == "!listen"){
    client.say(channel, "WALLY LOOK AT CHAT!!!" + user["display-name"] + " is trying to tell you something!" )
  }

  if(message == "!charity"){
    client.say(channel, "Be sure to include #charity in your cheers and Twitch will give money to charity every 1000 bits")
  }

  // if(message == "!jeff"){
  //   client.say(channel, "@jeffleach Twitch's King of Comedy => twitch.tv/jeffleach")
  // }

  if(message == "!hp"){
    client.say(channel, "@hpla5erjet is the nicest mod ever unless you give her a reason to kill you")
  }

  if(message == "!bbr"){
    client.say(channel, "@badbadrobot The Golden Voice of Twitch => twitch.tv/badbadrobot")
  }

  if(message == "!harambe"){
    client.say(channel, "#JusticeForHarambe")
  }

  if(message == "!music"){
    client.say(channel, "To listen to the music you are hearing go to soundcloud.com/wallytreats and click on his 'Likes' section")
  }

  if(message == "!soundcloud"){
    client.say(channel, "Listen to small selection of the music i have made soundcloud.com/wallytreats")
  }

  if(message == "!schedule"){
    client.say(channel, )
  }

  //end of chat listener
});

if(message.indexOf("!quote") === 0){
  console.log("true");
  // addQuote(message);
  if(quoteCount){
  // client.say(channel, "{username} has sucessfully added a quote");
  }
}

var message = "!quote this is a quote";
var quoteArray = [];
var quoteCount = quoteArray.length;

function addQuote(msg){
newMsg = msg.substring(msg.indexOf(" ") + 1);
quoteArray.push(newMsg);
console.log(quoteArray);
}

addQuote("!quote this is a quote");


// client.on("subscription", function (channel, username, method, message, userstate) {
//   client.say(channel, user["display-name"] + " has subscirbed. Welcome!")
// });
//
// client.on("ban", function (channel, user, reason) {
//   client.say(channel, user["display-name"] + " - has been hit with the hammer, FeelsBadMan")
// });
