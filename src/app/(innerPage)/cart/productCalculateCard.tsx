"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAppSelector, useAppDispatch } from '@/lib/reduxHooks';
import { setShippingType } from '@/lib/features/OrderSlice';

const ProductCalculateCard = () => {
    const dispatch = useAppDispatch()
    const { products } = useAppSelector((state) => state.addToCart)
    const { shippingType, shippingPrice } = useAppSelector((state) => state.order)
    const subTotal = products.reduce((total, product) => total + product?.price * product?.quantity, 0);
    const totalPrice = subTotal + shippingPrice

    // useEffect(() => {
    //     if (isCheckout) {
    //         setCustomerInfo({ ...customerInfo, products, paymentMehod, totalPrice })
    //     }
    // }, [products, paymentMehod, totalPrice])


    return (
        <div className='border-primary border px-5 pt-5 pb-7.5 lg:sticky top-0 rounded-lg'>
            <p className='font-semibold lg:text-2xl text-xl text-secondary-foreground'>Итого в корзине</p>
            <div className='mt-7.5 border-b border-b-[#E5E2E1] pb-5'>
                <div className='flex items-center justify-between'>
                    <p className='lg:text-xl text-lg font-medium text-secondary-foreground'>Подытог</p>
                    <p className='font-medium text-secondary-foreground'>{subTotal.toFixed(0)} ₽</p>
                </div>
            </div>
            <div className='mt-7.5 border-b border-b-[#E5E2E1] pb-5'>
                <RadioGroup 
                    value={shippingType === 'free' ? '0' : '5000'} 
                    onValueChange={(value) => dispatch(setShippingType(value === '0' ? 'free' : 'express'))}
                    className="gap-2.5 justify-end"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="free-shipping" aria-label='radio' className='border-primary text-transparent' />
                        <Label htmlFor="free-shipping" className="text-gray-1-foreground text-base">Бесплатная доставка</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="5000" id="express-shipping" aria-label='radio' className='border-primary text-transparent' />
                        <Label htmlFor="express-shipping" className="text-gray-1-foreground text-base">Срочная доставка 5000 ₽</Label>
                    </div>
                </RadioGroup>
                <div className='flex items-start justify-between gap-9 mt-7.5'>
                    <p className='lg:text-xl text-lg font-medium text-secondary-foreground'>Доставка</p>
                    <div>
                        <p className='text-gray-1-foreground'>Доставка в <span className='text-secondary-foreground'>Москву</span></p>
                        <p className='text-secondary-foreground mt-3'>Изменить адрес</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-between mt-5'>
                <p className='lg:text-2xl text-xl font-medium text-secondary-foreground'>Итого</p>
                <p className='font-bold text-secondary-foreground'>{totalPrice.toFixed(0)} ₽</p>
            </div>
            <Button asChild className='mt-7.5 w-full lg:text-lg'  size="lg">
                <Link href={"/checkout"} >Оформить заказ</Link>
            </Button>
        </div>
    )
}

export default ProductCalculateCard
