import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')
  const { pathname } = request.nextUrl

  // Debug logging for production issues
  console.log(`[Middleware] Path: ${pathname}`)
  console.log(`[Middleware] Auth Token present: ${!!authToken}`)
  if (authToken) {
    console.log(`[Middleware] Auth Token value (first 10 chars): ${authToken.value.substring(0, 10)}...`)
  } else {
    console.log('[Middleware] No auth token found in cookies')
    // Log all cookie names to see what's available
    request.cookies.getAll().forEach(c => console.log(`[Middleware] Available cookie: ${c.name}`))
  }

  // Define protected routes
  const protectedRoutes = ['/cart', '/checkout', '/orders', '/admin']

  // Check if current path starts with any protected route
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtected) {
    if (!authToken) {
      console.log(`[Middleware] Redirecting to login from ${pathname}`)
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
