import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Assuming your Firebase client initialization is here

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

    // Fetch users using Admin SDK
    const usersSnapshot = await adminDb.collection('users').get();
    
    // Fetch payment submissions
    const paymentSubmissionsSnapshot = await adminDb.collection('paymentSubmissions').get();
    const paymentSubmissionsMap: { [key: string]: any } = {};
    paymentSubmissionsSnapshot.docs.forEach(doc => {
      paymentSubmissionsMap[doc.id] = doc.data();
    });

    const users = usersSnapshot.docs.map(doc => {
      const userData = doc.data();
      const uid = doc.id;
      
      return {
        uid: uid,
        email: userData.email || null,
        dashboardAccess: userData.dashboardAccess ?? false, // Provide default if not present
        creatorToolsAccess: userData.creatorToolsAccess ?? false,
        isAdmin: userData.isAdmin || false,
        paymentSubmitted: !!paymentSubmissionsMap[uid], // Add payment submission status
        // Add other fields you need
      };
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users', details: error.message }, 
      { status: 500 }
    );
  }
}