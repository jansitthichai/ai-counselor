# การแก้ไขปัญหา Gemini API Overloaded

## 🚨 ปัญหาที่พบ
```
เกิดข้อผิดพลาดในการเชื่อมต่อกับ Google Gemini: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent: [503 ] The model is overloaded. Please try again later.
```

## 🔧 การแก้ไขที่ปรับปรุงแล้ว

### 1. Model Fallback System
ระบบจะลองใช้โมเดลตามลำดับความต้องการ:

```typescript
const availableModels = [
  'gemini-1.5-flash',  // โมเดลหลัก (เร็วที่สุด)
  'gemini-1.5-pro',    // โมเดลสำรอง (คุณภาพสูง)
  'gemini-1.0-pro'     // โมเดลสำรองสุดท้าย
]
```

### 2. Dynamic Model Switching
เมื่อเกิด overloaded error ระบบจะเปลี่ยนไปใช้โมเดลถัดไปโดยอัตโนมัติ:

```typescript
async function switchToNextModel(): Promise<boolean> {
  if (!genAI) return false
  
  const currentIndex = availableModels.indexOf(currentModelName)
  const nextModels = availableModels.slice(currentIndex + 1)
  
  for (const modelName of nextModels) {
    try {
      currentModel = genAI.getGenerativeModel({ model: modelName })
      currentModelName = modelName
      console.log(`🔄 เปลี่ยนไปใช้โมเดล ${modelName}`)
      return true
    } catch (modelError) {
      console.warn(`⚠️ โมเดล ${modelName} ไม่พร้อมใช้งาน:`, modelError)
      continue
    }
  }
  
  console.error('❌ ไม่มีโมเดลอื่นที่สามารถใช้ได้')
  return false
}
```

### 3. Enhanced Retry Logic
ระบบ retry ที่ปรับปรุงแล้วจะตรวจจับ overloaded error และเปลี่ยนโมเดล:

```typescript
async function retryApiCall<T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.warn(`❌ API call failed (attempt ${attempt}/${maxRetries}):`, errorMessage)
      
      // ตรวจสอบว่าเป็น overloaded error หรือไม่
      if (errorMessage.includes('overloaded') || errorMessage.includes('503')) {
        console.warn('🔄 พบ overloaded error ลองเปลี่ยนโมเดล...')
        const switched = await switchToNextModel()
        if (switched) {
          // ลองใหม่หลังจากเปลี่ยนโมเดล
          continue
        }
      }
      
      if (attempt === maxRetries) {
        throw error
      }
      
      // รอก่อนลองใหม่
      await new Promise(resolve => setTimeout(resolve, delay * attempt))
    }
  }
  throw new Error('Max retries exceeded')
}
```

### 4. Fallback Responses
ข้อความ fallback สำหรับกรณีที่ API ไม่ทำงาน:

```typescript
const fallbackResponses = [
  'ขออภัยครับ/ค่ะ ขณะนี้เซิร์ฟเวอร์ของ AI มีภาระงานสูง กรุณาลองใหม่อีกครั้งในภายหลัง',
  'ขออภัยครับ/ค่ะ ระบบ AI ขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง',
  'ขออภัยครับ/ค่ะ ไม่สามารถเชื่อมต่อกับ AI ได้ในขณะนี้ กรุณาลองใหม่อีกครั้งในภายหลัง',
  'ขออภัยครับ/ค่ะ ระบบ AI กำลังบำรุงรักษา กรุณาลองใหม่อีกครั้งในภายหลัง'
]
```

## 🎯 วิธีการทำงาน

1. **เริ่มต้น**: ระบบจะลองใช้ `gemini-1.5-flash` ก่อน
2. **เมื่อเกิด overloaded**: ระบบจะเปลี่ยนไปใช้ `gemini-1.5-pro`
3. **ถ้ายังไม่ทำงาน**: ระบบจะเปลี่ยนไปใช้ `gemini-1.0-pro`
4. **ถ้าทั้งหมดไม่ทำงาน**: ระบบจะแสดง fallback response

## 📊 การติดตามสถานะ

ระบบจะแสดง log เพื่อติดตามสถานะ:
- ✅ โมเดลที่ใช้งานอยู่
- 🔄 การเปลี่ยนโมเดล
- ⚠️ ข้อผิดพลาดที่เกิดขึ้น
- ❌ กรณีที่ไม่สามารถใช้โมเดลใดๆ ได้

## 🚀 การใช้งาน

ไม่ต้องทำอะไรเพิ่มเติม ระบบจะจัดการปัญหา overloaded โดยอัตโนมัติ:

1. เมื่อเกิด overloaded error
2. ระบบจะเปลี่ยนโมเดลโดยอัตโนมัติ
3. ลองใหม่อีกครั้ง
4. ถ้ายังไม่สำเร็จจะแสดง fallback response

## 🔍 การตรวจสอบ

ตรวจสอบ console log เพื่อดู:
- โมเดลที่ใช้งานอยู่
- การเปลี่ยนโมเดล
- ข้อผิดพลาดที่เกิดขึ้น

## 📝 หมายเหตุ

- การเปลี่ยนโมเดลอาจทำให้การตอบสนองช้าลงเล็กน้อย
- โมเดล `gemini-1.0-pro` อาจมีคุณภาพต่ำกว่าโมเดลใหม่
- ระบบจะพยายามใช้โมเดลที่ดีที่สุดที่พร้อมใช้งาน 