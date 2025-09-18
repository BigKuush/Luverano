"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import currencyFormatter from 'currency-formatter';
import { ChevronRight, Minus, Plus } from '@/lib/icon'
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/lib/reduxHooks';
import { addToCart } from '@/lib/features/AddToCartSlice';
import calcluteDiscount from '@/lib/calcluteDiscount';
// import { addToCompare } from '@/lib/features/CompareProductsSlice';

const colors = ["#E56F45", "#B4CBBB", "#CDA477", "#EADDC9", "#E5E2E1"]
const sizes = ["s", "m", "l"]

export interface ProductShortInfoPropsType {
    id: number | string,
    isSiteMapShow?: boolean,
    title: string,
    price: number,
    discountPercentage: number,
    thumbnail: string,
    stock: number,
    summary?: string,
}
const ProductShortInfo = ({ id, isSiteMapShow, title, price, discountPercentage, thumbnail, stock, summary }: ProductShortInfoPropsType) => {
    const dispatch = useAppDispatch()
    const [selectSize, setSelectSize] = useState("m")
    const [selectColor, setSelectColor] = useState("#E56F45")
    const [productQuantity, setProductQuantity] = useState(1)

    const handleProdcutQuantity = (type: string) => {
        if (type === "increment") {
            setProductQuantity(productQuantity + 1)
        }
        else {
            if (productQuantity === 1) {
                return
            }
            setProductQuantity(productQuantity - 1)
        }
    }

    const finalPrice = discountPercentage ? calcluteDiscount(price, discountPercentage) : price

    return (
        <div>
            {
                isSiteMapShow &&
                <div className='flex items-center flex-wrap gap-0.5 mb-7.5'>
                    <Link href={"/"} className='text-gray-3-foreground text-base hover:text-gray-1-foreground transition-all duration-500'>Главная</Link>
                    <span className='text-gray-3-foreground'><ChevronRight className='size-4' /></span>
                    <Link href={"/shop-3?category=komplekty"} className='text-gray-3-foreground text-base hover:text-gray-1-foreground transition-all duration-500'>Каталог</Link>
                    <span className='text-gray-3-foreground'><ChevronRight className='size-4' /></span>
                    <span className='text-gray-1-foreground font-medium'>{title}</span>
                </div>
            }

            <h1 className='text-secondary-foreground lg:leading-[81%] lg:text-[32px] md:text-[28px] text-2xl font-semibold capitalize'>{title}</h1>
            {/* Наличие перенесено ниже, под SKU */}
            <p className='text-xl lg:text-2xl xl:text-3xl xl:leading-[133%] text-secondary-foreground mt-5'>
                {discountPercentage ? <del className='text-gray-3-foreground'>{currencyFormatter.format(price, { code: 'RUB', thousand: ' ', precision: 0 })}</del> : null} {' '}
                <span>{currencyFormatter.format(finalPrice, { code: 'RUB', thousand: ' ', precision: 0 })}</span>
            </p>
            {summary ? (
                <p className='mt-5 text-gray-1-foreground'>{summary}</p>
            ) : null}

            {/* Блоки выбора цвета и размера временно скрыты */}
            <div className='flex gap-3 mt-10'>
                <div className='border-[1.5px] border-[#000] text-secondary-foreground flex items-center gap-2.5 px-3 py-2.5 rounded-sm'>
                    <span className='cursor-pointer h-4 w-5 inline-flex items-center justify-center' onClick={() => handleProdcutQuantity("decrement")}><Minus /></span>
                    <input value={productQuantity} readOnly className='outline-none max-w-5 text-center text-sm' />
                    <span className='cursor-pointer h-4 w-5 inline-flex items-center justify-center' onClick={() => handleProdcutQuantity("increment")}><Plus /></span>
                </div>
                <Button
                    size={"xm"}
                    
                    className='lg:leading-[166%] py-1.5'
                    onClick={() => dispatch(addToCart({ id, thumbnail, quantity: productQuantity, price: finalPrice, color: selectColor, size: selectSize, title }))}
                >
                    В корзину
                </Button>
            </div>
            {/* Кнопку "В избранное" скрыли по требованию */}
            <div className='mt-10 flex flex-col gap-2.5'>
                <p className='text-gray-1-foreground'>SKU: <span className='text-gray-1-foreground text-base'>D1008</span></p>
                <p className='text-secondary-foreground text-base'>Наличие: <span className='text-[#59994D]'>В наличии</span></p>
            </div>
        </div>
    )
}

export default ProductShortInfo