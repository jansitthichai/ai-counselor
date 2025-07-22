# การปรับปรุงการ Scroll เพื่อให้มองเห็นข้อมูลส่วนท้ายของ AI Message - AI เพื่อนที่ปรึกษา

## 🎯 ปัญหาที่แก้ไข

### ❌ ปัญหาเดิม:
- เมื่อล็อคที่คำถาม AI message จะอยู่ที่ด้านล่างของหน้าจอ
- มองไม่เห็นข้อมูลส่วนท้ายของ AI message เช่น expert info, confidence score
- การอ่าน AI message ไม่สะดวก

### ✅ การแก้ไข:
- เพิ่มการ scroll ขึ้นอีกประมาณ 1 cm (38px) หลังจากล็อคที่คำถาม
- ทำให้มองเห็นข้อมูลส่วนท้ายของ AI message ได้ชัดเจนขึ้น
- ปรับปรุงการอ่าน AI message ให้สะดวกขึ้น

## 🔧 การปรับปรุงที่ทำ

### 1. **เพิ่มการ scroll ขึ้นในฟังก์ชัน scrollToLastUserMessage**
```typescript
// ฟังก์ชันสำหรับล็อคที่คำถามล่าสุด
const scrollToLastUserMessage = useCallback(() => {
  if (userScrolled) return
  
  // หาคำถามล่าสุด (user message สุดท้าย)
  const userMessages = messages.filter(msg => msg.role === 'user')
  if (userMessages.length > 0) {
    const lastUserMessage = userMessages[userMessages.length - 1]
    const lastUserIndex = messages.findIndex(msg => msg === lastUserMessage)
    
    if (lastUserIndex !== -1) {
      const userMessageElement = document.querySelector(`[data-message-index="${lastUserIndex}"]`)
      if (userMessageElement) {
        userMessageElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
        // เลื่อนขึ้นอีกประมาณ 1 cm (38px) เพื่อให้มองเห็นข้อมูลส่วนท้ายของ AI message
        setTimeout(() => {
          window.scrollBy({
            top: -38,
            behavior: 'smooth'
          })
        }, 100)
        return
      }
    }
  }
  
  // Fallback: Scroll ไปที่ล่างสุดของหน้า
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  })
}, [userScrolled, messages])
```

### 2. **เพิ่มการ scroll ขึ้นในฟังก์ชัน scrollToLastUserMessageOnce**
```typescript
// ฟังก์ชันสำหรับล็อคที่คำถามล่าสุดแบบไม่ล็อคตลอดเวลา
const scrollToLastUserMessageOnce = useCallback(() => {
  // หาคำถามล่าสุด (user message สุดท้าย)
  const userMessages = messages.filter(msg => msg.role === 'user')
  if (userMessages.length > 0) {
    const lastUserMessage = userMessages[userMessages.length - 1]
    const lastUserIndex = messages.findIndex(msg => msg === lastUserMessage)
    
    if (lastUserIndex !== -1) {
      const userMessageElement = document.querySelector(`[data-message-index="${lastUserIndex}"]`)
      if (userMessageElement) {
        userMessageElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
        // เลื่อนขึ้นอีกประมาณ 1 cm (38px) เพื่อให้มองเห็นข้อมูลส่วนท้ายของ AI message
        setTimeout(() => {
          window.scrollBy({
            top: -38,
            behavior: 'smooth'
          })
        }, 100)
        return
      }
    }
  }
  
  // Fallback: Scroll ไปที่ล่างสุดของหน้า
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  })
}, [messages])
```

### 3. **เพิ่มการ scroll ขึ้นเมื่อส่งข้อความใหม่**
```typescript
// ล็อคที่คำถามใหม่
setTimeout(() => {
  const userMessageElement = document.querySelector(`[data-message-index="${newMessageIndex}"]`)
  if (userMessageElement) {
    userMessageElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
    // เลื่อนขึ้นอีกประมาณ 1 cm (38px) เพื่อให้มองเห็นข้อมูลส่วนท้ายของ AI message
    setTimeout(() => {
      window.scrollBy({
        top: -38,
        behavior: 'smooth'
      })
    }, 100)
  }
}, 100)
```

### 4. **เพิ่มการ scroll ขึ้นเมื่อ AI เริ่มตอบ**
```typescript
// ล็อคที่คำถามใหม่เมื่อ AI เริ่มตอบ
setTimeout(() => {
  // ใช้ newMessageIndex ที่เก็บไว้แล้ว
  const userMessageElement = document.querySelector(`[data-message-index="${newMessageIndex}"]`)
  if (userMessageElement) {
    userMessageElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
    // เลื่อนขึ้นอีกประมาณ 1 cm (38px) เพื่อให้มองเห็นข้อมูลส่วนท้ายของ AI message
    setTimeout(() => {
      window.scrollBy({
        top: -38,
        behavior: 'smooth'
      })
    }, 100)
  }
}, 100)
```

## 🎨 การทำงานของระบบ

### 1. **เมื่อผู้ใช้ส่งข้อความใหม่:**
1. ล็อคที่คำถามใหม่โดยใช้ `block: 'center'`
2. รอ 100ms แล้วเลื่อนขึ้นอีก 38px (ประมาณ 1 cm)
3. ทำให้มองเห็นข้อมูลส่วนท้ายของ AI message ได้ชัดเจนขึ้น

### 2. **เมื่อ AI เริ่มตอบ:**
1. ล็อคที่คำถามใหม่โดยใช้ `block: 'center'`
2. รอ 100ms แล้วเลื่อนขึ้นอีก 38px (ประมาณ 1 cm)
3. ทำให้มองเห็นข้อมูลส่วนท้ายของ AI message ได้ชัดเจนขึ้น

### 3. **ระหว่าง AI พิมพ์:**
1. ล็อคที่คำถามโดยใช้ `block: 'center'`
2. รอ 100ms แล้วเลื่อนขึ้นอีก 38px (ประมาณ 1 cm)
3. ทำให้มองเห็นข้อมูลส่วนท้ายของ AI message ได้ชัดเจนขึ้น

### 4. **เมื่อ AI ตอบเสร็จ:**
1. ล็อคที่คำถามครั้งเดียวโดยใช้ `scrollToLastUserMessageOnce`
2. รอ 100ms แล้วเลื่อนขึ้นอีก 38px (ประมาณ 1 cm)
3. ทำให้มองเห็นข้อมูลส่วนท้ายของ AI message ได้ชัดเจนขึ้น

## 📱 การทำงานบนอุปกรณ์ต่างๆ

### Desktop:
- การ scroll ขึ้น 38px ทำงานได้ดี
- มองเห็นข้อมูลส่วนท้ายของ AI message ชัดเจน
- การอ่าน AI message สะดวกขึ้น

### Mobile:
- การ scroll ขึ้น 38px ทำงานได้ดีบนมือถือ
- มองเห็นข้อมูลส่วนท้ายของ AI message ชัดเจน
- การอ่าน AI message สะดวกขึ้น

## 🔍 การคำนวณระยะทาง

### 1 cm = 38px:
- ใช้การคำนวณมาตรฐาน: 1 cm ≈ 37.8px
- ปัดขึ้นเป็น 38px เพื่อให้ง่ายต่อการคำนวณ
- เหมาะสมสำหรับการมองเห็นข้อมูลส่วนท้ายของ AI message

### การใช้ setTimeout:
- รอ 100ms หลังจาก `scrollIntoView` เสร็จ
- ให้การ scroll แรกเสร็จก่อนแล้วค่อย scroll ขึ้น
- ทำให้การ scroll เป็นธรรมชาติและ smooth

## 🚀 ประโยชน์ของการปรับปรุง

### 1. **การมองเห็นที่ดีขึ้น**
- มองเห็นข้อมูลส่วนท้ายของ AI message ได้ชัดเจน
- เห็น expert info, confidence score ได้ง่ายขึ้น
- การอ่าน AI message สะดวกขึ้น

### 2. **การใช้งานที่สะดวกขึ้น**
- ไม่ต้องเลื่อนด้วยตนเองเพื่อดูข้อมูลส่วนท้าย
- ระบบจัดการการ scroll ให้อัตโนมัติ
- ประสบการณ์การใช้งานที่ดีขึ้น

### 3. **การแสดงผลที่ดีขึ้น**
- AI message แสดงผลได้ครบถ้วน
- ข้อมูลสำคัญไม่ถูกซ่อนอยู่ด้านล่าง
- การอ่านข้อมูลเป็นธรรมชาติมากขึ้น

## 📋 สรุป

การปรับปรุงนี้ทำให้การมองเห็นข้อมูลส่วนท้ายของ AI message ดีขึ้น:

- ✅ **มองเห็นข้อมูลส่วนท้ายได้ชัดเจน** เลื่อนขึ้น 38px (ประมาณ 1 cm)
- ✅ **การอ่าน AI message สะดวกขึ้น** ไม่ต้องเลื่อนด้วยตนเอง
- ✅ **การแสดงผลที่ดีขึ้น** ข้อมูลสำคัญไม่ถูกซ่อน
- ✅ **ประสบการณ์การใช้งานที่ดีขึ้น** ระบบจัดการการ scroll ให้อัตโนมัติ
- ✅ **ทำงานได้ดีทั้ง Desktop และ Mobile** รองรับทุกอุปกรณ์

---

**หมายเหตุ**: การปรับปรุงนี้ทำให้การมองเห็นข้อมูลส่วนท้ายของ AI message ดีขึ้นโดยการเพิ่มการ scroll ขึ้นอีกประมาณ 1 cm หลังจากล็อคที่คำถาม ทำให้ผู้ใช้สามารถเห็นข้อมูลสำคัญได้ชัดเจนขึ้น 