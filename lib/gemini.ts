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
  'gemini-flash-latest',
  'gemini-flash-lite-latest',
  'gemini-2.5-flash',
  'gemini-2.0-flash',
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
        errorMessage.includes('503') ||
        errorMessage.includes('404') ||
        errorMessage.includes('not found') ||
        errorMessage.includes('429') ||
        errorMessage.includes('Too Many Requests') ||
        errorMessage.includes('quota')
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

function looksIncomplete(text: string): boolean {
  const trimmed = text.trim()
  if (trimmed.length < 40) return false
  // Ends on a bare numbered heading without body, or unfinished markdown bold
  if (/\*\*\d+\.\s*[^*]+\*\*\s*$/.test(trimmed)) return true
  if (/\n\d+\.\s+[^\n]{0,40}$/.test(trimmed) && !/[.!?。ครับค่ะ]$/.test(trimmed))
    return true
  if (/\*\*[^*]+$/.test(trimmed)) return true
  return false
}

function mergeContinuation(original: string, continuation: string): string {
  const cont = continuation.trim()
  if (!cont) return original
  // If model rewrote the whole answer, prefer the longer complete version
  if (cont.length > original.length * 0.8 && !cont.startsWith(original.slice(0, 40))) {
    return cont
  }
  return `${original.trim()}\n${cont}`
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
        // Thinking models use many tokens for reasoning; keep headroom for full answers
        maxOutputTokens: 8192,
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      },
    })

    const systemPrompt =
      'คุณเป็น เพื่อนคู่ใจมายด์แคร์ (STRMindCare) ที่พูดภาษาไทย ให้คำแนะนำที่เป็นประโยชน์และเป็นมิตร\n' +
      'ตอบให้ครบทุกหัวข้อที่เริ่มไว้ อย่าตัดคำตอบค้างกลางทาง และสรุปให้จบประโยคอย่างสมบูรณ์\n\n'
    const fullPrompt = systemPrompt + expertPrompt

    const result = await retryApiCall(async () => {
      return await chat.sendMessage(fullPrompt)
    }, 3, 2000)

    const response = await result.response
    const finishReason = response.candidates?.[0]?.finishReason
    const text = response.text()

    if (!text || text.trim() === '') {
      throw new Error('AI ส่งคำตอบว่างเปล่ากลับมา')
    }

    // If truncated by token limit, ask model to finish the answer once
    if (finishReason === 'MAX_TOKENS' || looksIncomplete(text)) {
      try {
        const cont = await currentModel.generateContent({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text:
                    'ต่อไปนี้คือคำตอบที่ถูกตัดกลางคัน กรุณาเขียนต่อให้จบอย่างสมบูรณ์เป็นภาษาไทย ' +
                    'โดยไม่ต้องทักทายซ้ำ และไม่ต้องเริ่มหัวข้อใหม่จากต้น หากหัวข้อค้างไว้ให้เขียนเนื้อหาของหัวข้อนั้นให้จบ:\n\n' +
                    text,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 4096,
            temperature: 0.6,
          },
        })
        const contText = (await cont.response).text()?.trim()
        if (contText) {
          return mergeContinuation(text, contText)
        }
      } catch (contError) {
        console.warn('ไม่สามารถต่อคำตอบที่ถูกตัดได้:', contError)
      }
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
