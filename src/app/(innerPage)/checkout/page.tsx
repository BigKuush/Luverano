"use client"
import React from 'react'
import PageHeader from '@/components/sections/pageHeader'
import CheckoutForm from '@/app/(innerPage)/checkout/checkoutForm'
import CheckoutPayment from '@/app/(innerPage)/checkout/checkoutPayment'
import Newsletter from '@/components/sections/newsletter'
import InstagramGallery from '@/components/sections/instagramGallery'

const Checkout = () => {
  return (
    <main>
      <PageHeader currentPage='Оформление заказа' pageTitle='Оформление заказа' breadcrumbLink='/shop' breadcrumbLabel='Каталог' />
      <div className='container lg:pt-25 lg:pb-30 pt-15 pb-15'>
        <div className='grid lg:grid-cols-[auto_48.6%] grid-cols-1 gap-7.5'>
          <div>
            <CheckoutForm />
          </div>
          <CheckoutPayment />
        </div>
      </div>
      <Newsletter />
      <InstagramGallery />
    </main>
  )
}

export default Checkout