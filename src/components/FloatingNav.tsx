// components/Navbar.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'

const mainNavItems = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '#features' },
  { name: 'Showcase', href: '#showcase' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '/contact' }
]

export default function Navbar() {
  return (
    <>
      <nav className="fixed w-full top-0 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-50 hidden md:block">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/nlogo.png" // Your image icon path
                alt="ContentPal Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xl font-bold text-white">ContentPal</span>
            </Link>
            <div></div>
            <div className="flex gap-6">
              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="text-gray-300 hover:text-white">
              Login
            </Link>
            <Link 
              href="/signup" 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}