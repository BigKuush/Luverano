#!/bin/bash

echo "🚀 АВТОМАТИЧЕСКИЙ ДЕПЛОЙ..."

# Останавливаем PM2
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# Обновляем код
echo "📥 Обновляем код..."
git pull origin main

# Очищаем кэш
echo "🧹 Очищаем кэш..."
rm -rf .next

# Устанавливаем зависимости
echo "📦 Устанавливаем зависимости..."
npm install

# Собираем проект
echo "🔨 Собираем проект..."
npm run build

# Запускаем
echo "🚀 Запускаем проект..."
pm2 start npm --name "luverano" -- start

# Показываем статус
echo "📊 Статус:"
pm2 status

echo "✅ ГОТОВО! Сайт обновлен и запущен!"
echo "🌐 Проверьте: http://localhost:3000"
