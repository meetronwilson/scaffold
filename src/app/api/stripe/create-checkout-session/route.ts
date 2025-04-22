import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createCheckoutSession } from '@/lib/stripe/checkout'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = createServerSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { priceId } = await request.json()

    if (!priceId) {
      return new NextResponse('Price ID is required', { status: 400 })
    }

    const checkoutSession = await createCheckoutSession({
      priceId,
      userId: session.user.id,
      returnUrl: process.env.NEXT_PUBLIC_APP_URL + '/dashboard',
    })

    return NextResponse.json({ sessionId: checkoutSession.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
} 