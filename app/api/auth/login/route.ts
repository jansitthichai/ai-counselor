import { NextRequest, NextResponse } from 'next/server'
import {
  createSessionToken,
  setSessionCookie,
  validateAdminCredentials,
} from '../../../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const username = typeof body?.username === 'string' ? body.username : ''
    const password = typeof body?.password === 'string' ? body.password : ''

    if (!username || !password) {
      return NextResponse.json(
        { error: 'กรุณากรอก Username และ Password' },
        { status: 400 }
      )
    }

    if (!validateAdminCredentials(username, password)) {
      return NextResponse.json(
        { error: 'Username หรือ Password ไม่ถูกต้อง' },
        { status: 401 }
      )
    }

    const token = createSessionToken(username)
    const response = NextResponse.json({
      success: true,
      username,
    })
    setSessionCookie(response, token)
    return response
  } catch (error) {
    console.error('Login error:', error)
    const message =
      error instanceof Error
        ? error.message
        : 'ไม่สามารถเข้าสู่ระบบได้ กรุณาตรวจสอบการตั้งค่าเซิร์ฟเวอร์'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
