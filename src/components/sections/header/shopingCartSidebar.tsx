'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Close, FuShopingBig, Minus, Plus, ShopCart } from '@/lib/icon';
import { reachGoal } from '@/lib/analytics';
import { productToSlug } from '@/lib/slug';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks';
import { cn } from '@/lib/utils';
import currencyFormatter from 'currency-formatter';
import { dicrementProductQuentity, incrementProductQuentity, removeToCart } from '@/lib/features/AddToCartSlice';
import { usePathname } from 'next/navigation';

const ShopingCartSidebar = () => {
  const pathName = usePathname()
  const [isClient, setIsClient] = useState(false)
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.addToCart.products);

  const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);
  const totalProducts = products.reduce((total, product) => total + product.quantity, 0);
  const handleSendWhatsApp = () => {
    if (!products.length) {
      alert('Добавьте позиции в показ');
      return;
    }
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://luverano.ru';
    const itemsText = products.map((p, idx) => `${idx + 1}) ${p.title} (SKU ${p.id}) - ${origin}/product/${productToSlug(p.id, p.title)} - ${p.quantity} шт.`).join('\n');
    const hasFireTable = products.some(p => /огн|fire/i.test(p.title));
    const text = `Хочу показ на адресе.\n\nПерки:\n- Бесплатный показ (Москва и МО): Да\n- Подарок: 12 газовых баллонов на год с заменой: ${hasFireTable ? 'Да' : 'Нет'}\n- Доставка/сборка/вывоз упаковки: Да\n\nПозиции:\n${itemsText}`;
    const phone = '79154015754';
    const encoded = encodeURIComponent(text);
    const deepLink = `whatsapp://send?phone=${phone}&text=${encoded}`;
    const webLink = `https://wa.me/${phone}?text=${encoded}`;
    reachGoal('project_send', { count: products.length });
    reachGoal('whatsapp_click');
    // Пытаемся открыть приложение через скрытый iframe, чтобы НЕ покидать сайт
    const openViaIframe = () => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = deepLink;
      document.body.appendChild(iframe);
      setTimeout(() => { try { document.body.removeChild(iframe); } catch {} }, 1500);
    };
    const startedAt = Date.now();
    let blurOccured = false;
    const handleBlur = () => { blurOccured = true; window.removeEventListener('blur', handleBlur); };
    window.addEventListener('blur', handleBlur);
    openViaIframe();
    // Фолбэк: если приложение не открылось (фокуса не потеряли), предложим Web через 1.5с
    setTimeout(() => {
      window.removeEventListener('blur', handleBlur);
      const opened = blurOccured || document.hidden || !document.hasFocus() || (Date.now() - startedAt) < 1700;
      if (!opened) {
        const needWeb = confirm('Если WhatsApp не открылся, открыть WhatsApp Web?');
        if (needWeb) window.open(webLink, '_blank');
      }
    }, 1500);
  };

  useEffect(() => {
    setOpen(false)
  }, [pathName])

  useEffect(() => {
    setIsClient(true)
  }, [])


  return (
    <>
      {
        isClient ?

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger aria-label='showcase' className='text-gray-1-foreground relative' onClick={() => reachGoal('project_open')}>
              <ShopCart className='size-6' />
              {totalProducts > 0 && (
                <span className='w-[15px] h-[15px] bg-primary rounded-full flex items-center justify-center text-xs text-white absolute -right-[3px] -top-[3px]'>{totalProducts}</span>
              )}
            </SheetTrigger >
            <SheetContent className='sm:max-w-[420px] w-full p-0 [&_.close-orginal]:hidden'>
              <SheetHeader className='bg-[#F5F5F5] px-7.5 py-[31px] flex flex-row justify-between items-center space-y-0'>
                <SheetTitle className='text-secondary-foreground font-inter font-medium uppercase leading-[155%]'>
                  Показ{totalProducts > 0 && ` (${totalProducts})`}
                </SheetTitle>
                <SheetClose className='text-gray-1-foreground mt-0'>
                  <Close className='lg:w-7.5 lg:h-7.5 w-5 h-5' />
                </SheetClose>
              </SheetHeader>
              <div className='flex flex-col gap-6 p-7.5 max-h-[540px] h-full overflow-y-auto'>
                {products.length ? (
                  products.map(({ id, price, quantity, thumbnail, title }) => (
                    <div key={id} className='flex items-center gap-4'>
                      <div className='bg-[#F2F2F2] p-2.5 shrink-0'>
                        <Image width={80} height={90} src={thumbnail} sizes='100vw' alt='img' className='h-[90px] w-20 object-cover' />
                      </div>
                      <div className='shrink'>
                        <b className='lg:text-xl text-lg font-medium text-gray-1-foreground leading-[150%] capitalize line-clamp-1'>{title}</b>
                        <div className='flex items-center gap-3 mt-2.5 mb-3'>
                          <div className='border-[1.5px] border-[#000] text-secondary-foreground flex items-center gap-2.5 px-2.5 py-1.5'>
                            <span className='cursor-pointer h-4 w-5 inline-flex items-center justify-center' onClick={() => dispatch(dicrementProductQuentity({ id }))}><Minus /></span>
                            <input value={quantity} readOnly className='outline-none max-w-5 text-center text-sm' />
                            <span className='cursor-pointer h-4 w-5 inline-flex items-center justify-center' onClick={() => dispatch(incrementProductQuentity({ id }))}><Plus /></span>
                          </div>
                          <span className='text-secondary-foreground text-base'>{currencyFormatter.format(price, { code: 'RUB', thousand: ' ', precision: 0 })}</span>
                        </div>
                        <p onClick={() => dispatch(removeToCart(id))} className='text-gray-1-foreground capitalize underline decoration-skip-ink-none text-underline-position decoration-[#666564] cursor-pointer leading-[150%] text-base hover:text-secondary-foreground transition-all duration-500'>
                          Удалить
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='capitalize text-secondary-foreground text-xl'>Показ пуст</p>
                )}
              </div>
              <SheetFooter className='absolute bottom-7.5 sm:flex-col bg-background w-full'>
                <div className='bg-[#F5F5F5] px-7.5 py-4 flex justify-between items-center'>
                  <p className='text-secondary-foreground font-medium leading-[155%]'>Итого:</p>
                  <p className='text-secondary-foreground font-medium'>
                    {currencyFormatter.format(totalPrice, { code: 'RUB', thousand: ' ', precision: 0 })}
                  </p>
                </div>
                <div className='px-7.5 pt-7.5'>
                  <div className='text-gray-1-foreground text-base space-y-1'>
                    <p>Частный показ - привезём и продемонстрируем мебель на вашем адресе (Москва и МО).</p>
                    <p>Для комплектов со столом-очагом: годовой сервис газовых баллонов - 12 плановых замен в течение 12 месяцев.</p>
                    <p>Доставка и профессиональная сборка.</p>
                  </div>
                  <div className='mt-10'>
                    <Button  size={"sm"} className='w-full py-[11px] lg:text-lg lg:leading-[155%] mt-3' onClick={handleSendWhatsApp}>
                      Оформить показ в WhatsApp
                    </Button>
                  </div>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          :
          null
      }
    </>
  );
};

export default ShopingCartSidebar;