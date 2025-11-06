import { NextRequest, NextResponse } from 'next/server'
import { generateText } from '@/lib/ai/gemini'
import { getCareerRecommendationsPrompt } from '@/lib/ai/prompts'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { careerTitle, userSkills, userInterests } = body

    if (!careerTitle) {
      return NextResponse.json(
        { error: 'Career title is required' },
        { status: 400 }
      )
    }

    const prompt = getCareerRecommendationsPrompt(careerTitle, userSkills, userInterests)
    const aiResponse = await generateText(prompt)

    // Parse the AI response into structured data
    const recommendations = parseRecommendations(aiResponse)

    return NextResponse.json({
      success: true,
      recommendations
    })
  } catch (error) {
    console.error('Career Recommendations Error:', error)
    
    // Return fallback recommendations on error
    return NextResponse.json({
      success: false,
      recommendations: getFallbackRecommendations()
    })
  }
}

function parseRecommendations(aiResponse: string) {
  try {
    // Try to extract structured data from AI response
    const sections = {
      learningPaths: [] as string[],
      skillPriorities: [] as { skill: string; reason: string }[],
      nextSteps: [] as string[],
      similarRoles: [] as string[],
      industryInsights: ''
    }

    const lines = aiResponse.split('\n').filter(line => line.trim())
    
    let currentSection = ''
    
    lines.forEach(line => {
      const trimmed = line.trim()
      
      if (trimmed.toLowerCase().includes('learning path')) {
        currentSection = 'learningPaths'
      } else if (trimmed.toLowerCase().includes('skill') && trimmed.toLowerCase().includes('priorit')) {
        currentSection = 'skillPriorities'
      } else if (trimmed.toLowerCase().includes('next step')) {
        currentSection = 'nextSteps'
      } else if (trimmed.toLowerCase().includes('similar role')) {
        currentSection = 'similarRoles'
      } else if (trimmed.toLowerCase().includes('industry insight')) {
        currentSection = 'industryInsights'
      } else if (trimmed.startsWith('-') || trimmed.startsWith('•') || /^\d+\./.test(trimmed)) {
        const content = trimmed.replace(/^[-•\d.]\s*/, '').trim()
        
        if (currentSection === 'learningPaths') {
          sections.learningPaths.push(content)
        } else if (currentSection === 'skillPriorities') {
          const parts = content.split(':')
          if (parts.length >= 2) {
            sections.skillPriorities.push({
              skill: parts[0].trim(),
              reason: parts.slice(1).join(':').trim()
            })
          } else {
            sections.skillPriorities.push({
              skill: content,
              reason: 'Essential for career growth'
            })
          }
        } else if (currentSection === 'nextSteps') {
          sections.nextSteps.push(content)
        } else if (currentSection === 'similarRoles') {
          sections.similarRoles.push(content)
        }
      } else if (currentSection === 'industryInsights' && trimmed.length > 20) {
        sections.industryInsights += trimmed + ' '
      }
    })

    return {
      ...sections,
      industryInsights: sections.industryInsights.trim() || 'The market demand for this role continues to grow with technological advancement.'
    }
  } catch (error) {
    console.error('Parse error:', error)
    return getFallbackRecommendations()
  }
}

function getFallbackRecommendations() {
  return {
    learningPaths: [
      'Complete an industry-recognized certification program',
      'Build a portfolio of relevant projects',
      'Attend workshops and networking events'
    ],
    skillPriorities: [
      { skill: 'Communication', reason: 'Essential for cross-functional collaboration' },
      { skill: 'Problem Solving', reason: 'Key to handling complex challenges' },
      { skill: 'Industry Knowledge', reason: 'Demonstrates expertise and commitment' }
    ],
    nextSteps: [
      'Research companies in your target industry',
      'Connect with professionals on LinkedIn',
      'Update your resume with quantifiable achievements'
    ],
    similarRoles: [
      'Related role in adjacent field',
      'Specialized position in the same industry',
      'Leadership role with similar responsibilities'
    ],
    industryInsights: 'The market for this role remains strong with growing opportunities in various sectors.'
  }
}

