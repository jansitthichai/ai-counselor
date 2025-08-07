import { GoogleGenerativeAI } from '@google/generative-ai'
import { processQuestion, getExpertPrompt, ExpertResponse } from './expert-system'

// ตรวจสอบ API Key
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || process.env.GOOGLE_AI_API_KEY

// ตัวแปรสำหรับเก็บสถานะ API
let genAI: GoogleGenerativeAI | null = null
let currentModel: any = null
let isApiAvailable = false
let currentModelName = ''

// รายการโมเดลที่สามารถใช้ได้ (เรียงตามลำดับความต้องการ)
const availableModels = [
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-1.0-pro'
]

// ฟังก์ชันสำหรับตรวจสอบและตั้งค่า API
function initializeAPI() {
  if (genAI) return // ถ้า initialize แล้วให้ return เลย

  if (!apiKey) {
    console.warn('⚠️ GOOGLE_AI_API_KEY ไม่ได้ตั้งค่า กรุณาสร้างไฟล์ .env.local และเพิ่ม GOOGLE_AI_API_KEY=your_api_key_here')
    console.warn('📝 วิธีการตั้งค่า:')
    console.warn('1. สร้างไฟล์ .env.local ในโฟลเดอร์หลักของโปรเจค')
    console.warn('2. เพิ่มบรรทัด: GOOGLE_AI_API_KEY=your_google_ai_api_key_here')
    console.warn('3. รีสตาร์ท development server')
    return
  }

  try {
    genAI = new GoogleGenerativeAI(apiKey)
    
    // ลองใช้โมเดลตามลำดับ
    for (const modelName of availableModels) {
      try {
        currentModel = genAI.getGenerativeModel({ model: modelName })
        currentModelName = modelName
        console.log(`✅ ใช้โมเดล ${modelName}`)
        isApiAvailable = true
        break
      } catch (modelError) {
        console.warn(`⚠️ โมเดล ${modelName} ไม่พร้อมใช้งาน:`, modelError)
        continue
      }
    }
    
    if (!currentModel) {
      console.error('❌ ไม่สามารถใช้โมเดลใดๆ ได้')
      isApiAvailable = false
      return
    }
    
    console.log('✅ Google Gemini API เชื่อมต่อสำเร็จ')
  } catch (error) {
    console.error('❌ ไม่สามารถเชื่อมต่อกับ Google Gemini ได้:', error)
    isApiAvailable = false
  }
}

// ฟังก์ชันสำหรับเปลี่ยนโมเดลเมื่อเกิดปัญหา
async function switchToNextModel(): Promise<boolean> {
  if (!genAI) return false
  
  const currentIndex = availableModels.indexOf(currentModelName)
  const nextModels = availableModels.slice(currentIndex + 1)
  
  for (const modelName of nextModels) {
    try {
      currentModel = genAI.getGenerativeModel({ model: modelName })
      currentModelName = modelName
      console.log(`🔄 เปลี่ยนไปใช้โมเดล ${modelName}`)
      return true
    } catch (modelError) {
      console.warn(`⚠️ โมเดล ${modelName} ไม่พร้อมใช้งาน:`, modelError)
      continue
    }
  }
  
  console.error('❌ ไม่มีโมเดลอื่นที่สามารถใช้ได้')
  return false
}

// เรียกใช้ฟังก์ชัน initialize
initializeAPI()

// Interface สำหรับ conversation history จาก chat component
interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

// ฟังก์ชันแปลง role จาก chat format เป็น Gemini format
function convertRole(role: 'user' | 'assistant'): 'user' | 'model' {
  return role === 'assistant' ? 'model' : 'user'
}

// ฟังก์ชันตรวจสอบความถูกต้องของ conversation history
function validateConversationHistory(history: ChatMessage[]): boolean {
  const validRoles = ['user', 'assistant']
  
  for (const msg of history) {
    if (!validRoles.includes(msg.role)) {
      console.error('Invalid role found:', msg.role)
      return false
    }
    if (!msg.content || typeof msg.content !== 'string') {
      console.error('Invalid content found:', msg.content)
      return false
    }
  }
  
  return true
}

// ฟังก์ชัน retry สำหรับ API calls พร้อมการเปลี่ยนโมเดล
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
      console.warn(`❌ API call failed (attempt ${attempt}/${maxRetries}):`, errorMessage)
      
      // ตรวจสอบว่าเป็น overloaded error หรือไม่
      if (errorMessage.includes('overloaded') || errorMessage.includes('503')) {
        console.warn('🔄 พบ overloaded error ลองเปลี่ยนโมเดล...')
        const switched = await switchToNextModel()
        if (switched) {
          // ลองใหม่หลังจากเปลี่ยนโมเดล
          continue
        }
      }
      
      if (attempt === maxRetries) {
        throw error
      }
      
      // รอก่อนลองใหม่
      await new Promise(resolve => setTimeout(resolve, delay * attempt))
    }
  }
  throw new Error('Max retries exceeded')
}

// Fallback responses สำหรับกรณีที่ API ไม่ทำงาน
const fallbackResponses = [
  'ขออภัยครับ/ค่ะ ขณะนี้เซิร์ฟเวอร์ของ AI มีภาระงานสูง กรุณาลองใหม่อีกครั้งในภายหลัง',
  'ขออภัยครับ/ค่ะ ระบบ AI ขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง',
  'ขออภัยครับ/ค่ะ ไม่สามารถเชื่อมต่อกับ AI ได้ในขณะนี้ กรุณาลองใหม่อีกครั้งในภายหลัง',
  'ขออภัยครับ/ค่ะ ระบบ AI กำลังบำรุงรักษา กรุณาลองใหม่อีกครั้งในภายหลัง'
]

function getRandomFallbackResponse(): string {
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
}

export async function generateResponse(
  prompt: string, 
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  try {
    console.log('=== generateResponse started (Gemini) ===')
    console.log('Prompt:', prompt)
    console.log('Conversation history length:', conversationHistory.length)
    console.log('Current model:', currentModelName)
    
    console.log('Processing question with expert system...')
    
    // ใช้ expert system ในการประมวลผลคำถาม
    const expertResult = processQuestion(prompt)
    console.log('Expert system result:', expertResult)
    
    // ถ้ามี rule-based response ให้ใช้เลย
    if (expertResult.source === 'rule') {
      console.log('Using rule-based response')
      return expertResult.answer
    }
    
    // ตรวจสอบว่า API พร้อมใช้งานหรือไม่
    console.log('Checking API availability...')
    console.log('genAI exists:', !!genAI)
    console.log('currentModel exists:', !!currentModel)
    console.log('isApiAvailable:', isApiAvailable)
    console.log('API Key exists:', !!apiKey)
    
    if (!genAI || !currentModel || !isApiAvailable) {
      console.warn('⚠️ Google Gemini API ไม่พร้อมใช้งาน ใช้ fallback response')
      console.warn('API Key:', apiKey ? 'Exists' : 'Missing')
      console.warn('genAI:', genAI ? 'Initialized' : 'Not initialized')
      console.warn('currentModel:', currentModel ? 'Initialized' : 'Not initialized')
      console.warn('isApiAvailable:', isApiAvailable)
      return 'ขออภัยครับ/ค่ะ ขณะนี้ไม่สามารถเชื่อมต่อกับ AI ได้ กรุณาตรวจสอบการตั้งค่า API Key หรือลองใหม่อีกครั้งในภายหลัง'
    }
    
    // ถ้าไม่มี rule ให้ใช้ Gemini กับ prompt เฉพาะ
    console.log('Using Gemini with expert prompt')
    const expertPrompt = getExpertPrompt(prompt)
    console.log('Expert prompt:', expertPrompt.substring(0, 100) + '...')
    
    console.log('Initializing Gemini chat...')
    
    // จำกัด conversation history เพื่อไม่ให้เกิน token limit
    // เก็บเฉพาะข้อความล่าสุด 10 ข้อความ
    const limitedHistory = conversationHistory.slice(-10)
    
    console.log('Conversation history before mapping:', limitedHistory)
    
    // ตรวจสอบความถูกต้องของ conversation history
    if (!validateConversationHistory(limitedHistory)) {
      throw new Error('ข้อมูลประวัติการสนทนาไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง')
    }
    
    // สร้าง chat session
    const chat = currentModel.startChat({
      history: limitedHistory.map(msg => ({
        role: convertRole(msg.role),
        parts: [{ text: msg.content }]
      })),
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
        topP: 0.95,
        topK: 40
      }
    })
    
    console.log('Sending message to Gemini with retry logic...')
    
    // ส่งข้อความพร้อม system prompt
    const systemPrompt = 'คุณเป็น AI เพื่อนที่ปรึกษาที่พูดภาษาไทย ให้คำแนะนำที่เป็นประโยชน์และเป็นมิตร\n\n'
    const fullPrompt = systemPrompt + expertPrompt
    
    // ใช้ retry logic สำหรับ API call
    const result = await retryApiCall(async () => {
      return await chat.sendMessage(fullPrompt)
    }, 3, 2000) // ลอง 3 ครั้ง รอ 2 วินาที
    
    const response = await result.response
    const text = response.text()
    
    console.log('Response received from Gemini')
    console.log('Response text extracted:', text.substring(0, 50) + '...')
    console.log('Response length:', text.length)
    
    if (!text || text.trim() === '') {
      throw new Error('AI ส่งคำตอบว่างเปล่ากลับมา')
    }
    
    console.log('=== generateResponse completed successfully (Gemini) ===')
    return text
  } catch (error) {
    console.error('=== Detailed error in generateResponse (Gemini) ===')
    console.error('Error object:', error)
    console.error('Error name:', error instanceof Error ? error.name : 'Unknown')
    console.error('Error message:', error instanceof Error ? error.message : String(error))
    console.error('Error stack:', error instanceof Error ? error.stack : undefined)
    console.error('Error cause:', error instanceof Error ? error.cause : undefined)
    
    // จัดการข้อผิดพลาดที่เฉพาะเจาะจง
    const errorMessage = error instanceof Error ? error.message : String(error)
    
    if (errorMessage.includes('API key')) {
      throw new Error('API Key ไม่ถูกต้อง กรุณาตรวจสอบ API Key ของคุณ')
    } else if (errorMessage.includes('quota')) {
      throw new Error('เกินโควต้าการใช้งาน API กรุณาลองใหม่ในภายหลัง')
    } else if (errorMessage.includes('network')) {
      throw new Error('มีปัญหาในการเชื่อมต่ออินเทอร์เน็ต กรุณาตรวจสอบการเชื่อมต่อของคุณ')
    } else if (errorMessage.includes('timeout')) {
      throw new Error('การเชื่อมต่อใช้เวลานานเกินไป กรุณาลองใหม่อีกครั้ง')
    } else if (errorMessage.includes('role') || errorMessage.includes('valid roles')) {
      throw new Error('เกิดข้อผิดพลาดในการจัดการบทบาทการสนทนา กรุณาลองใหม่อีกครั้ง')
    } else if (errorMessage.includes('overloaded') || errorMessage.includes('503')) {
      console.warn('⚠️ Gemini API overloaded ใช้ fallback response')
      return getRandomFallbackResponse()
    } else if (errorMessage.includes('Gemini') || errorMessage.includes('Google')) {
      console.warn('⚠️ Gemini API error ใช้ fallback response')
      return getRandomFallbackResponse()
    } else {
      console.warn('⚠️ Unknown error ใช้ fallback response')
      return getRandomFallbackResponse()
    }
  }
}

// ฟังก์ชันสำหรับดูข้อมูลการประมวลผล (สำหรับ debug)
export function getExpertAnalysis(prompt: string): ExpertResponse {
  return processQuestion(prompt)
}

// ฟังก์ชันทดสอบ conversation history (สำหรับ debug)
export function testConversationHistory(history: ChatMessage[]): void {
  console.log('=== Testing Conversation History (Gemini) ===')
  console.log('Original history:', history)
  
  const limitedHistory = history.slice(-10)
  console.log('Limited history:', limitedHistory)
  
  const isValid = validateConversationHistory(limitedHistory)
  console.log('Is valid:', isValid)
  
  if (isValid) {
    const geminiHistory = limitedHistory.map(msg => ({
      role: convertRole(msg.role),
      parts: [{ text: msg.content }]
    }))
    console.log('History for Gemini:', geminiHistory)
  }
  
  console.log('=== End Test ===')
} 