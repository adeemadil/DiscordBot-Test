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
  console.log(✅ Logged in as ${client.user.username});
});

client.on('messageCreate', async (message) => {
  try {
    if (message.author.bot) return;
    if (allowedChannelIds.length && !allowedChannelIds.includes(message.channel.id)) return;

    const serverName = message.guild?.name || 'Direct Message';
    const channelName = message.channel.name || 'DM';
    let content = message.content?.trim();

    // If message is a forwarded/embed with no text, try fallback content
    if (!content || content === '') {
      if (message.embeds?.length > 0) {
        content = message.embeds.map(e => e.description || e.title || '[embed with no readable content]').join('\n');
      } else if (message.reference) {
        try {
          const ref = await message.fetchReference();
          content = ref.content || '[Referenced message – no content]';
        } catch {
          content = '[Referenced message – not accessible]';
        }
      } else {
        content = '[No readable content]';
      }
    }

    // Include attachments
    const attachmentLinks = message.attachments.map(att => 📎 [Attachment](${att.url})).join('\n');

    const discordPayload = {
      username: "📤 Message Forwarder",
      embeds: [
        {
          title: 💬 New Message from ${serverName},
          description: 📨 **Message by:** ${message.author.username}\n +
                       🕒 **Time:** <t:${Math.floor(message.createdTimestamp / 1000)}:R>\n\n +
                       💬 **Content:** ${content}\n\n +
                       📁 **Channel:** ${channelName} +
                       (attachmentLinks ? \n\n${attachmentLinks} : ''),
          color: 3447003,
        }
      ]
    };

    await axios.post(DISCORD_WEBHOOK_URL, discordPayload);
    console.log(✅ Forwarded message from #${channelName});
  } catch (err) {
    console.error('❌ Error forwarding message:', err.message);
  }
});

client.login(DISCORD_USER_TOKEN);
