# 🚀 Next.js SaaS Scaffold

A modern, production-ready SaaS starter kit built with Next.js 14, Supabase, Drizzle ORM, Stripe, and Tailwind CSS.

## ✨ Features

- 🔐 **Authentication & Authorization**
  - Supabase Auth with SSR
  - Protected routes & middleware
  - Role-based access control

- 💳 **Subscription Management**
  - Stripe integration
  - Multiple pricing tiers
  - Usage-based billing
  - Webhook handling

- 🎨 **Modern UI**
  - Tailwind CSS for styling
  - shadcn/ui components
  - Dark mode support
  - Responsive design

- 🛠 **Developer Experience**
  - TypeScript
  - Drizzle ORM for type-safe queries
  - ESLint & Prettier configuration
  - Organized project structure
  - AI-assisted development with Cursor

## 🚦 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Stripe account (for payments)
- GitHub account (for deployment)

## 🏗 Project Structure

```
src/
├── app/                   # Next.js App Router
│   ├── (auth)/           # Authentication routes
│   ├── (dashboard)/      # Protected dashboard routes
│   ├── (marketing)/      # Public marketing pages
│   └── api/              # API routes
├── components/           
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard-specific components
│   ├── layout/           # Layout components
│   ├── subscription/     # Subscription-related components
│   └── ui/               # Reusable UI components
├── lib/
│   ├── db/              # Database schema and utilities
│   ├── stripe/          # Stripe integration utilities
│   ├── supabase/        # Supabase client utilities
│   └── utils/           # Helper functions
```

## 🛠 Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <your-repo-url>
   cd your-project-name
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables:
   - Supabase credentials
   - Stripe API keys
   - Other configuration values

4. **Database Setup**
   ```bash
   npm run db:push     # Push schema changes
   npm run db:seed     # (Optional) Seed initial data
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔑 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# General
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📚 Documentation

- [Authentication Guide](docs/authentication.md)
- [Database Schema](docs/database.md)
- [Stripe Integration](docs/stripe.md)
- [Deployment Guide](docs/deployment.md)

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run all tests
npm run test:all
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run db:push` - Push database changes
- `npm run db:studio` - Open Drizzle Studio

## 🚀 Deployment

This project is designed to be deployed on Vercel:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables
4. Deploy!

## 📝 License

MIT License - feel free to use this scaffold for your own projects!

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

## 💡 Support

If you need help or have questions:
- Open an issue
- Check existing issues
- Read the documentation

## ⭐️ Star Us!

If you find this scaffold helpful, please star the repository! It helps others discover the project.

## Stripe Integration Setup and Testing

The scaffold includes a complete Stripe integration for subscription payments. Here's how to set up and test the integration:

### Prerequisites

- [Stripe CLI](https://stripe.com/docs/stripe-cli) installed
- Stripe account (create one at [stripe.com](https://stripe.com))
- Next.js development server running

### Configuration

1. Add your Stripe API keys to your `.env.local` file:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Setting Up Webhooks for Local Testing

1. **Authenticate with Stripe CLI**:
   ```
   stripe login
   ```
   This will open a browser window for authentication.

2. **Start the webhook listener**:
   ```
   stripe listen --forward-to http://localhost:3000/api/stripe/webhook
   ```
   
3. **Copy the webhook signing secret** generated by the CLI and add it to your `.env.local` file:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_cli_generated_secret
   ```

4. **Verify webhook setup** in the [Stripe Dashboard](https://dashboard.stripe.com/test/webhooks). You should see your endpoint registered.

### Testing the Integration

#### Create Products and Prices

Before testing, create products and prices in your Stripe dashboard or using the CLI:

```
# Create a product
stripe products create --name="Pro Plan" --description="Professional Plan"

# Create a price for the product
stripe prices create --unit-amount=2000 --currency=usd --product=prod_YOUR_PRODUCT_ID --recurring[interval]=month
```

#### Testing Checkout and Webhooks

1. **Test checkout flow**:
   - Navigate to your pricing page
   - Click on the checkout button for a plan
   - Complete the checkout using a test card

2. **Trigger specific webhook events** for testing:
   ```
   # Test a successful checkout session
   stripe trigger checkout.session.completed
   
   # Test a subscription creation
   stripe trigger customer.subscription.created
   
   # Test a successful payment
   stripe trigger payment_intent.succeeded
   ```

3. **Monitor webhook events**:
   - Check the terminal where `stripe listen` is running
   - Verify that your application is processing the events

#### Test Credit Card Numbers

Use these test card numbers for different scenarios:

- **Success**: 4242 4242 4242 4242
- **Requires Authentication**: 4000 0025 0000 3155
- **Declined**: 4000 0000 0000 0002

For full card testing documentation, see the [Stripe Testing Documentation](https://stripe.com/docs/testing).

### Troubleshooting

- **Webhook not received**: Ensure the Stripe CLI is running and forwarding to the correct endpoint
- **Signature verification errors**: Double-check the webhook secret in your `.env.local` file
- **Event handling errors**: Check your server logs for detailed error information

### Going to Production

Before deploying to production:

1. Switch to live Stripe API keys
2. Set up a production webhook endpoint in the Stripe dashboard
3. Update your environment variables with production values
4. Test the entire flow in production with real cards

For more details on Stripe integration, see the [official Stripe documentation](https://stripe.com/docs).
