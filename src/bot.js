const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("../config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

// read only javascript command files
const commandFolders = fs.readdirSync("./src/commands");
for (const folder of commandFolders) {
  let commandFiles = fs
    .readdirSync(`./src/commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    let command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

// startup bot
client.once("read", () => {
  console.log("ready");
});
client.login(token);

// on message
client.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // if no command, return

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});
