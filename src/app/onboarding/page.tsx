'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/lib/hooks'
import { completeOnboarding, updateProfile } from '@/lib/features/userSlice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowRight, ArrowLeft, CheckCircle, Briefcase } from 'lucide-react'

const careerInterests = [
  { id: 'technology', label: 'Technology & Software' },
  { id: 'business', label: 'Business & Management' },
  { id: 'design', label: 'Design & Creative' },
  { id: 'data', label: 'Data & Analytics' },
  { id: 'marketing', label: 'Marketing & Sales' },
  { id: 'healthcare', label: 'Healthcare' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    university: '',
    major: '',
    graduationYear: '',
    interests: [] as string[],
    experience: '',
    skills: '',
    goals: '',
  })

  const progress = (currentStep / 3) * 100
  const stepTitles = ['Academic Background', 'Career Interests', 'Skills & Experience']

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }))
  }

  const handleComplete = async () => {
    // Save user profile data to Redux
    const interestLabels = careerInterests
      .filter(interest => formData.interests.includes(interest.id))
      .map(interest => interest.label)

    // Determine role based on interests and goals
    let role = 'Career Explorer'
    if (formData.goals.toLowerCase().includes('product')) {
      role = 'Aspiring Product Manager'
    } else if (formData.goals.toLowerCase().includes('design') || formData.interests.includes('design')) {
      role = 'Aspiring UX Designer'
    } else if (formData.goals.toLowerCase().includes('data') || formData.interests.includes('data')) {
      role = 'Aspiring Data Analyst'
    } else if (formData.goals.toLowerCase().includes('software') || formData.interests.includes('technology')) {
      role = 'Aspiring Software Engineer'
    } else if (interestLabels.length > 0) {
      role = `Aspiring ${interestLabels[0]} Professional`
    }

    // Update user profile with onboarding data
    dispatch(updateProfile({
      role: role,
      // Store additional metadata for personalization
      education: `${formData.major} from ${formData.university}`,
      graduationYear: formData.graduationYear,
      interests: interestLabels,
      experience: formData.experience,
      skillsText: formData.skills,
      careerGoals: formData.goals,
      profileCompletion: 85, // Higher completion after onboarding
    } as any))

    // Get AI career recommendations
    try {
      const profile = {
        education: `${formData.major} from ${formData.university}`,
        skills: formData.skills,
        interests: formData.interests,
        experience: formData.experience,
        goals: formData.goals
      }

      // Call AI for career recommendations (non-blocking)
      fetch('/api/ai/career-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile })
      }).then(async (response) => {
        if (response.ok) {
          const data = await response.json()
          // Store recommendations in localStorage for dashboard
          localStorage.setItem('aiCareerRecommendations', JSON.stringify(data.recommendations))
        }
      }).catch(err => console.error('Career match error:', err))
    } catch (error) {
      console.error('Error:', error)
    }

    dispatch(completeOnboarding())
    router.push('/')
  }

  const handleSkip = () => {
    if (confirm('Are you sure you want to skip onboarding? You can always update your profile later.')) {
      dispatch(completeOnboarding())
      router.push('/')
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 sm:p-6 lg:p-8">
      {/* Background */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/10 to-transparent" />
      </div>

      <div className="w-full max-w-2xl animate-fade-in">
        {/* Header */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <Briefcase className="h-7 w-7 text-primary" />
            <h2 className="text-lg font-bold tracking-tight">Career Assistant</h2>
          </div>
          <Button variant="outline" onClick={handleSkip}>
            Skip for now
          </Button>
        </header>

        {/* Onboarding Card */}
        <Card>
          <CardHeader>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Step {currentStep} of 3
                </p>
                <p className="text-sm font-semibold text-primary">
                  {stepTitles[currentStep - 1]}
                </p>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>

            <div className="pt-6 text-center">
              <CardTitle className="text-3xl sm:text-4xl">Craft Your Future.</CardTitle>
              <CardDescription className="mt-2">
                Tell us a bit about yourself to get a personalized career roadmap in minutes.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            {/* Step 1: Academic Background */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="university">University</Label>
                  <Input
                    id="university"
                    placeholder="e.g., University of Technology"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="major">Major</Label>
                  <Input
                    id="major"
                    placeholder="e.g., Computer Science"
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                  <Input
                    id="graduationYear"
                    type="number"
                    placeholder="e.g., 2025"
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                  />
                </div>
                <div className="flex items-center justify-end pt-4">
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Career Interests */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base">What are your career interests?</Label>
                  <p className="text-sm text-muted-foreground mt-1">Select all that apply</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {careerInterests.map((interest) => (
                      <label
                        key={interest.id}
                        className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-accent transition-colors"
                      >
                        <Checkbox
                          checked={formData.interests.includes(interest.id)}
                          onCheckedChange={() => handleInterestToggle(interest.id)}
                        />
                        <span className="text-sm">{interest.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Skills & Experience */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="experience">Current Experience Level</Label>
                  <select
                    id="experience"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  >
                    <option value="">Select your experience level</option>
                    <option value="student">Student (No experience)</option>
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (3-5 years)</option>
                    <option value="senior">Senior (5+ years)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Key Skills</Label>
                  <p className="text-sm text-muted-foreground">
                    List your main skills (separated by commas)
                  </p>
                  <textarea
                    id="skills"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    rows={3}
                    placeholder="e.g., Python, JavaScript, Leadership, Communication"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goals">Career Goals</Label>
                  <p className="text-sm text-muted-foreground">
                    What do you want to achieve?
                  </p>
                  <textarea
                    id="goals"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    rows={3}
                    placeholder="e.g., Land a software engineering role at a tech company"
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  />
                </div>
                <div className="flex items-center justify-between pt-4">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleComplete}>
                    Get Started
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

