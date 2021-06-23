const eris = require("eris");
const config = require("./config.json");

// creating bot
const bot = new eris.Client(config.token);
