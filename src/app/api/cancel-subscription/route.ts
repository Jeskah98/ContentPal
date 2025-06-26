import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe'; // Assuming stripe instance is exported from here
import { db } from '@/lib/firebase'; // Import Firestore db
import { doc, getDoc } from 'firebase/firestore'; // Import necessary Firestore functions
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Validate required environment variables
if (!process.env.FIREBASE_PROJECT_ID || 
  !process.env.FIREBASE_CLIENT_EMAIL || 
  !process.env.FIREBASE_PRIVATE_KEY) {
throw new Error('Missing Firebase environment variables');
}

// Fix the private key formatting
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  .replace(/\\n/g, '\n')  // Replace escaped newlines
  .replace(/"/g, '');     // Remove any quotes

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey
  }),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
};

// Initialize only if not already initialized
if (!getApps().length) {
  initializeApp(firebaseAdminConfig);
}

const adminDb = getFirestore();

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