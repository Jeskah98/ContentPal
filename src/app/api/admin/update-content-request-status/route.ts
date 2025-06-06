import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
const serviceAccount = require('../../../../../config/serviceAccountKey.json');

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
  });
}

const adminDb = getFirestore();

export async function POST(req: NextRequest) {
  try {
    // Verify Authorization Header
    const authorization = req.headers.get('Authorization');
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const idToken = authorization.split(' ')[1];

    // Verify ID Token and Admin Claim
    try {
      const decodedToken = await getAuth().verifyIdToken(idToken);
      if (!decodedToken.admin) {
        return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
      }
    } catch (error) {
      console.error('Error verifying ID token:', error);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and Validate Request Body
    const { requestId, newStatus } = await req.json();
    
    if (!requestId || typeof requestId !== 'string') {
      return NextResponse.json({ error: 'Invalid request ID' }, { status: 400 });
    }
    
    if (!newStatus || typeof newStatus !== 'string') {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    // Update Firestore Document
    const requestRef = adminDb.collection('contentRequests').doc(requestId);
    await requestRef.update({ status: newStatus });

    return NextResponse.json(
      { message: 'Content request status updated successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating content request status:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}