'use client'

import { useState, useEffect } from 'react'
import { Metadata } from 'next'

interface Order {
  id: string
  customer: {
    name: string
    email: string
    phone: string
  }
  items: Array<{
    title: string
    quantity: number
    price: number
  }>
  totals: {
    total: number
  }
  delivery: {
    address: string
    method: string
  }
  status: 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
}

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'new' | 'processing' | 'shipped' | 'delivered'>('all')

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      // В реальном проекте здесь будет API запрос
      // const response = await fetch('/api/admin/orders')
      // const data = await response.json()
      
      // Пока используем моковые данные
      const mockOrders: Order[] = [
        {
          id: '1',
          customer: {
            name: 'Иван Петров',
            email: 'ivan@example.com',
            phone: '+7 (999) 123-45-67'
          },
          items: [
            { title: 'Современное деревянное кресло', quantity: 2, price: 150000 }
          ],
          totals: { total: 300000 },
          delivery: {
            address: 'Москва, ул. Примерная, д. 1',
            method: 'Доставка курьером'
          },
          status: 'new',
          createdAt: '2024-01-15T10:30:00Z'
        }
      ]
      
      setOrders(mockOrders)
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      // В реальном проекте здесь будет API запрос
      // await fetch(`/api/admin/orders/${orderId}`, {
      //   method: 'PATCH',
      //   body: JSON.stringify({ status: newStatus })
      // })
      
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ))
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price)
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'new': return 'Новый'
      case 'processing': return 'В обработке'
      case 'shipped': return 'Отправлен'
      case 'delivered': return 'Доставлен'
      case 'cancelled': return 'Отменен'
      default: return 'Неизвестно'
    }
  }

  const filteredOrders = orders.filter(order => 
    filter === 'all' || order.status === filter
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка заказов...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Управление заказами</h1>
            <button
              onClick={loadOrders}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Обновить
            </button>
          </div>

          {/* Фильтры */}
          <div className="mb-6">
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'Все заказы' },
                { key: 'new', label: 'Новые' },
                { key: 'processing', label: 'В обработке' },
                { key: 'shipped', label: 'Отправленные' },
                { key: 'delivered', label: 'Доставленные' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as any)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === key
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Нет заказов</h3>
              <p className="text-gray-600">Заказы будут отображаться здесь</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Заказ #{order.id}
                      </h3>
                      <p className="text-gray-600">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Клиент</h4>
                      <p className="text-gray-600">{order.customer.name}</p>
                      <p className="text-gray-600">{order.customer.email}</p>
                      <p className="text-gray-600">{order.customer.phone}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Доставка</h4>
                      <p className="text-gray-600">{order.delivery.method}</p>
                      <p className="text-gray-600">{order.delivery.address}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Товары</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {item.title} × {item.quantity}
                          </span>
                          <span className="font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Итого:</span>
                        <span>{formatPrice(order.totals.total)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {order.status === 'new' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'processing')}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        В обработку
                      </button>
                    )}
                    {order.status === 'processing' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'shipped')}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Отправить
                      </button>
                    )}
                    {order.status === 'shipped' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'delivered')}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Доставлен
                      </button>
                    )}
                    <button
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Отменить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
