import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  const { pathname } = req.nextUrl

  // Public Routes
  const isAuthPage =
    pathname.startsWith('/auth/login') ||
    pathname.startsWith('/auth/register')

  const isAdminPage = pathname.startsWith('/admin')
  const isAccountPage = pathname.startsWith('/account')

  // Guest
  if (!token) {
    if (isAdminPage || isAccountPage) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    return NextResponse.next()
  }

  try {
    const user = verifyToken(token)

    // Logged in user visiting login/register
    if (isAuthPage) {
      return NextResponse.redirect(
        new URL(
          user.role === 'ADMIN' ? '/admin' : '/account',
          req.url
        )
      )
    }

    // USER trying admin
    if (isAdminPage && user.role !== 'ADMIN') {
      return NextResponse.redirect(
        new URL('/account', req.url)
      )
    }

    // ADMIN trying account
    if (isAccountPage && user.role === 'ADMIN') {
      return NextResponse.redirect(
        new URL('/admin', req.url)
      )
    }

    return NextResponse.next()
  } catch {
    const response = NextResponse.redirect(
      new URL('/auth/login', req.url)
    )

    response.cookies.delete('token')

    return response
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/account/:path*',
    '/auth/login',
    '/auth/register'
  ]
}