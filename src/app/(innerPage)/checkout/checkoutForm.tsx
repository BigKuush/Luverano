"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import RegisterForm from './registerForm'
import { useAppSelector } from '@/lib/reduxHooks'
import toast from 'react-hot-toast'


const CheckoutForm = () => {
    const products = useAppSelector((s) => s.addToCart.products)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const data = new FormData(form)

        const firstName = String(data.get('first_name') || '')
        const lastName = String(data.get('last_name') || '')
        const email = String(data.get('email') || '')
        const phone = String(data.get('phone') || '')
        const country = String(data.get('country') || '')
        const town = String(data.get('town') || '')
        const street = String(data.get('street') || '')
        const zip = String(data.get('zip') || '')

        const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0)
        const shipping = 0
        const total = subtotal + shipping

        const orderPayload = {
            items: products.map((p) => ({ id: p.id, title: p.title, price: p.price, quantity: p.quantity, color: (p as any).color, size: (p as any).size })),
            customer: { name: `${firstName} ${lastName}`.trim(), email, phone },
            delivery: { type: 'free' as const, address: `${country ? country + ', ' : ''}${town ? town + ', ' : ''}${street ? street + ', ' : ''}${zip}`.replace(/,\s*$/, '') },
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
                    <div className='flex sm:flex-row flex-col justify-between gap-x-[22px] gap-y-7.5'>
                        <label htmlFor="first_name" className='text-gray-1-foreground w-full text-base'>Имя<span className='text-red-400'>*</span>
                            <Input className={"border-[1.5px] border-[#999796] text-base text-gray-1-foreground font-medium py-3 mt-2.5"} type={"text"} name={"first_name"} id='first_name' required />
                        </label>
                        <label htmlFor="last_name" className='text-gray-1-foreground w-full text-base'>Фамилия<span className='text-red-400'>*</span>
                            <Input className={"border-[1.5px] border-[#999796] text-base text-gray-1-foreground font-medium py-3 mt-2.5"} type={"text"} name={"last_name"} id='last_name' required />
                        </label>
                    </div>
                    <div className='flex sm:flex-row flex-col justify-between gap-x-[22px] gap-y-7.5'>
                        <label htmlFor="email" className='text-gray-1-foreground w-full text-base'>Email адрес<span className='text-red-400'>*</span>
                            <Input className={"border-[1.5px] border-[#999796] text-base text-gray-1-foreground font-medium py-3 mt-2.5"} type={"email"} name={"email"} id='email' required />
                        </label>
                        <label htmlFor="phone" className='text-gray-1-foreground w-full text-base'>Телефон<span className='text-red-400'>*</span>
                            <Input className={"border-[1.5px] border-[#999796] text-base text-gray-1-foreground font-medium py-3 mt-2.5"} type={"number"} name={"phone"} id='phone' required />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="country" className='text-gray-1-foreground text-base'>Страна/Регион<span className='text-red-400'>*</span></label>
                        <Select name="country" required>
                            <SelectTrigger id="country" className='h-12.5 py-2.5 border-[1.5px] border-[#999796] text-base text-gray-1-foreground mt-2.5'>
                                <SelectValue placeholder="Выберите страну" />
                            </SelectTrigger>
                            <SelectContent className='py-[14px] bg-background '>
                                <SelectItem value="russia" className="cursor-pointer">Россия</SelectItem>
                                <SelectItem value="belarus" className="cursor-pointer">Беларусь</SelectItem>
                                <SelectItem value="kazakhstan" className="cursor-pointer">Казахстан</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label htmlFor="town" className='text-gray-1-foreground w-full text-base'>Город<span className='text-red-400'>*</span>
                            <Input className={"border-[1.5px] border-[#999796] text-base text-gray-1-foreground font-medium py-3 mt-2.5"} type={"text"} name={"town"} id='town' required />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="street" className='text-gray-1-foreground w-full text-base'>Адрес<span className='text-red-400'>*</span>
                            <Input className={"border-[1.5px] border-[#999796] text-base text-gray-1-foreground font-medium py-3 mt-2.5"} type={"text"} name={"street"} id='street' required />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="zip" className='text-gray-1-foreground w-full text-base'>Почтовый индекс<span className='text-red-400'>*</span>
                            <Input className={"border-[1.5px] border-[#999796] text-base text-gray-1-foreground font-medium py-3 mt-2.5"} type={"text"} name={"zip"} id='zip' required />
                        </label>
                    </div>
                    <label htmlFor="notes" className='text-gray-1-foreground w-full text-base'>Дополнительная информация (необязательно)
                        <Textarea className={"border-[1.5px] border-[#999796] text-base text-gray-1-foreground font-medium py-3 mt-2.5 min-h-[140px]"} name={"notes"} id='notes' />
                    </label>
                </div>
                <RegisterForm />
                <Button type="submit"  className="w-full mt-5 lg:px-6 lg:py-3 lg:text-lg">Отправить заказ</Button>
                {/* {state?.message && <p className="mt-4 text-green-600 text-center">{state.message}</p>} */}
            </form>
        </div>
    )
}

export default CheckoutForm