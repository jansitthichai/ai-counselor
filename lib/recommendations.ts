import type { EmotionLabel, RecommendationItem, RiskLevel } from './wellbeing-types'

const CATALOG: RecommendationItem[] = [
  {
    id: 'music-calm',
    type: 'music',
    title: 'เพลงผ่อนคลายโลofi / ธรรมชาติ',
    description: 'เสียงเบาๆ ช่วยลดความตึงเครียด',
    href: '/games/music',
    reason: 'เหมาะเมื่อรู้สึกเครียดหรือวิตก',
  },
  {
    id: 'med-breath',
    type: 'meditation',
    title: 'หายใจลึก 4-7-8',
    description: 'ฝึกหายใจสั้นๆ 3–5 นาที',
    href: '/games/breathing',
    reason: 'ช่วยสงบระบบประสาทเมื่อเครียด',
  },
  {
    id: 'med-sit',
    type: 'meditation',
    title: 'สมาธิสั้นๆ',
    description: 'นั่งสงบจดจ่อกับลมหายใจ',
    href: '/games/meditation',
    reason: 'เหมาะกับ burnout และความกังวล',
  },
  {
    id: 'act-walk',
    type: 'activity',
    title: 'เดินรอบโรงเรียน 10 นาที',
    description: 'ขยับร่างกายเบาๆ เพื่อเปลี่ยนอารมณ์',
    href: '/games/nature',
    reason: 'ช่วยเมื่อเศร้าหรือหมดไฟ',
  },
  {
    id: 'act-game',
    type: 'activity',
    title: 'เกมคลายเครียด',
    description: 'เล่นเกมสั้นๆ เพื่อผ่อนคลาย',
    href: '/games',
    reason: 'เบี่ยงเบนความสนใจจากความเครียด',
  },
  {
    id: 'vid-relax',
    type: 'video',
    title: 'วิดีโอธรรมชาติ / เสียงฝน',
    description: 'เปิดดูภาพธรรมชาติเพื่อผ่อนคลายสายตา',
    href: '/games/nature',
    reason: 'เหมาะกับความเครียดระดับปานกลาง',
  },
  {
    id: 'book-feel',
    type: 'book',
    title: 'อ่านเรื่องสั้นสร้างกำลังใจ',
    description: 'เลือกอ่านเนื้อหาสั้นที่ไม่กดดัน',
    href: '/resources',
    reason: 'ช่วยเมื่อเหงาหรือเศร้า',
  },
  {
    id: 'article-stress',
    type: 'article',
    title: 'บทความจัดการความเครียด',
    description: 'ความรู้เบื้องต้นเรื่องการดูแลใจ',
    href: '/resources',
    reason: 'เสริมความเข้าใจเรื่องความเครียด',
  },
  {
    id: 'podcast-hope',
    type: 'podcast',
    title: 'พอดแคสต์ให้กำลังใจวัยเรียน',
    description: 'ฟังเรื่องราวที่อบอุ่นและเป็นมิตร',
    href: '/motivation',
    reason: 'เหมาะเมื่อต้องการกำลังใจ',
  },
  {
    id: 'happy-share',
    type: 'activity',
    title: 'จด 3 สิ่งดีๆ วันนี้',
    description: 'ฝึก gratitude สั้นๆ',
    href: '/journal',
    reason: 'รักษาอารมณ์เชิงบวก',
  },
]

const BY_EMOTION: Record<EmotionLabel, string[]> = {
  happy: ['happy-share', 'music-calm', 'act-game'],
  sad: ['book-feel', 'act-walk', 'podcast-hope', 'med-breath'],
  angry: ['med-breath', 'act-walk', 'music-calm'],
  stress: ['med-breath', 'music-calm', 'act-game', 'article-stress'],
  lonely: ['podcast-hope', 'book-feel', 'act-walk'],
  burnout: ['med-sit', 'act-walk', 'vid-relax', 'med-breath'],
  anxious: ['med-breath', 'music-calm', 'vid-relax'],
  calm: ['happy-share', 'book-feel'],
  neutral: ['act-game', 'article-stress', 'happy-share'],
}

export function getRecommendations(
  emotion: EmotionLabel,
  risk: RiskLevel
): RecommendationItem[] {
  const ids = [...(BY_EMOTION[emotion] || BY_EMOTION.neutral)]
  if (risk === 'high') {
    ids.unshift('med-breath', 'article-stress')
  }
  const unique = [...new Set(ids)]
  return unique
    .map((id) => CATALOG.find((c) => c.id === id))
    .filter((x): x is RecommendationItem => Boolean(x))
    .slice(0, 5)
}

export const MOTIVATION_QUOTES = [
  'ทุกก้าวเล็กๆ ที่คุณดูแลใจตัวเองวันนี้ สำคัญกว่าที่คิด',
  'คุณไม่จำเป็นต้องเก่งทุกวัน แต่คุณสามารถใจดีกับตัวเองได้ทุกวัน',
  'ความรู้สึกหนักหนาไม่ได้แปลว่าคุณอ่อนแอ — แปลว่าคุณกำลังเผชิญสิ่งสำคัญ',
  'พักได้ ไม่ได้แปลว่าแพ้ การพักคือส่วนหนึ่งของการไปต่อ',
  'มีคนพร้อมรับฟังคุณเสมอ ทั้งเพื่อน ครู และสายด่วน 1323',
  'วันนี้แค่ทำได้หนึ่งอย่างที่ดูแลตัวเองก็พอแล้ว',
]

export function getMotivation(seed?: string): string {
  if (!seed) {
    return MOTIVATION_QUOTES[Math.floor(Math.random() * MOTIVATION_QUOTES.length)]
  }
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash + seed.charCodeAt(i) * (i + 1)) % MOTIVATION_QUOTES.length
  return MOTIVATION_QUOTES[hash]
}
