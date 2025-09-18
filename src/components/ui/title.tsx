import React from 'react'
import { cn } from '@/lib/utils'

type TitleProps = {
    className?: string;
    children: React.ReactNode;
}
const Title = ({ className, children }: TitleProps) => {
    return (
        <h2 className={cn('text-secondary-foreground leading-[125%] font-light text-[clamp(1.25rem,1.1rem+0.8vw,2rem)]', className)} style={{ fontSize: 'clamp(20px, 2vw, 32px)', lineHeight: '1.25' }}>{children}</h2>
    )
}

export default Title