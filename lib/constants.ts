// Constants for STRMindCare

export const APP_CONFIG = {
  shortName: 'STRMindCare',
  name: 'STRMindCare : AI เพื่อส่งเสริมสุขภาวะทางอารมณ์และการดูแลสุขภาพจิตสำหรับนักเรียน',
  tagline: 'AI เพื่อส่งเสริมสุขภาวะทางอารมณ์และการดูแลสุขภาพจิตสำหรับนักเรียน',
  description:
    'STRMindCare — แพลตฟอร์ม AI ส่งเสริมสุขภาวะทางอารมณ์และการดูแลสุขภาพจิตสำหรับนักเรียน (ไม่ใช่การวินิจฉัยโรค)',
  companionName: 'เพื่อนคู่ใจมายด์แคร์',
  version: '2.0.0',
  author: 'โรงเรียนสตรีศึกษา',
  contact: {
    hotline: '1323',
    emergency: '1669',
    email: 'mindcare@satri.ac.th',
  },
} as const

export const TECH_STACK = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  backend: ['Node.js', 'Next.js API Routes'],
  database: ['Local Storage (student data)', 'JSON / Vercel KV (articles & stats)'],
  ai: ['Gemini API (primary)', 'GPT API (optional)', 'Claude (optional)', 'DeepSeek (optional)', 'Llama / Ollama (optional local)'],
  promptEngineering: ['Google AI Studio', 'Custom Prompt Templates'],
  development: ['Cursor IDE (AI Coding Assistant — ไม่ใช่ AI หลักของระบบ)'],
  researchThemes: [
    'Privacy by Design',
    'PDPA',
    'AI Ethics',
    'Responsible AI',
    'Prompt Engineering',
    'RAG',
    'LLM',
    'Emotion Classification',
    'Sentiment Analysis',
    'Agentic AI',
  ],
} as const

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
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
  CRISIS: 'crisis',
  ERROR: 'error'
} as const

export const EXPERT_SOURCES = {
  RULE: 'rule',
  PROMPT: 'prompt',
  GEMINI: 'gemini'
} as const

export const NAVIGATION_ITEMS = [
  { href: '/', label: 'หน้าแรก', icon: 'FaHome' },
  { href: '/chat', label: 'เพื่อนคู่ใจ', icon: 'FaComments' },
  { href: '/insight', label: 'ภาพรวมอารมณ์', icon: 'FaChartLine' },
  { href: '/wellness', label: 'ศูนย์สุขภาวะ', icon: 'FaHeart' },
  { href: '/emergency', label: 'ฉุกเฉิน', icon: 'FaHandHoldingHeart' },
] as const

export const PLATFORM_MODULES = [
  { href: '/chat', title: 'เพื่อนคู่ใจมายด์แคร์', desc: 'เพื่อน AI แบบ Agentic วิเคราะห์และแนะนำอัตโนมัติ', group: 'core' },
  { href: '/mood-tracker', title: 'บันทึกอารมณ์', desc: 'ติดตามอารมณ์รายวัน', group: 'core' },
  { href: '/emotion', title: 'วิเคราะห์อารมณ์', desc: 'วิเคราะห์อารมณ์จากข้อความ', group: 'ai' },
  { href: '/phq9', title: 'คัดกรองสุขภาพจิต', desc: 'คัดกรองเบื้องต้นด้วย PHQ-9', group: 'core' },
  { href: '/recommendations', title: 'คำแนะนำจาก AI', desc: 'แนะนำเพลง สมาธิ หนังสือ วิดีโอ กิจกรรม', group: 'ai' },
  { href: '/resources', title: 'บทความสุขภาวะ', desc: 'บทความส่งเสริมสุขภาวะ', group: 'core' },
  { href: '/games', title: 'คลายเครียด', desc: 'กิจกรรมและเกมคลายเครียด', group: 'core' },
  { href: '/journal', title: 'ไดอารี่อารมณ์', desc: 'ไดอารี่อารมณ์และการสะท้อนความคิดรายวัน', group: 'ai' },
  { href: '/insight', title: 'ภาพรวมอารมณ์', desc: 'กราฟความเครียด ความสุข การนอน และรายงานรายสัปดาห์', group: 'ai' },
  { href: '/goals', title: 'เป้าหมายและนิสัย', desc: 'ตั้งเป้าหมายและสร้างนิสัย', group: 'ai' },
  { href: '/motivation', title: 'กำลังใจจาก AI', desc: 'ข้อความสร้างกำลังใจ', group: 'ai' },
  { href: '/emergency', title: 'ความช่วยเหลือฉุกเฉิน', desc: 'ครู ผู้ปกครอง สายด่วน', group: 'core' },
  { href: '/teacher', title: 'แดชบอร์ดครู', desc: 'สถิติแนวโน้มแบบไม่ระบุตัวตน', group: 'role' },
  { href: '/parent', title: 'แดชบอร์ดผู้ปกครอง', desc: 'แนวทางสนับสนุนบุตรหลาน', group: 'role' },
  { href: '/admin', title: 'แดชบอร์ดผู้ดูแล', desc: 'จัดการบทความและระบบ', group: 'role' },
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
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  coral: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
  },
  sky: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
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
    900: '#14532d',
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
    900: '#78350f',
  },
  error: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
  },
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