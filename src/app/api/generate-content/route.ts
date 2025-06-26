import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import OpenAI from 'openai';

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

export async function POST(request: Request) {
  const { prompt, userId } = await request.json()
  
  // Verify user subscription
  const user = await auth.getUser(userId)
  if (!user.customClaims?.activeSubscription) {
    return NextResponse.json(
      { error: 'Subscription required' },
      { status: 403 }
    )
  }

  // Call AI API
 const openai = new OpenAI({
 apiKey: process.env.OPENAI_API_KEY,
 });

 try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4o-mini', // Or another suitable model
    });
    const generatedContent = completion.choices[0].message.content;
 } catch (error) {
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
 }
  
  return NextResponse.json({ content: generatedContent })
}