'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/FloatingNav'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
    subscribe: true
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const {
      firstName,
      lastName,
      email,
      company,
      message,
      subscribe
    } = formData

    const subject = encodeURIComponent(`Contact from ${firstName} ${lastName}`)
    const body = encodeURIComponent(
      `Name: ${firstName} ${lastName}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nSubscribed to insights: ${subscribe ? 'Yes' : 'No'}\n\nMessage:\n${message}`
    )

    const mailto = `mailto:Contentpalai.chat@outlook.com?subject=${subject}&body=${body}`
    window.location.href = mailto
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
            {/* Left Column */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <h1 className="text-4xl font-bold text-white">Transform Your Social Presence</h1>
              <p className="text-gray-400 text-lg">Chat with our AI experts to see how ContentPal.AI can 10x your engagement metrics.</p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-xl"><span className="text-2xl">🚀</span></div>
                  <div>
                    <h3 className="text-white text-xl font-medium">400%+ Engagement</h3>
                    <p className="text-gray-400">Average increase across all clients</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-xl"><span className="text-2xl">⏳</span></div>
                  <div>
                    <h3 className="text-white text-xl font-medium">40 Hours Saved</h3>
                    <p className="text-gray-400">Weekly per marketing team</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">First Name *</label>
                    <input name="firstName" type="text" value={formData.firstName} onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Last Name *</label>
                    <input name="lastName" type="text" value={formData.lastName} onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Work Email *</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Company</label>
                  <input name="company" type="text" value={formData.company} onChange={handleChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Message *</label>
                  <textarea name="message" rows={4} value={formData.message} onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500"></textarea>
                </div>

                <div className="flex items-center gap-3">
                  <input name="subscribe" type="checkbox" checked={formData.subscribe} onChange={handleChange} className="rounded bg-gray-800/50 border-gray-700 text-blue-500 focus:ring-blue-500" />
                  <span className="text-gray-400 text-sm">I want to receive AI marketing insights</span>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-all">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
