import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Card, { CardFooter, CardHeader, CardIcons, CardImg, CardTitle, CardPriceEnhanced, CardLabel, CardDiscount } from "@/components/ui/card";
import Title from "@/components/ui/title";
import Link from "next/link";
import { ProductType } from "@/types/productType";
import { getProductsData } from "@/lib/data";

const FeaturedProducts = async () => {
    const { featuredProducts }: { featuredProducts: ProductType[] } = await getProductsData();

    return (
        <section className="bg-home-bg-1 lg:pt-25 lg:pb-25 pt-15 pb-15">
            <div className="container">
                <Title>Популярное</Title>
                <p className="text-gray-1-foreground mt-3 leading-[166.667%]">
                    Откройте для себя премиальную мебель для загородной жизни
                </p>
                <div className="mt-10">
                    <div className="flex justify-between items-center mb-5">
                        <div />
                        <Link
                            href={"/shop-3"}
                            className="text-gray-1-foreground lg:text-xl text-lg border-b border-b-primary mt-2.5 md:mt-0 inline-block hover:border-b-primary hover:text-secondary-foreground duration-500"
                        >
                            Смотреть все
                        </Link>
                    </div>

                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-5 gap-y-10">
                        {featuredProducts.filter((p) => p.filter === 'Популярное').map((prd) => (
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
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;