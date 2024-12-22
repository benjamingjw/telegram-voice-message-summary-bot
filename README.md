# Telegram Voice Message Transcription and Summarization Bot

A Telegram bot that transcribes voice messages and provides summaries using OpenAI's Whisper and GPT-4 models:

![image](https://github.com/user-attachments/assets/cf896a5d-4be3-4742-a8aa-b74fa5845232)


## Features

- Receives voice messages via Telegram
- Converts .ogg audio files to .mp3 format
- Transcribes audio using OpenAI's Whisper model
- Summarizes transcriptions using GPT-4
- Sends both transcription and summary back to the user

## Prerequisites

Before running this bot, make sure you have the following installed:
- Node.js (v16 or higher)
- npm (Node Package Manager)
- FFmpeg

### Installing FFmpeg

#### Windows
1. Download FFmpeg from the [official website](https://ffmpeg.org/download.html)
2. Add FFmpeg to your system's PATH environment variable

#### macOS
```bash
brew install ffmpeg
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install ffmpeg
```

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
OPENAI_API_KEY=your_openai_api_key
```

## Setting up the Environment Variables

1. Get a Telegram Bot Token:
   - Message [@BotFather](https://t.me/botfather) on Telegram
   - Create a new bot using the `/newbot` command
   - Copy the provided token

2. Get an OpenAI API Key:
   - Sign up for an OpenAI account at [OpenAI's website](https://openai.com)
   - Navigate to the API section
   - Create a new API key
   - Copy the key

## Running the Bot

1. Start the bot:
```bash
npm start
```

2. Send a voice message to your bot on Telegram
3. The bot will process the message and reply with both a transcription and summary

## Project Structure

```
├── src/
│   └── index.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Dependencies

- node-telegram-bot-api
- openai
- dotenv
- axios
- fluent-ffmpeg

## Contributing

Feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Error Handling

If you encounter any issues:
1. Make sure all environment variables are correctly set
2. Verify that FFmpeg is properly installed and accessible from the command line
3. Check that your OpenAI API key has sufficient credits
4. Ensure your Telegram bot token is valid

