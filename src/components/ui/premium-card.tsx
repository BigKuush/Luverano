'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, Heart } from '@/lib/icon'
import { formatPrice } from '@/lib/utils/price'
import { ProductType } from '@/types/productType'
import { cn } from '@/lib/utils'

interface PremiumCardProps {
    product: ProductType;
    className?: string;
}

export const PremiumCard = ({ product, className }: PremiumCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={cn(
                'group relative overflow-hidden bg-[#F5F2ED] rounded-lg transition-all duration-500',
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Изображение */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className={cn(
                        'object-cover transition-transform duration-700',
                        isHovered ? 'scale-110' : 'scale-100'
                    )}
                />
                
                {/* Кнопки действий */}
                <div className={cn(
                    'absolute bottom-4 left-0 right-0 flex justify-center gap-3 transition-all duration-500',
                    isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}>
                    <button
                        className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all"
                        aria-label="Добавить в избранное"
                    >
                        <Heart className="w-5 h-5" />
                    </button>
                    <button
                        className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all"
                        aria-label="Быстрый просмотр"
                    >
                        <Eye className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Информация о товаре */}
            <div className="p-4">
                {/* Категория */}
                <Link 
                    href={`/shop/${product.category?.toLowerCase()}`}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                    {product.category}
                </Link>

                {/* Название */}
                <Link href={`/product/${product.id}`}>
                    <h3 className="mt-2 text-lg font-medium text-gray-900 hover:text-gray-700 transition-colors">
                        {product.title}
                    </h3>
                </Link>

                {/* Материалы */}
                <div className="mt-2 flex gap-2">
                    {product.colors?.map((color, index) => (
                        <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: color.code }}
                            title={`Цвет ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Цена */}
                <div className="mt-3 flex items-center justify-between">
                    <div>
                        <span className="text-xl font-medium text-gray-900">
                            {formatPrice(product.price)}
                        </span>
                        {product.discountPercentage > 0 && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                                {formatPrice(product.price * (1 + product.discountPercentage/100))}
                            </span>
                        )}
                    </div>
                    
                    {/* Метка "Новинка" или другие метки */}
                    {product.label && (
                        <span className="px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded">
                            {product.label}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PremiumCard;
