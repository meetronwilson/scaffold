import { User, Session } from '@supabase/supabase-js'

// Auth provider props interface
export interface AuthProviderProps {
  children: React.ReactNode
}

// Auth context interface
export interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{
    error: Error | null
    data: { user: User | null; session: Session | null } | null
  }>
  signUp: (email: string, password: string) => Promise<{
    error: Error | null
    data: { user: User | null; session: Session | null } | null
  }>
  signOut: () => Promise<void>
}

// Auth form data
export interface SignInFormData {
  email: string
  password: string
}

export interface SignUpFormData extends SignInFormData {
  confirmPassword: string
} 