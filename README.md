````markdown
# 📤 Discord Message Forwarder (Selfbot)

A personal-use **Discord selfbot** that listens to messages from specific channels and **forwards them** (along with attachments and embeds) to a different channel via a **webhook**.

> ⚠️ This tool is for educational and personal use only. It violates Discord's Terms of Service to use selfbots on your main account.

---

## 🚀 Features

- 📨 Listens to specific channels (configurable)
- 📝 Forwards:
  - Text messages
  - Attachments (images/files)
  - Embeds (fallback to text or summary)
  - Referenced messages (quotes)
- 🧠 Smart fallback for unreadable content
- 📁 Sends messages to a webhook in a readable format using rich embeds
- 📷 (Coming soon) Convert embeds into images if not readable via text

---

## 🛠 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/adeemadil/DiscordBot-Test.git
cd discord-message-forwarder
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a `.env` File

Create a `.env` file in the root directory and add:

```env
DISCORD_USER_TOKEN=your_discord_user_token
DISCORD_WEBHOOK_URL=your_webhook_url
ALLOWED_CHANNEL_IDS=channel_id_1,channel_id_2
```

> 💡 To get your user token: Open DevTools > Application > Local Storage > [https://discord.com](https://discord.com) > find `token`
> ⚠️ Use at your own risk — this is not allowed by Discord ToS.

### 4. Start the Bot

```bash
node index.js
```

---

## 📂 Example Output

Example of a forwarded message sent to your webhook:

```
📨 Message by: JohnDoe
🕒 Time: 5 minutes ago

💬 Content: Hello! Here's the file you asked for.

📁 Channel: general

📎 [Attachment](https://cdn.discordapp.com/attachments/...)
```

---

## 🧱 Project Structure

```
.
├── index.js         # Main bot logic
├── .env             # Config for tokens & channels
├── .gitignore       # Prevents committing sensitive files
└── package.json     # Project metadata and dependencies
```

---

## 🧪 Tested With

* `discord.js-selfbot-v13`
* `axios`
* Node.js 18+
* GitHub Codespaces / Railway

---

## 🛑 Disclaimer

This project is intended strictly for **educational purposes** and **personal account monitoring only**. Using selfbots violates [Discord's Terms of Service](https://discord.com/terms) and may lead to your account being terminated.

---

## 📌 License

MIT License — use freely, but at your own risk.

---

## ✨ Future Ideas

* Render embeds to image if text content is inaccessible
* Dashboard to manage channels and tokens
* Logs and analytics dashboard

```
