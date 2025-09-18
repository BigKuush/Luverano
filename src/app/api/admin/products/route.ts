import { NextRequest, NextResponse } from 'next/server'
import { products } from '@/db/products'
import { bitrix24 } from '@/lib/bitrix24'

// GET - получение всех товаров
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const source = searchParams.get('source') || 'bitrix24'
    
    if (source === 'bitrix24') {
      // Получаем товары из Битрикс24
      const bitrixProducts = await bitrix24.getProducts()
      
      // Если Битрикс24 недоступен, возвращаем пустой массив
      if (!Array.isArray(bitrixProducts)) {
        return NextResponse.json([])
      }
      
      return NextResponse.json(bitrixProducts)
    }
    
    // Получаем товары из локальной базы
    const allProducts = [...products.topCollections, ...products.featuredProducts]
    return NextResponse.json(allProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST - создание нового товара
export async function POST(request: NextRequest) {
  try {
    const productData = await request.json()
    
    // Валидация обязательных полей
    if (!productData.title || !productData.price) {
      return NextResponse.json(
        { error: 'Title and price are required' },
        { status: 400 }
      )
    }

    // Создаем товар в Битрикс24
    const bitrixProduct = await bitrix24.createProduct(productData)
    
    if (bitrixProduct) {
      return NextResponse.json({
        success: true,
        product: bitrixProduct,
        message: 'Товар успешно создан в Битрикс24'
      })
    }

    // Если Битрикс24 недоступен, возвращаем ошибку
    return NextResponse.json(
      { error: 'Failed to create product in Bitrix24' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
