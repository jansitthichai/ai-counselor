/** Client-safe local wellbeing storage keys & helpers */

export const WB_KEYS = {
  journal: 'mindcare_journal',
  goals: 'mindcare_goals',
  habits: 'mindcare_habits',
  emotionLog: 'mindcare_emotion_log',
  agentEvents: 'mindcare_agent_events',
} as const

export type JournalEntry = {
  id: string
  text: string
  emotion?: string
  createdAt: string
}

export type GoalItem = {
  id: string
  title: string
  progress: number
  createdAt: string
}

export type HabitItem = {
  id: string
  title: string
  streak: number
  lastDone?: string
  createdAt: string
}

export type EmotionLog = {
  id: string
  primary: string
  thaiLabel: string
  stressScore: number
  riskLevel: string
  happinessProxy: number
  sleepProxy: number
  source: string
  createdAt: string
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

export function loadJournal(): JournalEntry[] {
  return read(WB_KEYS.journal, [])
}
export function saveJournal(entries: JournalEntry[]) {
  write(WB_KEYS.journal, entries)
}

export function loadGoals(): GoalItem[] {
  return read(WB_KEYS.goals, [])
}
export function saveGoals(items: GoalItem[]) {
  write(WB_KEYS.goals, items)
}

export function loadHabits(): HabitItem[] {
  return read(WB_KEYS.habits, [])
}
export function saveHabits(items: HabitItem[]) {
  write(WB_KEYS.habits, items)
}

export function loadEmotionLog(): EmotionLog[] {
  return read(WB_KEYS.emotionLog, [])
}
export function appendEmotionLog(entry: Omit<EmotionLog, 'id'>) {
  const list = loadEmotionLog()
  list.unshift({ ...entry, id: Date.now().toString() })
  write(WB_KEYS.emotionLog, list.slice(0, 90))
}

export function weeklyAggregates(logs: EmotionLog[]) {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
  const recent = logs.filter((l) => new Date(l.createdAt).getTime() >= weekAgo)
  if (recent.length === 0) {
    return { stress: 0, happiness: 0, sleep: 0, count: 0 }
  }
  const avg = (fn: (l: EmotionLog) => number) =>
    Math.round(recent.reduce((s, l) => s + fn(l), 0) / recent.length)
  return {
    stress: avg((l) => l.stressScore),
    happiness: avg((l) => l.happinessProxy),
    sleep: avg((l) => l.sleepProxy),
    count: recent.length,
  }
}
