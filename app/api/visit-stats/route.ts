import { NextResponse } from 'next/server'
import { getVisitStats, incrementVisitCount } from '../../../lib/storage'

export async function GET() {
  try {
    const stats = await getVisitStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Failed to read visit stats:', error)
    return NextResponse.json(
      { error: 'Failed to read visit stats' },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    const stats = await incrementVisitCount()
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Failed to update visit stats:', error)
    return NextResponse.json(
      { error: 'Failed to update visit stats' },
      { status: 500 }
    )
  }
}
