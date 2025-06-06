import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

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