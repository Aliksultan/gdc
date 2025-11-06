'use client'

import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { toggleTask } from '@/lib/features/userSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FileText, Mic, Compass, GraduationCap, ArrowRight, Sparkles, TrendingUp, Target } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Dashboard() {
  const user = useAppSelector((state: any) => state.user)
  const dispatch = useAppDispatch()
  const [aiSuggestions, setAiSuggestions] = useState<any>(null)
  const [loadingAI, setLoadingAI] = useState(false)

  const handleToggleTask = (index: number) => {
    dispatch(toggleTask(index))
  }

  const getAIRecommendations = async () => {
    setLoadingAI(true)
    try {
      const completedTasks = user.developmentTasks.filter((t: any) => t.completed).length
      const userState = {
        profileCompletion: user.profileCompletion,
        developmentProgress: user.developmentProgress,
        completedTasks,
        role: user.role,
        recentActivity: 'Active',
        // Include personalized data from onboarding
        education: user.education,
        interests: user.interests,
        experience: user.experience,
        careerGoals: user.careerGoals,
        skills: user.skillsText
      }

      const response = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userState, type: 'smart' })
      })

      if (response.ok) {
        const data = await response.json()
        setAiSuggestions(data.suggestions)
      }
    } catch (error) {
      console.error('AI Suggestions Error:', error)
    } finally {
      setLoadingAI(false)
    }
  }

  useEffect(() => {
    // Auto-fetch AI suggestions on load
    getAIRecommendations()
  }, [])

  return (
    <div className="flex h-full grow flex-col">
      <div className="px-4 sm:px-8 md:px-10 flex flex-1 justify-center py-5 md:py-10">
        <div className="flex flex-col max-w-7xl flex-1 gap-8">
          {/* Page Heading */}
          <div className="flex flex-wrap justify-between gap-3 p-4 animate-fade-in">
            <div className="flex min-w-72 flex-col gap-2">
              <p className="text-3xl lg:text-4xl font-black leading-tight tracking-tight">
                Good morning, {user.name.split(' ')[0]}!
              </p>
              <p className="text-muted-foreground text-base font-normal leading-normal">
                Here's your personalized dashboard to kickstart your career.
              </p>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              {/* Profile Summary Card */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <CardDescription>{user.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">Profile Completion</p>
                      <p className="text-sm">{user.profileCompletion}%</p>
                    </div>
                    <Progress value={user.profileCompletion} className="h-2" />
                  </div>
                  
                  {/* Personalized Info from Onboarding */}
                  {user.interests && user.interests.length > 0 && (
                    <div className="space-y-2 pt-2 border-t">
                      <p className="text-xs font-medium text-muted-foreground">Interests</p>
                      <div className="flex flex-wrap gap-1">
                        {user.interests.slice(0, 3).map((interest: string, idx: number) => (
                          <span key={idx} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {user.careerGoals && (
                    <div className="space-y-1 pt-2 border-t">
                      <p className="text-xs font-medium text-muted-foreground">Career Goal</p>
                      <p className="text-sm line-clamp-2">{user.careerGoals}</p>
                    </div>
                  )}
                  
                  <Button className="w-full">Edit Profile</Button>
                </CardContent>
              </Card>

              {/* Suggested Courses */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-lg">Suggested Courses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.suggestedCourses.map((course: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-start gap-4">
                      <div className="flex flex-col">
                        <p className="font-semibold text-sm">{course.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {course.provider} • {course.duration}
                        </p>
                      </div>
                      <Link
                        href="#"
                        className="flex items-center gap-1 text-primary text-sm font-medium hover:underline"
                      >
                        View
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
                <Link href="/resume">
                  <Card className="cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-blue-500 to-primary text-primary-foreground border-0 h-full">
                    <CardContent className="p-6 space-y-2">
                      <FileText className="h-10 w-10" />
                      <p className="font-bold">Resume Builder</p>
                      <p className="text-sm opacity-90">Create your resume</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/interview">
                  <Card className="cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-purple-500 to-pink-500 text-primary-foreground border-0 h-full">
                    <CardContent className="p-6 space-y-2">
                      <Mic className="h-10 w-10" />
                      <p className="font-bold">Mock Interview</p>
                      <p className="text-sm opacity-90">Practice interviews</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/explore">
                  <Card className="cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-green-500 to-teal-500 text-primary-foreground border-0 h-full">
                    <CardContent className="p-6 space-y-2">
                      <Compass className="h-10 w-10" />
                      <p className="font-bold">Explore Careers</p>
                      <p className="text-sm opacity-90">Find your path</p>
                    </CardContent>
                  </Card>
                </Link>

                <Card className="cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-orange-500 to-red-500 text-primary-foreground border-0 h-full">
                  <CardContent className="p-6 space-y-2">
                    <GraduationCap className="h-10 w-10" />
                    <p className="font-bold">Learning Paths</p>
                    <p className="text-sm opacity-90">Browse courses</p>
                  </CardContent>
                </Card>
              </div>

              {/* AI Insights */}
              {aiSuggestions && (
                <Card className="animate-fade-in bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      AI Insights for You
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {aiSuggestions.motivationalMessage && (
                      <p className="text-sm font-medium text-primary">
                        {aiSuggestions.motivationalMessage}
                      </p>
                    )}
                    
                    {aiSuggestions.urgentActions && aiSuggestions.urgentActions.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold flex items-center gap-2">
                          <Target className="h-4 w-4 text-red-500" />
                          Priority Actions:
                        </p>
                        <ul className="text-sm space-y-1 list-disc pl-5 text-muted-foreground">
                          {aiSuggestions.urgentActions.map((action: string, i: number) => (
                            <li key={i}>{action}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {aiSuggestions.recommendedActions && (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-blue-500" />
                          Recommended Next Steps:
                        </p>
                        <ul className="text-sm space-y-1 list-disc pl-5 text-muted-foreground">
                          {aiSuggestions.recommendedActions.map((action: string, i: number) => (
                            <li key={i}>{action}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {aiSuggestions.weeklyGoal && (
                      <div className="p-3 bg-background rounded-lg">
                        <p className="text-xs font-medium text-muted-foreground mb-1">This Week's Goal:</p>
                        <p className="text-sm font-semibold">{aiSuggestions.weeklyGoal}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* My Development Plan */}
              <Card className="animate-fade-in">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg">My Development Plan</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={getAIRecommendations}
                    disabled={loadingAI}
                  >
                    {loadingAI ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">Overall Progress</p>
                      <p className="text-sm">{user.developmentProgress}%</p>
                    </div>
                    <Progress value={user.developmentProgress} className="h-2" />
                  </div>
                  <div className="space-y-3 mt-4">
                    {user.developmentTasks.map((task: any, idx: number) => (
                      <label
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer"
                      >
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => handleToggleTask(idx)}
                        />
                        <span
                          className={`text-sm ${
                            task.completed ? 'line-through opacity-60' : ''
                          }`}
                        >
                          {task.text}
                        </span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

