import { APP_CONFIG } from './constants'

const CRISIS_KEYWORDS = [
  'ฆ่าตัวตาย',
  'อยากตาย',
  'อยากจบชีวิต',
  'จบชีวิต',
  'ทำร้ายตัวเอง',
  'ทำร้ายตนเอง',
  'ไม่อยากมีชีวิต',
  'ไม่อยากมีชีวิตอยู่',
  'ไม่มีเหตุผลที่จะมีชีวิต',
  'ตัดข้อมือ',
  'กินยาเกิน',
  'กินยาเยอะ',
  'อัตวินิบาต',
  'suicide',
  'kill myself',
  'self-harm',
  'self harm',
  'end my life',
  'want to die',
  'hurt myself',
]

export function detectCrisis(text: string): boolean {
  const normalized = text.toLowerCase().trim()
  if (!normalized) return false
  return CRISIS_KEYWORDS.some((keyword) =>
    normalized.includes(keyword.toLowerCase())
  )
}

export function getCrisisResponse(): string {
  return [
    'ขอบคุณที่เล่าให้ฟัง ความรู้สึกแบบนี้อาจหนักมาก และคุณไม่จำเป็นต้องผ่านมันคนเดียว',
    '',
    'หากคุณกำลังคิดทำร้ายตัวเองหรือรู้สึกอันตราย กรุณาติดต่อความช่วยเหลือทันที:',
    `• สายด่วนสุขภาพจิต ${APP_CONFIG.contact.hotline} (ตลอด 24 ชั่วโมง)`,
    '• แจ้งผู้ปกครอง ครูแนะแนว หรือคนที่ไว้ใจ',
    '• หากเป็นเหตุฉุกเฉิน โทร 1669 หรือไปห้องฉุกเฉินใกล้บ้าน',
    '',
    'AI เป็นเพียงเพื่อนที่ปรึกษาเบื้องต้น ไม่สามารถทดแทนการดูแลจากผู้เชี่ยวชาญได้',
    'คุณสำคัญ และมีคนพร้อมช่วยเหลือคุณ',
  ].join('\n')
}
