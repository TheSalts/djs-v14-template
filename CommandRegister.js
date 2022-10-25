const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { token } = require("./src/config.json");
const fs = require("fs");

const commands = [];
const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js") && !file.startsWith("!"));
const contextCommandFiles = fs
  .readdirSync("./src/contextMenu")
  .filter((file) => file.endsWith(".js") && !file.startsWith("!"));

// Place your client and guild ids here
const clientId = "";
const guildId = "";

for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
}
for (const file of contextCommandFiles) {
  const command = require(`./src/contextMenu/${file}`);
  commands.push(command.data.toJSON());
}
const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("커맨드 리로드 중");

    await rest.put(Routes.applicationCommands(clientId /*, guildId*/), {
      body: commands,
    });

    console.log("커맨드 리로드 성공");
  } catch (error) {
    console.error(error);
  }
})();
