import { cache } from "react";
import { adsData } from "@/db/adsData";
import { menuList } from "@/db/menuList";
import { categoriesOneData } from "@/db/categoriesData";
import { blogData } from "@/db/blogData";
import { faqData } from "@/db/faqData";
import { galleryDataOne } from "@/db/galleryData";
import { partnerData } from "@/db/partnerData";
import { privacyPolicyData } from "@/db/privacyPolicyData";
import { termsAndConditionsData } from "@/db/termsAndConditionsData";
import { testimonialData } from "@/db/testimonialsData";
import { heroData } from "@/db/heroData";
import { products } from "@/db/products";

const baseUrl = 'https://luverano.vercel.app';

export const getHeroData = cache(async () => {
    try {
        // Всегда используем локальные данные для консистентности
        return heroData;
    } catch (error) {
        throw new Error('Error in getHeroData: ' + (error instanceof Error ? error.message : String(error)));
    }
});

export const getAdsData = cache(async () => {
    try {
        // Всегда используем локальные данные для консистентности
        return adsData;
    } catch (error) {
        throw new Error('Error in getAdsData: ' + (error instanceof Error ? error.message : String(error)));
    }
});

export const getProductsData = async () => {
    // Всегда используем локальные данные для консистентности
    return products;
};

export const getMenuData = cache(async () => {
    try {
        // Всегда используем локальные данные для консистентности
        return menuList;
    } catch (error) {
        throw new Error('Error in getMenuData: ' + (error instanceof Error ? error.message : String(error)));
    }
});

export const getCategoriesData = cache(async () => {
    try {
        // Всегда используем локальные данные для консистентности
        return categoriesOneData;
    } catch (error) {
        throw new Error('Error in getCategoriesData: ' + (error instanceof Error ? error.message : String(error)));
    }
});

export const getBlogData = cache(async () => {
    // Всегда используем локальные данные для консистентности
    return blogData;
});

export const getFaqData = cache(async () => {
    try {
        // Всегда используем локальные данные для консистентности
        return faqData;
    } catch (error) {
        throw new Error('Error in getFaqData: ' + (error instanceof Error ? error.message : String(error)));
    }
});

export const getGalleryData = cache(async () => {
    try {
        // Всегда используем локальные данные для консистентности
        return galleryDataOne;
    } catch (error) {
        throw new Error('Error in getGalleryData: ' + (error instanceof Error ? error.message : String(error)));
    }
});

export const getPartnerData = cache(async () => {
    try {
        // Всегда используем локальные данные для консистентности
        return partnerData;
    } catch (error) {
        throw new Error('Error in getPartnerData: ' + (error instanceof Error ? error.message : String(error)));
    }
});

export const getPrivacyPolicyData = cache(async () => {
    try {
        // Всегда используем локальные данные для консистентности
        return privacyPolicyData;
    } catch (error) {
        throw new Error('Error in getPrivacyPolicyData: ' + (error instanceof Error ? error.message : String(error)));
    }
});

export const getTermsAndConditionsData = cache(async () => {
    try {
        // Всегда используем локальные данные для консистентности
        return termsAndConditionsData;
    } catch (error) {
        throw new Error('Error in getTermsAndConditionsData: ' + (error instanceof Error ? error.message : String(error)));
    }
});

export const getTestimonialsData = cache(async () => {
    try {
        // Всегда используем локальные данные для консистентности
        return testimonialData;
    } catch (error) {
        throw new Error('Error in getTestimonialsData: ' + (error instanceof Error ? error.message : String(error)));
    }
});