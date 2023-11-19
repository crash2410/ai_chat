import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {ClerkProvider} from '@clerk/nextjs'
import {ModalProvider} from "@/components/modal-provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Genius',
  description: 'AI Chat',
}

/**
 * Компонент RootLayout является корневым макетом страницы.
 * Он принимает дочерние элементы в качестве свойства children и отображает их внутри ClerkProvider.
 * Внутри компонента также заданы язык документа, провайдер модальных окон и стили шрифта Inter.
 *
 * @param children - дочерние элементы, которые будут отображаться внутри компонента
 * @returns корневой макет страницы
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ClerkProvider>
        <html lang="en">
        <body className={inter.className}>
        <ModalProvider/>
        {children}
        </body>
        </html>
      </ClerkProvider>
  )
}
