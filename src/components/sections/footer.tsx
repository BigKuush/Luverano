import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className='lg:pt-[90px] pb-7.5 pt-12 bg-[#F5F2ED]'>
            <div className='container'>
                <div className='flex lg:flex-row flex-col justify-between gap-y-10'>
                    <div>
                        <div className='max-w-[305px]'>
                            <Link href={"/"}>
                                <Image
                                    src={"/images/luverano-logo.svg"}
                                    alt='Luverano'
                                    width={320}
                                    height={90}
                                    className="mb-6 h-16 md:h-20 w-auto object-contain"
                                    priority
                                />
                            </Link>
                            <p className='mt-6 text-base text-[#4F4F59] leading-[170%]'>Мы создаем эксклюзивные коллекции мебели, сочетающие элегантность, комфорт и долговечность.</p>
                        </div>
                    </div>
                    <div className='basis-[65%] flex items-center justify-end'>
                        <div className='text-right'>
                                                                <p className='text-[#4F4F59] text-lg mb-2'>
                                        <a href="tel:+79154015754" className='hover:text-secondary-foreground transition-all duration-500'>+7 (915) 401-57-54</a>
                                        <span className='mx-2'>•</span>
                                        <a href="mailto:info@luverano.ru" className='hover:text-secondary-foreground transition-all duration-500'>info@luverano.ru</a>
                                    </p>
                                    <p className='text-[#4F4F59] text-lg'>
                                        Москва, рабочий посёлок Заречье, Торговая ул., с2
                                    </p>
                        </div>
                    </div>
                </div>
                <div className='mt-10 mb-10 border-t border-[#E5E2E1]'></div>
                <div className='flex items-center justify-between flex-col lg:flex-row gap-5'>
                    <p className='text-[#4F4F59] text-base leading-[170%]'>© {new Date().getFullYear()}. Все права защищены | Luverano</p>
                    <div className='flex items-center gap-2.5'>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer