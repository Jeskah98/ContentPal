// lib/stripe.ts
import Stripe from 'stripe'
import { auth } from './firebase'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
})

// Create customer portal session
export async function createPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account`,
  })
  return session.url
}

// Handle subscription creation
export async function createSubscription(
  userId: string,
  priceId: string
) {
  const user = await auth.currentUser
  if (!user) throw new Error('Not authenticated')

  const customer = await stripe.customers.create({
    email: user.email!,
    metadata: { firebaseUID: user.uid },
  })

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
  })

  return {
    subscriptionId: subscription.id,
    clientSecret: (subscription.latest_invoice as Stripe.Invoice)
      .payment_intent as Stripe.PaymentIntent
  }
}

export async function createCheckoutSession(userId: string, priceId: string) {
    const session = await stripe.checkout.sessions.create({
      customer: userId,
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1
      }],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`
    })
    return session.id
  }
  
// Webhook handler
export async function handleStripeWebhook(req: Request) {
  const sig = req.headers.get('stripe-signature')!
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!
  
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      await req.text(),
      sig,
      endpointSecret
    )
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // Handle subscription events
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      await handleCheckoutSession(session)
      break
    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription
      await updateUserSubscription(subscription)
      break
    // Add more event handlers
  }

  return new Response(JSON.stringify({ received: true }))
}