import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PageType = 'dashboard' | 'explore' | 'resume' | 'interview' | 'onboarding'

interface NavigationState {
  currentPage: PageType
}

const initialState: NavigationState = {
  currentPage: 'dashboard',
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<PageType>) => {
      state.currentPage = action.payload
    },
  },
})

export const { setPage } = navigationSlice.actions
export default navigationSlice.reducer

