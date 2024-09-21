require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');

// Import controllers
const { checkAvailability } = require('controllers/doctorController');
const { handleAppointmentBooking } = require('./src/controllers/appointmentController');

// Initialize the Telegram bot
const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN, { polling: true });

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection failed:', error));

// Telegram bot commands

// /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Welcome to the Healthcare Bot! Use /check_availability to check doctor availability or /book_appointment to book an appointment.");
});

// /check_availability command
bot.onText(/\/check_availability/, (msg) => {
  const chatId = msg.chat.id;
  checkAvailability(bot, chatId);
});

// /book_appointment command
bot.onText(/\/book_appointment/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Please provide your name and preferred doctor in this format: Name, Doctor, Time (e.g., John, Dr. Smith, 10:00 AM)');
  
  bot.once('message', (reply) => {
    const [patientName, doctorName, appointmentTime] = reply.text.split(',');
    handleAppointmentBooking(bot, chatId, patientName.trim(), doctorName.trim(), appointmentTime.trim());
  });
});
