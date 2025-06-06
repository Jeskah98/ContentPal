import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe'; // Assuming stripe instance is exported from here
import { db } from '@/lib/firebase'; // Import Firestore db
import { doc, getDoc } from 'firebase/firestore'; // Import necessary Firestore functions

// Placeholder function to get the user's Stripe subscription ID from your database
// REPLACE THIS WITH YOUR ACTUAL DATABASE LOGIC
async function getUserSubscriptionId(userId: string): Promise<string | null> {
  const userDoc = await getDoc(doc(db, 'users', userId));
  return userDoc.exists() ? (userDoc.data()?.subscriptionId as string || null) : null;
}

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const subscriptionId = await getUserSubscriptionId(userId);

    if (!subscriptionId) {
      return NextResponse.json({ error: 'User does not have an active subscription' }, { status: 404 });
    }

    // Cancel the subscription in Stripe
    const cancelledSubscription = await stripe.subscriptions.cancel(subscriptionId);

    console.log(`Subscription cancelled for user ${userId}: ${cancelledSubscription.id}`);

    // Optional: Update your database to reflect the cancelled status
    // await updateUserSubscriptionStatusInDatabase(userId, 'cancelled');

    return NextResponse.json({ success: true, subscriptionId: cancelledSubscription.id });

  } catch (error: any) {
    console.error('Error canceling subscription:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}