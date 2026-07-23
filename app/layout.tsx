import type { Metadata } from 'next'
import './globals.css'
import { Inter, Oswald, Geist } from 'next/font/google'
import { cn } from "@/lib/utils";
import { Toast } from '@/components/Toast'
import { CompareProvider } from '@/components/compare/CompareContext'
import FloatingCompareButton from '@/components/compare/FloatingCompareButton'

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald'
})

export const metadata: Metadata = {
  title: 'Maruti Suzuki show room | Shirur',
  description:
    'Cars on affordable prices for low and middle class families. Buy your first car from us with well settled price.'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={cn("h-full", "antialiased", inter.variable, oswald.variable, "font-sans", geist.variable)}>
      <body className='min-h-full w-screen overflow-x-hidden' cz-shortcut-listen="true">
        <CompareProvider>
          {children}
          <FloatingCompareButton />
          <Toast />
        </CompareProvider>
      </body>
    </html>
  )
}
