# Stripe Integration Guide

This guide walks you through setting up and testing the Stripe integration for the Next.js SaaS Scaffold.

## Table of Contents

- [Account Setup](#account-setup)
- [Environment Configuration](#environment-configuration)
- [Stripe CLI Setup](#stripe-cli-setup)
- [Webhook Configuration](#webhook-configuration)
- [Creating Products and Prices](#creating-products-and-prices)
- [Testing the Integration](#testing-the-integration)
- [Going to Production](#going-to-production)
- [Troubleshooting](#troubleshooting)

## Account Setup

1. **Create a Stripe Account**
   - Sign up at [stripe.com](https://stripe.com)
   - Ensure you're in test mode (toggle in the dashboard)

2. **Get API Keys**
   - Go to Developers → API Keys in the Stripe Dashboard
   - Copy your **Publishable key** and **Secret key**

## Environment Configuration

Add your Stripe API keys to your `.env.local` file:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
```

The webhook secret will be set in the next steps.

## Stripe CLI Setup

The Stripe CLI is essential for local testing of webhooks.

1. **Install the Stripe CLI**
   - **macOS (Homebrew)**: `brew install stripe/stripe-cli/stripe`
   - **Windows (Scoop)**: `scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git` and `scoop install stripe`
   - **Linux**: Follow the [official installation guide](https://stripe.com/docs/stripe-cli)

2. **Authenticate with Stripe**
   ```bash
   stripe login
   ```
   
   This will open a browser window. Log in to your Stripe account to authorize the CLI.

## Webhook Configuration

1. **Start the Webhook Listener**
   ```bash
   stripe listen --forward-to http://localhost:3000/api/stripe/webhook
   ```

2. **Copy the Webhook Secret**
   
   When you run the `listen` command, you'll see output like:
   ```
   Ready! Your webhook signing secret is whsec_abc123... (^C to quit)
   ```
   
   Copy this secret to your `.env.local` file:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_abc123...
   ```

3. **Verify Webhook Registration**
   
   Check the [Stripe Dashboard](https://dashboard.stripe.com/test/webhooks) to ensure your webhook is registered.

## Creating Products and Prices

You can create products and prices either through the Stripe Dashboard or using the CLI:

### Using Stripe CLI

1. **Create a Product**
   ```bash
   stripe products create --name="Pro Plan" --description="Professional Plan with premium features"
   ```
   
   This will output a product ID like `prod_XYZ123`.

2. **Create a Price for the Product**
   ```bash
   stripe prices create --unit-amount=1999 --currency=usd --product=prod_XYZ123 --recurring[interval]=month
   ```
   
   This creates a price of $19.99 per month.

### Using Stripe Dashboard

1. Navigate to **Products** in the Stripe Dashboard
2. Click **Add Product**
3. Fill in product details (name, description, etc.)
4. Add pricing information
5. Save the product

## Testing the Integration

### Testing Checkout Flow

1. **Ensure Local Development Setup**
   - Verify your Next.js server is running: `npm run dev`
   - Confirm the Stripe webhook listener is active

2. **Access the Pricing Page**
   - Navigate to your pricing page (e.g., http://localhost:3000/pricing)
   - Verify products and prices are displayed correctly

3. **Initiate Checkout**
   - Click on a pricing plan to start the checkout process
   - You should be redirected to the Stripe Checkout page

4. **Complete Test Payment**
   - Use test card number: `4242 4242 4242 4242`
   - Any future expiration date (e.g., 12/34)
   - Any 3-digit CVC code (e.g., 123)
   - Any name and address

5. **Check Redirect**
   - After successful payment, you should be redirected back to your application
   - Verify you're redirected to the success URL specified in the checkout configuration

### Testing Webhook Events

1. **Monitor Webhook Events**
   - Check the terminal where the `stripe listen` command is running
   - You should see events being forwarded to your local endpoint

2. **Trigger Specific Events Manually**
   ```bash
   # Test a successful checkout session
   stripe trigger checkout.session.completed
   
   # Test a subscription creation
   stripe trigger customer.subscription.created
   
   # Test a successful payment
   stripe trigger payment_intent.succeeded
   
   # Test a failed payment
   stripe trigger payment_intent.payment_failed
   ```

3. **Verify Database Updates**
   - After processing these events, check your database to ensure:
     - Customer records are created
     - Subscription records are updated with correct status
     - Payment records are properly stored

### Testing Customer Portal

1. **Access Billing Management**
   - Log in to your application
   - Navigate to your account or billing settings

2. **Access the Portal**
   - Click on "Manage Subscription" or similar button
   - You should be redirected to the Stripe Customer Portal

3. **Test Portal Actions**
   - Update payment method
   - Change subscription plan
   - Cancel subscription

## Going to Production

Before deploying to production:

1. **Switch to Live Mode**
   - Get live API keys from the Stripe Dashboard
   - Update your environment variables with live keys

2. **Set Up Production Webhooks**
   - Create a production webhook endpoint in the Stripe Dashboard
   - Point it to your production URL (e.g., `https://your-app.com/api/stripe/webhook`)
   - Securely store the production webhook secret

3. **Test End-to-End**
   - Complete a real checkout flow in production
   - Verify all systems work correctly with live keys

## Troubleshooting

### Common Issues

#### Webhook Events Not Received
- Ensure the Stripe CLI is running with the `listen` command
- Verify the forwarding URL matches your API route
- Check that your webhook handler is properly implemented

#### Signature Verification Failed
- Ensure the webhook secret in your `.env.local` file matches the one provided by the CLI
- Verify your webhook handler correctly validates the signature

#### Checkout Not Working
- Check browser console for errors
- Verify your Stripe publishable key is correct
- Ensure your checkout button is properly configured with the correct price ID

#### Subscription Status Not Updating
- Check your webhook handler logic for subscription events
- Verify the database operations are working correctly
- Look for errors in your application logs

### Debugging Tips

1. **Enable Debug Mode in Stripe CLI**
   ```bash
   stripe listen --forward-to http://localhost:3000/api/stripe/webhook --log-level debug
   ```

2. **Inspect Event Data**
   ```bash
   stripe events retrieve evt_123abc
   ```

3. **Test Webhook Endpoint Directly**
   ```bash
   stripe trigger payment_intent.succeeded --webhook-endpoint=we_123abc
   ```

For additional help, consult the [official Stripe documentation](https://stripe.com/docs) or reach out to Stripe support. 