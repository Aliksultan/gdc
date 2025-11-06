export const PROMPTS = {
  // Resume Analysis
  resumeFeedback: (resumeContent: string) => `
Analyze this resume and provide detailed, actionable feedback:

Resume Content:
${resumeContent}

Provide feedback in the following JSON format:
{
  "overallScore": <number 0-100>,
  "strengths": [<array of 3-5 specific strengths>],
  "improvements": [<array of 3-5 specific improvements>],
  "atsScore": <number 0-100>,
  "keywordSuggestions": [<array of 5-8 relevant keywords>],
  "sections": {
    "summary": {"score": <0-100>, "feedback": "<specific feedback>"},
    "experience": {"score": <0-100>, "feedback": "<specific feedback>"},
    "skills": {"score": <0-100>, "feedback": "<specific feedback>"}
  }
}

Be specific, actionable, and constructive.`,

  // Interview Analysis
  interviewFeedback: (question: string, answer: string) => `
Analyze this interview answer using the STAR method (Situation, Task, Action, Result):

Question: ${question}
Answer: ${answer}

Provide feedback in JSON format:
{
  "clarityScore": <number 0-100>,
  "relevanceScore": <number 0-100>,
  "starMethodScore": <number 0-100>,
  "overallScore": <number 0-100>,
  "strengths": [<array of 3-4 specific strengths>],
  "improvements": [<array of 3-4 specific improvements>],
  "starAnalysis": {
    "situation": {"present": <boolean>, "feedback": "<feedback>"},
    "task": {"present": <boolean>, "feedback": "<feedback>"},
    "action": {"present": <boolean>, "feedback": "<feedback>"},
    "result": {"present": <boolean>, "feedback": "<feedback>"}
  },
  "suggestedAnswer": "<brief example of a strong answer>"
}

Be encouraging but honest. Focus on actionable improvements.`,

  // Career Matching
  careerMatch: (profile: any) => `
Based on this profile, recommend the best career paths:

Profile:
- Education: ${profile.education || 'Not specified'}
- Skills: ${profile.skills || 'Not specified'}
- Interests: ${profile.interests?.join(', ') || 'Not specified'}
- Experience: ${profile.experience || 'Not specified'}
- Goals: ${profile.goals || 'Not specified'}

Provide recommendations in JSON format:
{
  "topCareers": [
    {
      "title": "<career title>",
      "matchScore": <number 0-100>,
      "reasoning": "<why this is a good fit>",
      "skillGaps": [<array of skills to develop>],
      "nextSteps": [<array of 3-4 actionable steps>],
      "salaryRange": "<estimated range>",
      "growthPotential": "<high/medium/low>"
    }
  ],
  "learningPath": [<array of 4-6 courses/certifications to pursue>],
  "timeline": "<realistic timeline to career transition>"
}

Recommend 3-5 careers. Be realistic and specific.`,

  // Course Recommendations
  courseRecommendations: (userProfile: any, careerGoal: string) => `
Recommend personalized courses for this user:

User Profile:
- Current Skills: ${userProfile.skills || 'Beginner'}
- Career Goal: ${careerGoal}
- Experience Level: ${userProfile.experience || 'Entry Level'}
- Interests: ${userProfile.interests?.join(', ') || 'Various'}

Provide recommendations in JSON format:
{
  "courses": [
    {
      "title": "<course name>",
      "provider": "<platform name>",
      "duration": "<time needed>",
      "difficulty": "<beginner/intermediate/advanced>",
      "relevance": <number 0-100>,
      "skills": [<array of skills learned>],
      "why": "<why this course is recommended>"
    }
  ]
}

Recommend 5-8 courses from popular platforms (Coursera, Udemy, edX, etc.).`,

  // Smart Suggestions
  smartSuggestions: (userState: any) => `
Based on this user's current state, provide smart next actions:

User State:
- Profile Completion: ${userState.profileCompletion}%
- Development Progress: ${userState.developmentProgress}%
- Completed Tasks: ${userState.completedTasks}
- Career Goal: ${userState.role}
- Recent Activity: ${userState.recentActivity || 'None'}

Provide suggestions in JSON format:
{
  "urgentActions": [<array of 2-3 high-priority actions>],
  "recommendedActions": [<array of 3-4 helpful actions>],
  "motivationalMessage": "<encouraging message>",
  "weeklyGoal": "<achievable goal for this week>",
  "insights": "<personalized insight based on progress>"
}

Be encouraging and specific.`,

  // Skill Gap Analysis
  skillGapAnalysis: (currentSkills: string[], targetRole: string) => `
Analyze skill gaps for career transition:

Current Skills: ${currentSkills.join(', ')}
Target Role: ${targetRole}

Provide analysis in JSON format:
{
  "existingStrengths": [<array of relevant current skills>],
  "criticalGaps": [<array of must-have skills missing>],
  "niceToHaveGaps": [<array of beneficial skills missing>],
  "learningPriority": [
    {
      "skill": "<skill name>",
      "priority": "<high/medium/low>",
      "timeToLearn": "<estimated time>",
      "resources": [<array of 2-3 learning resources>]
    }
  ],
  "readinessScore": <number 0-100>
}

Be realistic about timelines and priorities.`,
}

// Export individual prompt functions
export const getCareerRecommendationsPrompt = (
  careerTitle: string,
  userSkills?: string[],
  userInterests?: string[]
) => `
Provide personalized career development recommendations for someone interested in becoming a ${careerTitle}.

${userSkills && userSkills.length > 0 ? `Current Skills: ${userSkills.join(', ')}` : ''}
${userInterests && userInterests.length > 0 ? `Interests: ${userInterests.join(', ')}` : ''}

Please provide:

1. LEARNING PATHS (3-5 items):
   - Specific courses, certifications, or educational paths
   - Focus on practical, actionable learning opportunities

2. SKILL PRIORITIES (3-4 items):
   Format each as "Skill Name: Why it's important"
   - Prioritize skills most valuable for this career
   - Explain the business value of each skill

3. NEXT STEPS (3-5 items):
   - Immediate actions they can take this week
   - Be specific and actionable

4. SIMILAR ROLES (3-4 items):
   - Related careers to consider
   - Alternative paths with transferable skills

5. INDUSTRY INSIGHTS:
   - 2-3 sentences about current market trends
   - Hiring outlook and demand for this role

Format your response with clear section headers. Use bullet points (-) for lists.
Be encouraging, specific, and practical.
`

