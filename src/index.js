import './env';
import Discord from 'discord.js';
import Ping from './commands/ping';
import ArgsInfo from './commands/args-info';
import Yes from './commands/yes';
import No from './commands/no';
import Slap from './commands/slap';

const { DISCORD_BOT_TOKEN, DISCORD_COMMAND_PREFIX } = process.env;
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.commands.set(Ping.name, Ping);
client.commands.set(ArgsInfo.name, ArgsInfo);
client.commands.set(Yes.name, Yes);
client.commands.set(No.name, No);
client.commands.set(Slap.name, Slap);

client.on('ready', () => {
  console.log('Bot is READY!');
  client.user.setActivity('Destiny 2: Forsaken', { type: 'PLAYING' });
});

function yesNo(message) {
  if (message.content.trim().toLowerCase() === 'да') {
    const command = client.commands.get('yes');
    if (command) {
      command.execute(message, []);
    }
  }

  if (message.content.trim().toLowerCase() === 'нет') {
    const command = client.commands.get('no');
    if (command) {
      command.execute(message, []);
    }
  }
}

function isCommand(message) {
  return (
    message.content.startsWith(DISCORD_COMMAND_PREFIX) && !message.author.bot
  );
}

function hasCommand(name) {
  return client.commands.has(name);
}

function canExecute(message, command, args) {
  if (command.guildOnly && message.channel.type !== 'text') {
    message.reply('I cant execute that command inside DMs!');
    return false;
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      const usage = `${DISCORD_COMMAND_PREFIX}${command.name} ${command.usage}`;
      reply += `\nThe proper usage would be: \`${usage}\``;
    }

    message.channel.send(reply);
    return false;
  }

  return true;
}

client.on('message', message => {
  // TODO: refactor yesNo reaction
  yesNo(message);

  if (isCommand(message)) {
    const args = message.content
      .slice(DISCORD_COMMAND_PREFIX.length)
      .split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (hasCommand(commandName)) {
      const command =
        client.commands.get(commandName) ||
        client.commands.find(
          cmd => cmd.aliases && cmd.aliases.includes(commandName)
        );

      if (canExecute(message, command, args)) {
        try {
          command.execute(message, args);
        } catch (error) {
          console.error(error);
          message.reply('there was an error trying to execute that command!');
        }
      }
    }
  }
});

client.login(DISCORD_BOT_TOKEN);
