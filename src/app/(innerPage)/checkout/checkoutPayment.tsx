"use client"
import React from 'react'
import Image from 'next/image'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks'
import { setShippingType } from '@/lib/features/OrderSlice'

const CheckoutPayment = () => {
    const dispatch = useAppDispatch()
    const { shippingType, shippingPrice } = useAppSelector((state) => state.order)
    const { products } = useAppSelector((state) => state.addToCart)
    
    const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0)
    const total = subtotal + shippingPrice

    return (
        <div className='bg-[#F5F5F5] sm:p-10 p-7 rounded-xl'>
            <div className='border border-[#999796] sm:p-7.5 p-5 rounded-lg'>
                <p className='bg-primary text-white lg:py-[15px] py-3 lg:text-2xl sm:text-xl text-lg lg:leading-[125%] font-semibold text-center rounded-md'>Ваш заказ</p>
                <div className='overflow-x-auto'>
                    <div className='mt-7.5  min-w-[350px]'>
                        <div className='flex justify-between border-b-[1.5px] border-b-[#999796] pb-5'>
                            <p className='lg:text-2xl sm:text-xl text-lg lg:leading-[125%] font-semibold text-secondary-foreground'>Товар</p>
                            <p className='lg:text-2xl sm:text-xl text-lg lg:leading-[125%] font-semibold text-secondary-foreground'>Сумма</p>
                        </div>

                        <div className='mt-7.5 flex flex-col gap-5 border-b-[1.5px] border-b-[#999796] pb-7.5'>
                            {products.map((product) => (
                                <div key={product.id} className='flex justify-between'>
                                    <div className='flex items-center gap-5'>
                                        <Image width={70} height={70} src={product.thumbnail} alt={product.title} className='bg-white max-h-[70px] object-contain' />
                                        <div>
                                            <p className='text-secondary-foreground lg:text-xl sm:text-lg text-base font-medium'>{product.title}</p>
                                            <span className='text-base text-secondary-foreground'>Кол-во: {product.quantity}</span>
                                        </div>
                                    </div>
                                    <p className='text-secondary-foreground lg:text-xl sm:text-lg text-base font-semibold lg:leading-[150%] mt-2'>{product.price.toFixed(0)} ₽</p>
                                </div>
                            ))}
                        </div>

                        <div className='flex justify-between border-b-[1.5px] border-b-[#999796] pb-5 mt-7.5'>
                            <p className='lg:text-xl text-lg lg:leading-[150%] font-medium text-secondary-foreground'>Подытог</p>
                            <p className='lg:text-xl text-lg lg:leading-[150%] font-medium text-secondary-foreground'>{subtotal.toFixed(0)} ₽</p>
                        </div>

                        <div className='flex justify-between items-center border-b-[1.5px] border-b-[#999796] pb-5 mt-7.5'>
                            <p className='lg:text-xl text-lg lg:leading-[150%] font-medium text-secondary-foreground'>Доставка</p>
                            <RadioGroup 
                                value={shippingType === 'free' ? '0' : '5000'} 
                                onValueChange={(value) => dispatch(setShippingType(value === '0' ? 'free' : 'express'))}
                                className="gap-2.5 justify-end"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="0" id="free-shipping" aria-label='radio' className='border-primary text-transparent' />
                                    <Label htmlFor="free-shipping" className="text-gray-1-foreground text-base">Бесплатная доставка</Label>
                                </div>
                                <div className="flex items-center space-x-2 ">
                                    <RadioGroupItem value="5000" id="express-shipping" aria-label='radio' className='border-primary text-transparent' />
                                    <Label htmlFor="express-shipping" className="text-gray-1-foreground text-base">Срочная доставка 5000 ₽</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className='flex justify-between mt-7.5'>
                            <p className='text-xl leading-[150%] font-medium text-secondary-foreground'>Итого</p>
                            <p className='text-xl leading-[150%] font-medium text-secondary-foreground'>{total.toFixed(0)} ₽</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-10'>
                <div className='flex items-center gap-2.5 mt-10'>
                    <Checkbox id="terms" className="rounded-[4px] border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white" />
                    <Label htmlFor="terms" className="lg:text-lg text-base font-normal text-secondary-foreground">Я согласен с <Link href={"/terms-conditions"} className='underline'>условиями использования сайта</Link><span className='text-primary-foreground'>*</span></Label>
                </div>

                <Button className='lg:py-3 w-full mt-10 lg:leading-[166%] lg:text-lg'>Оформить заказ</Button>
            </div>
        </div>
    )
}

export default CheckoutPayment