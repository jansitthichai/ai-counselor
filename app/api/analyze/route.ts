import { NextRequest, NextResponse } from 'next/server'
import { runWellbeingAgent } from '../../../lib/agent'
import { detectCrisis, getCrisisResponse } from '../../../lib/crisis'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const text = typeof body?.text === 'string' ? body.text.trim() : ''
    if (!text) {
      return NextResponse.json({ error: 'กรุณาระบุข้อความ' }, { status: 400 })
    }
    if (text.length > 4000) {
      return NextResponse.json({ error: 'ข้อความยาวเกินไป' }, { status: 400 })
    }

    const agent = runWellbeingAgent(text)
    const isCrisis = detectCrisis(text)

    return NextResponse.json({
      ...agent,
      isCrisis,
      crisisMessage: isCrisis ? getCrisisResponse() : null,
      happinessProxy: happinessFromEmotion(agent.emotion.primary),
      sleepProxy: sleepFromText(text, agent.stress.score),
    })
  } catch (error) {
    console.error('Analyze API error:', error)
    return NextResponse.json(
      { error: 'ไม่สามารถวิเคราะห์ได้ในขณะนี้' },
      { status: 500 }
    )
  }
}

function happinessFromEmotion(primary: string): number {
  const map: Record<string, number> = {
    happy: 90,
    calm: 75,
    neutral: 55,
    lonely: 35,
    anxious: 30,
    stress: 25,
    sad: 20,
    angry: 28,
    burnout: 18,
  }
  return map[primary] ?? 50
}

function sleepFromText(text: string, stressScore: number): number {
  const lower = text.toLowerCase()
  if (lower.includes('นอนไม่หลับ') || lower.includes('นอนน้อย')) return 25
  if (lower.includes('นอนดี') || lower.includes('หลับสบาย')) return 85
  return Math.max(20, 80 - Math.round(stressScore * 0.4))
}
