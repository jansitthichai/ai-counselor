import type { Metadata } from 'next'
import { Sarabun, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import Footer from './components/Footer'
import SiteNav from './components/SiteNav'
import { APP_CONFIG } from '../lib/constants'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-source',
})

const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-sarabun',
})

export const metadata: Metadata = {
  title: {
    default: `${APP_CONFIG.name} — ${APP_CONFIG.tagline}`,
    template: `%s | ${APP_CONFIG.name}`,
  },
  description: APP_CONFIG.description,
  keywords: [
    'MindCare',
    'สุขภาวะทางอารมณ์',
    'สุขภาพจิตนักเรียน',
  ],
  authors: [{ name: APP_CONFIG.author }],
  creator: APP_CONFIG.author,
  publisher: APP_CONFIG.author,
  metadataBase: new URL('https://mindcare-ai.vercel.app'),
  openGraph: {
    title: `${APP_CONFIG.name} — ${APP_CONFIG.tagline}`,
    description: APP_CONFIG.description,
    url: 'https://mindcare-ai.vercel.app',
    siteName: APP_CONFIG.name,
    locale: 'th_TH',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body
        className={`${sourceSans.variable} ${sarabun.variable} font-sans antialiased`}
      >
        <div className="min-h-screen bg-mindcare pb-16 md:pb-0">
          <SiteNav />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
