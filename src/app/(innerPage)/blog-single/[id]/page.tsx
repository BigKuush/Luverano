import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageHeader from '@/components/sections/pageHeader'
import Newsletter from '@/components/sections/newsletter'
import BlogArtical from '../blogArtical'
import RelatedBlogs from '../RelatedBlogs'
import { getBlogData } from '@/lib/data'
import Trends2025Article from '../trends2025Article'
import CarePremiumArticle from '../carePremiumArticle'
// Импортируем динамически, чтобы не тянуть fs в клиентский рантайм при билд-сплите

type Props = { params: Promise<{ id: string }> }

export const dynamicParams = true

export async function generateStaticParams() {
  const blogs = await getBlogData()
  return blogs.map(b => ({ id: String(b.id) }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const blogs = await getBlogData()
  const { getBlogPostFromFS } = await import('@/lib/blogFs')
  const fsPost = await getBlogPostFromFS(String(resolvedParams.id))
  const post = fsPost || blogs.find(b => String(b.id) === String(resolvedParams.id))
  if (!post) return {}

  if (String(post.id) === '2') {
    return {
      title: 'Тренды в оформлении загородных пространств 2025 — материалы, мебель, свет',
      description: 'Главные тренды 2025: натуральные материалы (тик, акация, rope/ротанг), модульная мебель и огненные столы, природная палитра и атмосферное LED‑освещение.',
      openGraph: {
        title: 'Тренды в оформлении загородных пространств 2025 — материалы, мебель, свет',
        description: 'Натуральные материалы, устойчивые к погоде решения, трансформируемая мебель и световые сценарии для уютных террас и садов.',
        type: 'article'
      }
    }
  }

  if (String(post.id) === '3') {
    return {
      title: 'Уход за премиальной садовой мебелью — дерево, металл, rope/ротанг',
      description: 'Инструкция по уходу: обработка тика и акации, защита металла, правила для текстиля, rope/ротанг и сезонный регламент обслуживания.',
      openGraph: {
        title: 'Уход за премиальной садовой мебелью — дерево, металл, rope/ротанг',
        description: 'Как сохранить премиальную мебель красивой и долговечной: материалы, сезонность, чехлы и профилактика.',
        type: 'article'
      }
    }
  }

  return {
    title: (fsPost?.seoTitle) || `${post.title} — Luverano` ,
    description: (fsPost?.seoDescription) || post.description,
    openGraph: {
      title: (fsPost?.seoTitle) || `${post.title} — Luverano`,
      description: (fsPost?.seoDescription) || post.description,
      type: 'article'
    }
  }
}

const BlogSingleById = async ({ params }: Props) => {
  const resolvedParams = await params
  const blogs = await getBlogData()
  const { getBlogPostFromFS } = await import('@/lib/blogFs')
  const fsPost = await getBlogPostFromFS(String(resolvedParams.id))
  const post = fsPost || blogs.find(b => String(b.id) === String(resolvedParams.id))
  if (!post) return notFound()

  return (
    <main>
      <PageHeader
        pageTitle='Блог'
        currentPage={post.title}
        breadcrumbLabel='Блог'
        breadcrumbLink='/blog'
        bgImageUrl='/images/kits/fortuna/1.jpg'
      />
      {fsPost ? (
        <article className='container lg:pt-25 pt-15'>
          {fsPost.thumbnail ? null : null}
          <div className='prose max-w-none' dangerouslySetInnerHTML={{ __html: fsPost.contentHtml || '' }} />
        </article>
      ) : (
        String(post.id) === '2' ? <Trends2025Article /> : String(post.id) === '3' ? <CarePremiumArticle /> : <BlogArtical />
      )}
      <RelatedBlogs />
      <Newsletter />
    </main>
  )
}

export default BlogSingleById


