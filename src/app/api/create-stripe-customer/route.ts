import { NextResponse } from 'next/server';
import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import Stripe from 'stripe';

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
 
// Initialize Stripe SDK
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-04-30.basil', // Use your desired Stripe API version
});

export async function POST(request: Request) {
 console.log('API route /api/create-stripe-customer reached');

    const body = await request.json();
    console.log('Request body:', body);

    const { uid: userId, email, name } = body;
    if (!userId || !email || !name) {
 return NextResponse.json({ message: 'Missing userId, email, or name' }, { status: 400 });
    }

    console.log('Received userId, email, and name:', { userId, email, name });

 let customer;
 try {
 // Create a new customer in Stripe
 console.log('Attempting Stripe customer creation');
 customer = await stripe.customers.create({
 email: email,
 metadata: {
 firebaseUID: userId,
 name: name,
 },
 });
 console.log('Stripe customer created:', customer.id);
 } catch (error: any) {
 console.error('Error creating Stripe customer:', error);
 return NextResponse.json({ message: 'Failed to create Stripe customer', error: error.message }, { status: 500 });
 }

 try {
    // Store the Stripe customer ID in Firestore, linked to the user
    // Assuming you have a 'users' collection where you store user data
    console.log('Attempting to get user document with ID:', userId);
    console.log('Before Firestore update');
    const userRef = adminDb.collection('users').doc(userId);
    console.log('Attempting to set user document with data:', { stripeCustomerId: customer.id });
    await userRef.set({
 stripeCustomerId: customer.id,
 // Add other user data as needed
    }, { merge: true }); // Use merge: true to avoid overwriting existing user data
 console.log('Firestore document updated for user:', userId);
 } catch (error: any) {
 console.error('Error updating user document in Firestore:', error);
 return NextResponse.json({ message: 'Failed to update user document in Firestore', error: error.message }, { status: 500 });
 }

    return NextResponse.json({ stripeCustomerId: customer.id }, { status: 200 });
}