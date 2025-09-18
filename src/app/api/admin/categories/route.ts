import { NextRequest, NextResponse } from 'next/server'
import { bitrix24 } from '@/lib/bitrix24'

// GET - получение всех категорий
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const source = searchParams.get('source') || 'bitrix24'
    
    if (source === 'bitrix24') {
      // Получаем категории из Битрикс24
      const bitrixCategories = await bitrix24.getCategories()
      return NextResponse.json(bitrixCategories)
    }
    
    // Локальные категории по умолчанию
    const defaultCategories = [
      { ID: '1', NAME: 'Комплекты мебели', DESCRIPTION: 'Готовые комплекты мебели для террасы', ACTIVE: 'Y', SORT: 100 },
      { ID: '2', NAME: 'Кресла и диваны', DESCRIPTION: 'Кресла, диваны и мягкая мебель', ACTIVE: 'Y', SORT: 200 },
      { ID: '3', NAME: 'Столы', DESCRIPTION: 'Обеденные и журнальные столы', ACTIVE: 'Y', SORT: 300 },
      { ID: '4', NAME: 'Стулья', DESCRIPTION: 'Стулья и табуреты', ACTIVE: 'Y', SORT: 400 },
      { ID: '5', NAME: 'Аксессуары', DESCRIPTION: 'Аксессуары и декоративные элементы', ACTIVE: 'Y', SORT: 500 }
    ]
    
    return NextResponse.json(defaultCategories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// POST - создание новой категории
export async function POST(request: NextRequest) {
  try {
    const categoryData = await request.json()
    
    // Валидация обязательных полей
    if (!categoryData.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    // Создаем категорию в Битрикс24
    const bitrixCategory = await bitrix24.createCategory(categoryData)
    
    if (bitrixCategory) {
      return NextResponse.json({
        success: true,
        category: bitrixCategory,
        message: 'Категория успешно создана в Битрикс24'
      })
    }

    // Если Битрикс24 недоступен, возвращаем ошибку
    return NextResponse.json(
      { error: 'Failed to create category in Bitrix24' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}
