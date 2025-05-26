import { NextResponse } from 'next/server'
import { auth } from '@/lib/firebase-admin'

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

  // Call AI API (e.g., OpenAI)
  const generatedContent = await generateAIContent(prompt)
  
  return NextResponse.json({ content: generatedContent })
}