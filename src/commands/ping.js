const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
// const util = require("../util/util");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
  /**
   * @param {Discord.CommandInteraction} interaction
   */
  async execute(interaction) {
    // const lang = util.setLang(interaction.locale);
    await interaction.reply("Pong!");
  },
};
