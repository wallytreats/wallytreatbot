//Initial requires.
var tmi = require('tmi.js');
var env = require("dotenv").config();

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
  channels: ["Wallytreats"],
}
//This is creating our client connection with settings.
var client = new tmi.client(options);

//This connects to the twitch.
client.connect();

//This function is executed as soon as the bot has connected to the channel.
client.on("connected", function(address, port){
  client.action("Wallytreats", "You have summoned me.");
});

//This function is executed everytime someone sends a message in the chat.
client.on("chat", function(channels, user, message){
  //this statement checks the contents of a message and creates commands.
  //check the contents of the message to see if they match the given message, cant contain the command, it must be the entire statement
  //This allows you to set commands or even words without worrying if someone was to use the word in a sentence or so on.
  if(message === "hello"){
    client.say("Wallytreats", " Hi! " + user["display-name"])
  }

  if(message === "!twitter"){
    client.say("Wallytreats", "twitter.com/wallytreats")
  }

  if(message === "!discord"){
    client.say("Wallytreats", "discord.gg/jfQ3kTd")
  }

  if(message === '!command'){
    client.say("Wallytreats", "This is the command response")
  }
});

client.on("ban", function (channel, username, reason) {
    client.say("Wallytreats", "User: " + user[display-name] + " - has been banned.")
    console.log(user[display-name]);
});
