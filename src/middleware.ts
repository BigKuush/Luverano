import { NextRequest, NextResponse } from 'next/server'
import { products } from '@/db/products'
import { productToSlug } from '@/lib/slug'

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = new URL(req.url)
  if (pathname === '/product-details') {
    const id = searchParams.get('id') || '1'
    const all = [...products.topCollections, ...products.featuredProducts]
    const prod = all.find(p => String(p.id) === String(id))
    const slug = prod ? productToSlug(prod.id, prod.title) : String(id)
    return NextResponse.redirect(new URL(`/product/${slug}`, req.url), 308)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/product-details']
}

