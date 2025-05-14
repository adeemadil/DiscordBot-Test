const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Map source channel IDs to destination channel IDs
const channelMap = {
  'SOURCE_CHANNEL_ID_1': 'TARGET_CHANNEL_ID_1',
  'SOURCE_CHANNEL_ID_2': 'TARGET_CHANNEL_ID_2',
};

client.once('ready', () => {
  console.log(`Bot is ready: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const targetChannelId = channelMap[message.channel.id];
  if (targetChannelId) {
    const targetChannel = await client.channels.fetch(targetChannelId);
    if (targetChannel && targetChannel.isTextBased()) {
      targetChannel.send(`**${message.author.username}**: ${message.content}`);
    }
  }
});

client.login(process.env.BOT_TOKEN);
