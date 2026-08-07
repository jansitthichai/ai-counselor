'use client'

import Link from 'next/link'
import { PLATFORM_MODULES } from '../../lib/constants'

const buttonColors = [
  'bg-brand-600 hover:bg-brand-700 text-white',
  'bg-sky-500 hover:bg-sky-600 text-white',
  'bg-coral-400 hover:bg-coral-500 text-white',
  'bg-emerald-500 hover:bg-emerald-600 text-white',
  'bg-amber-500 hover:bg-amber-600 text-white',
  'bg-sky-600 hover:bg-sky-700 text-white',
  'bg-brand-500 hover:bg-brand-600 text-white',
  'bg-rose-400 hover:bg-rose-500 text-white',
  'bg-cyan-500 hover:bg-cyan-600 text-white',
  'bg-lime-500 hover:bg-lime-600 text-white',
  'bg-orange-400 hover:bg-orange-500 text-white',
  'bg-teal-500 hover:bg-teal-600 text-white',
]

const roleButtons = [
  'bg-brand-700 hover:bg-brand-800 text-white',
  'bg-sky-700 hover:bg-sky-800 text-white',
  'bg-slate-600 hover:bg-slate-700 text-white',
]

export default function WellnessHubPage() {
  const student = PLATFORM_MODULES.filter((m) => m.group !== 'role')
  const roles = PLATFORM_MODULES.filter((m) => m.group === 'role')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 font-sarabun">
          ศูนย์สุขภาวะ
        </h1>
        <p className="text-slate-600 mt-2">
          รวมเครื่องมือส่งเสริมสุขภาวะทางอารมณ์ของ STRMindCare
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {student.map((m, i) => (
          <div
            key={m.href}
            className="rounded-2xl border border-slate-200 bg-white/80 p-5 flex flex-col"
          >
            <h2 className="font-semibold text-slate-800">{m.title}</h2>
            <p className="text-sm text-slate-600 mt-2 flex-1">{m.desc}</p>
            <Link
              href={m.href}
              className={`mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition-colors ${
                buttonColors[i % buttonColors.length]
              }`}
            >
              เปิดใช้งาน
            </Link>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-3">
          สำหรับครู / ผู้ปกครอง / ผู้ดูแล
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {roles.map((m, i) => (
            <div
              key={m.href}
              className="rounded-2xl border border-brand-100 bg-brand-50/60 p-5 flex flex-col"
            >
              <h3 className="font-semibold text-brand-900">{m.title}</h3>
              <p className="text-sm text-brand-800/80 mt-2 flex-1">{m.desc}</p>
              <Link
                href={m.href}
                className={`mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition-colors ${
                  roleButtons[i % roleButtons.length]
                }`}
              >
                เปิดใช้งาน
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
