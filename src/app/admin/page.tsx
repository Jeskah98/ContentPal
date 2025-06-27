"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import Navbar from '@/components/FloatingNav';
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";


interface User {
  uid: string;
  email: string | null;
  dashboardAccess?: boolean;
  creatorToolsAccess?: boolean;
  isAdmin?: boolean;
  paymentSubmitted?: boolean; // Added paymentSubmitted field
  // Add other potential user fields here if needed in the admin view
  // onboardingSubmitted?: boolean; // Could add a flag if user has submitted onboarding
}

const AdminDashboardPage = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'admin' | 'unauthorized'>('loading');
  const [users, setUsers] = useState<User[]>([]);
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const [grantingAdmin, setGrantingAdmin] = useState<string | null>(null);
  const [revokingAdmin, setRevokingAdmin] = useState<string | null>(null); // Track which user is being revoked admin
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null); // State for user feedback message
  const [onboardingSubmissions, setOnboardingSubmissions] = useState<any[]>([]); // State for onboarding submissions
  const [fetchingOnboarding, setFetchingOnboarding] = useState(false); // State to manage onboarding fetching loading
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | null>(null); // State for feedback type
  const [grantingAccess, setGrantingAccess] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [contentRequests, setContentRequests] = useState<any[]>([]); // State for content requests
  const [fetchingContentRequests, setFetchingContentRequests] = useState(false); // State to manage content requests fetching loading
  const [showContentRequestModal, setShowContentRequestModal] = useState(false); // State for content request modal visibility
  const [selectedContentRequest, setSelectedContentRequest] = useState<any>(null); // State for selected content request
  const [updatingContentRequestStatus, setUpdatingContentRequestStatus] = useState<string | null>(null); // State for tracking content request status update loading
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null); // State for selected files
  const [refreshTrigger, setRefreshTrigger] = useState(0);



  // Check admin status
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (authLoading) return;
      
      if (!user) {
        router.push('/login');
        return;
      }

      try {
        const tokenResult = await user.getIdTokenResult(true);
        if (tokenResult.claims.admin) {
          setStatus('admin');
        } else {
          setStatus('unauthorized');
          router.push('/');
        }
      } catch (error) {
        console.error('Error verifying admin status:', error);
        setStatus('unauthorized');
        router.push('/');
      }
    };

    checkAdminStatus();
  }, [user, authLoading, router]);

// Fetch users and onboarding submissions when admin status is confirmed
useEffect(() => {
  const fetchUsers = async () => {
    if (status !== 'admin' || !user) return;
    
    setFetchingUsers(true);
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${idToken}` }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setFetchingUsers(false);
    }
  };

  const fetchOnboardingSubmissions = async () => {
    if (status !== 'admin' || !user) return;

    setFetchingOnboarding(true);
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/admin/onboarding-submissions', {
        headers: { 'Authorization': `Bearer ${idToken}` }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch onboarding submissions: ${response.status}`);
      }
      const data = await response.json();
      setOnboardingSubmissions(data);
    } catch (error) {
      console.error('Error fetching onboarding submissions:', error);
    } finally {
      setFetchingOnboarding(false);
    } // Fixed missing closing brace here
  };

  const fetchContentRequests = async () => {
    if (status !== 'admin' || !user) return;

    setFetchingContentRequests(true);
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/admin/content-requests', {
        headers: { 'Authorization': `Bearer ${idToken}` }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch content requests: ${response.status}`);
      }
      const data = await response.json();
      setContentRequests(data);
    } catch (error) {
      console.error('Error fetching content requests:', error);
    } finally {
      setFetchingContentRequests(false);
    }
  };

  fetchUsers();
  fetchOnboardingSubmissions();
  fetchContentRequests()
}, [status, user, refreshTrigger]);

// Function to handle updating user access levels
const handleUpdateAccess = async (uid: string, field: 'dashboardAccess' | 'creatorToolsAccess', value: boolean) => {
  if (!user) {
    console.error("Admin user not logged in.");
    return;
  }

  // Find the current user data
  const currentUser = users.find(u => u.uid === uid);
  if (!currentUser) return;

  // Prepare update payload with both fields
  const payload = {
    uid,
    dashboardAccess: field === 'dashboardAccess' ? value : currentUser.dashboardAccess,
    creatorToolsAccess: field === 'creatorToolsAccess' ? value : currentUser.creatorToolsAccess
  };

  // Optimistic UI update
  setUsers(prevUsers => 
    prevUsers.map(u => u.uid === uid ? { ...u, [field]: value } : u)
  );
  
  setFeedbackMessage(null);
  setFeedbackType(null);
  
  try {
    const idToken = await user.getIdToken();
    const response = await fetch('/api/admin/update-user-access', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to update access');
    }

    const result = await response.json();
    setFeedbackMessage(result.message);
    setFeedbackType('success');
  } catch (error: any) {
    console.error('Failed to update access:', error);
    setFeedbackMessage(`Failed to update access: ${error.message}`);
    setFeedbackType('error');
    
    // Revert optimistic update
    setUsers(prevUsers => 
      prevUsers.map(u => u.uid === uid ? currentUser : u)
    );
  } finally {
    setTimeout(() => {
      setFeedbackMessage(null);
      setFeedbackType(null);
    }, 5000);
  }
}

// Function to handle granting dashboard access
const handleGrantDashboardAccess = async (uid: string) => {
  if (!user) {
    console.error("Admin user not logged in.");
    return;
  }

  setGrantingAccess(uid);
  setFeedbackMessage(null);
  setFeedbackType(null);
  
  try {
    const idToken = await user.getIdToken();
    const response = await fetch('/api/admin/grant-dashboard-access', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({ uid })
    });

    if (!response.ok) {
      throw new Error('Failed to grant dashboard access');
    }

    const result = await response.json();
    setFeedbackMessage(result.message);
    setFeedbackType('success');

    // Update UI to reflect access status
    setUsers(prevUsers => 
      prevUsers.map(u => u.uid === uid ? { ...u, dashboardAccess: true } : u)
    );
  } catch (error: any) {
    console.error('Failed to grant dashboard access:', error);
    setFeedbackMessage(`Failed to grant dashboard access: ${error.message}`);
    setFeedbackType('error');
  } finally {
    setGrantingAccess(null);
    setTimeout(() => {
      setFeedbackMessage(null);
      setFeedbackType(null);
    }, 5000);
  }
}


  // Grant admin privileges to a user
  const handleGrantAdmin = async (uid: string) => {
    if (!user) return;
    
    setGrantingAdmin(uid);
    setFeedbackMessage(null); // Clear previous feedback
    setFeedbackType(null);
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/admin/grant-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ uid })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to grant admin');
      }
      const result = await response.json();
      console.log(`Successfully granted admin to ${uid}:`, result.message);
      setFeedbackMessage(result.message);
      setFeedbackType('success');

      // Update UI to reflect admin status
      setUsers(prevUsers => 
        prevUsers.map(u => u.uid === uid ? { ...u, isAdmin: true } : u)
      );
    } catch (error: any) {
      console.error('Failed to grant admin:', error);
      setFeedbackMessage(`Failed to grant admin: ${error.message}`);
      setFeedbackType('error');
    } finally {
      setGrantingAdmin(null);
      setTimeout(() => {
        setFeedbackMessage(null);
        setFeedbackType(null);
    }, 5000);
    }
  };

  // Function to handle revoking admin privileges
  const handleRevokeAdmin = async (uid: string) => {
    if (!user) {
        console.error("Admin user not logged in.");
        return;
    }

    // Prevent revoking admin from the currently logged-in admin
    if (user.uid === uid) {
         setFeedbackMessage("You cannot revoke admin privileges from yourself.");
         setFeedbackType('error');
          setTimeout(() => {
            setFeedbackMessage(null);
            setFeedbackType(null);
          }, 5000);
         return;
    }


    setRevokingAdmin(uid);
    setFeedbackMessage(null); // Clear previous feedback
    setFeedbackType(null);
    try {
        const idToken = await user.getIdToken();
        const response = await fetch('/api/admin/revoke-admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
            body: JSON.stringify({ uid })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error revoking admin from ${uid}: ${errorData.error || response.statusText}`);
        }

        const result = await response.json();
        console.log(`Successfully revoked admin from ${uid}:`, result.message);
         setFeedbackMessage(result.message);
        setFeedbackType('success');

        setUsers(prevUsers => 
          prevUsers.map(u => u.uid === uid ? { ...u, isAdmin: false } : u)
        );

    } catch (error: any) {
        console.error('Failed to revoke admin:', error);
        setFeedbackMessage(`Failed to revoke admin: ${error.message}`);
        setFeedbackType('error');
    } finally {
        setRevokingAdmin(null);
         // Clear feedback message after a few seconds
        setTimeout(() => {
            setFeedbackMessage(null);
            setFeedbackType(null);
          }, 5000); // Clear after 5 seconds
    }
};
  
  
  
  const handleUpdateContentRequestStatus = async (requestId: string, newStatus: string) => {
    if (!user) {
      console.error("Admin user not logged in.");
      return;
    }

    setUpdatingContentRequestStatus(requestId); // Set loading state for this specific request
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/admin/update-content-request-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ requestId, newStatus })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update content request status');
      }

            // Instead of refetching all, update the specific request in the state
            setContentRequests(prevRequests =>
              prevRequests.map(req =>
                req.id === requestId ? { ...req, status: newStatus } : req
              )
            );
    } catch (error: any) {
      console.error('Error updating content request status:', error);
      setUpdatingContentRequestStatus(null);
    } finally {
      // Optional: Show feedback message after upload
      setFeedbackType('success');
      // Close the modal after successful upload
      setShowContentRequestModal(false);

    }
  };

  const handleViewDetails = (submission: any) => {
    setSelectedSubmission(submission);
    setShowModal(true);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (status === 'unauthorized') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
            >
              {/* ... (feedback message remains the same) */}
              
              <h2 className="text-xl font-semibold text-white mb-6">User Management</h2>
              
              {fetchingUsers ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">Loading users...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          User ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Dashboard
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Creator Tools
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                         <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Payment
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Dashboard Access
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {users.length > 0 ? (
                        users.map((userData) => {
                          const isCurrentUser = user && user.uid === userData.uid;
                          
                          return (
                            <tr key={userData.uid} className="hover:bg-gray-800/50">
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                                {userData.email || 'N/A'}
                                {isCurrentUser && (
                                  <span className="ml-2 text-xs text-blue-400">(You)</span>
                                )}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                                <div className="truncate max-w-xs">{userData.uid}</div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                {userData.isAdmin ? (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-300">
                                    Admin
                                  </span>
                                ) : (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-800 text-gray-400">
                                    User
                                  </span>
                                )}
                              </td>
                              {/* Dashboard Access Checkbox */}
                              <td className="px-4 py-3 whitespace-nowrap text-center">
                                <input
                                  type="checkbox"
                                  checked={!!userData.dashboardAccess}
                                  onChange={(e) => 
                                    handleUpdateAccess(
                                      userData.uid, 
                                      'dashboardAccess', 
                                      e.target.checked
                                    )
                                  }
                                  className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-600"
                                />
                              </td>
                              {/* Creator Tools Access Checkbox */}
                              <td className="px-4 py-3 whitespace-nowrap text-center">
                                <input
                                  type="checkbox"
                                  checked={!!userData.creatorToolsAccess}
                                  onChange={(e) => 
                                    handleUpdateAccess(
                                      userData.uid, 
                                      'creatorToolsAccess', 
                                      e.target.checked
                                    )
                                  }
                                  className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-600"
                                />
                              </td>
                              <td className="px-4 py-3 text-right text-sm font-medium">
                                {userData.isAdmin ? (
                                  <button
                                    onClick={() => handleRevokeAdmin(userData.uid)}
                                    className="text-red-400 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={Boolean(revokingAdmin === userData.uid || isCurrentUser)}
                                  >
                                    {revokingAdmin === userData.uid 
                                      ? 'Revoking...' 
                                      : (isCurrentUser ? 'Current User' : 'Revoke Admin')
                                    }
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleGrantAdmin(userData.uid)}
                                    className="text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={grantingAdmin === userData.uid}
                                  >
                                    {grantingAdmin === userData.uid ? 'Granting...' : 'Grant Admin'}
                                  </button>
                                )}
                              </td>
                               <td className="px-4 py-3 whitespace-nowrap text-center">
                                {userData.paymentSubmitted ? (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-300">
                                    Submitted
                                  </span>
                                ) : (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-800 text-gray-400">
                                    Not Submitted
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-center">
                                {userData.dashboardAccess ? (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-300">
                                    Granted
                                  </span>
                                ) : (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-800 text-gray-400">
                                    Not Granted
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-right">
                                {!userData.dashboardAccess && (
                                  <button
                                    onClick={() => handleGrantDashboardAccess(userData.uid)}
                                    className="text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={grantingAccess === userData.uid}
                                  >
                                    {grantingAccess === userData.uid ? 'Granting...' : 'Grant Access'}
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
            {/* Onboarding Submissions Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }} // Add a slight delay after the first section
              className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 mt-12" // Added mt-12 for spacing
            >
              <h2 className="text-xl font-semibold text-white mb-6">Onboarding Submissions</h2>

              {fetchingOnboarding ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">Loading onboarding submissions...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          User ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Company Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Industry
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {onboardingSubmissions.length > 0 ? (
                        onboardingSubmissions.map((submission: any) => ( // Use 'any' for now, we can define an interface later
                          <tr key={submission.id} className="hover:bg-gray-800/50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                              <div className="truncate max-w-xs">{submission.id}</div> {/* Assuming submission.id is the doc ID */}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                              {submission.companyName || 'N/A'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                              {submission.industry || 'N/A'}
                            </td>
                            <td className="px-4 py-3 text-right text-sm font-medium">
                              <button
                                onClick={() => handleViewDetails(submission)}
                                className="text-blue-400 hover:text-blue-300"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                            No onboarding submissions found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
            {/* Content Requests Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }} // Add a slight delay
              className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 mt-12" // Added mt-12 for spacing
            >
              <h2 className="text-xl font-semibold text-white mb-6">Content Requests</h2>

              {fetchingContentRequests ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">Loading content requests...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          User ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Content Topic
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Content Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Target Platform
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {contentRequests.length > 0 ? (
                        contentRequests.map((request: any) => ( // Use 'any' for now
                          <tr key={request.id} className="hover:bg-gray-800/50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                              <div className="truncate max-w-xs">{request.id}</div> {/* Assuming request.id is the doc ID */}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                              {request.contentTopic || 'N/A'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                              {request.contentType || 'N/A'}
                            </td>
                             <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                              {request.targetPlatform || 'N/A'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400\">
                              <select
                                value={request.status || 'Submitted'} // Default to Submitted if status is missing
                                onChange={(e) => handleUpdateContentRequestStatus(request.id, e.target.value)}
                                disabled={updatingContentRequestStatus === request.id}
                                className="bg-gray-700 text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed\"
                              >
                                <option value="Submitted\">Submitted</option>
                                <option value="In Progress\">In Progress</option>
                                <option value="Completed\">Completed</option>
                                <option value="Approved\">Approved</option>
                                <option value="Rejected\">Rejected</option>
                              </select>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setSelectedContentRequest(request);
                                  setShowContentRequestModal(true);
                                }}


                                className="text-blue-400 hover:text-blue-300"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                            No content requests found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Onboarding Submission Details Modal */}
      {showModal && selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4">
          <div className="bg-gray-800 text-white rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative border border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-blue-400">Onboarding Submission Details</h3>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-3xl leading-none"
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="space-y-4 text-gray-300 text-sm">
              {Object.entries(selectedSubmission).map(([key, value]) => (
                <div key={key} className="border-b border-gray-700 pb-3">
                  <strong className="text-white capitalize block mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </strong>
                  <span className="block pl-2">
                    {Array.isArray(value) ? value.join(', ') : value?.toString() || 'N/A'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

        {/* Content Request Details Modal */}
        {showContentRequestModal && selectedContentRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4">
          <div className="bg-gray-800 text-white rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative border border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-purple-400">Content Request Details</h3>
            <button
              onClick={() => setShowContentRequestModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-3xl leading-none"
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="space-y-4 text-gray-300 text-sm">
              {Object.entries(selectedContentRequest).map(([key, value]) => (
                <div key={key} className="border-b border-gray-700 pb-3">
                  <strong className="text-white capitalize block mb-1">
                    {/* Improve key formatting */}
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()}:
                  </strong>
                  <span className="block pl-2">
                    {/* Handle arrays and other types gracefully */}
                    {Array.isArray(value) ? value.join(', ') : typeof value === 'object' && value !== null ? JSON.stringify(value, null, 2) : value?.toString() || 'N/A'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

        {/* Upload Generated Content Section */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <h4 className="text-xl font-semibold text-white mb-4">Upload Generated Content</h4>

          {/* Content Request Selector */}
          <label className="block mb-2 text-sm font-medium text-white">
            Select Content Request
          </label>
          <select
            className="block w-full bg-gray-800 text-white border border-gray-600 rounded-md p-2 mb-4"
            value={selectedContentRequest?.id || ""}
            onChange={(e) => {
              const selectedId = e.target.value;
              const selected = contentRequests.find((req) => req.id === selectedId);
              setSelectedContentRequest(selected || null);
            }}
            disabled={fetchingContentRequests}
          >
            <option value="">-- Select a request --</option>
            {contentRequests.map((req) => (
              <option key={req.id} value={req.id}>
                {req.contentTopic || "Untitled"} ({req.contentType || "Type"})
              </option>
            ))}
          </select>

          {fetchingContentRequests ? (
            <div className="flex justify-center py-8">
            </div>
          ) : selectedContentRequest ? (
            <UploadDropzone<OurFileRouter>
              endpoint="contentUploader"
              input={{ requestId: selectedContentRequest?.id || "" }}
              onClientUploadComplete={(res) => {
                setFeedbackMessage("Upload complete! Files will appear shortly.");
                setFeedbackType("success");
                setTimeout(() => setFeedbackMessage(null), 5000);
                
                // Trigger a refresh instead of calling directly
                setRefreshTrigger(prev => prev + 1);
              }}
              onUploadError={(error) => {
                setFeedbackMessage(`Upload failed: ${error.message}`);
                setFeedbackType("error");
                setTimeout(() => setFeedbackMessage(null), 5000);
              }}
              config={{ mode: "auto" }}
              className="ut-button:bg-purple-600 ut-button:ut-readying:bg-purple-600/50 
                        ut-button:ut-uploading:bg-purple-600/50 ut-label:text-purple-400 
                        ut-allowed-content:text-gray-400 border-2 border-dashed border-gray-500 
                        p-4 rounded-lg"
            />
          ) : (
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-8 text-center">
              <p className="text-gray-400">
                {contentRequests.length > 0 
                  ? "Please select a content request to upload files" 
                  : "No content requests available"}
              </p>
            </div>
          )}

          {/* Uploaded Files Preview */}
          {selectedContentRequest?.generatedContent?.length > 0 && (
            <div className="mt-4">
              <h5 className="text-md font-medium text-white mb-2">Uploaded Files</h5>
              <ul className="space-y-2">
                {selectedContentRequest.generatedContent.map((url: string, idx: number) => (
                  <li key={idx}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline break-all"
                    >
                      {url.split('/').pop()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Feedback Message */}
          {feedbackMessage && (
            <div
              className={`mt-4 p-3 rounded-md text-sm ${
                feedbackType === "success"
                  ? "bg-green-900/20 text-green-400"
                  : "bg-red-900/20 text-red-400"
              }`}
            >
              {feedbackMessage}
            </div>
          )}
        </div>
    </div>
  );
};

export default AdminDashboardPage;