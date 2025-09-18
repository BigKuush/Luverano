import React from 'react'
import { Metadata } from 'next'
import BlogSlider from '@/components/sections/blogs/blogSlider'
import FeaturedProducts from '@/components/sections/featuredProducts'
import Newsletter from '@/components/sections/newsletter'
import Hero from '@/components/sections/hero'
import AboutTwo from '@/components/sections/aboutTwo'
import { getBlogData, getHeroData } from '@/lib/data'

export const metadata: Metadata = {
  title: "Luverano — Премиальная мебель для террасы и загородного дома",
  description: "Эксклюзивные комплекты уличной мебели с очагом и диванами. Доставка по Москве и области. Luverano — уют и стиль на вашей террасе.",
  openGraph: {
    title: "Luverano — Премиальная мебель для террасы и загородного дома",
    description: "Эксклюзивные комплекты уличной мебели с очагом и диванами. Доставка по Москве и области.",
    type: 'website'
  }
}

const Home = async () => {
  const blogData = await getBlogData();
  const heroData = await getHeroData()

  return (
    <>
      <Hero data={heroData} />
      <FeaturedProducts />
      <AboutTwo />
      <section className='container lg:pt-25 pt-15'>
        <div className='relative w-full'>
          <video
            src='/videos/luverano.mp4'
            className='w-full h-auto rounded-md'
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            controlsList='nodownload noplaybackrate noremoteplayback'
          />
        </div>
      </section>
      <BlogSlider blogs={blogData} />
      <Newsletter />
    </>
  )
}

export default Home