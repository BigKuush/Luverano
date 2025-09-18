// Битрикс24 интеграция (бесплатная версия "Проект+")
const BITRIX24_WEBHOOK_URL = process.env.BITRIX24_WEBHOOK_URL;

export interface Bitrix24Lead {
  TITLE: string;
  NAME: string;
  LAST_NAME: string;
  PHONE: Array<{VALUE: string, VALUE_TYPE: string}>;
  EMAIL: Array<{VALUE: string, VALUE_TYPE: string}>;
  COMMENTS: string;
  OPPORTUNITY: number;
  CURRENCY_ID: string;
  SOURCE_ID: string;
  UTM_SOURCE?: string;
  UTM_MEDIUM?: string;
  UTM_CAMPAIGN?: string;
}

export interface Bitrix24Contact {
  NAME: string;
  LAST_NAME: string;
  PHONE: Array<{VALUE: string, VALUE_TYPE: string}>;
  EMAIL: Array<{VALUE: string, VALUE_TYPE: string}>;
  ADDRESS?: string;
}

export interface Bitrix24Category {
  ID?: string;
  NAME: string;
  DESCRIPTION?: string;
  ACTIVE: 'Y' | 'N';
  SORT: number;
  PICTURE?: string;
  SEO_TITLE?: string;
  SEO_DESCRIPTION?: string;
  SEO_KEYWORDS?: string;
  PARENT_ID?: string;
}

export interface Bitrix24Product {
  ID?: string;
  NAME: string;
  DESCRIPTION?: string;
  PRICE: number;
  CURRENCY_ID: string;
  ACTIVE: 'Y' | 'N';
  CATALOG_ID: string;
  SECTION_ID?: string;
  DETAIL_PICTURE?: string;
  PREVIEW_PICTURE?: string;
  MEASURE: number;
  WEIGHT?: number;
  DIMENSIONS?: string;
  MATERIAL?: string;
  COLOR?: string;
  BRAND?: string;
  STOCK_QUANTITY?: number;
  SEO_TITLE?: string;
  SEO_DESCRIPTION?: string;
  SEO_KEYWORDS?: string;
}

export const bitrix24 = {
  // Создание лида из заказа
  async createLead(orderData: any): Promise<any> {
    if (!BITRIX24_WEBHOOK_URL) {
      console.warn('BITRIX24_WEBHOOK_URL не настроен');
      return null;
    }

    try {
      const leadData: Bitrix24Lead = {
        TITLE: `Заказ мебели #${orderData.id || Date.now()}`,
        NAME: orderData.customer?.firstName || 'Клиент',
        LAST_NAME: orderData.customer?.lastName || '',
        PHONE: [{ VALUE: orderData.customer?.phone || '', VALUE_TYPE: 'WORK' }],
        EMAIL: [{ VALUE: orderData.customer?.email || '', VALUE_TYPE: 'WORK' }],
        COMMENTS: `
Состав заказа:
${orderData.items?.map((item: any) => 
  `${item.title} - ${item.quantity} шт. - ${item.price} ₽`
).join('\n') || 'Товары не указаны'}

Адрес доставки: ${orderData.delivery?.address || 'Не указан'}
Город: ${orderData.delivery?.city || 'Не указан'}
Комментарий: ${orderData.notes || 'Нет комментариев'}

Общая сумма: ${orderData.totalAmount || 0} ₽
        `,
        OPPORTUNITY: orderData.totalAmount || 0,
        CURRENCY_ID: 'RUB',
        SOURCE_ID: 'WEB',
        UTM_SOURCE: orderData.utm?.source,
        UTM_MEDIUM: orderData.utm?.medium,
        UTM_CAMPAIGN: orderData.utm?.campaign
      };

      const response = await fetch(`${BITRIX24_WEBHOOK_URL}/crm.lead.add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: leadData
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Битрикс24 лид создан:', result);
      return result;
    } catch (error) {
      console.error('Ошибка создания лида в Битрикс24:', error);
      throw error;
    }
  },

  // Создание контакта
  async createContact(customerData: any): Promise<any> {
    if (!BITRIX24_WEBHOOK_URL) {
      console.warn('BITRIX24_WEBHOOK_URL не настроен');
      return null;
    }

    try {
      const contactData: Bitrix24Contact = {
        NAME: customerData.firstName || 'Клиент',
        LAST_NAME: customerData.lastName || '',
        PHONE: [{ VALUE: customerData.phone || '', VALUE_TYPE: 'WORK' }],
        EMAIL: [{ VALUE: customerData.email || '', VALUE_TYPE: 'WORK' }],
        ADDRESS: customerData.address || ''
      };

      const response = await fetch(`${BITRIX24_WEBHOOK_URL}/crm.contact.add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: contactData
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Битрикс24 контакт создан:', result);
      return result;
    } catch (error) {
      console.error('Ошибка создания контакта в Битрикс24:', error);
      throw error;
    }
  },

  // Получение списка лидов (для админки)
  async getLeads(): Promise<any> {
    if (!BITRIX24_WEBHOOK_URL) {
      console.warn('BITRIX24_WEBHOOK_URL не настроен');
      return [];
    }

    try {
      const response = await fetch(`${BITRIX24_WEBHOOK_URL}/crm.lead.list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          select: ['ID', 'TITLE', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL', 'OPPORTUNITY', 'DATE_CREATE', 'STATUS_ID'],
          filter: { 'SOURCE_ID': 'WEB' },
          order: { 'DATE_CREATE': 'DESC' },
          start: 0
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.result || [];
    } catch (error) {
      console.error('Ошибка получения лидов из Битрикс24:', error);
      return [];
    }
  },

  // === МЕТОДЫ ДЛЯ РАБОТЫ С ТОВАРАМИ ===

  // Получение списка товаров
  async getProducts(): Promise<any[]> {
    if (!BITRIX24_WEBHOOK_URL) {
      console.warn('BITRIX24_WEBHOOK_URL не настроен');
      return [];
    }

    try {
      const response = await fetch(`${BITRIX24_WEBHOOK_URL}/crm.product.list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          select: [
            'ID', 'NAME', 'DESCRIPTION', 'PRICE', 'CURRENCY_ID', 'ACTIVE',
            'CATALOG_ID', 'SECTION_ID', 'SECTION_NAME', 'DETAIL_PICTURE', 'PREVIEW_PICTURE',
            'MEASURE', 'WEIGHT', 'DIMENSIONS', 'MATERIAL', 'COLOR', 'BRAND',
            'STOCK_QUANTITY', 'SEO_TITLE', 'SEO_DESCRIPTION', 'SEO_KEYWORDS'
          ],
          filter: { 'ACTIVE': 'Y' },
          order: { 'ID': 'DESC' },
          start: 0
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.result || [];
    } catch (error) {
      console.error('Ошибка получения товаров из Битрикс24:', error);
      return [];
    }
  },

  // Получение товара по ID
  async getProduct(productId: string): Promise<any> {
    if (!BITRIX24_WEBHOOK_URL) {
      console.warn('BITRIX24_WEBHOOK_URL не настроен');
      return null;
    }

    try {
      const response = await fetch(`${BITRIX24_WEBHOOK_URL}/crm.product.get`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: productId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.result;
    } catch (error) {
      console.error('Ошибка получения товара из Битрикс24:', error);
      return null;
    }
  },

  // Создание товара
  async createProduct(productData: any): Promise<any> {
    if (!BITRIX24_WEBHOOK_URL) {
      console.warn('BITRIX24_WEBHOOK_URL не настроен');
      return null;
    }

    try {
      const bitrixProduct: Bitrix24Product = {
        NAME: productData.title,
        DESCRIPTION: productData.description || '',
        PRICE: productData.price,
        CURRENCY_ID: productData.currency || 'RUB',
        ACTIVE: productData.status === 'active' ? 'Y' : 'N',
        CATALOG_ID: '1', // ID каталога по умолчанию
        SECTION_ID: productData.categoryId || productData.category || '',
        DETAIL_PICTURE: productData.images?.[0] || '',
        PREVIEW_PICTURE: productData.thumbnail || productData.images?.[0] || '',
        MEASURE: 796, // штука
        WEIGHT: productData.weight || 0,
        DIMENSIONS: productData.dimensions || '',
        MATERIAL: productData.material || '',
        COLOR: productData.color || '',
        BRAND: productData.brand || 'Luverano',
        STOCK_QUANTITY: productData.stock || 0,
        SEO_TITLE: productData.seoTitle || productData.title,
        SEO_DESCRIPTION: productData.seoDescription || productData.description,
        SEO_KEYWORDS: productData.seoKeywords || ''
      };

      const response = await fetch(`${BITRIX24_WEBHOOK_URL}/crm.product.add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: bitrixProduct
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Товар создан в Битрикс24:', result);
      return result.result;
    } catch (error) {
      console.error('Ошибка создания товара в Битрикс24:', error);
      throw error;
    }
  },

  // Обновление товара
  async updateProduct(productId: string, productData: any): Promise<any> {
    if (!BITRIX24_WEBHOOK_URL) {
      console.warn('BITRIX24_WEBHOOK_URL не настроен');
      return null;
    }

    try {
      const bitrixProduct: Partial<Bitrix24Product> = {
        NAME: productData.title,
        DESCRIPTION: productData.description || '',
        PRICE: productData.price,
        CURRENCY_ID: productData.currency || 'RUB',
        ACTIVE: productData.status === 'active' ? 'Y' : 'N',
        SECTION_ID: productData.categoryId || productData.category || '',
        DETAIL_PICTURE: productData.images?.[0] || '',
        PREVIEW_PICTURE: productData.thumbnail || productData.images?.[0] || '',
        WEIGHT: productData.weight || 0,
        DIMENSIONS: productData.dimensions || '',
        MATERIAL: productData.material || '',
        COLOR: productData.color || '',
        BRAND: productData.brand || 'Luverano',
        STOCK_QUANTITY: productData.stock || 0,
        SEO_TITLE: productData.seoTitle || productData.title,
        SEO_DESCRIPTION: productData.seoDescription || productData.description,
        SEO_KEYWORDS: productData.seoKeywords || ''
      };

      const response = await fetch(`${BITRIX24_WEBHOOK_URL}/crm.product.update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: productId,
          fields: bitrixProduct
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Товар обновлен в Битрикс24:', result);
      return result.result;
    } catch (error) {
      console.error('Ошибка обновления товара в Битрикс24:', error);
      throw error;
    }
  },

  // Удаление товара
  async deleteProduct(productId: string): Promise<boolean> {
    if (!BITRIX24_WEBHOOK_URL) {
      console.warn('BITRIX24_WEBHOOK_URL не настроен');
      return false;
    }

    try {
      const response = await fetch(`${BITRIX24_WEBHOOK_URL}/crm.product.delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: productId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Товар удален из Битрикс24:', result);
      return result.result === true;
    } catch (error) {
      console.error('Ошибка удаления товара из Битрикс24:', error);
      return false;
    }
  },

  // Синхронизация товаров (получение изменений)
  async syncProducts(lastSyncDate?: string): Promise<any[]> {
    if (!BITRIX24_WEBHOOK_URL) {
      console.warn('BITRIX24_WEBHOOK_URL не настроен');
      return [];
    }

    try {
      const filter: any = { 'ACTIVE': 'Y' };
      if (lastSyncDate) {
        filter['>DATE_MODIFY'] = lastSyncDate;
      }

      const response = await fetch(`${BITRIX24_WEBHOOK_URL}/crm.product.list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          select: [
            'ID', 'NAME', 'DESCRIPTION', 'PRICE', 'CURRENCY_ID', 'ACTIVE',
            'CATALOG_ID', 'SECTION_ID', 'DETAIL_PICTURE', 'PREVIEW_PICTURE',
            'MEASURE', 'WEIGHT', 'DIMENSIONS', 'MATERIAL', 'COLOR', 'BRAND',
            'STOCK_QUANTITY', 'SEO_TITLE', 'SEO_DESCRIPTION', 'SEO_KEYWORDS',
            'DATE_CREATE', 'DATE_MODIFY'
          ],
          filter,
          order: { 'DATE_MODIFY': 'DESC' },
          start: 0
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.result || [];
    } catch (error) {
      console.error('Ошибка синхронизации товаров из Битрикс24:', error);
      return [];
    }
  },

  // === МЕТОДЫ ДЛЯ РАБОТЫ С КАТЕГОРИЯМИ ===

  // Получение списка категорий
  async getCategories(): Promise<any[]> {
    if (!BITRIX24_WEBHOOK_URL) {
      console.warn('BITRIX24_WEBHOOK_URL не настроен');
      return [];
    }

    try {
      const response = await fetch(`${BITRIX24_WEBHOOK_URL}/crm.productsection.list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          select: [
            'ID', 'NAME', 'DESCRIPTION', 'ACTIVE', 'SORT', 'PICTURE',
            'SEO_TITLE', 'SEO_DESCRIPTION', 'SEO_KEYWORDS', 'PARENT_ID'
          ],
          filter: { 'ACTIVE': 'Y' },
          order: { 'SORT': 'ASC' },
          start: 0
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.result || [];
    } catch (error) {
      console.error('Ошибка получения категорий из Битрикс24:', error);
      return [];
    }
  },

  // Получение категории по ID
  async getCategory(categoryId: string): Promise<any> {
    if (!BITRIX24_WEBHOOK_URL) {
      console.warn('BITRIX24_WEBHOOK_URL не настроен');
      return null;
    }

    try {
      const response = await fetch(`${BITRIX24_WEBHOOK_URL}/crm.productsection.get`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: categoryId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.result;
    } catch (error) {
      console.error('Ошибка получения категории из Битрикс24:', error);
      return null;
    }
  },

  // Создание категории
  async createCategory(categoryData: any): Promise<any> {
    if (!BITRIX24_WEBHOOK_URL) {
      console.warn('BITRIX24_WEBHOOK_URL не настроен');
      return null;
    }

    try {
      const bitrixCategory: Bitrix24Category = {
        NAME: categoryData.name,
        DESCRIPTION: categoryData.description || '',
        ACTIVE: categoryData.active ? 'Y' : 'N',
        SORT: categoryData.sort || 100,
        PICTURE: categoryData.picture || '',
        SEO_TITLE: categoryData.seoTitle || categoryData.name,
        SEO_DESCRIPTION: categoryData.seoDescription || categoryData.description,
        SEO_KEYWORDS: categoryData.seoKeywords || '',
        PARENT_ID: categoryData.parentId || ''
      };

      const response = await fetch(`${BITRIX24_WEBHOOK_URL}/crm.productsection.add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: bitrixCategory
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Категория создана в Битрикс24:', result);
      return result.result;
    } catch (error) {
      console.error('Ошибка создания категории в Битрикс24:', error);
      throw error;
    }
  },

  // Обновление категории
  async updateCategory(categoryId: string, categoryData: any): Promise<any> {
    if (!BITRIX24_WEBHOOK_URL) {
      console.warn('BITRIX24_WEBHOOK_URL не настроен');
      return null;
    }

    try {
      const bitrixCategory: Partial<Bitrix24Category> = {
        NAME: categoryData.name,
        DESCRIPTION: categoryData.description || '',
        ACTIVE: categoryData.active ? 'Y' : 'N',
        SORT: categoryData.sort || 100,
        PICTURE: categoryData.picture || '',
        SEO_TITLE: categoryData.seoTitle || categoryData.name,
        SEO_DESCRIPTION: categoryData.seoDescription || categoryData.description,
        SEO_KEYWORDS: categoryData.seoKeywords || '',
        PARENT_ID: categoryData.parentId || ''
      };

      const response = await fetch(`${BITRIX24_WEBHOOK_URL}/crm.productsection.update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: categoryId,
          fields: bitrixCategory
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Категория обновлена в Битрикс24:', result);
      return result.result;
    } catch (error) {
      console.error('Ошибка обновления категории в Битрикс24:', error);
      throw error;
    }
  },

  // Удаление категории
  async deleteCategory(categoryId: string): Promise<boolean> {
    if (!BITRIX24_WEBHOOK_URL) {
      console.warn('BITRIX24_WEBHOOK_URL не настроен');
      return false;
    }

    try {
      const response = await fetch(`${BITRIX24_WEBHOOK_URL}/crm.productsection.delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: categoryId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Категория удалена из Битрикс24:', result);
      return result.result === true;
    } catch (error) {
      console.error('Ошибка удаления категории из Битрикс24:', error);
      return false;
    }
  }
};
