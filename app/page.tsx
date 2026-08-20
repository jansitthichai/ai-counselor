'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { APP_CONFIG } from '../lib/constants'
import BrandLogo from './components/BrandLogo'

const featuredModules = [
  {
    href: '/chat',
    title: 'เพื่อนคู่ใจมายด์แคร์',
    desc: 'เพื่อน AI แสนอบอุ่น ให้การรับฟังและแนะนำอัตโนมัติ',
    image: '/modules/chat.png',
    card: 'border-[#b2ebf2] bg-[#e0f7fa]/border-2 hover:border-[#4dd0e1]',
    button: 'bg-[#26a69a] hover:bg-[#00897b] text-white',
  },
  {
    href: '/emotion',
    title: 'วิเคราะห์อารมณ์',
    desc: 'วิเคราะห์อารมณ์จากข้อความ',
    image: '/modules/emotion.png',
    card: 'border-[#bbdefb] bg-[#e3f2fd]/border-2 hover:border-[#64b5f6]',
    button: 'bg-[#42a5f5] hover:bg-[#1e88e5] text-white',
  },
  {
    href: '/phq9',
    title: 'คัดกรองสุขภาพจิต',
    desc: 'คัดกรองเบื้องต้นด้วย PHQ-9',
    image: '/modules/phq9.png',
    card: 'border-[#ffe0b2] bg-[#fff8e1]/border-2 hover:border-[#ffb74d]',
    button: 'bg-[#fb8c00] hover:bg-[#ef6c00] text-white',
  },
  {
    href: '/recommendations',
    title: 'คำแนะนำจาก AI',
    desc: 'แนะนำเทคนิคดี ๆ รับมืออารมณ์',
    image: '/modules/recommendations.png',
    card: 'border-[#b2dfdb] bg-[#e0f2f1]/border-2 hover:border-[#4db6ac]',
    button: 'bg-[#00897b] hover:bg-[#00695c] text-white',
  },
  {
    href: '/insight',
    title: 'ภาพรวมอารมณ์',
    desc: 'กราฟแสดงแนวโน้มอารมณ์ตลอดช่วงเวลา',
    image: '/modules/insight.png',
    card: 'border-[#bbdefb] bg-[#e3f2fd]/border-2 hover:border-[#64b5f6]',
    button: 'bg-[#42a5f5] hover:bg-[#1e88e5] text-white',
  },
  {
    href: '/help',
    title: 'ขอความช่วยเหลือ',
    desc: 'คุยและขอความช่วยเหลือจากผู้เชี่ยวชาญ',
    image: '/modules/help.png',
    card: 'border-[#f8bbd0] bg-[#fce4ec]/border-2 hover:border-[#f06292]',
    button: 'bg-[#ec407a] hover:bg-[#d81b60] text-white',
  },
]

export default function Home() {
  return (
    <div className="space-y-10 md:space-y-14">
      <section className="relative overflow-hidden rounded-3xl border border-brand-100 bg-white/70 px-6 py-12 md:px-12 md:py-16 shadow-sm">
        <div className="absolute inset-0 opacity-55 bg-[radial-gradient(circle_at_15%_20%,#bbdefb,transparent_42%),radial-gradient(circle_at_85%_10%,#e1bee7,transparent_38%),radial-gradient(circle_at_70%_90%,#f8bbd0,transparent_40%)]" />
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
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a237e] font-sarabun leading-tight">
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
          {featuredModules.map((mod, i) => (
            <motion.div
              key={mod.href}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex flex-col rounded-2xl p-5 shadow-sm transition-colors ${mod.card}`}
            >
              <Image
                src={mod.image}
                alt=""
                width={72}
                height={72}
                className="mb-3 drop-shadow-sm"
              />
              <h3 className="text-lg font-semibold text-slate-800">{mod.title}</h3>
              <p className="mt-1.5 text-sm text-slate-600 flex-1 min-h-[40px]">{mod.desc}</p>
              <Link
                href={mod.href}
                className={`mt-4 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition-colors ${mod.button}`}
              >
                เริ่มใช้งาน
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-coral-50 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-[#1a237e] mb-2">
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
