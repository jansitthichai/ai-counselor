'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FaHome,
  FaComments,
  FaChartLine,
  FaHeart,
  FaHandHoldingHeart,
  FaInfoCircle,
} from 'react-icons/fa'
import { APP_CONFIG } from '../../lib/constants'

const DESKTOP_LINKS = [
  { href: '/', label: 'หน้าแรก', icon: FaHome },
  { href: '/chat', label: 'เพื่อน AI', icon: FaComments },
  { href: '/insight', label: 'ภาพรวมอารมณ์', icon: FaChartLine },
  { href: '/wellness', label: 'ศูนย์สุขภาวะ', icon: FaHeart },
  { href: '/emergency', label: 'ฉุกเฉิน', icon: FaHandHoldingHeart },
  { href: '/about', label: 'เกี่ยวกับ', icon: FaInfoCircle },
]

const MOBILE_LINKS = [
  { href: '/', label: 'หน้าแรก', icon: FaHome },
  { href: '/chat', label: 'เพื่อน AI', icon: FaComments },
  { href: '/insight', label: 'ภาพรวม', icon: FaChartLine },
  { href: '/wellness', label: 'สุขภาวะ', icon: FaHeart },
  { href: '/emergency', label: 'ฉุกเฉิน', icon: FaHandHoldingHeart },
]

function linkClass(active: boolean) {
  return active
    ? 'text-brand-700 font-semibold'
    : 'text-slate-600 hover:text-brand-700'
}

export default function SiteNav() {
  const pathname = usePathname()
  const hideMobile = pathname === '/chat'

  return (
    <>
      <nav className="hidden md:block bg-white/85 backdrop-blur border-b border-brand-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex flex-col leading-tight max-w-md">
              <span className="text-xl font-bold text-brand-700 tracking-tight">
                {APP_CONFIG.shortName}
              </span>
              <span className="text-[11px] text-slate-500 line-clamp-2">
                {APP_CONFIG.tagline}
              </span>
            </Link>
            <div className="flex items-center gap-5 text-sm">
              {DESKTOP_LINKS.map(({ href, label, icon: Icon }) => {
                const active =
                  href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-1.5 transition-colors ${linkClass(active)}`}
                  >
                    <Icon className="text-sm" />
                    <span>{label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      <div className="md:hidden bg-white/95 border-b border-brand-100 sticky top-0 z-50">
        <div className="px-4 py-3 text-center">
          <Link href="/">
            <div className="text-lg font-bold text-brand-700">{APP_CONFIG.shortName}</div>
            <div className="text-[10px] text-slate-500 line-clamp-2 px-2">
              {APP_CONFIG.tagline}
            </div>
          </Link>
        </div>
      </div>

      {!hideMobile && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 border-t border-brand-100 z-50 backdrop-blur">
          <div className="grid grid-cols-5 h-16">
            {MOBILE_LINKS.map(({ href, label, icon: Icon }) => {
              const active =
                href === '/' ? pathname === '/' : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex flex-col items-center justify-center text-[10px] gap-0.5 ${linkClass(active)}`}
                >
                  <Icon className="text-lg" />
                  <span>{label}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      )}
    </>
  )
}
