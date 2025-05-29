import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

/**
 * Custom hook to access the authentication context.
 * Provides easy access to the current user and authentication-related functions.
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context;
}