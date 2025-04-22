import { Metadata } from 'next'
import Link from 'next/link'
import { CheckIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for all users',
}

interface PricingTier {
  name: string
  id: string
  price: string
  priceDetail: string
  description: string
  features: string[]
  cta: string
  ctaLink: string
  featured?: boolean
}

export default function PricingPage() {
  const tiers: PricingTier[] = [
    {
      name: 'Hobby',
      id: 'tier-hobby',
      price: '$0',
      priceDetail: 'forever',
      description: 'Perfect for side projects and hobby sites.',
      features: [
        'Up to 3 projects',
        '1 GB storage per project',
        'Basic analytics',
        'Standard support',
        'Community access',
      ],
      cta: 'Get Started',
      ctaLink: '/sign-up',
    },
    {
      name: 'Pro',
      id: 'tier-pro',
      price: '$15',
      priceDetail: 'per month',
      description: 'For professionals and growing teams.',
      features: [
        'Unlimited projects',
        '10 GB storage per project',
        'Advanced analytics',
        'Priority support',
        'Team collaboration',
        'Custom domains',
        'API access',
      ],
      cta: 'Start free trial',
      ctaLink: '/sign-up?plan=pro',
      featured: true,
    },
    {
      name: 'Enterprise',
      id: 'tier-enterprise',
      price: '$49',
      priceDetail: 'per month',
      description: 'For large teams and organizations.',
      features: [
        'Unlimited projects',
        'Unlimited storage',
        'Real-time analytics',
        '24/7 dedicated support',
        'Advanced security',
        'Custom integrations',
        'SLA guarantee',
        'Dedicated account manager',
      ],
      cta: 'Contact sales',
      ctaLink: '#',
    },
  ]

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              Pricing
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Simple, transparent pricing for everyone. Start with our free plan and upgrade as you grow.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`flex flex-col rounded-lg shadow-lg overflow-hidden ${
                  tier.featured
                    ? 'border-2 border-blue-500 dark:border-blue-400 ring-1 ring-blue-500 dark:ring-blue-400'
                    : 'border border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="px-6 py-8 bg-white dark:bg-gray-800 sm:p-10 sm:pb-6">
                  <div>
                    <h3
                      className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      id={tier.id}
                    >
                      {tier.name}
                    </h3>
                  </div>
                  <div className="mt-6 flex items-baseline">
                    <span className="text-5xl font-extrabold text-gray-900 dark:text-white">{tier.price}</span>
                    <span className="ml-1 text-xl font-semibold text-gray-500 dark:text-gray-400">{tier.priceDetail}</span>
                  </div>
                  <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">{tier.description}</p>
                </div>
                <div className="flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 dark:bg-gray-900 space-y-6 sm:p-10 sm:pt-6">
                  <ul className="space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <div className="flex-shrink-0">
                          <CheckIcon className="h-6 w-6 text-green-500 dark:text-green-400" />
                        </div>
                        <p className="ml-3 text-base text-gray-700 dark:text-gray-300">{feature}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <Link
                      href={tier.ctaLink}
                      className={`w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md ${
                        tier.featured
                          ? 'text-white bg-blue-600 hover:bg-blue-700'
                          : 'text-blue-600 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/50'
                      }`}
                    >
                      {tier.cta}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Frequently asked questions</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Can't find the answer you're looking for? Contact our customer support team.
            </p>
          </div>
          <div className="mt-12 lg:mt-16 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Can I try before I buy?</h3>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                Yes! We offer a 14-day free trial on all paid plans. No credit card required.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">How do I cancel my subscription?</h3>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                You can cancel your subscription at any time from your account settings. Your subscription will remain active until the end of your billing period.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Can I change plans later?</h3>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                Absolutely! You can upgrade or downgrade your plan at any time. Upgrades are effective immediately, and downgrades take effect at the end of your current billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Do you offer discounts?</h3>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                We offer discounts for annual billing (save 20%), as well as special pricing for non-profits and educational institutions. Contact us for details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 