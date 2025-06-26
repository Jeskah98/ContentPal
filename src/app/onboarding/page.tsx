'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext'; // Import useAuth
import { useRouter } from 'next/navigation';
import React from 'react';

export default function OnboardingFormPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    brandDescription: '',
    brandValues: '',
    targetAudience: '',
    goals: [] as string[],
    kpis: '',
    platforms: [] as string[],
    profileLinks: '',
    currentContent: '',
    currentBrandVoice: '',
    preferredThemes: '',
    desiredContentTypes: '',
    avoidContentTypes: '',
    competitors: '',
    notes: '',
  });
  const { user, loading: authLoading } = useAuth(); // Get the authenticated user and auth loading state
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage submission loading
  const [error, setError] = useState<string | null>(null); // Add error state

  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prevData) => {
        const updatedGoals = name === 'goals'
          ? checked
            ? [...prevData.goals, value]
            : prevData.goals.filter((goal) => goal !== value)
          : prevData.goals;
        const updatedPlatforms = name === 'platforms'
          ? checked
            ? [...prevData.platforms, value]
            : prevData.platforms.filter((platform) => platform !== value)
          : prevData.platforms;

        return {
          ...prevData,
          goals: updatedGoals,
          platforms: updatedPlatforms,
        };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isSubmitting) return; // Prevent double submission
    setError(null); // Clear previous errors on new submission attempt
    if (authLoading) return; // Wait for auth to load
    if (!user || !user.uid) {
      console.error('User not authenticated.');
      // Optionally redirect to login or show an error message
      return;
    }
    e.preventDefault();

    // Basic validation
    const requiredFields = ['companyName', 'contactPerson', 'email', 'industry', 'brandDescription', 'brandValues', 'targetAudience'] as const;
    let allFieldsFilled = true;
    requiredFields.forEach(field => {
        const value = formData[field];
        if (typeof value === 'string' && !value.trim()) {
            allFieldsFilled = false;
            // You might want to add visual feedback for empty fields here
        }
    });

    if (formData.goals.length === 0) {
        allFieldsFilled = false;
        // Add feedback for not selecting a goal
    }

    if (allFieldsFilled) {
      setIsSubmitting(true); // Set submitting state to true
      const dataToSend = {
        ...formData,
        userId: user.uid,  // Ensure this is at root level
        id: user.uid       // Add this to match Firestore document ID
      };
      // Send data to API route
      fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      }) // Change formData to dataToSend
      .then(async (response) => {
        if (!response.ok) {
          // If the response is not OK, throw an error or log the response text
          console.error('API response not OK:', response.status, response.statusText);
          const text = await response.text();
          console.error('API response body:', text);
          throw new Error(`API response not OK: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        alert('Submission successful!'); // Simple alert for confirmation
        router.push('/dashboard'); // Redirect to dashboard
        console.log(data)
      })
      .catch((error) => {
        console.error('Error submitting form:', error); // Keep console error for debugging
        setError(`Error submitting form: ${error.message || 'Unknown error'}`); // Set user-friendly error message
      })
      .finally(() => setIsSubmitting(false)); // Reset submitting state
    } else {
        console.error('Please fill in all required fields and select at least one social media goal.');
        setError('Please fill in all required fields and select at least one social media goal.'); // Set error for validation
        // Add user-friendly error message display
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Content Pal. AI Client Onboarding</h1>
        <p className="text-center text-gray-600 mb-8">
          To ensure Content Pal. AI delivers the best results for your brand, please provide the following details.
          This information will help our proprietary AI technology craft bespoke, brand-perfect content.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">1. Contact & Company Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="companyName" className="block text-sm mb-2">Company Name <span className="text-red-500">*</span></label>
                <input type="text" id="companyName" name="companyName" placeholder="e.g., Acme Corp" required value={formData.companyName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="contactPerson" className="block text-sm mb-2">Contact Person Name <span className="text-red-500">*</span></label>
                <input type="text" id="contactPerson" name="contactPerson" placeholder="e.g., Jane Doe" required value={formData.contactPerson} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="block text-sm mb-2">Email Address <span className="text-red-500">*</span></label>
                <input type="email" id="email" name="email" placeholder="e.g., jane.doe@example.com" required value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="block text-sm mb-2">Phone Number</label>
                <input type="tel" id="phone" name="phone" placeholder="e.g., +1 (555) 123-4567" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="form-group md:col-span-2">
                <label htmlFor="website" className="block text-sm mb-2">Company Website URL</label>
                <input type="url" id="website" name="website" placeholder="e.g., https://www.yourcompany.com" value={formData.website} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 pb-6 pt-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">2. Brand & Industry Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group md:col-span-2">
                <label htmlFor="industry" className="block text-sm mb-2">Your Industry / Niche <span className="text-red-500">*</span></label>
                <input type="text" id="industry" name="industry" placeholder="e.g., E-commerce, SaaS, Healthcare" required value={formData.industry} onChange={handleChange} />
              </div>
              <div className="form-group md:col-span-2">
                <label htmlFor="brandDescription" className="block text-sm mb-2">Brief Description of Your Company/Brand <span className="text-red-500">*</span></label>
                <textarea id="brandDescription" name="brandDescription" rows={3} placeholder="Tell us about your mission, products/services, and what makes you unique." required value={formData.brandDescription} onChange={handleChange}></textarea>
              </div>
              <div className="form-group md:col-span-2">
                <label htmlFor="brandValues" className="block text-sm mb-2">Key Brand Values & Core Messaging <span className="text-red-500">*</span></label>
                <textarea id="brandValues" name="brandValues" rows={3} placeholder="e.g., Innovation, Sustainability, Customer-centricity, Luxury, Affordability" required value={formData.brandValues} onChange={handleChange}></textarea>
              </div>
              <div className="form-group md:col-span-2">
                <label htmlFor="targetAudience" className="block text-sm mb-2">Describe Your Target Audience <span className="text-red-500">*</span></label>
                <textarea id="targetAudience" name="targetAudience" rows={3} placeholder="e.g., Small business owners, Gen Z tech enthusiasts, Eco-conscious consumers" required value={formData.targetAudience} onChange={handleChange}></textarea>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 pb-6 pt-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">3. Social Media Goals</h2>
            <div className="form-group">
              <label className="block text-sm mb-2">What are your primary social media goals? (Select all that apply) <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 checkbox-group">
                <label><input type="checkbox" name="goals" value="Brand Awareness" checked={formData.goals.includes("Brand Awareness")} onChange={handleChange} /> Brand Awareness</label>
                <label><input type="checkbox" name="goals" value="Lead Generation" checked={formData.goals.includes("Lead Generation")} onChange={handleChange} /> Lead Generation</label>
                <label><input type="checkbox" name="goals" value="Engagement" checked={formData.goals.includes("Engagement")} onChange={handleChange} /> Engagement</label>
                <label><input type="checkbox" name="goals" value="Sales/Conversions" checked={formData.goals.includes("Sales/Conversions")} onChange={handleChange} /> Sales/Conversions</label>
                <label><input type="checkbox" name="goals" value="Community Building" checked={formData.goals.includes("Community Building")} onChange={handleChange} /> Community Building</label>
                <label><input type="checkbox" name="goals" value="Website Traffic" checked={formData.goals.includes("Website Traffic")} onChange={handleChange} /> Website Traffic</label>
                <label><input type="checkbox" name="goals" value="Customer Support" checked={formData.goals.includes("Customer Support")} onChange={handleChange} /> Customer Support</label>
                <label><input type="checkbox" name="goals" value="Thought Leadership" checked={formData.goals.includes("Thought Leadership")} onChange={handleChange} /> Thought Leadership</label>
                <label><input type="checkbox" name="goals" value="Recruitment" checked={formData.goals.includes("Recruitment")} onChange={handleChange} /> Recruitment</label>
              </div>
            </div>
            <div className="form-group mt-6">
              <label htmlFor="kpis" className="block text-sm mb-2">Specific KPIs or Metrics you aim to achieve:</label>
              <textarea id="kpis" name="kpis" rows={2} placeholder="e.g., 20% increase in Instagram followers, 50 leads per month from LinkedIn" value={formData.kpis} onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="border-b border-gray-200 pb-6 pt-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">4. Current Social Media Presence</h2>
            <div className="form-group">
              <label className="block text-sm mb-2">Which social media platforms do you currently use? (Select all that apply)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 checkbox-group">
                <label><input type="checkbox" name="platforms" value="Facebook" checked={formData.platforms.includes("Facebook")} onChange={handleChange} /> Facebook</label>
                <label><input type="checkbox" name="platforms" value="Instagram" checked={formData.platforms.includes("Instagram")} onChange={handleChange} /> Instagram</label>
                <label><input type="checkbox" name="platforms" value="LinkedIn" checked={formData.platforms.includes("LinkedIn")} onChange={handleChange} /> LinkedIn</label>
                <label><input type="checkbox" name="platforms" value="TikTok" checked={formData.platforms.includes("TikTok")} onChange={handleChange} /> TikTok</label>
                <label><input type="checkbox" name="platforms" value="X (Twitter)" checked={formData.platforms.includes("X (Twitter)")} onChange={handleChange} /> X (Twitter)</label>
                <label><input type="checkbox" name="platforms" value="YouTube" checked={formData.platforms.includes("YouTube")} onChange={handleChange} /> YouTube</label>
                <label><input type="checkbox" name="platforms" value="Pinterest" checked={formData.platforms.includes("Pinterest")} onChange={handleChange} /> Pinterest</label>
                <label><input type="checkbox" name="platforms" value="Snapchat" checked={formData.platforms.includes("Snapchat")} onChange={handleChange} /> Snapchat</label>
                <label><input type="checkbox" name="platforms" value="Other" checked={formData.platforms.includes("Other")} onChange={handleChange} /> Other (please specify in notes)</label>
              </div>
            </div>
            <div className="form-group mt-6">
              <label htmlFor="profileLinks" className="block text-sm mb-2">Links to Your Social Media Profiles:</label>
              <textarea id="profileLinks" name="profileLinks" rows={3} placeholder="e.g., Facebook: https://facebook.com/yourbrand&#10;Instagram: https://instagram.com/yourbrand" value={formData.profileLinks} onChange={handleChange}></textarea>
            </div>
            <div className="form-group mt-6">
              <label htmlFor="currentContent" className="block text-sm mb-2">What kind of content do you currently produce?</label>
              <textarea id="currentContent" name="currentContent" rows={2} placeholder="e.g., Image posts, short videos, blog snippets, stories, live streams" value={formData.currentContent} onChange={handleChange}></textarea>
            </div>
            <div className="form-group mt-6">
              <label htmlFor="currentBrandVoice" className="block text-sm mb-2">Describe your current brand voice:</label>
              <input type="text" id="currentBrandVoice" name="currentBrandVoice" placeholder="e.g., Formal, Casual, Humorous, Authoritative, Playful" value={formData.currentBrandVoice} onChange={handleChange} />
            </div>
          </div>

          <div className="border-b border-gray-200 pb-6 pt-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">5. Content Preferences</h2>
            <div className="form-group">
              <label htmlFor="preferredThemes" className="block text-sm mb-2">Preferred content themes or topics:</label>
              <textarea id="preferredThemes" name="preferredThemes" rows={3} placeholder="e.g., Product launches, industry news, behind-the-scenes, customer testimonials, educational content" value={formData.preferredThemes} onChange={handleChange}></textarea>
            </div>
            <div className="form-group mt-6">
              <label htmlFor="desiredContentTypes" className="block text-sm mb-2">Specific content types you'd like Content Pal. AI to focus on:</label>
              <textarea id="desiredContentTypes" name="desiredContentTypes" rows={2} placeholder="e.g., Short-form video (Reels/TikTok), infographics, interactive polls, detailed articles" value={formData.desiredContentTypes} onChange={handleChange}></textarea>
            </div>
            <div className="form-group mt-6">
              <label htmlFor="avoidContentTypes" className="block text-sm mb-2">Any content types or themes you wish to avoid:</label>
              <textarea id="avoidContentTypes" name="avoidContentTypes" rows={2} placeholder="e.g., Overly promotional content, controversial topics, stock photos" value={formData.avoidContentTypes} onChange={handleChange}></textarea>
            </div>
            <div className="form-group mt-6">
              <label htmlFor="competitors" className="block text-sm mb-2">Competitors you admire or want to differentiate from:</label>
              <textarea id="competitors" name="competitors" rows={2} placeholder="e.g., Competitor A (admire their visuals), Competitor B (want to be more engaging than them)" value={formData.competitors} onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="pt-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">6. Additional Information</h2>
            <div className="form-group">
              <label htmlFor="notes" className="block text-sm mb-2">Any other notes or specific requests for Content Pal. AI:</label>
              <textarea id="notes" name="notes" rows={4} placeholder="e.g., We have a major product launch in Q3, need content focused on that." value={formData.notes} onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Display error message */}
          {error && (
            <div className="text-red-500 text-center mt-4">
              {error}
            </div>
          )}

          <div className="flex justify-center mt-8">
            <button type="submit" className="submit-button bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold" disabled={isSubmitting || authLoading}>
              Submit Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}