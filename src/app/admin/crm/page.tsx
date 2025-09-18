'use client'

import { useState, useEffect } from 'react'
import { bitrix24 } from '@/lib/bitrix24'

interface Lead {
  ID: string
  TITLE: string
  NAME: string
  LAST_NAME: string
  PHONE: Array<{VALUE: string}>
  EMAIL: Array<{VALUE: string}>
  OPPORTUNITY: string
  DATE_CREATE: string
  STATUS_ID: string
}

export default function CRMAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadLeads()
  }, [])

  const loadLeads = async () => {
    try {
      setLoading(true)
      const leadsData = await bitrix24.getLeads()
      setLeads(leadsData)
      setError(null)
    } catch (err) {
      setError('Ошибка загрузки данных из Битрикс24')
      console.error('Error loading leads:', err)
    } finally {
      setLoading(false)
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

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(parseFloat(price))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка данных из Битрикс24...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">CRM - Битрикс24</h1>
            <button
              onClick={loadLeads}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Обновить
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
              <div className="mt-2 text-sm">
                Убедитесь, что переменная BITRIX24_WEBHOOK_URL настроена в .env.local
              </div>
            </div>
          )}

          {leads.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Нет лидов</h3>
              <p className="text-gray-600">Лиды из Битрикс24 будут отображаться здесь</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Клиент
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Контакты
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Сумма
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead.ID} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {lead.NAME} {lead.LAST_NAME}
                        </div>
                        <div className="text-sm text-gray-500">
                          {lead.TITLE}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {lead.PHONE?.[0]?.VALUE || 'Не указан'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {lead.EMAIL?.[0]?.VALUE || 'Не указан'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatPrice(lead.OPPORTUNITY)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {lead.STATUS_ID}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(lead.DATE_CREATE)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Информация о подключении</h3>
            <p className="text-blue-700 text-sm">
              Эта страница показывает лиды из Битрикс24. Для полной функциональности CRM рекомендуется 
              перейти на платный тариф "CRM+" за 4990 руб/мес.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
