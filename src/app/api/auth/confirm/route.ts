import { createAdminSupabaseClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Get the confirmation token and type from URL search params
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')
  const type = searchParams.get('type')
  
  // Redirect base URL (can be customized)
  const redirectTo = new URL('/', request.nextUrl.origin)
  
  // Handle missing parameters
  if (!token || !type) {
    redirectTo.pathname = '/sign-in'
    redirectTo.searchParams.set('error', 'Invalid confirmation link')
    return NextResponse.redirect(redirectTo)
  }

  // Confirm the user's email
  if (type === 'signup' || type === 'recovery' || type === 'invite' || type === 'email_change') {
    try {
      const supabase = createAdminSupabaseClient()
      
      const { error } = await supabase.auth.admin.updateUserById(
        token,
        { email_confirm: true }
      )
      
      if (error) {
        console.error('Error confirming user email:', error)
        redirectTo.pathname = '/sign-in'
        redirectTo.searchParams.set('error', 'Failed to confirm email')
        return NextResponse.redirect(redirectTo)
      }
      
      // Set success message and redirect to sign-in
      redirectTo.pathname = '/sign-in'
      redirectTo.searchParams.set('message', 'Email confirmed! You can now sign in.')
      return NextResponse.redirect(redirectTo)
    } catch (error) {
      console.error('Unexpected error confirming email:', error)
      redirectTo.pathname = '/sign-in'
      redirectTo.searchParams.set('error', 'An unexpected error occurred')
      return NextResponse.redirect(redirectTo)
    }
  }

  // Default fallback redirect
  redirectTo.pathname = '/sign-in'
  return NextResponse.redirect(redirectTo)
} 