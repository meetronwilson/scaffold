'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import type { User, Session } from '@supabase/supabase-js'

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Create the Supabase client using the new SSR approach
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)

      const { data: authListener } = supabase.auth.onAuthStateChange(
        (_event: string, session: Session | null) => {
          setUser(session?.user ?? null)
          router.refresh()
        }
      )

      return () => {
        authListener.subscription.unsubscribe()
      }
    }

    getUser()
  }, [supabase, router])

  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return {
    user,
    loading,
    signOut,
    isAuthenticated: !!user,
  }
} 