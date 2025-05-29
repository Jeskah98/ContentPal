import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  console.log('API route reached');
  try {
    const data = await request.json();
    console.log('Received onboarding data:', data);

    // Save data to Firestore
    await addDoc(collection(db, 'onboarding_submissions'), data);

    return NextResponse.json({ message: 'Data saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error processing onboarding data:', error);
    return NextResponse.json({ message: 'Error processing data' }, { status: 500 });
  }
}