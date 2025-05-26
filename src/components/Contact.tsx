'use client'
import { motion } from 'framer-motion'
import Navbar from '@/components/FloatingNav'

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <h1 className="text-4xl font-bold text-white">
                Transform Your Social Presence
              </h1>
              <p className="text-gray-400 text-lg">
                Schedule a demo with our AI experts to see how ContentPal.AI can 10x your engagement metrics.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-medium">400%+ Engagement</h3>
                    <p className="text-gray-400">Average increase across all clients</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <span className="text-2xl">⏳</span>
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-medium">40 Hours Saved</h3>
                    <p className="text-gray-400">Weekly per marketing team</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Work Email</label>
                  <input
                    type="email"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Company</label>
                  <input
                    type="text"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="rounded bg-gray-800/50 border-gray-700 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-400 text-sm">
                    I want to receive AI marketing insights
                  </span>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-all">
                  Request Demo
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}