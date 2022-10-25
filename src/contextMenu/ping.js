const { ContextMenuCommandBuilder } = require("@discordjs/builders");
const { ApplicationCommandType } = require("discord.js");
const Discord = require("discord.js");
// const util = require("../util/util");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("ping")
    .setType(ApplicationCommandType.Message),
  /**
   * @param {Discord.MessageContextMenuCommandInteraction} interaction
   */
  async execute(interaction) {
    // const lang = util.setLang(interaction.locale);
    await interaction.reply("Pong!");
  },
};
