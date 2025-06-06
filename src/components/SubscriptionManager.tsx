'use client'
import { useAuth } from '@/context/AuthContext'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import React, { useState, useEffect } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

const CheckoutForm = ({ priceId }: { priceId: string }) => {
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!stripe || !elements || !user) return

    const { error, paymentMethod } = await stripe.createPaymentMethod({
 'type': 'card',
 'card': elements.getElement(CardElement)!
    })

    if (error) {
      setError(error.message || 'An unknown error occurred with payment method creation.');
      console.error(error)
      setIsSubmitting(false);
      return
    }

    const response = await fetch('/api/create-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.uid,
        priceId,
        paymentMethodId: paymentMethod.id
      })
    })

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.message || 'Failed to create subscription on the server.');
      console.error('Failed to create subscription:', response.status, response.statusText, errorData);
      setIsSubmitting(false);
      return;
    }

    const { subscription, clientSecret, message } = await response.json();

 if (message) { // Handle potential success messages from backend
      console.log(message);
    }

    if (subscription.status === 'requires_action') {
      const { error: confirmationError } = await stripe.confirmCardPayment(clientSecret)
      if (confirmationError) {
        setError(confirmationError.message || 'An unknown error occurred during payment confirmation.');
        console.error(confirmationError)
        setIsSubmitting(false);
        return
      }
    }
    // Handle successful subscription (e.g., update UI, redirect)
    console.log('Subscription successful:', subscription)
    // You might want to trigger a refresh of the subscription status in the parent component
    // or redirect the user.
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit}>
 {error && <div style={{ color: 'red' }}>{error}</div>}
      <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      <button type="submit" disabled={!stripe || isSubmitting}>
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  )
}

export default function SubscriptionManager({ priceId }: { priceId: string }) {
  const { user, loading: authLoading } = useAuth();
  const [subscription, setSubscription] = useState<{ status: string } | null>(null);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [isCanceling, setIsCanceling] = useState(false);

  useEffect(() => {
    const fetchSubscription = async () => {
      setIsLoadingSubscription(true);
      if (user) {
        try {
          const res = await fetch(`/api/get-subscription?userId=${user.uid}`);
          if (!res.ok) {
            const errorData = await res.json();
            console.error('Failed to fetch subscription:', res.status, res.statusText, errorData);
            setSubscription(null); // Treat as no subscription found on error
          } else {
            const data = await res.json();
            setSubscription(data.subscription); // Assuming your API returns { subscription: ... }
          }
        } catch (error) {
          console.error('Error fetching subscription:', error);
          setSubscription(null); // Treat as no subscription found on error
        } finally {
          setIsLoadingSubscription(false);
        }
      } else {
        setIsLoadingSubscription(false);
        setSubscription(null); // No user means no subscription to fetch
      }
    };

    // Only fetch if user is not null and auth is not loading
    if (!authLoading && user) {
      fetchSubscription();
    }

    // Reset subscription state when auth loading or user changes to null
    if (authLoading || !user) {
      setSubscription(null);
      setIsLoadingSubscription(authLoading); // Indicate loading while auth is loading
    }

  }, [user, authLoading]); // Depend on user and authLoading

  const handleCancelSubscription = async () => {
    if (!user || isCanceling) {
      console.error("User not authenticated or cancellation in progress.");
      return;
    }

    setIsCanceling(true);
    setCancelError(null); // Clear previous errors
    try {
      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid }),
      });

      if (response.ok) {
        console.log('Subscription cancellation initiated.');
        // Optionally update UI or refetch subscription status
      } else {
        console.error('Failed to initiate subscription cancellation:', response.statusText);
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
    }
  }

  return (
    <div>
      <h2>Subscription Manager</h2>
      {subscription ? (
        <div>
          <p>Current Status: {subscription.status}</p>
          <button onClick={handleCancelSubscription}>Cancel Subscription</button>
        </div>
      ) : (
        <Elements stripe={stripePromise}>
          {/* In a real app, you'd pass the correct priceId based on the plan */}
          <CheckoutForm priceId={priceId} /> {/* Replace with actual price ID */}
        </Elements>
      )}
    </div>
  )
}