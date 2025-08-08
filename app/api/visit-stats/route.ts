import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

const BASE_COUNT = 735
const statsFilePath = path.join(process.cwd(), 'data', 'visit-stats.json')

function isKVAvailable() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

// อ่านสถิติจากไฟล์ (fallback สำหรับ local/dev)
async function readStatsFromFile() {
  try {
    const data = await fs.readFile(statsFilePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return { visitCount: BASE_COUNT, lastUpdated: new Date().toISOString() }
  }
}

// บันทึกสถิติลงไฟล์ (fallback สำหรับ local/dev)
async function writeStatsToFile(stats: any) {
  await fs.writeFile(statsFilePath, JSON.stringify(stats, null, 2))
}

const noStoreHeaders = { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' }

// GET - ดึงสถิติ
export async function GET() {
  try {
    if (isKVAvailable()) {
      let count = await kv.get<number>('visitCount')
      if (count == null) {
        await kv.set('visitCount', BASE_COUNT)
        count = BASE_COUNT
      }
      const lastUpdated = (await kv.get<string>('visitLastUpdated')) ?? new Date().toISOString()
      return NextResponse.json({ visitCount: count, lastUpdated }, { headers: noStoreHeaders })
    }

    // Fallback: file storage (local)
    const stats = await readStatsFromFile()
    return NextResponse.json(stats, { headers: noStoreHeaders })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read visit stats' },
      { status: 500, headers: noStoreHeaders }
    )
  }
}

// POST - เพิ่มสถิติ
export async function POST() {
  try {
    if (isKVAvailable()) {
      let count = await kv.get<number>('visitCount')
      if (count == null) {
        // ตั้งค่าเริ่มต้นให้การเพิ่มครั้งแรกได้ BASE_COUNT
        await kv.set('visitCount', BASE_COUNT - 1)
      }
      const newCount = await kv.incr('visitCount')
      const lastUpdated = new Date().toISOString()
      await kv.set('visitLastUpdated', lastUpdated)
      return NextResponse.json({ visitCount: newCount, lastUpdated }, { headers: noStoreHeaders })
    }

    // Fallback: file storage (local)
    const stats = await readStatsFromFile()
    stats.visitCount += 1
    stats.lastUpdated = new Date().toISOString()
    await writeStatsToFile(stats)
    return NextResponse.json(stats, { headers: noStoreHeaders })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update visit stats' },
      { status: 500, headers: noStoreHeaders }
    )
  }
}
