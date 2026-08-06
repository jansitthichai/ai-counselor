'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { AgentResult } from '../../lib/wellbeing-types'
import { appendEmotionLog } from '../../lib/wellbeing-storage'

export default function EmotionPage() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<(AgentResult & { happinessProxy?: number; sleepProxy?: number }) | null>(null)
  const [error, setError] = useState('')

  const analyze = async () => {
    if (!text.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'วิเคราะห์ไม่สำเร็จ')
      setResult(data)
      appendEmotionLog({
        primary: data.emotion.primary,
        thaiLabel: data.emotion.thaiLabel,
        stressScore: data.stress.score,
        riskLevel: data.risk.level,
        happinessProxy: data.happinessProxy ?? 50,
        sleepProxy: data.sleepProxy ?? 50,
        source: 'emotion-page',
        createdAt: new Date().toISOString(),
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-sarabun">AI Emotion Analysis</h1>
        <p className="text-slate-600 mt-1 text-sm">
          Emotion Classification / Sentiment Analysis จากข้อความ — ไม่ใช่การวินิจฉัยโรค
        </p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="พิมพ์ความรู้สึก เช่น วันนี้สอบตก รู้สึกเครียดมาก..."
        className="w-full rounded-2xl border border-slate-300 p-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <button
        onClick={analyze}
        disabled={loading || !text.trim()}
        className="rounded-xl bg-teal-700 text-white px-5 py-2.5 font-medium disabled:opacity-50"
      >
        {loading ? 'กำลังวิเคราะห์...' : 'วิเคราะห์อารมณ์'}
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {result && (
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
          <div>
            <p className="text-sm text-slate-500">อารมณ์หลัก</p>
            <p className="text-2xl font-semibold text-teal-800">
              {result.emotion.thaiLabel}{' '}
              <span className="text-sm font-normal text-slate-500">
                ({Math.round(result.emotion.confidence * 100)}% confidence)
              </span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-amber-50 p-3">
              <p className="text-amber-800 font-medium">Stress Detection</p>
              <p className="text-amber-900 mt-1">
                {result.stress.level.toUpperCase()} · {result.stress.score}/100
              </p>
            </div>
            <div className="rounded-xl bg-rose-50 p-3">
              <p className="text-rose-800 font-medium">AI Risk Level</p>
              <p className="text-rose-900 mt-1">
                {result.risk.level.toUpperCase()} · {result.risk.score}/100
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500">{result.risk.disclaimer}</p>
          <div>
            <p className="font-medium text-slate-800 mb-2">คำแนะนำดูแลตนเอง</p>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              {result.risk.selfCareTips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <Link href="/recommendations" className="text-teal-700 text-sm font-medium">
            ดู AI Recommendation →
          </Link>
        </div>
      )}
    </div>
  )
}
