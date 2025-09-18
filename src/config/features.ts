export const featureFlags = {
    // Языки и валюты
    showLanguageSelector: false,
    showCurrencySelector: false,
    showTopHeader: true,
    
    // Валюта по умолчанию
    defaultCurrency: 'RUB',
    defaultLanguage: 'ru',
    
    // Функционал магазина
    showPrices: true,
    showCart: true,
    showCheckout: true,
    showPayment: false,
    showPaymentIcons: false,
    
    // Контент
    showBlog: true,
    showTestimonials: true,
    showNewsletter: true,
    
    // Социальные сети
    showSocialLinks: false,

    // Футер
    footerLinks: {
        showAbout: true,
        showContacts: true,
        showPartners: true,
        // Отключаем остальные секции
        showResources: false,
        showFeatures: false,
        showSolutions: false
    }
} as const;
