// components/Testimonials.tsx
'use client'
import { useState } from 'react'
import { Quote } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Kensington',
    role: 'CMO, Luxe Brands',
    content: 'ContentPal.AI has transformed our social presence. The AI understands our luxury aesthetic better than most human creatives.',
    avatar: '/avatars/bgdlogo.png'
  },
  {
    id: 2,
    name: 'James Vanderbilt',
    role: 'Digital Director, Premier Estates',
    content: 'The autonomous workflow saves us 40+ hours per week while actually improving our engagement metrics.',
    avatar: '/avatars/logo.png'
  },
  {
    id: 3,
    name: 'Olivia Laurent',
    role: 'Founder, Haute Social',
    content: 'Finally an AI solution that doesn\'t feel robotic. The content is consistently on-brand and editorial-grade.',
    avatar: '/avatars/elogo.png'
  }
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  return (
    <section className="py-20">
      <div className="container">
        <div style={{ maxWidth: '56rem' }} className="mx-auto">
          <div className="testimonial-card">
            <Quote className="testimonial-quote" />
            
            <div className="pl-16">
              <p className="text-xl italic mb-8">
                "{testimonials[current].content}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image 
                    src={testimonials[current].avatar} 
                    alt={testimonials[current].name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{testimonials[current].name}</h4>
                  <p className="text-gray-600 text-sm">
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    current === i ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}