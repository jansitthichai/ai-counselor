import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { Redis } from '@upstash/redis'
import { getDbAndEnsureIndexes } from '@/lib/db'

const statsFilePath = path.join(process.cwd(), 'data', 'visit-stats.json')
const VISIT_KEY = 'global:visitCount'
const DEFAULT_START = 735

// Create Redis client if configured (secondary fallback)
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null

// ---- File helpers (last fallback) ----
async function readStatsFromFile() {
  try {
    const data = await fs.readFile(statsFilePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return { visitCount: DEFAULT_START, lastUpdated: new Date().toISOString() }
  }
}

async function writeStatsToFile(stats: any) {
  await fs.writeFile(statsFilePath, JSON.stringify(stats, null, 2))
}

// ---- API Handlers ----
export async function GET() {
  try {
    // Primary: MongoDB
    if (process.env.MONGODB_URI) {
      try {
        const db = await getDbAndEnsureIndexes()
        const doc = await db.collection('visits').findOne<{ counterName: string; count: number }>({ counterName: 'global' })
        const visitCount = doc?.count ?? DEFAULT_START
        return NextResponse.json({ visitCount, lastUpdated: new Date().toISOString() })
      } catch (err) {
        console.warn('MongoDB GET failed, falling back:', err)
      }
    }

    // Secondary: Redis
    if (redis) {
      try {
        const count = await redis.get<number>(VISIT_KEY)
        const visitCount = count ?? DEFAULT_START
        return NextResponse.json({ visitCount, lastUpdated: new Date().toISOString() })
      } catch (err) {
        console.warn('Redis GET failed, falling back:', err)
      }
    }

    // Last: File
    const stats = await readStatsFromFile()
    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read visit stats' }, { status: 500 })
  }
}

export async function POST() {
  try {
    // Primary: MongoDB
    if (process.env.MONGODB_URI) {
      try {
        const db = await getDbAndEnsureIndexes()
        const result = await db.collection('visits').findOneAndUpdate(
          { counterName: 'global' },
          { $inc: { count: 1 }, $setOnInsert: { count: DEFAULT_START - 1 } },
          { upsert: true, returnDocument: 'after' as any }
        )
        const updatedDoc = result.value || { count: DEFAULT_START }
        return NextResponse.json({ visitCount: updatedDoc.count, lastUpdated: new Date().toISOString() })
      } catch (err) {
        console.warn('MongoDB POST failed, falling back:', err)
      }
    }

    // Secondary: Redis
    if (redis) {
      try {
        const current = await redis.get<number>(VISIT_KEY)
        if (current == null) {
          await redis.set(VISIT_KEY, DEFAULT_START - 1)
        }
        const newCount = await redis.incr(VISIT_KEY)
        return NextResponse.json({ visitCount: newCount, lastUpdated: new Date().toISOString() })
      } catch (err) {
        console.warn('Redis POST failed, falling back:', err)
      }
    }

    // Last: File
    const stats = await readStatsFromFile()
    stats.visitCount += 1
    stats.lastUpdated = new Date().toISOString()
    await writeStatsToFile(stats)
    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update visit stats' }, { status: 500 })
  }
}
