import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

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

export async function POST(req: NextRequest) {
  try {
    // Get the ID token from the request headers
    const idToken = req.headers.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the ID token and check for the admin custom claim
    const decodedToken = await getAuth().verifyIdToken(idToken);
    if (!decodedToken.admin) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const userDocRef = adminDb.collection('users').doc(uid);
    await userDocRef.update({ 
      dashboardAccess: true,
      adminGrantedAccess: true,
      grantTimestamp: new Date()
    });

    return NextResponse.json({ 
      message: 'Dashboard access granted successfully',
      uid
    }, { status: 200 });
  } catch (error) {
    console.error('Error granting dashboard access:', error);
    return NextResponse.json({ error: 'Failed to grant dashboard access' }, { status: 500 });
  }
}