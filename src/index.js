import './env';
import Discord from 'discord.js';

const { DISCORD_BOT_TOKEN } = process.env;
const client = new Discord.Client();

client.on('ready', () => {
  console.log('Discord client is READY!');
});

client.login(DISCORD_BOT_TOKEN);
