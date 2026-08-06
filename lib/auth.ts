import 'server-only'
import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const ADMIN_SESSION_COOKIE = 'admin_session'
const SESSION_MAX_AGE_SEC = 60 * 60 * 24 // 24 hours

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < 16) {
    throw new Error(
      'ADMIN_SESSION_SECRET ต้องตั้งค่าใน .env.local (ยาวอย่างน้อย 16 ตัวอักษร)'
    )
  }
  return secret
}

function getAdminCredentials(): { username: string; password: string } {
  const username = process.env.ADMIN_USERNAME
  const password = process.env.ADMIN_PASSWORD
  if (!username || !password) {
    throw new Error('ADMIN_USERNAME และ ADMIN_PASSWORD ต้องตั้งค่าใน .env.local')
  }
  return { username, password }
}

function sign(payload: string): string {
  const sig = createHmac('sha256', getSessionSecret())
    .update(payload)
    .digest('base64url')
  return `${payload}.${sig}`
}

function verifyToken(token: string): { username: string; exp: number } | null {
  const lastDot = token.lastIndexOf('.')
  if (lastDot <= 0) return null

  const payload = token.slice(0, lastDot)
  const sig = token.slice(lastDot + 1)
  const expected = createHmac('sha256', getSessionSecret())
    .update(payload)
    .digest('base64url')

  const sigBuf = Buffer.from(sig)
  const expectedBuf = Buffer.from(expected)
  if (
    sigBuf.length !== expectedBuf.length ||
    !timingSafeEqual(sigBuf, expectedBuf)
  ) {
    return null
  }

  const [username, expStr] = payload.split(':')
  const exp = Number(expStr)
  if (!username || !Number.isFinite(exp) || Date.now() > exp) {
    return null
  }

  return { username, exp }
}

export function validateAdminCredentials(
  username: string,
  password: string
): boolean {
  const creds = getAdminCredentials()
  const userOk =
    username.length === creds.username.length &&
    timingSafeEqual(Buffer.from(username), Buffer.from(creds.username))
  const passOk =
    password.length === creds.password.length &&
    timingSafeEqual(Buffer.from(password), Buffer.from(creds.password))
  return userOk && passOk
}

export function createSessionToken(username: string): string {
  const exp = Date.now() + SESSION_MAX_AGE_SEC * 1000
  return sign(`${username}:${exp}`)
}

export function getSessionFromCookies(): { username: string } | null {
  try {
    const token = cookies().get(ADMIN_SESSION_COOKIE)?.value
    if (!token) return null
    const session = verifyToken(token)
    return session ? { username: session.username } : null
  } catch {
    return null
  }
}

export function getSessionFromRequest(
  request: NextRequest
): { username: string } | null {
  try {
    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
    if (!token) return null
    const session = verifyToken(token)
    return session ? { username: session.username } : null
  } catch {
    return null
  }
}

export function requireAdmin(request: NextRequest): NextResponse | null {
  const session = getSessionFromRequest(request)
  if (!session) {
    return NextResponse.json(
      { error: 'กรุณาเข้าสู่ระบบผู้ดูแล' },
      { status: 401 }
    )
  }
  return null
}

export function setSessionCookie(
  response: NextResponse,
  token: string
): void {
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SEC,
  })
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
}
