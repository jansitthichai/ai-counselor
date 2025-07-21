# AI เพื่อนที่ปรึกษา - Mental Health Support Platform

แพลตฟอร์มให้คำปรึกษาด้านสุขภาพจิตด้วย AI พร้อมระบบจัดการบทความและเกมเพื่อการผ่อนคลาย

## 🚀 Features

### 🤖 AI Chat System
- **Gemini AI Integration** - ระบบแชทอัจฉริยะ
- **Expert System** - ระบบตอบคำถามเฉพาะทาง
- **Context Awareness** - เข้าใจบริบทการสนทนา

### 📚 Article Management
- **External Link System** - จัดการลิงก์บทความภายนอก
- **Admin Panel** - ระบบจัดการบทความ (CRUD)
- **Search & Filter** - ค้นหาและกรองบทความ
- **Categories** - หมวดหมู่บทความ 8 ประเภท

### 🎮 Relaxation Games
- **Brain Training** - เกมฝึกสมอง
- **Memory Games** - เกมฝึกความจำ
- **Meditation** - เกมการผ่อนคลาย
- **Music Therapy** - เกมดนตรีบำบัด
- **Nature Sounds** - เสียงธรรมชาติ
- **Relaxation** - เกมผ่อนคลาย

### 📊 Mental Health Tools
- **Mood Tracker** - ติดตามอารมณ์
- **PHQ-9 Assessment** - แบบประเมินภาวะซึมเศร้า
- **Resources** - แหล่งข้อมูลสุขภาพจิต

### 🔐 Security Features
- **Admin Authentication** - ระบบเข้าสู่ระบบผู้ดูแล
- **Middleware Protection** - ป้องกันการเข้าถึงโดยไม่ได้รับอนุญาต
- **Session Management** - จัดการ session อย่างปลอดภัย

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Charts**: Chart.js + React-Chartjs-2
- **AI**: Google Gemini AI
- **Deployment**: Vercel

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm หรือ yarn

### Setup
```bash
# Clone repository
git clone <repository-url>
cd myproject

# Install dependencies
npm install

# Run development server
npm run dev
```

### Environment Variables
สร้างไฟล์ `.env.local` และเพิ่ม:
```env
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
```

## 🚀 Deployment

### Deploy to Vercel

#### Method 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production
vercel --prod
```

#### Method 2: GitHub Integration
1. **Push code to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
   - ไปที่ [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Configure environment variables
   - Deploy

#### Method 3: Direct Upload
1. **Build project**
```bash
npm run build
```

2. **Upload to Vercel**
   - ไปที่ [vercel.com](https://vercel.com)
   - Drag & drop `.next` folder
   - หรือใช้ Vercel CLI: `vercel --prod`

### Environment Variables on Vercel
เพิ่ม environment variables ใน Vercel dashboard:
- `GOOGLE_GEMINI_API_KEY` - API key สำหรับ Gemini AI

## 📁 Project Structure

```
myproject/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel
│   │   ├── login/         # Admin login
│   │   ├── create/        # Create article
│   │   └── edit/[id]/     # Edit article
│   ├── api/               # API routes
│   │   └── articles/      # Article management API
│   ├── games/             # Relaxation games
│   ├── chat/              # AI chat interface
│   ├── mood-tracker/      # Mood tracking
│   ├── phq9/              # Depression assessment
│   └── resources/         # Article resources
├── lib/                   # Utility libraries
│   ├── articles-data.ts   # Mock data management
│   ├── gemini.ts          # AI integration
│   ├── expert-system.ts   # Rule-based responses
│   └── types.ts           # TypeScript types
├── public/                # Static assets
├── middleware.ts          # Authentication middleware
└── vercel.json           # Vercel configuration
```

## 🔧 Configuration

### Admin Access
- **URL**: `/admin/login`
- **Username**: `@dmin`
- **Password**: `p@ssw0rd`

### API Endpoints
- `GET /api/articles` - ดึงบทความทั้งหมด
- `POST /api/articles` - เพิ่มบทความใหม่
- `GET /api/articles/[id]` - ดึงบทความตาม ID
- `PUT /api/articles/[id]` - แก้ไขบทความ
- `DELETE /api/articles/[id]` - ลบบทความ

## 🎯 Usage

### For Users
1. **Chat with AI** - `/chat`
2. **Play Games** - `/games`
3. **Track Mood** - `/mood-tracker`
4. **Read Articles** - `/resources`
5. **Take Assessment** - `/phq9`

### For Admins
1. **Login** - `/admin/login`
2. **Manage Articles** - `/admin`
3. **Add Articles** - `/admin/create`
4. **Edit Articles** - `/admin/edit/[id]`

## 🔒 Security

- **Admin Authentication** - ใช้ cookies สำหรับ session
- **Middleware Protection** - ป้องกันการเข้าถึงหน้า admin
- **Input Validation** - ตรวจสอบข้อมูลก่อนบันทึก
- **Error Handling** - จัดการข้อผิดพลาดอย่างปลอดภัย

## 📈 Performance

- **Optimized Images** - ใช้ Next.js Image optimization
- **Code Splitting** - แบ่งโค้ดตามหน้า
- **Caching** - ใช้ Vercel edge caching
- **Bundle Analysis** - วิเคราะห์ขนาด bundle

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

หากมีปัญหาหรือต้องการความช่วยเหลือ:
- สร้าง Issue ใน GitHub
- ติดต่อทีมพัฒนา

---

**AI เพื่อนที่ปรึกษา** - แพลตฟอร์มเพื่อสุขภาพจิตที่ดีขึ้น 🧠💙
