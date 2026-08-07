'use client'

import { useEffect, useState } from 'react'
import {
  JournalEntry,
  loadJournal,
  saveJournal,
} from '../../lib/wellbeing-storage'

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [text, setText] = useState('')
  const [prompt] = useState('วันนี้รู้สึกอย่างไร?')
  const [analyzing, setAnalyzing] = useState(false)

  useEffect(() => {
    setEntries(loadJournal())
  }, [])

  const save = async () => {
    if (!text.trim()) return
    setAnalyzing(true)
    let emotion = ''
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const data = await res.json()
      emotion = data.emotion?.thaiLabel || ''
    } catch {
      /* optional */
    } finally {
      setAnalyzing(false)
    }

    const next: JournalEntry[] = [
      {
        id: Date.now().toString(),
        text: text.trim(),
        emotion,
        createdAt: new Date().toISOString(),
      },
      ...entries,
    ]
    setEntries(next)
    saveJournal(next)
    setText('')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-sarabun">AI Journal</h1>
        <p className="text-slate-600 text-sm mt-1">
          ไดอารี่อารมณ์ + Daily Reflection — ข้อมูลเก็บในอุปกรณ์ของคุณ
        </p>
      </div>

      <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-4">
        <p className="text-sm font-medium text-brand-900">AI Daily Reflection</p>
        <p className="text-lg text-brand-800 mt-1 font-sarabun">{prompt}</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="เขียนความรู้สึกวันนี้..."
        className="w-full rounded-2xl border border-slate-300 p-4"
      />
      <button
        onClick={save}
        disabled={analyzing || !text.trim()}
        className="rounded-xl bg-brand-700 text-white px-5 py-2.5 disabled:opacity-50"
      >
        {analyzing ? 'กำลังบันทึกและวิเคราะห์...' : 'บันทึกไดอารี่'}
      </button>

      <div className="space-y-3">
        {entries.map((e) => (
          <article
            key={e.id}
            className="rounded-2xl border border-slate-200 bg-white p-4"
          >
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span>{new Date(e.createdAt).toLocaleString('th-TH')}</span>
              {e.emotion && (
                <span className="text-brand-700 font-medium">{e.emotion}</span>
              )}
            </div>
            <p className="text-slate-800 whitespace-pre-wrap">{e.text}</p>
          </article>
        ))}
        {entries.length === 0 && (
          <p className="text-sm text-slate-500">ยังไม่มีบันทึก</p>
        )}
      </div>
    </div>
  )
}
