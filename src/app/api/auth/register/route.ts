import { NextResponse } from 'next/server'
import { bitrix24 } from '@/lib/bitrix24'

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

export async function POST(request: Request) {
  try {
    const data: RegisterData = await request.json()
    
    // Валидация данных
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.password) {
      return NextResponse.json(
        { message: 'Все поля обязательны' },
        { status: 400 }
      )
    }

    // Проверка email
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      return NextResponse.json(
        { message: 'Некорректный email' },
        { status: 400 }
      )
    }

    // Проверка пароля
    if (data.password.length < 6) {
      return NextResponse.json(
        { message: 'Пароль должен содержать минимум 6 символов' },
        { status: 400 }
      )
    }

    // Создаем контакт в Битрикс24
    try {
      await bitrix24.createContact({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: ''
      })
      
      console.log('Контакт успешно создан в Битрикс24')
    } catch (bitrixError) {
      console.error('Ошибка создания контакта в Битрикс24:', bitrixError)
      // Не прерываем регистрацию, если Битрикс24 недоступен
    }

    // В реальном проекте здесь будет:
    // 1. Хеширование пароля
    // 2. Сохранение в базу данных
    // 3. Отправка email подтверждения
    // 4. Создание JWT токена

    return NextResponse.json({ 
      success: true,
      message: 'Аккаунт успешно создан' 
    })

  } catch (error) {
    console.error('Error during registration:', error)
    return NextResponse.json(
      { message: 'Ошибка сервера' },
      { status: 500 }
    )
  }
}
