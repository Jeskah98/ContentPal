// lib/stripe.ts
import Stripe from 'stripe'
import { auth, db, firebaseAdmin } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'

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

  // Save the Stripe customer ID to Firestore
  await setDoc(doc(db, 'users', userId), {
    stripeCustomerId: customer.id,
  }, { merge: true }); // Use merge: true to avoid overwriting other user data

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
 // Find or create a Stripe customer for the user
 customer: userId, // Assuming userId is the Stripe customer ID
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
    case 'customer.subscription.created':
      const createdSubscription = event.data.object as Stripe.Subscription;
      console.log(`Subscription created: ${createdSubscription.id}`);
      await updateUserSubscription(createdSubscription);
      break;
    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription
      // Update the user's subscription status in your database
 await updateUserSubscription(subscription);
      break;
    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object as Stripe.Subscription
      // Handle subscription cancellation in your database
 await handleSubscriptionDeleted(deletedSubscription);
      break
    // Add more event handlers
  }

  return new Response(JSON.stringify({ received: true }))
}

// Helper function to handle completed checkout sessions
async function handleCheckoutSession(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  console.log(`Checkout session completed for customer ${customerId}, subscription ${subscriptionId}`);

  // Find the user in your database using the stripeCustomerId and update their record
  // Note: This assumes you have a way to find a user based on their stripeCustomerId.
  // A common approach is to query the 'users' collection for a document with a matching stripeCustomerId.
  // For this example, we'll assume you can directly use the customerId to find the user document.
  // You might need to adjust this based on how you store the stripeCustomerId.
  await setDoc(doc(db, 'users', customerId), { // Assuming customerId is the user's doc ID
    stripeSubscriptionId: subscriptionId,
    stripeSubscriptionStatus: 'active', // Or the status from the session object if available
  }, { merge: true });
}

// Helper function to update user subscription details in your database
async function updateUserSubscription(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const status = subscription.status;
  const currentPeriodEnd = subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null;

  // Find the user in your database using the customerId
  // Update the user's subscription status and end date
  console.log(`Subscription updated for customer ${customerId}: status ${status}, ends ${currentPeriodEnd}`);

  // Update the user's document with the latest subscription status and end date
  await setDoc(doc(db, 'users', customerId), { // Assuming customerId is the user's doc ID
    stripeSubscriptionStatus: status,
    stripeSubscriptionPeriodEnd: currentPeriodEnd,
  }, { merge: true });
}

// Helper function to handle deleted subscriptions
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  // Mark the user's subscription as cancelled
  console.log(`Subscription deleted for customer ${customerId}`);
  // Update the user's document to mark the subscription as cancelled
  await setDoc(doc(db, 'users', customerId), { // Assuming customerId is the user's doc ID
    stripeSubscriptionStatus: 'cancelled',
  }, { merge: true });
}
