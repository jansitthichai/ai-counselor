import type { EmotionLabel, EmotionResult } from './wellbeing-types'

const LABEL_TH: Record<EmotionLabel, string> = {
  happy: 'มีความสุข',
  sad: 'เศร้า',
  angry: 'โกรธ/หงุดหงิด',
  stress: 'เครียด',
  lonely: 'เหงา',
  burnout: 'หมดไฟ',
  anxious: 'วิตกกังวล',
  calm: 'สงบ',
  neutral: 'เฉยๆ',
}

const KEYWORDS: Record<EmotionLabel, string[]> = {
  happy: ['ดีใจ', 'สุข', 'มีความสุข', 'ยิ้ม', 'สนุก', 'ปลื้ม', 'happy', 'ดีมาก', 'ภูมิใจ', 'สำเร็จ'],
  sad: ['เศร้า', 'หดหู่', 'ร้องไห้', 'เสียใจ', 'ผิดหวัง', 'สิ้นหวัง', 'sad', 'น้ำตา', 'อกหัก'],
  angry: ['โกรธ', 'โมโห', 'หงุดหงิด', 'ฉุน', 'รำคาญ', 'angry', 'แค้น', 'ไม่พอใจ'],
  stress: ['เครียด', 'กดดัน', 'งานเยอะ', 'สอบ', 'เร่ง', 'stress', 'ตึงเครียด', 'รับไม่ไหว'],
  lonely: ['เหงา', 'โดดเดี่ยว', 'ไม่มีเพื่อน', 'lonely', 'ถูกทิ้ง', 'คนเดียว'],
  burnout: ['หมดไฟ', 'burnout', 'เหนื่อยมาก', 'หมดแรง', 'ไม่อยากทำอะไร', 'ท้อแท้เรื้อรัง'],
  anxious: ['กังวล', 'วิตก', 'ตื่นเต้นเกินไป', 'ใจสั่น', 'anxious', 'กลัว', 'ไม่แน่ใจ'],
  calm: ['สงบ', 'ผ่อนคลาย', 'สบายใจ', 'calm', 'โล่ง', 'ใจเย็น'],
  neutral: ['เฉยๆ', 'ปกติ', 'ก็โอเค', 'ok', 'ธรรมดา'],
}

function emptyScores(): Record<EmotionLabel, number> {
  return {
    happy: 0,
    sad: 0,
    angry: 0,
    stress: 0,
    lonely: 0,
    burnout: 0,
    anxious: 0,
    calm: 0,
    neutral: 0.1,
  }
}

/** Rule-based emotion classification (Sentiment / Emotion Classification layer) */
export function analyzeEmotion(text: string): EmotionResult {
  const lower = text.toLowerCase()
  const scores = emptyScores()

  ;(Object.keys(KEYWORDS) as EmotionLabel[]).forEach((label) => {
    KEYWORDS[label].forEach((kw) => {
      if (lower.includes(kw.toLowerCase())) {
        scores[label] += 1
      }
    })
  })

  // mild heuristics
  if (lower.includes('สอบตก') || lower.includes('ได้เกรดไม่ดี')) {
    scores.sad += 1.5
    scores.stress += 1.2
  }
  if (lower.includes('นอนไม่หลับ') || lower.includes('นอนน้อย')) {
    scores.stress += 1
    scores.anxious += 0.8
  }

  let primary: EmotionLabel = 'neutral'
  let max = -1
  ;(Object.keys(scores) as EmotionLabel[]).forEach((label) => {
    if (scores[label] > max) {
      max = scores[label]
      primary = label
    }
  })

  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1
  const confidence = Math.min(0.95, 0.35 + max / total)

  return {
    primary,
    confidence: Number(confidence.toFixed(2)),
    scores,
    thaiLabel: LABEL_TH[primary],
  }
}

export function emotionToMoodValue(emotion: EmotionLabel): number {
  const map: Record<EmotionLabel, number> = {
    happy: 0,
    calm: 1,
    neutral: 2,
    lonely: 3,
    stress: 3,
    anxious: 5,
    sad: 4,
    angry: 4,
    burnout: 3,
  }
  return map[emotion]
}
