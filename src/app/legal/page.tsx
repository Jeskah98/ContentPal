export default function LegalPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Legal Information</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Terms of Service</h2>
        <p className="text-gray-700 mb-6">
          By accessing or using Content Pal AI ("the Service"), you agree to be bound by these terms.
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Service Description</h3>
          <p className="text-gray-700">
            Content Pal AI provides AI-powered social media content creation and management tools to businesses. 
            Users maintain ownership of all content they generate or upload through the Service.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">User Responsibilities</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>You must be at least 18 years old or have parental consent to use the Service</li>
            <li>You agree not to use the Service for any illegal activities or to create harmful content</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Intellectual Property</h3>
          <p className="text-gray-700">
            All AI models, software, and platform content remain the property of Content Pal AI. 
            Users grant us a limited license to process their content solely for service delivery.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Termination</h3>
          <p className="text-gray-700">
            We reserve the right to suspend or terminate accounts that violate these terms. 
            Users may cancel their subscription at any time.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Changes to These Terms</h3>
          <p className="text-gray-700">
            We may update these terms periodically. Continued use of the Service constitutes acceptance of any changes.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Data Protection & Privacy</h2>
        <p className="text-gray-700 mb-6">
          We comply with UK GDPR and the Data Protection Act 2018.
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Data Collection</h3>
          <p className="text-gray-700 mb-3">We process:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Account information (name, email, payment details)</li>
            <li>Content you generate or upload</li>
            <li>Technical data (IP addresses, device information)</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Legal Basis for Processing</h3>
          <p className="text-gray-700 mb-3">We process data when:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Necessary to fulfill our contract with you</li>
            <li>We have legitimate business interests</li>
            <li>You have given explicit consent</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Data Retention</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Account data is retained while your account is active</li>
            <li>Generated content is stored for up to 12 months</li>
            <li>Backups are maintained for 30 days after deletion</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Your Rights</h3>
          <p className="text-gray-700 mb-3">
            Under UK law, you have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Access your personal data</li>
            <li>Request correction or deletion</li>
            <li>Object to processing</li>
            <li>Request data portability</li>
          </ul>
          <p className="text-gray-700 mt-3">
            To exercise these rights, contact <a href="mailto:privacy@contentpal.ai" className="text-blue-600 hover:underline">privacy@contentpal.ai</a>.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Data Security</h3>
          <p className="text-gray-700 mb-3">
            We implement appropriate technical measures including:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Encryption of data in transit</li>
            <li>Access controls and authentication protocols</li>
            <li>Regular security assessments</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Third-Party Services</h3>
          <p className="text-gray-700 mb-3">
            We may use trusted service providers for:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Payment processing</li>
            <li>Cloud hosting</li>
            <li>Analytics and performance monitoring</li>
          </ul>
          <p className="text-gray-700 mt-3">
            All third parties are vetted for GDPR compliance.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Cookies</h3>
          <p className="text-gray-700 mb-3">
            We use cookies for:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Essential site functionality</li>
            <li>Service improvement</li>
            <li>Anonymous analytics</li>
          </ul>
          <p className="text-gray-700 mt-3">
            You may manage cookie preferences through your browser settings.
          </p>
        </div>
      </section>
    </div>
  );
}