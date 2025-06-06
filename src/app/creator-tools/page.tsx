'use client'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function CreatorTools() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [hasCreatorToolsAccess, setHasCreatorToolsAccess] = useState(false);
  const [accessChecked, setAccessChecked] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          
          // Check creator tools access
          setHasCreatorToolsAccess(!!userData?.creatorToolsAccess);
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

  // Redirect to restricted page if no access
  if (!loading && accessChecked && !hasCreatorToolsAccess) {
    router.push('/restricted');
    return null;
  }

  if (loading || !accessChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-xl">Loading creator tools...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Creator Tools</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Content Generation</h2>
        <p className="text-gray-700 mb-4">
          Access powerful AI tools to create engaging content for your audience.
        </p>
        {/* Add your creator tools components here */}
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Analytics Dashboard</h2>
        <p className="text-gray-700">
          Track performance metrics and audience engagement with your created content.
        </p>
        {/* Add analytics components here */}
      </div>
    </div>
  );
}