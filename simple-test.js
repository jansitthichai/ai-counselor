// Simple API test
const fs = require('fs')

console.log('=== Simple API Test ===')

// Read .env.local
try {
  const envContent = fs.readFileSync('.env.local', 'utf8')
  console.log('✅ .env.local file found')
  console.log('Content:', envContent)
  
  const lines = envContent.split('\n')
  let apiKey = null
  
  lines.forEach(line => {
    if (line.startsWith('GOOGLE_AI_API_KEY=')) {
      apiKey = line.split('=')[1]
    }
  })
  
  if (apiKey) {
    console.log('✅ API Key found')
    console.log('API Key starts with AIza:', apiKey.startsWith('AIza'))
    console.log('API Key length:', apiKey.length)
  } else {
    console.log('❌ API Key not found in .env.local')
  }
  
} catch (error) {
  console.log('❌ Error reading .env.local:', error.message)
}

console.log('=== Test completed ===') 