'use client'

import Link from 'next/link'
import { PLATFORM_MODULES } from '../../lib/constants'

export default function WellnessHubPage() {
  const student = PLATFORM_MODULES.filter((m) => m.group !== 'role')
  const roles = PLATFORM_MODULES.filter((m) => m.group === 'role')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 font-sarabun">
          Wellness Hub
        </h1>
        <p className="text-slate-600 mt-2">
          รวมเครื่องมือส่งเสริมสุขภาวะทางอารมณ์ของ MindCare
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {student.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="rounded-2xl border border-slate-200 bg-white/80 p-5 hover:border-brand-400 transition-colors"
          >
            <h2 className="font-semibold text-slate-800">{m.title}</h2>
            <p className="text-sm text-slate-600 mt-2">{m.desc}</p>
          </Link>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-3">สำหรับครู / ผู้ปกครอง / ผู้ดูแล</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {roles.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="rounded-2xl border border-slate-200 bg-brand-50/60 p-5 hover:border-brand-400"
            >
              <h3 className="font-semibold text-brand-900">{m.title}</h3>
              <p className="text-sm text-brand-800/80 mt-2">{m.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
