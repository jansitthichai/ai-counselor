'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { APP_CONFIG, PLATFORM_MODULES } from '../lib/constants'
import BrandLogo from './components/BrandLogo'

const featured = PLATFORM_MODULES.filter((m) =>
  ['/chat', '/emotion', '/insight', '/recommendations', '/help', '/phq9'].includes(
    m.href
  )
)

const moduleTint: Record<string, string> = {
  '/chat': 'hover:border-brand-300 border-brand-100 bg-gradient-to-br from-white to-brand-50/40',
  '/emotion': 'hover:border-sky-300 border-sky-100 bg-gradient-to-br from-white to-sky-50/50',
  '/insight': 'hover:border-sky-300 border-sky-100 bg-gradient-to-br from-white to-sky-50/40',
  '/recommendations':
    'hover:border-brand-300 border-brand-100 bg-gradient-to-br from-white to-brand-50/30',
  '/help':
    'hover:border-coral-300 border-coral-100 bg-gradient-to-br from-white to-coral-50/50',
  '/phq9': 'hover:border-amber-300 border-amber-100 bg-gradient-to-br from-white to-amber-50/50',
}

const moduleImage: Record<string, string> = {
  '/chat': '/modules/chat.png',
  '/emotion': '/modules/emotion.png',
  '/insight': '/modules/insight.png',
  '/recommendations': '/modules/recommendations.png',
  '/help': '/modules/help.png',
  '/phq9': '/modules/phq9.png',
}

const moduleButton: Record<string, string> = {
  '/chat': 'bg-brand-600 hover:bg-brand-700 text-white',
  '/emotion': 'bg-sky-500 hover:bg-sky-600 text-white',
  '/insight': 'bg-sky-600 hover:bg-sky-700 text-white',
  '/recommendations': 'bg-emerald-500 hover:bg-emerald-600 text-white',
  '/help': 'bg-coral-400 hover:bg-coral-500 text-white',
  '/phq9': 'bg-amber-500 hover:bg-amber-600 text-white',
}

export default function Home() {
  return (
    <div className="space-y-10 md:space-y-14">
      <section className="relative overflow-hidden rounded-3xl border border-brand-100 bg-white/70 px-6 py-12 md:px-12 md:py-16 shadow-sm">
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_15%_20%,#99f6e4,transparent_42%),radial-gradient(circle_at_85%_10%,#bae6fd,transparent_38%),radial-gradient(circle_at_70%_90%,#fecdd3,transparent_40%)]" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <BrandLogo size={64} className="!rounded-3xl shadow-md" />
            <p className="text-sm font-semibold tracking-wide text-brand-700">
              Version {APP_CONFIG.version} · เพื่อนสุขภาวะทางอารมณ์
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 font-sarabun leading-tight">
            {APP_CONFIG.name}
          </h1>
          <p className="mt-4 text-slate-600 md:text-lg leading-relaxed">
            {APP_CONFIG.description} — จากแชตบอตสู่แพลตฟอร์มสุขภาวะทางอารมณ์
            ด้วย Agentic AI ที่วิเคราะห์อารมณ์ แนะนำกิจกรรม และเชื่อมต่อความช่วยเหลือ
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/chat"
              className="inline-flex items-center rounded-2xl bg-brand-600 px-5 py-3 text-white font-medium shadow-sm hover:bg-brand-700 transition-colors"
            >
              เริ่มคุยกับเพื่อนคู่ใจ
            </Link>
            <Link
              href="/wellness"
              className="inline-flex items-center rounded-2xl border border-brand-200 bg-white/90 px-5 py-3 text-brand-800 font-medium hover:border-brand-400 hover:bg-brand-50 transition-colors"
            >
              เปิดศูนย์สุขภาวะ
            </Link>
          </div>
        </motion.div>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800 font-sarabun mb-4">
          โมดูลหลัก
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((mod, i) => (
            <motion.div
              key={mod.href}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`relative overflow-hidden rounded-2xl border p-5 transition-colors ${
                moduleTint[mod.href] ||
                'border-slate-200 bg-white/80 hover:border-brand-300'
              }`}
            >
              {moduleImage[mod.href] && (
                <Image
                  src={moduleImage[mod.href]}
                  alt=""
                  width={96}
                  height={96}
                  className="pointer-events-none absolute -right-2 -bottom-2 opacity-[0.28] select-none"
                  aria-hidden="true"
                />
              )}
              <h3 className="relative text-lg font-semibold text-slate-800">{mod.title}</h3>
              <p className="relative mt-2 text-sm text-slate-600 min-h-[40px]">{mod.desc}</p>
              <Link
                href={mod.href}
                className={`mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition-colors ${
                  moduleButton[mod.href] ||
                  'bg-brand-600 hover:bg-brand-700 text-white'
                }`}
              >
                เปิดใช้งาน
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-sky-100 bg-gradient-to-br from-brand-50 via-white to-sky-50 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Agentic AI ในหนึ่งข้อความ
        </h2>
        <p className="text-slate-600 text-sm md:text-base mb-4">
          เมื่อพิมพ์ว่า “ผมสอบตกครับ” ระบบจะวิเคราะห์อารมณ์ บันทึก mood แนะนำกิจกรรม/บทความ
          และแสดงช่องทางช่วยเหลือเมื่อเหมาะสม — อัตโนมัติ
        </p>
        <Link
          href="/chat"
          className="inline-flex rounded-xl bg-coral-400 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-coral-500 transition-colors"
        >
          ลองสนทนากับเพื่อนคู่ใจ
        </Link>
      </section>
    </div>
  )
}
