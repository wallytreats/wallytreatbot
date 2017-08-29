//requires
var tmi = require('tmi.js');
var env = require("dotenv").config();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var httpRequest = new XMLHttpRequest();

httpRequest.open('GET', 'https://api.twitch.tv/kraken/clips/top?limit=1&channel=badbadrobot');
httpRequest.setRequestHeader('Client-ID', 'uo6dggojyb8d6soh92zknwmi5ej1q2');
httpRequest.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
httpRequest.send();

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
  channels: ["wallytreats", "xbeezlebubs"],
}
//This is creating our client connection with settings.
var client = new tmi.client(options);

//This connects to the twitch.
client.connect();
//when connected do this
client.on("connected", function(address, port){
  //use a forEach loop to call client.action on every channel in the options.channels array1
  for (let i = 0; i < options.channels.length; i++){
    client.action(options.channels[i], "You have summoned me.");
  }
});

//This function is executed everytime someone sends a message in the chat.
client.on("chat", function(channels, user, message){
//test command
  if(message === "hello"){
    client.say(channels, " Hi! " + user["display-name"])
  }

  if(message === "!twitter"){
    client.say(channels, "Follow me on Twitter => twitter.com/wallytreats")
  }

  if(message === "!discord"){
    client.say(channels, "Join my Discord server => discord.gg/jfQ3kTd")
  }

  if(message === "!trendingclip"){
    (function () {
      var clipList = JSON.parse(httpRequest.responseText);

      clipList.clips.forEach(function(clip, index, array) {
          client.say(channels, clip.embed_url)
      });
    })();
  }
  //end of chat listener
});

client.on("ban", function (channel, username, reason) {
    client.say(channel, "User: " + user[display-name] + " - has been banned.")
});
