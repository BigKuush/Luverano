import React from 'react'
import type { Metadata } from 'next'
import { getProductsData } from '@/lib/data'
import { productToSlug, toSlug } from '@/lib/slug'
import ProductPreview from '@/components/sections/shopDetails/productPreview'
import ProductShortInfo from '@/components/sections/shopDetails/productShortInfo'
import ProductDetailsTabView from '@/components/sections/shopDetails/productDetailsTabView'
import RelatedProducts from '@/components/sections/shopDetails/relatedProducts'
import Newsletter from '@/components/sections/newsletter'

export const revalidate = 0
export const dynamic = 'force-dynamic'

async function getProductBySlug(slug: string) {
    const { featuredProducts, topCollections } = await getProductsData() as any
    const all = Array.isArray(featuredProducts) ? featuredProducts : []
    const extras = Array.isArray(topCollections) ? topCollections : []
    const merged = [...extras, ...all]
    const bySlug = merged.find((p: any) => productToSlug(p.id, p.title) === slug)
    return bySlug || null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const product = await getProductBySlug(slug)
    const title = product?.seoTitle || product?.title || 'Товар'
    const description = product?.seoDescription || product?.summary || product?.description || ''
    const url = `https://luverano.ru/product/${slug}`
    const images = product?.thumbnail ? [{ url: product.thumbnail, width: 1200, height: 630, alt: product.title }] : []
    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            images,
            siteName: 'Luverano'
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: product?.thumbnail ? [product.thumbnail] : undefined
        }
    }
}

const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params
    const product = await getProductBySlug(slug)
    if (!product) {
        return <main className='container lg:mt-25 mt-15'><p>Товар не найден</p></main>
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        image: product.images?.length ? product.images : [product.thumbnail],
        description: product.summary || product.description,
        brand: { '@type': 'Brand', name: 'Luverano' },
        sku: 'D1008',
        offers: {
            '@type': 'Offer',
            priceCurrency: 'RUB',
            price: product.price,
            availability: 'http://schema.org/InStock',
            url: `https://luverano.ru/product/${productToSlug(product.id, product.title)}`
        }
    }

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://luverano.ru/' },
            { '@type': 'ListItem', position: 2, name: 'Каталог', item: 'https://luverano.ru/shop-3' },
            { '@type': 'ListItem', position: 3, name: product.title, item: `https://luverano.ru/product/${productToSlug(product.id, product.title)}` }
        ]
    }

    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <div className='container'>
                <div className='grid lg:grid-cols-[40.9%_auto] md:grid-cols-2 grid-cols-1 xl:gap-15 gap-10 lg:mt-25 mt-15'>
                    <ProductPreview images={product.images} productTitle={product.title} videoUrl={(product as any).videoUrl} />
                    <ProductShortInfo
                        id={product.id}
                        isSiteMapShow={true}
                        price={product.price}
                        title={product.title}
                        thumbnail={product.thumbnail}
                        stock={product.stock}
                        discountPercentage={product.discountPercentage}
                        summary={product.summary || product.description}
                    />
                </div>
                <ProductDetailsTabView
                    description={product.description}
                    materials={product.materials}
                    packageInfo={product.packageInfo}
                    showAdditional={false}
                    showFAQ={false}
                    showReview={false}
                />
            </div>
            <RelatedProducts excludeId={product.id} />
            <Newsletter />
        </main>
    )
}

export default ProductPage


