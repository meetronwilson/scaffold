import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import type { User } from '@supabase/supabase-js'

/**
 * Create a Supabase Server Client
 */
export function createServerSupabaseClient() {
  const cookieStore = cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set(name, value, options)
        },
        remove(name: string, options: any) {
          cookieStore.set(name, '', { ...options, maxAge: 0 })
        },
      },
    }
  )
}

/**
 * Get the current authenticated user or return null
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = createServerSupabaseClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    return null
  }
  
  const { data: { user } } = await supabase.auth.getUser()
  
  return user
}

/**
 * Get the current user session (if exists)
 */
export async function getCurrentSession() {
  const supabase = createServerSupabaseClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  return session
}

/**
 * Check if the user is authenticated (without redirecting)
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getCurrentSession()
  
  return !!session
}

/**
 * Require authentication for a page (Server Component)
 * Use this in page components that should be protected
 */
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/login')
  }
  
  return user
}

/**
 * Check if the user has admin role
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  
  // If no user or no custom claims, they're not an admin
  if (!user || !user.app_metadata?.role) {
    return false
  }
  
  return user.app_metadata.role === 'admin'
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = createServerSupabaseClient()
  await supabase.auth.signOut()
  redirect('/')
}

/**
 * Redirect if the user is authenticated
 */
export async function redirectIfAuthenticated() {
  const user = await getCurrentUser()
  
  if (user) {
    redirect('/dashboard')
  }
  
  return null
} 