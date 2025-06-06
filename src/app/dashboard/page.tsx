'use client'
import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/FloatingNav'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AnalyticsOverview from '@/components/AnalyticsOverview';
import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [hasDashboardAccess, setHasDashboardAccess] = useState(false);
  const [accessChecked, setAccessChecked] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          
          // Check both subscription status AND manually granted access
          setHasDashboardAccess(
            userData?.dashboardAccess || 
            userData?.subscriptionStatus === 'active' || 
            userData?.onFreeTrial === true
          );
        }
      }
      setAccessChecked(true);
    };

    if (!loading && !user) {
      router.push('/login');
    } else if (!loading && user) {
      checkAccess();
    }
  }, [user, loading, router]);

  // Redirect to login if not authenticated
  if (!loading && !user) {
    router.push('/login');
    return null;
  }

  // Redirect to subscribe page if no access
  if (!loading && accessChecked && !hasDashboardAccess) {
    router.push('/subscribe');
    return null;
  }

  if (loading || !accessChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-xl">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <Navbar />
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.displayName || user?.email}</h1>
            <Link href="/onboarding" className="mt-4 inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-semibold transition duration-300">
              Complete Onboarding Form
            </Link>
            <Link href="/dashboard/content-request" className="mt-4 ml-4 inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full text-lg font-semibold transition duration-300">
              Request New Content
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
              <AnalyticsOverview />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg space-y-4">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Pending Messages</h2>
              <p className="text-gray-600">Your pending messages will appear here.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}