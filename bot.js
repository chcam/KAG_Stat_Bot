const eris = require("eris");
const config = require("./config.json");

// creating bot
const bot = new eris.Client(config.token);

// When the bot is connected and ready, log to console.
bot.on("ready", () => {
  console.log("Connected and ready.");
});
