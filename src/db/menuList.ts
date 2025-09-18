export type MegamenuType = {
    id: number | string;
    label: string;
    path: string;
};

export type menuType = {
    id: number | string;
    label: string;
    path: string;
    dropdownList?: {
        id: number | string;
        label: string;
        path: string;
    }[];
    megaMenu?: MegamenuType[];
};

export const menuList: menuType[] = [
    {
        id: 1,
        label: "Главная",
        path: "/",
    },
    {
        id: 2,
        label: "Каталог",
        path: "/shop-3?category=komplekty",
    },
    {
        id: 3,
        label: "Блог",
        path: "/blog",
    }
];