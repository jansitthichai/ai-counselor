const fs = require('fs');
const OpenAI = require('openai');

// Read .env.local file
function readEnvFile() {
  try {
    const envContent = fs.readFileSync('.env.local', 'utf8');
    const lines = envContent.split('\n');
    const env = {};
    
    lines.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        env[key.trim()] = value.trim();
      }
    });
    
    return env;
  } catch (error) {
    console.error('Error reading .env.local:', error.message);
    return {};
  }
}

async function testNewOpenAI() {
  console.log('=== Testing New OpenAI API ===');
  
  const env = readEnvFile();
  const apiKey = env.OPENAI_API_KEY;
  
  console.log('API Key exists:', !!apiKey);
  console.log('API Key starts with sk-:', apiKey ? apiKey.startsWith('sk-') : false);
  console.log('API Key length:', apiKey ? apiKey.length : 0);
  
  if (!apiKey) {
    console.error('❌ No OpenAI API Key found');
    return;
  }
  
  if (!apiKey.startsWith('sk-')) {
    console.error('❌ Invalid OpenAI API Key format');
    return;
  }
  
  try {
    console.log('Initializing OpenAI...');
    const openai = new OpenAI({
      apiKey: apiKey
    });
    
    console.log('Sending test message...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'คุณเป็น AI เพื่อนที่ปรึกษาที่พูดภาษาไทย'
        },
        {
          role: 'user',
          content: 'สวัสดีครับ'
        }
      ],
      max_tokens: 50,
      temperature: 0.7
    });
    
    console.log('✅ New OpenAI API Test Successful!');
    console.log('Response:', completion.choices[0]?.message?.content);
    
  } catch (error) {
    console.error('❌ New OpenAI API Test Failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('API key')) {
      console.error('API Key issue detected');
    } else if (error.message.includes('quota')) {
      console.error('Quota exceeded');
    } else if (error.message.includes('network')) {
      console.error('Network issue');
    }
  }
}

testNewOpenAI(); 