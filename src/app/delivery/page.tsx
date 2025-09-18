import { Metadata } from 'next'
import PageHeader from '@/components/sections/pageHeader'

export const metadata: Metadata = {
  title: "Доставка мебели по России | Luverano",
  description: "Доставка премиальной мебели Luverano по всей России: Москва, СПб, Краснодар, Екатеринбург, Новосибирск, Грозный, Махачкала и другие города.",
  keywords: "доставка мебели, мебель москва, мебель спб, мебель краснодар, мебель екатеринбург, мебель новосибирск, мебель грозный, мебель махачкала"
}

export default function DeliveryPage() {
  const regions = [
    { name: "Москва и Московская область", delivery: "1-3 дня", cost: "Бесплатно от 500 000 ₽" },
    { name: "Санкт-Петербург и Ленинградская область", delivery: "2-4 дня", cost: "Бесплатно от 500 000 ₽" },
    { name: "Краснодар и Краснодарский край", delivery: "3-5 дней", cost: "От 2 000 ₽" },
    { name: "Екатеринбург и Свердловская область", delivery: "3-5 дней", cost: "От 2 500 ₽" },
    { name: "Новосибирск и Новосибирская область", delivery: "4-6 дней", cost: "От 3 000 ₽" },
    { name: "Грозный и Чеченская Республика", delivery: "5-7 дней", cost: "От 3 500 ₽" },
    { name: "Махачкала и Республика Дагестан", delivery: "5-7 дней", cost: "От 3 500 ₽" },
    { name: "Другие города России", delivery: "5-10 дней", cost: "По запросу" }
  ]

  return (
    <main>
      <PageHeader 
        pageTitle="Доставка мебели по России" 
        currentPage="Доставка" 
        breadcrumbLink="/" 
        breadcrumbLabel="Главная" 
      />
      
      <div className="container lg:pt-25 lg:pb-25 pt-15 pb-15">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-3xl font-bold mb-6">Доставка премиальной мебели Luverano по всей России</h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Мы доставляем нашу премиальную мебель во все регионы России. 
              От Москвы до Владивостока, от Санкт-Петербурга до Махачкалы - 
              ваша мебель Luverano будет доставлена в целости и сохранности.
            </p>

            <h2 className="text-2xl font-semibold mb-6">Регионы доставки и сроки</h2>
            
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Регион</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Срок доставки</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Стоимость</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {regions.map((region, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {region.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {region.delivery}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {region.cost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-semibold mb-6">Особенности доставки</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-blue-800">Бесплатная доставка</h3>
                <p className="text-blue-700">
                  При заказе от 500 000 ₽ доставка по Москве и Санкт-Петербургу бесплатная. 
                  В другие регионы - скидка на доставку 50%.
                </p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-green-800">Сборка мебели</h3>
                <p className="text-green-700">
                  Наши специалисты соберут мебель на месте. 
                  Стоимость сборки включена в стоимость доставки.
                </p>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-yellow-800">Страхование</h3>
                <p className="text-yellow-700">
                  Вся мебель застрахована на время транспортировки. 
                  В случае повреждения - полная компенсация.
                </p>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-purple-800">Отслеживание</h3>
                <p className="text-purple-700">
                  Вы можете отслеживать статус доставки в личном кабинете 
                  или по SMS-уведомлениям.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-6">Как оформить доставку</h2>
            
            <ol className="list-decimal list-inside space-y-4 mb-8">
              <li>
                <strong>Выберите товары</strong> в нашем каталоге и добавьте их в корзину
              </li>
              <li>
                <strong>Оформите заказ</strong> с указанием адреса доставки
              </li>
              <li>
                <strong>Дождитесь звонка</strong> менеджера для подтверждения деталей
              </li>
              <li>
                <strong>Получите мебель</strong> в указанное время с полной сборкой
              </li>
            </ol>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Контакты службы доставки</h3>
              <p className="mb-2"><strong>Телефон:</strong> +7 (495) 123-45-67</p>
              <p className="mb-2"><strong>Email:</strong> delivery@luverano.ru</p>
              <p><strong>Время работы:</strong> Пн-Пт: 9:00-18:00, Сб: 10:00-16:00</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
