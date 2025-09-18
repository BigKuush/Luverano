'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  brand: string
  stock: number
  images: string[]
  status: 'active' | 'inactive' | 'draft'
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
}

export default function EditProductPage() {
  const router = useRouter()
  const routeParams = useParams<{ id: string }>()
  const idParam = Array.isArray(routeParams?.id) ? routeParams.id?.[0] : routeParams?.id
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadProduct()
  }, [idParam])

  const loadProduct = async () => {
    try {
      setLoading(true)
      if (!idParam) return
      
      const response = await fetch(`/api/admin/products/${idParam}`)
      
      if (response.ok) {
        const data = await response.json()
        
        // Преобразуем данные из Битрикс24 в формат админки
        const formattedProduct: Product = {
          id: data.ID || idParam,
          title: data.NAME || '',
          description: data.DESCRIPTION || '',
          price: parseFloat(data.PRICE) || 0,
          category: data.SECTION_NAME || data.SECTION_ID || 'Кресла и диваны',
          brand: data.BRAND || 'Luverano',
          stock: parseInt(data.STOCK_QUANTITY) || 0,
          images: data.DETAIL_PICTURE ? [data.DETAIL_PICTURE] : ['/images/placeholder.jpg'],
          status: data.ACTIVE === 'Y' ? 'active' : 'inactive',
          seoTitle: data.SEO_TITLE || data.NAME || '',
          seoDescription: data.SEO_DESCRIPTION || data.DESCRIPTION || '',
          seoKeywords: data.SEO_KEYWORDS || ''
        }
        
        setProduct(formattedProduct)
      } else {
        throw new Error('Товар не найден')
      }
    } catch (error) {
      console.error('Error loading product:', error)
      alert('Ошибка загрузки товара')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof Product, value: any) => {
    if (product) {
      setProduct(prev => prev ? { ...prev, [field]: value } : null)
    }
  }

  const handleAddImage = () => {
    if (!product) return
    const next = [...(product.images || []), '']
    handleChange('images', next)
  }

  const handleRemoveImage = (index: number) => {
    if (!product) return
    const next = (product.images || []).filter((_, i) => i !== index)
    handleChange('images', next)
  }

  const handleImageChange = (index: number, value: string) => {
    if (!product) return
    const next = [...(product.images || [])]
    next[index] = value
    handleChange('images', next)
  }

  const handleSave = async () => {
    if (!product) return

    try {
      setSaving(true)
      
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      })

      if (response.ok) {
        const result = await response.json()
        alert('Товар успешно сохранен')
        router.push('/admin/products')
      } else {
        const error = await response.json()
        alert(`Ошибка сохранения: ${error.error}`)
      }
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Ошибка при сохранении товара')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка товара...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Товар не найден</h2>
          <Link href="/admin/products" className="text-blue-600 hover:underline">
            Вернуться к списку товаров
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Редактирование товара</h1>
            <div className="flex space-x-4">
              <Link
                href="/admin/products"
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Отмена
              </Link>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Основная информация */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Основная информация</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Название товара *
                    </label>
                    <input
                      type="text"
                      value={product.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Полное описание
                    </label>
                    <textarea
                      value={product.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Полное описание товара"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Цена (₽) *
                      </label>
                      <input
                        type="number"
                        value={product.price}
                        onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Остаток (шт.)
                      </label>
                      <input
                        type="number"
                        value={product.stock}
                        onChange={(e) => handleChange('stock', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Категория
                      </label>
                      <select
                        value={product.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Комплекты мебели">Комплекты мебели</option>
                        <option value="Кресла и диваны">Кресла и диваны</option>
                        <option value="Столы">Столы</option>
                        <option value="Стулья">Стулья</option>
                        <option value="Аксессуары">Аксессуары</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Статус
                      </label>
                      <select
                        value={product.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="active">Активен</option>
                        <option value="inactive">Неактивен</option>
                        <option value="draft">Черновик</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO информация */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">SEO настройки</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SEO заголовок
                    </label>
                    <input
                      type="text"
                      value={product.seoTitle || ''}
                      onChange={(e) => handleChange('seoTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Заголовок для поисковых систем"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SEO описание
                    </label>
                    <textarea
                      value={product.seoDescription || ''}
                      onChange={(e) => handleChange('seoDescription', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Описание для поисковых систем"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Дополнительная информация (покажется во вкладке «Доп. информация»)
                    </label>
                    <textarea
                      value={product.seoDescription || ''}
                      onChange={(e) => handleChange('seoDescription', e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Технические детали, материалы, уход и пр."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SEO ключевые слова
                    </label>
                    <input
                      type="text"
                      value={product.seoKeywords || ''}
                      onChange={(e) => handleChange('seoKeywords', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ключевые слова через запятую"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Изображения</h2>
                <div className="space-y-4">
                  {product.images.map((image, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <img
                        src={image || '/images/placeholder.jpg'}
                        alt={`Изображение ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={image}
                          onChange={(e) => handleImageChange(index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="URL изображения"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="text-red-600 hover:text-red-800 p-2"
                        aria-label="Удалить изображение"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    Добавить изображение
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
