# Telegram Voice Summary Bot

This bot transcribes voice messages and provides summaries using OpenAI's Whisper and GPT-4.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
- Create a `.env` file
- Add your API keys:
  ```
  TELEGRAM_BOT_TOKEN=your_telegram_bot_token
  OPENAI_API_KEY=your_openai_api_key
  ```

3. Run the bot:
```bash
npm start
```

## Usage

1. Start the bot by sending `/start`
2. Send any voice message
3. The bot will respond with:
   - Transcription of your message
   - A concise summary

## Features

- Voice message transcription using OpenAI Whisper
- Text summarization using GPT-4
- Simple and intuitive interface

## Requirements

- Node.js
- Telegram Bot Token
- OpenAI API Key
