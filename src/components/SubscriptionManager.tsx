'use client'
import { useAuth } from '@/context/AuthContext'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const CheckoutForm = ({ priceId }: { priceId: string }) => {
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useAuth()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!stripe || !elements || !user) return

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)!
    })

    if (error) {
      console.error(error)
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

    const subscription = await response.json()
    // Handle subscription result
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Subscribe
      </button>
    </form>
  )
}

export default function SubscriptionManager({ priceId }: { priceId: string }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm priceId={priceId} />
    </Elements>
  )
}