const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("../config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

// read only javascript command files
const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

// startup bot
client.once("read", () => {
  console.log("ready");
});
client.login(token);

// on message
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // remove args from command body
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // if no command, return
  if (!client.commands.has(command)) return;

  // execute commands
  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});
