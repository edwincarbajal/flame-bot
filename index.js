require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}


client.on("ready", () => {
  console.log("client is online!");
});

client.on("message", (message) => {
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot)
    return;

  const args = message.content
    .slice(process.env.PREFIX.length)
    .trim()
    .split(/ +/);
  const command = args.shift().toLowerCase();

  try {
    switch (command) {
      case "flame-here":
      case "flame-help":
      case "flame-save":
      case "flame-random":
      case "flame-stats":
      case "flame":
        client.commands.get(command).execute(message, args);
        break;
      default:
        message.reply("Command does not exist, type `!flame-help`");
        break;
    }
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }

});

client.login(process.env.TOKEN);
