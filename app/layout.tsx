import type { Metadata } from 'next'
import { Inter, Sarabun } from 'next/font/google'
import './globals.css'
import { FaHome, FaComments, FaChartLine, FaBook, FaGamepad, FaHandHoldingHeart, FaClipboardList } from 'react-icons/fa'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })
const sarabun = Sarabun({ 
  subsets: ['thai', 'latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-sarabun'
})

export const metadata: Metadata = {
  title: 'AI เพื่อนที่ปรึกษา',
  description: 'AI เพื่อนที่ปรึกษาสำหรับการสนับสนุนทางอารมณ์และการให้คำแนะนำ',
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

          <footer className="hidden md:block bg-white border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <p className="text-center text-gray-500">© 2024-2025 AI เพื่อนที่ปรึกษา. All rights reserved.</p>
              <p className="text-center text-gray-500 mt-2">โครงงานคอมพิวเตอร์ โรงเรียนสตรีศึกษา</p>
              <p className="text-center text-gray-400 text-sm mt-1">AI เพื่อนที่ปรึกษา อาจมีข้อผิดพลาดควรตรวจสอบข้อมูลสำคัญและอ่อนไหว</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 