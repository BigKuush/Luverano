'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Category {
  ID: string
  NAME: string
  DESCRIPTION?: string
  ACTIVE: 'Y' | 'N'
  SORT: number
  PICTURE?: string
  SEO_TITLE?: string
  SEO_DESCRIPTION?: string
  SEO_KEYWORDS?: string
  PARENT_ID?: string
}

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      setLoading(true)
      
      // Пробуем загрузить из Битрикс24
      const response = await fetch('/api/admin/categories?source=bitrix24')
      const data = await response.json()
      
      if (response.ok && data.length > 0) {
        setCategories(data)
      } else {
        // Если Битрикс24 недоступен, загружаем локальные данные
        const localResponse = await fetch('/api/admin/categories?source=local')
        const localData = await localResponse.json()
        
        if (localResponse.ok) {
          setCategories(localData)
        } else {
          throw new Error('Не удалось загрузить категории')
        }
      }
    } catch (error) {
      console.error('Error loading categories:', error)
      alert('Ошибка загрузки категорий. Проверьте подключение к Битрикс24.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту категорию?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/categories/${categoryId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setCategories(categories.filter(c => c.ID !== categoryId))
        alert('Категория успешно удалена')
      } else {
        const error = await response.json()
        alert(`Ошибка удаления: ${error.error}`)
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Ошибка при удалении категории')
    }
  }

  const handleSaveCategory = async (categoryData: any) => {
    try {
      const url = editingCategory 
        ? `/api/admin/categories/${editingCategory.ID}`
        : '/api/admin/categories'
      
      const method = editingCategory ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryData)
      })

      if (response.ok) {
        const result = await response.json()
        alert(editingCategory ? 'Категория обновлена' : 'Категория создана')
        setShowCreateForm(false)
        setEditingCategory(null)
        loadCategories()
      } else {
        const error = await response.json()
        alert(`Ошибка: ${error.error}`)
      }
    } catch (error) {
      console.error('Error saving category:', error)
      alert('Ошибка при сохранении категории')
    }
  }

  const filteredCategories = categories.filter(category => 
    category.NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.DESCRIPTION && category.DESCRIPTION.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка категорий...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Управление категориями</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Добавить категорию
              </button>
              <button
                onClick={loadCategories}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Обновить
              </button>
            </div>
          </div>

          {/* Поиск */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Поиск категорий..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Нет категорий</h3>
              <p className="text-gray-600">Категории будут отображаться здесь</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <div key={category.ID} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{category.NAME}</h3>
                      {category.DESCRIPTION && (
                        <p className="text-gray-600 text-sm mt-1">{category.DESCRIPTION}</p>
                      )}
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      category.ACTIVE === 'Y' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {category.ACTIVE === 'Y' ? 'Активна' : 'Неактивна'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Сортировка: {category.SORT}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingCategory(category)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.ID)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Информация о категориях</h3>
            <p className="text-blue-700 text-sm mb-2">
              Здесь вы можете управлять разделами товаров. Категории синхронизируются с Битрикс24.
            </p>
            <div className="text-blue-700 text-sm">
              <p><strong>Доступные функции:</strong></p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Создание, редактирование и удаление категорий</li>
                <li>Синхронизация с Битрикс24</li>
                <li>SEO настройки для каждой категории</li>
                <li>Управление порядком сортировки</li>
                <li>Активация/деактивация категорий</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно создания/редактирования */}
      {showCreateForm && (
        <CategoryModal
          category={editingCategory}
          onClose={() => {
            setShowCreateForm(false)
            setEditingCategory(null)
          }}
          onSave={handleSaveCategory}
        />
      )}
    </div>
  )
}

// Компонент модального окна
function CategoryModal({ category, onClose, onSave }: {
  category: Category | null
  onClose: () => void
  onSave: (data: any) => void
}) {
  const [formData, setFormData] = useState({
    name: category?.NAME || '',
    description: category?.DESCRIPTION || '',
    active: category?.ACTIVE === 'Y' || true,
    sort: category?.SORT || 100,
    picture: category?.PICTURE || '',
    seoTitle: category?.SEO_TITLE || '',
    seoDescription: category?.SEO_DESCRIPTION || '',
    seoKeywords: category?.SEO_KEYWORDS || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {category ? 'Редактировать категорию' : 'Создать категорию'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Название категории *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Описание
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Сортировка
                </label>
                <input
                  type="number"
                  value={formData.sort}
                  onChange={(e) => setFormData({ ...formData, sort: parseInt(e.target.value) || 100 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
                  Активна
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Изображение (URL)
              </label>
              <input
                type="url"
                value={formData.picture}
                onChange={(e) => setFormData({ ...formData, picture: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SEO заголовок
              </label>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SEO описание
              </label>
              <textarea
                value={formData.seoDescription}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SEO ключевые слова
              </label>
              <input
                type="text"
                value={formData.seoKeywords}
                onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ключевые слова через запятую"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              {category ? 'Сохранить изменения' : 'Создать категорию'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
