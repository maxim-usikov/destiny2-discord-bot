import './env';
import Discord from 'discord.js';
import Ping from './commands/ping';
import ArgsInfo from './commands/args-info';
import Yes from './commands/yes';
import No from './commands/no';

const { DISCORD_BOT_TOKEN, DISCORD_COMMAND_PREFIX } = process.env;
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.commands.set(Ping.name, Ping);
client.commands.set(ArgsInfo.name, ArgsInfo);
client.commands.set(Yes.name, Yes);
client.commands.set(No.name, No);

client.on('ready', () => {
  console.log('Bot is READY!');
  client.user.setActivity('Destiny 2: Forsaken', { type: 'PLAYING' });
});

client.on('message', message => {
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

  if (!message.content.startsWith(DISCORD_COMMAND_PREFIX) || message.author.bot)
    return;

  const args = message.content.slice(DISCORD_COMMAND_PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      const usage = `${DISCORD_COMMAND_PREFIX}${command.name} ${command.usage}`;
      reply += `\nThe proper usage would be: \`${usage}\``;
    }

    message.channel.send(reply);
    return;
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

client.login(DISCORD_BOT_TOKEN);
