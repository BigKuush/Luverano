'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Product {
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
  material?: string
  color?: string
  dimensions?: string
  weight?: number
}

export default function NewProductPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [product, setProduct] = useState<Product>({
    title: '',
    description: '',
    price: 0,
    category: 'Кресла и диваны',
    brand: 'Luverano',
    stock: 0,
    images: [''],
    status: 'active',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    material: '',
    color: '',
    dimensions: '',
    weight: 0
  })

  const handleChange = (field: keyof Product, value: any) => {
    setProduct(prev => ({ ...prev, [field]: value }))
  }

  const handleAddImage = () => {
    setProduct(prev => ({
      ...prev,
      images: [...prev.images, '']
    }))
  }

  const handleRemoveImage = (index: number) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleImageChange = (index: number, value: string) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }))
  }

  const handleSave = async () => {
    if (!product.title || !product.price) {
      alert('Заполните обязательные поля: название и цена')
      return
    }

    try {
      setSaving(true)
      
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      })

      if (response.ok) {
        const result = await response.json()
        alert('Товар успешно создан')
        router.push('/admin/products')
      } else {
        const error = await response.json()
        alert(`Ошибка создания: ${error.error}`)
      }
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Ошибка при создании товара')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Создание товара</h1>
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
                {saving ? 'Создание...' : 'Создать товар'}
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
                      placeholder="Введите название товара"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Полное описание
                    </label>
                    <textarea
                      value={product.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Описание товара"
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
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Остаток (шт.)
                      </label>
                      <input
                        type="number"
                        value={product.stock}
                        onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Материал
                      </label>
                      <input
                        type="text"
                        value={product.material || ''}
                        onChange={(e) => handleChange('material', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Дуб, тик, металл..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Цвет
                      </label>
                      <input
                        type="text"
                        value={product.color || ''}
                        onChange={(e) => handleChange('color', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Белый, коричневый..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Размеры (см)
                      </label>
                      <input
                        type="text"
                        value={product.dimensions || ''}
                        onChange={(e) => handleChange('dimensions', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="120x80x45"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Вес (кг)
                      </label>
                      <input
                        type="number"
                        value={product.weight || 0}
                        onChange={(e) => handleChange('weight', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO информация и изображения */}
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
                      Дополнительная информация (вкладка «Доп. информация»)
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
                    <div key={index} className="flex items-center space-x-4">
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
                        onClick={() => handleRemoveImage(index)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
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
