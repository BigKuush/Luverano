#!/usr/bin/env bash
set -euo pipefail

# Конфиг
APP_NAME=${APP_NAME:-luverano}
BUILD_DIR=.next
RELEASE_DIR=release
ARCHIVE_NAME=${ARCHIVE_NAME:-${APP_NAME}-release-$(date +%Y%m%d-%H%M%S).tar.gz}

echo "[1/4] Clean previous build artifacts"
rm -rf "$BUILD_DIR" "$RELEASE_DIR"

echo "[2/4] Install deps (ci, include optional for sharp)"
npm ci --include=optional

echo "[3/4] Build (prebuild image optimize runs automatically)"
npm run build

echo "[4/4] Prepare release payload"
mkdir -p "$RELEASE_DIR/.next"
cp -r .next/standalone "$RELEASE_DIR/.next/standalone"
cp -r .next/static "$RELEASE_DIR/.next/static"
cp -r public "$RELEASE_DIR/public"
cp ecosystem.config.cjs "$RELEASE_DIR/"

# PM2 logs dir (used in ecosystem)
mkdir -p "$RELEASE_DIR"/logs

tar -C "$RELEASE_DIR" -czf "$ARCHIVE_NAME" .
echo "Created archive: $ARCHIVE_NAME"

cat <<'EON'
---
Загрузка на Jino (пример через ssh/rsync):

# 1) Копируем архив на сервер
rsync -avz --progress ./REPLACE_ME_ARCHIVE_NAME.tar.gz user@server:/var/www/REPLACE_ME_APP_DIR/

# 2) Заходим на сервер и раскладываем релиз
ssh user@server 'cd /var/www/REPLACE_ME_APP_DIR && \
  mkdir -p current && \
  tar -xzf REPLACE_ME_ARCHIVE_NAME.tar.gz -C current && \
  cd current && \
  npm i --omit=dev --include=optional || true'

# 3) PM2 старт/рестарт (в каталоге current)
ssh user@server 'cd /var/www/REPLACE_ME_APP_DIR/current && \
  pm2 startOrReload ecosystem.config.cjs --only luverano && \
  pm2 save && pm2 status'

# 4) Проверка
ssh user@server 'curl -I http://127.0.0.1:3000 | head -n1'

Примечания:
- Если у Jino иной путь к Node/PM2, используйте абсолютные пути (например /opt/node/bin/pm2).
- PORT можно поменять через переменную окружения PM2 (см. ecosystem.config.cjs).
- При первом запуске создайте ссылку `.next/static` на `.next-standalone/_next/static` если нужно.
---
EON

echo "Подставьте имя архива: $ARCHIVE_NAME в инструкцию выше."


