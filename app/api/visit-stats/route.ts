import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { Redis } from '@upstash/redis'

const statsFilePath = path.join(process.cwd(), 'data', 'visit-stats.json')
const VISIT_KEY = 'global:visitCount'
const DEFAULT_START = 735

// Create Redis client if configured
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null

// ---- File helpers (fallback) ----
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
    if (redis) {
      const count = await redis.get<number>(VISIT_KEY)
      const visitCount = count ?? DEFAULT_START
      return NextResponse.json({ visitCount, lastUpdated: new Date().toISOString() })
    }

    // Fallback to file (dev/local)
    const stats = await readStatsFromFile()
    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read visit stats' }, { status: 500 })
  }
}

export async function POST() {
  try {
    if (redis) {
      // Initialize to DEFAULT_START - 1 so first incr() returns DEFAULT_START
      const current = await redis.get<number>(VISIT_KEY)
      if (current == null) {
        await redis.set(VISIT_KEY, DEFAULT_START - 1)
      }
      const newCount = await redis.incr(VISIT_KEY)
      return NextResponse.json({ visitCount: newCount, lastUpdated: new Date().toISOString() })
    }

    // Fallback to file (dev/local)
    const stats = await readStatsFromFile()
    stats.visitCount += 1
    stats.lastUpdated = new Date().toISOString()
    await writeStatsToFile(stats)
    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update visit stats' }, { status: 500 })
  }
}
