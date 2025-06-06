import { NextResponse } from 'next/server'
import { auth } from '@/lib/firebase-admin'
import OpenAI from 'openai';
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