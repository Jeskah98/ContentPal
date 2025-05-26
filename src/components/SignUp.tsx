'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/FloatingNav'

export default function SignUp() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
            >
              <h1 className="text-4xl font-bold text-white mb-8">
                Start Your Free Trial
              </h1>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Password</label>
                  <input
                    type="password"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                  Create Account
                </button>

                <div className="flex items-center my-6">
                  <div className="flex-1 border-t border-gray-700"></div>
                  <span className="px-4 text-gray-400 text-sm">Or continue with</span>
                  <div className="flex-1 border-t border-gray-700"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      {/* Google SVG icon */}
                    </svg>
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      {/* GitHub SVG icon */}
                    </svg>
                    GitHub
                  </button>
                </div>

                <p className="text-gray-400 text-center mt-8">
                  Already have an account?{' '}
                  <Link href="/login" className="text-blue-400 hover:text-blue-300">
                    Log in
                  </Link>
                </p>
              </form>
            </motion.div>

            {/* Right Column */}
            <div className="hidden md:block space-y-8">
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-4">Why ContentPal.AI?</h2>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    14-day free trial
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    No credit card required
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Cancel anytime
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                <div className="text-gray-400 space-y-4">
                  <blockquote className="italic">
                    "ContentPal.AI has transformed our social media strategy. The AI-generated content outperforms our human team consistently."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-800"></div>
                    <div>
                      <p className="text-white">Sarah Johnson</p>
                      <p className="text-sm">CMO at TechCorp</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}