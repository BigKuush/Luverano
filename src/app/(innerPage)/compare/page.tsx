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
      <PageHeader currentPage='Compare' pageTitle='Compare' breadcrumbLink='shop-1' breadcrumbLabel='Shop' />
      <CompareTable />
      <Newsletter />
      <InstagramGallery />
    </main>
  )
}

export default Compare