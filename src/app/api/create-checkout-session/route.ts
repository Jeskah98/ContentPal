import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY! as string, {
  apiVersion: '2025-04-30.basil',
});

const serviceAccount = require('../../../../config/serviceAccountKey.json'); // Use require to load the service account key

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
  })
} 

const adminDb = getFirestore();

export async function POST(request: Request) {
  try {
    const { userId, priceId } = await request.json();
    console.log(`Received request for checkout session creation: userId = ${userId}, priceId = ${priceId}`);

    // Fetch the user's Stripe Customer ID from Firestore
    const userRef = adminDb.collection('users').doc(userId);
    const userDoc = await userRef.get();
    const userData = userDoc.data();
    console.log('Fetched user data:', userData);

    if (!userData || !userData.stripeCustomerId) {
      return NextResponse.json({ message: 'Stripe customer ID not found for user' }, { status: 404 });
    }

    const stripeCustomerId = userData.stripeCustomerId;

    console.log('Creating Stripe checkout session with:', { customer: stripeCustomerId, price: priceId });
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/subscribe`,
    });


    return NextResponse.json({ ...session, stripeCustomerId: stripeCustomerId }, { status: 200 });
  } catch (error) {
    console.error('### CAUGHT ERROR ###', (error as Error).message);
    return NextResponse.json({ message: 'Error creating checkout session', error: (error as Error).message }, { status: 500 }); // Ensure error message is included in response
  }
}
