'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUp } from '@/lib/icon'
import Link from 'next/link'
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import { Autoplay, Pagination } from 'swiper/modules'
import { HeroDataType } from '@/db/heroData'


const Hero = ({ data }: { data: HeroDataType[] }) => {
    return (
        <section>
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
            >
                {
                    data.map(({ description, id, thumbnail, title }) => {
                        return (
                            <SwiperSlide key={id} style={{ backgroundImage: `url(${thumbnail})` }} className={`hero-slide bg-gradient-to-l from-[rgba(0,0,0,0.3)_0%] via-[rgba(0,0,0,0.1)_50%] to-[rgba(0,0,0,0.4)_100%]`}>
                                {({ isActive }) => (
                                    <div className='container lg:pt-[190px] sm:pt-[140px] pt-30 xl:pb-[193px] lg:pb-[170px] pb-[150px]'>
                                        <motion.h1
                                            initial={{ y: 90, opacity: 0 }}
                                            animate={isActive ? { y: 0, opacity: 1 } : { y: 90, opacity: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: isActive ? 0.5 : 0,
                                            }}
                                            className='text-[clamp(1.75rem,1.1rem+3.2vw,4.5rem)] leading-[115%] max-w-[810px] text-white font-light mb-2.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                                        >
                                            {title}
                                        </motion.h1>
                                        <motion.p
                                            initial={{ y: 90, opacity: 0 }}
                                            animate={isActive ? { y: 0, opacity: 1 } : { y: 90, opacity: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: isActive ? 0.7 : 0,
                                            }}
                                            className='max-w-[570px] text-[18px] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                                        >
                                            {description}
                                        </motion.p>
                                        <motion.div
                                            initial={{ y: 90, opacity: 0 }}
                                            animate={isActive ? { y: 0, opacity: 1 } : { y: 90, opacity: 0 }}
                                            transition={{
                                                duration: 0.7,
                                                delay: isActive ? 0.9 : 0,
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
                                )}

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