'use client';
import Navbar from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';


export default function SubscribePage() {
  const subscriptionTiers = [
    {
      name: 'Starter',
      price: '$297',
      description: 'Perfect for individual creators',
      features: [
        'Single platform social media management with analytics',
        '8 image posts interchangeable for platforms',
        'Monthly newsletter creation *',
        'AI image re-imagining *',
        'Email support',
      ],
      highlight: false,
    },
    {
      name: 'Professional',
      price: '$597',
      description: 'For growing brands & agencies',
      features: [
        'Dual platform social media management with analytics',
        'Brand/Business social media marketing strategy',
        '16 image posts interchangeable for platforms',
        'Biweekly newsletter creation *',
        'AI image re-imagining',
        'AI video editing *',
        'Priority support',
        'Competitor analysis',
      ],
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: '$1,197',
      description: 'For large organizations',
      features: [
        '32 image posts interchangeable for platforms',
        '12 image & text LinkedIn posts',
        'Weekly newsletter creation',
        'AI image re-imagining',
        'AI video editing',
        'Custom short video creation with AI',
        'Custom image creation with AI',
        'Voice overs with custom voices or voice cloning',
        'Full social media management with analytics',
        'Dedicated account manager & 24/7 support',
      ],
      highlight: false,
    },
  ];

  const { user } = useAuth();
  const router = useRouter();

  // Map tier names directly to Payment Link URLs
  const paymentLinks: { [key: string]: string | null } = {
    Starter: 'https://buy.stripe.com/8x200i5Tk5PG80w6s4gEg00',
    Professional: 'https://buy.stripe.com/00w8wO4Pg5PGcgMbMogEg01',
    Enterprise: 'https://buy.stripe.com/00w6oG81sfqggx2eYAgEg03',
  };

  const handleCheckout = (tierName: string) => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    const link = paymentLinks[tierName];
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-lg text-gray-600 mb-12">
            Unlock the power of AI-driven content with a plan that fits your needs.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {subscriptionTiers.map((tier) => {
              const hasPaymentLink = !!paymentLinks[tier.name];
              const isEnterprise = tier.name === 'Enterprise';
              
              return (
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
                    className={`w-full py-3 rounded-md font-semibold transition-colors ${
                      tier.highlight 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    } ${(!user || isEnterprise || !hasPaymentLink) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleCheckout(tier.name)}
                    disabled={!user || isEnterprise || !hasPaymentLink}
                  >
                    {isEnterprise || !hasPaymentLink
                      ? 'Contact Us'
                      : `Choose ${tier.name}`}
                  </button>
                </div>
              );
            })}
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