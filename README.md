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
