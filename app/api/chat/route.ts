import { NextRequest, NextResponse } from 'next/server'
import { generateResponse, getExpertAnalysis } from '../../../lib/gemini'
import { detectCrisis } from '../../../lib/crisis'
import { runWellbeingAgent } from '../../../lib/agent'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : ''
    const conversationHistory: ChatMessage[] = Array.isArray(
      body?.conversationHistory
    )
      ? body.conversationHistory
      : []

    if (!prompt) {
      return NextResponse.json({ error: 'กรุณาระบุข้อความ' }, { status: 400 })
    }

    if (prompt.length > 4000) {
      return NextResponse.json({ error: 'ข้อความยาวเกินไป' }, { status: 400 })
    }

    const sanitizedHistory = conversationHistory
      .filter(
        (msg): msg is ChatMessage =>
          (msg?.role === 'user' || msg?.role === 'assistant') &&
          typeof msg?.content === 'string' &&
          msg.content.trim() !== ''
      )
      .slice(-10)
      .map((msg) => ({
        role: msg.role,
        content: msg.content.slice(0, 4000),
      }))

    // Agentic layer runs before / alongside conversational reply
    const agent = runWellbeingAgent(prompt)
    const isCrisis = detectCrisis(prompt)
    const expertInfo = getExpertAnalysis(prompt)
    const message = await generateResponse(prompt, sanitizedHistory)

    return NextResponse.json({
      message,
      expertInfo: {
        source: expertInfo.source,
        category: isCrisis ? 'crisis' : expertInfo.category,
        confidence: expertInfo.confidence,
      },
      isCrisis,
      agent: {
        emotion: agent.emotion,
        stress: agent.stress,
        risk: agent.risk,
        recommendations: agent.recommendations.slice(0, 3),
        actionsTaken: agent.actionsTaken,
        motivation: agent.motivation,
        shouldShowEmergency: agent.shouldShowEmergency || isCrisis,
      },
      happinessProxy: happinessFromEmotion(agent.emotion.primary),
      sleepProxy: sleepFromText(prompt, agent.stress.score),
    })
  } catch (error) {
    console.error('Chat API error:', error)
    const message =
      error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการสนทนา'
    return NextResponse.json({ error: message }, { status: 500 })
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
