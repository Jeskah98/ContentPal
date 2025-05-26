// app/Loginpage.tsx
'use client'
import Navbar from '@/components/FloatingNav'
import Login from '@/components/Login'

export default function LoginPage() { // Note the Page suffix
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <Login />
    </div>
  )
}