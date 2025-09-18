import InstagramGallery from '@/components/sections/instagramGallery'
import Newsletter from '@/components/sections/newsletter'
import PageHeader from '@/components/sections/pageHeader'
import React from 'react'
import { Metadata } from 'next'
import { getTermsAndConditionsData } from '@/lib/data'
import { TermsAndConditionsType } from '@/db/termsAndConditionsData'

export const metadata: Metadata = {
    title: "Terms & Conditions",
    description: "Read our terms and conditions."
}

const TermsConditions = async () => {
    const termsAndConditionsData: TermsAndConditionsType[] = await getTermsAndConditionsData();
    return (
        <main>
            <PageHeader pageTitle='Terms & Conditions' currentPage='Terms & Conditions' />
            <section className='container lg:py-25 py-15'>
                <h5 className='mb-5'>Условия использования Luverano</h5>
                <p className='lg:text-xl text-lg font-medium leading-[170%] text-gray-1-foreground'>Спасибо за посещение Luverano. Данные Условия использования ("Условия") регулируют использование вами нашего веб-сайта и услуг. Получая доступ к нашему веб-сайту или используя его, вы соглашаетесь соблюдать и быть связанными данными Условиями. Пожалуйста, внимательно прочитайте их.</p>
                <ol className='mt-10 list-decimal list-inside grid gap-5'>
                    {
                        termsAndConditionsData.map(({ description, title, details }, index) => {
                            return (
                                <li key={index} className='text-gray-1-foreground lg:text-xl text-lg'>
                                    <span className='text-[#333232] font-medium text-xl'>{title}</span>
                                    <p className='text-lg'>{description}</p>
                                    {
                                        details.length ?

                                            <div className='mt-4'>
                                                {
                                                    details.map(({ content, label }, index) => {
                                                        return (
                                                            <p key={index}>
                                                                <span className='font-medium'>{label}</span>
                                                                {" "}{content}
                                                            </p>
                                                        )
                                                    })
                                                }
                                            </div>
                                            : null
                                    }
                                </li>
                            )
                        })
                    }
                </ol>
            </section>
            <Newsletter />
            <InstagramGallery />
        </main>
    )
}

export default TermsConditions