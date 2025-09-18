import React from 'react'
import { Metadata } from 'next'
import AdsSlider from '@/components/sections/adsSlider'
import BlogSlider from '@/components/sections/blogs/blogSlider'
import FeaturedProducts from '@/components/sections/featuredProducts'
import InstagramGallery from '@/components/sections/instagramGallery'
import HomeCategory from '@/components/sections/homeCategory'
import Newsletter from '@/components/sections/newsletter'
import TestimonialSlider from '@/components/sections/testimonialSlider'
import Hero from '@/components/sections/hero'
import AboutTwo from '@/components/sections/aboutTwo'
import { getAdsData, getBlogData, getCategoriesData, getHeroData, getProductsData, getTestimonialsData } from '@/lib/data'

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
  const categoriesData = await getCategoriesData();
  const blogData = await getBlogData();
  const testimonialData = await getTestimonialsData();
  const ads = await getAdsData()
 // const { topCollections } = await getProductsData();
  const heroData = await getHeroData()

  return (
    <>
      <Hero data={heroData} />
      {/* <HomeCategory categories={categoriesData} /> */}
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
      {/* <TopCollections data={topCollections} /> */}
      {/* <AdsSlider data={ads} /> */}
      <BlogSlider blogs={blogData} />
      {/** <TestimonialSlider testimonials={testimonialData} /> **/}
      <Newsletter />
      {/* <InstagramGallery /> */}
    </>
  )
}

export default Home