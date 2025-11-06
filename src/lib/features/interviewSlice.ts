import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InterviewState {
  currentQuestion: number
  totalQuestions: number
  answers: string[]
  interviewType: string
  difficulty: string
  isActive: boolean
}

const initialState: InterviewState = {
  currentQuestion: 1,
  totalQuestions: 10,
  answers: [],
  interviewType: 'Behavioral Interview',
  difficulty: 'Intermediate',
  isActive: false,
}

export const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    startInterview: (state, action: PayloadAction<{ type: string; difficulty: string }>) => {
      state.isActive = true
      state.currentQuestion = 1
      state.answers = []
      state.interviewType = action.payload.type
      state.difficulty = action.payload.difficulty
    },
    submitAnswer: (state, action: PayloadAction<string>) => {
      state.answers.push(action.payload)
    },
    nextQuestion: (state) => {
      if (state.currentQuestion < state.totalQuestions) {
        state.currentQuestion += 1
      }
    },
    endInterview: (state) => {
      state.isActive = false
      state.currentQuestion = 1
      state.answers = []
    },
  },
})

export const { startInterview, submitAnswer, nextQuestion, endInterview } = interviewSlice.actions
export default interviewSlice.reducer

