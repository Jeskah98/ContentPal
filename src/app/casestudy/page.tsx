// app/signup/page.tsx
'use client'
import Navbar from '@/components/FloatingNav'
import AuraHotelCaseStudy from '@/components/AuraHotelCaseStudy'

export default function ContactPage() { 
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <AuraHotelCaseStudy/>
    </div>
  )
}