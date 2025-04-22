'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'

export function Header() {
  const pathname = usePathname()
  const { user, loading, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
  ]

  const userNavLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Settings', href: '/settings' },
  ]

  return (
    <header className="bg-white shadow dark:bg-gray-900">
      <div className="container px-4 py-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white"
              onClick={closeMobileMenu}
            >
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span>MySaaS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`font-medium ${
                      isActive(link.href)
                        ? 'text-blue-600 dark:text-blue-500'
                        : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {loading ? (
              <div className="w-16 h-8 bg-gray-200 rounded-md animate-pulse dark:bg-gray-700"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                {userNavLinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium ${
                      isActive(link.href)
                        ? 'text-blue-600 dark:text-blue-500'
                        : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/sign-in"
                  className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 dark:text-blue-500 dark:border-blue-500 dark:hover:bg-gray-800"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-500 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t dark:bg-gray-900 dark:border-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.href)
                    ? 'text-blue-600 bg-blue-50 dark:text-blue-500 dark:bg-gray-800'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-blue-500 dark:hover:bg-gray-800'
                }`}
                onClick={closeMobileMenu}
              >
                {link.name}
              </Link>
            ))}
            
            {user && userNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.href)
                    ? 'text-blue-600 bg-blue-50 dark:text-blue-500 dark:bg-gray-800'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-blue-500 dark:hover:bg-gray-800'
                }`}
                onClick={closeMobileMenu}
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <button
                onClick={() => {
                  signOut()
                  closeMobileMenu()
                }}
                className="block w-full px-3 py-2 text-base font-medium text-left text-red-600 rounded-md hover:bg-red-50 dark:text-red-500 dark:hover:bg-gray-800"
              >
                Sign Out
              </button>
            ) : (
              <div className="space-y-2 border-t border-gray-200 pt-2 dark:border-gray-700">
                <Link
                  href="/sign-in"
                  className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-blue-500 dark:hover:bg-gray-800"
                  onClick={closeMobileMenu}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="block px-3 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
} 