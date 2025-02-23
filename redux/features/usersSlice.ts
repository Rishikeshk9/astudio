import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { User } from '@/types';

interface UsersState {
  items: User[];
  total: number;
  loading: boolean;
  error: string | null;
  pageSize: number;
  currentPage: number;
  searchTerm: string;
}

const initialState: UsersState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  pageSize: 5,
  currentPage: 0,
  searchTerm: '',
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ skip, limit }: { skip: number; limit: number }) => {
    const response = await axios.get<{ users: User[]; total: number }>(
      `https://dummyjson.com/users?skip=${skip}&limit=${limit}`
    );
    return response.data;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.currentPage = 0;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { setPageSize, setCurrentPage, setSearchTerm } = usersSlice.actions;
export default usersSlice.reducer; 