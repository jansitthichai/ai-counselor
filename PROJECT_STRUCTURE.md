# โครงสร้างโปรเจค AI เพื่อนที่ปรึกษา

## 📁 โครงสร้างไฟล์หลัก

```
myproject/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 api/                      # API Routes
│   │   ├── 📁 articles/             # API สำหรับบทความ
│   │   ├── 📁 auth/                 # API สำหรับการยืนยันตัวตน
│   │   │   ├── 📁 [...nextauth]/    # NextAuth.js configuration
│   │   │   └── 📁 register/         # API สำหรับการลงทะเบียน
│   │   └── 📁 mood-entries/         # API สำหรับบันทึกอารมณ์
│   ├── 📁 auth/                     # หน้าล็อกอิน/ลงทะเบียน
│   │   ├── 📁 signin/               # หน้าล็อกอิน
│   │   └── 📁 signup/               # หน้าลงทะเบียน
│   ├── 📁 chat/                     # หน้าแชทกับ AI
│   │   └── page.tsx                 # หน้าหลักแชท
│   ├── 📁 components/               # Components ที่ใช้ร่วมกัน
│   ├── 📁 games/                    # เกมคลายเครียด
│   │   ├── 📁 brain/                # เกมฝึกสมอง
│   │   │   └── page.tsx
│   │   ├── 📁 dino/                 # เกมไดโนเสาร์
│   │   ├── 📁 meditation/           # เกมสมาธิ
│   │   │   └── page.tsx
│   │   ├── 📁 memory/               # เกมความจำ
│   │   │   └── page.tsx
│   │   ├── 📁 music/                # เกมดนตรี
│   │   │   └── page.tsx
│   │   ├── 📁 nature/               # เกมธรรมชาติ
│   │   │   └── page.tsx
│   │   ├── page.tsx                 # หน้าหลักเกม
│   │   └── 📁 relax/                # เกมผ่อนคลาย
│   │       └── page.tsx
│   ├── 📁 help/                     # หน้าความช่วยเหลือ
│   │   └── page.tsx
│   ├── 📁 mood-tracker/             # หน้าติดตามอารมณ์
│   │   └── page.tsx
│   ├── 📁 phq9/                     # หน้าประเมินภาวะซึมเศร้า
│   │   └── page.tsx
│   ├── 📁 privacy-policy/           # หน้านโยบายความเป็นส่วนตัว
│   │   └── page.tsx
│   ├── 📁 resources/                # หน้าบทความและทรัพยากร
│   │   └── page.tsx
│   ├── globals.css                  # Global CSS styles
│   ├── layout.tsx                   # Root layout component
│   └── page.tsx                     # หน้าหลัก (Homepage)
├── 📁 lib/                          # Utility functions และ libraries
│   ├── 📁 hooks/                    # Custom React hooks
│   │   ├── index.ts                 # Export all hooks
│   │   ├── useDebounce.ts           # Hook สำหรับ debounce
│   │   ├── useLocalStorage.ts       # Hook สำหรับ localStorage
│   │   └── useScrollToBottom.ts     # Hook สำหรับ scroll
│   ├── constants.ts                 # Constants และ configuration
│   ├── expert-system.ts             # Expert system logic
│   ├── gemini.ts                    # Google Gemini AI integration
│   ├── index.ts                     # Main library exports
│   ├── types.ts                     # TypeScript type definitions
│   └── utils.ts                     # Utility functions
├── 📁 prisma/                       # Database schema (ถ้ามี)
├── 📁 public/                       # Static assets
│   ├── 📁 sounds/                   # เสียงสำหรับเกม
│   │   └── README.md
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── 📁 types/                        # Global TypeScript types
├── .eslintrc.json                   # ESLint configuration
├── .gitignore                       # Git ignore rules
├── .prettierrc                      # Prettier configuration
├── eslint.config.mjs                # ESLint configuration (ใหม่)
├── next-env.d.ts                    # Next.js type definitions
├── next.config.js                   # Next.js configuration
├── next.config.ts                   # Next.js configuration (TypeScript)
├── OPTIMIZATION.md                  # เอกสารการปรับปรุงประสิทธิภาพ
├── package-lock.json                # NPM lock file
├── package.json                     # Project dependencies และ scripts
├── postcss.config.js                # PostCSS configuration
├── postcss.config.mjs               # PostCSS configuration (ใหม่)
├── README copy.md                   # README สำรอง
├── README.md                        # เอกสารหลักของโปรเจค
├── README_OPTIMIZATION.md           # คู่มือการปรับปรุงประสิทธิภาพ
├── tailwind.config.ts               # Tailwind CSS configuration
└── tsconfig.json                    # TypeScript configuration
```

## 🏗️ โครงสร้างการทำงาน

### 1. **Frontend Architecture**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety และ development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

### 2. **AI Integration**
- **Google Gemini 2.0 Flash** - AI model สำหรับการสนทนา
- **Expert System** - Rule-based responses สำหรับคำถามทั่วไป
- **Conversation History** - เก็บประวัติการสนทนาเพื่อบริบท

### 3. **Features Structure**

#### 🤖 AI Chat System
```
app/chat/
├── page.tsx                    # หน้าหลักแชท
lib/
├── gemini.ts                   # AI integration
├── expert-system.ts            # Rule-based responses
└── types.ts                    # Chat types
```

#### 📊 Mood Tracker
```
app/mood-tracker/
├── page.tsx                    # หน้าติดตามอารมณ์
lib/
├── hooks/
│   └── useLocalStorage.ts      # Local storage hook
└── utils.ts                    # Date formatting utilities
```

#### 🎮 Relaxation Games
```
app/games/
├── brain/                      # เกมฝึกสมอง
├── memory/                     # เกมความจำ
├── meditation/                 # เกมสมาธิ
├── music/                      # เกมดนตรี
├── nature/                     # เกมธรรมชาติ
├── relax/                      # เกมผ่อนคลาย
└── dino/                       # เกมไดโนเสาร์
```

#### 📚 Resources & Help
```
app/
├── resources/                  # บทความและทรัพยากร
├── help/                       # ความช่วยเหลือ
└── privacy-policy/             # นโยบายความเป็นส่วนตัว
```

### 4. **Utility Structure**

#### Custom Hooks
```
lib/hooks/
├── useLocalStorage.ts          # Safe localStorage operations
├── useDebounce.ts              # Debounce input values
├── useScrollToBottom.ts        # Chat scroll functionality
└── index.ts                    # Export all hooks
```

#### Constants & Types
```
lib/
├── constants.ts                # App configuration
├── types.ts                    # TypeScript interfaces
└── utils.ts                    # Utility functions
```

## 🎯 ฟีเจอร์หลัก

### 1. **AI Chat System**
- การสนทนาต่อเนื่องกับบริบท
- Expert system สำหรับคำถามทั่วไป
- Conversation history management
- Typewriter effect สำหรับ AI responses

### 2. **Mood Tracking**
- บันทึกอารมณ์ประจำวัน
- สถิติรายสัปดาห์
- กราฟแสดงแนวโน้ม
- Local storage persistence

### 3. **Relaxation Games**
- เกมฝึกสมอง (Memory, Brain training)
- เกมผ่อนคลาย (Meditation, Music, Nature)
- เกมคลาสสิก (Dino game)
- เสียงและเอฟเฟกต์

### 4. **Mental Health Resources**
- บทความสุขภาพจิต
- แหล่งข้อมูลที่เป็นประโยชน์
- การประเมินภาวะซึมเศร้า (PHQ-9)
- ข้อมูลการติดต่อผู้เชี่ยวชาญ

## 🔧 การพัฒนา

### Scripts ที่มี
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
npm run lint:fix     # Fix linting errors
npm run type-check   # TypeScript check
npm run optimize     # Full optimization
npm run format       # Prettier format
npm run test         # Run tests
```

### Environment Variables
```env
GOOGLE_AI_API_KEY=your_gemini_api_key_here
```

## 📱 Responsive Design

### Navigation
- **Desktop**: Horizontal navigation bar
- **Mobile**: Bottom navigation bar
- **Responsive**: Adaptive layout สำหรับทุกขนาดหน้าจอ

### Components
- **Layout**: Responsive grid system
- **Typography**: Thai font (Sarabun) support
- **Colors**: Lavender theme with gradients
- **Animations**: Framer Motion transitions

## 🔒 Security & Performance

### Security
- API keys ใน environment variables
- ไม่เก็บข้อมูลส่วนตัวในเซิร์ฟเวอร์
- Local storage สำหรับข้อมูลผู้ใช้

### Performance
- Code splitting และ lazy loading
- Image optimization
- Bundle analysis
- Memory leak prevention
- React performance optimizations

## 📊 Monitoring & Analytics

### Performance Metrics
- Bundle size optimization
- Loading time improvements
- Memory usage monitoring
- Error tracking

### User Experience
- Responsive design
- Accessibility features
- Loading states
- Error handling
- Offline support (local storage)

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Optimization
```bash
npm run optimize
```

### Bundle Analysis
```bash
npm run analyze
```

## 📝 Documentation

### Files
- `README.md` - เอกสารหลัก
- `OPTIMIZATION.md` - การปรับปรุงประสิทธิภาพ
- `README_OPTIMIZATION.md` - คู่มือการใช้งาน optimization
- `PROJECT_STRUCTURE.md` - โครงสร้างโปรเจค (ไฟล์นี้)

### Code Documentation
- TypeScript types สำหรับ type safety
- JSDoc comments สำหรับ functions
- Inline comments สำหรับ complex logic
- README files ในแต่ละ directory

## 🤝 Contributing

### Code Standards
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- React best practices
- Performance optimizations

### Development Workflow
1. Feature development
2. Code review
3. Testing
4. Performance optimization
5. Documentation update
6. Deployment

---

**หมายเหตุ**: โครงสร้างนี้เป็นแบบ dynamic และสามารถปรับเปลี่ยนได้ตามความต้องการของโปรเจค 