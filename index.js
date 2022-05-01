
const Discord = require("discord.js");
const config = require("./config.json");
const eskomApi = require("eskom-loadshedding-api");

const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

const prefix = "!tony ";

client.on("messageCreate", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    message.reply(`Ping! I am alive`);
  }

  else if (command === "status") {
    const area = args[0];
    message.reply(`Checking if there's loadshedding ${area ?? 'in ' + area}`);

    eskomApi.Status.getStatus()
      .then((status) => message.reply(`Current status: ${status}`))
      .catch((reason) => message.reply(`ESKOM ERROR: ${reason}`))
  }
});

client.login(config.BOT_TOKEN);
