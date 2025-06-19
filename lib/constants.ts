// Constants for the AI Companion app

export const APP_CONFIG = {
  name: 'AI เพื่อนที่ปรึกษา',
  description: 'AI เพื่อนที่ปรึกษาสำหรับการสนับสนุนทางอารมณ์และการให้คำแนะนำ',
  version: '1.0.0',
  author: 'โรงเรียนสตรีศึกษา',
  contact: {
    hotline: '1323',
    email: 'support@ai-companion.com'
  }
} as const

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000
} as const

export const MOOD_LABELS = [
  { label: 'มีความสุขมาก', icon: 'FaRegSmile', color: '#22c55e', value: 0 },
  { label: 'พอใจ', icon: 'FaRegMeh', color: '#84cc16', value: 1 },
  { label: 'เฉยๆ', icon: 'FaRegFrown', color: '#eab308', value: 2 },
  { label: 'เหนื่อย', icon: 'FaRegTired', color: '#f97316', value: 3 },
  { label: 'หงุดหงิด', icon: 'FaRegAngry', color: '#ef4444', value: 4 },
  { label: 'กังวล', icon: 'FaRegSurprise', color: '#8b5cf6', value: 5 },
] as const

export const PHQ9_QUESTIONS = [
  {
    id: 1,
    text: "เบื่อทำอะไรๆ ก็ไม่เพลิดเพลิน",
    options: [
      { value: 0, label: "ไม่มีเลย" },
      { value: 1, label: "มีบางวัน" },
      { value: 2, label: "มีมากกว่า 7 วัน" },
      { value: 3, label: "มีเกือบทุกวัน" }
    ]
  },
  {
    id: 2,
    text: "ไม่สบายใจ ซึมเศร้า หรือสิ้นหวัง",
    options: [
      { value: 0, label: "ไม่มีเลย" },
      { value: 1, label: "มีบางวัน" },
      { value: 2, label: "มีมากกว่า 7 วัน" },
      { value: 3, label: "มีเกือบทุกวัน" }
    ]
  },
  {
    id: 3,
    text: "นอนไม่หลับ หรือหลับๆ ตื่นๆ หรือหลับมากไป",
    options: [
      { value: 0, label: "ไม่มีเลย" },
      { value: 1, label: "มีบางวัน" },
      { value: 2, label: "มีมากกว่า 7 วัน" },
      { value: 3, label: "มีเกือบทุกวัน" }
    ]
  },
  {
    id: 4,
    text: "เหนื่อยง่าย หรือไม่ค่อยมีแรง",
    options: [
      { value: 0, label: "ไม่มีเลย" },
      { value: 1, label: "มีบางวัน" },
      { value: 2, label: "มีมากกว่า 7 วัน" },
      { value: 3, label: "มีเกือบทุกวัน" }
    ]
  },
  {
    id: 5,
    text: "เบื่ออาหาร หรือกินมากเกินไป",
    options: [
      { value: 0, label: "ไม่มีเลย" },
      { value: 1, label: "มีบางวัน" },
      { value: 2, label: "มีมากกว่า 7 วัน" },
      { value: 3, label: "มีเกือบทุกวัน" }
    ]
  },
  {
    id: 6,
    text: "รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลว หรือทำให้ตัวเองหรือครอบครัวผิดหวัง",
    options: [
      { value: 0, label: "ไม่มีเลย" },
      { value: 1, label: "มีบางวัน" },
      { value: 2, label: "มีมากกว่า 7 วัน" },
      { value: 3, label: "มีเกือบทุกวัน" }
    ]
  },
  {
    id: 7,
    text: "สมาธิไม่ดี เวลาทำอะไร เช่น อ่านหนังสือหรือดูทีวี",
    options: [
      { value: 0, label: "ไม่มีเลย" },
      { value: 1, label: "มีบางวัน" },
      { value: 2, label: "มีมากกว่า 7 วัน" },
      { value: 3, label: "มีเกือบทุกวัน" }
    ]
  },
  {
    id: 8,
    text: "พูดหรือทำอะไรช้าจนคนอื่นสังเกต หรือตรงกันข้าม คือ กระสับกระส่าย หรือดิ้นไปมา",
    options: [
      { value: 0, label: "ไม่มีเลย" },
      { value: 1, label: "มีบางวัน" },
      { value: 2, label: "มีมากกว่า 7 วัน" },
      { value: 3, label: "มีเกือบทุกวัน" }
    ]
  },
  {
    id: 9,
    text: "คิดทำร้ายตัวเอง หรือคิดว่าถ้าตายไปเสียดีกว่า",
    options: [
      { value: 0, label: "ไม่มีเลย" },
      { value: 1, label: "มีบางวัน" },
      { value: 2, label: "มีมากกว่า 7 วัน" },
      { value: 3, label: "มีเกือบทุกวัน" }
    ]
  }
] as const

export const PHQ9_SEVERITY_LEVELS = {
  NONE: { min: 0, max: 4, label: 'ไม่มีภาวะซึมเศร้า', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
  MILD: { min: 5, max: 9, label: 'ภาวะซึมเศร้าเล็กน้อย', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  MODERATE: { min: 10, max: 14, label: 'ภาวะซึมเศร้าปานกลาง', color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  MODERATE_SEVERE: { min: 15, max: 19, label: 'ภาวะซึมเศร้าปานกลางค่อนข้างรุนแรง', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  SEVERE: { min: 20, max: 27, label: 'ภาวะซึมเศร้ารุนแรง', color: 'text-red-700', bgColor: 'bg-red-100', borderColor: 'border-red-300' }
} as const

export const EXPERT_CATEGORIES = {
  GENERAL: 'general',
  STRESS: 'stress',
  DEPRESSION: 'depression',
  ANXIETY: 'anxiety',
  RELATIONSHIP: 'relationship',
  STUDY: 'study',
  FAMILY: 'family',
  ERROR: 'error'
} as const

export const EXPERT_SOURCES = {
  RULE: 'rule',
  PROMPT: 'prompt',
  GEMINI: 'gemini'
} as const

export const NAVIGATION_ITEMS = [
  { href: '/', label: 'หน้าแรก', icon: 'FaHome' },
  { href: '/chat', label: 'แชท', icon: 'FaComments' },
  { href: '/mood-tracker', label: 'ติดตามอารมณ์', icon: 'FaChartLine' },
  { href: '/phq9', label: 'ประเมินภาวะซึมเศร้า', icon: 'FaClipboardList' },
  { href: '/resources', label: 'บทความ', icon: 'FaBook' },
  { href: '/games', label: 'เกมคลายเครียด', icon: 'FaGamepad' },
  { href: '/help', label: 'ความช่วยเหลือ', icon: 'FaHandHoldingHeart' }
] as const

export const GAME_TYPES = {
  MEMORY: 'memory',
  BRAIN: 'brain',
  MEDITATION: 'meditation',
  MUSIC: 'music',
  NATURE: 'nature',
  RELAX: 'relax'
} as const

export const CONTACT_CATEGORIES = {
  GUIDANCE: 'guidance',
  PSYCHOLOGIST: 'psychologist',
  HOTLINE: 'hotline',
  HOSPITAL: 'hospital'
} as const

export const STORAGE_KEYS = {
  MOOD_ENTRIES: 'moodEntries',
  CHAT_HISTORY: 'chatHistory',
  USER_PREFERENCES: 'userPreferences',
  PHQ9_RESULTS: 'phq9Results'
} as const

export const ANIMATION_CONFIG = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1],
  spring: {
    type: "spring",
    stiffness: 100,
    damping: 15
  }
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const

export const COLORS = {
  primary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87'
  },
  lavender: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87'
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d'
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f'
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d'
  }
} as const

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง',
  API_ERROR: 'เกิดข้อผิดพลาดในการเรียก API กรุณาลองใหม่อีกครั้ง',
  VALIDATION_ERROR: 'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง',
  UNKNOWN_ERROR: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ กรุณาลองใหม่อีกครั้ง',
  STORAGE_ERROR: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
  LOADING_ERROR: 'เกิดข้อผิดพลาดในการโหลดข้อมูล'
} as const

export const SUCCESS_MESSAGES = {
  SAVED: 'บันทึกข้อมูลเรียบร้อยแล้ว',
  UPDATED: 'อัปเดตข้อมูลเรียบร้อยแล้ว',
  DELETED: 'ลบข้อมูลเรียบร้อยแล้ว',
  SENT: 'ส่งข้อความเรียบร้อยแล้ว'
} as const 