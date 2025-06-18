import { GoogleGenerativeAI } from '@google/generative-ai'
import { processQuestion, getExpertPrompt, ExpertResponse } from './expert-system'

// ตรวจสอบ API Key
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || process.env.GOOGLE_AI_API_KEY

if (!apiKey) {
  console.error('Missing API Key')
  throw new Error('Missing GOOGLE_AI_API_KEY environment variable')
}

// ตรวจสอบรูปแบบ API Key
if (!apiKey.startsWith('AIza')) {
  console.error('Invalid API Key format')
  throw new Error('Invalid GOOGLE_AI_API_KEY format. API Key should start with "AIza"')
}

console.log('API Key found:', apiKey.substring(0, 8) + '...')

let genAI: GoogleGenerativeAI

try {
  genAI = new GoogleGenerativeAI(apiKey)
  console.log('GoogleGenerativeAI instance created successfully')
} catch (error) {
  console.error('Error creating GoogleGenerativeAI instance:', error)
  throw new Error('ไม่สามารถเชื่อมต่อกับ Google AI ได้ กรุณาตรวจสอบการตั้งค่า')
}

export async function generateResponse(prompt: string): Promise<string> {
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

    console.log('Sending expert prompt to Gemini...')
    // ส่งข้อความและรับการตอบกลับ
    const result = await model.generateContent(expertPrompt)
    console.log('Message sent, waiting for response...')
    
    const response = await result.response
    console.log('Response received from Gemini')
    
    const text = response.text()
    console.log('Response text extracted:', text.substring(0, 50) + '...')
    
    return text
  } catch (error) {
    console.error('Detailed error in generateResponse:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause
    })
    
    // จัดการข้อผิดพลาดที่เฉพาะเจาะจง
    if (error.message?.includes('API key')) {
      throw new Error('API Key ไม่ถูกต้อง กรุณาตรวจสอบ API Key ของคุณ')
    } else if (error.message?.includes('quota')) {
      throw new Error('เกินโควต้าการใช้งาน API กรุณาลองใหม่ในภายหลัง')
    } else if (error.message?.includes('network')) {
      throw new Error('มีปัญหาในการเชื่อมต่ออินเทอร์เน็ต กรุณาตรวจสอบการเชื่อมต่อของคุณ')
    } else if (error.message?.includes('timeout')) {
      throw new Error('การเชื่อมต่อใช้เวลานานเกินไป กรุณาลองใหม่อีกครั้ง')
    } else {
      throw new Error(`เกิดข้อผิดพลาดในการเชื่อมต่อ: ${error.message || 'ไม่ทราบสาเหตุ'}`)
    }
  }
}

// ฟังก์ชันสำหรับดูข้อมูลการประมวลผล (สำหรับ debug)
export function getExpertAnalysis(prompt: string): ExpertResponse {
  return processQuestion(prompt)
} 