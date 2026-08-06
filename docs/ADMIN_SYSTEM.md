# ระบบจัดการบทความ (Admin System)

## การเข้าสู่ระบบ

1. ตั้งค่าใน `.env.local`:
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET` (ยาวอย่างน้อย 16 ตัวอักษร)
2. เปิด `/admin/login`
3. เซิร์ฟเวอร์ตรวจรหัสแล้วตั้ง httpOnly cookie `admin_session`

**อย่าใส่รหัสผ่านจริงในเอกสารหรือ commit ขึ้น git**

## ฟีเจอร์

- Login / Logout ผ่าน `/api/auth/*`
- CRUD บทความที่ `/admin`, `/admin/create`, `/admin/edit/[id]`
- POST/PUT/DELETE ของ `/api/articles` ต้องมี session ที่ถูกต้อง
- GET บทความเปิดสาธารณะสำหรับหน้า `/resources`

## การจัดเก็บข้อมูล

- Local: `data/articles.json`
- Production: ตั้ง Vercel KV (`KV_REST_API_URL`, `KV_REST_API_TOKEN`) ผ่าน `lib/storage.ts`

## โครงสร้างข้อมูล

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
