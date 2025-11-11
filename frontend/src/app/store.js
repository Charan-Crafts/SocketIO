import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // Optional: Add custom middleware here
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true, // ✅ enables Redux DevTools automatically
});
