const fetch = require("node-fetch");
const querystring = require("querystring");

module.exports = {
  name: "map",
  description: "Map!",
  async execute(message, args) {
    const query = querystring.stringify({ term: args.join(" ") });
    await fetch(`https://kagstats.com/api/maps`)
      .then((response) => response.json())
      .then((res) => message.channel.send(JSON.stringify(res[0])));
  },
};
