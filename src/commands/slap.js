import { RichEmbed } from 'discord.js';

const Command = {
  name: 'slap',
  description: 'slap',
  usage: '<@nickname1> <@nicknameN>',
  args: true,
  guildOnly: true,
  // TODO: cooldown: 5,
  execute(message) {
    if (message.mentions.users.size) {
      const prefix =
        message.mentions.users.size > 1 ? 'Раздал пощёчины' : 'Дал пощёчину';
      const text = message.mentions.users
        .map(user => `<@${user.id}>`)
        .join(', ');

      if (text) {
        const embed = new RichEmbed()
          .setColor(0xff0000)
          .setDescription(`${prefix}: ${text}`);

        return message.delete().then(() => message.channel.send({ embed }));
      }
    }

    return message.reply('you need to tag a user in order to slap them!');
  },
};

export default Command;
