export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
};

export const formatPriceRange = (minPrice: number, maxPrice: number): string => {
    return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
};