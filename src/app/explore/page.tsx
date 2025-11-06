'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAppSelector } from '@/lib/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion'
import { ChevronRight, CheckCircle, Plus, Sparkles, BookOpen, TrendingUp, Users } from 'lucide-react'

const skills = [
  { name: 'Product Strategy', owned: true },
  { name: 'User Research', owned: false },
  { name: 'Agile Methodologies', owned: true },
  { name: 'Communication', owned: true },
  { name: 'Data Analysis', owned: false },
  { name: 'Roadmapping', owned: false },
  { name: 'Leadership', owned: true },
  { name: 'Technical Literacy', owned: false },
]

const careerProgression = [
  { title: 'Associate PM', duration: '0-2 years' },
  { title: 'Product Manager', duration: '2-5 years' },
  { title: 'Senior PM', duration: '5-8 years' },
  { title: 'Director of Product', duration: '8+ years' },
]

export default function ExplorePage() {
  const user = useAppSelector((state: any) => state.user)
  const [aiRecommendations, setAiRecommendations] = useState<any>(null)
  const [loadingAI, setLoadingAI] = useState(false)

  const getAIRecommendations = async () => {
    setLoadingAI(true)
    try {
      const ownedSkills = skills.filter(s => s.owned).map(s => s.name)
      
      // Use personalized data from user profile
      const careerTitle = user.role ? user.role.replace('Aspiring ', '') : 'Product Manager'
      const userInterests = user.interests && user.interests.length > 0 
        ? user.interests 
        : ['Technology', 'Strategy', 'Leadership']
      
      const response = await fetch('/api/ai/career-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          careerTitle,
          userSkills: ownedSkills,
          userInterests
        })
      })

      if (response.ok) {
        const data = await response.json()
        setAiRecommendations(data.recommendations)
      }
    } catch (error) {
      console.error('AI Recommendations Error:', error)
    } finally {
      setLoadingAI(false)
    }
  }

  useEffect(() => {
    getAIRecommendations()
  }, [])

  // Dynamic career title based on user's role
  const careerTitle = user.role ? user.role.replace('Aspiring ', '') : 'Product Manager'
  
  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
      <div className="flex flex-col gap-8">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-primary">
            Dashboard
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground font-medium">{careerTitle}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-black leading-tight tracking-tight">
              {careerTitle}
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl">
              Product Managers guide a product's success and lead the cross-functional team that improves it. 
              It is a key organizational role that sets the strategy, roadmap, and feature definition for a product or product line.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button
              variant="outline"
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
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add to My Plan
            </Button>
          </div>
        </div>

        {/* AI Recommendations */}
        {aiRecommendations && (
          <div className="grid gap-4 md:grid-cols-2">
            {/* Learning Paths */}
            <Card className="animate-fade-in bg-gradient-to-br from-primary/5 to-blue-500/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Recommended Learning Paths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {aiRecommendations.learningPaths?.slice(0, 3).map((path: string, idx: number) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{path}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Skill Priorities */}
            <Card className="animate-fade-in bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Priority Skills to Develop
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {aiRecommendations.skillPriorities?.slice(0, 3).map((item: any, idx: number) => (
                    <li key={idx} className="text-sm">
                      <div className="font-semibold text-foreground">{item.skill}</div>
                      <div className="text-muted-foreground text-xs">{item.reason}</div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="animate-fade-in bg-gradient-to-br from-primary/5 to-green-500/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Next Steps This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {aiRecommendations.nextSteps?.slice(0, 3).map((step: string, idx: number) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Similar Roles */}
            <Card className="animate-fade-in bg-gradient-to-br from-primary/5 to-orange-500/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Similar Career Paths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {aiRecommendations.similarRoles?.slice(0, 3).map((role: string, idx: number) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Industry Insights */}
        {aiRecommendations?.industryInsights && (
          <Card className="animate-fade-in bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <TrendingUp className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-2">Industry Insights</h3>
                  <p className="text-sm text-muted-foreground">
                    {aiRecommendations.industryInsights}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Accordion Sections */}
        <Accordion type="multiple" defaultValue={["responsibilities", "skills"]} className="space-y-4">
          {/* Key Responsibilities */}
          <AccordionItem value="responsibilities" className="border rounded-xl bg-card px-5">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <p className="text-base font-semibold">Key Responsibilities</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                A Product Manager's daily tasks involve a blend of strategic planning, market research, 
                and team collaboration. Key responsibilities include:
              </p>
              <ul className="space-y-2 pl-5 list-disc">
                <li>Defining the product vision, strategy, and roadmap.</li>
                <li>Gathering and prioritizing product and customer requirements.</li>
                <li>
                  Working closely with engineering, sales, marketing, and support to ensure revenue 
                  and customer satisfaction goals are met.
                </li>
                <li>Defining the 'why', 'what,' and 'when' of the product that the engineering team builds.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Required Skills */}
          <AccordionItem value="skills" className="border rounded-xl bg-card px-5">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <p className="text-base font-semibold">Required Skills</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full px-3 transition-transform hover:scale-105 ${
                      skill.owned
                        ? 'bg-primary/20 dark:bg-primary/30'
                        : 'border border-border hover:bg-accent'
                    }`}
                  >
                    {skill.owned && <CheckCircle className="h-3 w-3 text-green-500" />}
                    <p className="text-sm font-medium">{skill.name}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Average Salary Range */}
          <AccordionItem value="salary" className="border rounded-xl bg-card px-5">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">$</span>
                </div>
                <p className="text-base font-semibold">Average Salary Range</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-sm text-muted-foreground pt-2">
              <p>
                Salaries for Product Managers vary based on experience, location, and company size. 
                The typical range in the US is shown below.
              </p>
              <div className="w-full">
                <div className="relative h-2 w-full rounded-full bg-secondary">
                  <div 
                    className="absolute h-2 rounded-full bg-gradient-to-r from-primary/40 to-primary" 
                    style={{ left: '15%', width: '60%' }}
                  />
                </div>
                <div className="relative mt-3 grid grid-cols-3 text-xs">
                  <div className="text-left">
                    <div className="text-muted-foreground">Entry-Level</div>
                    <div className="font-bold text-foreground">$90k</div>
                  </div>
                  <div className="text-center">
                    <div className="text-muted-foreground">Average</div>
                    <div className="font-bold text-foreground">$125k</div>
                  </div>
                  <div className="text-right">
                    <div className="text-muted-foreground">Senior</div>
                    <div className="font-bold text-foreground">$170k+</div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Career Progression */}
          <AccordionItem value="progression" className="border rounded-xl bg-card px-5">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary">→</span>
                </div>
                <p className="text-base font-semibold">Career Progression</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="relative flex flex-col sm:flex-row justify-between gap-8 pb-2">
                {/* Connection Line */}
                <div className="absolute left-[1.125rem] top-4 bottom-4 w-0.5 bg-border sm:top-4 sm:left-4 sm:right-4 sm:w-auto sm:h-0.5" />
                
                {careerProgression.map((step, idx) => (
                  <div 
                    key={idx} 
                    className={`relative flex items-center gap-4 sm:flex-col sm:gap-2 ${
                      idx === 0 ? 'sm:items-start' : 
                      idx === careerProgression.length - 1 ? 'sm:items-end' : 
                      'sm:items-center'
                    }`}
                  >
                    <div className="z-10 flex h-9 w-9 items-center justify-center rounded-full bg-primary ring-4 ring-background">
                      <span className="text-primary-foreground font-bold text-sm">{idx + 1}</span>
                    </div>
                    <div className={idx === careerProgression.length - 1 ? 'sm:text-right' : idx === 0 ? '' : 'sm:text-center'}>
                      <p className="font-semibold text-foreground text-sm">{step.title}</p>
                      <p className="text-xs text-muted-foreground">{step.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  )
}

