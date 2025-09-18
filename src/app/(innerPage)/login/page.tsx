import React from 'react'
import PageHeader from '@/components/sections/pageHeader'
import LoginForm from './loginForm'
import Newsletter from '@/components/sections/newsletter'
import InstagramGallery from '@/components/sections/instagramGallery'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Личный кабинет | Luverano",
    description: "Вход в личный кабинет Luverano."
}

const Login = () => {
    return (
        <main>
            <PageHeader pageTitle='Личный кабинет' currentPage='Вход' />
            <LoginForm />
            <Newsletter />
            <InstagramGallery />
        </main>
    )
}

export default Login