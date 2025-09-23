import React from 'react'
import Image from 'next/image'

const Trends2025Article = () => {
  return (
    <div className='container lg:pt-25 pt-15'>
      <div className='grid xl:grid-cols-[auto_24%] lg:grid-cols-[60%_auto] grid-cols-1 gap-x-10 gap-y-12'>
        <div>
          <Image width={1040} height={500} style={{ width: '100%', height: 'auto' }} src={'/images/blog/blog-single-1.webp'} alt='Тренды 2025 — загородные пространства' className='rounded-xl' />

          <h1 className='text-secondary-foreground mt-2.5 leading-[130%] lg:text-4xl text-3xl font-semibold tracking-[-0.01em] max-w-[820px] mx-auto'>Тренды в оформлении загородных пространств 2025</h1>

          <section className='mt-5 max-w-[820px] mx-auto text-[17px] leading-[1.8]'>
            <p className='text-gray-1-foreground'>Оформление загородных пространств в 2025 году становится продолжением интерьера дома: гармония уюта, стиля и практичности выходит на первый план. Основная тенденция — создание единого пространства, где внутренний интерьер плавно перетекает в террасу, сад или патио. Для этого дизайнеры используют схожие материалы, палитры и фактуры, добиваясь целостного визуального впечатления.</p>
          </section>

          <section className='mt-8 max-w-[820px] mx-auto text-[17px] leading-[1.8]'>
            <h2 className='text-secondary-foreground font-semibold text-xl'>Натуральные материалы и устойчивость</h2>
            <p className='text-gray-1-foreground mt-3'>В центре внимания остаются натуральные материалы. Дерево, тик, акация и дуб сохраняют лидерство, подчёркивая экологичность и долговечность. Rope и искусственный ротанг — универсальные решения для уличной мебели: прочные, устойчивые к влаге и солнцу, добавляют лёгкий современный акцент. Металл с антикоррозийным покрытием и закалённое стекло применяются в столах и декоративных конструкциях, усиливая износостойкость и эстетику.</p>
          </section>

          <section className='mt-8 max-w-[820px] mx-auto text-[17px] leading-[1.8]'>
            <h2 className='text-secondary-foreground font-semibold text-xl'>Функциональная модульная мебель</h2>
            <p className='text-gray-1-foreground mt-3'>Мебель 2025 года всё чаще выполняет функцию трансформации. Модульные диваны, столы‑трансформеры и кресла с изменяемой конфигурацией помогают адаптировать пространство под разные сценарии — от семейных обедов до вечеринок. Всё большее распространение получают столы с огненными вставками — они становятся эмоциональными центрами композиции и создают уют тёплыми вечерами.</p>
          </section>

          <section className='mt-8 max-w-[820px] mx-auto text-[17px] leading-[1.8]'>
            <h2 className='text-secondary-foreground font-semibold text-xl'>Природная палитра и выразительный текстиль</h2>
            <p className='text-gray-1-foreground mt-3'>Актуальные оттенки — бежевый, оливковый, серый и терракотовый. Они гармонируют с зеленью сада и архитектурой. Индивидуальность добавляют яркие элементы текстиля — подушки, ковры, пледы из влагостойких тканей с УФ‑защитой. Такой подход создаёт живое и в то же время выдержанное пространство.</p>
          </section>

          <section className='mt-8 max-w-[820px] mx-auto text-[17px] leading-[1.8]'>
            <h2 className='text-secondary-foreground font-semibold text-xl'>Освещение и атмосфера</h2>
            <p className='text-gray-1-foreground mt-3'>Мягкий свет LED‑гирлянд, встроенных светильников и подвесных фонарей формирует атмосферу уюта и подчёркивает архитектурные линии. Очаги и fire‑pit‑зоны становятся знаковыми деталями загородных пространств, превращая вечера на свежем воздухе в тёплые и запоминающиеся моменты.</p>
          </section>

          <section className='mt-8 max-w-[820px] mx-auto text-[17px] leading-[1.8]'>
            <h2 className='text-secondary-foreground font-semibold text-xl'>Чего избегать</h2>
            <ul className='list-disc pl-6 space-y-2 mt-3 mb-5'>
              <li className='text-gray-1-foreground'>Перегрузка декором — визуальный шум и сложность в уходе.</li>
              <li className='text-gray-1-foreground'>Дешёвые материалы — быстро теряют вид и не выдерживают погоду.</li>
              <li className='text-gray-1-foreground'>Слишком массивные предметы — утяжеляют пространство.</li>
            </ul>
          </section>

          <section className='mt-8 max-w-[820px] mx-auto text-[17px] leading-[1.8]'>
            <p className='text-gray-1-foreground'>Загородные пространства 2025 года — это место, где интерьер встречается с природой. Правильный выбор мебели, освещения и аксессуаров создаёт атмосферу, в которой хочется жить и проводить время. Это инвестиция в гармонию, уют и долговечность дома и сада.</p>
          </section>
        </div>

        {/* Правую колонку оставляем пустой — использует стандартный сайдбар страницы */}
        <div className='hidden lg:block' />
      </div>
    </div>
  )
}

export default Trends2025Article


