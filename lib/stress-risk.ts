import type { EmotionResult, RiskResult, StressResult } from './wellbeing-types'
import { detectCrisis } from './crisis'

const STRESS_KEYWORDS = [
  'เครียด',
  'กดดัน',
  'งานล้น',
  'สอบ',
  'ไม่ทัน',
  'รับไม่ไหว',
  'แน่นหน้าอก',
  'ปวดหัว',
  'นอนไม่หลับ',
  'ใจสั่น',
  'stress',
  'pressure',
]

/** AI Stress Detection — preliminary screening only */
export function detectStress(text: string, emotion?: EmotionResult): StressResult {
  const lower = text.toLowerCase()
  const signals: string[] = []
  let score = 15

  STRESS_KEYWORDS.forEach((kw) => {
    if (lower.includes(kw.toLowerCase())) {
      score += 12
      signals.push(kw)
    }
  })

  if (emotion) {
    if (emotion.primary === 'stress') score += 25
    if (emotion.primary === 'anxious') score += 18
    if (emotion.primary === 'burnout') score += 28
    if (emotion.primary === 'angry') score += 10
    if (emotion.primary === 'sad') score += 8
  }

  score = Math.min(100, score)
  const level = score >= 70 ? 'high' : score >= 40 ? 'medium' : 'low'

  return { level, score, signals: [...new Set(signals)].slice(0, 6) }
}

const DISCLAIMER =
  'ผลการประเมินนี้เป็นเพียงการประเมินความเสี่ยงเบื้องต้น เพื่อสนับสนุนการดูแลตนเอง ไม่ใช่การวินิจฉัยโรคหรือการรักษาทางการแพทย์'

/** AI Risk Level — low / medium / high with self-care tips */
export function assessRisk(
  text: string,
  stress: StressResult,
  emotion?: EmotionResult
): RiskResult {
  let score = stress.score * 0.6

  if (detectCrisis(text)) score = 95
  if (emotion?.primary === 'burnout') score += 15
  if (emotion?.primary === 'sad') score += 10
  if (emotion?.primary === 'lonely') score += 8

  score = Math.min(100, Math.round(score))
  const level = score >= 75 ? 'high' : score >= 45 ? 'medium' : 'low'

  const tipsByLevel: Record<typeof level, string[]> = {
    low: [
      'พักสายตาและหายใจลึกๆ 1–2 นาที',
      'จดสิ่งที่ทำได้ดีวันนี้ 1 อย่าง',
      'นอนพักให้เพียงพอ',
    ],
    medium: [
      'ลองกิจกรรมผ่อนคลายหรือสมาธิสั้นๆ',
      'พูดคุยกับเพื่อนหรือคนที่ไว้ใจ',
      'แบ่งงาน/การบ้านเป็นชิ้นเล็กๆ',
      'บันทึกความรู้สึกในไดอารี่อารมณ์',
    ],
    high: [
      'หยุดพักและขอความช่วยเหลือจากครูแนะแนวหรือผู้ปกครอง',
      'โทรสายด่วนสุขภาพจิต 1323 หากรู้สึกหนักมาก',
      'หลีกเลี่ยงการอยู่คนเดียวหากรู้สึกอันตราย',
      'ใช้ AI เป็นเพื่อนรับฟังได้ แต่ควรพบผู้เชี่ยวชาญเมื่ออาการต่อเนื่อง',
    ],
  }

  return {
    level,
    score,
    disclaimer: DISCLAIMER,
    selfCareTips: tipsByLevel[level],
  }
}
