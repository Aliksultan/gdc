import { NextRequest, NextResponse } from 'next/server'
import { generateText } from '@/lib/ai/gemini'
import { PROMPTS } from '@/lib/ai/prompts'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userState, type } = body

    if (!userState || !type) {
      return NextResponse.json(
        { error: 'User state and type are required' },
        { status: 400 }
      )
    }

    let prompt: string
    
    switch (type) {
      case 'smart':
        prompt = PROMPTS.smartSuggestions(userState)
        break
      case 'courses':
        prompt = PROMPTS.courseRecommendations(userState, userState.careerGoal)
        break
      case 'skillGap':
        prompt = PROMPTS.skillGapAnalysis(userState.currentSkills, userState.targetRole)
        break
      default:
        return NextResponse.json(
          { error: 'Invalid suggestion type' },
          { status: 400 }
        )
    }

    const aiResponse = await generateText(prompt)
    
    // Parse JSON response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response')
    }
    
    const suggestions = JSON.parse(jsonMatch[0])

    return NextResponse.json({
      success: true,
      suggestions,
    })
  } catch (error) {
    console.error('Suggestions API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    )
  }
}

