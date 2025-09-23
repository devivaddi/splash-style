import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';

/**
 * Redux store configuration with Redux Toolkit
 * Includes auth state management for mobile app
 */
export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;