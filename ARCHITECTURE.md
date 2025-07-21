# สถาปัตยกรรมโปรเจค AI เพื่อนที่ปรึกษา

## 🏗️ สถาปัตยกรรมโดยรวม

### 1. **Frontend Architecture (Next.js 14 App Router)**

```
┌─────────────────────────────────────────────────────────────┐
│                    Client-Side (Browser)                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   React     │  │  TypeScript │  │ Tailwind    │         │
│  │ Components  │  │   Types     │  │    CSS      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                    Next.js App Router                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Layout    │  │   Pages     │  │   API       │         │
│  │ Components  │  │  (Routes)   │  │  Routes     │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

### 2. **Data Flow Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Input    │───▶│  Expert System  │───▶│  Rule-Based     │
│   (Chat/Mood)   │    │   Analysis      │    │   Response      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Local Storage  │    │  Gemini AI API  │    │  Conversation   │
│   (Mood Data)   │    │   (External)    │    │   History       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🧠 AI System Architecture

### 1. **Expert System Layer**

```typescript
// lib/expert-system.ts
interface ExpertAnalysis {
  source: 'rule' | 'prompt' | 'gemini'
  category: string
  confidence: number
  answer?: string
}

// Rule-based responses for common questions
const commonQuestions: Record<string, string> = {
  'สวัสดี': 'สวัสดีครับ/ค่ะ มีอะไรให้ช่วยเหลือไหมครับ?',
  'ขอบคุณ': 'ยินดีครับ/ค่ะ มีอะไรให้ช่วยเหลือเพิ่มเติมไหมครับ?'
}
```

### 2. **Gemini AI Integration**

```typescript
// lib/gemini.ts
export async function generateResponse(
  prompt: string, 
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  // 1. Expert system analysis
  const expertResult = processQuestion(prompt)
  
  // 2. Rule-based response (if available)
  if (expertResult.source === 'rule') {
    return expertResult.answer
  }
  
  // 3. Gemini AI with context
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.0-flash',
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
    }
  })
  
  // 4. Send with conversation history
  return await model.generateContent(expertPrompt)
}
```

### 3. **Conversation Management**

```typescript
// Conversation History Structure
interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// History Management
const conversationHistory = messages
  .slice(-10) // Keep last 10 messages
  .map(msg => ({
    role: msg.role,
    content: msg.content
  }))
```

## 📊 State Management Architecture

### 1. **Local State (React Hooks)**

```typescript
// Chat State
const [messages, setMessages] = useState<Message[]>([])
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState<string | null>(null)

// Mood Tracker State
const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
const [selectedDate, setSelectedDate] = useState(new Date())
```

### 2. **Persistent State (LocalStorage)**

```typescript
// lib/hooks/useLocalStorage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue] as const
}
```

## 🎮 Game Architecture

### 1. **Game State Management**

```typescript
// Memory Game Example
interface GameState {
  cards: Card[]
  flippedCards: number[]
  matchedPairs: number[]
  score: number
  isGameComplete: boolean
}

// Game Logic
const handleCardClick = useCallback((index: number) => {
  if (flippedCards.length === 2 || flippedCards.includes(index)) return
  
  setFlippedCards(prev => [...prev, index])
  
  if (flippedCards.length === 1) {
    // Check for match
    const firstCard = cards[flippedCards[0]]
    const secondCard = cards[index]
    
    if (firstCard.id === secondCard.id) {
      setMatchedPairs(prev => [...prev, firstCard.id])
      setScore(prev => prev + 10)
    }
    
    setTimeout(() => setFlippedCards([]), 1000)
  }
}, [cards, flippedCards, matchedPairs])
```

### 2. **Audio Integration**

```typescript
// lib/utils.ts - Audio utilities
export const playSound = (soundType: 'click' | 'success' | 'error') => {
  const audio = new Audio(`/sounds/${soundType}.mp3`)
  audio.volume = 0.3
  audio.play().catch(console.error)
}
```

## 📱 Responsive Design Architecture

### 1. **Mobile-First Approach**

```css
/* Tailwind CSS Breakpoints */
/* sm: 640px and up */
/* md: 768px and up */
/* lg: 1024px and up */
/* xl: 1280px and up */

/* Mobile Navigation */
.nav-mobile {
  @apply md:hidden fixed bottom-0 left-0 right-0 bg-white border-t;
}

/* Desktop Navigation */
.nav-desktop {
  @apply hidden md:block bg-white shadow-sm sticky top-0;
}
```

### 2. **Component Responsiveness**

```typescript
// Responsive Component Example
const ResponsiveCard = ({ children }: { children: React.ReactNode }) => (
  <div className="
    w-full 
    sm:w-auto 
    md:w-80 
    lg:w-96 
    p-4 
    md:p-6 
    lg:p-8
    rounded-lg 
    shadow-md 
    hover:shadow-lg 
    transition-all
  ">
    {children}
  </div>
)
```

## 🔒 Security Architecture

### 1. **API Key Management**

```typescript
// Environment Variables
const API_KEY = process.env.GOOGLE_AI_API_KEY

// Validation
if (!API_KEY) {
  throw new Error('GOOGLE_AI_API_KEY is required')
}
```

### 2. **Input Validation**

```typescript
// lib/utils.ts
export const validateInput = (input: string): boolean => {
  // Remove dangerous characters
  const sanitized = input.replace(/[<>]/g, '')
  
  // Check length
  if (sanitized.length > 1000) return false
  
  // Check for malicious patterns
  const maliciousPatterns = [
    /script/i,
    /javascript:/i,
    /on\w+=/i
  ]
  
  return !maliciousPatterns.some(pattern => pattern.test(sanitized))
}
```

## 🚀 Performance Architecture

### 1. **Code Splitting**

```typescript
// Dynamic imports for large components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false
})
```

### 2. **Memoization Strategy**

```typescript
// React.memo for expensive components
const ExpensiveChart = React.memo(({ data }: { data: ChartData }) => (
  <Line data={data} options={chartOptions} />
))

// useMemo for expensive calculations
const processedData = useMemo(() => {
  return rawData.map(item => ({
    ...item,
    processed: expensiveCalculation(item)
  }))
}, [rawData])

// useCallback for event handlers
const handleSubmit = useCallback((e: React.FormEvent) => {
  e.preventDefault()
  // Handle form submission
}, [formData])
```

### 3. **Bundle Optimization**

```javascript
// next.config.js
const nextConfig = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons', 'framer-motion'],
  },
  
  webpack: (config) => {
    // Bundle analyzer
    if (process.env.ANALYZE === 'true') {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
        })
      )
    }
    return config
  }
}
```

## 📊 Data Flow Patterns

### 1. **Unidirectional Data Flow**

```
User Action → State Update → UI Re-render → User Feedback
```

### 2. **Event-Driven Architecture**

```typescript
// Event handling pattern
const handleUserAction = useCallback(async (action: UserAction) => {
  try {
    setIsLoading(true)
    setError(null)
    
    const result = await processAction(action)
    updateState(result)
    
  } catch (error) {
    setError(error.message)
  } finally {
    setIsLoading(false)
  }
}, [])
```

## 🔄 Error Handling Architecture

### 1. **Error Boundaries**

```typescript
// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />
    }

    return this.props.children
  }
}
```

### 2. **API Error Handling**

```typescript
// lib/gemini.ts
export async function generateResponse(prompt: string): Promise<string> {
  try {
    const response = await model.generateContent(prompt)
    return response.text()
  } catch (error) {
    console.error('AI API Error:', error)
    
    if (error.code === 'API_KEY_INVALID') {
      throw new Error('API key ไม่ถูกต้อง กรุณาตรวจสอบการตั้งค่า')
    }
    
    if (error.code === 'RATE_LIMIT_EXCEEDED') {
      throw new Error('เกินขีดจำกัดการใช้งาน กรุณาลองใหม่ในภายหลัง')
    }
    
    throw new Error('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง')
  }
}
```

## 🎯 Testing Architecture

### 1. **Unit Testing Strategy**

```typescript
// __tests__/utils.test.ts
describe('Utility Functions', () => {
  test('formatThaiDate formats date correctly', () => {
    const date = new Date('2024-01-15')
    const formatted = formatThaiDate(date)
    expect(formatted).toBe('15 มกราคม 2567')
  })
  
  test('validateInput sanitizes dangerous input', () => {
    const dangerousInput = '<script>alert("xss")</script>'
    const sanitized = validateInput(dangerousInput)
    expect(sanitized).toBe('scriptalert("xss")/script')
  })
})
```

### 2. **Integration Testing**

```typescript
// __tests__/chat.test.tsx
describe('Chat Component', () => {
  test('sends message and receives response', async () => {
    render(<ChatPage />)
    
    const input = screen.getByPlaceholderText('พิมพ์ข้อความ...')
    const sendButton = screen.getByText('ส่ง')
    
    fireEvent.change(input, { target: { value: 'สวัสดี' } })
    fireEvent.click(sendButton)
    
    await waitFor(() => {
      expect(screen.getByText('สวัสดีครับ/ค่ะ')).toBeInTheDocument()
    })
  })
})
```

---

**สรุป**: สถาปัตยกรรมนี้เน้นความเรียบง่าย, ประสิทธิภาพ, และความปลอดภัย โดยใช้ React patterns ที่เป็นมาตรฐานและ Next.js features ที่เหมาะสม 