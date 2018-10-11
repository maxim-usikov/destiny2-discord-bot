const Command = {
  name: 'no',
  description: 'No!',
  guildOnly: true,
  execute(message) {
    message.channel.send(`${message.author} — ПИДОРА ОТВЕТ!`);
  },
};

export default Command;
