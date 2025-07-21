# คู่มือนักพัฒนา - AI เพื่อนที่ปรึกษา

## 🚀 การเริ่มต้น

### 1. การติดตั้งโปรเจค

```bash
# Clone repository
git clone <repository-url>
cd myproject

# ติดตั้ง dependencies
npm install

# สร้างไฟล์ environment
cp .env.example .env.local
```

### 2. การตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` และเพิ่ม:

```env
GOOGLE_AI_API_KEY=your_gemini_api_key_here
```

### 3. การรันโปรเจค

```bash
# Development mode
npm run dev

# Production build
npm run build
npm run start

# Optimization
npm run optimize
```

## 🏗️ โครงสร้างโค้ด

### 1. **App Router Structure**

```
app/
├── layout.tsx              # Root layout
├── page.tsx                # Homepage
├── globals.css             # Global styles
├── chat/                   # Chat feature
├── mood-tracker/           # Mood tracking
├── games/                  # Relaxation games
├── resources/              # Mental health resources
├── help/                   # Help page
├── phq9/                   # Depression assessment
└── privacy-policy/         # Privacy policy
```

### 2. **Library Structure**

```
lib/
├── hooks/                  # Custom React hooks
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   ├── useScrollToBottom.ts
│   └── index.ts
├── gemini.ts              # AI integration
├── expert-system.ts       # Rule-based responses
├── constants.ts           # App constants
├── types.ts               # TypeScript types
├── utils.ts               # Utility functions
└── index.ts               # Main exports
```

## 🧠 AI System Development

### 1. **การเพิ่ม Rule-based Responses**

```typescript
// lib/expert-system.ts
const commonQuestions: Record<string, string> = {
  // เพิ่มคำถามใหม่
  'คำถามใหม่': 'คำตอบสำหรับคำถามใหม่',
  
  // คำถามที่มีเงื่อนไข
  'คำถามที่มีเงื่อนไข': (input: string) => {
    if (input.includes('คำสำคัญ')) {
      return 'คำตอบเมื่อมีคำสำคัญ'
    }
    return 'คำตอบทั่วไป'
  }
}
```

### 2. **การปรับแต่ง AI Prompts**

```typescript
// lib/gemini.ts
const expertPrompts: Record<string, string> = {
  medical: `
    คุณเป็น AI เพื่อนที่ปรึกษาที่เชี่ยวชาญด้านสุขภาพจิต
    ให้คำแนะนำที่เป็นประโยชน์และปลอดภัย
    หากเป็นกรณีร้ายแรง ให้แนะนำให้ปรึกษาผู้เชี่ยวชาญ
  `,
  
  technology: `
    คุณเป็น AI ที่เชี่ยวชาญด้านเทคโนโลยี
    ให้คำแนะนำที่เป็นประโยชน์และเข้าใจง่าย
    ใช้ภาษาที่เป็นมิตรและไม่ซับซ้อน
  `
}
```

### 3. **การจัดการ Conversation History**

```typescript
// การจำกัดประวัติการสนทนา
const limitedHistory = conversationHistory.slice(-10)

// การตรวจสอบความถูกต้อง
const validateConversationHistory = (history: ChatMessage[]): boolean => {
  return history.every(msg => 
    msg.role && 
    msg.content && 
    typeof msg.content === 'string'
  )
}
```

## 🎮 Game Development

### 1. **การสร้างเกมใหม่**

```typescript
// app/games/new-game/page.tsx
'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

interface GameState {
  score: number
  isPlaying: boolean
  // เพิ่ม state ตามต้องการ
}

export default function NewGame() {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    isPlaying: false
  })

  const startGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPlaying: true }))
  }, [])

  const endGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPlaying: false }))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-8">เกมใหม่</h1>
        
        {/* Game UI */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-4">
            <p className="text-lg">คะแนน: {gameState.score}</p>
          </div>
          
          {!gameState.isPlaying ? (
            <button
              onClick={startGame}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              เริ่มเกม
            </button>
          ) : (
            <div>
              {/* Game content */}
              <button
                onClick={endGame}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                จบเกม
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

### 2. **การเพิ่มเสียงในเกม**

```typescript
// lib/utils.ts
export const playSound = (soundType: 'click' | 'success' | 'error' | 'custom') => {
  try {
    const audio = new Audio(`/sounds/${soundType}.mp3`)
    audio.volume = 0.3
    audio.play().catch(console.error)
  } catch (error) {
    console.error('Error playing sound:', error)
  }
}

// การใช้งาน
import { playSound } from '@/lib/utils'

const handleClick = () => {
  playSound('click')
  // Game logic
}
```

## 📊 Mood Tracker Development

### 1. **การเพิ่มประเภทอารมณ์ใหม่**

```typescript
// lib/constants.ts
export const MOOD_TYPES = {
  EXCELLENT: { value: 5, label: 'ยอดเยี่ยม', color: 'bg-green-500', emoji: '😊' },
  GOOD: { value: 4, label: 'ดี', color: 'bg-blue-500', emoji: '🙂' },
  NORMAL: { value: 3, label: 'ปกติ', color: 'bg-yellow-500', emoji: '😐' },
  BAD: { value: 2, label: 'ไม่ดี', color: 'bg-orange-500', emoji: '😔' },
  TERRIBLE: { value: 1, label: 'แย่มาก', color: 'bg-red-500', emoji: '😢' },
  // เพิ่มประเภทใหม่
  EXCITED: { value: 6, label: 'ตื่นเต้น', color: 'bg-purple-500', emoji: '🤩' }
} as const
```

### 2. **การปรับแต่งกราฟ**

```typescript
// การสร้างข้อมูลกราฟ
const chartData = {
  labels: weeklyData.map(entry => formatShortDate(entry.date)),
  datasets: [
    {
      label: 'อารมณ์รายสัปดาห์',
      data: weeklyData.map(entry => entry.mood),
      borderColor: 'rgb(147, 51, 234)',
      backgroundColor: 'rgba(147, 51, 234, 0.1)',
      tension: 0.4
    }
  ]
}

// การตั้งค่ากราฟ
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 5,
      ticks: {
        stepSize: 1
      }
    }
  }
}
```

## 🎨 UI/UX Development

### 1. **การสร้าง Component ใหม่**

```typescript
// app/components/NewComponent.tsx
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface NewComponentProps {
  title: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export default function NewComponent({ 
  title, 
  children, 
  variant = 'primary' 
}: NewComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        bg-white rounded-lg shadow-md p-6
        ${variant === 'primary' ? 'border-l-4 border-lavender-500' : 'border-l-4 border-blue-500'}
      `}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="text-gray-600">
        {children}
      </div>
    </motion.div>
  )
}
```

### 2. **การเพิ่ม Animation**

```typescript
// การใช้ Framer Motion
import { motion, AnimatePresence } from 'framer-motion'

// Fade in animation
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Slide in animation
<motion.div
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Content
</motion.div>

// Hover animation
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
>
  Click me
</motion.button>
```

## 🔧 Custom Hooks Development

### 1. **การสร้าง Custom Hook ใหม่**

```typescript
// lib/hooks/useGameState.ts
import { useState, useCallback } from 'react'

interface GameState {
  score: number
  level: number
  isPlaying: boolean
  isPaused: boolean
}

export function useGameState(initialState: Partial<GameState> = {}) {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    isPlaying: false,
    isPaused: false,
    ...initialState
  })

  const startGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPlaying: true, isPaused: false }))
  }, [])

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: true }))
  }, [])

  const resumeGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: false }))
  }, [])

  const endGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPlaying: false, isPaused: false }))
  }, [])

  const updateScore = useCallback((points: number) => {
    setGameState(prev => ({ ...prev, score: prev.score + points }))
  }, [])

  const nextLevel = useCallback(() => {
    setGameState(prev => ({ ...prev, level: prev.level + 1 }))
  }, [])

  return {
    gameState,
    startGame,
    pauseGame,
    resumeGame,
    endGame,
    updateScore,
    nextLevel
  }
}
```

### 2. **การใช้งาน Custom Hook**

```typescript
// ใน component
const {
  gameState,
  startGame,
  pauseGame,
  resumeGame,
  endGame,
  updateScore,
  nextLevel
} = useGameState()

// การใช้งาน
const handleStart = () => {
  startGame()
  // Additional logic
}

const handleScore = (points: number) => {
  updateScore(points)
  if (gameState.score >= 100) {
    nextLevel()
  }
}
```

## 🧪 Testing Development

### 1. **การเขียน Unit Tests**

```typescript
// __tests__/utils.test.ts
import { formatThaiDate, validateInput } from '@/lib/utils'

describe('Utility Functions', () => {
  describe('formatThaiDate', () => {
    test('formats date correctly', () => {
      const date = new Date('2024-01-15')
      const formatted = formatThaiDate(date)
      expect(formatted).toBe('15 มกราคม 2567')
    })

    test('handles invalid date', () => {
      const invalidDate = new Date('invalid')
      const formatted = formatThaiDate(invalidDate)
      expect(formatted).toBe('วันที่ไม่ถูกต้อง')
    })
  })

  describe('validateInput', () => {
    test('validates safe input', () => {
      const safeInput = 'Hello world'
      expect(validateInput(safeInput)).toBe(true)
    })

    test('rejects dangerous input', () => {
      const dangerousInput = '<script>alert("xss")</script>'
      expect(validateInput(dangerousInput)).toBe(false)
    })
  })
})
```

### 2. **การเขียน Component Tests**

```typescript
// __tests__/components/NewComponent.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import NewComponent from '@/app/components/NewComponent'

describe('NewComponent', () => {
  test('renders with title and children', () => {
    render(
      <NewComponent title="Test Title">
        <p>Test content</p>
      </NewComponent>
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  test('applies correct variant styles', () => {
    render(
      <NewComponent title="Test" variant="secondary">
        Content
      </NewComponent>
    )

    const component = screen.getByText('Test').closest('div')
    expect(component).toHaveClass('border-blue-500')
  })
})
```

## 🚀 Performance Optimization

### 1. **การ Optimize Components**

```typescript
// ใช้ React.memo สำหรับ expensive components
const ExpensiveComponent = React.memo(({ data }: { data: any[] }) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveCalculation(item))
  }, [data])

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
})

// ใช้ useCallback สำหรับ event handlers
const handleClick = useCallback((id: string) => {
  // Handle click
}, [])
```

### 2. **การ Optimize Images**

```typescript
// ใช้ Next.js Image component
import Image from 'next/image'

<Image
  src="/images/example.jpg"
  alt="Example"
  width={300}
  height={200}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  priority={false}
/>
```

## 🔒 Security Best Practices

### 1. **Input Validation**

```typescript
// lib/utils.ts
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove JavaScript protocol
    .trim()
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
```

### 2. **API Key Protection**

```typescript
// lib/gemini.ts
const API_KEY = process.env.GOOGLE_AI_API_KEY

if (!API_KEY) {
  throw new Error('GOOGLE_AI_API_KEY is required')
}

// ใช้ใน server-side only
export async function generateResponse(prompt: string): Promise<string> {
  // API call logic
}
```

## 📝 Documentation Best Practices

### 1. **JSDoc Comments**

```typescript
/**
 * Generates a response using AI based on user input
 * @param prompt - The user's input text
 * @param conversationHistory - Previous conversation messages
 * @returns Promise<string> - AI generated response
 * @throws {Error} When API key is invalid or network error occurs
 */
export async function generateResponse(
  prompt: string, 
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  // Implementation
}
```

### 2. **README Files**

```markdown
# Component Name

Brief description of what this component does.

## Props

- `title` (string, required): The title to display
- `variant` ('primary' | 'secondary', optional): The visual variant

## Usage

```tsx
import ComponentName from '@/components/ComponentName'

<ComponentName title="Hello" variant="primary">
  Content
</ComponentName>
```

## Examples

Show different use cases and examples.
```

## 🎯 Best Practices Summary

### 1. **Code Organization**
- แยก logic ออกจาก UI components
- ใช้ custom hooks สำหรับ reusable logic
- จัดกลุ่มไฟล์ตาม functionality
- ใช้ constants แทน hardcoded values

### 2. **Performance**
- ใช้ React.memo สำหรับ expensive components
- ใช้ useMemo และ useCallback อย่างเหมาะสม
- Optimize images และ assets
- Implement code splitting

### 3. **Type Safety**
- ใช้ TypeScript strict mode
- กำหนด types สำหรับทุก data structures
- ใช้ interfaces สำหรับ component props
- Validate API responses

### 4. **Error Handling**
- ใช้ try-catch blocks ใน async operations
- Implement error boundaries
- ให้ user-friendly error messages
- Log errors สำหรับ debugging

### 5. **Testing**
- เขียน unit tests สำหรับ utility functions
- เขียน component tests สำหรับ UI
- ใช้ integration tests สำหรับ user flows
- Maintain good test coverage

---

**หมายเหตุ**: คู่มือนี้ครอบคลุมพื้นฐานการพัฒนาโปรเจค AI เพื่อนที่ปรึกษา สำหรับข้อมูลเพิ่มเติม ดูเอกสารอื่นๆ ในโปรเจค 