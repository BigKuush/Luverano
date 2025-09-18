import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BlogSIdebar from '@/components/sections/blogs/blogSIdebar'
import { Facebook, Instagram, Linkedin, Twitter } from '@/lib/icon'

const BlogArtical = () => {
    return (
        <div className='container lg:pt-25 pt-15'>
            <div className='grid xl:grid-cols-[auto_24%] lg:grid-cols-[60%_auto] grid-cols-1 gap-x-10 gap-y-12'>
                <div>
                    <Image width={1040} height={500} style={{ width: "100%", height: "auto" }} src={"/images/blog/blog-single-1.webp"} alt='img' />
                    {/* Метаданные скрыты: дата, автор, комментарии */}
                    <h5 className='text-gray-1-foreground mt-2.5 leading-[150%]'>Как выбрать идеальную мебель для дома и террасы</h5>
                    <p className='text-gray-1-foreground mt-5'>Получите профессиональные советы по уходу за мебелью, планировке пространства и организации дома. Мы делимся практическими рекомендациями, чтобы вы могли максимально эффективно использовать каждый метр. В подборках вы найдёте вдохновляющие примеры и идеи для создания гармоничного пространства мечты.</p>
                    <ul className='mt-5 mb-7.5 flex flex-col gap-2.5'>
                        <li className='text-gray-1-foreground pl-4 relative after:absolute after:left-0 after:top-3 after:w-1.5 after:h-1.5 after:rounded-full after:bg-muted'>
                            <b className='text-gray-1-foreground font-medium'>Тренды дизайна:</b> следите за актуальными направлениями в мебели и интерьере — от современного минимализма до природной эстетики. Узнайте, как органично внедрить эти стили в ваш дом.
                        </li>
                        <li className='text-gray-1-foreground pl-4 relative after:absolute after:left-0 after:top-3 after:w-1.5 after:h-1.5 after:rounded-full after:bg-muted'>
                            <b className='text-gray-1-foreground font-medium'>Полезные советы:</b> профессиональные рекомендации по уходу за мебелью, планировке комнат и организации хранения. Наши эксперты делятся практикой, которая экономит время и бюджет.
                        </li>
                        <li className='text-gray-1-foreground pl-4 relative after:absolute after:left-0 after:top-3 after:w-1.5 after:h-1.5 after:rounded-full after:bg-muted'>
                            <b className='text-gray-1-foreground font-medium'>Галереи вдохновения:</b> подборки реализованных проектов и стилистических решений для террас и интерьеров. Найдите идеи, подходящие под ваш стиль жизни.
                        </li>
                        <li className='text-gray-1-foreground pl-4 relative after:absolute after:left-0 after:top-3 after:w-1.5 after:h-1.5 after:rounded-full after:bg-muted'>
                            <b className='text-gray-1-foreground font-medium'>Новости бренда:</b> узнавайте первыми о запуске новых коллекций, специальных предложениях и сезонных акциях.
                        </li>
                    </ul>
                    <blockquote className='px-5 py-2 border-l-[3px] border-l-muted bg-home-bg-1 font-medium lg:text-xl text-lg text-gray-1-foreground'>
                        Присоединяйтесь к сообществу любителей дизайна — свежие идеи и практичные решения мы публикуем регулярно. Пусть ваш дом и терраса вдохновляют каждый день.
                    </blockquote>
                    <p className='mt-7.5 text-gray-1-foreground'>Мы регулярно делимся новыми материалами — от обзоров трендов до пошаговых чек‑листов. Блог Luverano поможет спланировать обновление пространства и ухаживать за мебелью круглый год.</p>
                    <div className='mt-7.5 grid sm:grid-cols-2 grid-cols-1 gap-7.5'>
                        <figure>
                            <Image width={505} height={570} style={{ width: "100%", height: "auto" }} src={"/images/blog/img-single-2.webp"} alt='img' />
                            <figcaption className='text-gray-1-foreground font-medium sm:mt-5 mt-3'>Руководство по выбору идеальной мебели для вашего дома</figcaption>
                        </figure>
                        <figure>
                            <Image width={505} height={570} style={{ width: "100%", height: "auto" }} src={"/images/blog/img-single-3.webp"} alt='img' />
                            <figcaption className='text-gray-1-foreground font-medium sm:mt-5 mt-3'>Кресло Dorso Swivel и ключевые принципы удобной мебели</figcaption>
                        </figure>
                    </div>
                    <p className='mt-7.5 text-gray-1-foreground'>Join our community of design enthusiasts and stay inspired with fresh content regularly. Whether you're planning a complete home makeover or looking for small updates to refresh your space, the Luxura Pro Blog is here to guide and inspire you every step of the way.</p>

                    <div className='flex lg:flex-row flex-col justify-between gap-y-4 mt-10'>
                        <div className='flex items-center gap-2.5'>
                            <strong className='lg:text-2xl text-xl font-medium text-gray-1-foreground'>Теги:</strong>
                            <div className='flex flex-wrap gap-1.5'>
                                <Link href={"#"} className='px-4 rounded-[4px] lg:py-1.5 py-1 text-base text-gray-3-foreground border border-[#807E7D] inline-block hover:bg-primary hover:text-white transition-all duration-500'>
                                    Мебель
                                </Link>
                                <Link href={"#"} className='px-4 rounded-[4px] lg:py-1.5 py-1 text-base text-gray-3-foreground border border-[#807E7D] inline-block hover:bg-primary hover:text-white transition-all duration-500'>
                                    Спальня
                                </Link>
                                <Link href={"#"} className='px-4 rounded-[4px] lg:py-1.5 py-1 text-base text-gray-3-foreground border border-[#807E7D] inline-block hover:bg-primary hover:text-white transition-all duration-500'>
                                    Гостиная
                                </Link>
                                <Link href={"#"} className='px-4 rounded-[4px] lg:py-1.5 py-1 text-base text-gray-3-foreground border border-[#807E7D] inline-block hover:bg-primary hover:text-white transition-all duration-500'>
                                    Декор
                                </Link>
                            </div>
                        </div>
                        <div className='flex items-center gap-2.5'>
                            <strong className='lg:text-2xl text-xl font-medium text-gray-1-foreground'>Поделиться:</strong>
                            <ul className='flex gap-2.5'>
                                <li><Link href={"#"} aria-label='facebook' className='w-8 h-8 rounded-full flex justify-center items-center border border-[#807E7D] text-gray-1-foreground hover:bg-primary hover:text-white transition-all duration-500 '><Facebook className='size-4' /></Link></li>
                                <li><Link href={"#"} aria-label='twitter' className='w-8 h-8 rounded-full flex justify-center items-center border border-[#807E7D] text-gray-1-foreground hover:bg-primary hover:text-white transition-all duration-500 '><Twitter className='size-4' /></Link></li>
                                <li><Link href={"#"} aria-label='linkedin' className='w-8 h-8 rounded-full flex justify-center items-center border border-[#807E7D] text-gray-1-foreground hover:bg-primary hover:text-white transition-all duration-500 '><Linkedin className='size-4' /></Link></li>
                                <li><Link href={"#"} aria-label='instagram' className='w-8 h-8 rounded-full flex justify-center items-center border border-[#807E7D] text-gray-1-foreground hover:bg-primary hover:text-white transition-all duration-500 '><Instagram className='size-4' /></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <BlogSIdebar />
            </div>
        </div>
    )
}

export default BlogArtical