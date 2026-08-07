import { APP_CONFIG, TECH_STACK } from '../../lib/constants'

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
          Development of an AI-powered Student Wellbeing Platform for Emotional
          Wellness and Mental Health Support · Version {APP_CONFIG.version}
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
        <dl className="space-y-3 text-sm">
          <Item label="Frontend" value={TECH_STACK.frontend.join(', ')} />
          <Item label="Backend" value={TECH_STACK.backend.join(', ')} />
          <Item label="Database" value={TECH_STACK.database.join(', ')} />
          <Item label="AI / LLM" value={TECH_STACK.ai.join(', ')} />
          <Item
            label="Prompt Engineering"
            value={TECH_STACK.promptEngineering.join(', ')}
          />
          <Item
            label="Development"
            value={TECH_STACK.development.join(', ')}
          />
        </dl>
        <p className="text-xs text-slate-500 mt-4">
          Cursor IDE ใช้เป็น AI Coding Assistant สำหรับพัฒนาซอฟต์แวร์ ไม่ใช่ AI
          หลักที่ให้บริการแก่นักเรียน
        </p>
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

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="text-slate-800 mt-0.5">{value}</dd>
    </div>
  )
}
