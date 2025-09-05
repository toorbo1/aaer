from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes

BOT_TOKEN = "8206130580:AAG91R9Bnp2pYG0z9v1eRJmH8oZvThsN9eA"
WEB_APP_URL = "https://toorbo1.github.io"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [[InlineKeyboardButton("🎯 Открыть приложение", web_app={"url": WEB_APP_URL})]]
    await update.message.reply_text("Добро пожаловать! Нажмите кнопку:", reply_markup=InlineKeyboardMarkup(keyboard))

def main():
    application = Application.builder().token(BOT_TOKEN).build()
    application.add_handler(CommandHandler("start", start))
    print("Бот запущен!")
    application.run_polling()

if __name__ == "__main__":
    main()