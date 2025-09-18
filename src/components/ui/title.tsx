import React from 'react'
import { cn } from '@/lib/utils'

type TitleProps = {
    className?: string;
    children: React.ReactNode;
}
const Title = ({ className, children }: TitleProps) => {
    return (
        <h2 className={cn('text-secondary-foreground leading-[125%] font-light text-[clamp(1.5rem,1.2692rem+1.0256vw,2.5rem)]', className)} style={{ fontSize: 'clamp(24px, 2.5vw, 40px)', lineHeight: '1.25' }}>{children}</h2>
    )
}

export default Title