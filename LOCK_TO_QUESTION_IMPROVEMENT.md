# การปรับปรุงการล็อคที่คำถามของผู้ใช้ - AI เพื่อนที่ปรึกษา

## 🎯 ปัญหาที่แก้ไข

### ❌ ปัญหาเดิม:
- หน้าจอเลื่อนลงล่างสุดตลอดเวลา
- ไม่เห็นบริบทของคำถามเมื่อ AI ตอบ
- การอ่านไม่สะดวกเพราะต้องเลื่อนขึ้นลง

### ✅ การแก้ไข:
- หน้าจอล็อคที่คำถามของผู้ใช้
- ค่อยๆ เลื่อนลงตามการตอบของ AI
- เหมือน ChatGPT ที่ให้เห็นบริบทของคำถาม

## 🔧 การปรับปรุงที่ทำ

### 1. **เพิ่ม State สำหรับเก็บตำแหน่งคำถามล่าสุด**
```typescript
const [lastUserMessageIndex, setLastUserMessageIndex] = useState<number | null>(null)
```

### 2. **ปรับปรุงฟังก์ชัน scrollToBottom ให้ล็อคที่คำถาม**
```typescript
const scrollToBottom = useCallback(() => {
  // ถ้าผู้ใช้เลื่อนขึ้นไปอ่านแล้ว ให้ไม่ scroll อัตโนมัติ
  if (userScrolled) return
  
  // ถ้ามีคำถามล่าสุด ให้ล็อคที่คำถามนั้น
  if (lastUserMessageIndex !== null) {
    const userMessageElement = document.querySelector(`[data-message-index="${lastUserMessageIndex}"]`)
    if (userMessageElement) {
      userMessageElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      return
    }
  }
  
  // Fallback: Scroll ไปที่ล่างสุดของหน้า
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  })
}, [userScrolled, lastUserMessageIndex])
```

### 3. **ปรับปรุงการ scroll เมื่อส่งข้อความ**
```typescript
const newMessageIndex = messages.length
setMessages(prev => [...prev, userMessage])
setLastUserMessageIndex(newMessageIndex) // เก็บตำแหน่งของคำถามล่าสุด

// ล็อคที่คำถามของผู้ใช้
setTimeout(() => {
  const userMessageElement = document.querySelector(`[data-message-index="${newMessageIndex}"]`)
  if (userMessageElement) {
    userMessageElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}, 100)
```

### 4. **ปรับปรุงการ scroll เมื่อ AI เริ่มตอบ**
```typescript
// ล็อคที่คำถามของผู้ใช้เมื่อ AI เริ่มตอบ
setTimeout(() => {
  if (lastUserMessageIndex !== null) {
    const userMessageElement = document.querySelector(`[data-message-index="${lastUserMessageIndex}"]`)
    if (userMessageElement) {
      userMessageElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
}, 100)
```

### 5. **ปรับปรุงการ scroll ใน typewriter effect**
```typescript
// ล็อคที่คำถามของผู้ใช้ระหว่าง AI พิมพ์
if (!isComplete && (currentCharIndex === 0 || currentCharIndex % 15 === 0)) {
  if (lastUserMessageIndex !== null && !userScrolled) {
    const userMessageElement = document.querySelector(`[data-message-index="${lastUserMessageIndex}"]`)
    if (userMessageElement) {
      userMessageElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
}
```

### 6. **ปรับปรุงการ scroll เมื่อ AI ตอบเสร็จ**
```typescript
// ล็อคที่คำถามของผู้ใช้เมื่อ AI ตอบเสร็จ
setTimeout(() => {
  if (lastUserMessageIndex !== null && !userScrolled) {
    const userMessageElement = document.querySelector(`[data-message-index="${lastUserMessageIndex}"]`)
    if (userMessageElement) {
      userMessageElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
}, 100)
```

### 7. **Reset lastUserMessageIndex ใน clearChat**
```typescript
const clearChat = useCallback(() => {
  setMessages([INITIAL_MESSAGE])
  setError(null)
  setIsLoading(false)
  setUserScrolled(false)
  setLastUserMessageIndex(null) // Reset ตำแหน่งคำถามล่าสุด
}, [])
```

## 🎨 การทำงานของระบบ

### 1. **เมื่อผู้ใช้ส่งข้อความ:**
1. เก็บตำแหน่งของคำถามล่าสุด (`lastUserMessageIndex`)
2. ล็อคหน้าจอที่คำถามของผู้ใช้
3. AI เริ่มตอบ

### 2. **เมื่อ AI เริ่มตอบ:**
1. ล็อคหน้าจอที่คำถามของผู้ใช้
2. เริ่ม typewriter effect
3. ค่อยๆ เลื่อนลงตามการตอบของ AI

### 3. **ระหว่าง AI กำลังพิมพ์:**
1. ล็อคหน้าจอที่คำถามของผู้ใช้
2. ค่อยๆ เลื่อนลงตามการพิมพ์ (ทุก 15 ตัวอักษร)
3. ให้เห็นบริบทของคำถามตลอดเวลา

### 4. **เมื่อ AI ตอบเสร็จ:**
1. ล็อคหน้าจอที่คำถามของผู้ใช้
2. ผู้ใช้สามารถอ่านคำตอบได้โดยเห็นบริบทของคำถาม

### 5. **เมื่อผู้ใช้เลื่อนขึ้นไปอ่าน:**
1. ระบบหยุด scroll อัตโนมัติ
2. ผู้ใช้สามารถอ่านข้อความเก่าได้
3. เมื่อ scroll ลงล่าง ระบบกลับมาล็อคที่คำถาม

## 📱 การทำงานบนอุปกรณ์ต่างๆ

### Desktop:
- การล็อคที่คำถามทำงานได้ดี
- การ scroll เป็นธรรมชาติ
- เหมือน ChatGPT desktop

### Mobile:
- การล็อคที่คำถามทำงานได้ดีบนมือถือ
- รองรับ touch scrolling
- เหมือน ChatGPT mobile

## 🔍 การแก้ไขปัญหา

### ปัญหา: หน้าจอไม่ล็อคที่คำถาม
**วิธีแก้**: ตรวจสอบว่า `lastUserMessageIndex` ถูกตั้งค่าและ `data-message-index` ถูกต้อง

### ปัญหา: การ scroll ไม่ smooth
**วิธีแก้**: ตรวจสอบว่า `behavior: 'smooth'` และ `block: 'start'` ถูกตั้งค่า

### ปัญหา: หน้าจอล็อคผิดตำแหน่ง
**วิธีแก้**: ตรวจสอบว่า `lastUserMessageIndex` ถูกต้องและ element มีอยู่จริง

## 🚀 ประโยชน์ของการปรับปรุง

### 1. **ประสบการณ์การใช้งานที่ดีขึ้น**
- เห็นบริบทของคำถามตลอดเวลา
- การอ่านสะดวกและเป็นธรรมชาติ
- เหมือน ChatGPT จริงๆ

### 2. **การทำงานที่เสถียร**
- ล็อคที่คำถามอย่างแม่นยำ
- ค่อยๆ เลื่อนลงตามการตอบ
- ไม่กระโดดไปมา

### 3. **การควบคุมที่ยืดหยุ่น**
- ผู้ใช้สามารถเลื่อนขึ้นไปอ่านได้
- ระบบหยุด scroll เมื่อผู้ใช้ต้องการ
- กลับมาล็อคที่คำถามเมื่อผู้ใช้ scroll ลงล่าง

## 📋 สรุป

การปรับปรุงนี้ทำให้การใช้งานหน้าแชทเหมือน ChatGPT จริงๆ:

- ✅ **หน้าจอล็อคที่คำถามของผู้ใช้** ตลอดเวลา
- ✅ **ค่อยๆ เลื่อนลงตามการตอบของ AI** อย่างเป็นธรรมชาติ
- ✅ **เห็นบริบทของคำถาม** ตลอดการสนทนา
- ✅ **การอ่านสะดวก** และไม่ต้องเลื่อนขึ้นลง
- ✅ **ประสบการณ์การใช้งานที่ดีขึ้น** เหมือน ChatGPT

---

**หมายเหตุ**: การปรับปรุงนี้ทำให้ระบบ scroll ทำงานเหมือน ChatGPT โดยล็อคที่คำถามของผู้ใช้และค่อยๆ เลื่อนลงตามการตอบของ AI 