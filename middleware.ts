import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Get the current session
  const { data: { session } } = await supabase.auth.getSession()

  // Check if this is a protected route
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') || 
                            request.nextUrl.pathname.startsWith('/settings') || 
                            request.nextUrl.pathname.startsWith('/premium')

  // Handle authentication for protected routes
  if (isProtectedRoute) {
    if (!session) {
      // User is not authenticated, redirect to sign-in page
      const redirectUrl = new URL('/sign-in', request.url)
      
      // Add the original URL as a search param to redirect back after sign-in
      redirectUrl.searchParams.append('redirectUrl', request.nextUrl.pathname)
      
      return NextResponse.redirect(redirectUrl)
    }
  }
  
  // Handle auth routes - redirect to dashboard if already signed in
  const isAuthRoute = request.nextUrl.pathname.startsWith('/sign-in') || 
                      request.nextUrl.pathname.startsWith('/sign-up')
                      
  if (isAuthRoute && session) {
    // User is already authenticated, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

// Apply middleware to routes that need auth check
export const config = {
  matcher: [
    '/(dashboard|settings|premium)/:path*',
    '/api/:path*',
    '/sign-in',
    '/sign-up',
  ],
} 