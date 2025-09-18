import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import Rating from '@/components/ui/rating'
import ReviewAddForm from '../reviewAddForm'

type ProductDetailsTabViewProps = {
    className?: string,
    description?: string,
    additionalInfo?: string,
    showAdditional?: boolean,
    showFAQ?: boolean,
    showReview?: boolean,
    materials?: string,
    packageInfo?: string,
}

const ProductDetailsTabView = ({ className, description, additionalInfo, showAdditional = true, showFAQ = true, showReview = true, materials, packageInfo }: ProductDetailsTabViewProps) => {
    return (
        <div className='lg:mt-25 mt-15'>
            <Tabs defaultValue="description">
                <TabsList className={cn('flex flex-wrap justify-start gap-y-5 md:gap-x-7.5 gap-x-6 border-b border-b-[#D9D9D9]', className)}>
                    <TabsTrigger value="description" className='data-[state=active]:text-secondary-foreground relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 data-[state=active]:after:bg-primary text-gray-3-foreground font-medium lg:text-xl lg:pb-5 pb-2'>Описание</TabsTrigger>
                    <TabsTrigger value="materials" className='normal-case data-[state=active]:text-secondary-foreground relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 data-[state=active]:after:bg-primary text-gray-3-foreground font-medium lg:text-xl lg:pb-5 pb-2'>Материалы и характеристики</TabsTrigger>
                    <TabsTrigger value="package" className='data-[state=active]:text-secondary-foreground relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 data-[state=active]:after:bg-primary text-gray-3-foreground font-medium lg:text-xl lg:pb-5 pb-2'>Комплектация</TabsTrigger>
                    {showAdditional && additionalInfo ? (
                        <TabsTrigger value="additional-information" className='data-[state=active]:text-secondary-foreground relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 data-[state=active]:after:bg-primary text-gray-3-foreground font-medium lg:text-xl lg:pb-5 pb-2'>Дополнительная информация</TabsTrigger>
                    ) : null}
                    {showFAQ ? (
                        <TabsTrigger value="faq" className='data-[state=active]:text-secondary-foreground relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 data-[state=active]:after:bg-primary text-gray-3-foreground font-medium lg:text-xl lg:pb-5 pb-2'>Вопросы и ответы</TabsTrigger>
                    ) : null}
                    {showReview ? (
                        <TabsTrigger value="review" className='data-[state=active]:text-secondary-foreground relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 data-[state=active]:after:bg-primary text-gray-3-foreground font-medium lg:text-xl lg:pb-5 pb-2'>Отзывы (1)</TabsTrigger>
                    ) : null}
                </TabsList>
                <TabsContent value='description' className='mt-7.5'>
                    {description ? (
                        <div className='text-gray-1-foreground whitespace-pre-line'>{description}</div>
                    ) : (
                        <p className='text-gray-3-foreground'>Описание пока не добавлено.</p>
                    )}
                </TabsContent>
                <TabsContent value='materials' className='mt-7.5'>
                    {materials ? (
                        <div className='text-gray-1-foreground whitespace-pre-line'>{materials}</div>
                    ) : (
                        <p className='text-gray-3-foreground'>Материалы и характеристики пока не добавлены.</p>
                    )}
                </TabsContent>
                <TabsContent value='package' className='mt-7.5'>
                    {packageInfo ? (
                        <div className='text-gray-1-foreground whitespace-pre-line'>{packageInfo}</div>
                    ) : (
                        <p className='text-gray-3-foreground'>Комплектация пока не добавлена.</p>
                    )}
                </TabsContent>
                {showAdditional && additionalInfo ? (
                    <TabsContent value='additional-information' className='mt-7.5'>
                        <div className='text-gray-1-foreground whitespace-pre-line'>{additionalInfo}</div>
                    </TabsContent>
                ) : null}
                {showFAQ ? (
                <TabsContent value='faq' className='mt-7.5'>
                    <div className='space-y-6'>
                        <h3 className='text-2xl font-semibold text-gray-900 mb-6'>Часто задаваемые вопросы</h3>
                        
                        <div className='space-y-4'>
                            <div className='border border-gray-200 rounded-lg'>
                                <details className='group'>
                                    <summary className='flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50'>
                                        <span className='font-medium text-gray-900'>Из какого материала изготовлено современное деревянное кресло?</span>
                                        <span className='text-gray-500 group-open:rotate-180 transition-transform'>▼</span>
                                    </summary>
                                    <div className='px-4 pb-4 text-gray-600'>
                                        Кресло изготовлено из натурального дерева высочайшего качества с применением современных технологий обработки. Мы используем только отборную древесину, которая проходит тщательную проверку на прочность и долговечность.
                                    </div>
                                </details>
                            </div>
                            
                            <div className='border border-gray-200 rounded-lg'>
                                <details className='group'>
                                    <summary className='flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50'>
                                        <span className='font-medium text-gray-900'>Подходит ли кресло для использования на улице?</span>
                                        <span className='text-gray-500 group-open:rotate-180 transition-transform'>▼</span>
                                    </summary>
                                    <div className='px-4 pb-4 text-gray-600'>
                                        Да, кресло специально разработано для использования в загородных условиях и устойчиво к погодным воздействиям. Оно покрыто специальным защитным составом, который предохраняет дерево от влаги и ультрафиолета.
                                    </div>
                                </details>
                            </div>
                            
                            <div className='border border-gray-200 rounded-lg'>
                                <details className='group'>
                                    <summary className='flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50'>
                                        <span className='font-medium text-gray-900'>В какие города доставляете мебель?</span>
                                        <span className='text-gray-500 group-open:rotate-180 transition-transform'>▼</span>
                                    </summary>
                                    <div className='px-4 pb-4 text-gray-600'>
                                        <p className='mb-2'>Доставляем по всей России:</p>
                                        <ul className='list-disc list-inside space-y-1 text-sm'>
                                            <li><strong>Москва и МО:</strong> 1-3 дня</li>
                                            <li><strong>Санкт-Петербург и ЛО:</strong> 2-4 дня</li>
                                            <li><strong>Краснодар и Краснодарский край:</strong> 3-5 дней</li>
                                            <li><strong>Екатеринбург и Свердловская область:</strong> 3-5 дней</li>
                                            <li><strong>Новосибирск и Новосибирская область:</strong> 4-6 дней</li>
                                            <li><strong>Грозный и Чеченская Республика:</strong> 5-7 дней</li>
                                            <li><strong>Махачкала и Республика Дагестан:</strong> 5-7 дней</li>
                                            <li><strong>Другие города России:</strong> 5-10 дней</li>
                                        </ul>
                                    </div>
                                </details>
                            </div>
                            
                            <div className='border border-gray-200 rounded-lg'>
                                <details className='group'>
                                    <summary className='flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50'>
                                        <span className='font-medium text-gray-900'>Какой срок доставки кресла?</span>
                                        <span className='text-gray-500 group-open:rotate-180 transition-transform'>▼</span>
                                    </summary>
                                    <div className='px-4 pb-4 text-gray-600'>
                                        Доставка кресла по Москве осуществляется в течение 1-3 рабочих дней. По Московской области - до 5 рабочих дней. В другие регионы России - от 3 до 10 дней в зависимости от удаленности. Возможна срочная доставка за дополнительную плату.
                                    </div>
                                </details>
                            </div>
                            
                            <div className='border border-gray-200 rounded-lg'>
                                <details className='group'>
                                    <summary className='flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50'>
                                        <span className='font-medium text-gray-900'>Есть ли гарантия на кресло?</span>
                                        <span className='text-gray-500 group-open:rotate-180 transition-transform'>▼</span>
                                    </summary>
                                    <div className='px-4 pb-4 text-gray-600'>
                                        Да, на кресло предоставляется гарантия 2 года от производителя Luverano. Гарантия покрывает производственные дефекты и проблемы с качеством материалов.
                                    </div>
                                </details>
                            </div>
                            
                            <div className='border border-gray-200 rounded-lg'>
                                <details className='group'>
                                    <summary className='flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50'>
                                        <span className='font-medium text-gray-900'>Как ухаживать за креслом?</span>
                                        <span className='text-gray-500 group-open:rotate-180 transition-transform'>▼</span>
                                    </summary>
                                    <div className='px-4 pb-4 text-gray-600'>
                                        Кресло не требует сложного ухода. Достаточно протирать его сухой тканью или слегка влажной тряпкой. Рекомендуется избегать прямых солнечных лучей и накрывать кресло в период длительного неиспользования.
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>
                </TabsContent>
                ) : null}
                {showReview ? (
                <TabsContent value='review' className='mt-7.5'>
                    <div className='flex flex-col gap-7.5'>
                        <div className='max-w-[900px]'>
                            <div className='flex items-center gap-2.5 mb-3'>
                                <Image width={60} height={60} sizes='100vw' src={"/images/product-details/author1.webp"} alt='img' className='rounded-full' />
                                <div>
                                    <Link href={"#"} className='lg:text-xl text-lg text-secondary-foreground font-medium inline-block mb-0.5'>Анна Петрова</Link>
                                    <Rating star={5} iconSize='lg:size-4 size-3' />
                                </div>
                            </div>
                            <p className='text-gray-1-foreground'>Отличное кресло! Очень удобное и качественное. Дизайн современный, хорошо вписывается в интерьер. Рекомендую всем, кто ищет качественную мебель для дома.</p>
                        </div>
                    </div>

                    <div className='mt-15'>
                        <p className='text-secondary-foreground font-medium lg:text-2xl text-xl mb-4'>Написать отзыв об этом товаре</p>
                        <ReviewAddForm />
                    </div>
                </TabsContent>
                ) : null}
            </Tabs>
        </div>
    )
}

export default ProductDetailsTabView