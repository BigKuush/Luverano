'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUp } from '@/lib/icon'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import { Autoplay, Pagination } from 'swiper/modules'
import { HeroDataType } from '@/db/heroData'


const Hero = ({ data }: { data: HeroDataType[] }) => {
    return (
        <section className="h-[100vh] min-h-[600px] max-h-[800px]">
            <Swiper
                grabCursor
                loop
                // autoplay={{
                //     delay: 5000,
                //     disableOnInteraction: false,
                // }}
                speed={1000}
                pagination={{
                    el: '.hero-pagination',
                    clickable: true,
                    bulletClass: 'hero-pagination-bullet',
                    bulletActiveClass: 'hero-pagination-bullet-active',
                }}
                modules={[Autoplay, Pagination]}
                className="h-full"
            >
                {
                    data.map(({ description, id, thumbnail, title }, index) => {
                        return (
                            <SwiperSlide key={id} className="relative overflow-hidden">
                                <Image
                                    src={thumbnail}
                                    alt={title}
                                    fill
                                    priority={index === 0}
                                    className="object-cover"
                                    sizes="100vw"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-l from-[rgba(0,0,0,0.3)_0%] via-[rgba(0,0,0,0.1)_50%] to-[rgba(0,0,0,0.4)_100%]`} />
                                <div className='relative z-10 container lg:pt-[190px] sm:pt-[140px] pt-20 xl:pb-[193px] lg:pb-[170px] pb-[80px]'>
                                        <motion.h1
                                            initial={{ y: 90, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: 0.5,
                                            }}
                                            className='text-[clamp(1.75rem,1.1rem+3.2vw,4.5rem)] leading-[115%] max-w-[810px] text-white font-light mb-2.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                                        >
                                            {title}
                                        </motion.h1>
                                        <motion.p
                                            initial={{ y: 90, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: 0.7,
                                            }}
                                            className='max-w-[570px] text-[18px] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                                        >
                                            {description}
                                        </motion.p>
                                        <motion.div
                                            initial={{ y: 90, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                duration: 0.7,
                                                delay: 0.9,
                                            }}
                                        >
                                            <Button
                                                asChild
                                                size={"medium"}
                                                className="mt-10 max-w-[188px] lg:leading-[170%] leading-[170%] group"
                                            >
                                                <Link href={"/shop-3"}>
                                                    В каталог{" "}
                                                    <ArrowUp className="group-hover:rotate-45 transition-transform duration-500" />{" "}
                                                </Link>
                                            </Button>
                                        </motion.div>
                                    </div>
                            </SwiperSlide>
                        )
                    })
                }
                <div className='hero-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-x-2.5'></div>
            </Swiper>

        </section>
    )
}

export default Hero