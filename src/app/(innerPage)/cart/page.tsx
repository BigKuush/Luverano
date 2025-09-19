import React from 'react'
import PageHeader from '@/components/sections/pageHeader'
import ProductCalculateCard from "@/app/(innerPage)/cart/productCalculateCard"
import ProductsCartTable from '@/app/(innerPage)/cart/productsCartTable'
import RelatedProducts from '@/components/sections/shopDetails/relatedProducts'
import Newsletter from '@/components/sections/newsletter'
import InstagramGallery from '@/components/sections/instagramGallery'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Корзина - Luverano",
    description: "Просмотрите товары в корзине и оформите заказ."
}

const VIewCart = () => {
    return (
        <main>
            <PageHeader 
                currentPage='Корзина' 
                pageTitle='Корзина' 
                breadcrumbLink='shop-3' 
                breadcrumbLabel='Каталог'
                bgImageUrl='/images/kits/valiente/1.jpg'
            />
            <div className='container lg:pt-25 lg:pb-25 pt-15 pb-15'>
                <div className='grid xl:grid-cols-[auto_23.944%] lg:grid-cols-[auto_30%] grid-cols-1 gap-7.5 items-start'>
                    <ProductsCartTable />
                    <ProductCalculateCard />
                </div>
            </div>
            <RelatedProducts/>
            <Newsletter/>
            <InstagramGallery/>
        </main>
    )
}

export default VIewCart