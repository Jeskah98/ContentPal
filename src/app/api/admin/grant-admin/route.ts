import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = require('../../../../../config/serviceAccountKey.json'); // Use require to load the service account key

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
  })
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

    // If authorized, proceed to set admin claim
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Set the custom claim
    await getAuth().setCustomUserClaims(uid, { admin: true });

    // Optionally, force a token refresh for the target user on their next login or page load
    // This is not strictly necessary for the claim to be set, but ensures they get the updated token sooner.
    // This would typically be handled on the frontend after the admin action.

    return NextResponse.json({ message: `Admin claim set for user ${uid}` }, { status: 200 });
  } catch (error) {
    console.error('Error setting admin claim:', error);
    return NextResponse.json({ error: 'Failed to set admin claim' }, { status: 500 });
  }
}