// components/FloatingNav.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/context/AuthContext'

const mainNavItems = [
  { name: 'Home', href: '/' },
  { name: 'Pricing', href: '/subscribe' },
  { name: 'Case Study', href: '/casestudy' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Legal', href: '/legal' },
  { name: 'Contact', href: '/contact' }
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { user, logout } = useAuth();

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const tokenResult = await user.getIdTokenResult();
          setIsAdmin(!!tokenResult.claims.admin);
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  return (
    <nav className="fixed w-full top-0 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 mr-6">
            <Image
              src="/nlogo.png"
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
            
            {/* Admin Dashboard Link - Desktop */}
            {isAdmin && (
              <Link href="/admin" className="text-gray-300 hover:text-white transition-colors">
                Admin Dashboard
              </Link>
            )}
            
            {/* User-specific links */}
            {user && (
              <>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link href="/creator-tools" className="text-gray-300 hover:text-white transition-colors">
                  Content Suite
                </Link>
                <Link href="/subscribe" className="text-gray-300 hover:text-white transition-colors">
                  Subscription
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

      {/* Mobile Navigation */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden px-6 py-4 bg-gray-900 border-t border-gray-800`}>
        {mainNavItems.map((item) => (
          <Link key={item.name} href={item.href} className="block text-gray-300 hover:text-white py-2">{item.name}</Link>
        ))}
        
        {/* Admin Dashboard Link - Mobile */}
        {isAdmin && (
          <Link href="/admin" className="block text-gray-300 hover:text-white py-2">
            Admin Dashboard
          </Link>
        )}
        
        {/* User-specific mobile links */}
        {user && (
          <>
            <Link href="/dashboard" className="block text-gray-300 hover:text-white py-2">Dashboard</Link>
            <Link href="/creator-tools" className="text-gray-300 hover:text-white transition-colors">Content Suite</Link>
            <Link href="/subscribe" className="block text-gray-300 hover:text-white py-2">Subscription Manager</Link>
            <button onClick={logout} className="block text-gray-300 hover:text-white py-2 w-full text-left focus:outline-none">Sign Out</button>
          </>
        )}

        {/* Mobile Auth Buttons */}
        <div className="mt-4 space-y-2">
          {!user && (
            <>
              <Link href="/login" className="block text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                Login
              </Link>
              <Link href="/signup" className="block text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}