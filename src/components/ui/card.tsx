'use client'
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Eye, ShopCart } from "@/lib/icon";
import Tooltip from './tooltip'
import currencyFormatter from "currency-formatter";
import { ProductType } from '@/types/productType'
import { addToCart } from "@/lib/features/AddToCartSlice";
import { addToWishlist } from "@/lib/features/AddToWishlistSlice";
import { addToCompare } from "@/lib/features/CompareProductsSlice";
import { useAppDispatch } from '@/lib/reduxHooks'
import { ProductShortInfoPropsType } from '../sections/shopDetails/productShortInfo'
import ProductQuickView from '../sections/shopDetails/productQuickView'



interface CardPropsType {
  children?: ReactNode,
  className?: string,
}

type ContextType = {
  currentImage: string;
  setCurrentImage: Dispatch<SetStateAction<string>>
}

export const CardContext = createContext<ContextType | null>(null)

const Card = ({ children, className }: CardPropsType) => {
  const [currentImage, setCurrentImage] = useState("");

  return (
    <CardContext.Provider value={{ currentImage, setCurrentImage }}>
      <div onMouseLeave={() => setCurrentImage('')} className={cn('group', className)}>
        {children}
      </div>
    </CardContext.Provider>
  )
}

export default Card

export function CardFooter({ children, className }: CardPropsType) {
  return (
    <div className={cn('mt-5', className)}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: CardPropsType) {
  return (
    <div className={cn('bg-[#F2F2F2] border border-[#F2F2F2] rounded-[15px] drop-shadow-[(0px_4px_40px_rgba(0,0,0,0.08))] relative overflow-hidden', className)}>
      {children}
    </div>
  )
}

export function CardImg({ src, height, width, className, href, alt }: { src: string, height: number, width: number, className?: string, href?: string, alt?: string }) {
  const context = useContext(CardContext);
  const currentImage = context ? context.currentImage : '';

  return (
    <div className={cn('overflow-hidden rounded-xl', className)}>
      {href ? (
        <Link href={href} aria-label='product-image-link'>
          <Image
            src={currentImage || src}
            height={height}
            width={width}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            style={{ width: "100%", height: "auto", maxWidth: `${width}px` }}
            alt={alt || 'изображение товара'}
            className='mx-auto hover:scale-110 transition-all duration-700 rounded-xl'
          />
        </Link>
      ) : (
        <Image
          src={currentImage || src}
          height={height}
          width={width}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          style={{ width: "100%", height: "auto", maxWidth: `${width}px` }}
          alt={alt || 'изображение товара'}
          className='mx-auto hover:scale-110 transition-all duration-700 rounded-xl'
        />
      )}
    </div>
  )
}

// Enhanced CardIcons with built-in functionality
interface CardIconsProps extends CardPropsType {
  product?: ProductType;
}

export function CardIcons({ children, className, product }: CardIconsProps) {
  const dispatch = useAppDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] =
    useState<ProductShortInfoPropsType>({
      id: 0,
      thumbnail: "",
      price: 0,
      discountPercentage: 0,
      title: "",
      stock: 0,
    });

  const defaultActions = product && {
    handleQuickView: () => {
      if (product) {
        setIsDialogOpen(true)
        setQuickViewProduct({
          id: product.id,
          thumbnail: product.thumbnail,
          title: product.title,
          price: product.price,
          discountPercentage: product.discountPercentage,
          stock: product.stock
        });
      }
    },
    handleAddToCart: () => {
      if (product) {
        const finalPrice = product.discountPercentage ? product.price - (product.price * product.discountPercentage / 100) : product.price;
        dispatch(
          addToCart({
            id: product.id,
            price: finalPrice,
            quantity: 1,
            thumbnail: product.thumbnail,
            title: product.title,
            color: product.colors?.[0]?.code,
            size: 'xl'
          })
        );
      }
    }
  };

  // If children are provided, render them instead of default icons
  if (children) {
    return (
      <div className={cn('flex items-center justify-center gap-2.5 pt-2.5 transition-all duration-500', className)}>
        {children}
      </div>
    );
  }

  // Render default icons with functionality
  return (
    <div className={cn('absolute bottom-5 left-5 right-5 flex justify-center gap-2.5 transition-all duration-500', className)}>
      {/* Удалена иконка добавления в избранное */}

      {/* Quick view */}
      <Tooltip text={"Quick view"}>
        <button
          aria-label='Quick'
          onClick={defaultActions?.handleQuickView}
          className='w-7.5 h-7.5 bg-background flex justify-center items-center rounded-full opacity-0 group-hover:opacity-100 delay-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-300'
        >
          <span className='flex justify-center items-center w-full h-full rounded-full text-gray-1-foreground hover:bg-primary hover:text-white transition-all duration-300'>
            <Eye className='size-4' />
          </span>
        </button>
      </Tooltip>

      {/* Add to cart */}
      <Tooltip text={"Add to cart"}>
        <button
          aria-label='cart'
          onClick={defaultActions?.handleAddToCart}
          className='w-7.5 h-7.5 bg-background flex justify-center items-center rounded-full opacity-0 group-hover:opacity-100 delay-200 transform translate-y-full group-hover:translate-y-0 transition-all duration-300'
        >
          <span className='flex justify-center items-center w-full h-full rounded-full text-gray-1-foreground hover:bg-primary hover:text-white transition-all duration-300'>
            <ShopCart className='size-4' />
          </span>
        </button>
      </Tooltip>

      {/* Удалена иконка сравнения */}
      <ProductQuickView
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        product={quickViewProduct}
      />
    </div>
  );
}


export function CardLabel({ children, className, isLabel }: { children: ReactNode, className?: string, isLabel?: boolean | string, }) {
  return (
    <>
      {isLabel ? <div className={cn('bg-primary py-2 px-4 text-white text-lg leading-6 inline capitalize absolute top-5 left-0', className)}>{children}</div> : null}
    </>
  )
}

export function CardDiscount({ children, className, isDiscountTrue }: { children: ReactNode, className?: string, isDiscountTrue?: boolean | number, }) {
  return (
    <>
      {
        isDiscountTrue ?
          <div className={cn('bg-primary py-2 px-4 text-white text-lg leading-6 inline capitalize absolute top-5 left-0', className)}>{children}</div>
          : null
      }
    </>
  )
}

export function CardSoldOut({ children, className, isStockTrue }: { children: ReactNode, className?: string, isStockTrue?: boolean | number, }) {
  return (
    <>
      {
        isStockTrue === 0 || isStockTrue === null
          ? <div className={cn('bg-primary py-2 px-4 text-white text-lg leading-6 inline capitalize absolute top-5 left-0', className)}>{children}</div>
          : null
      }
    </>
  )
}

type ColorProps = {
  colors?: {
    code: string,
    image: string
  }[],
  className?: string
}

export function CardColors({ colors, className }: ColorProps) {
  const context = useContext(CardContext);

  if (!context) {
    return null;
  }

  const { setCurrentImage } = context

  return (
    <>
      {colors ?
        <div className={cn('flex gap-2.5 absolute bottom-5 left-5', className)}>
          {colors.map((color, index) =>
            <span
              key={index}
              className='w-5 h-5 rounded-full bg-primary block cursor-pointer hover:scale-110 transition-transform duration-200'
              style={{ backgroundColor: color.code }}
              onMouseEnter={() => setCurrentImage(color.image)}
            ></span>
          )}
        </div>
        : null
      }
    </>
  )
}

export function CardCategory({ path, children, className }: { children: ReactNode, className?: string, path?: string, }) {
  return (
    <Link href={path || '#'} className={cn('text-gray-3-foreground hover:text-primary-foreground transition-all duration-500', className)}>{children}</Link>
  )
}

export function CardTitle({ children, className, path }: { children: ReactNode, className?: string, path?: string, }) {
  return (
    <Link href={path || "#"} className={cn('line-clamp-1 text-base font-medium capitalize text-secondary-foreground hover:text-gray-1-foreground transition-all duration-500', className)} style={{ fontSize: '16px', lineHeight: '1.4' }}>
      {children}
    </Link>
  )
}

export function CardPrice({ children, className }: CardPropsType) {
  return (
    <p className={cn('inline-block mt-2.5 font-semibold text-lg text-secondary-foreground', className)}>
      {children}
    </p>
  )
}

// Enhanced CardPrice with discount display
interface CardPriceEnhancedProps {
  price: number;
  discountPercentage?: number;
  className?: string;
}

export function CardPriceEnhanced({ price, discountPercentage, className }: CardPriceEnhancedProps) {
  const finalPrice = discountPercentage ? price - (price * discountPercentage / 100) : price;

  return (
    <p className={cn('font-normal mt-px text-gray-1-foreground', className)} style={{ fontSize: '14px', lineHeight: '1.4' }}>
      {discountPercentage ? (
        <del className="text-gray-3-foreground font-normal" style={{ fontSize: '12px' }}>
          {currencyFormatter.format(price, { code: "RUB", thousand: ' ', precision: 0 })}
        </del>
      ) : null}{" "}
      <span style={{ fontSize: '16px', fontWeight: '600' }}>
        {currencyFormatter.format(finalPrice, { code: "RUB", thousand: ' ', precision: 0 })}
      </span>
    </p>
  );
}