'use client'

import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  
  // ไม่แสดง footer ในหน้าแชท
  if (pathname === '/chat') {
    return null
  }

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs md:text-sm text-gray-600 font-sarabun">
            โครงงานคอมพิวเตอร์ เรื่อง AI เพื่อนที่ปรึกษา : โดย นางสาววริศรา นันยะนารถ, นางสาวธนาลักษณ์ ลาศา, นางสาวณัฐนันท์ ก่อเกียรติโกมล : ครูที่ปรึกษา นายสิทธิชัย ทิพย์สิงห์, นายเกียรติศักดิ์ ศรีเรือง
          </p>
        </div>
      </div>
    </footer>
  )
} 