'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const RegisterForm = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    })
    const [errors, setErrors] = useState<{[key: string]: string}>({})
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        
        // Очищаем ошибку при изменении поля
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {}

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'Имя обязательно'
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Фамилия обязательна'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email обязателен'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Некорректный email'
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Телефон обязателен'
        } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Некорректный номер телефона'
        }

        if (!formData.password) {
            newErrors.password = 'Пароль обязателен'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Пароль должен содержать минимум 6 символов'
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают'
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'Необходимо согласиться с условиями'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            // Здесь будет API запрос для регистрации
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password
                })
            })

            if (response.ok) {
                router.push('/login?message=registration-success')
            } else {
                const errorData = await response.json()
                setErrors({ submit: errorData.message || 'Ошибка регистрации' })
            }
        } catch (error) {
            setErrors({ submit: 'Ошибка соединения. Попробуйте позже.' })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container lg:pt-25 lg:pb-25 pt-15 pb-15">
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                        Создать аккаунт
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Имя *
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Введите имя"
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                                )}
                            </div>
                            
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Фамилия *
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Введите фамилию"
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Введите email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Телефон *
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.phone ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="+7 (999) 123-45-67"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Пароль *
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Минимум 6 символов"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Подтвердите пароль *
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Повторите пароль"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>

                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                id="agreeToTerms"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-700">
                                Я согласен с{' '}
                                <Link href="/terms" className="text-blue-600 hover:underline">
                                    условиями использования
                                </Link>{' '}
                                и{' '}
                                <Link href="/privacy" className="text-blue-600 hover:underline">
                                    политикой конфиденциальности
                                </Link>
                            </label>
                        </div>
                        {errors.agreeToTerms && (
                            <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>
                        )}

                        {errors.submit && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                {errors.submit}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Создание аккаунта...' : 'Создать аккаунт'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Уже есть аккаунт?{' '}
                            <Link href="/login" className="text-blue-600 hover:underline">
                                Войти
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm