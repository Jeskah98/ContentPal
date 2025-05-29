'use client'
import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/FloatingNav' // Assuming FloatingNav is your Navbar component
import Link from 'next/link' // Import Link from next/link
import { useRouter } from 'next/navigation'
import AnalyticsOverview from '@/components/AnalyticsOverview';
import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Assuming your Firestore instance is exported as 'db' from firebase.ts

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isSubscribed, setIsSubscribed] = useState(false); // State to track subscription status

  useEffect(() => {
    const checkSubscription = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid); // Assuming user data is stored in a 'users' collection
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          // Implement your logic to check subscription status here
          // This is a placeholder - replace with your actual subscription check
          setIsSubscribed(userData?.subscriptionStatus === 'active' || userData?.onFreeTrial === true);
        }
      }
    };

    if (!loading && !user) {
      router.push('/login');
    } else if (!loading && user) {
      checkSubscription();
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  // Redirect to subscribe page if not subscribed and not loading
  if (!loading && user && !isSubscribed) {
    router.push('/subscribe');
    return null; // Prevent rendering dashboard content
  }

  if (loading || (user && !isSubscribed)) { // Also show loading while checking subscription
    return <p>Loading...</p>;
  }

  return (
    <div className="overflow-hidden">
 <Navbar /> {/* Include the Navbar component */}
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8"> {/* Add padding to avoid content being hidden by the fixed header */}
 <div className="max-w-7xl mx-auto">
 {/* Welcome message and Onboarding link */}
 <div className="mb-8 text-center">
 <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.displayName || user?.email}</h1>
 <Link href="/onboarding" className="mt-4 inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-semibold transition duration-300">
 Complete Onboarding Form
 </Link>
 </div>

 {/* Main content grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-10"> {/* Adjust gap as needed */}
 {/* Analytics and Subscription Panel */}
 <div className="bg-white p-8 rounded-lg shadow-lg space-y-6"> {/* Add background, padding, rounded corners, and shadow */}
 <AnalyticsOverview /> {/* Keep AnalyticsOverview */}
 </div>

 {/* Pending Messages Section */}
 <div className="bg-white p-8 rounded-lg shadow-lg space-y-4"> {/* Add background, padding, rounded corners, and shadow */}
 <h2 className="text-2xl font-semibold text-gray-700 mb-4">Pending Messages</h2>
 <p className="text-gray-600">Your pending messages will appear here.</p>
 {/* TODO: Implement fetching and displaying pending messages */}
 </div>
        </div>
      </div>
 </main>
    </div>
  )
}