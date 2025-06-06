import React from 'react';

const SubscriptionStatus: React.FC = () => {
  const currentPlan = 'Starter Plan'; // Hardcode the current plan for now

  return (
    <div>
      <h2>Subscription Status</h2>
      <p>Current Plan: {currentPlan}</p>
      {/* You can add more details about the Starter Plan here later based on your pricing data */}
    </div>
  );
};

export default SubscriptionStatus;