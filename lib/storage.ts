import 'server-only'
import { promises as fs } from 'fs'
import path from 'path'

const ARTICLES_KEY = 'articles'
const VISIT_STATS_KEY = 'visit-stats'

const articlesFilePath = path.join(process.cwd(), 'data', 'articles.json')
const visitStatsFilePath = path.join(process.cwd(), 'data', 'visit-stats.json')

function isKvConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

async function getKv() {
  const { kv } = await import('@vercel/kv')
  return kv
}

async function ensureDataDir(filePath: string) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const data = await fs.readFile(filePath, 'utf8')
    return JSON.parse(data) as T
  } catch {
    return fallback
  }
}

async function writeJsonFile(filePath: string, data: unknown): Promise<void> {
  await ensureDataDir(filePath)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
}

export type ArticleRecord = {
  id: string
  title: string
  content: string
  source: string
  url: string
  imageUrl?: string
  category: string
  date: string
  createdAt?: string
  updatedAt?: string
}

export type VisitStats = {
  visitCount: number
  lastUpdated: string
}

export async function getArticles(): Promise<ArticleRecord[]> {
  if (isKvConfigured()) {
    const kv = await getKv()
    const data = await kv.get<ArticleRecord[]>(ARTICLES_KEY)
    if (data) return data
    // seed จากไฟล์ครั้งแรก
    const seeded = await readJsonFile<ArticleRecord[]>(articlesFilePath, [])
    if (seeded.length > 0) {
      await kv.set(ARTICLES_KEY, seeded)
    }
    return seeded
  }
  return readJsonFile<ArticleRecord[]>(articlesFilePath, [])
}

export async function saveArticles(articles: ArticleRecord[]): Promise<void> {
  if (isKvConfigured()) {
    const kv = await getKv()
    await kv.set(ARTICLES_KEY, articles)
    return
  }
  await writeJsonFile(articlesFilePath, articles)
}

export async function getVisitStats(): Promise<VisitStats> {
  const fallback: VisitStats = {
    visitCount: 0,
    lastUpdated: new Date().toISOString(),
  }

  if (isKvConfigured()) {
    const kv = await getKv()
    const data = await kv.get<VisitStats>(VISIT_STATS_KEY)
    if (data) return data
    const seeded = await readJsonFile<VisitStats>(visitStatsFilePath, fallback)
    await kv.set(VISIT_STATS_KEY, seeded)
    return seeded
  }

  return readJsonFile<VisitStats>(visitStatsFilePath, fallback)
}

export async function saveVisitStats(stats: VisitStats): Promise<void> {
  if (isKvConfigured()) {
    const kv = await getKv()
    await kv.set(VISIT_STATS_KEY, stats)
    return
  }
  await writeJsonFile(visitStatsFilePath, stats)
}

export async function incrementVisitCount(): Promise<VisitStats> {
  const stats = await getVisitStats()
  const next: VisitStats = {
    visitCount: stats.visitCount + 1,
    lastUpdated: new Date().toISOString(),
  }
  await saveVisitStats(next)
  return next
}
