import { NextRequest, NextResponse } from 'next/server'
import { bitrix24 } from '@/lib/bitrix24'

// POST - синхронизация товаров с Битрикс24
export async function POST(request: NextRequest) {
  try {
    const { lastSyncDate } = await request.json()
    
    // Получаем измененные товары из Битрикс24
    const syncedProducts = await bitrix24.syncProducts(lastSyncDate)
    
    return NextResponse.json({
      success: true,
      products: syncedProducts,
      count: syncedProducts.length,
      lastSyncDate: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error syncing products:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to sync products',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

// GET - получение статуса синхронизации
export async function GET() {
  try {
    // Проверяем подключение к Битрикс24
    const products = await bitrix24.getProducts()
    
    return NextResponse.json({
      success: true,
      bitrix24Connected: products.length >= 0,
      productsCount: products.length,
      lastCheck: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error checking sync status:', error)
    return NextResponse.json(
      { 
        success: false,
        bitrix24Connected: false,
        error: 'Failed to check sync status',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
