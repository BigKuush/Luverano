import React from 'react'
import PageHeader from '@/components/sections/pageHeader'
import Newsletter from '@/components/sections/newsletter'
// import InstagramGallery from '@/components/sections/instagramGallery'
import BlogArtical from './blogArtical'
import RelatedBlogs from './RelatedBlogs'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Блог Luverano — статья",
    description: "Полезные советы по мебели и дизайну для загородной жизни.",
    openGraph: {
        title: "Блог Luverano — статья",
        description: "Полезные советы по мебели и дизайну для загородной жизни.",
        type: 'article'
    }
}

const BlogSingle = () => {
    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Как выбрать идеальную мебель для дома и террасы',
        author: {
            '@type': 'Person',
            name: 'Редакция Luverano'
        },
        datePublished: '2025-05-24',
        image: ['https://luverano.ru/images/blog/blog-single-1.webp'],
        publisher: {
            '@type': 'Organization',
            name: 'Luverano'
        }
    }
    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <PageHeader
                pageTitle='Блог'
                currentPage='Статья'
                breadcrumbLabel='Блог'
                breadcrumbLink='blog-1'
            />
            <BlogArtical />
            <RelatedBlogs />
            <Newsletter />
            {/* <InstagramGallery /> */}
        </main>
    )
}

export default BlogSingle