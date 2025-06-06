'use client';

import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/FloatingNav';

export default function ContentRequestPage() {
  const { user } = useAuth(); // Moved to top level
  const router = useRouter();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const [contentTopic, setContentTopic] = useState('');
  const [targetPlatform, setTargetPlatform] = useState('');
  const [tone, setTone] = useState('');
  const [contentType, setContentType] = useState('Social Media Post');
  const [targetAudience, setTargetAudience] = useState('');
  const [keyMessage, setKeyMessage] = useState('');
  const [specificRequirements, setSpecificRequirements] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || !user) return; // Check user existence

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);
  
    if (!contentTopic.trim() || !contentType) {
      setError('Please fill in the Content Topic and select a Content Type.');
      setIsSubmitting(false);
      return;
    }
  
    try {
      const token = await user.getIdToken();
  
      const requestData = {
        contentTopic: contentTopic.trim(),
        targetPlatform,
        tone,
        contentType,
        targetAudience,
        keyMessage,
        specificRequirements,
      };
  
      const response = await fetch('/api/content-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add authentication token
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit content request: ${errorText}`);
      }
  
      const data = await response.json();
      setSuccessMessage('Content request submitted successfully!');
      
      // Optionally reset form
      setContentTopic('');
      setTargetPlatform('');
      setTone('');
      setTargetAudience('');
      setKeyMessage('');
      setSpecificRequirements('');
      
    } catch (error) {
      console.error('Error submitting content request:', error);
      setError(`Failed to submit content request: ${(error as Error).message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navbar />
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Request New Content</h1>

          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-gray-700">

           <div>
              <label htmlFor="contentTopic" className="block text-sm font-medium text-gray-300 mb-2">
                Content Topic/Keywords
              </label>
              <input
                type="text"
                id="contentTopic"
                value={contentTopic}
                onChange={(e) => setContentTopic(e.target.value)}
                placeholder="e.g., Benefits of using our product, tips for productivity"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="targetPlatform" className="block text-sm font-medium text-gray-300 mb-2">
                Target Platform (e.g., Instagram, LinkedIn, Twitter)
              </label>
              <input
                type="text"
                id="targetPlatform"
                value={targetPlatform}
                onChange={(e) => setTargetPlatform(e.target.value)}
                placeholder="e.g., Instagram Reels, LinkedIn Post"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-gray-300 mb-2">
                Desired Tone of Voice
              </label>
              <input
                type="text"
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                placeholder="e.g., Professional, Humorous, Casual, Informative"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                required
              />
            </div>

            {/* New: Content Type Dropdown */}
            <div>
              <label htmlFor="contentType" className="block text-sm font-medium text-gray-300 mb-2">
                Content Type
              </label>
              <select
                id="contentType"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                required
              >
                <option value="Social Media Post">Social Media Post</option>
                <option value="Blog Post">Blog Post</option>
                <option value="Email">Email</option>
                {/* Add other content types as needed */}
              </select>
            </div>

            {/* New: Target Audience Textarea */}
            <div>
              <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-300 mb-2">
                Target Audience (Brief Description)
              </label>
              <textarea
                id="targetAudience"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                rows={3}
                placeholder="e.g., Small business owners, Gen Z tech enthusiasts"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
              ></textarea>
            </div>

            {/* New: Key Message/Call to Action Textarea */}
            <div>
              <label htmlFor="keyMessage" className="block text-sm font-medium text-gray-300 mb-2">
                Key Message / Call to Action (Optional)
              </label>
              <textarea
                id="keyMessage"
                value={keyMessage}
                onChange={(e) => setKeyMessage(e.target.value)}
                rows={2}
                placeholder="e.g., Visit our website today! Learn more about our new feature."
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
              ></textarea>
            </div>

            {/* New: Specific Requirements/Notes Textarea */}
            <div>
              <label htmlFor="specificRequirements" className="block text-sm font-medium text-gray-300 mb-2">Specific Requirements / Notes (Optional)</label>
              <textarea
                id="specificRequirements"
                value={specificRequirements}
                onChange={(e) => setSpecificRequirements(e.target.value)}
                rows={4}
                placeholder="e.g., We need 5 variations of the social media post. Focus on urgency."
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
              ></textarea>
            </div>

            <button
             type="submit"
             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
             disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting Request...' : 'Submit Content Request'}
            </button>
          </form>
          {/* Error message display */}
          {error && (
            <div className="text-red-500 text-center mt-4">
              {error}
            </div>
          )}
          {/* Success message display */}
          {successMessage && (
            <div className="text-green-500 text-center mt-4">
              {successMessage}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}