# ระบบจัดการบทความ (Admin System)

## 📋 ภาพรวม

ระบบจัดการบทความสำหรับผู้ดูแลระบบ ที่ต้องเข้าสู่ระบบก่อนใช้งาน

## 🔐 ข้อมูลการเข้าสู่ระบบ

- **Username**: `@dmin`
- **Password**: `p@ssw0rd`

## 🚀 ฟีเจอร์หลัก

### 1. ระบบ Authentication
- หน้า Login (`/admin/login`)
- ตรวจสอบ credentials
- เก็บ session ใน localStorage
- Redirect อัตโนมัติหากไม่ได้ login

### 2. จัดการบทความ
- **ดูรายการบทความ** (`/admin`)
  - แสดงรายการบทความทั้งหมด
  - แสดงข้อมูล: ชื่อ, หมวดหมู่, วันที่สร้าง, เนื้อหาย่อ
  - ปุ่มแก้ไขและลบ

- **เพิ่มบทความใหม่** (`/admin/create`)
  - ฟอร์มสำหรับเพิ่มบทความ
  - ฟิลด์: ชื่อ, หมวดหมู่, เนื้อหา
  - หมวดหมู่: ทั่วไป, ความเครียด, ภาวะซึมเศร้า, ความวิตกกังวล, ความสัมพันธ์, การเรียน, ครอบครัว

- **แก้ไขบทความ** (`/admin/edit/[id]`)
  - ฟอร์มสำหรับแก้ไขบทความ
  - โหลดข้อมูลบทความเดิม
  - อัปเดตข้อมูล

- **ลบบทความ** (`/admin`)
  - ยืนยันการลบ
  - ลบจากฐานข้อมูล

### 3. API Endpoints

#### GET `/api/articles`
- ดึงรายการบทความทั้งหมด

#### POST `/api/articles`
- เพิ่มบทความใหม่
- Body: `{ title, content, category }`

#### GET `/api/articles/[id]`
- ดึงข้อมูลบทความเฉพาะ

#### PUT `/api/articles/[id]`
- แก้ไขบทความ
- Body: `{ title, content, category }`

#### DELETE `/api/articles/[id]`
- ลบบทความ

## 📁 โครงสร้างไฟล์

```
app/
├── admin/
│   ├── login/
│   │   └── page.tsx          # หน้า Login
│   ├── create/
│   │   └── page.tsx          # หน้าเพิ่มบทความ
│   ├── edit/
│   │   └── [id]/
│   │       └── page.tsx      # หน้าแก้ไขบทความ
│   └── page.tsx              # หน้า Dashboard
├── api/
│   └── articles/
│       ├── route.ts          # API สำหรับ GET/POST
│       └── [id]/
│           └── route.ts      # API สำหรับ GET/PUT/DELETE
└── resources/
    └── page.tsx              # หน้าแสดงบทความ (เพิ่มลิงก์ admin)
data/
└── articles.json             # ไฟล์ข้อมูลบทความ
```

## 💾 การจัดเก็บข้อมูล

- ใช้ไฟล์ JSON (`data/articles.json`)
- สร้างโฟลเดอร์ `data` อัตโนมัติ
- ข้อมูลบทความ:
  ```json
  {
    "id": "timestamp",
    "title": "ชื่อบทความ",
    "content": "เนื้อหาบทความ",
    "category": "หมวดหมู่",
    "createdAt": "วันที่สร้าง",
    "updatedAt": "วันที่แก้ไข (ถ้ามี)"
  }
  ```

## 🎨 UI/UX Features

- **Responsive Design** - รองรับทุกขนาดหน้าจอ
- **Loading States** - แสดงสถานะการโหลด
- **Error Handling** - จัดการข้อผิดพลาด
- **Success Messages** - แสดงข้อความสำเร็จ
- **Confirmation Dialogs** - ยืนยันการลบ
- **Form Validation** - ตรวจสอบข้อมูล
- **Auto Redirect** - ไปหน้าอื่นอัตโนมัติ

## 🔒 Security

- ตรวจสอบ login ก่อนเข้าถึงหน้า admin
- ใช้ localStorage สำหรับ session
- ตรวจสอบ credentials ในฝั่ง client

## 🚀 การใช้งาน

1. เข้าไปที่ `/admin/login`
2. ใส่ Username: `@dmin` และ Password: `p@ssw0rd`
3. เข้าสู่ระบบและจัดการบทความ
4. สามารถเพิ่ม, แก้ไข, ลบบทความได้

## 📝 หมายเหตุ

- ระบบนี้ใช้ localStorage สำหรับ session management
- ข้อมูลบทความเก็บในไฟล์ JSON
- ควรเพิ่มระบบ authentication ที่แข็งแกร่งขึ้นสำหรับ production
- ควรใช้ฐานข้อมูลจริงแทนไฟล์ JSON สำหรับ production 