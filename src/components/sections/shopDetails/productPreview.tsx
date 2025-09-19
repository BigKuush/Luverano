'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import type { Swiper as TypeSwiper } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import { ChevronLeft, ChevronRight, Expand } from '@/lib/icon';

const defaultImageList = [
    "/images/product-details/img-1.webp",
    "/images/product-details/img-2.webp",
    "/images/product-details/img-3.webp",
    "/images/product-details/img-4.webp",
    "/images/product-details/img-5.webp",
]

const ProductPreview = ({ images, productTitle, videoUrl }: { images?: string[], productTitle?: string, videoUrl?: string }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<TypeSwiper | null>(null);
    const [mainSwiper, setMainSwiper] = useState<TypeSwiper | null>(null);
    const addVersion = (src: string) => src.includes('?') ? src : `${src}?v=1`;
    const imgeList = (images && images.length > 0 ? images : defaultImageList).map(addVersion);
    // Build VK embed src if provided
    let vkEmbedSrc: string | null = null;
    if (videoUrl) {
        const match = videoUrl.match(/video(-?\d+)_(\d+)/);
        if (match) {
            const ownerId = match[1];
            const id = match[2];
            // Автовоспроизведение и выключенный звук при переходе на слайд видео
            vkEmbedSrc = `https://vk.com/video_ext.php?oid=${ownerId}&id=${id}&hd=2&autoplay=1&mute=1&muted=1`;
        }
    }

    return (
        <div>
            <div>
                <PhotoProvider maskOpacity={0.8} photoClassName='bg-transparent'>
                    <Swiper
                        onSwiper={setMainSwiper}
                        // className='relative'
                        navigation={{
                            nextEl: ".next-arrow",
                            prevEl: ".prev-arrow"
                        }}
                        loop
                        autoHeight
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                    >
                        {
                            imgeList.map((img, index) => {
                                return (
                                    <SwiperSlide key={index} className='relative'>
                                        <Image 
                                            width={580} 
                                            height={560} 
                                            style={{ width: "100%", height:"auto" }} 
                                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw' 
                                            src={img} 
                                            className='object-contain' 
                                            alt={`${productTitle || 'Товар'} — фото ${index+1}`}
                                            priority={index === 0}
                                            loading={index === 0 ? 'eager' : 'lazy'}
                                            placeholder="blur"
                                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                        />
                                        <PhotoView src={img}>
                                            <div className='text-gray-1-foreground absolute top-5 right-5 cursor-pointer'><Expand /></div>
                                        </PhotoView>
                                    </SwiperSlide>
                                )
                            })
                        }
                        {vkEmbedSrc ? (
                            <SwiperSlide className='relative'>
                                <div className='relative w-full' style={{ paddingTop: '56.25%' }}>
                                    <iframe
                                        src={vkEmbedSrc}
                                        className='absolute inset-0 w-full h-full'
                                        frameBorder={0}
                                        allow="autoplay; fullscreen"
                                        allowFullScreen
                                    />
                                </div>
                            </SwiperSlide>
                        ) : null}
                        <div className='z-20 absolute top-1/2 -translate-y-1/2 w-full flex justify-between'>
                            <div className='prev-arrow text-[#807E7D] cursor-pointer'><ChevronLeft className='size-10' strokeWidth='1.5' /></div>
                            <div className='next-arrow text-[#807E7D] cursor-pointer'><ChevronRight className='size-10' strokeWidth='1.5' /></div>
                        </div>
                    </Swiper>
                </PhotoProvider>
            </div>
            <div className='mt-2 flex gap-3 items-center'>
                <Swiper
                    slidesPerView={5}
                    spaceBetween={14}
                    freeMode={false}
                    modules={[FreeMode, Navigation]}
                >
                {
                    // Превью: сначала видео (если есть), затем фото по порядку
                    (vkEmbedSrc ? ['__VIDEO__', ...imgeList] : imgeList).map((img, index) => {
                        if (vkEmbedSrc && img === '__VIDEO__') {
                            const cover = imgeList[0] || '/images/product-details/img-1.webp';
                            return (
                                <SwiperSlide key={'video-thumb'}>
                                    <div
                                      className='relative rounded overflow-hidden cursor-pointer'
                                      style={{ width: 130 }}
                                      onClick={() => mainSwiper?.slideTo(imgeList.length)}
                                    >
                                        <Image 
                                            width={130}
                                            height={96}
                                            src={cover}
                                            style={{ width: '100%', height: 'auto' }}
                                            sizes='(max-width: 768px) 25vw, 15vw'
                                            alt={`${productTitle || 'Товар'} — превью видео`}
                                            className='object-cover w-full h-[96px] rounded'
                                            loading="lazy"
                                            placeholder="blur"
                                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                        />
                                        <div className='absolute inset-0 flex items-center justify-center'>
                                            <span className='w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow'>
                                                <svg className='w-4 h-4 text-gray-800 ml-[1px]' fill='currentColor' viewBox='0 0 24 24'>
                                                    <path d='M8 5v14l11-7z'/>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        }
                        const isCalma = (productTitle || '').toLowerCase() === 'calma';
                        return (
                            <SwiperSlide key={index}>
                                <div
                                  className='rounded overflow-hidden cursor-pointer'
                                  style={{ width: 130 }}
                                  onClick={() => mainSwiper?.slideTo(index)}
                                >
                                    {isCalma ? (
                                        <Image
                                            width={130}
                                            height={96}
                                            src={img}
                                            sizes='(max-width: 768px) 25vw, 15vw'
                                            alt={`${productTitle || 'Товар'} — превью ${index+1}`}
                                            className='object-contain w-full h-[96px]'
                                            loading="lazy"
                                            placeholder="blur"
                                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                        />
                                    ) : (
                                        <Image 
                                            width={130} 
                                            height={96}
                                            src={img}
                                            style={{ width: '100%', height: 'auto' }}
                                            sizes='(max-width: 768px) 25vw, 15vw'
                                            alt={`${productTitle || 'Товар'} — превью ${index+1}`}
                                            className='object-cover w-full h-[96px] rounded'
                                            loading="lazy"
                                            placeholder="blur"
                                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                        />
                                    )}
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
                </Swiper>
            </div>
        </div>
    )
}

export default ProductPreview