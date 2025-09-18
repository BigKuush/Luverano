import Card, { CardDiscount, CardFooter, CardHeader, CardIcons, CardImg, CardLabel, CardPriceEnhanced, CardTitle } from '@/components/ui/card';
import { getProductsData } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ProductType } from '@/types/productType';

const RelatedProducts = async ({ className, excludeId }: { className?: string; excludeId?: string | number }) => {
    const { featuredProducts }: { featuredProducts: ProductType[] } = await getProductsData();
    return (
        <section className={cn('lg:pt-25 lg:pb-25 pt-15 pb-15', className)}>
            <div className='container'>
                <b className='lg:text-[32px] sm:text-[26px] text-2xl text-secondary-foreground font-semibold block lg:mb-7.5 mb-5'>Похожие товары</b>
                <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-5 lg:gap-y-15 gap-y-10'>
                    {
                        featuredProducts
                            .filter((p) => String(p.id) !== String(excludeId))
                            .slice(0, 4)
                            .map((prd) => {
                            return (
                                <Card key={prd.id}>
                                    <CardHeader>
                                        <CardImg src={prd.thumbnail} height={500} width={420} href={`/product/${encodeURIComponent(String(prd.title).toLowerCase().replace(/\s+/g,'-'))}`} alt={`${prd.title} — фото`} />
                                        <CardLabel isLabel={prd.label ? prd.label : false}>{prd.label}</CardLabel>
                                        <CardDiscount isDiscountTrue={prd.discountPercentage ? prd.discountPercentage : false}>-{prd.discountPercentage}%</CardDiscount>
                                        <CardIcons product={prd} />
                                    </CardHeader>
                                    <CardFooter>
                                        <CardTitle path={`/product/${encodeURIComponent(String(prd.title).toLowerCase().replace(/\s+/g,'-'))}`}>{prd.title}</CardTitle>
                                        <CardPriceEnhanced price={prd.price} discountPercentage={prd.discountPercentage} />
                                    </CardFooter>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default RelatedProducts