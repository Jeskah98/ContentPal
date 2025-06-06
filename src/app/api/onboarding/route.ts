import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = require('../../../../config/serviceAccountKey.json'); // Use require to load the service account key

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
  });
}

const adminDb = getFirestore();

export async function POST(request: Request) {
  try {
    const onboardingData = await request.json();
    const userId = onboardingData.userId;

    if (!userId) {
      return NextResponse.json({ message: 'Missing userId' }, { status: 400 });
    }

    // Add document ID explicitly
    const submissionRef = adminDb.collection('onboardingSubmissions').doc(userId);
    
    // Only store necessary data (exclude userId since it's the doc ID)
    const { userId: _, ...submissionData } = onboardingData;
    
    await submissionRef.set({
      ...submissionData,
      createdAt: new Date()  // Add timestamp for tracking
    }, { merge: true });

    return NextResponse.json({ message: 'Onboarding data submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error submitting onboarding data:', error);
    return NextResponse.json({ message: 'Error submitting onboarding data', error: (error as Error).message }, { status: 500 });
  }
}