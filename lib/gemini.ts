import { GoogleGenerativeAI } from '@google/generative-ai'
import { processQuestion, getExpertPrompt, ExpertResponse } from './expert-system'

// ตรวจสอบ API Key
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || process.env.GOOGLE_AI_API_KEY

// ตัวแปรสำหรับเก็บสถานะ API
let genAI: GoogleGenerativeAI | null = null
let isApiAvailable = false

// ฟังก์ชันสำหรับตรวจสอบและตั้งค่า API
function initializeAPI() {
  if (genAI) return // ถ้า initialize แล้วให้ return เลย

if (!apiKey) {
    console.warn('⚠️ GOOGLE_AI_API_KEY ไม่ได้ตั้งค่า กรุณาสร้างไฟล์ .env.local และเพิ่ม GOOGLE_AI_API_KEY=your_api_key_here')
    console.warn('📝 วิธีการตั้งค่า:')
    console.warn('1. สร้างไฟล์ .env.local ในโฟลเดอร์หลักของโปรเจค')
    console.warn('2. เพิ่มบรรทัด: GOOGLE_AI_API_KEY=your_gemini_api_key_here')
    console.warn('3. รีสตาร์ท development server')
    return
}

// ตรวจสอบรูปแบบ API Key
if (!apiKey.startsWith('AIza')) {
    console.error('❌ รูปแบบ GOOGLE_AI_API_KEY ไม่ถูกต้อง API Key ควรขึ้นต้นด้วย "AIza"')
    return
}

try {
  genAI = new GoogleGenerativeAI(apiKey)
    isApiAvailable = true
    console.log('✅ Google AI API เชื่อมต่อสำเร็จ')
} catch (error) {
    console.error('❌ ไม่สามารถเชื่อมต่อกับ Google AI ได้:', error)
    isApiAvailable = false
  }
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

export async function generateResponse(
  prompt: string, 
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  try {
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
    if (!genAI || !isApiAvailable) {
      console.warn('⚠️ Google AI API ไม่พร้อมใช้งาน ใช้ fallback response')
      return 'ขออภัยครับ/ค่ะ ขณะนี้ไม่สามารถเชื่อมต่อกับ AI ได้ กรุณาตรวจสอบการตั้งค่า API Key หรือลองใหม่อีกครั้งในภายหลัง'
    }
    
    // ถ้าไม่มี rule ให้ใช้ Gemini กับ prompt เฉพาะ
    console.log('Using Gemini with expert prompt')
    const expertPrompt = getExpertPrompt(prompt)
    
    console.log('Initializing Gemini model...')
    // ใช้โมเดล Gemini Flash สำหรับการสนทนา
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    })
    console.log('Gemini model initialized')

    // จำกัด conversation history เพื่อไม่ให้เกิน token limit
    // เก็บเฉพาะข้อความล่าสุด 10 ข้อความ
    const limitedHistory = conversationHistory.slice(-10)
    
    console.log('Conversation history before mapping:', limitedHistory)
    
    // ตรวจสอบความถูกต้องของ conversation history
    if (!validateConversationHistory(limitedHistory)) {
      throw new Error('ข้อมูลประวัติการสนทนาไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง')
    }
    
    // สร้าง conversation history สำหรับ Gemini
    const chatHistory = limitedHistory.map(msg => ({
      role: convertRole(msg.role),
      parts: [{ text: msg.content }]
    }))
    
    console.log('Chat history for Gemini:', chatHistory)
    
    const chat = model.startChat({
      history: chatHistory
    })

    console.log('Sending expert prompt to Gemini with conversation history...')
    console.log('History length:', limitedHistory.length)
    
    // ส่งข้อความและรับการตอบกลับ
    const result = await chat.sendMessage(expertPrompt)
    console.log('Message sent, waiting for response...')
    
    const response = await result.response
    console.log('Response received from Gemini')
    
    const text = response.text()
    console.log('Response text extracted:', text.substring(0, 50) + '...')
    
    return text
  } catch (error) {
    console.error('Detailed error in generateResponse:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      cause: error instanceof Error ? error.cause : undefined
    })
    
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
    } else if (errorMessage.includes('GoogleGenerativeAI')) {
      throw new Error(`เกิดข้อผิดพลาดในการเชื่อมต่อกับ Gemini: ${errorMessage}`)
    } else {
      throw new Error(`เกิดข้อผิดพลาดในการเชื่อมต่อ: ${errorMessage || 'ไม่ทราบสาเหตุ'}`)
    }
  }
}

// ฟังก์ชันสำหรับดูข้อมูลการประมวลผล (สำหรับ debug)
export function getExpertAnalysis(prompt: string): ExpertResponse {
  return processQuestion(prompt)
}

// ฟังก์ชันทดสอบ conversation history (สำหรับ debug)
export function testConversationHistory(history: ChatMessage[]): void {
  console.log('=== Testing Conversation History ===')
  console.log('Original history:', history)
  
  const limitedHistory = history.slice(-10)
  console.log('Limited history:', limitedHistory)
  
  const isValid = validateConversationHistory(limitedHistory)
  console.log('Is valid:', isValid)
  
  if (isValid) {
    const chatHistory = limitedHistory.map(msg => ({
      role: convertRole(msg.role),
      parts: [{ text: msg.content }]
    }))
    console.log('Chat history for Gemini:', chatHistory)
  }
  
  console.log('=== End Test ===')
} 