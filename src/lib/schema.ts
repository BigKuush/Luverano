// Schema.org разметка для SEO
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

export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Luverano",
    "description": "Премиальная мебель для загородной жизни",
    "url": "https://luverano.ru",
    "logo": "https://luverano.ru/images/luverano-logo.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+7-915-401-57-54",
      "contactType": "customer service",
      "email": "info@luverano.ru"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Торговая ул., с2",
      "addressLocality": "Москва",
      "addressRegion": "Московская область",
      "addressCountry": "RU"
    },
    "sameAs": [
      "https://vk.ru/luverano"
    ]
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
