import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16', // Use latest stable API version
  typescript: true,
})

export type StripeSubscription = Stripe.Subscription
export type StripePrice = Stripe.Price
export type StripeProduct = Stripe.Product
export type StripeCustomer = Stripe.Customer 