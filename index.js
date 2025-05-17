require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');
const axios = require('axios');

const client = new Client();
const DISCORD_USER_TOKEN = process.env.DISCORD_USER_TOKEN;
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const allowedChannelIds = process.env.ALLOWED_CHANNEL_IDS
  ? process.env.ALLOWED_CHANNEL_IDS.split(',').map(id => id.trim())
  : [];

client.on('ready', () => {
  console.log(`✅ Logged in as ${client.user.username}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || (allowedChannelIds.length && !allowedChannelIds.includes(message.channel.id))) return;

  const timestampUnix = Math.floor(new Date(message.createdAt).getTime() / 1000);

  const discordPayload = {
    username: "📨 Message Relay",
    embeds: [{
      title: `Message from #${message.channel.name}`,
      description: message.content || "[No text]",
      author: { name: message.author.username },
      color: 3447003,
      footer: { text: `⏰ Time: <t:${timestampUnix}:R>` }
    }]
  };

  try {
    await axios.post(DISCORD_WEBHOOK_URL, discordPayload);
    console.log(`📤 Sent: ${message.content}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
});

client.login(DISCORD_USER_TOKEN);
