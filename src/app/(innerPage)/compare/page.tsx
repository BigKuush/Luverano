import React from 'react'
import PageHeader from '@/components/sections/pageHeader'
import Newsletter from '@/components/sections/newsletter'
import InstagramGallery from '@/components/sections/instagramGallery'
import CompareTable from './compareTable'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Compare Products",
    description: "Compare products side-by-side."
}

const Compare = () => {
  return (
    <main>
      <PageHeader 
          currentPage='Сравнение' 
          pageTitle='Сравнение товаров' 
          breadcrumbLink='shop-3' 
          breadcrumbLabel='Каталог'
          bgImageUrl='/images/kits/montoro/1.jpg'
      />
      <CompareTable />
      <Newsletter />
      <InstagramGallery />
    </main>
  )
}

export default Compare