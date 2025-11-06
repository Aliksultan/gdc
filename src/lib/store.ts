import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './features/userSlice'
import navigationReducer from './features/navigationSlice'
import resumeReducer from './features/resumeSlice'
import interviewReducer from './features/interviewSlice'

const persistConfig = {
  key: 'career-assistant-root',
  version: 1,
  storage,
  whitelist: ['user', 'resume', 'interview'], // Only persist these reducers
}

const rootReducer = combineReducers({
  user: userReducer,
  navigation: navigationReducer,
  resume: resumeReducer,
  interview: interviewReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

