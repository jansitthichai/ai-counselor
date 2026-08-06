# คู่มือการตั้งค่า Google AI API Key

## 🚨 ปัญหาที่พบ
```
Missing GOOGLE_AI_API_KEY environment variable
```

## 🔧 วิธีการแก้ไข

### 1. สร้างไฟล์ Environment Variables

สร้างไฟล์ `.env.local` ในโฟลเดอร์หลักของโปรเจค (ระดับเดียวกับ `package.json`):

```bash
# ในโฟลเดอร์ myproject/
touch .env.local
```

### 2. เพิ่ม API Key ในไฟล์ .env.local

เปิดไฟล์ `.env.local` และเพิ่มบรรทัดต่อไปนี้:

```env
# Google AI API Configuration (server-only)
GOOGLE_AI_API_KEY=AIzaSyYour_Actual_API_Key_Here

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-me-now
ADMIN_SESSION_SECRET=replace-with-a-long-random-secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. วิธีการได้ Google AI API Key

#### ขั้นตอนที่ 1: ไปที่ Google AI Studio
1. เปิดเบราว์เซอร์และไปที่: https://makersuite.google.com/app/apikey
2. ล็อกอินด้วย Google Account ของคุณ

#### ขั้นตอนที่ 2: สร้าง API Key
1. คลิกปุ่ม "Create API Key"
2. เลือก "Create API Key in new project" หรือใช้โปรเจคที่มีอยู่
3. คัดลอก API Key ที่ได้ (จะขึ้นต้นด้วย `AIzaSy`)

#### ขั้นตอนที่ 3: ใส่ API Key ในไฟล์ .env.local
แทนที่ `AIzaSyYour_Actual_API_Key_Here` ด้วย API Key จริงของคุณ

### 4. รีสตาร์ท Development Server

```bash
# หยุด server (Ctrl+C)
# แล้วรันใหม่
npm run dev
```

## ✅ การตรวจสอบ

หลังจากตั้งค่าแล้ว คุณจะเห็นข้อความใน console:

```
✅ Google AI API เชื่อมต่อสำเร็จ
```

## 🛠️ การแก้ไขปัญหาเพิ่มเติม

### ปัญหา: API Key ไม่ถูกต้อง
```
❌ รูปแบบ GOOGLE_AI_API_KEY ไม่ถูกต้อง API Key ควรขึ้นต้นด้วย "AIza"
```

**วิธีแก้**: ตรวจสอบว่า API Key ขึ้นต้นด้วย `AIzaSy` และมีความยาวประมาณ 39 ตัวอักษร

### ปัญหา: ไม่สามารถเชื่อมต่อได้
```
❌ ไม่สามารถเชื่อมต่อกับ Google AI ได้
```

**วิธีแก้**:
1. ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต
2. ตรวจสอบว่า API Key ยังใช้งานได้
3. ตรวจสอบว่าไม่ได้เกิน quota

### ปัญหา: ไฟล์ .env.local ไม่ทำงาน
**วิธีแก้**:
1. ตรวจสอบว่าไฟล์อยู่ในโฟลเดอร์หลักของโปรเจค
2. ตรวจสอบว่าไม่มีช่องว่างหรืออักขระพิเศษ
3. รีสตาร์ท development server

## 📝 ตัวอย่างไฟล์ .env.local ที่ถูกต้อง

```env
# Google AI API Configuration
GOOGLE_AI_API_KEY=AIzaSyB1234567890abcdefghijklmnopqrstuvwxyz

# Next.js Configuration
NEXT_PUBLIC_APP_NAME=MindCare
NEXT_PUBLIC_APP_VERSION=1.0.0

# Development Configuration
NODE_ENV=development
```

## 🔒 ความปลอดภัย

### ⚠️ ข้อควรระวัง:
- **อย่า** commit ไฟล์ `.env.local` ลง Git
- **อย่า** แชร์ API Key กับผู้อื่น
- **อย่า** ใส่ API Key ในโค้ดโดยตรง

### ✅ ไฟล์ที่ควร ignore:
```gitignore
# .gitignore
.env.local
.env.development.local
.env.test.local
.env.production.local
```

## 🚀 การ Deploy

### สำหรับ Production:
1. ตั้งค่า environment variables ใน hosting platform
2. ใช้ชื่อ `GOOGLE_AI_API_KEY`
3. ใส่ค่า API Key จริง

### สำหรับ Vercel:
1. ไปที่ Project Settings
2. เลือก Environment Variables
3. เพิ่ม `GOOGLE_AI_API_KEY` และใส่ค่า API Key

## 📞 การขอความช่วยเหลือ

หากยังมีปัญหา:
1. ตรวจสอบ console ใน browser developer tools
2. ตรวจสอบ terminal ที่รัน development server
3. ตรวจสอบว่า API Key ถูกต้องและยังใช้งานได้

---

**หมายเหตุ**: API Key นี้ใช้สำหรับการทดสอบและพัฒนาเท่านั้น สำหรับ production ควรใช้ API Key ที่แยกต่างหาก 