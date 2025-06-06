'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navbar from '@/components/FloatingNav'
import { useAuth } from '@/hooks/useAuth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) router.push('/dashboard')
  }, [user, router])
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
            >
              <h1 className="text-3xl font-bold text-white mb-8 text-center">
                Welcome Back
              </h1>
              
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault()
                  login(email, password)
                }}
              >
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Password</label>
                  <input 
                    type="password"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                  Sign In
                </button>

                <div className="flex justify-between items-center mt-4">
                  <Link href="/forgot-password" className="text-blue-400 hover:text-blue-300 text-sm">
                    Forgot password?
                  </Link>
                  <Link href="/signup" className="text-blue-400 hover:text-blue-300 text-sm">
                    Create account
                  </Link>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}