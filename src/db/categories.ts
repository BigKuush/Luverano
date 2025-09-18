export type CategoryType = {
    id: string;
    name: string;
    slug: string;
    description: string;
    image?: string;
    subcategories?: CategoryType[];
};

export const categories: CategoryType[] = [
    {
        id: "outdoor-sets",
        name: "Комплекты мебели",
        slug: "komplekty",
        description: "Готовые комплекты мебели для сада и террасы",
        subcategories: [
            {
                id: "dining-sets",
                name: "Обеденные группы",
                slug: "dining-sets",
                description: "Столы со стульями для обеда на свежем воздухе"
            },
            {
                id: "lounge-sets",
                name: "Лаунж зоны",
                slug: "lounge-sets",
                description: "Комфортные зоны отдыха для сада и террасы"
            }
        ]
    },
    {
        id: "seating",
        name: "Кресла и диваны",
        slug: "kresla-i-divany",
        description: "Отдельные предметы мебели для сидения",
        subcategories: [
            {
                id: "armchairs",
                name: "Кресла",
                slug: "armchairs",
                description: "Удобные кресла для отдыха"
            },
            {
                id: "sofas",
                name: "Диваны",
                slug: "sofas",
                description: "Садовые диваны и софы"
            },
            {
                id: "sunbeds",
                name: "Шезлонги",
                slug: "sunbeds",
                description: "Лежаки и шезлонги для загара"
            }
        ]
    },
    {
        id: "tables",
        name: "Столы",
        slug: "stoly",
        description: "Столы для сада и террасы",
        subcategories: [
            {
                id: "dining-tables",
                name: "Обеденные столы",
                slug: "dining-tables",
                description: "Большие столы для обеда"
            },
            {
                id: "coffee-tables",
                name: "Журнальные столики",
                slug: "coffee-tables",
                description: "Небольшие столики для напитков"
            }
        ]
    },
    {
        id: "accessories",
        name: "Аксессуары",
        slug: "aksessuary",
        description: "Дополнительные предметы для комфорта",
        subcategories: [
            {
                id: "umbrellas",
                name: "Зонты",
                slug: "umbrellas",
                description: "Садовые зонты и тенты"
            },
            {
                id: "cushions",
                name: "Подушки",
                slug: "cushions",
                description: "Подушки для садовой мебели"
            },
            {
                id: "covers",
                name: "Чехлы",
                slug: "covers",
                description: "Защитные чехлы для мебели"
            }
        ]
    }
];

export const materials = [
    { id: "teak", name: "Тик" },
    { id: "aluminum", name: "Алюминий" },
    { id: "rattan", name: "Искусственный ротанг" },
    { id: "steel", name: "Нержавеющая сталь" },
    { id: "textile", name: "Текстиль" }
];

export const colors = [
    { id: "white", name: "Белый", hex: "#FFFFFF" },
    { id: "black", name: "Чёрный", hex: "#000000" },
    { id: "gray", name: "Серый", hex: "#808080" },
    { id: "beige", name: "Бежевый", hex: "#F5F5DC" },
    { id: "brown", name: "Коричневый", hex: "#964B00" }
];
