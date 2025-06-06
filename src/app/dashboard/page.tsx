'use client'
import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/FloatingNav'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AnalyticsOverview from '@/components/AnalyticsOverview';
import { useState, useEffect, useCallback } from 'react'
import { 
  doc, 
  getDoc, 
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface ContentRequest {
  id: string;
  contentTopic: string;
  contentType: string;
  targetPlatform: string;
  tone: string;
  targetAudience: string;
  keyMessage: string;
  specificRequirements: string;
  status: string;
  createdAt: Timestamp;
  generatedContent?: string;
  userApprovalStatus?: 'approved' | 'rejected' | 'awaiting_review';
  userId: string;
}

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [hasDashboardAccess, setHasDashboardAccess] = useState(false);
  const [accessChecked, setAccessChecked] = useState(false);
  const [userContentRequests, setUserContentRequests] = useState<ContentRequest[]>([]);
  const [fetchingUserContentRequests, setFetchingUserContentRequests] = useState(true);
  const [updatingApprovalStatus, setUpdatingApprovalStatus] = useState<string | null>(null);
  const [generatedContentInput, setGeneratedContentInput] = useState(''); // State for the generated content textarea
  const [uploadingContent, setUploadingContent] = useState(false); // State for tracking content upload loading

  useEffect(() => {
    const checkAccess = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
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

  const fetchUserContentRequests = useCallback(async () => {
    if (!user) {
      setUserContentRequests([]);
      setFetchingUserContentRequests(false);
      return;
    }

    setFetchingUserContentRequests(true);
    try {
      const q = query(
        collection(db, 'contentRequests'),
        where('userId', '==', user.uid)
      );
      
      const querySnapshot = await getDocs(q);
      const requests: ContentRequest[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        requests.push({ 
          id: doc.id,
          contentTopic: data.contentTopic,
          contentType: data.contentType,
          targetPlatform: data.targetPlatform,
          tone: data.tone,
          targetAudience: data.targetAudience,
          keyMessage: data.keyMessage,
          specificRequirements: data.specificRequirements,
          status: data.status,
          createdAt: data.createdAt,
          generatedContent: data.generatedContent,
          userApprovalStatus: data.userApprovalStatus,
          userId: data.userId
        });
      });
      
      // Sort by creation date (newest first)
      const sortedRequests = requests.sort((a, b) => 
        b.createdAt.toMillis() - a.createdAt.toMillis()
      );
      
      setUserContentRequests(sortedRequests);
    } catch (error) {
      console.error('Error fetching user content requests:', error);
    } finally {
      setFetchingUserContentRequests(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && user && hasDashboardAccess) {
      fetchUserContentRequests();
    }
  }, [user, loading, hasDashboardAccess, fetchUserContentRequests]);

  const handleApproval = async (requestId: string, action: 'approve' | 'reject') => {
    if (!user) return;
    
    try {
      setUpdatingApprovalStatus(requestId);
      const newStatus = action === 'approve' ? 'approved' : 'rejected';
      
      const requestRef = doc(db, 'contentRequests', requestId);
      await updateDoc(requestRef, {
        userApprovalStatus: newStatus
      });

      setUserContentRequests(prev => 
        prev.map(req => 
          req.id === requestId 
            ? { ...req, userApprovalStatus: newStatus } 
            : req
        )
      );
    } catch (error) {
      console.error(`Error ${action}ing content request:`, error);
    } finally {
      setUpdatingApprovalStatus(null);
    }
  };

  if (!loading && !user) {
    router.push('/login');
    return null;
  }

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
            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/onboarding" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-semibold transition duration-300">
                Complete Onboarding Form
              </Link>
              <Link href="/dashboard/content-request" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full text-lg font-semibold transition duration-300">
                Request New Content
              </Link>
            </div>
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
          
          {/* My Content Requests Section */}
          <div className="mt-10 bg-white p-8 rounded-lg shadow-lg space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-700">My Content Requests</h2>
              <button 
                onClick={fetchUserContentRequests}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm"
              >
                Refresh
              </button>
            </div>
            
            {fetchingUserContentRequests ? (
              <div className="flex justify-center py-8">
                <p className="text-gray-600">Loading your content requests...</p>
              </div>
            ) : userContentRequests.length > 0 ? (
              <div className="space-y-6">
                {userContentRequests.map((request) => (
                  <div key={request.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{request.contentTopic}</h3>
                        <p className="text-gray-600 text-sm">
                          {request.createdAt?.toDate().toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-end">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          request.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {request.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          request.userApprovalStatus === 'approved' ? 'bg-green-100 text-green-800' :
                          request.userApprovalStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {request.userApprovalStatus || 'Not reviewed'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-500">Type</p>
                        <p>{request.contentType}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Platform</p>
                        <p>{request.targetPlatform}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Tone</p>
                        <p>{request.tone}</p>
                      </div>
                    </div>
                    
                    {request.status === 'Completed' && request.generatedContent && (
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3 text-gray-700">Generated Content:</h4>
                        
                        {/* Text content */}
                        {request.generatedContent && typeof request.generatedContent === 'string' && (
                          <div className="bg-gray-50 p-4 rounded-md border mb-4">
                            <pre className="whitespace-pre-wrap break-words font-sans">
                              {request.generatedContent}
                            </pre>
                          </div>
                        )}
                        
                        {/* Uploaded files */}
                        {request.generatedContent && Array.isArray(request.generatedContent) && (
                          <div className="mt-4">
                            <h5 className="font-medium mb-2 text-gray-700">Uploaded Files:</h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {request.generatedContent.map((url: string, idx: number) => (
                                <div key={idx} className="border rounded-md p-3 bg-gray-50">
                                  <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline break-all text-sm"
                                  >
                                    {url.split('/').pop()}
                                  </a>
                                  {url.match(/\.(jpeg|jpg|gif|png)$/) && (
                                    <div className="mt-2">
                                      <img 
                                        src={url} 
                                        alt={`Uploaded content ${idx + 1}`}
                                        className="max-w-full h-auto rounded-md"
                                      />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Approval buttons */}
                        {(request.userApprovalStatus === 'awaiting_review' || 
                        !request.userApprovalStatus) && (
                          <div className="mt-4 flex flex-col sm:flex-row gap-3">
                            <button
                              onClick={() => handleApproval(request.id, 'approve')}
                              disabled={updatingApprovalStatus === request.id}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
                            >
                              {updatingApprovalStatus === request.id ? 'Approving...' : 'Approve'}
                            </button>
                            <button
                              onClick={() => handleApproval(request.id, 'reject')}
                              disabled={updatingApprovalStatus === request.id}
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
                            >
                              {updatingApprovalStatus === request.id ? 'Rejecting...' : 'Request Changes'}
                            </button>
                          </div>
                        )}
                        
                        {/* Approval status */}
                        {request.userApprovalStatus && request.userApprovalStatus !== 'awaiting_review' && (
                          <div className="mt-4 text-center">
                            <span className={`font-medium ${
                              request.userApprovalStatus === 'approved' 
                                ? 'text-green-600' 
                                : 'text-red-600'
                            }`}>
                              You've {request.userApprovalStatus} this content
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No content requests yet</h3>
                <p className="mt-1 text-gray-500">Get started by requesting your first piece of content</p>
                <div className="mt-6">
                  <Link
                    href="/dashboard/content-request"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  >
                    Create Content Request
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}