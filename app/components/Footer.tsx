'use client'

import { usePathname } from 'next/navigation'
import { APP_CONFIG } from '../../lib/constants'

export default function Footer() {
  const pathname = usePathname()
  if (pathname === '/chat') return null

  return (
    <footer className="bg-white/70 border-t border-slate-200 py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-1">
        <p className="text-sm font-semibold text-teal-800">
          {APP_CONFIG.shortName} · {APP_CONFIG.tagline}
        </p>
        <p className="text-xs md:text-sm text-slate-600 font-sarabun">
          โครงงานคอมพิวเตอร์ · {APP_CONFIG.author} · Version {APP_CONFIG.version}
        </p>
        <p className="text-xs text-slate-500 font-sarabun">
          เด็กชายภูริพัฒน์ ขุราศี, เด็กหญิงปรัสวีร์ โคเวียง, เด็กหญิงปรินดา ทิพย์สิงห์ ·
          ครูที่ปรึกษา: นายสิทธิชัย ทิพย์สิงห์, นางสาวกฤติยา พลหาญ
        </p>
      </div>
    </footer>
  )
}
