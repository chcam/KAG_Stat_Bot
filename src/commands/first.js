const fetch = require("node-fetch");
const querystring = require("querystring");

module.exports = {
  name: "first",
  description: "First player!",
  async execute(message, args) {
    const query = querystring.stringify({ term: args.join(" ") });
    await fetch(`https://kagstats.com/api/leaderboard`)
      .then((response) => response.json())
      .then((res) => message.channel.send(JSON.stringify(res.leaderboard[0])));
  },
};
