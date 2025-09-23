import React from 'react'
import Image from 'next/image'

const CarePremiumArticle = () => {
  return (
    <div className='container lg:pt-25 pt-15'>
      <div className='grid xl:grid-cols-[auto_24%] lg:grid-cols-[60%_auto] grid-cols-1 gap-x-10 gap-y-12'>
        <div>
          <Image width={1040} height={500} style={{ width: '100%', height: 'auto' }} src={'/images/blog/blog-single-1.webp'} alt='Уход за премиальной садовой мебелью' className='rounded-xl' />

          <h1 className='text-secondary-foreground mt-2.5 leading-[130%] lg:text-4xl text-3xl font-semibold tracking-[-0.01em] max-w-[820px] mx-auto'>Уход за премиальной садовой мебелью</h1>

          <section className='mt-5 max-w-[820px] mx-auto text-[17px] leading-[1.8]'>
            <p className='text-gray-1-foreground'>Премиальная садовая мебель — это инвестиция в комфорт, эстетику и долговечность загородного пространства. Чтобы мебель долгие годы сохраняла внешний вид и функциональность, необходим правильный уход с учётом материалов, условий эксплуатации и сезонности.</p>
          </section>

          <section className='mt-8 max-w-[820px] mx-auto text-[17px] leading-[1.8]'>
            <h2 className='text-secondary-foreground font-semibold text-xl'>Древесина: тик, акация, дуб</h2>
            <p className='text-gray-1-foreground mt-3'>Натуральный тик, акация и дуб требуют регулярной обработки маслом или специальными пропитками. Они защищают поверхность от влаги, УФ‑излучения и растрескивания, помогают сохранить естественный цвет и текстуру, повышают устойчивость к перепадам температур и осадкам.</p>
          </section>

          <section className='mt-8 max-w-[820px] mx-auto text-[17px] leading-[1.8]'>
            <h2 className='text-secondary-foreground font-semibold text-xl'>Металл: алюминий и сталь с покрытием</h2>
            <p className='text-gray-1-foreground mt-3'>Металлические конструкции долговечны, но нуждаются в уходе. Проводите регулярную очистку мягкой тканью с нейтральным средством, избегайте агрессивной химии, чтобы не повредить антикоррозийный слой. На зиму используйте чехлы или храните мебель в сухом помещении, минимизируя контакт с влагой.</p>
          </section>

          <section className='mt-8 max-w-[820px] mx-auto text-[17px] leading-[1.8]'>
            <h2 className='text-secondary-foreground font-semibold text-xl'>Текстиль и подушки</h2>
            <p className='text-gray-1-foreground mt-3'>Съёмные чехлы стирайте на деликатных режимах с мягкими средствами. Ткани с УФ‑защитой периодически обрабатывайте составами, сохраняющими цвет и плотность волокна. В межсезонье храните подушки в чехлах или закрытых боксах — это продлит срок службы и сохранит свежий вид.</p>
          </section>

          <section className='mt-8 max-w-[820px] mx-auto text-[17px] leading-[1.8]'>
            <h2 className='text-secondary-foreground font-semibold text-xl'>Rope и искусственный ротанг</h2>
            <p className='text-gray-1-foreground mt-3'>Материалы Rope и ротанг удобны в уходе и устойчивы к погоде. Для очистки достаточно мягкой щётки и воды с мылом. Такие конструкции не выгорают и не впитывают влагу, поэтому подходят для круглогодичного использования.</p>
          </section>

          <section className='mt-8 max-w-[820px] mx-auto text-[17px] leading-[1.8]'>
            <h2 className='text-secondary-foreground font-semibold text-xl'>Регламент обслуживания</h2>
            <ul className='list-disc pl-6 space-y-2 mt-3 mb-5'>
              <li className='text-gray-1-foreground'>Ежемесячно: лёгкая очистка поверхностей и текстиля.</li>
              <li className='text-gray-1-foreground'>Ежеквартально: проверка креплений, подтяжка соединений.</li>
              <li className='text-gray-1-foreground'>Сезонно: обработка дерева маслом/пропиткой, консервация и чехлы.</li>
            </ul>
          </section>

          <section className='mt-8 max-w-[820px] mx-auto text-[17px] leading-[1.8]'>
            <p className='text-gray-1-foreground'>Садовая мебель премиум‑класса создаёт атмосферу уюта и гармонии, а бережный уход делает её долговечной. Забота о материалах и регулярное обслуживание превращают покупку в долгосрочное вложение в дом, террасу или сад — каждый элемент радует глаз и служит годами.</p>
          </section>
        </div>

        <div className='hidden lg:block' />
      </div>
    </div>
  )
}

export default CarePremiumArticle


