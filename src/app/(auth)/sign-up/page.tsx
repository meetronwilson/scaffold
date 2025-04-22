import { SignUpForm } from '@/components/auth/signup-form'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account',
}

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="flex justify-center">
            <span className="sr-only">Your Company</span>
            {/* Replace with your logo */}
            <svg className="h-12 w-auto text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </Link>
        </div>
        
        <SignUpForm />
      </div>
    </div>
  )
} 