const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  name: "first",
  description: "First player!",
  async execute(message, args) {
    await fetch(`https://kagstats.com/api/leaderboard`)
      .then((response) => response.json())
      .then((res) => {
        const embed = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle("Best player in the game")
          .setThumbnail(res.leaderboard[0].player.avatar)
          .addFields(
            {
              name: res.leaderboard[0].player.username,
              value: "Registed on: " + res.leaderboard[0].player.registered,
            },
            { name: "\u200B", value: "\u200B" },
            {
              name: "Total Kills",
              value: res.leaderboard[0].totalKills,
              inline: true,
            },
            {
              name: "Total Deaths",
              value: res.leaderboard[0].totalDeaths,
              inline: true,
            }
          );
        message.channel.send(embed);
      });
  },
};
