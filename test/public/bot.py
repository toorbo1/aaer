import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes

BOT_TOKEN = "ВАШ_ТОКЕН_ОТ_BOTFATHER"
WEB_APP_URL = "https://ваш-сайт.com/index.html"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [[InlineKeyboardButton(
        text="🎯 Открыть приложение", 
        web_app={"url": WEB_APP_URL}
    )]]
    
    await update.message.reply_text(
        "Добро пожаловать! Нажмите кнопку ниже:",
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

def main():
    application = Application.builder().token(BOT_TOKEN).build()
    application.add_handler(CommandHandler("start", start))
    print("Бот запущен...")
    application.run_polling()

if __name__ == "__main__":
    main()