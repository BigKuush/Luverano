// Дополнительные SEO утилиты
export const generateProductSchema = (product: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": product.thumbnail,
    "brand": {
      "@type": "Brand",
      "name": "Luverano"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "RUB",
      "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Luverano"
      }
    },
    "category": product.category,
    "sku": product.sku || `LUVERANO-${product.id}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "3"
    }
  }
}

export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

// SEO мета-теги для разных страниц
export const getPageMetadata = (page: string, data?: any) => {
  const baseUrl = 'https://luverano.ru'
  
  const metadata = {
    home: {
      title: "Luverano - Премиальная мебель для загородной жизни",
      description: "Эксклюзивные коллекции премиальной мебели для загородных домов. Высокое качество, элегантный дизайн, долговечность.",
      keywords: ["премиальная мебель", "загородная мебель", "дизайнерская мебель", "элитная мебель", "мебель для дачи"],
      canonical: baseUrl
    },
    shop: {
      title: "Каталог мебели - Luverano",
      description: "Каталог премиальной мебели Luverano. Комплекты, кресла, столы, стулья для загородного дома.",
      keywords: ["каталог мебели", "мебель для дома", "комплекты мебели", "кресла", "столы", "стулья"],
      canonical: `${baseUrl}/shop-3`
    },
    product: {
      title: `${data?.title || 'Товар'} - Luverano`,
      description: data?.description || `Премиальная мебель ${data?.title || ''} от Luverano. Высокое качество и элегантный дизайн.`,
      keywords: [data?.title, "мебель", "премиальная мебель", "Luverano"],
      canonical: `${baseUrl}/product-details/${data?.id}`
    },
    blog: {
      title: "Блог о мебели - Luverano",
      description: "Полезные статьи о выборе мебели, уходе за мебелью и дизайне интерьеров от Luverano.",
      keywords: ["блог о мебели", "статьи о мебели", "дизайн интерьера", "уход за мебелью"],
      canonical: `${baseUrl}/blog`
    }
  }
  
  return metadata[page as keyof typeof metadata] || metadata.home
}

// Open Graph теги
export const getOpenGraphTags = (page: string, data?: any) => {
  const baseUrl = 'https://luverano.ru'
  const metadata = getPageMetadata(page, data)
  
  return {
    'og:title': metadata.title,
    'og:description': metadata.description,
    'og:url': metadata.canonical,
    'og:type': page === 'product' ? 'product' : 'website',
    'og:image': data?.thumbnail || `${baseUrl}/images/og-image.jpg`,
    'og:site_name': 'Luverano',
    'og:locale': 'ru_RU'
  }
}

// Twitter Card теги
export const getTwitterTags = (page: string, data?: any) => {
  const metadata = getPageMetadata(page, data)
  
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': metadata.title,
    'twitter:description': metadata.description,
    'twitter:image': data?.thumbnail || 'https://luverano.ru/images/twitter-image.jpg'
  }
}
