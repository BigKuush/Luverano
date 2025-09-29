#!/bin/bash

# Скрипт для деплоя Luverano на сервер Jino
# Использование: ./deploy.sh

echo "🚀 Начинаем деплой Luverano..."

# Проверяем, что мы в правильной директории
if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: package.json не найден. Запустите скрипт из корня проекта."
    exit 1
fi

# Останавливаем предыдущий процесс (если запущен)
echo "🛑 Останавливаем предыдущий процесс..."
pm2 stop luverano 2>/dev/null || true
pm2 delete luverano 2>/dev/null || true

# Устанавливаем зависимости
echo "📦 Устанавливаем зависимости..."
npm install --production

# Собираем проект
echo "🔨 Собираем проект..."
npm run build

# Проверяем, что сборка прошла успешно
if [ ! -d ".next" ]; then
    echo "❌ Ошибка: Сборка не удалась. Папка .next не найдена."
    exit 1
fi

# Запускаем проект через PM2
echo "🚀 Запускаем проект через PM2..."
pm2 start npm --name "luverano" -- start

# Проверяем статус
echo "📊 Статус процессов:"
pm2 status

# Показываем логи
echo "📋 Последние логи:"
pm2 logs luverano --lines 10

echo "✅ Деплой завершен!"
echo "🌐 Сайт должен быть доступен по адресу: https://luverano.ru"
echo "📊 Для мониторинга используйте: pm2 monit"
echo "📋 Для просмотра логов: pm2 logs luverano"
