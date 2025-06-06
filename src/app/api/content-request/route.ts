import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

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
    // Get the ID token from the request headers
    const idToken = request.headers.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized - Missing token' }, { status: 401 });
    }

    // Verify the ID token
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(idToken);
    const userId = decodedToken.uid;

    const { 
      contentTopic, 
      targetPlatform, 
      tone, 
      contentType, 
      targetAudience, 
      keyMessage, 
      specificRequirements 
    } = await request.json();

    // Basic validation (optional but recommended)
    if (!contentTopic || !contentType) {
      return NextResponse.json({ message: 'Missing required fields (contentTopic or contentType)' }, { status: 400 });
    }

    // Store the content request data in Firestore
    const docRef = await adminDb.collection('contentRequests').add({ // Changed .doc(userId).set(...) to .add(...) to create a new request document
      contentTopic, 
      targetPlatform,
      tone,
      contentType, 
      targetAudience, 
      keyMessage, 
      specificRequirements,
      createdAt: new Date(), // Add a timestamp
      status: 'Pending', // Initial status, capital 'P' for consistency
      userId: userId, // Use the extracted user ID
    });

    return NextResponse.json({ message: 'Content request submitted successfully', id: docRef.id }, { status: 201 }); // 201 Created

  } catch (error) {
    console.error('Error submitting content request:', error);
    return NextResponse.json(
      { 
        message: 'Error submitting content request', 
        error: (error as Error).message 
      }, 
      { status: 500 }
    );
  }
}