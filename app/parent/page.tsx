'use client'

import Link from 'next/link'
import { APP_CONFIG } from '../../lib/constants'

export default function ParentDashboardPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-sarabun">
          Parent Dashboard
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          แนวทางสนับสนุนบุตรหลานอย่างอ่อนโยน โดยเคารพความเป็นส่วนตัว
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 text-sm text-slate-700">
        <h2 className="font-semibold text-slate-900">สิ่งที่ผู้ปกครองทำได้</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>ถามด้วยความสนใจ ไม่ตัดสิน เช่น “วันนี้มีอะไรอยากเล่าไหม”</li>
          <li>สนับสนุนการนอน การกิน และการพักผ่อน</li>
          <li>ร่วมสำรวจ STRMindCare เป็นเครื่องมือดูแลใจ ไม่ใช่การตรวจโรค</li>
          <li>หากสังเกตอาการต่อเนื่องหรือความเสี่ยง ให้ปรึกษาครูแนะแนวหรือผู้เชี่ยวชาญ</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
        <h2 className="font-semibold text-rose-900">เมื่อต้องขอความช่วยเหลือ</h2>
        <p className="text-sm text-rose-800 mt-2">
          สายด่วนสุขภาพจิต {APP_CONFIG.contact.hotline} · ฉุกเฉิน {APP_CONFIG.contact.emergency}
        </p>
        <Link
          href="/help"
          className="inline-flex mt-3 text-sm font-medium text-rose-700"
        >
          เปิดหน้าขอความช่วยเหลือ →
        </Link>
      </div>

      <p className="text-xs text-slate-500">
        ตามหลัก PDPA และ Privacy by Design ระบบไม่บังคับแชร์ไดอารี่ส่วนตัวกับผู้ปกครองโดยอัตโนมัติ
      </p>
    </div>
  )
}
