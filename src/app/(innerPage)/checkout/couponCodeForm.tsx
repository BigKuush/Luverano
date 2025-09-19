import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const CouponCodeForm = () => {
    return (
        <Dialog>
            <div className='text-gray-1-foreground mt-2'>
                Есть промокод? {' '}
                <DialogTrigger className='text-secondary-foreground multiline-hover'>
                    Введите код здесь
                </DialogTrigger>
            </div>

            <DialogContent className='sm:rounded-none max-w-[550px] justify-center'>
                <DialogTitle className='hidden'></DialogTitle>
                <DialogDescription className='hidden'></DialogDescription>
                <div className='border border-black bg-background p-7.5'>
                    <p className='text-base text-gray-3-foreground'>Если у вас есть промокод, введите его ниже</p>
                    <div className='w-full flex items-center gap-2.5 mt-5'>
                        <Input type={"text"} placeholder={"Промокод"} className={"border-gray px-5 py-[14px]"} />
                        <Button  className="lg:px-6 lg:py-3 lg:text-lg">Применить</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CouponCodeForm