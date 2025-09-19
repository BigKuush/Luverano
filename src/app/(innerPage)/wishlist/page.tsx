import React from 'react'
import PageHeader from '@/components/sections/pageHeader'
import Newsletter from '@/components/sections/newsletter'
import InstagramGallery from '@/components/sections/instagramGallery'
import WishlistProductsTable from './wishlistProductsTable'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Wishlist",
    description: "View your wishlist."
}

const Wishlist = () => {
    return (
        <main>
            <PageHeader 
                currentPage='Избранное' 
                pageTitle='Избранное' 
                breadcrumbLink='/shop-3' 
                breadcrumbLabel='Каталог'
                bgImageUrl='/images/kits/serena/1.jpg'
            />
            <WishlistProductsTable />
            <Newsletter />
            <InstagramGallery />
        </main>
    )
}

export default Wishlist