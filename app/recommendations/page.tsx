'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { RecommendationItem } from '../../lib/wellbeing-types'

const TYPE_LABEL: Record<string, string> = {
  music: 'เพลง',
  meditation: 'สมาธิ',
  book: 'หนังสือ',
  video: 'วิดีโอ',
  activity: 'กิจกรรม',
  article: 'บทความ',
  podcast: 'พอดแคสต์',
}

export default function RecommendationsPage() {
  const [text, setText] = useState('วันนี้เหนื่อยและเครียดจากงานสอบ')
  const [items, setItems] = useState<RecommendationItem[]>([])
  const [emotion, setEmotion] = useState('')
  const [loading, setLoading] = useState(false)

  const run = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const data = await res.json()
      setItems(data.recommendations || [])
      setEmotion(data.emotion?.thaiLabel || '')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-sarabun">
          AI Recommendation
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          แนะนำเพลง สมาธิ หนังสือ วิดีโอ กิจกรรม และบทความให้เหมาะกับอารมณ์
        </p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="w-full rounded-2xl border border-slate-300 p-4"
      />
      <button
        onClick={run}
        disabled={loading}
        className="rounded-xl bg-brand-700 text-white px-5 py-2.5 disabled:opacity-50"
      >
        {loading ? 'กำลังแนะนำ...' : 'สร้างคำแนะนำ'}
      </button>

      {emotion && (
        <p className="text-sm text-slate-600">
          อิงอารมณ์:{' '}
          <span className="font-semibold text-brand-800">{emotion}</span>
        </p>
      )}

      <div className="grid gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 flex justify-between gap-4"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                {TYPE_LABEL[item.type] || item.type}
              </span>
              <h2 className="font-semibold text-slate-800 mt-1">{item.title}</h2>
              <p className="text-sm text-slate-600 mt-1">{item.description}</p>
              <p className="text-xs text-slate-500 mt-2">{item.reason}</p>
            </div>
            {item.href && (
              <Link
                href={item.href}
                className="self-center shrink-0 text-sm font-medium text-brand-700"
              >
                เปิด →
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
