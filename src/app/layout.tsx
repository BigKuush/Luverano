import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";
import { generateOrganizationSchema } from "@/lib/schema";
// import WelcomePopup from "@/components/sections/welcomePopup";

const satoshi = localFont({
  src: [
    {
      path: '../font/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../font/Satoshi-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../font/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../font/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable:'--satoshi'
})


export const metadata: Metadata = {
  title: "Luverano - Премиальная мебель",
  description: "Luverano - премиальная мебель для вашего дома. Эксклюзивные коллекции мебели высочайшего качества.",
  keywords: ["мебель", "премиальная мебель", "дизайнерская мебель", "эксклюзивная мебель", "мебель для дома"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ru-RU",
    url: "https://luverano.ru",
    title: "Luverano - Премиальная мебель",
    description: "Премиальная мебель для вашего дома",
    siteName: "Luverano",
  },
  icons: {
    icon: [
      { url: '/favicon-l.svg?v=1', type: 'image/svg+xml' },
    ],
    shortcut: ['/favicon-l.svg?v=1']
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={`${satoshi.variable}`}
      >
        <StoreProvider>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </StoreProvider>
      </body>
    </html>
  );
}
