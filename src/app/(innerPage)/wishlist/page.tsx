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
            <PageHeader currentPage='Wishlist' pageTitle='Wishlist' breadcrumbLink='shop-1' breadcrumbLabel='Shop' />
            <WishlistProductsTable />
            <Newsletter />
            <InstagramGallery />
        </main>
    )
}

export default Wishlist