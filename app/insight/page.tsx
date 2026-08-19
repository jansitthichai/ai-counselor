'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  EmotionLog,
  loadEmotionLog,
  weeklyAggregates,
} from '../../lib/wellbeing-storage'

function Bar({
  label,
  value,
  color,
  icon,
}: {
  label: string
  value: number
  color: string
  icon: string
}) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-700">
          {icon} {label}
        </span>
        <span className="font-semibold text-slate-800">{value}%</span>
      </div>
      <div className="h-4 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.min(100, value)}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

function riskBadge(level: number) {
  if (level <= 1) return { text: 'ปกติ', cls: 'bg-green-100 text-green-700' }
  if (level <= 2) return { text: 'เฝ้าระวัง', cls: 'bg-amber-100 text-amber-700' }
  return { text: 'ต้องดูแล', cls: 'bg-red-100 text-red-700' }
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
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 font-sarabun">
          📊 ภาพรวมอารมณ์
        </h1>
        <p className="text-slate-600 mt-2">
          สรุปแนวโน้มสุขภาวะทางอารมณ์ของคุณใน 7 วันล่าสุด
        </p>
      </div>

      <section className="rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/40 p-6 space-y-5">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📈</span>
          <h2 className="font-semibold text-slate-800 text-lg">
            รายงานประจำสัปดาห์
          </h2>
        </div>
        <p className="text-sm text-slate-500">
          จากบันทึก <strong className="text-slate-700">{week.count}</strong> รายการใน 7 วันล่าสุด
          (ข้อมูลเก็บในเครื่องของคุณเท่านั้น)
        </p>

        <div className="space-y-4">
          <Bar label="ระดับความเครียด" value={week.stress} color="#f59e0b" icon="😰" />
          <Bar label="ระดับความสุข" value={week.happiness} color="#14b8a6" icon="😊" />
          <Bar label="คุณภาพการนอน (ประมาณการ)" value={week.sleep} color="#6366f1" icon="😴" />
        </div>

        {week.count === 0 && (
          <div className="rounded-xl bg-sky-50 border border-sky-100 p-4 text-center">
            <p className="text-sm text-sky-800">
              💭 ยังไม่มีข้อมูล — ลองคุยกับ<strong>เพื่อนคู่ใจ</strong>หรือใช้<strong>วิเคราะห์อารมณ์</strong>เพื่อเริ่มเก็บข้อมูล
            </p>
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🗓️</span>
          <h2 className="font-semibold text-slate-800 text-lg">บันทึกล่าสุด</h2>
        </div>

        {logs.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-6">
            ยังไม่มีบันทึก
          </p>
        ) : (
          <div className="space-y-2 max-h-80 overflow-auto">
            {logs.slice(0, 20).map((l) => {
              const badge = riskBadge(l.riskLevel)
              return (
                <div
                  key={l.id}
                  className="flex items-center justify-between text-sm border-b border-slate-100 py-2.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-800">{l.thaiLabel}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge.cls}`}
                    >
                      {badge.text}
                    </span>
                  </div>
                  <span className="text-slate-400 text-xs">
                    {new Date(l.createdAt).toLocaleDateString('th-TH', {
                      day: 'numeric',
                      month: 'short',
                      year: '2-digit',
                    })}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
