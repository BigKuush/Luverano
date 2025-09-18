import React from 'react'
import { Metadata } from 'next'
import PageHeader from '@/components/sections/pageHeader'
import Newsletter from '@/components/sections/newsletter'
import InstagramGallery from '@/components/sections/instagramGallery'
import { getPrivacyPolicyData } from '@/lib/data'
import { PrivacyPolicType } from '@/db/privacyPolicyData'

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Read our privacy policy."
}

const PrivacyPolicy = async () => {
    const privacyPolicyData: PrivacyPolicType[] = await getPrivacyPolicyData();
    return (
        <main>
            <PageHeader pageTitle='Privacy Policy' currentPage='Privacy Policy' />
            <section className='container lg:py-25 py-15'>
                <h5 className='mb-5'>Политика конфиденциальности Luverano</h5>
                <p className='lg:text-xl text-lg font-medium leading-[170%] text-gray-1-foreground'>Спасибо за посещение Luverano. Мы стремимся защищать вашу конфиденциальность и обеспечивать безопасную и ответственную обработку вашей личной информации. Данная Политика конфиденциальности описывает, как мы собираем, используем и защищаем вашу информацию при посещении нашего веб-сайта и взаимодействии с нашими услугами.</p>
                <ol className='mt-10 list-decimal list-inside grid gap-5'>
                    {
                        privacyPolicyData.map(({ description, title, details }) => {
                            return (
                                <li key={title} className='text-gray-1-foreground lg:text-xl text-lg'>
                                    <span className='text-[#333232] font-medium text-xl'>{title}</span>
                                    <p className='text-lg'>{description}</p>
                                    {
                                        details.length ?

                                            <div className='mt-4'>
                                                {
                                                    details.map(({ content, label }) => {
                                                        return (
                                                            <p key={label}>
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
                <p className='mt-5 font-medium text-xl text-[#333232]'>Используя наш веб-сайт и услуги, вы соглашаетесь с условиями данной Политики конфиденциальности. Спасибо за доверие к Luverano в отношении вашей личной информации.</p>
            </section>
            <Newsletter />
            <InstagramGallery />
        </main>
    )
}

export default PrivacyPolicy