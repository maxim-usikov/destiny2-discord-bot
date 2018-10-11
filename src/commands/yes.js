const Command = {
  name: 'yes',
  description: 'Yes!',
  guildOnly: true,
  execute(message) {
    message.channel.send(`${message.author} — ХУЙ НА!`);
  },
};

export default Command;
