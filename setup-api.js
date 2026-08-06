#!/usr/bin/env node

/**
 * Script สำหรับช่วยตั้งค่า Google AI API Key
 * ใช้งาน: node setup-api.js
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log('🤖 AI เพื่อนที่ปรึกษา - API Setup')
console.log('=====================================\n')

function createEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local')
  
  // ตรวจสอบว่าไฟล์มีอยู่แล้วหรือไม่
  if (fs.existsSync(envPath)) {
    console.log('⚠️  ไฟล์ .env.local มีอยู่แล้ว')
    rl.question('ต้องการเขียนทับหรือไม่? (y/N): ', (answer) => {
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        promptForApiKey()
      } else {
        console.log('❌ การตั้งค่าถูกยกเลิก')
        rl.close()
      }
    })
    return
  }
  
  promptForApiKey()
}

function promptForApiKey() {
  console.log('\n📝 กรุณาใส่ Google AI API Key ของคุณ')
  console.log('   (API Key ควรขึ้นต้นด้วย "AIzaSy")')
  console.log('   หรือกด Enter เพื่อข้ามไป\n')
  
  rl.question('API Key: ', (apiKey) => {
    if (!apiKey.trim()) {
      console.log('⚠️  ไม่ได้ใส่ API Key')
      console.log('📖 วิธีการได้ API Key:')
      console.log('   1. ไปที่ https://makersuite.google.com/app/apikey')
      console.log('   2. ล็อกอินด้วย Google Account')
      console.log('   3. คลิก "Create API Key"')
      console.log('   4. คัดลอก API Key')
      console.log('\n🔄 รัน script นี้ใหม่เมื่อได้ API Key แล้ว')
      rl.close()
      return
    }
    
    // ตรวจสอบรูปแบบ API Key
    if (!apiKey.startsWith('AIzaSy')) {
      console.log('❌ API Key ไม่ถูกต้อง ควรขึ้นต้นด้วย "AIzaSy"')
      rl.close()
      return
    }
    
    // สร้างเนื้อหาไฟล์ .env.local
    const envContent = `# Google AI API Configuration
GOOGLE_AI_API_KEY=${apiKey}

# Next.js Configuration
NEXT_PUBLIC_APP_NAME=AI เพื่อนที่ปรึกษา
NEXT_PUBLIC_APP_VERSION=1.0.0

# Development Configuration
NODE_ENV=development
`
    
    try {
      fs.writeFileSync('.env.local', envContent)
      console.log('\n✅ ไฟล์ .env.local ถูกสร้างสำเร็จ!')
      console.log('🔄 กรุณารีสตาร์ท development server:')
      console.log('   npm run dev')
      console.log('\n🎉 ตอนนี้แอปพลิเคชันพร้อมใช้งานแล้ว!')
    } catch (error) {
      console.error('❌ เกิดข้อผิดพลาดในการสร้างไฟล์:', error.message)
    }
    
    rl.close()
  })
}

// เริ่มต้น script
createEnvFile() 