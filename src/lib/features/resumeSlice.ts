import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ResumeState {
  contactInfo: {
    fullName: string
    email: string
    phone: string
    linkedin: string
  }
  summary: string
  selectedTemplate: number
}

const initialState: ResumeState = {
  contactInfo: {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '(123) 456-7890',
    linkedin: '',
  },
  summary: '',
  selectedTemplate: 0,
}

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    updateContactInfo: (state, action: PayloadAction<Partial<ResumeState['contactInfo']>>) => {
      state.contactInfo = { ...state.contactInfo, ...action.payload }
    },
    updateSummary: (state, action: PayloadAction<string>) => {
      state.summary = action.payload
    },
    selectTemplate: (state, action: PayloadAction<number>) => {
      state.selectedTemplate = action.payload
    },
  },
})

export const { updateContactInfo, updateSummary, selectTemplate } = resumeSlice.actions
export default resumeSlice.reducer

