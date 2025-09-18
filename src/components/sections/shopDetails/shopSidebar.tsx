import Link from 'next/link'
import React from 'react'
import PriceRangeSlider from './priceRangeSlider'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Close } from '@/lib/icon'

export const categoriesDataSidebar = [
    {
        "id": 1,
        "categoryName": 'Комплекты (12)',
        "categoryImg": "",
        "value": 'komplekty'
    },
    {
        "id": 2,
        "categoryName": 'Кресла (8)',
        "categoryImg": "",
        "value": 'kresla'
    },
    {
        "id": 3,
        "categoryName": 'Столы (6)',
        "categoryImg": "",
        "value": 'stoly'
    },
    {
        "id": 4,
        "categoryName": 'Стулья (4)',
        "categoryImg": "",
        "value": 'stulya'
    }
];
const colors = ["#1A1A19", "#D9D9D9", "#96532A", "#0000001A", "#FFA34E", "#FBDBAC", "#EADDC9"]

const bestProducts = [
    {
        "id": 1,
        "thumbnail": "/images/sidebar/img-1.webp",
        "title": "Комплект Blossom-6",
        "price": 485000
    },
    {
        "id": 2,
        "thumbnail": "/images/sidebar/img-2.webp",
        "title": "Кресло Verona",
        "price": 125000
    },
    {
        "id": 3,
        "thumbnail": "/images/sidebar/img-3.webp",
        "title": "Стол Toscana",
        "price": 195000
    },
]

const tags = ["премиум", "загородный", "садовый", "террасный", "для отдыха", "для веранды"]

const ShopSidebar = ({ isSidebarCategoryHide }: { isSidebarCategoryHide?: boolean }) => {

    return (
        <aside className='relative'>
            <Button size={"sm"}  className='lg:hidden inline-flex'>Фильтры</Button>
            <div className={`bg-background max-w-[340px] pr-5 py-7.5 absolute top-0 z-40 lg:static lg:max-w-full lg:pr-0 lg:py-0 transition-all duration-500`}>
                <div className='text-gray-1-foreground absolute right-5 lg:hidden'>
                    <Close className='size-5' />
                </div>
                {
                    isSidebarCategoryHide ||
                    <div className='pb-10 border-b border-b-[#999796]'>
                        <strong className='font-medium text-xl text-secondary-foreground uppercase'>Категории</strong>
                        <ul className='mt-5 flex flex-col gap-2.5'>
                            {categoriesDataSidebar.map(({ categoryName, id, value }) => (
                                <li key={id}>
                                    <Link href={`/shop-3?category=${value}`} className='text-gray-1-foreground text-base leading-[162%] hover:text-primary-foreground transition-all duration-500'>
                                        {categoryName}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
                <div className='mt-10 pb-10 border-b border-b-[#999796]'>
                    <strong className='font-medium text-xl text-secondary-foreground uppercase'>Цена</strong>
                    <PriceRangeSlider />
                </div>
                <div className='mt-10 pb-10 border-b border-b-[#999796]'>
                    <strong className='font-medium text-xl text-secondary-foreground uppercase'>Цвет</strong>
                    <ul className='mt-5 flex flex-wrap gap-2.5'>
                        {
                            colors.map((color, index) =>
                                <li key={index} className={`rounded-full w-7.5 h-7.5 cursor-pointer`} style={{ backgroundColor: color }}> </li>
                            )
                        }
                    </ul>
                </div>
                <div className='mt-10 pb-10'>
                    <strong className='font-medium text-xl text-secondary-foreground uppercase'>Популярное</strong>
                    <div className='mt-5 flex flex-col gap-5'>
                        {
                            bestProducts.map(({ id, price, thumbnail, title }) => {
                                return (
                                    <div key={id} className='flex items-center gap-5'>
                                        <Image width={90} height={70} sizes='100vw' src={thumbnail} alt='img' className='rounded-sm' />
                                        <div>
                                            <Link href={"/product-details"} className='capitalize text-gray-1-foreground font-medium hover:text-primary-foreground transition-all duration-500'>{title}</Link>
                                            <p className='text-secondary-foreground mt-1 font-medium'>{price.toLocaleString('ru-RU')} ₽</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='mt-10 pb-10'>
                    <strong className='font-medium text-xl text-secondary-foreground uppercase'>Теги</strong>
                    <div className='mt-5 flex flex-wrap gap-x-[15px] gap-y-2.5'>
                        {
                            tags.map((tag, index) => {
                                return (
                                    <Link href={"#"} key={index} className='underline decoration-skip-ink-none text-underline-position capitalize text-gray-1-foreground text-base hover:text-primary-foreground transition-all duration-500'>
                                        {tag}
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default ShopSidebar