import React, { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface PropsType {
    children: ReactNode
    className?: string
    href?: string
}

interface MetaProps {
    date: string
    category: string
    author: {
        name?: string
        href?: string
    }
}

const BlogCard = ({ children, className }: PropsType) => {
    return (
        <div className={cn('border border-[#EAEEF0] rounded-2xl bg-background sm:p-6 p-4 h-full flex flex-col', className)}>
            {children}
        </div>
    )
}

BlogCard.Img = function Img({ children, className }: PropsType) {
    return (
        <div className={cn('rounded-xl pb-6', className)}>
            {children}
        </div>
    )
}

BlogCard.Meta = function Meta({ date, category, author }: MetaProps) {
    // Метаданные скрыты по требованию: дата и автор
    return null
}

BlogCard.Title = function Title({ children, href, className }: PropsType) {
    return (
        <h3 className={cn('text-secondary-foreground lg:leading-[150%] lg:text-2xl md:text-xl text-lg font-medium tracking-[-1px] mt-3 mb-2 line-clamp-2', className)}>
            <Link href={href || '#'} className='multiline-hover'>
                {children}
            </Link>
        </h3>
    )
}

BlogCard.Description = function Description({ children, className }: PropsType) {
    return (
        <p className={cn('text-gray-1-foreground opacity-70 text-base leading-[170%] tracking-[-0.3px] line-clamp-2 mt-1', className)}>
            {children}
        </p>
    )
}

export default BlogCard
