'use client'

import Link from 'next/link'
import { APP_CONFIG } from '../../lib/constants'

const CONTACTS = [
  {
    title: 'สายด่วนสุขภาพจิต',
    detail: `โทร ${APP_CONFIG.contact.hotline} ตลอด 24 ชั่วโมง`,
    action: `tel:${APP_CONFIG.contact.hotline}`,
    actionLabel: 'โทรเลย',
    tone: 'rose',
  },
  {
    title: 'ฉุกเฉินการแพทย์',
    detail: `โทร ${APP_CONFIG.contact.emergency}`,
    action: `tel:${APP_CONFIG.contact.emergency}`,
    actionLabel: 'โทร 1669',
    tone: 'red',
  },
  {
    title: 'ครูแนะแนว / ครูที่ปรึกษา',
    detail: 'ขอคำปรึกษาที่ห้องแนะแนวของโรงเรียนในเวลาทำการ',
    action: '/help',
    actionLabel: 'ดูช่องทางเพิ่มเติม',
    tone: 'teal',
  },
  {
    title: 'ผู้ปกครอง / คนในครอบครัว',
    detail: 'บอกความรู้สึกกับผู้ใหญ่ที่ไว้ใจ หรือให้ช่วยพาไปพบผู้เชี่ยวชาญ',
    action: '/parent',
    actionLabel: 'แนวทางสำหรับผู้ปกครอง',
    tone: 'sky',
  },
]

export default function EmergencyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="rounded-2xl bg-rose-600 text-white p-6">
        <h1 className="text-2xl font-bold font-sarabun">AI Emergency Support</h1>
        <p className="mt-2 text-rose-50 text-sm">
          หากคุณรู้สึกอันตรายหรือคิดทำร้ายตัวเอง กรุณาติดต่อความช่วยเหลือทันที
          MindCare เป็นเพียงเครื่องมือสนับสนุนเบื้องต้น ไม่ใช่บริการฉุกเฉิน
        </p>
      </div>

      <div className="grid gap-4">
        {CONTACTS.map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <div>
              <h2 className="font-semibold text-slate-900">{c.title}</h2>
              <p className="text-sm text-slate-600 mt-1">{c.detail}</p>
            </div>
            {c.action.startsWith('tel:') ? (
              <a
                href={c.action}
                className="inline-flex justify-center rounded-xl bg-rose-600 text-white px-4 py-2 text-sm font-medium"
              >
                {c.actionLabel}
              </a>
            ) : (
              <Link
                href={c.action}
                className="inline-flex justify-center rounded-xl border border-brand-300 text-brand-800 px-4 py-2 text-sm font-medium"
              >
                {c.actionLabel}
              </Link>
            )}
          </div>
        ))}
      </div>

      <Link href="/help" className="text-sm text-brand-700 font-medium">
        ดูรายชื่อหน่วยงานช่วยเหลือเพิ่มเติม →
      </Link>
    </div>
  )
}
