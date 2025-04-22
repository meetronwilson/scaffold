'use client'

import { AuthProvider as Auth } from '@/hooks/useAuth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <Auth>{children}</Auth>
} 