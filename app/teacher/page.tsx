'use client'

import { useEffect, useMemo, useState } from 'react'
import { EmotionLog, loadEmotionLog, weeklyAggregates } from '../../lib/wellbeing-storage'

/**
 * Teacher Dashboard — shows anonymized aggregate trends only.
 * No student identity is stored or displayed.
 */
export default function TeacherDashboardPage() {
  const [logs, setLogs] = useState<EmotionLog[]>([])

  useEffect(() => {
    setLogs(loadEmotionLog())
  }, [])

  const week = useMemo(() => weeklyAggregates(logs), [logs])
  const riskCounts = useMemo(() => {
    const c = { low: 0, medium: 0, high: 0 }
    logs.slice(0, 50).forEach((l) => {
      if (l.riskLevel in c) c[l.riskLevel as keyof typeof c]++
    })
    return c
  }, [logs])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-sarabun">
          Teacher Dashboard
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          แนวโน้มอารมณ์แบบไม่ระบุตัวตน (Privacy by Design / PDPA) —
          ข้อมูลตัวอย่างมาจากบันทึกบนอุปกรณ์นี้เพื่อสาธิต
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="บันทึก (demo)" value={String(logs.length)} />
        <Stat label="ความเครียดเฉลี่ย" value={`${week.stress}`} />
        <Stat label="ความสุขเฉลี่ย" value={`${week.happiness}`} />
        <Stat label="การนอนเฉลี่ย" value={`${week.sleep}`} />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-800 mb-3">
          การกระจาย Risk Level (เบื้องต้น)
        </h2>
        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          <div className="rounded-xl bg-emerald-50 p-3">
            <p className="text-emerald-800 font-medium">Low</p>
            <p className="text-2xl font-bold text-emerald-900">{riskCounts.low}</p>
          </div>
          <div className="rounded-xl bg-amber-50 p-3">
            <p className="text-amber-800 font-medium">Medium</p>
            <p className="text-2xl font-bold text-amber-900">{riskCounts.medium}</p>
          </div>
          <div className="rounded-xl bg-rose-50 p-3">
            <p className="text-rose-800 font-medium">High</p>
            <p className="text-2xl font-bold text-rose-900">{riskCounts.high}</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-4">
          ไม่ใช่การวินิจฉัย — ใช้เพื่อเฝ้าระวังเชิงป้องกันและส่งต่อความช่วยเหลือเมื่อเหมาะสม
        </p>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
  )
}
