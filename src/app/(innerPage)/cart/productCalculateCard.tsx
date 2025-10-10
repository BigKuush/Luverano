"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { productToSlug } from '@/lib/slug';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAppSelector, useAppDispatch } from '@/lib/reduxHooks';
import { setShippingType } from '@/lib/features/OrderSlice';
import { reachGoal } from '@/lib/analytics';

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
            <p className='font-semibold lg:text-2xl text-xl text-secondary-foreground'>Итого в показе</p>
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
                        <Label htmlFor="free-shipping" className="text-gray-1-foreground text-base">Бесплатный показ в Москве и МО</Label>
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
            <Button className='mt-7.5 w-full lg:text-lg'  size="lg" onClick={() => {
                if (!products.length) { alert('Добавьте позиции в показ'); return; }
                const origin = typeof window !== 'undefined' ? window.location.origin : 'https://luverano.ru';
                const itemsText = products.map((p, idx) => `${idx + 1}) ${p.title} (SKU ${p.id}) - ${origin}/product/${productToSlug(p.id, p.title)} - ${p.quantity} шт.`).join('\n');
                const hasFireTable = products.some(p => /огн|fire/i.test(p.title));
                const text = `Хочу показ на адресе.\n\nПерки:\n- Бесплатный показ (Москва и МО): Да\n- Подарок: 12 газовых баллонов на год с заменой: ${hasFireTable ? 'Да' : 'Нет'}\n- Доставка/сборка/вывоз упаковки: Да\n\nПозиции:\n${itemsText}`;
                reachGoal('project_send',{count: products.length});
                reachGoal('whatsapp_click');
                const phone = '79154015754';
                const encoded = encodeURIComponent(text);
                const deepLink = `whatsapp://send?phone=${phone}&text=${encoded}`;
                const webLink = `https://wa.me/${phone}?text=${encoded}`;
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = deepLink;
                document.body.appendChild(iframe);
                setTimeout(() => { try { document.body.removeChild(iframe); } catch {} }, 1500);
                let blurOccured = false;
                const handleBlur = () => { blurOccured = true; window.removeEventListener('blur', handleBlur); };
                window.addEventListener('blur', handleBlur);
                setTimeout(() => {
                    window.removeEventListener('blur', handleBlur);
                    if (!blurOccured && document.hasFocus()) {
                        const needWeb = confirm('Если WhatsApp не открылся, открыть WhatsApp Web?');
                        if (needWeb) window.open(webLink, '_blank');
                    }
                }, 1500);
            }}>
                Оформить показ в WhatsApp
            </Button>
        </div>
    )
}

export default ProductCalculateCard
