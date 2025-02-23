import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/usersSlice';
import productsReducer from './features/productsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 