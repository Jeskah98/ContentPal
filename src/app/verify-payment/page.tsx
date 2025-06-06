'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext'; // Import useAuth

const VerifyPaymentPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const { user } = useAuth(); // Get the authenticated user

  const handleSubmitEmail = async () => {
    if (!user || !user.uid) {
      console.error('User not authenticated.');
      // Optionally redirect to login or show a message
      return;
    }

    try {
      const response = await fetch('/api/submit-payment-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid, email }),
      });
      console.log('Email submission response:', await response.json());
    } catch (error) {
      console.error('Error submitting email:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="w-full py-6 bg-white shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-800">Payment Verification</h1>
      </header>
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Thank You For Your Payment!</h2>
          <p className="text-gray-700">
            Your payment has been received and is currently being verified. We will notify you once your subscription is active.
          </p>

          <div className="mt-8">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email used for payment (optional)
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubmitEmail} className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Submit Email
            </button>
          </div>
          {/* Optionally, you could add a spinner or an image here */}
          <div className="mt-6 text-sm text-gray-500">
            You can close this page now.
          </div>
        </div>
      </main>
      {/* You might want to add a footer component here if you have one */}
    </div>
  );
};

export default VerifyPaymentPage;