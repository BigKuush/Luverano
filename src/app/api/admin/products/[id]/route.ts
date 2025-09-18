import { NextRequest, NextResponse } from 'next/server'
import { bitrix24 } from '@/lib/bitrix24'
import { products } from '@/db/products'

// GET - получение товара по ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1) Сначала пытаемся получить товар из Битрикс24
    const product = await bitrix24.getProduct(params.id)
    if (product) {
      return NextResponse.json(product)
    }

    // 2) Фолбэк на локальные данные (когда работаем оффлайн)
    const allLocal = [...(products.topCollections as any[]), ...(products.featuredProducts as any[])]
    const rawId = params.id.startsWith('local-') ? params.id.replace(/^local-/, '') : params.id
    const local = allLocal.find((p: any) => String(p.id) === String(rawId))
    if (local) {
      return NextResponse.json({
        ID: String(local.id),
        NAME: local.title,
        DESCRIPTION: local.description || '',
        PRICE: local.price || 0,
        CURRENCY_ID: 'RUB',
        ACTIVE: 'Y',
        CATALOG_ID: '1',
        SECTION_ID: local.category || '',
        DETAIL_PICTURE: local.images?.[0] || local.thumbnail || '',
        PREVIEW_PICTURE: local.thumbnail || local.images?.[0] || '',
        BRAND: local.brand || 'Luverano',
        STOCK_QUANTITY: local.stock || 0,
        SEO_TITLE: local.seoTitle || local.title,
        SEO_DESCRIPTION: local.seoDescription || local.description || '',
        SEO_KEYWORDS: local.seoKeywords || ''
      })
    }

    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    )
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT - обновление товара
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productData = await request.json()
    
    // Валидация обязательных полей
    if (!productData.title || !productData.price) {
      return NextResponse.json(
        { error: 'Title and price are required' },
        { status: 400 }
      )
    }

    const updatedProduct = await bitrix24.updateProduct(params.id, productData)
    
    if (updatedProduct) {
      return NextResponse.json({
        success: true,
        product: updatedProduct,
        message: 'Товар успешно обновлен'
      })
    }

    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE - удаление товара
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await bitrix24.deleteProduct(params.id)
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Товар успешно удален'
      })
    }

    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
