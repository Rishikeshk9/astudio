import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/usersSlice';
import productsReducer from './features/productsSlice';
import type { User } from '@/types';
import type { Product } from '@/types';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
  },
});

export type RootState = {
  users: {
    items: User[];
    total: number;
    loading: boolean;
    error: string | null;
    pageSize: number;
    currentPage: number;
    searchTerm: string;
  };
  products: {
    items: Product[];
    total: number;
    loading: boolean;
    error: string | null;
    pageSize: number;
    currentPage: number;
    searchTerm: string;
  };
};

export type AppDispatch = typeof store.dispatch; 