import { APP_CONFIG, TECH_STACK } from '../../lib/constants'

const TECH_OVERVIEW = [
  'Next.js, React, TypeScript',
  'Tailwind CSS',
  'Google Gemini AI',
  'Web Storage / Cloud Hosting',
]

const TEAM = {
  students: [
    'เด็กชายภูริพัฒน์ ขุราศี',
    'เด็กหญิงปรัสวีร์ โคเวียง',
    'เด็กหญิงปรินดา ทิพย์สิงห์',
  ],
  advisors: ['นายสิทธิชัย ทิพย์สิงห์', 'นางสาวกฤติยา พลหาญ'],
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 font-sarabun">
          {APP_CONFIG.name}
        </h1>
        <p className="text-brand-800 font-medium mt-2 text-sm md:text-base">
          {APP_CONFIG.description}
        </p>
        <p className="text-slate-600 mt-2 text-sm leading-relaxed">
          โครงงานคอมพิวเตอร์ · {APP_CONFIG.author} · Version{' '}
          {APP_CONFIG.version}
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
        <h2 className="font-semibold text-slate-900">ขอบเขตของระบบ</h2>
        <p className="text-sm text-slate-700">
          STRMindCare เป็นแพลตฟอร์มส่งเสริมสุขภาวะทางอารมณ์และการดูแลตนเองเบื้องต้น
          ไม่ใช่แพทย์ ไม่วินิจฉัยโรค และไม่ทดแทนบริการสุขภาพจิตมืออาชีพ
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900 mb-3">เทคโนโลยี</h2>
        <p className="text-sm text-slate-600 mb-3">
          ภาพรวมเทคโนโลยีหลักที่ใช้พัฒนาแพลตฟอร์ม
        </p>
        <div className="flex flex-wrap gap-2">
          {TECH_OVERVIEW.map((item) => (
            <span
              key={item}
              className="rounded-full bg-sky-50 text-sky-900 text-sm font-medium px-3 py-1.5 border border-sky-100"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50/80 to-white p-5">
        <h2 className="font-semibold text-slate-900 mb-3">คณะผู้จัดทำ</h2>
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
              จัดทำโดย
            </p>
            <ul className="space-y-1 text-slate-800 font-sarabun">
              {TEAM.students.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
              ครูที่ปรึกษา
            </p>
            <ul className="space-y-1 text-slate-800 font-sarabun">
              {TEAM.advisors.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-slate-500 pt-1">
            โครงงานคอมพิวเตอร์ · {APP_CONFIG.author}
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900 mb-3">
          ประเด็นงานวิจัยที่สอดคล้อง
        </h2>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.researchThemes.map((t) => (
            <span
              key={t}
              className="rounded-full bg-brand-50 text-brand-900 text-xs font-medium px-3 py-1 border border-brand-100"
            >
              {t}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
