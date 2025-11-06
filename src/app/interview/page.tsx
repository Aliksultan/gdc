'use client'

import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { startInterview, submitAnswer, nextQuestion, endInterview } from '@/lib/features/interviewSlice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { Mic, Video, VideoOff, MicOff, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const interviewQuestions = [
  "Tell me about a time you faced a challenge at work.",
  "Describe a situation where you had to work with a difficult team member.",
  "Give me an example of a goal you set and how you achieved it.",
  "Tell me about a time you failed and what you learned from it.",
  "Describe your most significant professional achievement.",
  "How do you handle conflict in the workplace?",
  "Tell me about a time you had to learn something new quickly.",
  "Describe a situation where you showed leadership.",
  "How do you prioritize tasks when you have multiple deadlines?",
  "Tell me about a time you received constructive criticism.",
]

export default function InterviewPage() {
  const interview = useAppSelector((state) => state.interview)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [showSetup, setShowSetup] = useState(!interview.isActive)
  const [interviewType, setInterviewType] = useState('Behavioral Interview')
  const [difficulty, setDifficulty] = useState('Intermediate')
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<any>(null)
  const [micOn, setMicOn] = useState(true)
  const [videoOn, setVideoOn] = useState(false)

  const handleStartInterview = () => {
    dispatch(startInterview({ type: interviewType, difficulty }))
    setShowSetup(false)
    setFeedback(null)
  }

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      alert('Please provide an answer before submitting.')
      return
    }

    dispatch(submitAnswer(answer))
    setFeedback({ loading: true })
    
    try {
      // Call AI API for real feedback
      const response = await fetch('/api/ai/interview-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion,
          answer: answer
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get AI feedback')
      }

      const data = await response.json()
      setFeedback(data.feedback)
    } catch (error) {
      console.error('AI Feedback Error:', error)
      // Fallback to simulated feedback
      setFeedback({
        clarityScore: 75,
        relevanceScore: 70,
        overallScore: 73,
        strengths: [
          'Clear problem identification',
          'Good structure'
        ],
        improvements: [
          'Add more specific details',
          'Include measurable results'
        ]
      })
    }
    
    setAnswer('')
  }

  const handleNextQuestion = () => {
    dispatch(nextQuestion())
    setFeedback(null)
    setAnswer('')
  }

  const handleEndInterview = () => {
    if (confirm('Are you sure you want to end this interview? Your progress will be saved.')) {
      dispatch(endInterview())
      router.push('/')
    }
  }

  if (showSetup) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
        <Card className="w-full max-w-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl">Interview Setup</CardTitle>
            <CardDescription>
              Configure your mock interview session to match your goals.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="interview-type">Interview Type</Label>
              <select
                id="interview-type"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value)}
              >
                <option>Behavioral Interview</option>
                <option>Technical Interview (Software Engineering)</option>
                <option>Case Interview (Consulting)</option>
                <option>Product Management Interview</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <select
                id="difficulty"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => router.push('/')}>
                Cancel
              </Button>
              <Button onClick={handleStartInterview}>
                Start Interview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = interviewQuestions[interview.currentQuestion - 1] || interviewQuestions[0]
  const progress = (interview.currentQuestion / interview.totalQuestions) * 100

  return (
    <main className="flex flex-1 flex-col p-6">
      {/* Progress Bar */}
      <Card className="mb-4 animate-fade-in">
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between gap-6">
            <p className="text-base font-medium">
              {interview.interviewType} Progress
            </p>
            <p className="text-sm text-muted-foreground">
              Question {interview.currentQuestion} of {interview.totalQuestions}
            </p>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      <div className="grid flex-1 grid-cols-12 gap-6">
        {/* Left Panel: Video Feed */}
        <div className="col-span-12 lg:col-span-3">
          <Card className="h-full animate-fade-in">
            <CardContent className="p-4">
              <div className="relative flex h-full min-h-[200px] flex-col overflow-hidden rounded-lg">
                <div className="relative flex flex-1 items-center justify-center bg-muted">
                  <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/20" />
                  <span className="absolute left-3 top-3 rounded-md bg-background/50 px-2 py-1 text-xs font-medium backdrop-blur-sm">
                    You
                  </span>
                  <span className="text-6xl text-muted-foreground/50">👤</span>
                </div>
                <div className="flex items-center justify-center gap-2 bg-card p-3">
                  <Button
                    size="icon"
                    variant={micOn ? "default" : "secondary"}
                    onClick={() => setMicOn(!micOn)}
                  >
                    {micOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="icon"
                    variant={videoOn ? "default" : "secondary"}
                    onClick={() => setVideoOn(!videoOn)}
                  >
                    {videoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center Panel: Question & Answer */}
        <div className="col-span-12 lg:col-span-5">
          <Card className="h-full animate-fade-in">
            <CardContent className="flex flex-col h-full p-6">
              <h1 className="text-3xl font-bold leading-tight mb-2">
                {currentQuestion}
              </h1>
              <p className="text-muted-foreground mb-6">
                Describe the situation, the actions you took, and the outcome.
              </p>

              <div className="mt-auto flex flex-col">
                <Label htmlFor="answer-input" className="mb-2 text-sm font-semibold">
                  Your Answer
                </Label>
                <div className="relative">
                  <textarea
                    id="answer-input"
                    className="w-full rounded-lg border border-input bg-background p-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    placeholder="Start typing your response here..."
                    rows={8}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <Button size="sm" variant="secondary">
                      <Mic className="h-4 w-4 mr-2" />
                      Record
                    </Button>
                    {!feedback ? (
                      <Button size="sm" onClick={handleSubmitAnswer}>
                        Submit
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button size="sm" onClick={handleNextQuestion}>
                        Next Question
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel: Feedback */}
        <div className="col-span-12 lg:col-span-4">
          <Card className="h-full animate-fade-in">
            <CardHeader>
              <CardTitle>Live Feedback</CardTitle>
              <CardDescription>
                Analysis will appear here after you submit your answer.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {!feedback ? (
                <>
                  <div className="space-y-2">
                    <h4 className="text-base font-semibold">Clarity</h4>
                    <p className="text-sm text-muted-foreground">
                      Focus on structuring your answer with the STAR method for maximum clarity.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-base font-semibold">Relevance</h4>
                    <p className="text-sm text-muted-foreground">
                      Ensure your example directly addresses the question.
                    </p>
                  </div>
                  <div className="rounded-lg bg-primary/20 p-4">
                    <p className="text-center text-sm text-primary">
                      Waiting for your response...
                    </p>
                  </div>
                </>
              ) : feedback.loading ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="text-sm text-muted-foreground">AI is analyzing your answer...</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-semibold">Overall Score</h4>
                      <span className="text-2xl font-bold text-primary">
                        {feedback.overallScore || feedback.clarity}/100
                      </span>
                    </div>
                    <Progress value={feedback.overallScore || feedback.clarity} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium">Clarity</p>
                        <span className="text-sm font-bold">{feedback.clarityScore || feedback.clarity}/100</span>
                      </div>
                      <Progress value={feedback.clarityScore || feedback.clarity} className="h-1" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium">Relevance</p>
                        <span className="text-sm font-bold">{feedback.relevanceScore || feedback.relevance}/100</span>
                      </div>
                      <Progress value={feedback.relevanceScore || feedback.relevance} className="h-1" />
                    </div>
                  </div>

                  {feedback.starMethodScore && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium">STAR Method</p>
                        <span className="text-sm font-bold">{feedback.starMethodScore}/100</span>
                      </div>
                      <Progress value={feedback.starMethodScore} className="h-1" />
                    </div>
                  )}

                  <div className="rounded-lg bg-green-500/20 border border-green-500/50 p-4">
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">
                      ✓ Strong Points:
                    </p>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      {feedback.strengths?.map((strength: string, idx: number) => (
                        <li key={idx}>{strength}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg bg-blue-500/20 border border-blue-500/50 p-4">
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                      💡 Areas to Improve:
                    </p>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      {feedback.improvements?.map((improvement: string, idx: number) => (
                        <li key={idx}>{improvement}</li>
                      ))}
                    </ul>
                  </div>

                  {feedback.suggestedAnswer && (
                    <div className="rounded-lg bg-purple-500/20 border border-purple-500/50 p-4">
                      <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2">
                        ✨ Example Strong Answer:
                      </p>
                      <p className="text-xs text-muted-foreground italic">
                        {feedback.suggestedAnswer}
                      </p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Button variant="destructive" onClick={handleEndInterview}>
          End Interview
        </Button>
      </div>
    </main>
  )
}

