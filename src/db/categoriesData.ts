export type CategoryType = {
    "id": number | string,
    "categoryImg": string,
    "categoryName": string,
    "value"?: string,
}

export const categoriesOneData: CategoryType[] = [
    {
        "id": 1,
        "categoryImg": "/images/home-1/category/img-1.webp",
        "categoryName": "Комплекты",
        "value": "komplekty"
    },
    {
        "id": 2,
        "categoryImg": "/images/home-1/category/img-2.webp",
        "categoryName": "Кресла",
        "value": "kresla"
    },
    {
        "id": 3,
        "categoryImg": "/images/home-1/category/img-3.webp",
        "categoryName": "Столы",
        "value": "stoly"
    },
    {
        "id": 4,
        "categoryImg": "/images/home-1/category/img-4.webp",
        "categoryName": "Стулья",
        "value": "stulya"
    },
    {
        "id": 5,
        "categoryImg": "/images/home-1/category/img-5.webp",
        "categoryName": "Диваны",
        "value": "divany"
    }
]
