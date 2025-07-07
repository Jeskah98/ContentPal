'use client';
export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 pt-32 pb-16 max-w-4xl"> {/* Increased top padding */}
      <h1 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h1>
      <div className="space-y-10"> {/* Increased spacing between sections */}
        <div className="border-b pb-8"> {/* Increased bottom padding */}
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">1. How is Content Pal AI different from other social media tools?</h2>
          <p className="text-gray-700">
            Content Pal AI is a premium solution powered by our exclusive NeuralCore technology. Unlike generic tools using third-party AI, we create completely custom content tailored to your brand - from polished captions to professional Reels scripts - while perfectly maintaining your unique voice and style.
          </p>
        </div>
        
        <div className="border-b pb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">2. How does the AI learn my brand's style?</h2>
          <p className="text-gray-700">
            Our system performs an in-depth analysis of your existing content, brand guidelines, and audience interactions. It continuously studies your brand's communication patterns, visual preferences, and engagement data to maintain authentic, on-brand content.
          </p>
        </div>
        
        <div className="border-b pb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">3. Can I approve content before publishing?</h2>
          <p className="text-gray-700">
            Yes, you always have final approval. All content is presented through our dashboard where you can review and edit posts, adjust scheduling, or request revisions before anything goes live.
          </p>
        </div>
        
        <div className="border-b pb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">4. What social platforms do you support?</h2>
          <p className="text-gray-700">
            We specialize in Instagram, TikTok, LinkedIn and Facebook, with particular focus on high-performing formats like Reels, Stories, and carousels. Our technology integrates smoothly with major design platforms.
          </p>
        </div>
        
        <div className="border-b pb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">5. How do you measure and improve performance?</h2>
          <p className="text-gray-700">
            Our system constantly analyzes engagement metrics, conversion rates, and audience response. These insights automatically refine future content while you receive clear weekly performance reports.
          </p>
        </div>
        
        <div className="border-b pb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">6. Is my data secure?</h2>
          <p className="text-gray-700">
            We prioritize security with enterprise-grade encryption and strict compliance with GDPR/CCPA standards. Your brand assets and data remain completely private.
          </p>
        </div>
        
        <div className="border-b pb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">7. What's the onboarding process?</h2>
          <p className="text-gray-700">
            After a brief brand consultation, our AI spends about 48 hours analyzing your content. Most clients receive their first content batch within 3 days, with many seeing improved engagement within two weeks.
          </p>
        </div>
        
        <div className="border-b pb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">8. Do you handle audience engagement?</h2>
          <p className="text-gray-700">
            Yes, our system monitors and responds to comments and messages 24/7 using your brand voice, while flagging important interactions for your attention.
          </p>
        </div>
        
        <div className="border-b pb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">9. What industries do you serve best?</h2>
          <p className="text-gray-700">
            While effective for all premium brands, we particularly excel with hospitality, fashion, beauty, and professional service businesses that value sophisticated social presence.
          </p>
        </div>
        
        <div className="pb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">10. What are your pricing options?</h2>
          <p className="text-gray-700">
            We offer accessible plans starting at $297/month for growing businesses, with scalable options up to premium enterprise packages. All plans include our full AI capabilities, with differences in content volume and platform coverage. We'll help you select the perfect fit.
          </p>
        </div>
      </div>
    </div>
  );
}