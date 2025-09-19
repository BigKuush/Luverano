import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import SocialLoginButtons from './socialLoginButtons'

const LoginForm = () => {
    return (
        <Dialog>
            <div className='text-gray-1-foreground inline'>
                Постоянный клиент? {" "}
                <DialogTrigger className='text-secondary-foreground multiline-hover '>
                    Войти в аккаунт
                </DialogTrigger> {" "}
            </div>
            <DialogContent className='max-w-[550px] justify-center'>
                <DialogTitle className='hidden'></DialogTitle>
                <div className='border border-black bg-background p-7.5 max-w-[500px] rounded-lg'>
                    <p className='text-base text-gray-3-foreground mb-5'>Если вы уже делали покупки у нас, введите ваши данные ниже. Если вы новый клиент, перейдите к разделу оформления заказа.</p>
                    <form action="">
                        <Label htmlFor='name' className='text-gray-1-foreground text-base block mb-5'>
                            Имя пользователя или email<span className='text-red-400'>*</span>
                            <Input type='text' name='name' id='name' required className='py-3 px-5 border-[#999796] border-[1.5px] placeholder:text-[#999796] text-gray-1-foreground mt-2.5' />
                        </Label>
                        <Label htmlFor='password' className='text-gray-1-foreground text-base block mb-5'>
                            Пароль<span className='text-red-400'>*</span>
                            <Input type='password' name='password' id='password' required className='py-3 px-5 border-[#999796] border-[1.5px] placeholder:text-[#999796] text-gray-1-foreground mt-2.5' />
                        </Label>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-2.5'>
                                <Checkbox id="id-rember" className="w-3 h-3 rounded-none border-primary [&_span]:w-2.5 [&_span]:h-2.5 data-[state=checked]:bg-primary data-[state=checked]:text-white" />
                                <Label htmlFor="id-rember" className="text-base text-gray-1-foreground">Запомнить меня</Label>
                            </div>
                            <Link href={"#"} className='text-base text-gray-1-foreground multiline-hover'>Забыли пароль?</Link>
                        </div>
                        <Button className='w-full lg:py-[11px] lg:text-lg mt-7.5'>Войти</Button>
                    </form>
                    <SocialLoginButtons />
                    <p className='text-center mt-5 text-base text-gray-1-foreground'>
                        Новый клиент? <Link href={"/register"} className='text-secondary-foreground font-medium'>Регистрация</Link>
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LoginForm