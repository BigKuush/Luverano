'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import OrderModal from '@/components/admin/OrderModal'

interface Order {
  id: string
  customer: {
    name: string
    email: string
    phone: string
  }
  items: Array<{
    id: string
    title: string
    price: number
    quantity: number
  }>
  total: number
  status: 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'paid'
  createdAt: string
  notes?: string
}

interface Product {
  id: string
  title: string
  price: number
  stock: number
  category: string
  image?: string
}

interface Customer {
  id: string
  name: string
  lastName: string
  email: string
  phone: string
  ordersCount: number
  totalSpent: number
}

interface AdminData {
  orders: Order[]
  products: Product[]
  customers: Customer[]
  stats: {
    totalOrders: number
    totalRevenue: number
    newOrders: number
    processingOrders: number
  }
}

export default function AdvancedAdminPage() {
  const [data, setData] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState<'orders' | 'customers'>('orders')
  const [showCreateOrder, setShowCreateOrder] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showEditOrder, setShowEditOrder] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      
      // Моковые данные
      const mockData: AdminData = {
        orders: [
          {
            id: '001',
            customer: { name: 'Иван Петров', email: 'ivan@example.com', phone: '+7 (999) 123-45-67' },
            items: [
              { id: '1', title: 'Современное деревянное кресло', price: 150000, quantity: 2 },
              { id: '2', title: 'Деревянный стол', price: 200000, quantity: 1 }
            ],
            total: 500000,
            status: 'new',
            createdAt: new Date().toISOString(),
            notes: 'Клиент просит доставить в выходные'
          },
          {
            id: '002',
            customer: { name: 'Мария Сидорова', email: 'maria@example.com', phone: '+7 (999) 987-65-43' },
            items: [
              { id: '3', title: 'Диван для террасы', price: 300000, quantity: 1 }
            ],
            total: 300000,
            status: 'processing',
            createdAt: new Date(Date.now() - 86400000).toISOString()
          }
        ],
        products: [
          { id: '1', title: 'Современное деревянное кресло', price: 150000, stock: 5, category: 'Кресла' },
          { id: '2', title: 'Деревянный стол', price: 200000, stock: 3, category: 'Столы' },
          { id: '3', title: 'Диван для террасы', price: 300000, stock: 2, category: 'Диваны' },
          { id: '4', title: 'Стул из дуба', price: 80000, stock: 10, category: 'Стулья' }
        ],
        customers: [
          { id: '1', name: 'Иван', lastName: 'Петров', email: 'ivan@example.com', phone: '+7 (999) 123-45-67', ordersCount: 1, totalSpent: 500000 },
          { id: '2', name: 'Мария', lastName: 'Сидорова', email: 'maria@example.com', phone: '+7 (999) 987-65-43', ordersCount: 1, totalSpent: 300000 }
        ],
        stats: {
          totalOrders: 2,
          totalRevenue: 800000,
          newOrders: 1,
          processingOrders: 1
        }
      }
      
      setData(mockData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    if (data) {
      setData({
        ...data,
        orders: (data.orders || []).map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      })
    }
  }

  const handleSaveOrder = (orderData: any) => {
    if (!data) return // Защита от undefined
    
    if (selectedOrder) {
      // Редактирование существующего заказа
      setData({
        ...data,
        orders: (data.orders || []).map(order => 
          order.id === selectedOrder.id ? { ...order, ...orderData } : order
        )
      })
      setShowEditOrder(false)
      setSelectedOrder(null)
    } else {
      // Создание нового заказа
      const newOrder = {
        ...orderData,
        id: (data.orders?.length || 0) + 1 + ''
      }
      
      // Обновляем или добавляем клиента в базу
      const existingCustomerIndex = data.customers?.findIndex(
        customer => customer.email === orderData.customer.email
      ) || -1
      
      let updatedCustomers = [...(data.customers || [])]
      if (existingCustomerIndex >= 0) {
        // Обновляем существующего клиента
        updatedCustomers[existingCustomerIndex] = {
          ...updatedCustomers[existingCustomerIndex],
          ordersCount: updatedCustomers[existingCustomerIndex].ordersCount + 1,
          totalSpent: updatedCustomers[existingCustomerIndex].totalSpent + orderData.total
        }
      } else {
        // Добавляем нового клиента
        updatedCustomers.push({
          id: ((data.customers?.length || 0) + 1).toString(),
          name: orderData.customer.name.split(' ')[0] || '',
          lastName: orderData.customer.name.split(' ').slice(1).join(' ') || '',
          email: orderData.customer.email,
          phone: orderData.customer.phone,
          ordersCount: 1,
          totalSpent: orderData.total
        })
      }
      
      setData({
        ...data,
        orders: [...(data.orders || []), newOrder],
        customers: updatedCustomers,
        stats: {
          ...data.stats,
          totalOrders: (data.stats?.totalOrders || 0) + 1,
          totalRevenue: (data.stats?.totalRevenue || 0) + orderData.total,
          newOrders: (data.stats?.newOrders || 0) + 1
        }
      })
      setShowCreateOrder(false)
    }
  }

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order)
    setShowEditOrder(true)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'shipped': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'paid': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'new': return 'Новый'
      case 'processing': return 'В обработке'
      case 'shipped': return 'В доставке'
      case 'delivered': return 'Завершен'
      case 'cancelled': return 'Отказ'
      case 'paid': return 'Оплачен'
      default: return 'Неизвестно'
    }
  }

  if (loading || !data) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Загрузка данных...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
          {/* Заголовок с переключателем темы */}
          <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center">
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Админ-панель Luverano
              </h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                >
                  {darkMode ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={loadData}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Обновить
                </button>
              </div>
            </div>
          </div>

          {/* Статистика */}
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Всего заказов</p>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-blue-900'}`}>{data?.stats.totalOrders || 0}</p>
                  </div>
                  <div className="bg-blue-500 text-white p-2 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-green-300' : 'text-green-600'}`}>Выручка</p>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-green-900'}`}>{formatPrice(data?.stats.totalRevenue || 0)}</p>
                  </div>
                  <div className="bg-green-500 text-white p-2 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-yellow-300' : 'text-yellow-600'}`}>Новые заказы</p>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-yellow-900'}`}>{data?.stats.newOrders || 0}</p>
                  </div>
                  <div className="bg-yellow-500 text-white p-2 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>В обработке</p>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-purple-900'}`}>{data?.stats.processingOrders || 0}</p>
                  </div>
                  <div className="bg-purple-500 text-white p-2 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Табы */}
            <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} mb-6`}>
              <nav className="-mb-px flex space-x-8">
                {[
                  { key: 'orders', label: 'Заказы', count: data?.stats.totalOrders || 0 },
                  { key: 'customers', label: 'Клиентская база', count: data?.customers.length || 0 }
                ].map(({ key, label, count }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as any)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === key
                        ? `border-blue-500 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`
                        : `${darkMode ? 'text-gray-400 hover:text-gray-300 hover:border-gray-300' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'} border-transparent`
                    }`}
                  >
                    {label} ({count})
                  </button>
                ))}
              </nav>
            </div>

            {/* Контент табов */}
            <div className="tab-content">
              {activeTab === 'orders' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Управление заказами</h2>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setShowCreateOrder(true)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Создать заказ
                      </button>
                      <Link
                        href="https://your-bitrix24.bitrix24.ru/crm/deal/"
                        target="_blank"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Все заказы в Битрикс24
                      </Link>
                    </div>
                  </div>

                  {data?.orders.length === 0 ? (
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Нет заказов</p>
                  ) : (
                    <div className="space-y-4">
                      {data?.orders.map((order) => (
                        <div key={order.id} className={`border rounded-lg p-6 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Заказ #{order.id}</h3>
                              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {order.customer.name} • {order.customer.email} • {order.customer.phone}
                              </p>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {formatDate(order.createdAt)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatPrice(order.total)}</p>
                              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                            </div>
                          </div>

                          {/* Товары в заказе */}
                          <div className="mb-4">
                            <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Товары:</h4>
                            <div className="space-y-2">
                              {order.items.map((item) => (
                                <div key={item.id} className={`flex justify-between items-center p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {item.title} × {item.quantity}
                                  </span>
                                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {formatPrice(item.price * item.quantity)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Управление статусом */}
                          <div className="flex justify-between items-center">
                            <div className="flex space-x-2">
                              {['new', 'processing', 'shipped', 'delivered', 'cancelled', 'paid'].map((status) => (
                                <button
                                  key={status}
                                  onClick={() => updateOrderStatus(order.id, status as Order['status'])}
                                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                                    order.status === status
                                      ? 'bg-blue-500 text-white'
                                      : darkMode
                                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                  }`}
                                >
                                  {getStatusText(status as Order['status'])}
                                </button>
                              ))}
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditOrder(order)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                Редактировать
                              </button>
                              <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                                Удалить
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'customers' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Клиентская база</h2>
                    <Link
                      href="https://your-bitrix24.bitrix24.ru/crm/contact/"
                      target="_blank"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Все клиенты в Битрикс24
                    </Link>
                  </div>
                  {data?.customers.length === 0 ? (
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Нет клиентов</p>
                  ) : (
                    <div className="space-y-4">
                      {data?.customers.map((customer: any) => (
                        <div key={customer.id} className={`border rounded-lg p-4 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {customer.name} {customer.lastName}
                              </h3>
                              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{customer.email}</p>
                              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{customer.phone}</p>
                            </div>
                            <div className="text-right">
                              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Заказов: {customer.ordersCount || 0}
                              </p>
                              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Сумма: {formatPrice(customer.totalSpent || 0)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Модальные окна */}
      <OrderModal
        isOpen={showCreateOrder}
        onClose={() => setShowCreateOrder(false)}
        products={data?.products || []}
        onSave={handleSaveOrder}
        darkMode={darkMode}
      />

      <OrderModal
        isOpen={showEditOrder}
        onClose={() => {
          setShowEditOrder(false)
          setSelectedOrder(null)
        }}
        order={selectedOrder}
        products={data?.products || []}
        onSave={handleSaveOrder}
        darkMode={darkMode}
      />
    </div>
  )
}
