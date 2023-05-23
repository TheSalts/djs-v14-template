const fs = require("fs");
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const { token } = require("./src/config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildIntegrations,
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.Message,
    Partials.ThreadMember,
    Partials.User,
    Partials.GuildScheduledEvent,
  ],
});

client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js") && !file.startsWith("!"));

for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  client.commands.set(command.data.name, command);
}
const contextCommandFiles = fs
  .readdirSync("./src/contextMenu")
  .filter((file) => file.endsWith(".js") && !file.startsWith("!"));

for (const file of contextCommandFiles) {
  const command = require(`./src/contextMenu/${file}`);
  client.commands.set(command.data.name, command);
}
client.once("ready", () => {
  console.log("Command Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  let command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
  }
});

client.login(token);
