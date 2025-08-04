// Test script for Google AI API
const fs = require('fs')
const { GoogleGenerativeAI } = require('@google/generative-ai')

// Read .env.local file
function readEnvFile() {
  try {
    const envContent = fs.readFileSync('.env.local', 'utf8')
    const lines = envContent.split('\n')
    const env = {}
    
    lines.forEach(line => {
      const [key, value] = line.split('=')
      if (key && value) {
        env[key.trim()] = value.trim()
      }
    })
    
    return env
  } catch (error) {
    console.error('Error reading .env.local:', error.message)
    return {}
  }
}

async function testAPI() {
  console.log('=== Testing Google AI API ===')
  
  const env = readEnvFile()
  const apiKey = env.GOOGLE_AI_API_KEY
  console.log('API Key exists:', !!apiKey)
  console.log('API Key starts with AIza:', apiKey ? apiKey.startsWith('AIza') : false)
  
  if (!apiKey) {
    console.error('❌ No API Key found')
    return
  }
  
  if (!apiKey.startsWith('AIza')) {
    console.error('❌ Invalid API Key format')
    return
  }
  
  try {
    console.log('Initializing Google AI...')
    const genAI = new GoogleGenerativeAI(apiKey)
    
    console.log('Creating model...')
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    })
    
    console.log('Sending test message...')
    const result = await model.generateContent('สวัสดีครับ')
    const response = await result.response
    const text = response.text()
    
    console.log('✅ API Test Successful!')
    console.log('Response:', text)
    
  } catch (error) {
    console.error('❌ API Test Failed:')
    console.error('Error:', error.message)
    console.error('Full error:', error)
  }
}

testAPI() 