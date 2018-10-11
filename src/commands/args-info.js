const Command = {
  name: 'args-info',
  description: 'Information about the arguments provided.',
  args: true,
  usage: 'arg1 arg2 argN',
  execute(message, args) {
    if (args[0] === 'foo') {
      return message.channel.send('bar');
    }

    return message.channel.send(
      `Arguments: ${args}\nArguments length: ${args.length}`
    );
  },
};

export default Command;
