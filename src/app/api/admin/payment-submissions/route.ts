import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { auth } from 'firebase-admin'; // Import admin auth

const serviceAccount = require('../../../../config/serviceAccountKey.json'); // Use require to load the service account key

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
  });
}

const adminDb = getFirestore();

export async function GET(request: Request) {
  try {
    // Authenticate the request to ensure it's from an authorized admin
    const idToken = request.headers.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      return NextResponse.json({ message: 'Authorization token missing' }, { status: 401 });
    }

    let decodedToken;
    try {
      decodedToken = await auth().verifyIdToken(idToken);
      // You should also check if the user has an admin claim here
      // For example: if (!decodedToken.admin) { ... }
      // This requires setting a custom claim on admin users in Firebase Auth
    } catch (error) {
      console.error('Error verifying ID token:', error);
      return NextResponse.json({ message: 'Invalid authorization token' }, { status: 401 });
    }

    const paymentSubmissionsRef = adminDb.collection('paymentSubmissions');
    const snapshot = await paymentSubmissionsRef.get();

    const submissions: any[] = [];
    snapshot.forEach(doc => {
      submissions.push({
        id: doc.id, // The user ID
        ...doc.data()
      });
    });

    return NextResponse.json(submissions, { status: 200 });

  } catch (error) {
    console.error('Error fetching payment submissions:', error);
    return NextResponse.json({ message: 'Error fetching payment submissions', error: (error as Error).message }, { status: 500 });
  }
}