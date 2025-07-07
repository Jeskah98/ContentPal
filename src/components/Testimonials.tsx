// components/Testimonials.tsx
'use client'
import { useState } from 'react'
import { Quote } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Kann',
    role: 'CMO, Lumo Brands',
    content: 'ContentPal has transformed our social presence. The AI understands our luxury aesthetic better than most human creatives.',
    avatar: '/avatars/bgdlogo.png'
  },
  {
    id: 2,
    name: 'James Vanders',
    role: 'Digital Director, Pulmon Estates',
    content: 'The autonomous workflow saves us 40+ hours per week while actually improving our engagement metrics.',
    avatar: '/avatars/logo.png'
  },
  {
    id: 3,
    name: 'Olivia Levar',
    role: 'Founder, Haute Social',
    content: 'Finally an AI solution that doesn\'t feel robotic. The content is consistently on-brand and editorial-grade.',
    avatar: '/avatars/elogo.png'
  }
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Elite Brands
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Hear from industry leaders who have transformed their content strategy
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white rounded-xl shadow-lg p-8 md:p-12">
            <Quote className="absolute top-6 left-6 md:left-10 text-gray-200 w-8 h-8" />
            
            <div className="flex flex-col items-center text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonials[current].id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  <p className="text-lg md:text-xl italic text-gray-700">
                    "{testimonials[current].content}"
                  </p>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-100 mb-4">
                  <Image 
                    src={testimonials[current].avatar} 
                    alt={testimonials[current].name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{testimonials[current].name}</h4>
                  <p className="text-gray-600 text-sm md:text-base">
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    current === i ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`View testimonial ${i+1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}