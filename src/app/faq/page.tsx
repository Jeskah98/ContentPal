export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Q: What is ContentPal?</h2>
          <p>
            A: ContentPal is an AI-powered platform that helps you generate bespoke,
            brand-perfect social media content.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Q: How does the free trial work?</h2>
          <p>
            A: We offer a 7-day free trial on all subscription tiers. You'll need
            to choose a tier and provide billing information, but you won't be
            charged until after the trial period ends.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Q: What happens after my trial ends?</h2>
          <p>
            A: If you don't cancel before the trial ends, your chosen subscription
            will begin, and you will be charged accordingly.
          </p>
        </div>
        {/* Add more placeholder FAQs here */}
      </div>
    </div>
  );
}