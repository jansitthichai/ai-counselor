# 🚀 Deployment Guide - AI เพื่อนที่ปรึกษา

คู่มือการ deploy โปรเจค AI เพื่อนที่ปรึกษาบน Vercel

## 📋 Prerequisites

### 1. เตรียมโปรเจค
- ✅ โปรเจคทำงานได้ปกติใน local
- ✅ ไม่มี syntax errors
- ✅ Environment variables ถูกต้อง
- ✅ Dependencies ทั้งหมดติดตั้งแล้ว

### 2. เตรียม API Key
- **Google Gemini API Key** - สำหรับ AI chat system
- ไปที่ [Google AI Studio](https://makersuite.google.com/app/apikey)
- สร้าง API key ใหม่

## 🎯 Deployment Methods

### Method 1: Vercel CLI (แนะนำ)

#### Step 1: ติดตั้ง Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```

#### Step 3: Deploy
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### Step 4: ตั้งค่า Environment Variables
```bash
vercel env add GOOGLE_GEMINI_API_KEY
# ใส่ API key เมื่อถูกถาม
```

### Method 2: GitHub Integration (แนะนำสำหรับทีม)

#### Step 1: Push to GitHub
```bash
# Initialize git (ถ้ายังไม่มี)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit for deployment"

# Add remote (แทนที่ด้วย URL ของคุณ)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push
git push -u origin main
```

#### Step 2: Connect to Vercel
1. ไปที่ [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Configure settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

#### Step 3: Environment Variables
ใน Vercel dashboard:
1. ไปที่ Project Settings
2. Environment Variables
3. Add Variable:
   - **Name**: `GOOGLE_GEMINI_API_KEY`
   - **Value**: Your API key
   - **Environment**: Production, Preview, Development

#### Step 4: Deploy
Click "Deploy" และรอให้เสร็จสิ้น

### Method 3: Direct Upload

#### Step 1: Build Project
```bash
npm run build
```

#### Step 2: Upload
1. ไปที่ [vercel.com](https://vercel.com)
2. Click "New Project"
3. Choose "Upload"
4. Drag & drop โฟลเดอร์ `.next`
5. ตั้งค่า Environment Variables
6. Deploy

## 🔧 Configuration

### Vercel Configuration (vercel.json)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Environment Variables
```env
# Required
GOOGLE_GEMINI_API_KEY=your_api_key_here

# Optional
NODE_ENV=production
```

## 🧪 Testing After Deployment

### 1. ตรวจสอบหน้าแรก
- ✅ หน้าแรกโหลดได้
- ✅ Navigation ทำงาน
- ✅ Responsive design

### 2. ตรวจสอบ AI Chat
- ✅ เข้าหน้า `/chat`
- ✅ ส่งข้อความทดสอบ
- ✅ AI ตอบกลับ

### 3. ตรวจสอบ Admin Panel
- ✅ เข้าหน้า `/admin/login`
- ✅ Login ด้วย credentials:
  - Username: `@dmin`
  - Password: `p@ssw0rd`
- ✅ เข้าถึงหน้า admin ได้
- ✅ เพิ่ม/แก้ไข/ลบบทความ

### 4. ตรวจสอบเกม
- ✅ เข้าหน้า `/games`
- ✅ เล่นเกมต่างๆ
- ✅ เสียงและ animation ทำงาน

### 5. ตรวจสอบ API
- ✅ `/api/articles` - ดึงบทความ
- ✅ `/api/articles/[id]` - ดึงบทความเดี่ยว

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Error
```bash
# ตรวจสอบ dependencies
npm install

# Clear cache
rm -rf .next
npm run build
```

#### 2. Environment Variables Not Working
- ตรวจสอบชื่อตัวแปรให้ถูกต้อง
- รีเดพลอยหลังจากเพิ่ม environment variables
- ตรวจสอบใน Vercel dashboard

#### 3. API Key Issues
- ตรวจสอบ API key ถูกต้อง
- ตรวจสอบ quota ของ Google AI
- ตรวจสอบ billing status

#### 4. Middleware Issues
- ตรวจสอบไฟล์ `middleware.ts`
- ตรวจสอบ cookies settings
- ตรวจสอบ domain settings

### Debug Commands
```bash
# Check build locally
npm run build

# Check types
npm run type-check

# Lint code
npm run lint

# Test production build
npm run start
```

## 📊 Performance Optimization

### 1. Image Optimization
- ใช้ Next.js Image component
- ตั้งค่า proper sizes
- ใช้ WebP format

### 2. Code Splitting
- ใช้ dynamic imports
- แบ่งโค้ดตามหน้า
- ลด bundle size

### 3. Caching
- ใช้ Vercel edge caching
- ตั้งค่า cache headers
- ใช้ CDN

## 🔒 Security Checklist

- ✅ Environment variables ไม่ commit ใน git
- ✅ API keys ปลอดภัย
- ✅ Admin authentication ทำงาน
- ✅ Input validation
- ✅ Error handling
- ✅ HTTPS enabled

## 📈 Monitoring

### Vercel Analytics
- เปิดใช้งาน Vercel Analytics
- ติดตาม performance
- ตรวจสอบ errors

### Logs
- ตรวจสอบ Vercel logs
- ติดตาม API calls
- ตรวจสอบ build logs

## 🔄 Continuous Deployment

### GitHub Actions (Optional)
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 Support

หากมีปัญหาในการ deploy:
1. ตรวจสอบ Vercel documentation
2. ดู build logs ใน Vercel dashboard
3. ตรวจสอบ environment variables
4. ติดต่อทีมพัฒนา

---

**Happy Deploying! 🚀** 