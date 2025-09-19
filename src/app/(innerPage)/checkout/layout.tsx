import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Оформление заказа - Luverano",
  description: "Оформление заказа на премиальную мебель для загородной жизни"
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
