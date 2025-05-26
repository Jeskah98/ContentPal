// app/signup/page.tsx
'use client'
import Navbar from '@/components/FloatingNav'
import SignUp from '@/components/SignUp'

export default function SignUpPage() { // Note the Page suffix
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <SignUp />
    </div>
  )
}