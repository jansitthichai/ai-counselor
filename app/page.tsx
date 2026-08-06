'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { APP_CONFIG, PLATFORM_MODULES } from '../lib/constants'

const featured = PLATFORM_MODULES.filter((m) =>
  ['/chat', '/emotion', '/insight', '/recommendations', '/emergency', '/phq9'].includes(
    m.href
  )
)

export default function Home() {
  return (
    <div className="space-y-10 md:space-y-14">
      <section className="relative overflow-hidden rounded-3xl border border-teal-100 bg-white/70 px-6 py-12 md:px-12 md:py-16">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,#99f6e4,transparent_40%),radial-gradient(circle_at_80%_0%,#bfdbfe,transparent_35%)]" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-3xl"
        >
          <p className="text-sm font-semibold tracking-wide text-teal-700 mb-3">
            Version {APP_CONFIG.version}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-sarabun leading-tight">
            {APP_CONFIG.name}
          </h1>
          <p className="mt-4 text-slate-600 md:text-lg leading-relaxed">
            {APP_CONFIG.description} — จากแชตบอตสู่แพลตฟอร์มสุขภาวะทางอารมณ์
            ด้วย Agentic AI ที่วิเคราะห์อารมณ์ แนะนำกิจกรรม และเชื่อมต่อความช่วยเหลือ
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/chat"
              className="inline-flex items-center rounded-xl bg-teal-700 px-5 py-3 text-white font-medium hover:bg-teal-800"
            >
              เริ่ม AI Companion
            </Link>
            <Link
              href="/wellness"
              className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-700 font-medium hover:border-teal-400"
            >
              เปิด Wellness Hub
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
              className="rounded-2xl border border-slate-200 bg-white/80 p-5 hover:border-teal-300 transition-colors"
            >
              <h3 className="text-lg font-semibold text-slate-800">{mod.title}</h3>
              <p className="mt-2 text-sm text-slate-600 min-h-[40px]">{mod.desc}</p>
              <Link
                href={mod.href}
                className="mt-4 inline-flex text-sm font-medium text-teal-700 hover:text-teal-900"
              >
                เปิดใช้งาน →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-900 text-slate-100 p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-2">Agentic AI ในหนึ่งข้อความ</h2>
        <p className="text-slate-300 text-sm md:text-base mb-4">
          เมื่อพิมพ์ว่า “ผมสอบตกครับ” ระบบจะวิเคราะห์อารมณ์ บันทึก mood แนะนำกิจกรรม/บทความ
          และแสดงช่องทางช่วยเหลือเมื่อเหมาะสม — อัตโนมัติ
        </p>
        <Link
          href="/chat"
          className="inline-flex rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-teal-400"
        >
          ลองสนทนากับ Agent
        </Link>
      </section>
    </div>
  )
}
