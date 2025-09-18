'use client'

import { useState } from 'react'

export default function TestOrderPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const testOrder = async () => {
    setLoading(true)
    setResult(null)

    try {
      const orderData = {
        items: [
          {
            id: 1,
            title: "Современное деревянное кресло",
            price: 150000,
            quantity: 1,
            color: "Коричневый",
            size: "M"
          }
        ],
        customer: {
          name: "Иван Петров",
          email: "ivan@example.com",
          phone: "+7 (495) 123-45-67"
        },
        delivery: {
          type: "free",
          address: "Москва, ул. Тестовая, д. 1",
          date: "2024-01-15"
        },
        totals: {
          subtotal: 150000,
          shipping: 0,
          total: 150000
        }
      }

      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      })

      const data = await response.json()
      
      if (data.success) {
        setResult('✅ Заказ успешно отправлен! Проверьте Битрикс24 и Telegram.')
      } else {
        setResult(`❌ Ошибка: ${data.message}`)
      }
    } catch (error) {
      setResult(`❌ Ошибка: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Тест заказа</h1>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              Эта страница позволяет протестировать отправку заказа и интеграцию с Битрикс24.
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Перед тестированием убедитесь:</h3>
              <ul className="list-disc list-inside text-yellow-700 text-sm space-y-1">
                <li>Настроена переменная BITRIX24_WEBHOOK_URL в .env.local</li>
                <li>Вебхук создан в Битрикс24 с правами на CRM</li>
                <li>Настроены переменные TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID (опционально)</li>
              </ul>
            </div>

            <button
              onClick={testOrder}
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? 'Отправка...' : 'Отправить тестовый заказ'}
            </button>

            {result && (
              <div className={`p-4 rounded-lg ${
                result.startsWith('✅') 
                  ? 'bg-green-50 border border-green-200 text-green-700' 
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                {result}
              </div>
            )}

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Что происходит при отправке заказа:</h3>
              <ol className="list-decimal list-inside text-blue-700 text-sm space-y-1">
                <li>Создается лид в Битрикс24 с данными клиента и заказом</li>
                <li>Отправляется уведомление в Telegram (если настроено)</li>
                <li>Возвращается подтверждение об успешной отправке</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
