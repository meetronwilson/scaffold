import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import {
  constructWebhookEvent,
  handleSubscriptionChange,
  handlePriceChange,
  handleProductChange,
} from '@/lib/stripe/webhook'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = headers().get('Stripe-Signature')

  if (!signature) {
    return new NextResponse('No signature', { status: 400 })
  }

  try {
    const event = constructWebhookEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await handleSubscriptionChange(event)
        break
      case 'price.created':
      case 'price.updated':
      case 'price.deleted':
        await handlePriceChange(event)
        break
      case 'product.created':
      case 'product.updated':
      case 'product.deleted':
        await handleProductChange(event)
        break
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return new NextResponse('Webhook processed', { status: 200 })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return new NextResponse('Webhook Error', { status: 400 })
  }
}

// Stripe requires the raw body to construct the event
export const config = {
  api: {
    bodyParser: false,
  },
} 