//Initial requires
var tmi = require("tmi.js");
var env = require("dotenv").config();
var axios = require("axios");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var httpRequest = new XMLHttpRequest();
var globalChannel = null;

//functions that make calls
async function clipRequest(){
  var theChannel = globalChannel
  httpRequest.open('GET', `https://api.twitch.tv/kraken/clips/top?limit=1&channel=${theChannel}`);
  httpRequest.setRequestHeader('Client-ID', 'uo6dggojyb8d6soh92zknwmi5ej1q2');
  httpRequest.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  await httpRequest.send();
}

async function grabUsers (){
  await axios.get('http://localhost:3800/username')
  .then(function (response) {
    for(let i = 0; i < response.data.length; i++){
      options.channels.push(response.data[i].username);
    }
    console.log("USERS FETCHED");
  })
  .catch(function (error) {
    // console.log(error);
  });
  clipRequest();
}
grabUsers();
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
  channels: [],//these come from the server
}

//This is creating our client connection with settings.
var client = new tmi.client(options);

//This connects to the twitch.
client.connect();

//when connected do this
client.on("connected", function(address, port){
  // for (let i = 0; i < options.channels.length; i++){
  //   client.action(options.channels[i], "You have summoned me.");
  // }
});

// function noHash (arr){
//   for (let i = 0; i < arr.length; i++){
//     var chanArr = arr.replace(/[#]/g, "");
//   }
// }

//This function is executed everytime someone sends a message in the chat.
client.on("chat", function(channel, user, message){
  globalChannel = channel.replace(/[#]/g, "");
  //get trendingclip from async await function
  function getClip(user) {
        var clipList = JSON.parse(httpRequest.responseText);
        clipList.clips.forEach(function(clip, index, array) {
            client.say(channel, "Here is " + user + "'s current trending clip:" + clip.embed_url)
        });
      };
//test command
  if(message === "hello"){
    client.say(channel, " Hi! " + user["display-name"])
  }

  if(message === "!twitter"){
    client.say(channel, "Follow me on Twitter => twitter.com/wallytreats")
  }

  if(message === "!discord"){
    client.say(channel, "Join my Discord server => discord.gg/jfQ3kTd")
  }

  if(message === "!trendingclip"){
    console.log(globalChannel);
    setTimeout(function(){
      getClip(channel);
    }, 1000);

    clipRequest();
  }
  //end of chat listener
});

client.on("ban", function (channel, username, reason) {
    client.say(channel, "User: " + user[display-name] + " - has been banned.")
});
