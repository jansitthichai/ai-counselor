import type { Metadata } from 'next'
import { Inter, Sarabun } from 'next/font/google'
import './globals.css'
import { FaHome, FaComments, FaChartLine, FaBook, FaGamepad, FaHandHoldingHeart, FaClipboardList } from 'react-icons/fa'
import Link from 'next/link'
import Footer from './components/Footer'


const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

const sarabun = Sarabun({ 
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-sarabun'
})

export const metadata: Metadata = {
  title: {
    default: 'AI เพื่อนที่ปรึกษา - เพื่อนที่ปรึกษาด้านสุขภาพจิต',
    template: '%s | AI เพื่อนที่ปรึกษา'
  },
  description: 'AI เพื่อนที่ปรึกษาสำหรับการสนับสนุนทางอารมณ์ การให้คำแนะนำ และการติดตามสุขภาพจิต พร้อมเกมคลายเครียดและบทความที่เป็นประโยชน์',
  keywords: ['AI', 'เพื่อนที่ปรึกษา', 'สุขภาพจิต', 'ความเครียด', 'โรคซึมเศร้า', 'เกมคลายเครียด', 'บทความสุขภาพ'],
  authors: [{ name: 'โรงเรียนสตรีศึกษา' }],
  creator: 'โรงเรียนสตรีศึกษา',
  publisher: 'โรงเรียนสตรีศึกษา',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ai-companion.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AI เพื่อนที่ปรึกษา - เพื่อนที่ปรึกษาด้านสุขภาพจิต',
    description: 'AI เพื่อนที่ปรึกษาสำหรับการสนับสนุนทางอารมณ์ การให้คำแนะนำ และการติดตามสุขภาพจิต',
    url: 'https://ai-companion.vercel.app',
    siteName: 'AI เพื่อนที่ปรึกษา',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI เพื่อนที่ปรึกษา',
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI เพื่อนที่ปรึกษา - เพื่อนที่ปรึกษาด้านสุขภาพจิต',
    description: 'AI เพื่อนที่ปรึกษาสำหรับการสนับสนุนทางอารมณ์ การให้คำแนะนำ และการติดตามสุขภาพจิต',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className={`${inter.className} ${sarabun.variable}`}>
        <div className="min-h-screen bg-gradient-to-b from-lavender-50 to-white pb-16 md:pb-0">
          {/* Desktop Navigation */}
          <nav className="hidden md:block bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <h1 className="text-xl font-bold text-lavender-600">AI เพื่อนที่ปรึกษา</h1>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <a href="/" className="flex items-center text-gray-600 hover:text-lavender-600 transition-colors">
                    <FaHome className="mr-2" />
                    <span>หน้าแรก</span>
                  </a>
                  <a href="/chat" className="flex items-center text-gray-600 hover:text-lavender-600 transition-colors">
                    <FaComments className="mr-2" />
                    <span>แชท</span>
                  </a>
                  <a href="/mood-tracker" className="flex items-center text-gray-600 hover:text-lavender-600 transition-colors">
                    <FaChartLine className="mr-2" />
                    <span>ติดตามอารมณ์</span>
                  </a>
                  <a href="/phq9" className="flex items-center text-gray-600 hover:text-lavender-600 transition-colors">
                    <FaClipboardList className="mr-2" />
                    <span>ประเมินภาวะซึมเศร้า</span>
                  </a>
                  <a href="/resources" className="flex items-center text-gray-600 hover:text-lavender-600 transition-colors">
                    <FaBook className="mr-2" />
                    <span>บทความ</span>
                  </a>
                  <a href="/games" className="flex items-center text-gray-600 hover:text-lavender-600 transition-colors">
                    <FaGamepad className="mr-2" />
                    <span>เกมคลายเครียด</span>
                  </a>
                  <a href="/help" className="flex items-center text-gray-600 hover:text-lavender-600 transition-colors">
                    <FaHandHoldingHeart className="mr-2" />
                    <span>ความช่วยเหลือ</span>
                  </a>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Header */}
          <div className="md:hidden bg-white shadow-sm sticky top-0 z-50">
            <div className="px-4 py-3">
              <h1 className="text-lg font-bold text-lavender-600 text-center">AI เพื่อนที่ปรึกษา</h1>
            </div>
          </div>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
            {children}
          </main>

          {/* Footer - ไม่แสดงในหน้าแชท */}
          <Footer />

          {/* Mobile Bottom Navigation */}
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
            <div className="grid grid-cols-7 h-16">
              <Link href="/" className="flex flex-col items-center justify-center text-gray-600 hover:text-lavender-600 transition-colors">
                <FaHome className="text-xl" />
                <span className="text-xs mt-1">หน้าแรก</span>
              </Link>
              <Link href="/chat" className="flex flex-col items-center justify-center text-gray-600 hover:text-lavender-600 transition-colors">
                <FaComments className="text-xl" />
                <span className="text-xs mt-1">แชท</span>
              </Link>
              <Link href="/mood-tracker" className="flex flex-col items-center justify-center text-gray-600 hover:text-lavender-600 transition-colors">
                <FaChartLine className="text-xl" />
                <span className="text-xs mt-1">อารมณ์</span>
              </Link>
              <Link href="/phq9" className="flex flex-col items-center justify-center text-gray-600 hover:text-lavender-600 transition-colors">
                <FaClipboardList className="text-xl" />
                <span className="text-xs mt-1">ประเมิน</span>
              </Link>
              <Link href="/resources" className="flex flex-col items-center justify-center text-gray-600 hover:text-lavender-600 transition-colors">
                <FaBook className="text-xl" />
                <span className="text-xs mt-1">บทความ</span>
              </Link>
              <Link href="/games" className="flex flex-col items-center justify-center text-gray-600 hover:text-lavender-600 transition-colors">
                <FaGamepad className="text-xl" />
                <span className="text-xs mt-1">เกม</span>
              </Link>
              <Link href="/help" className="flex flex-col items-center justify-center text-gray-600 hover:text-lavender-600 transition-colors">
                <FaHandHoldingHeart className="text-xl" />
                <span className="text-xs mt-1">ช่วยเหลือ</span>
              </Link>
            </div>
          </nav>


        </div>
      </body>
    </html>
  )
} 