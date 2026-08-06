'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  EmotionLog,
  loadEmotionLog,
  weeklyAggregates,
} from '../../lib/wellbeing-storage'

function Bar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-700">{label}</span>
        <span className="font-medium text-slate-800">{value}</span>
      </div>
      <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.min(100, value)}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export default function InsightPage() {
  const [logs, setLogs] = useState<EmotionLog[]>([])

  useEffect(() => {
    setLogs(loadEmotionLog())
  }, [])

  const week = useMemo(() => weeklyAggregates(logs), [logs])

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-sarabun">AI Insight</h1>
        <p className="text-slate-600 text-sm mt-1">
          กราฟแนวโน้มความเครียด ความสุข และการนอน + AI Weekly Report
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
        <h2 className="font-semibold text-slate-800">AI Weekly Report</h2>
        <p className="text-sm text-slate-500">
          จากบันทึก {week.count} รายการใน 7 วันล่าสุด (เก็บในเครื่องคุณ)
        </p>
        <Bar label="ความเครียด" value={week.stress} color="#f59e0b" />
        <Bar label="ความสุข" value={week.happiness} color="#14b8a6" />
        <Bar label="การนอน (ประมาณการ)" value={week.sleep} color="#6366f1" />
        {week.count === 0 && (
          <p className="text-sm text-slate-500">
            ยังไม่มีข้อมูล — ลองใช้ Emotion Analysis หรือ AI Companion ก่อน
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-800 mb-3">บันทึกล่าสุด</h2>
        <div className="space-y-2 max-h-80 overflow-auto">
          {logs.slice(0, 20).map((l) => (
            <div
              key={l.id}
              className="flex justify-between text-sm border-b border-slate-100 py-2"
            >
              <div>
                <span className="font-medium text-slate-800">{l.thaiLabel}</span>
                <span className="text-slate-500 ml-2">risk {l.riskLevel}</span>
              </div>
              <span className="text-slate-400 text-xs">
                {new Date(l.createdAt).toLocaleDateString('th-TH')}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
