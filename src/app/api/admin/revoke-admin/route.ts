import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
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
    // Admin authorization check
    const idToken = req.headers.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await getAuth().verifyIdToken(idToken);
    if (!decodedToken.admin) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Get userId from request body
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Revoke the admin claim by setting custom claims to null or an empty object
    // Setting to null removes the customClaims field
    await getAuth().setCustomUserClaims(uid, null);

    // Optionally, force a token refresh for the target user

    return NextResponse.json({ message: `Admin claim revoked for user ${uid}` }, { status: 200 });
  } catch (error) {
    console.error('Error revoking admin claim:', error);
    return NextResponse.json({ error: 'Failed to revoke admin claim' }, { status: 500 });
  }
}
