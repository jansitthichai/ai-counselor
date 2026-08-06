import 'server-only'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { processQuestion, getExpertPrompt, ExpertResponse } from './expert-system'
import { detectCrisis, getCrisisResponse } from './crisis'

const apiKey = process.env.GOOGLE_AI_API_KEY

let genAI: GoogleGenerativeAI | null = null
let currentModel: ReturnType<GoogleGenerativeAI['getGenerativeModel']> | null =
  null
let isApiAvailable = false
let currentModelName = ''

const availableModels = [
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-1.0-pro',
]

function initializeAPI() {
  if (genAI) return

  if (!apiKey) {
    console.warn(
      'GOOGLE_AI_API_KEY ไม่ได้ตั้งค่า — ใส่ใน .env.local แล้วรีสตาร์ทเซิร์ฟเวอร์'
    )
    return
  }

  try {
    genAI = new GoogleGenerativeAI(apiKey)

    for (const modelName of availableModels) {
      try {
        currentModel = genAI.getGenerativeModel({ model: modelName })
        currentModelName = modelName
        isApiAvailable = true
        break
      } catch {
        continue
      }
    }

    if (!currentModel) {
      isApiAvailable = false
    }
  } catch (error) {
    console.error('ไม่สามารถเชื่อมต่อกับ Google Gemini ได้:', error)
    isApiAvailable = false
  }
}

async function switchToNextModel(): Promise<boolean> {
  if (!genAI) return false

  const currentIndex = availableModels.indexOf(currentModelName)
  const nextModels = availableModels.slice(currentIndex + 1)

  for (const modelName of nextModels) {
    try {
      currentModel = genAI.getGenerativeModel({ model: modelName })
      currentModelName = modelName
      return true
    } catch {
      continue
    }
  }

  return false
}

initializeAPI()

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

function convertRole(role: 'user' | 'assistant'): 'user' | 'model' {
  return role === 'assistant' ? 'model' : 'user'
}

function validateConversationHistory(history: ChatMessage[]): boolean {
  for (const msg of history) {
    if (msg.role !== 'user' && msg.role !== 'assistant') return false
    if (!msg.content || typeof msg.content !== 'string') return false
  }
  return true
}

async function retryApiCall<T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)

      if (
        errorMessage.includes('overloaded') ||
        errorMessage.includes('503')
      ) {
        const switched = await switchToNextModel()
        if (switched) continue
      }

      if (attempt === maxRetries) throw error
      await new Promise((resolve) => setTimeout(resolve, delay * attempt))
    }
  }
  throw new Error('Max retries exceeded')
}

const fallbackResponses = [
  'ขออภัยครับ/ค่ะ ขณะนี้เซิร์ฟเวอร์ของ AI มีภาระงานสูง กรุณาลองใหม่อีกครั้งในภายหลัง',
  'ขออภัยครับ/ค่ะ ระบบ AI ขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง',
  'ขออภัยครับ/ค่ะ ไม่สามารถเชื่อมต่อกับ AI ได้ในขณะนี้ กรุณาลองใหม่อีกครั้งในภายหลัง',
]

function getRandomFallbackResponse(): string {
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
}

export async function generateResponse(
  prompt: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  try {
    if (detectCrisis(prompt)) {
      return getCrisisResponse()
    }

    const expertResult = processQuestion(prompt)

    if (expertResult.source === 'rule') {
      return expertResult.answer
    }

    if (!genAI || !currentModel || !isApiAvailable) {
      return 'ขออภัยครับ/ค่ะ ขณะนี้ไม่สามารถเชื่อมต่อกับ AI ได้ กรุณาตรวจสอบการตั้งค่า API Key หรือลองใหม่อีกครั้งในภายหลัง'
    }

    const expertPrompt = getExpertPrompt(prompt)
    const limitedHistory = conversationHistory.slice(-10)

    if (!validateConversationHistory(limitedHistory)) {
      throw new Error('ข้อมูลประวัติการสนทนาไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง')
    }

    const chat = currentModel.startChat({
      history: limitedHistory.map((msg) => ({
        role: convertRole(msg.role),
        parts: [{ text: msg.content }],
      })),
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      },
    })

    const systemPrompt =
      'คุณเป็น MindCare Companion ที่พูดภาษาไทย ให้คำแนะนำที่เป็นประโยชน์และเป็นมิตร\n\n'
    const fullPrompt = systemPrompt + expertPrompt

    const result = await retryApiCall(async () => {
      return await chat.sendMessage(fullPrompt)
    }, 3, 2000)

    const response = await result.response
    const text = response.text()

    if (!text || text.trim() === '') {
      throw new Error('AI ส่งคำตอบว่างเปล่ากลับมา')
    }

    return text
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)

    if (errorMessage.includes('API key')) {
      throw new Error('API Key ไม่ถูกต้อง กรุณาตรวจสอบ API Key ของคุณ')
    }
    if (errorMessage.includes('quota')) {
      throw new Error('เกินโควต้าการใช้งาน API กรุณาลองใหม่ในภายหลัง')
    }
    if (errorMessage.includes('network')) {
      throw new Error(
        'มีปัญหาในการเชื่อมต่ออินเทอร์เน็ต กรุณาตรวจสอบการเชื่อมต่อของคุณ'
      )
    }
    if (errorMessage.includes('timeout')) {
      throw new Error('การเชื่อมต่อใช้เวลานานเกินไป กรุณาลองใหม่อีกครั้ง')
    }
    if (errorMessage.includes('role') || errorMessage.includes('valid roles')) {
      throw new Error(
        'เกิดข้อผิดพลาดในการจัดการบทบาทการสนทนา กรุณาลองใหม่อีกครั้ง'
      )
    }

    return getRandomFallbackResponse()
  }
}

export function getExpertAnalysis(prompt: string): ExpertResponse {
  if (detectCrisis(prompt)) {
    return {
      answer: getCrisisResponse(),
      source: 'rule',
      confidence: 1,
      category: 'crisis',
    }
  }
  return processQuestion(prompt)
}
