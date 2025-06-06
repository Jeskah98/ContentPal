import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = require('../../../../../config/serviceAccountKey.json'); // Use require to load the service account key

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
  })
}
const adminDb = getFirestore();

export async function GET(req: Request) {
  try {
    // Get the ID token from the request headers
    const idToken = req.headers.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the ID token and check for admin claim
    const decodedToken = await getAuth().verifyIdToken(idToken);
    if (!decodedToken.admin) {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    // Fetch onboarding submissions using Admin SDK
    const submissionsSnapshot = await adminDb.collection('onboardingSubmissions').get();

    const submissions = submissionsSnapshot.docs.map(doc => {
      const submissionData = doc.data();
      return {
        id: doc.id, // The document ID is the user ID
        ...submissionData, // Include all other submission data
      };
    });

    return NextResponse.json(submissions, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching onboarding submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch onboarding submissions', details: error.message },
      { status: 500 }
    );
  }
}