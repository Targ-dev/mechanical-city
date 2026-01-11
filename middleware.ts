import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')
  const { pathname } = request.nextUrl

  // Define protected routes
  const protectedRoutes = ['/cart', '/checkout', '/orders', '/admin']

  // Check if current path starts with any protected route
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtected) {
    if (!authToken) {
      const loginUrl = new URL('/login', request.url)
      // Store the original URL to redirect back after login
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/cart/:path*',
    '/checkout/:path*',
    '/orders/:path*',
    '/admin/:path*'
  ],
}
