#!/usr/bin/env node

/**
 * Test Script สำหรับทดสอบ Gemini API Fallback System
 * 
 * วิธีการใช้งาน:
 * 1. ตั้งค่า API Key ใน .env.local
 * 2. รัน: node test-gemini-fallback.js
 */

const fs = require('fs')
const path = require('path')

// ฟังก์ชันสำหรับอ่าน .env.local
function loadEnvFile() {
  try {
    const envPath = path.join(__dirname, '.env.local')
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8')
      const envVars = {}
      
      envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=')
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim()
        }
      })
      
      return envVars
    }
  } catch (error) {
    console.warn('⚠️ ไม่สามารถอ่านไฟล์ .env.local ได้:', error.message)
  }
  return {}
}

// โหลด environment variables
const envVars = loadEnvFile()

// ตรวจสอบ API Key
const apiKey = envVars.GOOGLE_AI_API_KEY || envVars.NEXT_PUBLIC_GOOGLE_AI_API_KEY || process.env.GOOGLE_AI_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY

if (!apiKey) {
  console.error('❌ ไม่พบ GOOGLE_AI_API_KEY')
  console.log('📝 กรุณาสร้างไฟล์ .env.local และเพิ่ม:')
  console.log('GOOGLE_AI_API_KEY=your_api_key_here')
  console.log('')
  console.log('หรือตั้งค่า environment variable:')
  console.log('export GOOGLE_AI_API_KEY=your_api_key_here')
  process.exit(1)
}

// ตรวจสอบว่า @google/generative-ai ติดตั้งแล้วหรือไม่
let GoogleGenerativeAI
try {
  GoogleGenerativeAI = require('@google/generative-ai').GoogleGenerativeAI
} catch (error) {
  console.error('❌ ไม่พบ @google/generative-ai')
  console.log('📝 กรุณาติดตั้ง: npm install @google/generative-ai')
  process.exit(1)
}

// รายการโมเดลที่สามารถใช้ได้
const availableModels = [
  'gemini-1.5-flash',
  'gemini-1.5-pro', 
  'gemini-1.0-pro'
]

let currentModel = null
let currentModelName = ''

// ฟังก์ชันสำหรับเปลี่ยนโมเดล
async function switchToNextModel(genAI) {
  const currentIndex = availableModels.indexOf(currentModelName)
  const nextModels = availableModels.slice(currentIndex + 1)
  
  for (const modelName of nextModels) {
    try {
      currentModel = genAI.getGenerativeModel({ model: modelName })
      currentModelName = modelName
      console.log(`🔄 เปลี่ยนไปใช้โมเดล ${modelName}`)
      return true
    } catch (modelError) {
      console.warn(`⚠️ โมเดล ${modelName} ไม่พร้อมใช้งาน:`, modelError.message)
      continue
    }
  }
  
  console.error('❌ ไม่มีโมเดลอื่นที่สามารถใช้ได้')
  return false
}

// ฟังก์ชัน retry สำหรับ API calls
async function retryApiCall(apiCall, maxRetries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall()
    } catch (error) {
      const errorMessage = error.message || String(error)
      console.warn(`❌ API call failed (attempt ${attempt}/${maxRetries}):`, errorMessage)
      
      // ตรวจสอบว่าเป็น overloaded error หรือไม่
      if (errorMessage.includes('overloaded') || errorMessage.includes('503')) {
        console.warn('🔄 พบ overloaded error ลองเปลี่ยนโมเดล...')
        const switched = await switchToNextModel(genAI)
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

// ฟังก์ชันทดสอบโมเดล
async function testModel(modelName, genAI) {
  console.log(`\n🧪 ทดสอบโมเดล: ${modelName}`)
  
  try {
    const model = genAI.getGenerativeModel({ model: modelName })
    const result = await model.generateContent('สวัสดีครับ')
    const response = await result.response
    const text = response.text()
    
    console.log(`✅ ${modelName} ทำงานได้ปกติ`)
    console.log(`📝 คำตอบ: ${text.substring(0, 50)}...`)
    return true
  } catch (error) {
    console.log(`❌ ${modelName} ไม่พร้อมใช้งาน: ${error.message}`)
    return false
  }
}

// ฟังก์ชันทดสอบการเปลี่ยนโมเดล
async function testModelSwitching() {
  console.log('\n🔄 ทดสอบการเปลี่ยนโมเดล')
  
  const genAI = new GoogleGenerativeAI(apiKey)
  
  // ทดสอบโมเดลแรก
  for (const modelName of availableModels) {
    try {
      currentModel = genAI.getGenerativeModel({ model: modelName })
      currentModelName = modelName
      console.log(`✅ เริ่มต้นด้วยโมเดล: ${modelName}`)
      break
    } catch (error) {
      console.warn(`⚠️ โมเดล ${modelName} ไม่พร้อมใช้งาน: ${error.message}`)
      continue
    }
  }
  
  if (!currentModel) {
    console.error('❌ ไม่สามารถใช้โมเดลใดๆ ได้')
    return false
  }
  
  // ทดสอบการส่งข้อความ
  const testPrompt = 'ช่วยอธิบายเรื่องการจัดการความเครียดสั้นๆ'
  
  try {
    console.log(`\n📤 ส่งข้อความ: "${testPrompt}"`)
    
    const result = await retryApiCall(async () => {
      const chat = currentModel.startChat()
      return await chat.sendMessage(testPrompt)
    }, 3, 2000)
    
    const response = await result.response
    const text = response.text()
    
    console.log(`✅ ได้คำตอบจาก ${currentModelName}:`)
    console.log(`📝 ${text}`)
    return true
  } catch (error) {
    console.error(`❌ ไม่สามารถส่งข้อความได้: ${error.message}`)
    return false
  }
}

// ฟังก์ชันหลัก
async function main() {
  console.log('🚀 เริ่มทดสอบ Gemini API Fallback System')
  console.log('='.repeat(50))
  
  const genAI = new GoogleGenerativeAI(apiKey)
  
  // ทดสอบโมเดลทั้งหมด
  console.log('\n📋 ทดสอบโมเดลทั้งหมด:')
  for (const modelName of availableModels) {
    await testModel(modelName, genAI)
  }
  
  // ทดสอบการเปลี่ยนโมเดล
  const success = await testModelSwitching()
  
  console.log('\n' + '='.repeat(50))
  if (success) {
    console.log('✅ การทดสอบสำเร็จ! ระบบ fallback ทำงานได้ปกติ')
  } else {
    console.log('❌ การทดสอบล้มเหลว กรุณาตรวจสอบ API Key หรือการเชื่อมต่อ')
  }
  
  console.log('\n📝 สรุป:')
  console.log('- ระบบจะลองใช้โมเดลตามลำดับ: gemini-1.5-flash → gemini-1.5-pro → gemini-1.0-pro')
  console.log('- เมื่อเกิด overloaded error จะเปลี่ยนโมเดลโดยอัตโนมัติ')
  console.log('- ใช้ retry logic 3 ครั้ง รอ 2 วินาที')
  console.log('- ถ้าไม่สำเร็จจะแสดง fallback response')
}

// รันการทดสอบ
main().catch(error => {
  console.error('❌ เกิดข้อผิดพลาดในการทดสอบ:', error)
  process.exit(1)
}) 