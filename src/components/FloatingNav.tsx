// components/FloatingNav.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'

const mainNavItems = [
  { name: 'Home', href: '#' },
  { name: 'Features', href: '#features' },
  { name: 'Showcase', href: '#showcase' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '/contact' }
]

import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Assuming you have @heroicons/react installed

import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="fixed w-full top-0 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 mr-6">
              <Image
                src="/nlogo.png" // Your image icon path
                alt="ContentPal Logo"
                width={40}
                height={40}
                className="rounded-full"
                style={{ objectFit: 'contain' }}
              />
              <span className="text-xl font-bold text-white">ContentPal</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6">
              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
                {/* Render signed-in links only if user is authenticated */}
                {user && (
                <>
                    <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                        Dashboard
                    </Link>
                     <Link href="/dashboard/subscription" className="text-gray-300 hover:text-white transition-colors">
                      Subscription Manager
                    </Link>
                    <button
                    onClick={logout}
                    className="text-gray-300 hover:text-white transition-colors focus:outline-none"
                  >
                    Sign Out
                  </button>
                </>
                )}
            </div>
          </div>

          {/* Auth Links (Visible on all screens) */}
          <div className="hidden md:flex gap-4">
            {/* Render signed-out links only if user is not authenticated */}
              {!user && (
                 <>
                     <Link href="/login" className="text-gray-300 hover:text-white">Login</Link>
                     <Link href="/signup" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full">Sign Up</Link>
                 </>
              )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-300 hover:text-white focus:outline-none">
              {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation (Toggle based on isMenuOpen) */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden px-6 py-4 bg-gray-900 border-t border-gray-800`}>
            {mainNavItems.map((item) => (
              <Link key={item.name} href={item.href} className="block text-gray-300 hover:text-white py-2">{item.name}</Link>
            ))}
             {/* Render signed-in links in mobile menu */}
                {user && (
                <>
                    <Link href="/dashboard" className="block text-gray-300 hover:text-white py-2">Dashboard</Link>
                     <Link href="/dashboard/subscription" className="block text-gray-300 hover:text-white py-2">Subscription Manager</Link>
                     <button onClick={logout} className="block text-gray-300 hover:text-white py-2 w-full text-left focus:outline-none">Sign Out</button>
                </>
                )}

            {/* Mobile Auth Buttons */}
            <div className="mt-4 space-y-2">
               {/* Render signed-out links in mobile menu */}
              {!user && (
                <>
                  <Link href="/login" className="block text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                    Login
                  </Link>
                   <Link href="/signup" className="block text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                    Sign Up
                  </Link>
                </>)}
            </div>
        </div>
      </nav>
    </>
  )
}