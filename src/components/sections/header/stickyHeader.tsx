"use client"
import React, { ReactNode, useEffect, useRef, useState } from 'react'

interface StickyHeaderProps {
    children: ReactNode; // This will be the main header content
    topHeaderContent: ReactNode; // This will be the TopHeader component
    top?: string;
}

const StickyHeader = ({ children, topHeaderContent, top = '0px' }: StickyHeaderProps) => {
    const headerRef = useRef<HTMLElement>(null);
    const topHeaderRef = useRef<HTMLDivElement>(null);
    const mainHeaderRef = useRef<HTMLDivElement>(null);

    const [isPinned, setIsPinned] = useState(false);
    const [headerStyleTop, setHeaderStyleTop] = useState(top);

    useEffect(() => {
        let prevScrollpos = window.scrollY;

        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const header = headerRef.current;
            const topHeader = topHeaderRef.current;
            const mainHeader = mainHeaderRef.current;

            if (!header || !mainHeader) return;

            const topHeaderHeight = topHeader ? topHeader.clientHeight : 0;
            const mainHeaderHeight = mainHeader.clientHeight;
            const totalHeaderHeight = topHeaderHeight + mainHeaderHeight;

            if (prevScrollpos > currentScrollPos && currentScrollPos > topHeaderHeight) {
                // скролл вверх — показываем только нижнюю часть (без адреса)
                setIsPinned(true);
                setHeaderStyleTop(`-${topHeaderHeight}px`);
            } else {
                // скролл вниз — полностью уводим шапку
                setIsPinned(false);
                setHeaderStyleTop(`-${totalHeaderHeight}px`);
            }
            prevScrollpos = currentScrollPos;
        };

        // Инициализация на маунте
        const header = headerRef.current;
        const topHeader = topHeaderRef.current;
        const mainHeader = mainHeaderRef.current;
        if (header && mainHeader) {
            const topHeaderHeight = topHeader ? topHeader.clientHeight : 0;
            if (window.scrollY > topHeaderHeight) {
                setIsPinned(true);
                setHeaderStyleTop(`-${topHeaderHeight}px`);
            } else {
                setIsPinned(false);
                setHeaderStyleTop('0px');
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [top]);

    return (
        <header
            id='header'
            ref={headerRef}
            className={`sticky z-50 top-0 ${isPinned ? 'header-pinned' : ''}`}
            style={{ top: headerStyleTop }}
        >
            <div id='top-header' ref={topHeaderRef}>
                {topHeaderContent}
            </div>
            <div ref={mainHeaderRef} className='bg-home-bg-1 [.header-pinned_&]:shadow-md'>
                {children}
            </div>
        </header>
    )
}

export default StickyHeader