import { MetadataRoute } from 'next'
import { products } from '@/db/products'
import { blogData } from '@/db/blogData'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://luverano.ru'
  
  // Используем локальные данные напрямую для статической генерации
  const { featuredProducts, topCollections } = products
  const merged = [...(topCollections||[]), ...(featuredProducts||[])]

  // Статические страницы
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/shop-3`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // Страницы товаров
  const productPages = merged.map((product: any) => ({
    url: `${baseUrl}/product/${String(product.title).toLowerCase().replace(/\s+/g,'-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Страницы блога
  const blogPages = blogData.map((blog: any) => ({
    url: `${baseUrl}/blog/${blog.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Категории товаров
  const categoryPages = [
    'komplekty',
    'kresla', 
    'stoly',
    'stulya'
  ].map((category) => ({
    url: `${baseUrl}/shop-3?category=${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...productPages, ...blogPages, ...categoryPages]
}
