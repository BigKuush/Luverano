import React from 'react'
import PageHeader from '@/components/sections/pageHeader'
import RegisterForm from './registerForm'
import Newsletter from '@/components/sections/newsletter'
import InstagramGallery from '@/components/sections/instagramGallery'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Регистрация | Luverano",
    description: "Создание аккаунта в Luverano."
}

const Register = () => {
    return (
        <main>
            <PageHeader pageTitle='Регистрация' currentPage='Регистрация' />
            <RegisterForm />
            <Newsletter />
            <InstagramGallery />
        </main>
    )
}

export default Register