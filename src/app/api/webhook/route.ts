import { handleStripeWebhook } from '@/lib/stripe';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Pass the entire request object to the webhook handler
    const response = await handleStripeWebhook(req);

    // handleStripeWebhook is expected to return a Response object
    return response;

  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }
}