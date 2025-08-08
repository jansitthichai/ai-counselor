import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const statsFilePath = path.join(process.cwd(), 'data', 'visit-stats.json')

// อ่านสถิติจากไฟล์
async function readStats() {
  try {
    const data = await fs.readFile(statsFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // หากไฟล์ไม่มี ให้สร้างใหม่ (ตั้งไว้ที่ 734 เพื่อให้ POST ครั้งแรกเป็น 735)
    return { visitCount: 734, lastUpdated: new Date().toISOString() }
  }
}

// บันทึกสถิติลงไฟล์
async function writeStats(stats: any) {
  await fs.writeFile(statsFilePath, JSON.stringify(stats, null, 2))
}

// GET - ดึงสถิติ
export async function GET() {
  try {
    const stats = await readStats()
    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read visit stats' },
      { status: 500 }
    )
  }
}

// POST - เพิ่มสถิติ
export async function POST() {
  try {
    const stats = await readStats()
    stats.visitCount += 1
    stats.lastUpdated = new Date().toISOString()
    
    await writeStats(stats)
    
    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update visit stats' },
      { status: 500 }
    )
  }
}
