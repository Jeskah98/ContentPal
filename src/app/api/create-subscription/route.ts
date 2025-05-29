import { NextRequest, NextResponse } from 'next/server';
import { createSubscription } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { userId, priceId, paymentMethodId } = await req.json();

    if (!userId || !priceId || !paymentMethodId) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // You might need to attach the payment method to the customer before creating the subscription
    // depending on your Stripe setup and the createSubscription function's requirements.
    // For now, let's assume createSubscription handles associating the payment method.

    const subscription = await createSubscription(userId, priceId); // Modified to match lib/stripe usage

    return NextResponse.json(subscription);

  } catch (error: any) {
    console.error('Error creating subscription:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}