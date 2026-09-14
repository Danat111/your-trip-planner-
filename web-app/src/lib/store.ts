// This file contains the store configuration for Redux
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// Import reducers as the application grows
// import userReducer from './features/user/userSlice';
// import tripReducer from './features/trips/tripSlice';

export const store = configureStore({
  reducer: {
    // Add reducers here as the application grows
    // user: userReducer,
    // trips: tripReducer,
  },
  // Adding middleware for development tools and async operations
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
