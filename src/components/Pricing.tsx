// components/Pricing.tsx (New)
'use client'
import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

export default function DynamicPricing() {
  const [annualBilling, setAnnualBilling] = useState(true)
  
  const plans = [
    {
      name: 'Starter',
      price: annualBilling ? '$2,970' : '$297',
      description: 'Perfect for individual creators',
      features: [
        '20 AI-generated posts/month',
        'Basic analytics',
        '3 social platforms',
        'Email support'
      ]
    },
    {
      name: 'Professional',
      price: annualBilling ? '$5,970' : '$597',
      description: 'For growing brands & agencies',
      features: [
        '50 AI-generated posts/month',
        'Advanced analytics',
        '5 social platforms',
        'Priority support',
        'Competitor analysis'
      ],
      featured: true
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
        'SLA & 24/7 support'
      ]
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <div className="flex justify-center items-center gap-4 mb-8">
            <span className="text-gray-600">Annual</span>
            <button 
              onClick={() => setAnnualBilling(!annualBilling)}
              className={`relative w-12 h-6 rounded-full p-1 transition-colors ${
                annualBilling ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute w-4 h-4 rounded-full bg-white transform transition-transform ${
                annualBilling ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
            <span className="text-gray-600">Monthly</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`p-8 rounded-2xl transition-all ${
                plan.featured 
                  ? 'bg-gradient-to-b from-blue-500 to-purple-500 shadow-xl scale-105' 
                  : 'bg-white shadow-lg'
              }`}
            >
              <div className={`${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-lg mb-6">{plan.description}</p>
                <div className="text-4xl font-bold mb-8">{plan.price}</div>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full mt-8 py-3 rounded-lg font-semibold transition-all ${
                  plan.featured
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}>
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}