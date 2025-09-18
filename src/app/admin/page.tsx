import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Админ-панель | Luverano",
  description: "Управление заказами и клиентами",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Админ-панель Luverano</h1>
          
          {/* Продвинутая админка */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Продвинутая админ-панель</h2>
                <p className="text-gray-600">Полное управление заказами, создание заказов, темная/светлая тема</p>
              </div>
              <Link
                href="/admin/advanced"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Открыть админку
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Заказы */}
            <Link href="/admin/orders" className="block">
              <div className="bg-blue-50 hover:bg-blue-100 p-6 rounded-lg border border-blue-200 transition-colors">
                <div className="flex items-center">
                  <div className="bg-blue-500 text-white p-3 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Заказы</h3>
                    <p className="text-gray-600">Просмотр и управление заказами</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Клиенты */}
            <Link href="/admin/customers" className="block">
              <div className="bg-green-50 hover:bg-green-100 p-6 rounded-lg border border-green-200 transition-colors">
                <div className="flex items-center">
                  <div className="bg-green-500 text-white p-3 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Клиенты</h3>
                    <p className="text-gray-600">База клиентов и контакты</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* CRM */}
            <Link href="/admin/crm" className="block">
              <div className="bg-purple-50 hover:bg-purple-100 p-6 rounded-lg border border-purple-200 transition-colors">
                <div className="flex items-center">
                  <div className="bg-purple-500 text-white p-3 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">CRM</h3>
                    <p className="text-gray-600">Интеграция с Битрикс24</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Товары */}
            <Link href="/admin/products" className="block">
              <div className="bg-orange-50 hover:bg-orange-100 p-6 rounded-lg border border-orange-200 transition-colors">
                <div className="flex items-center">
                  <div className="bg-orange-500 text-white p-3 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Товары</h3>
                    <p className="text-gray-600">Управление каталогом товаров</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Категории */}
            <Link href="/admin/categories" className="block">
              <div className="bg-indigo-50 hover:bg-indigo-100 p-6 rounded-lg border border-indigo-200 transition-colors">
                <div className="flex items-center">
                  <div className="bg-indigo-500 text-white p-3 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Категории</h3>
                    <p className="text-gray-600">Управление разделами товаров</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Настройки */}
            <Link href="/admin/settings" className="block">
              <div className="bg-gray-50 hover:bg-gray-100 p-6 rounded-lg border border-gray-200 transition-colors">
                <div className="flex items-center">
                  <div className="bg-gray-500 text-white p-3 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Настройки</h3>
                    <p className="text-gray-600">Конфигурация системы</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Инструкция по настройке Битрикс24</h3>
            <ol className="list-decimal list-inside text-yellow-700 space-y-1">
              <li>Зарегистрируйтесь на <a href="https://www.bitrix24.ru/" target="_blank" rel="noopener noreferrer" className="underline">bitrix24.ru</a></li>
              <li>Выберите бесплатный тариф "Проект+"</li>
              <li>Перейдите в раздел "Приложения" → "Входящий вебхук"</li>
              <li>Создайте новый вебхук с правами на CRM</li>
              <li>Скопируйте URL вебхука и добавьте в переменные окружения как BITRIX24_WEBHOOK_URL</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
