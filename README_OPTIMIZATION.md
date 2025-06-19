# AI Companion App - Optimization Guide

## การใช้งาน Optimization Scripts

### 1. การรัน Optimization Scripts

```bash
# รัน optimization ทั้งหมด
npm run optimize

# หรือรันทีละขั้นตอน
npm run lint:fix      # แก้ไข linting errors
npm run type-check    # ตรวจสอบ TypeScript types
npm run build         # build production
```

### 2. การใช้งาน Custom Hooks

#### useLocalStorage
```typescript
import { useLocalStorage } from '@/lib/hooks'

function MyComponent() {
  const [data, setData] = useLocalStorage('my-key', initialValue)
  
  return (
    <div>
      <button onClick={() => setData(newValue)}>
        Update Data
      </button>
    </div>
  )
}
```

#### useDebounce
```typescript
import { useDebounce } from '@/lib/hooks'

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  
  useEffect(() => {
    // API call with debounced value
    searchAPI(debouncedSearchTerm)
  }, [debouncedSearchTerm])
}
```

#### useScrollToBottom
```typescript
import { useScrollToBottom } from '@/lib/hooks'

function ChatComponent() {
  const { scrollRef, scrollToBottom } = useScrollToBottom()
  
  return (
    <div>
      <div className="messages">
        {/* messages */}
      </div>
      <div ref={scrollRef} />
    </div>
  )
}
```

### 3. การใช้งาน Utility Functions

#### Date Formatting
```typescript
import { formatThaiDate, formatShortDate } from '@/lib/utils'

const date = new Date()
const thaiDate = formatThaiDate(date)
const shortDate = formatShortDate(date)
```

#### Storage Operations
```typescript
import { storage } from '@/lib/utils'

// Safe storage operations
storage.set('key', value)
const data = storage.get('key', defaultValue)
storage.remove('key')
```

#### Validation
```typescript
import { isValidEmail, isValidPhoneNumber } from '@/lib/utils'

const isValid = isValidEmail('test@example.com')
const isValidPhone = isValidPhoneNumber('0812345678')
```

### 4. การใช้งาน Constants

```typescript
import { 
  APP_CONFIG, 
  MOOD_LABELS, 
  PHQ9_QUESTIONS,
  ERROR_MESSAGES 
} from '@/lib/constants'

// ใช้ constants แทน hardcoded values
const appName = APP_CONFIG.name
const moodOptions = MOOD_LABELS
const questions = PHQ9_QUESTIONS
const errorMsg = ERROR_MESSAGES.NETWORK_ERROR
```

### 5. Performance Best Practices

#### 1. ใช้ useCallback และ useMemo
```typescript
// ✅ Good
const handleClick = useCallback(() => {
  // expensive operation
}, [dependency])

const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data)
}, [data])

// ❌ Bad
const handleClick = () => {
  // recreated on every render
}
```

#### 2. Optimize Re-renders
```typescript
// ✅ Good - Memoized component
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{expensiveRender(data)}</div>
})

// ✅ Good - Memoized value
const memoizedData = useMemo(() => processData(rawData), [rawData])
```

#### 3. Cleanup Effects
```typescript
useEffect(() => {
  const timer = setInterval(() => {
    // do something
  }, 1000)
  
  return () => clearInterval(timer) // ✅ Cleanup
}, [])
```

### 6. Code Quality Tools

#### ESLint Configuration
```bash
# ตรวจสอบ code quality
npm run lint

# แก้ไข errors อัตโนมัติ
npm run lint:fix
```

#### TypeScript Checking
```bash
# ตรวจสอบ TypeScript types
npm run type-check
```

#### Code Formatting
```bash
# Format code
npm run format

# ตรวจสอบ formatting
npm run format:check
```

### 7. Bundle Analysis

```bash
# วิเคราะห์ bundle size
npm run analyze
```

### 8. Testing

```bash
# รัน tests
npm run test

# รัน tests แบบ watch mode
npm run test:watch

# รัน tests พร้อม coverage
npm run test:coverage
```

### 9. Development Workflow

#### 1. Development
```bash
npm run dev
```

#### 2. Pre-commit Checks
```bash
npm run optimize
```

#### 3. Production Build
```bash
npm run build
npm start
```

### 10. Performance Monitoring

#### 1. React DevTools Profiler
- เปิด React DevTools
- ไปที่ Profiler tab
- Record และ analyze performance

#### 2. Bundle Analyzer
```bash
npm run analyze
```

#### 3. Lighthouse
- เปิด Chrome DevTools
- ไปที่ Lighthouse tab
- รัน performance audit

### 11. Common Optimization Patterns

#### 1. Lazy Loading
```typescript
import dynamic from 'next/dynamic'

const LazyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>
})
```

#### 2. Virtual Scrolling
```typescript
// สำหรับ lists ที่มีข้อมูลเยอะ
import { FixedSizeList as List } from 'react-window'

const VirtualList = ({ items }) => (
  <List
    height={400}
    itemCount={items.length}
    itemSize={50}
  >
    {({ index, style }) => (
      <div style={style}>
        {items[index]}
      </div>
    )}
  </List>
)
```

#### 3. Image Optimization
```typescript
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={500}
  height={300}
  priority={true} // สำหรับ above-the-fold images
/>
```

### 12. Troubleshooting

#### Performance Issues
1. ตรวจสอบ React DevTools Profiler
2. ดู bundle size ด้วย analyzer
3. ตรวจสอบ network requests
4. ดู memory usage

#### Build Issues
1. รัน `npm run clean` แล้ว build ใหม่
2. ตรวจสอบ TypeScript errors
3. ตรวจสอบ ESLint errors
4. ตรวจสอบ dependencies

#### Runtime Issues
1. ตรวจสอบ browser console
2. ตรวจสอบ network tab
3. ตรวจสอบ application tab
4. ใช้ error boundaries

### 13. Maintenance

#### Regular Tasks
- รัน `npm run optimize` ก่อน commit
- ตรวจสอบ bundle size อย่างสม่ำเสมอ
- Update dependencies อย่างสม่ำเสมอ
- Monitor performance metrics

#### Code Review Checklist
- [ ] ใช้ useCallback/useMemo อย่างเหมาะสม
- [ ] ไม่มี memory leaks
- [ ] Cleanup effects อย่างถูกต้อง
- [ ] ใช้ constants แทน hardcoded values
- [ ] TypeScript types ครบถ้วน
- [ ] ESLint ไม่มี errors
- [ ] Performance ไม่แย่ลง 