import { NextResponse } from 'next/server';
import { formatPrice } from '@/lib/utils/price';
import { bitrix24 } from '@/lib/bitrix24';

// Тип для данных заказа
type OrderData = {
  items: Array<{
    id: number | string;
    title: string;
    price: number;
    quantity: number;
    color?: string;
    size?: string;
  }>;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  delivery: {
    type: 'free' | 'express';
    address?: string;
    date?: string;
  };
  totals: {
    subtotal: number;
    shipping: number;
    total: number;
  };
};

// Функция для форматирования текста сообщения
function formatOrderMessage(order: OrderData): string {
  const items = order.items.map(item => 
    `• ${item.title} - ${formatPrice(item.price)} x ${item.quantity} шт.`
  ).join('\n');

  return `
🛋 Новый заказ на Luverano

👤 Клиент:
Имя: ${order.customer.name}
Телефон: ${order.customer.phone}
Email: ${order.customer.email}

📦 Товары:
${items}

🚚 Доставка:
Тип: ${order.delivery.type === 'free' ? 'Бесплатная' : 'Срочная'}
${order.delivery.address ? `Адрес: ${order.delivery.address}` : ''}
${order.delivery.date ? `Дата: ${order.delivery.date}` : ''}

💰 Итого:
Подытог: ${formatPrice(order.totals.subtotal)}
Доставка: ${formatPrice(order.totals.shipping)}
Итого к оплате: ${formatPrice(order.totals.total)}
`;
}

// Функция для отправки в Telegram
async function sendToTelegram(message: string) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram credentials not configured');
    return;
  }

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });
  } catch (error) {
    console.error('Error sending to Telegram:', error);
  }
}

// Отправка письма через SendGrid API (без дополнительных зависимостей)
async function sendEmail(subject: string, text: string) {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const ORDER_EMAIL_FROM = process.env.ORDER_EMAIL_FROM; // например: orders@luverano.ru
  const ORDER_EMAIL_TO = process.env.ORDER_EMAIL_TO;     // например: info@luverano.ru

  if (!SENDGRID_API_KEY || !ORDER_EMAIL_FROM || !ORDER_EMAIL_TO) {
    // Конфиг не задан — тихо выходим
    return;
  }

  try {
    await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          { to: [{ email: ORDER_EMAIL_TO }], subject }
        ],
        from: { email: ORDER_EMAIL_FROM, name: 'Luverano' },
        content: [{ type: 'text/plain', value: text }],
      }),
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Основной обработчик POST запросов
export async function POST(request: Request) {
  try {
    const order: OrderData = await request.json();

    // Форматируем сообщение
    const message = formatOrderMessage(order);

    // Отправляем в Telegram
    await sendToTelegram(message);

    // Отправляем на почту (если настроено)
    await sendEmail('Новый заказ на Luverano', message);

    // Создаем лид в Битрикс24
    try {
      const leadData = {
        id: Date.now(),
        customer: {
          firstName: order.customer.name.split(' ')[0] || 'Клиент',
          lastName: order.customer.name.split(' ').slice(1).join(' ') || '',
          email: order.customer.email,
          phone: order.customer.phone,
          address: order.delivery.address || ''
        },
        items: order.items,
        totalAmount: order.totals.total,
        delivery: order.delivery,
        notes: `Заказ через сайт. ${order.delivery.address ? `Адрес: ${order.delivery.address}` : ''}`
      };

      await bitrix24.createLead(leadData);
      console.log('Лид успешно создан в Битрикс24');
    } catch (bitrixError) {
      console.error('Ошибка создания лида в Битрикс24:', bitrixError);
      // Не прерываем выполнение, если Битрикс24 недоступен
    }

    // Возвращаем успешный ответ
    return NextResponse.json({ 
      success: true,
      message: 'Заказ успешно отправлен' 
    });

  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Ошибка при обработке заказа' 
      },
      { status: 500 }
    );
  }
}
