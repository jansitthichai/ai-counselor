# AI เพื่อนที่ปรึกษา (AI Companion Counselor)

แอปพลิเคชัน AI เพื่อนที่ปรึกษาที่พัฒนาด้วย Next.js, TypeScript, และ Tailwind CSS โดยใช้ OpenAI ChatGPT สำหรับการสนทนาและให้คำแนะนำ

## ✨ ฟีเจอร์หลัก

### 🤖 AI Chat System
- **การสนทนาต่อเนื่อง**: AI สามารถจำบริบทการสนทนาและตอบสนองต่อเนื่องได้
- **ไม่ทักทายซ้ำ**: AI ตอบคำถามโดยตรงโดยไม่ต้องทักทายทุกครั้ง
- **Expert System**: ระบบผู้เชี่ยวชาญที่จำแนกประเภทคำถามและให้คำตอบที่เหมาะสม
- **Conversation History**: เก็บประวัติการสนทนาเพื่อให้ AI ตอบสนองได้ต่อเนื่อง

### 📊 Mood Tracker
- บันทึกอารมณ์ประจำวัน
- ดูสถิติอารมณ์รายสัปดาห์
- ใช้ localStorage สำหรับเก็บข้อมูล
- แสดงกราฟสถิติ

### 🎮 Relaxation Games
- เกมคลายเครียดหลากหลาย
- เกมฝึกสมอง
- เกมผ่อนคลาย

### 📚 Resources
- บทความสุขภาพจิต
- แหล่งข้อมูลที่เป็นประโยชน์

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **AI**: OpenAI ChatGPT (GPT-3.5 Turbo)
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS
- **Database**: Local Storage (สำหรับ Mood Tracker)

## 🚀 การติดตั้ง

1. Clone repository:
```bash
git clone <repository-url>
cd myproject
```

2. ติดตั้ง dependencies:
```bash
npm install
```

3. ตั้งค่า Environment Variables:
สร้างไฟล์ `.env.local` และเพิ่ม:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

**📝 วิธีการได้ OpenAI API Key:**
1. ไปที่ https://platform.openai.com/api-keys
2. ล็อกอินด้วย OpenAI Account
3. คลิก "Create new secret key"
4. คัดลอก API Key (ขึ้นต้นด้วย `sk-`)

**🔧 สำหรับข้อมูลเพิ่มเติม ดูไฟล์ `OPENAI_SETUP.md`**

4. รันแอปพลิเคชัน:
```bash
npm run dev
```

## 🔧 การปรับปรุงล่าสุด

### AI Chat System
- ✅ **Conversation History**: เพิ่มการส่งประวัติการสนทนาไปให้ Gemini
- ✅ **Context Awareness**: AI สามารถจำบริบทและตอบสนองต่อเนื่องได้
- ✅ **No Repetitive Greetings**: AI ตอบคำถามโดยตรงโดยไม่ทักทายซ้ำ
- ✅ **Expert Prompting**: ปรับปรุง prompt ให้ AI ตอบสนองได้เป็นธรรมชาติมากขึ้น
- ✅ **Clear Chat Feature**: เพิ่มปุ่มล้างการสนทนาเพื่อเริ่มใหม่

### Prompt Engineering
- ✅ **Direct Responses**: AI ตอบคำถามโดยตรง
- ✅ **Context Continuity**: รักษาบริบทการสนทนาต่อเนื่อง
- ✅ **Natural Language**: ใช้ภาษาที่เป็นมิตรและเข้าใจง่าย
- ✅ **Efficient History**: จำกัดประวัติการสนทนาเพื่อประสิทธิภาพ

## 📱 การใช้งาน

### AI Chat
1. ไปที่หน้า Chat
2. พิมพ์คำถามหรือข้อความ
3. AI จะตอบสนองโดยคำนึงถึงบริบทการสนทนาก่อนหน้า
4. ใช้ปุ่ม "ล้างการสนทนา" เพื่อเริ่มใหม่

### Mood Tracker
1. ไปที่หน้า Mood Tracker
2. เลือกอารมณ์ประจำวัน
3. ดูสถิติรายสัปดาห์

## 🎯 ประเภทคำถามที่รองรับ

- **สุขภาพจิต**: ความเครียด, การนอน, อารมณ์
- **การศึกษา**: การเรียนต่อ, แนะแนวอาชีพ
- **เทคโนโลยี**: ปัญหาคอมพิวเตอร์, แอปพลิเคชัน
- **ทั่วไป**: คำปรึกษาทั่วไป

## 🔒 ความปลอดภัย

- API Key ถูกเก็บใน Environment Variables
- ไม่มีการเก็บข้อมูลส่วนตัวในเซิร์ฟเวอร์
- ข้อมูล Mood Tracker เก็บใน localStorage ของผู้ใช้

## 📄 License

MIT License

## 🤝 การสนับสนุน

หากพบปัญหา ข้อเสนอแนะ กรุณาสร้าง Issue ใน GitHub repository
