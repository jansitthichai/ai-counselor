# AI เพื่อนที่ปรึกษา - Mental Health Support System

ระบบให้คำปรึกษาด้านสุขภาพจิตด้วย AI ที่พัฒนาด้วย Next.js 14 และ Google Gemini AI

## 🌟 ฟีเจอร์หลัก

### 🤖 AI Chat System
- **Conversational AI** ด้วย Google Gemini AI
- **Expert System** สำหรับคำถามเฉพาะทาง
- **Real-time Chat** พร้อม animations
- **Context Awareness** เข้าใจบริบทการสนทนา

### 🎮 Interactive Games & Activities
- **Brain Training Games** - เกมฝึกสมอง
- **Meditation Guide** - คู่มือการนั่งสมาธิ
- **Memory Games** - เกมฝึกความจำ
- **Music Therapy** - ดนตรีบำบัด
- **Nature Sounds** - เสียงธรรมชาติ
- **Relaxation Exercises** - การผ่อนคลาย

### 📊 Mental Health Tools
- **Mood Tracker** - ติดตามอารมณ์
- **PHQ-9 Assessment** - แบบประเมินภาวะซึมเศร้า
- **Progress Visualization** - แสดงผลลัพธ์ด้วยกราฟ

### 📚 Resource Library
- **Article Management** - จัดการบทความสุขภาพจิต
- **External Links** - ลิงก์บทความจากแหล่งภายนอก
- **Category Filtering** - กรองตามหมวดหมู่
- **Search Function** - ค้นหาบทความ

### 🔐 Admin Panel
- **Secure Login** - ระบบเข้าสู่ระบบที่ปลอดภัย
- **Article CRUD** - เพิ่ม/แก้ไข/ลบบทความ
- **Link Management** - จัดการลิงก์ภายนอก
- **Content Moderation** - ตรวจสอบเนื้อหา

## 🛠️ เทคโนโลยีที่ใช้

### Frontend
- **Next.js 14** (App Router)
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **Chart.js** - Data visualization

### Backend
- **Next.js API Routes** - Server-side logic
- **Google Gemini AI** - AI integration
- **Mock Database** - In-memory data storage

### Authentication
- **Cookie-based Session** - 24-hour sessions
- **Middleware Protection** - Route protection
- **Admin Credentials** - Username: `@dmin`, Password: `p@ssw0rd`

## 🚀 การติดตั้ง

### Prerequisites
- Node.js 18+ 
- npm หรือ yarn

### Installation
```bash
# Clone repository
git clone <repository-url>
cd myproject

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Google Gemini API key to .env.local

# Run development server
npm run dev
```

### Environment Variables
สร้างไฟล์ `.env.local` และเพิ่ม:
```env
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

## 📁 โครงสร้างโปรเจค

```
myproject/
├── app/
│   ├── admin/           # Admin panel
│   │   ├── login/       # Login page
│   │   ├── create/      # Create article
│   │   └── edit/[id]/   # Edit article
│   ├── api/             # API routes
│   │   └── articles/    # Article management API
│   ├── games/           # Interactive games
│   ├── chat/            # AI chat interface
│   ├── mood-tracker/    # Mood tracking
│   ├── phq9/           # Depression assessment
│   └── resources/       # Article library
├── lib/                 # Utility functions
│   ├── gemini.ts       # AI integration
│   ├── expert-system.ts # Rule-based responses
│   ├── articles-data.ts # Mock database
│   └── types.ts        # TypeScript interfaces
├── public/             # Static assets
└── middleware.ts       # Authentication middleware
```

## 🔧 การใช้งาน

### สำหรับผู้ใช้ทั่วไป
1. **หน้าแรก** - ดูภาพรวมระบบ
2. **Chat** - สนทนากับ AI
3. **Games** - เล่นเกมฝึกสมอง
4. **Mood Tracker** - ติดตามอารมณ์
5. **Resources** - อ่านบทความสุขภาพจิต

### สำหรับ Admin
1. **Login** - เข้าสู่ระบบด้วย `@dmin` / `p@ssw0rd`
2. **จัดการบทความ** - เพิ่ม/แก้ไข/ลบบทความ
3. **จัดการลิงก์** - เพิ่มลิงก์บทความภายนอก
4. **ตรวจสอบเนื้อหา** - ดูรายการบทความทั้งหมด

## 🎯 ฟีเจอร์พิเศษ

### AI Integration
- **Gemini AI** สำหรับการสนทนา
- **Expert System** สำหรับคำถามเฉพาะ
- **Context Management** จดจำการสนทนา

### Security
- **Middleware Protection** ป้องกันการเข้าถึง admin
- **Session Management** จัดการ session อย่างปลอดภัย
- **Input Validation** ตรวจสอบข้อมูล

### Performance
- **Optimized Loading** โหลดเร็ว
- **Responsive Design** รองรับทุกอุปกรณ์
- **Efficient Filtering** กรองข้อมูลแบบ real-time

## 📈 การพัฒนา

### Recent Updates
- ✅ เพิ่มระบบ Admin Panel
- ✅ เพิ่มระบบ Authentication
- ✅ ปรับปรุง Article Management
- ✅ เพิ่มระบบ Login/Logout
- ✅ แก้ไขปัญหา Data Consistency

### Future Plans
- 🔄 Database Integration (PostgreSQL/MongoDB)
- 🔄 User Authentication System
- 🔄 Real-time Chat Features
- 🔄 Advanced Analytics
- 🔄 Mobile App Development

## 🤝 การมีส่วนร่วม

1. Fork โปรเจค
2. สร้าง Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง Branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📄 License

โปรเจคนี้อยู่ภายใต้ MIT License - ดูรายละเอียดใน [LICENSE](LICENSE) file

## 📞 ติดต่อ

- **Email**: [your-email@example.com]
- **GitHub**: [your-github-username]
- **Project Link**: [https://github.com/your-username/myproject]

---

**หมายเหตุ**: โปรเจคนี้พัฒนาขึ้นเพื่อการศึกษาและการให้คำปรึกษาด้านสุขภาพจิต ไม่ใช่การแทนที่การรักษาทางการแพทย์
