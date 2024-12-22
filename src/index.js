import TelegramBot from 'node-telegram-bot-api';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import axios from 'axios';
import { writeFile, unlink } from 'fs/promises';
import ffmpeg from 'fluent-ffmpeg';
import { promisify } from 'util';
import fs from 'fs';

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Convert ffmpeg to promise-based
const ffmpegPromise = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat('mp3')
      .on('end', resolve)
      .on('error', reject)
      .save(outputPath);
  });
};

// Clean up files
const cleanupFiles = async (...files) => {
  for (const file of files) {
    try {
      await unlink(file);
    } catch (error) {
      console.error(`Error deleting file ${file}:`, error);
    }
  }
};

bot.on('voice', async (msg) => {
  const chatId = msg.chat.id;
  const oggFilePath = `temp_${Date.now()}.ogg`;
  const mp3FilePath = `temp_${Date.now()}.mp3`;

  try {
    await bot.sendMessage(chatId, '🎧 Processing your voice message...');

    // Get voice file path
    const file = await bot.getFile(msg.voice.file_id);
    const filePath = file.file_path;
    const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${filePath}`;

    // Download voice file
    const response = await axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'arraybuffer'
    });

    // Save ogg file
    await writeFile(oggFilePath, response.data);

    // Convert ogg to mp3
    await ffmpegPromise(oggFilePath, mp3FilePath);

    // Transcribe with Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(mp3FilePath),
      model: 'whisper-1'
    });

    // Summarize with GPT-4
    const summary = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful notes-assistant that summarizes text concisely but without losing meaning.'
        },
        {
          role: 'user',
          content: `Please summarize this text. Share the 3-5 main points as key take aways, in bullet points.: ${transcription.text}`
        }
      ]
    });

    // Send results
    //await bot.sendMessage(chatId, '📝 Transcription:\n' + transcription.text);
    await bot.sendMessage(chatId, '📋 Summary:\n' + summary.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error);
    await bot.sendMessage(chatId, '❌ Sorry, there was an error processing your voice message.');
  } finally {
    // Cleanup temporary files
    await cleanupFiles(oggFilePath, mp3FilePath);
  }
});

bot.on('message', async (msg) => {
  if (msg.text === '/start') {
    await bot.sendMessage(msg.chat.id, 'Send me a voice message and I\'ll transcribe and summarize it for you! 🎤');
  }
});

console.log('Bot is running...');