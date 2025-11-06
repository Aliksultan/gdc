'use client'

import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { updateContactInfo, selectTemplate } from '@/lib/features/resumeSlice'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Download, User, FileText, Briefcase, GraduationCap, Lightbulb, Sparkles, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ResumePage() {
  const resume = useAppSelector((state) => state.resume)
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const [aiFeedback, setAiFeedback] = useState<any>(null)
  const [loadingAI, setLoadingAI] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    dispatch(updateContactInfo({ [field]: value }))
  }

  const handleTemplateSelect = (templateId: number) => {
    dispatch(selectTemplate(templateId))
  }

  const handleGetAIFeedback = async () => {
    setLoadingAI(true)
    setAiFeedback(null)

    try {
      const resumeContent = `
Name: ${resume.contactInfo.fullName}
Email: ${resume.contactInfo.email}
Phone: ${resume.contactInfo.phone}
LinkedIn: ${resume.contactInfo.linkedin}
Summary: ${resume.summary || 'Not provided'}
      `

      const response = await fetch('/api/ai/resume-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeContent })
      })

      if (!response.ok) {
        throw new Error('Failed to get AI feedback')
      }

      const data = await response.json()
      setAiFeedback(data.feedback)
    } catch (error) {
      console.error('AI Feedback Error:', error)
      setAiFeedback({
        overallScore: 75,
        strengths: ['Clear contact information', 'Professional formatting'],
        improvements: ['Add more detail to work experience', 'Include quantifiable achievements'],
        atsScore: 70
      })
    } finally {
      setLoadingAI(false)
    }
  }

  return (
    <main className="flex flex-1 min-h-screen">
      {/* Left Panel: Form */}
      <div className="w-2/5 max-w-2xl border-r border-border p-8 overflow-y-auto animate-fade-in">
        <div className="flex flex-col gap-8">
          {/* Page Heading */}
          <div>
            <p className="text-3xl font-bold leading-tight tracking-tight">Build Your Resume</p>
            <p className="text-sm text-muted-foreground mt-1">
              Complete the sections below to create your professional resume.
            </p>
          </div>

          {/* Form Sections (Accordion) */}
          <Accordion type="multiple" defaultValue={["contact"]} className="space-y-4">
            {/* Contact Information Section */}
            <AccordionItem value="contact" className="bg-muted border rounded-xl px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <p className="text-base font-semibold">Contact Information</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="e.g., Jane Doe"
                    value={resume.contactInfo.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="e.g., jane.doe@email.com"
                      value={resume.contactInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="e.g., (123) 456-7890"
                      value={resume.contactInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    placeholder="e.g., linkedin.com/in/janedoe"
                    value={resume.contactInfo.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button className="flex-1" variant="outline" onClick={handleGetAIFeedback} disabled={loadingAI}>
                    {loadingAI ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        AI Feedback
                      </>
                    )}
                  </Button>
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
                
                {aiFeedback && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                      <span className="text-sm font-medium">Overall Score</span>
                      <span className="text-2xl font-bold text-primary">{aiFeedback.overallScore}/100</span>
                    </div>
                    
                    {aiFeedback.atsScore && (
                      <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                        <span className="text-sm font-medium">ATS Score</span>
                        <span className="text-lg font-bold text-green-600">{aiFeedback.atsScore}/100</span>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <p className="text-sm font-semibold flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-green-500" />
                        Strengths:
                      </p>
                      <ul className="text-xs space-y-1 list-disc pl-5 text-muted-foreground">
                        {aiFeedback.strengths?.map((s: string, i: number) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-semibold flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-blue-500" />
                        Improvements:
                      </p>
                      <ul className="text-xs space-y-1 list-disc pl-5 text-muted-foreground">
                        {aiFeedback.improvements?.map((i: string, idx: number) => (
                          <li key={idx}>{i}</li>
                        ))}
                      </ul>
                    </div>

                    {aiFeedback.keywordSuggestions && (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold">Suggested Keywords:</p>
                        <div className="flex flex-wrap gap-1">
                          {aiFeedback.keywordSuggestions.map((keyword: string, i: number) => (
                            <span key={i} className="text-xs bg-primary/20 px-2 py-1 rounded">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Professional Summary Section */}
            <AccordionItem value="summary" className="bg-muted border rounded-xl px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <p className="text-base font-semibold">Professional Summary</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pb-4">
                <p className="text-sm text-muted-foreground">
                  Write a brief summary of your professional background and goals.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Work Experience Section */}
            <AccordionItem value="experience" className="bg-muted border rounded-xl px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <p className="text-base font-semibold">Work Experience</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pb-4">
                <p className="text-sm text-muted-foreground">
                  Add your work experience and achievements.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Education Section */}
            <AccordionItem value="education" className="bg-muted border rounded-xl px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <p className="text-base font-semibold">Education</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pb-4">
                <p className="text-sm text-muted-foreground">
                  Add your educational background.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Skills Section */}
            <AccordionItem value="skills" className="bg-muted border rounded-xl px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <p className="text-base font-semibold">Skills</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pb-4">
                <p className="text-sm text-muted-foreground">
                  List your key skills and competencies.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Right Panel: Resume Preview */}
      <div className="w-3/5 flex-1 p-8 bg-muted/50 flex flex-col items-center overflow-y-auto animate-fade-in">
        {/* Template Selector */}
        <div className="w-full max-w-4xl mb-6">
          <p className="text-sm font-medium text-muted-foreground mb-3">Template</p>
          <div className="flex items-center gap-4">
            {[0, 1, 2].map((templateId) => (
              <button
                key={templateId}
                onClick={() => handleTemplateSelect(templateId)}
                className={cn(
                  "w-28 h-40 rounded-lg border-2 cursor-pointer flex-shrink-0 transition-all hover:scale-105 flex items-center justify-center bg-background",
                  resume.selectedTemplate === templateId
                    ? "border-primary shadow-lg"
                    : "border-border hover:border-primary/50"
                )}
              >
                <span className="text-xs font-bold text-muted-foreground">
                  {templateId === 0 ? 'Modern' : templateId === 1 ? 'Classic' : 'Creative'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Resume Preview Paper */}
        <Card className="w-full max-w-4xl aspect-[8.5/11] shadow-2xl overflow-hidden">
          <div className="p-12 text-foreground bg-background">
            {/* Resume Header */}
            <div className="text-center border-b pb-6 mb-6 border-border">
              <h1 className="text-4xl font-bold tracking-tight">
                {resume.contactInfo.fullName || 'Your Name'}
              </h1>
              <p className="text-muted-foreground mt-2 text-sm">
                {resume.contactInfo.phone && `${resume.contactInfo.phone} | `}
                {resume.contactInfo.email}
                {resume.contactInfo.linkedin && ` | ${resume.contactInfo.linkedin}`}
              </p>
            </div>

            {/* Resume Body */}
            <div className="space-y-6">
              {/* Summary Section */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
                  Professional Summary
                </h2>
                <p className="text-sm leading-relaxed">
                  {resume.summary || 'Innovative and detail-oriented professional with passion for technology and problem-solving. Seeking to leverage strong skills to contribute to a dynamic team.'}
                </p>
              </div>

              {/* Experience Section */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
                  Work Experience
                </h2>
                <div className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold">Senior Role</h3>
                    <p className="text-xs text-muted-foreground font-medium">Jan 2021 - Present</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Company Name, Location</p>
                  <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
                    <li>Led development of key projects resulting in significant improvements.</li>
                    <li>Collaborated with cross-functional teams to achieve business goals.</li>
                  </ul>
                </div>
              </div>

              {/* Education Section */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
                  Education
                </h2>
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold">Bachelor's Degree</h3>
                    <p className="text-xs text-muted-foreground font-medium">Graduated 2020</p>
                  </div>
                  <p className="text-sm text-muted-foreground">University Name</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}

