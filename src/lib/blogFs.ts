"use server"
import fs from 'fs/promises'
import path from 'path'
import type { BlogType } from '@/types/blogType'

type BlogPost = BlogType & {
    contentHtml?: string
    images?: string[]
    seoTitle?: string
    seoDescription?: string
}

const BLOG_ROOT = path.join(process.cwd(), 'public', 'blog')

async function dirExists(p: string): Promise<boolean> {
    try { await fs.access(p); return true } catch { return false }
}

export async function getAllBlogMetaFromFS(): Promise<BlogType[]> {
    if (!(await dirExists(BLOG_ROOT))) return []
    const entries = await fs.readdir(BLOG_ROOT, { withFileTypes: true })
    const dirs = entries.filter(e => e.isDirectory()).map(e => e.name)

    const metas: BlogType[] = []
    for (const id of dirs) {
        const metaPath = path.join(BLOG_ROOT, id, 'meta.json')
        try {
            const raw = await fs.readFile(metaPath, 'utf8')
            const meta = JSON.parse(raw) as Partial<BlogPost>
            // autodetect thumbnail if not provided
            let thumbnail = meta.thumbnail
            if (!thumbnail) {
                const imagesDir = path.join(BLOG_ROOT, id, 'images')
                if (await dirExists(imagesDir)) {
                    const imgs = (await fs.readdir(imagesDir)).filter(f => /(png|jpe?g|webp|avif)$/i.test(f)).sort()
                    if (imgs[0]) thumbnail = `/blog/${id}/images/${imgs[0]}`
                }
            }
            metas.push({
                id,
                title: meta.title || `Статья ${id}`,
                thumbnail: thumbnail || `/blog/${id}/cover.jpg`,
                date: meta.date || '',
                category: meta.category || '',
                description: meta.description || ''
            })
        } catch {
            // skip invalid folder
        }
    }
    // sort by date desc if possible
    metas.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    return metas
}

export async function getBlogPostFromFS(id: string): Promise<BlogPost | null> {
    const postDir = path.join(BLOG_ROOT, id)
    if (!(await dirExists(postDir))) return null
    try {
        const metaPath = path.join(postDir, 'meta.json')
        const raw = await fs.readFile(metaPath, 'utf8')
        const meta = JSON.parse(raw) as Partial<BlogPost>

        const imagesDir = path.join(postDir, 'images')
        let images: string[] = []
        if (await dirExists(imagesDir)) {
            const imgs = (await fs.readdir(imagesDir)).filter(f => /(png|jpe?g|webp|avif)$/i.test(f)).sort()
            images = imgs.map(f => `/blog/${id}/images/${f}`)
        }

        let thumbnail = meta.thumbnail
        if (!thumbnail && images[0]) thumbnail = images[0]

        // content: index.html (приоритет) или index.md как сырой HTML-пре
        let contentHtml = ''
        const htmlPath = path.join(postDir, 'index.html')
        if (await dirExists(htmlPath)) contentHtml = await fs.readFile(htmlPath, 'utf8')
        else {
            const mdPath = path.join(postDir, 'index.md')
            if (await dirExists(mdPath)) {
                // Простейшая конверсия markdown -> html (пара абзацев и заголовки)
                const md = await fs.readFile(mdPath, 'utf8')
                contentHtml = md
                    .replace(/^#\s(.+)$/gm, '<h1>$1</h1>')
                    .replace(/^##\s(.+)$/gm, '<h2>$1</h2>')
                    .replace(/^###\s(.+)$/gm, '<h3>$1</h3>')
                    .replace(/^\*\s(.+)$/gm, '<li>$1</li>')
                    .replace(/\n\n/g, '<br/>')
            }
        }

        const post: BlogPost = {
            id,
            title: meta.title || `Статья ${id}`,
            thumbnail: thumbnail || `/blog/${id}/cover.jpg`,
            date: meta.date || '',
            category: meta.category || '',
            description: meta.description || '',
            images,
            contentHtml,
            seoTitle: meta.seoTitle,
            seoDescription: meta.seoDescription,
            author: meta.author
        }
        return post
    } catch {
        return null
    }
}

export type { BlogPost }


