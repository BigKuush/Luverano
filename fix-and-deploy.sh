#!/bin/bash

echo "🔧 ИСПРАВЛЯЕМ ВСЁ И ДЕПЛОИМ..."

# Останавливаем PM2
echo "🛑 Останавливаем PM2..."
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# Завершаем конфликты Git
echo "📝 Завершаем конфликты Git..."
git checkout --theirs "src/app/(innerPage)/blog-single/[id]/page.tsx" 2>/dev/null || true
git add "src/app/(innerPage)/blog-single/[id]/page.tsx" 2>/dev/null || true
git commit -m "fix: разрешены конфликты" 2>/dev/null || true

# Очищаем всё
echo "🧹 Очищаем кэш..."
rm -rf .next
rm -rf node_modules

# Устанавливаем зависимости
echo "📦 Устанавливаем зависимости..."
npm install

# Устанавливаем недостающий пакет
echo "🔧 Устанавливаем недостающие пакеты..."
npm install @tailwindcss/postcss 2>/dev/null || true

# Собираем проект
echo "🔨 Собираем проект..."
npm run build

# Запускаем
echo "🚀 Запускаем проект..."
pm2 start npm --name "luverano" -- start

# Показываем статус
echo "📊 Статус:"
pm2 status

echo "✅ ГОТОВО! Сайт запущен!"
echo "🌐 Проверьте: http://localhost:3000"
