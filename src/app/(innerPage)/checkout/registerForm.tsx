'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import SocialLoginButtons from './socialLoginButtons'

const RegisterForm = () => {
    const [open, setOpen] = useState<boolean>(false)

    let isLogin = false
    const handleSingup = () => {
        if (isLogin) {
            setOpen(false)
        }
    }
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <div className='flex items-center gap-2.5 mt-5'>
                <input
                    type="checkbox"
                    checked={open}
                    onChange={(e) => setOpen(e.target.checked)}
                    id="extra" 
                    className="rounded-[4px] border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
                />
                <Label htmlFor="extra" className="text-base text-secondary-foreground">Создать аккаунт?</Label>
            </div>
            <DialogContent className='max-w-[550px] justify-center'>
                <DialogTitle className='hidden'></DialogTitle>
                <div className='border border-black bg-background p-7.5 max-w-[500px] rounded-lg'>
                    <p className='text-base text-gray-3-foreground mb-5'>Если вы уже делали покупки у нас, введите ваши данные ниже. Если вы новый клиент, перейдите к разделу оформления заказа.</p>
                    <form action="">
                        <Label htmlFor='name' className='text-gray-1-foreground text-base block mb-5'>
                            Имя<span className='text-red-400'>*</span>
                            <Input type='text' name='name' id='name' required className='py-3 px-5 border-[#999796] border-[1.5px] placeholder:text-[#999796] text-gray-1-foreground mt-2.5' />
                        </Label>
                        <Label htmlFor='register_email' className='text-gray-1-foreground text-base block mb-5'>
                            Email<span className='text-red-400'>*</span>
                            <Input type='email' name='email' id='register_email' required className='py-3 px-5 border-[#999796] border-[1.5px] placeholder:text-[#999796] text-gray-1-foreground mt-2.5' />
                        </Label>
                        <Label htmlFor='password' className='text-gray-1-foreground text-base block mb-5'>
                            Пароль<span className='text-red-400'>*</span>
                            <Input type='password' name='password' id='password' required className='py-3 px-5 border-[#999796] border-[1.5px] placeholder:text-[#999796] text-gray-1-foreground mt-2.5' />
                        </Label>
                        <Button onClick={handleSingup} className='w-full lg:py-[11px] lg:text-lg mt-7.5'>Регистрация</Button>
                    </form>
                    <SocialLoginButtons />
                    <p className='text-center mt-5 text-base text-gray-1-foreground'>
                        Уже есть аккаунт? <Link href={"/login"} className='text-secondary-foreground font-medium'>Войти</Link>
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RegisterForm