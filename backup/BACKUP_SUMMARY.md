# การสำรองข้อมูล Google Gemini API

## ไฟล์ที่สำรองไว้

### 1. `gemini-backup.ts`
- **ที่มา**: `lib/gemini.ts`
- **หน้าที่**: การเชื่อมต่อและใช้งาน Google Gemini AI API
- **การคืนค่า**: คัดลอกกลับไปที่ `lib/gemini.ts`

### 2. `chat-page-backup.tsx`
- **ที่มา**: `app/chat/page.tsx`
- **หน้าที่**: หน้า chat ที่ใช้ Gemini API
- **การคืนค่า**: คัดลอกกลับไปที่ `app/chat/page.tsx`

### 3. `env-backup.local`
- **ที่มา**: `.env.local`
- **หน้าที่**: Environment variables สำหรับ Gemini API
- **การคืนค่า**: คัดลอกกลับไปที่ `.env.local`

## วิธีคืนค่าไปใช้ Google Gemini API

### ขั้นตอนที่ 1: คืนค่าไฟล์
```bash
# คัดลอกไฟล์ Gemini API กลับมา
cp backup/gemini-backup.ts lib/gemini.ts

# คัดลอกไฟล์ chat page กลับมา
cp backup/chat-page-backup.tsx app/chat/page.tsx

# คัดลอก environment variables กลับมา
cp backup/env-backup.local .env.local
```

### ขั้นตอนที่ 2: แก้ไข import ใน chat page
ในไฟล์ `app/chat/page.tsx` เปลี่ยนจาก:
```typescript
import { generateResponse, getExpertAnalysis, testConversationHistory } from '../../lib/openai'
```
เป็น:
```typescript
import { generateResponse, getExpertAnalysis, testConversationHistory } from '../../lib/gemini'
```

### ขั้นตอนที่ 3: ลบไฟล์ OpenAI
```bash
# ลบไฟล์ OpenAI integration
rm lib/openai.ts

# ลบไฟล์ setup guide
rm OPENAI_SETUP.md
```

### ขั้นตอนที่ 4: รีสตาร์ท development server
```bash
npm run dev
```

## หมายเหตุ

- การคืนค่าจะทำให้ระบบกลับไปใช้ Google Gemini API
- ข้อมูลการสนทนาจะยังคงอยู่
- หากต้องการใช้ทั้งสอง API สามารถสร้างระบบเลือก API ได้

## การเปรียบเทียบ API

| ฟีเจอร์ | Google Gemini | OpenAI ChatGPT |
|---------|---------------|----------------|
| ภาษาไทย | ✅ ดี | ✅ ดี |
| ความเร็ว | ✅ เร็ว | ✅ เร็ว |
| ราคา | ✅ ฟรี (โควต้า) | 💰 มีค่าใช้จ่าย |
| ความเสถียร | ✅ สูง | ✅ สูง |
| การใช้งาน | ✅ ง่าย | ✅ ง่าย |

## การตัดสินใจ

- **ใช้ Gemini**: หากต้องการใช้ฟรีและมี Google Account
- **ใช้ ChatGPT**: หากต้องการคุณภาพสูงและพร้อมจ่ายเงิน
- **ใช้ทั้งสอง**: หากต้องการความยืดหยุ่นในการเลือก API 