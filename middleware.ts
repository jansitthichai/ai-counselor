import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for admin pages
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip login page itself
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Check if user is logged in
    const adminLoggedIn = request.cookies.get('adminLoggedIn')
    
    if (!adminLoggedIn || adminLoggedIn.value !== 'true') {
      // Redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
} 