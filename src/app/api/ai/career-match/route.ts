import { NextRequest, NextResponse } from 'next/server'
import { generateText } from '@/lib/ai/gemini'
import { PROMPTS } from '@/lib/ai/prompts'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { profile } = body

    if (!profile) {
      return NextResponse.json(
        { error: 'User profile is required' },
        { status: 400 }
      )
    }

    const prompt = PROMPTS.careerMatch(profile)
    const aiResponse = await generateText(prompt)
    
    // Parse JSON response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response')
    }
    
    const recommendations = JSON.parse(jsonMatch[0])

    return NextResponse.json({
      success: true,
      recommendations,
    })
  } catch (error) {
    console.error('Career Match API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    )
  }
}

