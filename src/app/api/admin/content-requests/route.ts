import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
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

    // Fetch content requests using Admin SDK
    const requestsSnapshot = await adminDb.collection('contentRequests').get();

    const contentRequests = requestsSnapshot.docs.map(doc => {
      const requestData = doc.data();
      return {
        id: doc.id, // The document ID is the user ID who made the request
        ...requestData, // Include all other request data
      };
    });

    return NextResponse.json(contentRequests, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching content requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content requests', details: error.message },
      { status: 500 }
    );
  }
}