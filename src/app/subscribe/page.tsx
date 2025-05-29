'use client';
import Navbar from '@/components/FloatingNav'; // Assuming your navbar component is here
import Footer from '@/components/Footer'; // Assuming you have a Footer component
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react'; // Import useEffect
import { useRouter } from 'next/navigation'; // Import useRouter

// Get your Stripe Publishable Key from environment variables
// You will need to set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in your .env.local file
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

// Ensure Stripe is loaded before attempting to use it
const stripe = typeof window !== 'undefined' && stripePublishableKey
  ? (window as any).Stripe(stripePublishableKey)
  : null;

export default function SubscribePage() {
  const subscriptionTiers = [
    {
      name: 'Starter',
      price: '$297',
      description: 'Perfect for individual creators',
      features: [
        '20 AI-generated posts/month',
        'Basic analytics',
        '3 social platforms',
        'Email support',
      ],
      highlight: false,
    },
    {
      name: 'Professional',
      price: '$597',
      description: 'For growing brands & agencies',
      features: [
        '50 AI-generated posts/month',
        'Advanced analytics',
        '5 social platforms',
        'Priority support',
        'Competitor analysis',
      ],
      highlight: true, // Example to highlight this tier
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Unlimited posts',
        'Dedicated account manager',
        'Custom AI training',
        'API access',
        'SLA & 24/7 support',
      ],
      highlight: false,
    },
  ];

  const { user } = useAuth(); // Get the authenticated user
  const [loadingCheckout, setLoadingCheckout] = useState(false); // State to manage loading state for checkout
  const router = useRouter(); // Initialize useRouter

  // Replace with your actual Stripe Price IDs
  const priceIds: { [key: string]: string | null } = {
    Starter: 'price_1RTtFjPB9p8CSctIDYdXuFd1', // Replace with your Starter Price ID
    Professional: 'price_1RTtH0PB9p8CSctIx1H7m8fX', // Replace with your Professional Price ID
    Enterprise: null, // Enterprise has custom pricing, no direct checkout button
  };

  const handleCheckout = async (priceId: string | null) => {
    if (!user || !user.uid) {
      console.error('User not authenticated.');
      router.push('/login'); // Redirect to login page if user is not logged in
      return;
    }

    if (!priceId) {
      console.error('Price ID not available for this tier.');
      return;
    }

    console.log('Initiating checkout for user:', user.uid, 'with priceId:', priceId);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid, // Assuming your user object has a uid
          priceId: priceId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create checkout session');
      }

      const sessionId = data.sessionId;

      if (stripe) {
        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });

        if (result.error) {
          // If `redirectToCheckout` fails, log the error
          console.error('Stripe redirectToCheckout error:', result.error);
        }
      } else {
        console.error('Stripe.js failed to load.');
      }

    } catch (err: any) {
      console.error('Error in handleCheckout:', err);
      // Optionally display an error message to the user
    } finally {
      setLoadingCheckout(false); // Ensure loading state is reset even on error
    }

  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="py-24 px-4 sm:px-6 lg:px-8"> {/* Added padding to avoid navbar overlap */}
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-lg text-gray-600 mb-12">
            Unlock the power of AI-driven content with a plan that fits your needs.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {subscriptionTiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-white p-8 rounded-lg shadow-lg ${tier.highlight ? 'border-2 border-blue-600' : ''}`}
              >
                <h2 className={`text-2xl font-semibold mb-4 ${tier.highlight ? 'text-blue-600' : 'text-gray-800'}`}>
                  {tier.name}
                </h2>
                <p className="text-gray-600 mb-4">{tier.description}</p>
                <div className="text-4xl font-bold text-gray-900 mb-6">
                  {tier.price}
                  {tier.price !== 'Custom' && <span className="text-xl font-medium text-gray-600">/month</span>}
                </div>
                <ul className="text-left text-gray-700 mb-8 space-y-2">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
 className={`w-full py-3 rounded-md font-semibold transition-colors ${tier.highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
 onClick={() => handleCheckout(priceIds[tier.name])}
 disabled={loadingCheckout || !user || tier.name === 'Enterprise' || !priceIds[tier.name]} // Disable if currently loading ANY checkout, user not logged in, Enterprise tier, or no price ID defined
                >
 {tier.name === 'Enterprise'
 ? 'Contact Us'
 : loadingCheckout && priceIds[tier.name] === priceId // Show loading state for the specific tier being checked out
 ? 'Processing...'
 : `Choose ${tier.name}`}
                </button>
              </div>
            ))}
          </div>


          <p className="mt-12 text-md text-gray-600">
            All plans include a 7-day free trial. Billing information is required to start your trial.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}