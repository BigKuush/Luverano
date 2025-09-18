'use client'
import React, { useEffect, useState, useRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Close, Search } from '@/lib/icon';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { ProductType } from '@/types/productType';
import { cn } from '@/lib/utils';

const SearchPopup = ({data}:{data:ProductType[]}) => {
    const [searchInput, setSearchInput] = useState('');
    const [searchProducts, setSearchProducts] = useState<ProductType[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const [isInteractingWithSelect, setIsInteractingWithSelect] = useState(false);

    useEffect(() => {
        if (searchInput.trim() !== '') {
            const filteredProducts = data.filter(({ title }) =>
                title.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
            );
            setSearchProducts(filteredProducts);
        } else {
            setSearchProducts([]);
        }
    }, [searchInput]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                if (!isInteractingWithSelect) {
                    setIsOpen(false);
                }
            }
        };

        const handleScroll = () => {
            setIsOpen(false);
            setSearchProducts([]);
            setSearchInput('')
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isOpen, isInteractingWithSelect, searchInput, searchInput]);

    return (
        <>
            <button aria-label='search-icon' onClick={() => setIsOpen(!isOpen)} className={cn('text-gray-1-foreground -rotate-90 cursor-pointer')}>
                <Search />
            </button>
            {isOpen && (
                <div ref={popupRef} className='absolute lg:top-25 top-16 left-0  w-full bg-background [&_.close-orginal]:hidden pt-5 pb-10 px-5 shadow-lg rounded-b-md'>
                    <button aria-label='close-btn' onClick={() => setIsOpen(false)} className='absolute right-0 top-0 w-8 h-8 rounded-full bg-background flex justify-center items-center text-gray-2-foreground hover:text-secondary-foreground transition-all duration-500'>
                        <Close className='w-5 h-5' />
                    </button>
                    <p className=' text-secondary-foreground font-semibold mb-2'>Поиск товаров</p>
                    <form action="" className='flex items-center border border-primary relative rounded-md'>
                        <div className='relative'
                            onPointerDown={() => setIsInteractingWithSelect(true)}
                            onPointerUp={() => setIsInteractingWithSelect(false)}
                        >
                            <Select>
                                <SelectTrigger className="sm:min-w-[180px] w-25 rounded-none border-none text-secondary-foreground text-base capitalize after:absolute after:right-0 after:h-[120%] after:w-px after:bg-primary">
                                    <SelectValue placeholder="Категория" />
                                </SelectTrigger>
                                <SelectContent className='bg-background rounded-none'>
                                    <SelectItem value="komplekty" className='capitalize text-base focus:bg-gray-200'>Комплекты</SelectItem>
                                    <SelectItem value="kresla" className='capitalize text-base focus:bg-gray-200'>Кресла</SelectItem>
                                    <SelectItem value="stoly" className='capitalize text-base focus:bg-gray-200'>Столы</SelectItem>
                                    <SelectItem value="stulya" className='capitalize text-base focus:bg-gray-200'>Скамьи/Стулья</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Input onChange={(e) => setSearchInput(e.target.value)} placeholder='Поиск товаров' className='rounded-none focus-visible:ring-0 border-none' />
                        <div className='bg-primary text-white flex items-center justify-center p-3 cursor-pointer rounded-tr-md rounded-br-md'>
                            <span className='-rotate-90'>
                                <Search />
                            </span>
                        </div>
                    </form>
                    <div className='max-h-[300px] overflow-y-auto'>
                        {
                            searchProducts.map(({ id, title }) => (
                                <div key={id} className='py-2'>
                                    <Link href={"#"} className='text-secondary-foreground capitalize hover:text-primary-foreground transition-all duration-500'>{title}</Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
        </>
    );
};

export default SearchPopup;
