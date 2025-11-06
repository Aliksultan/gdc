import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY || ''

if (!API_KEY) {
  console.warn('Warning: GOOGLE_GEMINI_API_KEY is not set')
}

const genAI = new GoogleGenerativeAI(API_KEY)

export const geminiModel = genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash-preview-09-2025',
  generationConfig: {
    temperature: 0.7,
    topP: 0.8,
    topK: 40,
    maxOutputTokens: 2048,
  },
})

export async function generateText(prompt: string) {
  try {
    const result = await geminiModel.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Gemini AI Error:', error)
    throw new Error('Failed to generate AI response')
  }
}

export async function streamText(prompt: string) {
  try {
    const result = await geminiModel.generateContentStream(prompt)
    return result.stream
  } catch (error) {
    console.error('Gemini AI Stream Error:', error)
    throw new Error('Failed to stream AI response')
  }
}

