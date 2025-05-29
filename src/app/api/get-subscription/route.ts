// src/app/api/get-subscription/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

import { db } from '@/lib/firebase'; // Import Firestore db
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

// Placeholder function - replace with your database logic
async function getUserStripeCustomerId(userId: string): Promise<string | null> {
  const userDocRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userDocRef);

  return userDoc.data()?.stripeCustomerId || null;
}
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const stripeCustomerId = await getUserStripeCustomerId(userId);

    if (!stripeCustomerId) {
      // User not found in your database or no Stripe customer ID linked
      return NextResponse.json(null, { status: 200 });
    }

    // Fetch subscriptions for the customer from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      limit: 1, // Assuming you only care about the latest subscription
    });

    if (subscriptions.data.length === 0) {
      // No active subscriptions for this customer
      return NextResponse.json(null, { status: 200 });
    }

    const latestSubscription = subscriptions.data[0];

    // You might want to return more details, but status is a good start
    const subscriptionData = {
      id: latestSubscription.id,
      status: latestSubscription.status,
      currentPeriodEnd: latestSubscription.current_period_end,
      // Add other relevant fields
    };

    return NextResponse.json(subscriptionData, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}