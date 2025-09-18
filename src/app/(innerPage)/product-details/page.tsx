import React from 'react'
import { Metadata } from 'next'
// import InstagramGallery from '@/components/sections/instagramGallery'
import Newsletter from '@/components/sections/newsletter'
import ProductDetailsTabView from '@/components/sections/shopDetails/productDetailsTabView'
import ProductShortInfo from '@/components/sections/shopDetails/productShortInfo'
import ProductPreview from '@/components/sections/shopDetails/productPreview'
import { getProductsData } from '@/lib/data'
import RelatedProducts from '@/components/sections/shopDetails/relatedProducts'

// Страница устарела: редирект через middleware на /product/[slug]
export const metadata: Metadata = {
    title: "Товар | Luverano",
    description: "Страница перенесена на новый адрес."
}

export const revalidate = 0
export const dynamic = 'force-dynamic'

const ProductDetailsOne = async ({ searchParams }: { searchParams: Promise<{ id?: string }> }) => {
    const params = await searchParams;
    const idParam = params?.id || "1"
    const numericId = Number(idParam)
    const { featuredProducts, topCollections } = await getProductsData() as any
    const all = Array.isArray(featuredProducts) && featuredProducts.length ? featuredProducts : []
    const extras = Array.isArray(topCollections) && topCollections.length ? topCollections : []
    // Предпочитаем элементы из topCollections (в них у нас есть summary и расширенные поля)
    const merged = [...extras, ...all]
    const product = merged.find((p: any) => Number(p.id) === numericId) || merged[0]

    return (
        <main>
            <div className='container'>
                <div className='grid lg:grid-cols-[40.9%_auto] md:grid-cols-2 grid-cols-1 xl:gap-15 gap-10 lg:mt-25 mt-15'>
                    <ProductPreview images={product?.images} />
                    <ProductShortInfo
                        id={product?.id ?? idParam}
                        isSiteMapShow={true}
                        price={product?.price ?? 0}
                        title={product?.title ?? 'Товар'}
                        thumbnail={product?.thumbnail ?? '/images/product-details/img-1.webp'}
                        stock={product?.stock ?? 0}
                        discountPercentage={product?.discountPercentage ?? 0}
                        summary={product?.summary || product?.description || product?.DESCRIPTION}
                    />
                </div>
                <ProductDetailsTabView
                    description={product?.description || product?.DESCRIPTION}
                    materials={product?.materials}
                    packageInfo={product?.packageInfo}
                    showAdditional={false}
                    showFAQ={false}
                    showReview={false}
                />
            </div>
            <RelatedProducts excludeId={product?.id ?? idParam} />
            <Newsletter />
            {/* <InstagramGallery /> */}
        </main>
    )
}

export default ProductDetailsOne