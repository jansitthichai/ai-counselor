'use client'

import { useMemo, useState } from 'react'
import { MOTIVATION_QUOTES, getMotivation } from '../../lib/recommendations'

export default function MotivationPage() {
  const [seed, setSeed] = useState('')
  const quote = useMemo(() => getMotivation(seed || undefined), [seed])

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-sarabun">
          AI Motivation
        </h1>
        <p className="text-slate-600 text-sm mt-1">ข้อความสร้างกำลังใจสำหรับนักเรียน</p>
      </div>

      <div className="rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 to-sky-50 p-8 text-center">
        <p className="text-xl md:text-2xl text-slate-800 font-sarabun leading-relaxed">
          “{quote}”
        </p>
        <button
          onClick={() => setSeed(String(Date.now()))}
          className="mt-6 rounded-xl bg-brand-700 text-white px-5 py-2.5 text-sm font-medium"
        >
          สุ่มข้อความใหม่
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-800 mb-3">คลังกำลังใจ</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          {MOTIVATION_QUOTES.map((q) => (
            <li key={q} className="border-b border-slate-100 pb-2">
              {q}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
