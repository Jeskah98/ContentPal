import React from 'react';

export default function LegalPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Legal Information</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
        <p className="text-gray-700">
          These are the terms and conditions governing your use of ContentPal.
          By accessing or using ContentPal, you agree to be bound by these terms.
          [Insert detailed terms of service here - include sections on user conduct,
          intellectual property, disclaimers, limitations of liability, termination, etc.]
          This is placeholder text. The full terms of service should be provided here.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Data Collection and Processing Rules (US)</h2>
        <p className="text-gray-700">
          This section outlines how ContentPal collects, uses, and protects your data
          in accordance with relevant US data privacy laws.
          [Insert detailed data collection and processing policies here - include
          information on types of data collected, purpose of collection, data storage,
          user rights (e.g., CCPA if applicable), security measures, cookie policy, etc.]
          This is placeholder text. The full data collection and processing rules should be provided here.
        </p>
      </section>
    </div>
  );
}