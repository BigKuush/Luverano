import { NextRequest, NextResponse } from 'next/server'
import { bitrix24 } from '@/lib/bitrix24'

// GET - получение категории по ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await bitrix24.getCategory(params.id)
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error fetching category:', error)
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    )
  }
}

// PUT - обновление категории
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categoryData = await request.json()
    
    // Валидация обязательных полей
    if (!categoryData.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    const updatedCategory = await bitrix24.updateCategory(params.id, categoryData)
    
    if (updatedCategory) {
      return NextResponse.json({
        success: true,
        category: updatedCategory,
        message: 'Категория успешно обновлена'
      })
    }

    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    )
  }
}

// DELETE - удаление категории
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await bitrix24.deleteCategory(params.id)
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Категория успешно удалена'
      })
    }

    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    )
  }
}
