import { NextResponse } from 'next/server';
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

export async function POST(request: Request) {
  try {
    const { userId, email } = await request.json();

    if (!userId || !email) {
      return NextResponse.json({ message: 'Missing userId or email' }, { status: 400 });
    }

    // Store the submitted email in a new collection or a subcollection under the user
    // For simplicity, we'll use a new collection 'paymentSubmissions' with doc ID as userId
    const submissionRef = adminDb.collection('paymentSubmissions').doc(userId);

    await submissionRef.set({
      submittedEmail: email,
      timestamp: new Date(),
    }, { merge: true }); // Use merge: true to update if document already exists

    return NextResponse.json({ message: 'Email submitted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error submitting payment email:', error);
    return NextResponse.json({ message: 'Error submitting payment email', error: (error as Error).message }, { status: 500 });
  }
}