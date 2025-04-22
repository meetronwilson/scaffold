import { stripe } from './config'
import { createServerSupabaseClient } from '../supabase/server'
import { db } from '../db'
import { customers } from '../db/schema'
import { eq } from 'drizzle-orm'

export async function createCheckoutSession({
  priceId,
  userId,
  returnUrl,
}: {
  priceId: string
  userId: string
  returnUrl: string
}) {
  const supabase = createServerSupabaseClient()
  
  // Get or create the customer
  let [customer] = await db
    .select()
    .from(customers)
    .where(eq(customers.id, userId))

  if (!customer?.stripeCustomerId) {
    // Get user email from Supabase
    const { data: { user } } = await supabase.auth.getUser()
    if (!user?.email) throw new Error('User email not found')

    // Create Stripe customer
    const stripeCustomer = await stripe.customers.create({
      email: user.email,
      metadata: {
        userId: userId,
      },
    })

    // Store customer in database
    await db.insert(customers).values({
      id: userId,
      stripeCustomerId: stripeCustomer.id,
    })

    customer = {
      id: userId,
      stripeCustomerId: stripeCustomer.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customer.stripeCustomerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: returnUrl,
    subscription_data: {
      metadata: {
        userId,
      },
    },
  })

  return session
}

export async function createPortalSession({
  userId,
  returnUrl,
}: {
  userId: string
  returnUrl: string
}) {
  // Get customer
  const [customer] = await db
    .select()
    .from(customers)
    .where(eq(customers.id, userId))

  if (!customer?.stripeCustomerId) {
    throw new Error('Customer not found')
  }

  // Create portal session
  const session = await stripe.billingPortal.sessions.create({
    customer: customer.stripeCustomerId,
    return_url: returnUrl,
  })

  return session
} 