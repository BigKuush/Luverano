# 🚀 Деплой Luverano на сервер Jino

## 📋 Предварительные требования

1. **Node.js** версии 18+ установлен на сервере
2. **PM2** установлен глобально: `npm install -g pm2`
3. **Git** для клонирования репозитория
4. **Nginx** настроен для проксирования на порт 3000

## 🔧 Установка на сервере

### 1. Клонирование репозитория
```bash
git clone https://github.com/BigKuush/Luverano.git
cd Luverano
```

### 2. Установка зависимостей
```bash
npm install --production
```

### 3. Настройка переменных окружения
Создайте файл `.env.local` с необходимыми переменными:
```bash
cp env.example .env.local
# Отредактируйте .env.local с вашими настройками
```

## 🚀 Команды для деплоя

### Автоматический деплой (рекомендуется)
```bash
npm run deploy
# или
./deploy.sh
```

### Ручной деплой
```bash
# 1. Сборка проекта
npm run build

# 2. Запуск через PM2
npm run pm2:start

# 3. Проверка статуса
npm run pm2:status
```

## 📊 Управление процессом

### Основные команды PM2
```bash
# Запуск
npm run pm2:start

# Остановка
npm run pm2:stop

# Перезапуск
npm run pm2:restart

# Просмотр логов
npm run pm2:logs

# Статус процессов
npm run pm2:status

# Мониторинг в реальном времени
pm2 monit
```

## 🔄 Обновление проекта

### 1. Получение обновлений
```bash
git pull origin main
```

### 2. Перезапуск
```bash
npm run pm2:restart
```

### 3. Полный передеплой
```bash
npm run deploy
```

## 🐛 Отладка

### Просмотр логов
```bash
# Все логи
pm2 logs luverano

# Последние 100 строк
pm2 logs luverano --lines 100

# Логи в реальном времени
pm2 logs luverano --follow
```

### Проверка статуса
```bash
pm2 status
pm2 info luverano
```

### Перезапуск при проблемах
```bash
pm2 restart luverano
# или
pm2 reload luverano
```

## 🌐 Настройка Nginx

Убедитесь, что Nginx настроен для проксирования на порт 3000:

```nginx
server {
    listen 80;
    server_name luverano.ru www.luverano.ru;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📝 Полезные команды

```bash
# Проверка портов
netstat -tulpn | grep :3000

# Проверка процессов Node.js
ps aux | grep node

# Очистка кэша PM2
pm2 flush

# Сохранение конфигурации PM2
pm2 save
pm2 startup
```

## ✅ Проверка работоспособности

После деплоя проверьте:

1. **Главная страница**: https://luverano.ru
2. **Каталог**: https://luverano.ru/catalog
3. **Favicon**: должен отображаться во вкладке браузера
4. **Логотип**: должен отображаться в мобильной версии
5. **API**: https://luverano.ru/api/products

## 🆘 Поддержка

При возникновении проблем:

1. Проверьте логи: `pm2 logs luverano`
2. Проверьте статус: `pm2 status`
3. Перезапустите: `pm2 restart luverano`
4. Проверьте порты: `netstat -tulpn | grep :3000`
