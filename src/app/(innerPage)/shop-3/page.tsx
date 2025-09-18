import React from 'react'
import { Metadata } from 'next'
import PageHeader from '@/components/sections/pageHeader'
import ProductsView from '@/components/sections/shopDetails/productView'
import Newsletter from '@/components/sections/newsletter'
// import InstagramGallery from '@/components/sections/instagramGallery'
import { getProductsData } from '@/lib/data'
import { MetadataRoute } from 'next'

export const metadata: Metadata = {
    title: "Каталог - Luverano",
    description: "Премиальная мебель для загородной жизни. Эксклюзивные коллекции садовой и террасной мебели.",
    keywords: ["премиальная мебель", "садовая мебель", "террасная мебель", "уличная мебель", "мебель для сада"],
    openGraph: {
        title: "Каталог премиальной мебели - Luverano",
        description: "Эксклюзивные коллекции садовой и террасной мебели премиум-класса",
        type: "website"
    }
}

const ShopThree = async () => {
    const { featuredProducts } = await getProductsData();
    const itemListJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: featuredProducts.slice(0, 8).map((p: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `https://luverano.ru/product/${String(p.title).toLowerCase().replace(/\s+/g,'-')}`
        }))
    }
    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
            <PageHeader pageTitle='Каталог' currentPage='Каталог' bgImageUrl={'/images/kits/calma/1.jpg?v=1'} />
            <ProductsView
                isCategoryShow={false}
                isSortingProductTop={false}
                isGridDefaultView={false}
                isSidebarCategoryHide={true}
                data={featuredProducts.slice(0, 8)}
            />
            <Newsletter />
            {/* <InstagramGallery /> */}
        </main>

    )
}

export default ShopThree