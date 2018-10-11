const Command = {
  name: 'ping',
  description: 'Ping!',
  execute(message) {
    message.channel.send('Pong.');
  },
};

export default Command;
