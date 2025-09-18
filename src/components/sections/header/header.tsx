import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import TopHeader from './topHeader'
import HeaderExtraInfo from './headerExtraInfo'
import Navbar from './navbar'
import { getMenuData, getProductsData } from "@/lib/data";
import ShopingCartSidebar from './shopingCartSidebar'
import { User } from '@/lib/icon'
import StickyHeader from './stickyHeader'
import SearchPopup from './searchPopup'
import { ProductType } from '@/types/productType'

const Header = async () => {
    const menuList = await getMenuData();
    const { featuredProducts }: { featuredProducts: ProductType[] } = await getProductsData();
    return (
        <StickyHeader topHeaderContent={<TopHeader />}>
            <div className='lg:h-28 h-20 bg-[#F5F2ED] [.header-pinned_&]:shadow-md'>
                <div className='container flex justify-between items-center h-full relative'>
                    <div className='w-full'>
                        <Navbar data={menuList} />
                    </div>
                    <Link href={"/"} className='shrink-0'>
                        <Image
                            src={"/images/luverano-logo.svg"}
                            alt='Luverano'
                            width={320}
                            height={90}
                            className="py-1 h-14 md:h-16 lg:h-20 w-auto object-contain"
                            priority
                        />
                    </Link>
                    <div className='flex items-center justify-end gap-5 w-full'>
                        {/* <SearchPopup data={featuredProducts}/> */}
                        <div className='lg:block hidden'>
                            <HeaderExtraInfo />
                        </div>
                        {/* Иконку личного кабинета скрыли */}
                        <ShopingCartSidebar />
                    </div>
                </div>
            </div>
        </StickyHeader>
    )
}

export default Header