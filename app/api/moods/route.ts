import { NextRequest, NextResponse } from 'next/server'
import { getDbAndEnsureIndexes } from '@/lib/db'

// POST /api/moods -> create mood entry
export async function POST(req: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'MongoDB is not configured' }, { status: 503 })
    }

    const body = await req.json()
    const { userId, moodScore, tags, note, context } = body

    if (!userId || typeof moodScore !== 'number') {
      return NextResponse.json({ error: 'userId and moodScore are required' }, { status: 400 })
    }

    const entry = {
      userId: String(userId),
      moodScore: Math.max(1, Math.min(5, Number(moodScore))),
      tags: Array.isArray(tags) ? tags.map(String).slice(0, 20) : [],
      note: note ? String(note).slice(0, 2000) : '',
      context: context && typeof context === 'object' ? context : undefined,
      createdAt: new Date(),
    }

    const db = await getDbAndEnsureIndexes()
    const result = await db.collection('mood_entries').insertOne(entry)

    return NextResponse.json({ id: result.insertedId, ...entry })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create mood entry' }, { status: 500 })
  }
}

// GET /api/moods?userId=xxx&from=2025-01-01&to=2025-12-31&page=1&pageSize=20
export async function GET(req: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'MongoDB is not configured' }, { status: 503 })
    }

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const from = searchParams.get('from')
    const to = searchParams.get('to')
    const page = Math.max(1, Number(searchParams.get('page') || 1))
    const pageSize = Math.min(100, Math.max(1, Number(searchParams.get('pageSize') || 20)))

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const query: any = { userId }
    if (from || to) {
      query.createdAt = {}
      if (from) query.createdAt.$gte = new Date(from)
      if (to) query.createdAt.$lte = new Date(to)
    }

    const db = await getDbAndEnsureIndexes()
    const cursor = db
      .collection('mood_entries')
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)

    const [items, total] = await Promise.all([
      cursor.toArray(),
      db.collection('mood_entries').countDocuments(query),
    ])

    return NextResponse.json({ items, total, page, pageSize })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch mood entries' }, { status: 500 })
  }
}
