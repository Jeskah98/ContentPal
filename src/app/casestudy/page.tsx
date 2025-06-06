// app/signup/page.tsx
'use client'
import Navbar from '@/components/FloatingNav'
import ContentShowcase from '@/components/Showcase'

export default function ContactPage() { 
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <ContentShowcase/>
    </div>
  )
}