'use client'

import { useState, useEffect } from 'react'

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  order?: any
  products: any[]
  onSave: (orderData: any) => void
  darkMode: boolean
}

export default function OrderModal({ isOpen, onClose, order, products, onSave, darkMode }: OrderModalProps) {
  const [formData, setFormData] = useState({
    customer: {
      name: '',
      email: '',
      phone: ''
    },
    items: [],
    notes: ''
  })

  // Обновляем форму при изменении order
  useEffect(() => {
    if (order) {
      setFormData({
        customer: {
          name: order.customer?.name || '',
          email: order.customer?.email || '',
          phone: order.customer?.phone || ''
        },
        items: order.items || [],
        notes: order.notes || ''
      })
    } else {
      setFormData({
        customer: { name: '', email: '', phone: '' },
        items: [],
        notes: ''
      })
    }
  }, [order])

  const [newItem, setNewItem] = useState({
    productId: '',
    quantity: 1
  })

  const addItem = () => {
    if (newItem.productId && newItem.quantity > 0) {
      const product = products.find(p => p.id === newItem.productId)
      if (product) {
        const item = {
          id: Date.now().toString(),
          title: product.title,
          price: product.price,
          quantity: newItem.quantity
        }
        setFormData({
          ...formData,
          items: [...formData.items, item]
        })
        setNewItem({ productId: '', quantity: 1 })
      }
    }
  }

  const removeItem = (itemId: string) => {
    setFormData({
      ...formData,
      items: formData.items.filter(item => item.id !== itemId)
    })
  }

  const handleSave = () => {
    const total = formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const orderData = {
      ...formData,
      total,
      status: order?.status || 'new',
      createdAt: order?.createdAt || new Date().toISOString()
    }
    onSave(orderData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto`}>
        <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex justify-between items-center">
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {order ? 'Редактировать заказ' : 'Создать заказ'}
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Информация о клиенте */}
            <div>
              <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Информация о клиенте
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Имя *
                  </label>
                  <input
                    type="text"
                    value={formData.customer.name}
                    onChange={(e) => setFormData({
                      ...formData,
                      customer: { ...formData.customer, name: e.target.value }
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Введите имя"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.customer.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      customer: { ...formData.customer, email: e.target.value }
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Введите email"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    value={formData.customer.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      customer: { ...formData.customer, phone: e.target.value }
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </div>
            </div>

            {/* Товары */}
            <div>
              <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Товары в заказе
              </h3>

              {/* Добавление товара */}
              <div className={`p-4 rounded-lg mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <select
                    value={newItem.productId}
                    onChange={(e) => setNewItem({ ...newItem, productId: e.target.value })}
                    className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Выберите товар</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.title} - {new Intl.NumberFormat('ru-RU', {
                          style: 'currency',
                          currency: 'RUB',
                          minimumFractionDigits: 0
                        }).format(product.price)}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                    min="1"
                    className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Количество"
                  />
                </div>
                <button
                  onClick={addItem}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Добавить товар
                </button>
              </div>

              {/* Список товаров */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {formData.items.map((item) => (
                  <div key={item.id} className={`flex justify-between items-center p-3 rounded ${darkMode ? 'bg-gray-600' : 'bg-white'} border ${darkMode ? 'border-gray-500' : 'border-gray-200'}`}>
                    <div>
                      <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</span>
                      <span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        × {item.quantity}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {new Intl.NumberFormat('ru-RU', {
                          style: 'currency',
                          currency: 'RUB',
                          minimumFractionDigits: 0
                        }).format(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Итого */}
              {formData.items.length > 0 && (
                <div className={`mt-4 p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Итого:</span>
                    <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {new Intl.NumberFormat('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                        minimumFractionDigits: 0
                      }).format(formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0))}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Примечания */}
          <div className="mt-6">
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Примечания
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Дополнительная информация о заказе"
            />
          </div>

          {/* Кнопки */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {order ? 'Сохранить изменения' : 'Создать заказ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
