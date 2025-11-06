import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { ReduxProvider } from '@/components/providers/redux-provider'
import { Navigation } from '@/components/layout/navigation'

const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Career Assistant - Your Personal Career Guide',
  description: 'A comprehensive career guidance platform that helps students and professionals explore careers, build resumes, practice interviews, and track their development journey.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={manrope.variable}>
        <ReduxProvider>
          <div className="relative flex min-h-screen w-full flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
          </div>
        </ReduxProvider>
      </body>
    </html>
  )
}

