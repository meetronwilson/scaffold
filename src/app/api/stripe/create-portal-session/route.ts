import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createPortalSession } from '@/lib/stripe/checkout'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = createServerSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const portalSession = await createPortalSession({
      userId: session.user.id,
      returnUrl: process.env.NEXT_PUBLIC_APP_URL + '/dashboard/settings/billing',
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (error) {
    console.error('Error creating portal session:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
} 