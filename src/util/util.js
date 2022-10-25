const schedule = require("node-cron");
const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");

module.exports = {
  /**
   * @param {Date} date
   * @param {Function} callback
   * @param  {...any} args
   */
  schedule: async function (date, callback, ...args) {
    function dateToCron(date) {
      const minutes = date.getMinutes();
      const hours = date.getHours();
      const days = date.getDate();
      const months = date.getMonth() + 1;
      const dayOfWeek = date.getDay();
      return `${minutes} ${hours} ${days} ${months} ${dayOfWeek}`;
    }
    schedule.schedule(dateToCron(date), await callback(args));
  },
  /**
   * @description read file and if file does not exist, write file
   * @param path 파일 위치
   * @returns
   */
  readFile: function (path) {
    if (typeof path !== "string")
      throw new Error(`Path must be string, not ${typeof path}`);
    if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify([]));
    let read = fs.readFileSync(path, "utf8");
    return JSON.parse(read);
  },
  /**
   * @description set language
   * @param {string | Discord.Interaction.locale | Discord.User.locale} locale user locale: ex) "ko"
   * @returns {}
   */
  setLang: function (locale) {
    let dirpath = path.join(__dirname, "..", "lang");
    let dir = fs.readdirSync(dirpath);

    for (const file of dir) {
      if (locale === file.trimEnd().replace(".json", "")) {
        const File = require(`${dirpath}/${file}`);
        return File;
      }
    }
    return null;
  },
};
