# STRMindCare - เอกสารประกอบโปรเจ็ค

## 📋 สารบัญ
- [ภาพรวมโปรเจ็ค](#ภาพรวมโปรเจ็ค)
- [การติดตั้ง](#การติดตั้ง)
- [การใช้งาน](#การใช้งาน)
- [การ Optimize](#การ-optimize)
- [ระบบ Admin](#ระบบ-admin)
- [การพัฒนา](#การพัฒนา)
- [การ Deploy](#การ-deploy)

## 🎯 ภาพรวมโปรเจ็ค

### ข้อมูลพื้นฐาน
- **ชื่อ**: STRMindCare : AI เพื่อส่งเสริมสุขภาวะทางอารมณ์และการดูแลสุขภาพจิตสำหรับนักเรียน
- **เวอร์ชัน**: 1.0.0
- **ผู้พัฒนา**: โรงเรียนสตรีศึกษา
- **เทคโนโลยี**: Next.js 14, React, TypeScript, Tailwind CSS
- **AI Engine**: Google Gemini API

### ฟีเจอร์หลัก
1. **AI Companion** - พูดคุยกับ STRMindCare
2. **Mood Tracker** - ติดตามอารมณ์และดูสถิติ
3. **PHQ-9 Assessment** - ประเมินภาวะซึมเศร้า
4. **Games** - เกมคลายเครียด (Memory, Brain, Meditation, Music, Nature, Relax)
5. **Resources** - บทความและข้อมูลสุขภาพจิต
6. **Admin Panel** - จัดการบทความ (CRUD)

## 🚀 การติดตั้ง

### ความต้องการของระบบ
- Node.js 18+
- npm หรือ yarn
- Google AI API Key

### ขั้นตอนการติดตั้ง
```bash
# Clone โปรเจ็ค
git clone <repository-url>
cd myproject

# ติดตั้ง dependencies
npm install

# สร้างไฟล์ .env.local จากตัวอย่าง
cp .env.example .env.local
# แล้วใส่ GOOGLE_AI_API_KEY + ADMIN_*

# รัน development server
npm run dev
```

### การตั้งค่า API Key
1. ไปที่ [Google AI Studio](https://makersuite.google.com/app/apikey)
2. สร้าง API Key ใหม่
3. เพิ่มในไฟล์ `.env.local`:
```env
GOOGLE_AI_API_KEY=your_api_key_here
```

## 💻 การใช้งาน

### สำหรับผู้ใช้ทั่วไป
- **หน้าแรก**: ภาพรวมและเมนูหลัก
- **แชท**: พูดคุยกับ เพื่อนคู่ใจมายด์แคร์
- **ติดตามอารมณ์**: บันทึกและดูสถิติอารมณ์
- **ประเมินภาวะซึมเศร้า**: ทำแบบทดสอบ PHQ-9
- **เกมคลายเครียด**: เล่นเกมเพื่อผ่อนคลาย
- **บทความ**: อ่านข้อมูลสุขภาพจิต

### สำหรับ Admin
- **Login**: `/admin/login` (ตั้ง `ADMIN_USERNAME` / `ADMIN_PASSWORD` ใน `.env.local`)
- **จัดการบทความ**: เพิ่ม แก้ไข ลบบทความ
- **ดูสถิติ**: ดูข้อมูลการใช้งาน

## ⚡ การ Optimize

### Performance Optimizations
- ✅ ลบ dependencies ที่ไม่ใช้
- ✅ Font optimization
- ✅ Bundle analysis
- ✅ Dynamic imports
- ✅ Performance monitoring

### SEO & Accessibility
- ✅ Comprehensive meta tags
- ✅ Open Graph tags
- ✅ Security headers
- ✅ Semantic HTML

### Code Quality
- ✅ TypeScript strict mode
- ✅ Error boundaries
- ✅ Loading states
- ✅ Code splitting

## 🔧 ระบบ Admin

### การเข้าสู่ระบบ
- **URL**: `/admin/login`
- **Credentials**: ค่าจาก `ADMIN_USERNAME` / `ADMIN_PASSWORD` ใน `.env.local`

### ฟีเจอร์
- **เพิ่มบทความ**: `/admin/create`
- **แก้ไขบทความ**: `/admin/edit/[id]`
- **ลบบทความ**: จากหน้า admin หลัก

### โครงสร้างข้อมูลบทความ
```typescript
interface Article {
  id: string
  title: string
  content: string
  source: string
  url: string
  imageUrl: string
  category: string
  date: string
}
```

## 👨‍💻 การพัฒนา

### โครงสร้างโปรเจ็ค
```
myproject/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── admin/             # Admin pages
│   ├── chat/              # Chat interface
│   ├── games/             # Game pages
│   └── components/        # Shared components
├── lib/                   # Utilities and configurations
├── data/                  # Static data files
├── public/                # Static assets
└── docs/                  # Documentation
```

### Scripts ที่สำคัญ
```bash
# Development
npm run dev              # รัน development server
npm run build            # Build สำหรับ production
npm run start            # รัน production server

# Code Quality
npm run lint             # ตรวจสอบ code
npm run lint:fix         # แก้ไข code อัตโนมัติ
npm run type-check       # ตรวจสอบ TypeScript

# Analysis
npm run analyze          # วิเคราะห์ bundle
npm run bundle-report    # รายงาน bundle

# Optimization
npm run optimize         # รัน optimization ทั้งหมด
```

### การเพิ่มฟีเจอร์ใหม่
1. สร้าง component ใน `app/components/`
2. เพิ่ม page ใน `app/` (ถ้าจำเป็น)
3. เพิ่ม API route ใน `app/api/` (ถ้าจำเป็น)
4. อัปเดต types ใน `lib/types.ts`
5. ทดสอบและ optimize

## 🚀 การ Deploy

### Vercel (แนะนำ)
```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Deploy
vercel

# หรือใช้ GitHub integration
# เพิ่ม repository ใน Vercel dashboard
```

### Environment Variables
ตั้งค่าใน Vercel dashboard:
- `GOOGLE_AI_API_KEY`: Google AI API Key (server-only)
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET`
- `KV_REST_API_URL` / `KV_REST_API_TOKEN` (แนะนำสำหรับ production)

### การ Monitor
- **Performance**: Vercel Analytics
- **Errors**: Vercel Error Tracking
- **Logs**: Vercel Function Logs

## 📊 Performance Metrics

### เป้าหมาย
- **Lighthouse Score**: > 90
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### การตรวจสอบ
```bash
# วิเคราะห์ bundle
npm run analyze

# ตรวจสอบ performance
npm run build && npm run start
# แล้วเปิด Lighthouse ใน browser
```

## 🐛 การแก้ไขปัญหา

### ปัญหาที่พบบ่อย
1. **API Key ไม่ทำงาน**
   - ตรวจสอบ `.env.local`
   - ตรวจสอบ API Key ใน Google AI Studio

2. **Build Error**
   - ลบ `.next` folder
   - รัน `npm run build` ใหม่

3. **TypeScript Error**
   - รัน `npm run type-check`
   - แก้ไข type errors

### การ Debug
```bash
# ดู logs
npm run dev

# ตรวจสอบ types
npm run type-check

# วิเคราะห์ bundle
npm run analyze
```

## 📚 เอกสารเพิ่มเติม

### ไฟล์ที่เกี่ยวข้อง
- `OPTIMIZATION_SUMMARY.md` - รายละเอียดการ optimize
- `ADMIN_SYSTEM.md` - ระบบ admin
- `API_SETUP.md` - การตั้งค่า API
- `DEVELOPER_GUIDE.md` - คู่มือนักพัฒนา

### External Links
- [Next.js Documentation](https://nextjs.org/docs)
- [Google AI Studio](https://makersuite.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## 🤝 การมีส่วนร่วม

### การรายงาน Bug
1. สร้าง issue ใน GitHub
2. อธิบายปัญหาอย่างละเอียด
3. เพิ่ม screenshots (ถ้ามี)

### การเสนอฟีเจอร์
1. สร้าง discussion ใน GitHub
2. อธิบายฟีเจอร์ที่ต้องการ
3. ระบุประโยชน์และ use cases

## 📄 License

โปรเจ็คนี้พัฒนาโดยโรงเรียนสตรีศึกษา สำหรับการศึกษาและการใช้งานภายในโรงเรียน

---

**หมายเหตุ**: เอกสารนี้จะอัปเดตตามการพัฒนาของโปรเจ็ค กรุณาตรวจสอบเวอร์ชันล่าสุดเสมอ 