"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/lib/reduxHooks'
import toast from 'react-hot-toast'


const CheckoutForm = () => {
    const products = useAppSelector((s) => s.addToCart.products)
    const { shippingType, shippingPrice } = useAppSelector((s) => s.order)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const data = new FormData(form)

        const name = String(data.get('name') || '')
        const phone = String(data.get('phone') || '')
        const email = String(data.get('email') || '')

        const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0)
        const shipping = shippingPrice
        const total = subtotal + shipping

        const orderPayload = {
            items: products.map((p) => ({ id: p.id, title: p.title, price: p.price, quantity: p.quantity, color: (p as any).color, size: (p as any).size })),
            customer: { name: name.trim(), email, phone },
            delivery: { type: shippingType, address: 'Москва, рабочий посёлок Заречье, Торговая ул., с2' },
            totals: { subtotal, shipping, total },
        }

        try {
            const res = await fetch('/api/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(orderPayload) })
            const json = await res.json()
            if (res.ok && json?.success) { toast.success('Заказ отправлен!'); form.reset() } else { toast.error(json?.message || 'Не удалось отправить заказ') }
        } catch (err) { toast.error('Ошибка сети при отправке заказа') }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='mt-10'>
                <div className='flex flex-col gap-7.5'>
                    <div>
                        <label htmlFor="name" className='text-gray-1-foreground w-full text-base'>Имя<span className='text-red-400'>*</span>
                            <Input className={"border-[1.5px] border-[#999796] text-base text-gray-1-foreground font-medium py-3 mt-2.5"} type={"text"} name={"name"} id='name' required />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="phone" className='text-gray-1-foreground w-full text-base'>Телефон<span className='text-red-400'>*</span>
                            <Input className={"border-[1.5px] border-[#999796] text-base text-gray-1-foreground font-medium py-3 mt-2.5"} type={"tel"} name={"phone"} id='phone' required />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="email" className='text-gray-1-foreground w-full text-base'>Email адрес
                            <Input className={"border-[1.5px] border-[#999796] text-base text-gray-1-foreground font-medium py-3 mt-2.5"} type={"email"} name={"email"} id='email' />
                        </label>
                    </div>
                </div>
                <Button type="submit"  className="w-full mt-5 lg:px-6 lg:py-3 lg:text-lg">Отправить заказ</Button>
                {/* {state?.message && <p className="mt-4 text-green-600 text-center">{state.message}</p>} */}
            </form>
        </div>
    )
}

export default CheckoutForm