'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface AdminProduct {
  id: string
  title: string
  description: string
  price: number
  category: string
  brand: string
  stock: number
  images: string[]
  status: 'active' | 'inactive' | 'draft'
  createdAt: string
  updatedAt: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
}

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'draft'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      
      // Пробуем загрузить из Битрикс24
      const response = await fetch('/api/admin/products?source=bitrix24')
      const data = await response.json()
      
      if (response.ok && Array.isArray(data) && data.length > 0) {
        // Преобразуем данные из Битрикс24 в формат админки
        const formattedProducts: AdminProduct[] = data.map((item: any) => ({
          id: item.ID || Math.random().toString(),
          title: item.NAME || 'Без названия',
          description: item.DESCRIPTION || '',
          price: parseFloat(item.PRICE) || 0,
          category: item.SECTION_NAME || item.SECTION_ID || 'Без категории',
          brand: item.BRAND || 'Luverano',
          stock: parseInt(item.STOCK_QUANTITY) || 0,
          images: item.DETAIL_PICTURE ? [item.DETAIL_PICTURE] : ['/images/placeholder.jpg'],
          status: item.ACTIVE === 'Y' ? 'active' : 'inactive',
          createdAt: item.DATE_CREATE || new Date().toISOString(),
          updatedAt: item.DATE_MODIFY || new Date().toISOString()
        }))
        
        setProducts(formattedProducts)
      } else {
        // Если Битрикс24 недоступен, загружаем локальные данные
        const localResponse = await fetch('/api/admin/products?source=local')
        const localData = await localResponse.json()
        
        if (localResponse.ok) {
          const allProductsRaw: any[] = Array.isArray(localData)
            ? localData
            : [
                ...((localData?.topCollections as any[]) || []),
                ...((localData?.featuredProducts as any[]) || [])
              ]

          // Удаляем дубликаты (по id или по title, если id совпадают)
          const uniqueMap = new Map<string, any>()
          for (const p of allProductsRaw) {
            const key = String(p.id ?? p.ID ?? p.title)
            if (!uniqueMap.has(key)) uniqueMap.set(key, p)
          }
          const allProducts = Array.from(uniqueMap.values())

          const formattedProducts: AdminProduct[] = allProducts.map((item: any, idx: number) => ({
            id: `local-${String(item.id ?? idx)}`,
            title: item.title,
            description: item.description || '',
            price: item.price || 0,
            category: item.category || 'Без категории',
            brand: item.brand || 'Luverano',
            stock: item.stock || 0,
            images: item.images || [item.thumbnail || '/images/placeholder.jpg'],
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }))

          setProducts(formattedProducts)
        } else {
          throw new Error('Не удалось загрузить товары')
        }
      }
    } catch (error) {
      console.error('Error loading products:', error)
      // Показываем уведомление об ошибке
      alert('Ошибка загрузки товаров. Проверьте подключение к Битрикс24.')
      // Устанавливаем пустой массив при ошибке
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price)
  }

  const getStatusColor = (status: AdminProduct['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-red-100 text-red-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: AdminProduct['status']) => {
    switch (status) {
      case 'active': return 'Активен'
      case 'inactive': return 'Неактивен'
      case 'draft': return 'Черновик'
      default: return 'Неизвестно'
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот товар?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        // Удаляем товар из локального состояния
        setProducts(products.filter(p => p.id !== productId))
        alert('Товар успешно удален')
      } else {
        const error = await response.json()
        alert(`Ошибка удаления: ${error.error}`)
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Ошибка при удалении товара')
    }
  }

  const handleSyncProducts = async () => {
    try {
      setSyncing(true)
      
      const response = await fetch('/api/admin/products/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lastSyncDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // последние 24 часа
        })
      })

      if (response.ok) {
        const result = await response.json()
        alert(`Синхронизация завершена. Обновлено товаров: ${result.count}`)
        // Перезагружаем список товаров
        loadProducts()
      } else {
        const error = await response.json()
        alert(`Ошибка синхронизации: ${error.error}`)
      }
    } catch (error) {
      console.error('Error syncing products:', error)
      alert('Ошибка при синхронизации товаров')
    } finally {
      setSyncing(false)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesFilter = filter === 'all' || product.status === filter
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка товаров...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Управление товарами</h1>
            <div className="flex space-x-4">
              <Link
                href="/admin/products/new"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Добавить товар
              </Link>
              <button
                onClick={handleSyncProducts}
                disabled={syncing}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {syncing ? 'Синхронизация...' : 'Синхронизировать'}
              </button>
              <button
                onClick={loadProducts}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Обновить
              </button>
            </div>
          </div>

          {/* Поиск и фильтры */}
          <div className="mb-6 space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'Все товары' },
                { key: 'active', label: 'Активные' },
                { key: 'inactive', label: 'Неактивные' },
                { key: 'draft', label: 'Черновики' }
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

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Нет товаров</h3>
              <p className="text-gray-600">Товары будут отображаться здесь</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Товар
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Категория
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Цена
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Остаток
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Обновлен
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={product.images[0] || '/images/placeholder.jpg'}
                              alt={product.title}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.title}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.stock} шт.
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                          {getStatusText(product.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(product.updatedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Редактировать
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Удалить
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Информация о товарах</h3>
            <p className="text-blue-700 text-sm mb-2">
              Здесь вы можете управлять товарами, редактировать описания, цены и статусы. 
              Товары синхронизируются с Битрикс24 для полного управления ассортиментом.
            </p>
            <div className="text-blue-700 text-sm">
              <p><strong>Доступные функции:</strong></p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Создание, редактирование и удаление товаров</li>
                <li>Синхронизация с Битрикс24</li>
                <li>Управление остатками и ценами</li>
                <li>SEO настройки для каждого товара</li>
                <li>Загрузка изображений</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
