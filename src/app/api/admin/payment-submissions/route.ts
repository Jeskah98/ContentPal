import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { auth } from 'firebase-admin'; // Import admin auth

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